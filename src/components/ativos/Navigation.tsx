import { 
  LayoutDashboard, 
  Package, 
  Plus, 
  Link, 
  Wrench, 
  History, 
  Settings, 
  FileText, 
  BarChart3,
  Menu,
  X 
} from "lucide-react";
import { useState } from "react";
import { PageType } from "@/pages/Index";
import heroAtivos from "@/assets/hero-ativos.png";

interface NavigationProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

const navigationItems = [
  { id: "dashboard" as PageType, label: "Dashboard", icon: LayoutDashboard },
  { id: "catalogo" as PageType, label: "Catálogo", icon: Package },
  { id: "cadastro" as PageType, label: "Cadastro", icon: Plus },
  { id: "vincular" as PageType, label: "Vincular", icon: Link },
  { id: "assistencia" as PageType, label: "Assistência", icon: Wrench },
  { id: "historico" as PageType, label: "Histórico", icon: History },
  { id: "manutencao" as PageType, label: "Manutenção", icon: Settings },
  { id: "relatorios" as PageType, label: "Relatórios", icon: BarChart3 },
  { id: "administracao" as PageType, label: "Administração", icon: FileText },
];

export const Navigation = ({ currentPage, onNavigate }: NavigationProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm lg:hidden z-40" />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-card border-r border-border z-50 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}>
        
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <img 
                  src={heroAtivos} 
                  alt="Gestão de Ativos" 
                  className="w-8 h-8 rounded-lg"
                />
                <div>
                  <h1 className="text-lg font-semibold text-gradient">Ativos</h1>
                  <p className="text-xs text-muted-foreground">Gestão Patrimônio</p>
                </div>
              </div>
            )}
            
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`nav-item w-full justify-start ${isActive ? 'active' : ''} ${
                  isCollapsed ? 'px-2 justify-center' : ''
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
            <div className="text-xs text-muted-foreground text-center">
              <p>Sistema GMHALL</p>
              <p className="opacity-60">v2.0 • Premium</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};