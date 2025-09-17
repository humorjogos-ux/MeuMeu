import { useState } from "react";
import { 
  Package, 
  Users, 
  Wrench, 
  Settings, 
  TrendingUp, 
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { PageType } from "@/pages/Index";

interface DashboardProps {
  onNavigate: (page: PageType) => void;
}

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: string;
  expandable?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
  children?: React.ReactNode;
  onClick?: () => void;
}

const KPICard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  expandable, 
  expanded, 
  onToggle, 
  children, 
  onClick 
}: KPICardProps) => (
  <div className="card-premium p-6 card-hover card-press animate-scale-in">
    <div 
      className={`${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            {icon}
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        
        <div className="text-right">
          {trend && (
            <div className="flex items-center space-x-1 text-xs text-status-free">
              <TrendingUp className="w-3 h-3" />
              <span>{trend}</span>
            </div>
          )}
          {expandable && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggle?.();
              }}
              className="p-1 hover:bg-accent rounded mt-2"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
    
    {expandable && expanded && children && (
      <div className="mt-4 pt-4 border-t border-border animate-accordion-down">
        {children}
      </div>
    )}
  </div>
);

export const Dashboard = ({ onNavigate }: DashboardProps) => {
  const [expandedKPI, setExpandedKPI] = useState<string | null>(null);

  const toggleKPI = (kpiId: string) => {
    setExpandedKPI(expandedKPI === kpiId ? null : kpiId);
  };

  const quickActions = [
    { label: "Catálogo", page: "catalogo" as PageType, icon: Package, color: "text-primary" },
    { label: "Cadastrar", page: "cadastro" as PageType, icon: Package, color: "text-status-free" },
    { label: "Vincular", page: "vincular" as PageType, icon: Users, color: "text-status-in-use" },
    { label: "Assistência", page: "assistencia" as PageType, icon: Wrench, color: "text-status-assistance" },
    { label: "Manutenção", page: "manutencao" as PageType, icon: Settings, color: "text-status-maintenance" },
    { label: "Relatórios", page: "relatorios" as PageType, icon: Package, color: "text-muted-foreground" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold text-gradient mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do sistema de gestão de ativos</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Itens Cadastrados"
          value="1,247"
          icon={<Package className="w-5 h-5" />}
          trend="+12%"
          expandable
          expanded={expandedKPI === "total"}
          onToggle={() => toggleKPI("total")}
          onClick={() => onNavigate("catalogo")}
        >
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Computadores</span>
              <span className="status-badge status-free">458</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Monitores</span>
              <span className="status-badge status-in-use">342</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Periféricos</span>
              <span className="status-badge status-maintenance">234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Móveis</span>
              <span className="status-badge status-assistance">213</span>
            </div>
          </div>
        </KPICard>

        <KPICard
          title="Em Uso"
          value="892"
          subtitle="71% do total"
          icon={<Users className="w-5 h-5" />}
          trend="+8%"
          onClick={() => onNavigate("catalogo")}
        />

        <KPICard
          title="Livres"
          value="285"
          subtitle="23% disponível"
          icon={<Package className="w-5 h-5" />}
          onClick={() => onNavigate("catalogo")}
        />

        <KPICard
          title="Em Assistência"
          value="47"
          subtitle="3% do total"
          icon={<Wrench className="w-5 h-5" />}
          onClick={() => onNavigate("assistencia")}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Acesso Rápido</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.page}
                onClick={() => onNavigate(action.page)}
                className="card-premium p-6 card-hover card-press flex flex-col items-center space-y-3 text-center group"
              >
                <div className={`p-3 rounded-lg bg-accent group-hover:bg-primary/10 transition-colors ${action.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Atividade Recente</h2>
        <div className="card-premium p-6">
          <div className="space-y-4">
            {[
              { action: "Notebook Dell vinculado", user: "João Silva", time: "há 2 horas", status: "in-use" },
              { action: "Monitor Samsung em assistência", user: "Maria Santos", time: "há 4 horas", status: "assistance" },
              { action: "Impressora HP cadastrada", user: "Admin", time: "há 6 horas", status: "free" },
              { action: "Cadeira ergonômica manutenção", user: "Carlos Lima", time: "há 1 dia", status: "maintenance" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full bg-status-${activity.status}`}></div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">por {activity.user}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};