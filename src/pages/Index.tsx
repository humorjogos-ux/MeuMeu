import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/ativos/Navigation";
import { Dashboard } from "@/components/ativos/Dashboard";
import { Catalogo } from "@/components/ativos/Catalogo";
import { Cadastro } from "@/components/ativos/Cadastro";
import { Vincular } from "@/components/ativos/Vincular";
import { Assistencia } from "@/components/ativos/Assistencia";
import { Historico } from "@/components/ativos/Historico";
import { Manutencao } from "@/components/ativos/Manutencao";
import { Relatorios } from "@/components/ativos/Relatorios";
import { Administracao } from "@/components/ativos/Administracao";

export type PageType = 
  | "dashboard" 
  | "catalogo" 
  | "cadastro" 
  | "vincular" 
  | "assistencia" 
  | "historico" 
  | "manutencao" 
  | "relatorios" 
  | "administracao";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onNavigate={setCurrentPage} />;
      case "catalogo":
        return <Catalogo onNavigate={setCurrentPage} />;
      case "cadastro":
        return <Cadastro onNavigate={setCurrentPage} />;
      case "vincular":
        return <Vincular onNavigate={setCurrentPage} />;
      case "assistencia":
        return <Assistencia onNavigate={setCurrentPage} />;
      case "historico":
        return <Historico onNavigate={setCurrentPage} />;
      case "manutencao":
        return <Manutencao onNavigate={setCurrentPage} />;
      case "relatorios":
        return <Relatorios onNavigate={setCurrentPage} />;
      case "administracao":
        return <Administracao onNavigate={setCurrentPage} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="ml-64 transition-all duration-300">
        <div className="p-8">
          {renderPage()}
        </div>
      </main>
      
      <Toaster />
    </div>
  );
};

export default Index;