import { PageType } from "@/pages/Index";

interface RelatoriosProps {
  onNavigate: (page: PageType) => void;
}

export const Relatorios = ({ onNavigate }: RelatoriosProps) => {
  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold text-gradient mb-2">Relatórios</h1>
        <p className="text-muted-foreground">Análises e exportações de dados</p>
      </div>
      
      <div className="card-premium p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Em Desenvolvimento</h2>
        <p className="text-muted-foreground">Esta funcionalidade será implementada em breve.</p>
      </div>
    </div>
  );
};