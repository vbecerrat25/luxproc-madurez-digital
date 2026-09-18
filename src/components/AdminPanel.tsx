import React, { useState } from 'react';
import { DiagnosticRecord, SectorType, CompanySizeType } from '../types';
import { getMaturityLevel } from '../data';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  Users, Award, BarChart3, Search, Filter, Download, 
  Eye, FileSpreadsheet, FileText, ChevronRight, Briefcase, 
  Settings, ShieldAlert, ArrowLeft, TrendingUp, Printer,
  Trash2, Building2
} from 'lucide-react';

interface AdminPanelProps {
  userRecords: DiagnosticRecord[];
  onViewRecord: (record: DiagnosticRecord) => void;
  onPrintRecord?: (record: DiagnosticRecord) => void;
  onDeleteRecord?: (id: string) => void;
  onClearAllRecords?: () => void;
}

export default function AdminPanel({ userRecords, onViewRecord, onPrintRecord, onDeleteRecord, onClearAllRecords }: AdminPanelProps) {
  const { t, getMaturityLevelI18n, language } = useLanguage();

  // All records are strictly real evaluations from users (zero mock/dummy data)
  const allRecords = userRecords;

  // State filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('todos');
  const [selectedSize, setSelectedSize] = useState<string>('todos');
  const [selectedLevel, setSelectedLevel] = useState<string>('todos');
  const [showExportSuccess, setShowExportSuccess] = useState(false);

  // Computed metrics on filtered data
  const filteredRecords = allRecords.filter(rec => {
    const matchesSearch = rec.companyInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          rec.companyInfo.contactEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rec.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSector = selectedSector === 'todos' || rec.companyInfo.sector === selectedSector;
    const matchesSize = selectedSize === 'todos' || rec.companyInfo.size === selectedSize;
    
    const lvl = getMaturityLevelI18n(rec.metrics.general).title;
    const matchesLevel = selectedLevel === 'todos' || lvl.toLowerCase().includes(selectedLevel.toLowerCase());

    return matchesSearch && matchesSector && matchesSize && matchesLevel;
  });

  // Average digital maturity
  const avgMaturity = filteredRecords.length > 0
    ? Math.round(filteredRecords.reduce((acc, rec) => acc + rec.metrics.general, 0) / filteredRecords.length)
    : 0;

  // Sector distribution counts
  const sectorCounts: { [key: string]: number } = {};
  filteredRecords.forEach(r => {
    sectorCounts[r.companyInfo.sector] = (sectorCounts[r.companyInfo.sector] || 0) + 1;
  });
  const topSectorRaw = Object.keys(sectorCounts).length > 0
    ? Object.keys(sectorCounts).reduce((a, b) => sectorCounts[a] > sectorCounts[b] ? a : b)
    : 'N/A';
  const topSector = topSectorRaw !== 'N/A' ? (t(`sector.${topSectorRaw}`) || topSectorRaw) : 'N/A';

  // Export to Excel (Generates CSV output)
  const exportToCSV = () => {
    const headers = 'ID,Fecha,Empresa,Email,Sector,Tamaño,Pais,General,Digitalizacion,Automatizacion,Innovacion,Circularidad,Trazabilidad,Gestion,Seguridad,Nivel\n';
    const rows = filteredRecords.map(rec => {
      const lvl = getMaturityLevelI18n(rec.metrics.general).title;
      return `"${rec.id}","${rec.date}","${rec.companyInfo.name}","${rec.companyInfo.contactEmail}","${rec.companyInfo.sector}","${rec.companyInfo.size}","${rec.companyInfo.country}",${rec.metrics.general},${rec.metrics.digitalizacion},${rec.metrics.automatizacion},${rec.metrics.innovacion},${rec.metrics.circularidad},${rec.metrics.trazabilidad},${rec.metrics.gestion},${rec.metrics.seguridad},"${lvl}"`;
    }).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `madurez_digital_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowExportSuccess(true);
    setTimeout(() => setShowExportSuccess(false), 3000);
  };

  // Export to PDF (Triggers browser print customized for tables)
  const exportToPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40">Master Access</span>
            <span>{t('brand.platformName')} Diagnostic Control</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white mt-1.5">
            {t('admin.dashboardTitle')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {language === 'es' ? 'Supervisión y control en tiempo real de todos los diagnósticos y brechas corporativas.' : language === 'pt' ? 'Supervisão e controle em tempo real de todos os diagnósticos corporativos.' : 'Real-time supervision and oversight of all corporate diagnostics and maturity gaps.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
          {onClearAllRecords && allRecords.length > 0 && (
            <button
              id="admin-clear-all"
              onClick={() => {
                if (window.confirm(
                  language === 'es' 
                    ? '¿Estás seguro de vaciar todos los registros para empezar 100% en blanco?' 
                    : language === 'pt' 
                    ? 'Tem certeza de que deseja limpar todos os registros para começar 100% em branco?' 
                    : 'Are you sure you want to clear all records to start 100% in blank?'
                )) {
                  onClearAllRecords();
                }
              }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 bg-rose-50/70 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-all text-sm font-bold cursor-pointer shadow-sm"
              title={language === 'es' ? 'Vaciar registros para empezar en blanco' : 'Clear records to start blank'}
            >
              <Trash2 className="w-4 h-4" />
              <span>{language === 'es' ? 'Empezar en Blanco' : language === 'pt' ? 'Começar em Branco' : 'Start Blank'}</span>
            </button>
          )}
          <button
            id="admin-export-excel"
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800/30 text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all text-sm font-semibold cursor-pointer shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>{t('admin.exportCsv')}</span>
          </button>
          <button
            id="admin-export-pdf"
            onClick={exportToPDF}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm font-semibold cursor-pointer shadow-sm"
          >
            <FileText className="w-4 h-4" />
            <span>{language === 'es' ? 'Exportar Lista PDF' : language === 'pt' ? 'Exportar Lista PDF' : 'Export PDF List'}</span>
          </button>
        </div>
      </div>

      {showExportSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-450 text-xs font-semibold print:hidden">
          {language === 'es' ? '¡Base de datos exportada exitosamente! Se ha descargado el archivo CSV listo para Microsoft Excel.' : language === 'pt' ? 'Banco de dados exportado com sucesso! Arquivo CSV pronto para Microsoft Excel.' : 'Database exported successfully! CSV file downloaded ready for Microsoft Excel.'}
        </div>
      )}

      {/* Admin KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 print:hidden">
        
        {/* Total evaluations */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{t('admin.totalEvaluations')}</span>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
              {filteredRecords.length}
            </span>
            <span className="text-xs text-slate-400 block mt-1">{t('admin.companiesRegistered')}</span>
          </div>
        </div>

        {/* Average Maturity score */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{t('admin.averageScore')}</span>
            <Award className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black tracking-tight text-emerald-500 dark:text-emerald-400">
              {avgMaturity}%
            </span>
            <span className="text-xs text-slate-400 block mt-1">{language === 'es' ? 'Nivel general de digitalización' : language === 'pt' ? 'Nível geral de digitalização' : 'General digital maturity level'}</span>
          </div>
        </div>

        {/* Most digitalized sector */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 rounded-full blur-xl" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{t('admin.topSector')}</span>
            <Briefcase className="w-5 h-5 text-purple-500" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black tracking-tight text-slate-950 dark:text-white truncate block max-w-full">
              {topSector}
            </span>
            <span className="text-xs text-slate-400 block mt-1">{language === 'es' ? 'Con mayor volumen evaluado' : language === 'pt' ? 'Maior volume avaliado' : 'Highest evaluated volume'}</span>
          </div>
        </div>

        {/* Alert/Compliance status */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-full blur-xl" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{t('dim.seguridad')}</span>
            <TrendingUp className="w-5 h-5 text-amber-500" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black tracking-tight text-amber-500 dark:text-amber-400">
              {filteredRecords.length > 0 ? Math.round(filteredRecords.reduce((acc, r) => acc + r.metrics.seguridad, 0) / filteredRecords.length) : 0}%
            </span>
            <span className="text-xs text-slate-400 block mt-1">{language === 'es' ? 'Promedio ciberseguridad' : language === 'pt' ? 'Média de cibersegurança' : 'Average cybersecurity'}</span>
          </div>
        </div>

      </div>

      {/* Interactive Filter Panel */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4 print:hidden">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-950 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
          <Filter className="w-4 h-4 text-blue-500" />
          <span>{language === 'es' ? 'Filtros Dinámicos de Búsqueda' : language === 'pt' ? 'Filtros Dinâmicos de Busca' : 'Dynamic Search Filters'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Text Search */}
          <div className="space-y-1">
            <label htmlFor="search-input" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">{t('admin.searchPlaceholder')}</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                id="search-input"
                type="text"
                placeholder={language === 'es' ? 'Ej. EcoAlimentos...' : language === 'pt' ? 'Ex. EcoAlimentos...' : 'e.g. EcoFoods...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-250 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Sector Filter */}
          <div className="space-y-1">
            <label htmlFor="sector-filter" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">{t('admin.colSector')}</label>
            <select
              id="sector-filter"
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-250 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
            >
              <option value="todos">{t('admin.filterSector')}</option>
              <option value="Comercio">{t('sector.Comercio')}</option>
              <option value="Servicios">{t('sector.Servicios')}</option>
              <option value="Manufactura">{t('sector.Manufactura')}</option>
              <option value="Tecnología">{t('sector.Tecnología')}</option>
              <option value="Agropecuario">{t('sector.Agropecuario')}</option>
              <option value="Construcción">{t('sector.Construcción')}</option>
              <option value="Otro">{t('sector.Otro')}</option>
            </select>
          </div>

          {/* Size Filter */}
          <div className="space-y-1">
            <label htmlFor="size-filter" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">{t('admin.colSize')}</label>
            <select
              id="size-filter"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-250 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
            >
              <option value="todos">{t('admin.filterSize')}</option>
              <option value="Micro">{t('size.Micro')}</option>
              <option value="Pequeña">{t('size.Pequeña')}</option>
              <option value="Mediana">{t('size.Mediana')}</option>
              <option value="Grande">{t('size.Grande')}</option>
            </select>
          </div>

          {/* Level Filter */}
          <div className="space-y-1">
            <label htmlFor="level-filter" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">{language === 'es' ? 'Nivel de Madurez' : language === 'pt' ? 'Nível de Maturidade' : 'Maturity Level'}</label>
            <select
              id="level-filter"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-250 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
            >
              <option value="todos">{language === 'es' ? 'Todos los niveles' : language === 'pt' ? 'Todos os níveis' : 'All levels'}</option>
              <option value="Inicial">{t('level.inicial')}</option>
              <option value="Básico">{t('level.basico')}</option>
              <option value="Desarrollado">{t('level.desarrollado')}</option>
              <option value="Líder">{t('level.lider')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Records Table Card */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-250 dark:border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-4.5 px-4">{language === 'es' ? 'Código / Fecha' : language === 'pt' ? 'Código / Data' : 'Code / Date'}</th>
                <th className="py-4.5 px-4">{t('admin.colCompany')} / {t('admin.colContact')}</th>
                <th className="py-4.5 px-4">{t('admin.colSector')}</th>
                <th className="py-4.5 px-4">{t('admin.colSize')}</th>
                <th className="py-4.5 px-4 text-center">{t('dashboard.generalScore')}</th>
                <th className="py-4.5 px-4">{language === 'es' ? 'Rango Obtenido' : language === 'pt' ? 'Faixa Obtida' : 'Maturity Level'}</th>
                <th className="py-4.5 px-4 text-right print:hidden">{t('admin.colActions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 px-4 text-center">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-cyan-400 flex items-center justify-center mx-auto">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {language === 'es' ? 'Base de datos en blanco' : language === 'pt' ? 'Banco de dados em branco' : 'Blank database'}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {language === 'es' 
                          ? 'No hay registros de otras empresas. A medida que tu empresa o nuevos usuarios completen el diagnóstico, aparecerán aquí en tiempo real con su nivel de madurez y opción de reporte PDF.'
                          : language === 'pt'
                          ? 'Não existem dados de outras empresas. À medida que os usuários concluírem os diagnósticos, eles aparecerão aqui em tempo real.'
                          : 'No data from other companies. As users complete assessments, they will appear here in real time.'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRecords.map((rec) => {
                  const lvlInfo = getMaturityLevelI18n(rec.metrics.general);
                  return (
                    <tr key={rec.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-all">
                      {/* Code & date */}
                      <td className="py-4.5 px-4">
                        <span className="font-mono font-bold text-slate-950 dark:text-slate-200 block text-xs">{rec.id}</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5">{rec.date} - {rec.time}</span>
                      </td>

                      {/* Name & email */}
                      <td className="py-4.5 px-4">
                        <span className="font-bold text-slate-950 dark:text-white block">{rec.companyInfo.name}</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 block mt-0.5">{rec.companyInfo.contactEmail}</span>
                      </td>

                      {/* Sector */}
                      <td className="py-4.5 px-4">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-650 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
                          {t(`sector.${rec.companyInfo.sector}`) || rec.companyInfo.sector}
                        </span>
                      </td>

                      {/* Size */}
                      <td className="py-4.5 px-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                        {t(`size.${rec.companyInfo.size}`) || rec.companyInfo.size}
                      </td>

                      {/* Score */}
                      <td className="py-4.5 px-4 text-center">
                        <span className="text-base font-black tracking-tight text-slate-950 dark:text-white">
                          {rec.metrics.general}%
                        </span>
                      </td>

                      {/* Maturity Level */}
                      <td className="py-4.5 px-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${lvlInfo.badgeClass}`}>
                          {lvlInfo.title}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4.5 px-4 text-right print:hidden">
                        <div className="flex items-center justify-end gap-1.5 sm:gap-2">
                          <button
                            id={`view-rec-${rec.id}`}
                            onClick={() => onViewRecord(rec)}
                            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-slate-650 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all text-xs font-bold cursor-pointer bg-white dark:bg-slate-900 shadow-sm"
                            title={language === 'es' ? 'Ver Resultados e Informe Completo' : language === 'pt' ? 'Ver Resultados e Relatório Completo' : 'View Results & Complete Report'}
                          >
                            <Eye className="w-3.5 h-3.5 text-blue-550" />
                            <span className="hidden sm:inline">{t('home.viewReport')}</span>
                          </button>

                          <button
                            id={`print-rec-${rec.id}`}
                            onClick={() => onPrintRecord ? onPrintRecord(rec) : onViewRecord(rec)}
                            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-slate-655 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all text-xs font-bold cursor-pointer bg-white dark:bg-slate-900 shadow-sm focus:outline-none"
                            title={language === 'es' ? 'Imprimir / Descargar PDF de este diagnóstico' : language === 'pt' ? 'Imprimir / Baixar PDF deste diagnóstico' : 'Print / Download PDF of this assessment'}
                          >
                            <Printer className="w-3.5 h-3.5 text-emerald-500" />
                            <span>PDF</span>
                          </button>

                          {onDeleteRecord && (
                            <button
                              id={`delete-rec-${rec.id}`}
                              onClick={() => {
                                if (window.confirm(language === 'es' ? `¿Eliminar el registro de "${rec.companyInfo.name}"?` : `Delete record of "${rec.companyInfo.name}"?`)) {
                                  onDeleteRecord(rec.id);
                                }
                              }}
                              className="inline-flex items-center p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-900/60 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-all text-xs cursor-pointer bg-white dark:bg-slate-900 shadow-sm"
                              title={language === 'es' ? 'Eliminar este registro' : 'Delete this record'}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Hidden layout specifically structured for raw browser printing list of evaluations */}
      <div className="hidden print:block print:p-8">
        <h2 className="text-xl font-bold border-b border-gray-400 pb-2 mb-4">{t('brand.platformName')} - {t('admin.dashboardTitle')}</h2>
        <p className="text-xs text-gray-600 mb-4">{new Date().toLocaleDateString(language === 'es' ? 'es-ES' : language === 'pt' ? 'pt-BR' : 'en-US')} - {filteredRecords.length} records</p>
        <table className="w-full text-left text-xs border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border border-gray-300">ID</th>
              <th className="p-2 border border-gray-300">{t('admin.colCompany')}</th>
              <th className="p-2 border border-gray-300">{t('admin.colSector')}</th>
              <th className="p-2 border border-gray-300">{t('admin.colSize')}</th>
              <th className="p-2 border border-gray-300 text-center">{t('dashboard.generalScore')}</th>
              <th className="p-2 border border-gray-300">{language === 'es' ? 'Nivel Obtenido' : language === 'pt' ? 'Nível Obtido' : 'Maturity Level'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((rec) => (
              <tr key={rec.id}>
                <td className="p-2 border border-gray-300 font-mono">{rec.id}</td>
                <td className="p-2 border border-gray-300 font-bold">{rec.companyInfo.name}</td>
                <td className="p-2 border border-gray-300">{t(`sector.${rec.companyInfo.sector}`) || rec.companyInfo.sector}</td>
                <td className="p-2 border border-gray-300">{t(`size.${rec.companyInfo.size}`) || rec.companyInfo.size}</td>
                <td className="p-2 border border-gray-300 text-center font-bold">{rec.metrics.general}%</td>
                <td className="p-2 border border-gray-300">{getMaturityLevelI18n(rec.metrics.general).title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

