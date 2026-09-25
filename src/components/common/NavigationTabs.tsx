import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  AlertOctagon, 
  FileSpreadsheet, 
  Stethoscope, 
  UserCheck, 
  ShieldAlert, 
  ClipboardList, 
  CheckSquare, 
  GraduationCap, 
  CalendarClock, 
  FolderArchive,
  HardHat,
  Users,
  Flame
} from 'lucide-react';
import { ModuloSST } from '../../types/sst';

interface NavigationTabsProps {
  moduloAtivo: ModuloSST;
  onSelecionarModulo: (modulo: ModuloSST) => void;
  contadores?: {
    cats: number;
    examesVencendo: number;
    treinamentosPendentes: number;
    checklists: number;
    epis?: number;
    dds?: number;
    extintores?: number;
  };
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  moduloAtivo,
  onSelecionarModulo,
  contadores
}) => {
  const modulos = [
    { id: 'dashboard' as ModuloSST, label: 'Painel Geral', icon: LayoutDashboard },
    { id: 'nrs' as ModuloSST, label: 'NRs', badge: '38 NRs', icon: BookOpen },
    { id: 'epi' as ModuloSST, label: 'EPI (NR-06)', badge: 'Ficha & C.A.', icon: HardHat, highlight: true },
    { id: 'dds' as ModuloSST, label: 'DDS Diário', badge: 'Atas', icon: Users },
    { id: 'extintores' as ModuloSST, label: 'Extintores (NR-23)', badge: 'Checklist', icon: Flame, highlight: true },
    { id: 'cat' as ModuloSST, label: 'Emitir CAT', badge: 'eSocial', icon: AlertOctagon, highlight: true },
    { id: 'ltcat' as ModuloSST, label: 'LTCAT', icon: FileSpreadsheet },
    { id: 'pcmso' as ModuloSST, label: 'PCMSO', icon: Stethoscope },
    { id: 'aso' as ModuloSST, label: 'ASO', icon: UserCheck },
    { id: 'gro' as ModuloSST, label: 'GRO / PGR', icon: ShieldAlert },
    { id: 'apr' as ModuloSST, label: 'APR', icon: ClipboardList },
    { id: 'checklists' as ModuloSST, label: 'Checklists', icon: CheckSquare },
    { id: 'treinamentos' as ModuloSST, label: 'Treinamentos/NRs', icon: GraduationCap },
    { id: 'exames' as ModuloSST, label: 'Controle de Exames', badge: contadores?.examesVencendo ? `${contadores.examesVencendo} alerta` : undefined, badgeColor: 'bg-amber-500', icon: CalendarClock },
    { id: 'documentos' as ModuloSST, label: 'Gestão Documentos', icon: FolderArchive },
  ];

  return (
    <div className="bg-white border-b border-slate-200 shadow-xs no-print sticky top-[73px] z-30 overflow-x-auto scrollbar-thin">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 py-2 min-w-max" aria-label="Módulos SST">
          {modulos.map((m) => {
            const Icon = m.icon;
            const ativo = moduloAtivo === m.id;
            return (
              <button
                key={m.id}
                id={`tab-${m.id}`}
                onClick={() => onSelecionarModulo(m.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  ativo
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                } ${m.highlight && !ativo ? 'text-red-700 hover:bg-red-50 font-bold' : ''}`}
              >
                <Icon className={`w-4 h-4 ${ativo ? 'text-emerald-400' : m.highlight ? 'text-red-600' : 'text-slate-500'}`} />
                <span>{m.label}</span>
                {m.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                    m.badgeColor 
                      ? `${m.badgeColor} text-white` 
                      : ativo 
                        ? 'bg-emerald-500/20 text-emerald-300' 
                        : 'bg-slate-100 text-slate-600 border border-slate-300'
                  }`}>
                    {m.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
