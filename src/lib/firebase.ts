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
let activeGoogleSignInPromise: Promise<{ email: string; name: string; picture: string }> | null = null;

export const signInWithGoogle = async () => {
  if (activeGoogleSignInPromise) {
    return activeGoogleSignInPromise;
  }

  activeGoogleSignInPromise = (async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      return {
        email: user.email || '',
        name: user.displayName || '',
        picture: user.photoURL || '',
      };
    } catch (error: any) {
      const isCancellation = 
        error?.code === 'auth/popup-closed-by-user' ||
        error?.code === 'auth/cancelled-popup-request' ||
        error?.code === 'auth/user-cancelled' ||
        error?.message?.includes('popup-closed-by-user') ||
        error?.message?.includes('cancelled-popup-request');

      if (isCancellation) {
        console.warn('Google Sign-In popup was closed or cancelled by user/browser.');
      } else if (error?.code === 'auth/operation-not-allowed' || error?.code === 'auth/unauthorized-domain') {
        console.warn(`Google Sign-In notice (${error?.code}): Provider or domain not configured in Firebase Console.`);
      } else {
        console.warn('Google Sign-In notice:', error?.code || error?.message || error);
      }
      throw error;
    } finally {
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

