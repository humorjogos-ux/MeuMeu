import { useState } from "react";
import { Search, Filter, Grid, List, Eye, Edit, Plus, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageType } from "@/pages/Index";

interface CatalogoProps {
  onNavigate: (page: PageType) => void;
}

interface Ativo {
  id: string;
  nome: string;
  categoria: string;
  serial: string;
  status: "livre" | "em_uso" | "assistencia" | "manutencao" | "baixado";
  ultimoMovimento: string;
  imagem?: string;
}

const mockAtivos: Ativo[] = [
  {
    id: "1",
    nome: "Notebook Dell Inspiron 15",
    categoria: "Computadores",
    serial: "DL2024001",
    status: "livre",
    ultimoMovimento: "Devolvido em 15/03/2024",
  },
  {
    id: "2", 
    nome: "Monitor Samsung 24\"",
    categoria: "Monitores",
    serial: "SM2024002",
    status: "em_uso",
    ultimoMovimento: "Vinculado a João Silva em 10/03/2024",
  },
  {
    id: "3",
    nome: "Impressora HP LaserJet",
    categoria: "Periféricos", 
    serial: "HP2024003",
    status: "assistencia",
    ultimoMovimento: "Em assistência desde 08/03/2024",
  },
  {
    id: "4",
    nome: "Cadeira Ergonômica",
    categoria: "Móveis",
    serial: "CE2024004", 
    status: "manutencao",
    ultimoMovimento: "Em manutenção desde 05/03/2024",
  },
  {
    id: "5",
    nome: "Macbook Pro M2",
    categoria: "Computadores",
    serial: "AP2024005",
    status: "em_uso",
    ultimoMovimento: "Vinculado a Maria Santos em 01/03/2024",
  },
  {
    id: "6",
    nome: "Teclado Mecânico",
    categoria: "Periféricos",
    serial: "TM2024006",
    status: "livre",
    ultimoMovimento: "Cadastrado em 28/02/2024",
  },
];

const statusConfig = {
  livre: { label: "Livre", className: "status-free" },
  em_uso: { label: "Em Uso", className: "status-in-use" },
  assistencia: { label: "Assistência", className: "status-assistance" },
  manutencao: { label: "Manutenção", className: "status-maintenance" },
  baixado: { label: "Baixado", className: "status-archived" },
};

export const Catalogo = ({ onNavigate }: CatalogoProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [groupByCategory, setGroupByCategory] = useState(false);

  const filteredAtivos = mockAtivos.filter((ativo) => {
    const matchesSearch = ativo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ativo.serial.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || ativo.categoria === selectedCategory;
    const matchesStatus = selectedStatus === "all" || ativo.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(mockAtivos.map(ativo => ativo.categoria))];

  const renderAtivoCard = (ativo: Ativo, index: number) => (
    <div 
      key={ativo.id} 
      className={`card-premium p-6 card-hover card-press cursor-pointer grid-fade-in`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Asset Image Placeholder */}
      <div className="w-full h-32 bg-muted rounded-lg mb-4 flex items-center justify-center">
        <div className="text-muted-foreground text-4xl font-bold">
          {ativo.categoria.charAt(0)}
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg truncate" title={ativo.nome}>
            {ativo.nome}
          </h3>
          <p className="text-sm text-muted-foreground">{ativo.categoria}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground font-mono">
            {ativo.serial}
          </span>
          <span className={`status-badge ${statusConfig[ativo.status].className}`}>
            {statusConfig[ativo.status].label}
          </span>
        </div>
        
        <p className="text-xs text-muted-foreground line-clamp-2">
          {ativo.ultimoMovimento}
        </p>
        
        <div className="flex space-x-2 pt-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Eye className="w-4 h-4 mr-2" />
            Ver
          </Button>
          <Button size="sm" variant="outline">
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderGroupedByCategory = () => {
    const grouped = filteredAtivos.reduce((acc, ativo) => {
      if (!acc[ativo.categoria]) acc[ativo.categoria] = [];
      acc[ativo.categoria].push(ativo);
      return acc;
    }, {} as Record<string, Ativo[]>);

    return Object.entries(grouped).map(([categoria, ativos]) => (
      <div key={categoria} className="space-y-4">
        <h3 className="text-xl font-semibold text-gradient flex items-center">
          {categoria} 
          <span className="ml-2 text-sm text-muted-foreground font-normal">
            ({ativos.length} itens)
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ativos.map((ativo, index) => renderAtivoCard(ativo, index))}
        </div>
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Catálogo de Ativos</h1>
          <p className="text-muted-foreground">
            {filteredAtivos.length} de {mockAtivos.length} itens
          </p>
        </div>
        
        <Button 
          onClick={() => onNavigate("cadastro")}
          className="btn-premium"
        >
          <Plus className="w-4 h-4 mr-2" />
          Cadastrar Ativo
        </Button>
      </div>

      {/* Filters */}
      <div className="card-premium p-6 space-y-4">
        <div className="flex flex-wrap gap-4 items-end">
          {/* Search */}
          <div className="flex-1 min-w-64">
            <label className="text-sm font-medium mb-2 block">Buscar</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Nome do ativo ou número de série..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="min-w-48">
            <label className="text-sm font-medium mb-2 block">Categoria</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="min-w-48">
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="livre">Livres</SelectItem>
                <SelectItem value="em_uso">Em uso</SelectItem>
                <SelectItem value="assistencia">Em assistência</SelectItem>
                <SelectItem value="manutencao">Em manutenção</SelectItem>
                <SelectItem value="baixado">Baixados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Options */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {/* Group Toggle */}
          <Button
            variant={groupByCategory ? "default" : "outline"}
            size="sm"
            onClick={() => setGroupByCategory(!groupByCategory)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Agrupar
          </Button>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="space-y-8">
        {groupByCategory ? (
          renderGroupedByCategory()
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAtivos.map((ativo, index) => renderAtivoCard(ativo, index))}
          </div>
        )}

        {filteredAtivos.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum ativo encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar os filtros ou{" "}
              <button 
                onClick={() => onNavigate("cadastro")}
                className="text-primary hover:underline"
              >
                cadastre um novo ativo
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};