import { PageType } from "@/pages/Index";

interface AssistenciaProps {
  onNavigate: (page: PageType) => void;
}

export const Assistencia = ({ onNavigate }: AssistenciaProps) => {
  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold text-gradient mb-2">Assistência Técnica</h1>
        <p className="text-muted-foreground">Gerenciar chamados de assistência técnica</p>
      </div>
      
      <div className="card-premium p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Em Desenvolvimento</h2>
        <p className="text-muted-foreground">Esta funcionalidade será implementada em breve.</p>
      </div>
    </div>
  );
};