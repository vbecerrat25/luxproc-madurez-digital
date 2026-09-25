import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
provider.addScope('openid');
provider.addScope('https://www.googleapis.com/auth/userinfo.email');
provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

// Force Google to show the account chooser so the user can switch accounts easily if needed
provider.setCustomParameters({
  prompt: 'select_account'
});

// In-flight promise to prevent concurrent popup requests that trigger auth/cancelled-popup-request
let activeGoogleSignInPromise: Promise<{ 
  email: string; 
  name: string; 
  picture: string; 
  cancelled?: boolean;
  timedOut?: boolean;
}> | null = null;

export const cancelGoogleSignIn = () => {
  activeGoogleSignInPromise = null;
};

export const signInWithGoogle = async (timeoutMs: number = 25000): Promise<{
  email: string;
  name: string;
  picture: string;
  cancelled?: boolean;
  timedOut?: boolean;
}> => {
  // If an attempt is already running, reset it if called again after a short delay
  if (activeGoogleSignInPromise) {
    return activeGoogleSignInPromise;
  }

  activeGoogleSignInPromise = (async () => {
    let timeoutHandle: ReturnType<typeof setTimeout> | null = null;

    try {
      // Timeout promise to avoid waiting indefinitely if popup hangs or is abandoned
      const timeoutPromise = new Promise<{
        email: string;
        name: string;
        picture: string;
        cancelled: boolean;
        timedOut: boolean;
      }>((resolve) => {
        timeoutHandle = setTimeout(() => {
          resolve({
            email: '',
            name: '',
            picture: '',
            cancelled: true,
            timedOut: true
          });
        }, timeoutMs);
      });

      // Firebase popup sign in
      const authPromise = signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        return {
          email: user.email || '',
          name: user.displayName || '',
          picture: user.photoURL || '',
          cancelled: false,
          timedOut: false
        };
      });

      const outcome = await Promise.race([authPromise, timeoutPromise]);
      return outcome;
    } catch (error: any) {
      const isCancellation = 
        error?.code === 'auth/popup-closed-by-user' ||
        error?.code === 'auth/cancelled-popup-request' ||
        error?.code === 'auth/user-cancelled' ||
        error?.message?.includes('popup-closed-by-user') ||
        error?.message?.includes('cancelled-popup-request') ||
        error?.message?.includes('closed-by-user');

      if (isCancellation) {
        // Fast, silent cancellation without polluting logs or breaking UI state
        return {
          email: '',
          name: '',
          picture: '',
          cancelled: true,
          timedOut: false
        };
      }

      if (error?.code === 'auth/popup-blocked') {
        throw new Error('POPUP_BLOCKED');
      }

      console.warn('Google Sign-In notice:', error?.code || error?.message || error);
      throw error;
    } finally {
      if (timeoutHandle) clearTimeout(timeoutHandle);
      activeGoogleSignInPromise = null;
    }
  })();

  return activeGoogleSignInPromise;
};

export const signInWithEmail = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  const user = result.user;
  return {
    email: user.email || '',
    name: user.displayName || user.email?.split('@')[0] || 'Usuario',
    picture: user.photoURL || '',
  };
};

export const signUpWithEmail = async (email: string, password: string, name: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const user = result.user;
  await updateProfile(user, { displayName: name });
  return {
    email: user.email || '',
    name: name,
    picture: user.photoURL || '',
  };
};

export const handleSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.warn('Sign out notice:', error);
  }
};

