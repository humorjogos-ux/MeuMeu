import { PageType } from "@/pages/Index";

interface VincularProps {
  onNavigate: (page: PageType) => void;
}

export const Vincular = ({ onNavigate }: VincularProps) => {
  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold text-gradient mb-2">Vincular Ativo</h1>
        <p className="text-muted-foreground">Atribuir ativos a funcionários</p>
      </div>
      
      <div className="card-premium p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Em Desenvolvimento</h2>
        <p className="text-muted-foreground">Esta funcionalidade será implementada em breve.</p>
      </div>
    </div>
  );
};