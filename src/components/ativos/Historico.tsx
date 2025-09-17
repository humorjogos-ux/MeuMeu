import { PageType } from "@/pages/Index";

interface HistoricoProps {
  onNavigate: (page: PageType) => void;
}

export const Historico = ({ onNavigate }: HistoricoProps) => {
  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold text-gradient mb-2">Histórico de Ativos</h1>
        <p className="text-muted-foreground">Timeline completo de movimentações</p>
      </div>
      
      <div className="card-premium p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Em Desenvolvimento</h2>
        <p className="text-muted-foreground">Esta funcionalidade será implementada em breve.</p>
      </div>
    </div>
  );
};