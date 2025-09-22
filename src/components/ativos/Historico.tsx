import { useState } from "react";
import { PageType } from "@/pages/Index";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  History, 
  Package, 
  User, 
  MapPin, 
  Calendar,
  ArrowRight,
  Edit3,
  Trash2,
  UserPlus,
  Settings
} from "lucide-react";

interface HistoricoProps {
  onNavigate: (page: PageType) => void;
}

interface HistoricoItem {
  id: number;
  ativo: string;
  acao: 'criacao' | 'edicao' | 'vinculacao' | 'desvinculacao' | 'manutencao' | 'baixa' | 'movimentacao';
  descricao: string;
  usuario: string;
  data: string;
  localizacaoAnterior?: string;
  localizacaoNova?: string;
  detalhes?: string;
}

export const Historico = ({ onNavigate }: HistoricoProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [acaoFilter, setAcaoFilter] = useState("");
  const [dataFilter, setDataFilter] = useState("");
  
  // Mock data
  const [historico] = useState<HistoricoItem[]>([
    {
      id: 1,
      ativo: "Dell Laptop 001",
      acao: "criacao",
      descricao: "Ativo cadastrado no sistema",
      usuario: "Admin Sistema",
      data: "2024-01-15T10:30:00",
      detalhes: "Ativo importado via planilha Excel"
    },
    {
      id: 2,
      ativo: "Dell Laptop 001",
      acao: "vinculacao",
      descricao: "Ativo vinculado ao colaborador",
      usuario: "João Silva",
      data: "2024-01-16T14:15:00",
      detalhes: "Vinculado a Maria Santos - Setor: TI"
    },
    {
      id: 3,
      ativo: "HP Impressora 003",
      acao: "movimentacao",
      descricao: "Ativo movido entre setores",
      usuario: "Carlos Lima",
      data: "2024-01-17T09:20:00",
      localizacaoAnterior: "Administrativo",
      localizacaoNova: "Vendas"
    },
    {
      id: 4,
      ativo: "Monitor Samsung 005",
      acao: "manutencao",
      descricao: "Enviado para manutenção corretiva",
      usuario: "Ana Costa",
      data: "2024-01-18T11:45:00",
      detalhes: "Problema na fonte de alimentação"
    },
    {
      id: 5,
      ativo: "Dell Laptop 001",
      acao: "edicao",
      descricao: "Dados do ativo atualizados",
      usuario: "João Silva",
      data: "2024-01-19T16:30:00",
      detalhes: "Atualização do número de série"
    },
    {
      id: 6,
      ativo: "Cadeira Ergonômica 008",
      acao: "baixa",
      descricao: "Ativo dado baixa do sistema",
      usuario: "Admin Sistema",
      data: "2024-01-20T08:15:00",
      detalhes: "Motivo: Danos irreparáveis"
    }
  ]);

  const getAcaoIcon = (acao: string) => {
    switch (acao) {
      case 'criacao': return <Package className="h-4 w-4" />;
      case 'edicao': return <Edit3 className="h-4 w-4" />;
      case 'vinculacao': return <UserPlus className="h-4 w-4" />;
      case 'desvinculacao': return <User className="h-4 w-4" />;
      case 'manutencao': return <Settings className="h-4 w-4" />;
      case 'baixa': return <Trash2 className="h-4 w-4" />;
      case 'movimentacao': return <MapPin className="h-4 w-4" />;
      default: return <History className="h-4 w-4" />;
    }
  };

  const getAcaoColor = (acao: string) => {
    switch (acao) {
      case 'criacao': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'edicao': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'vinculacao': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'desvinculacao': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'manutencao': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'baixa': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'movimentacao': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('pt-BR'),
      time: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const filteredHistorico = historico.filter(item => {
    const matchesSearch = item.ativo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.usuario.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAcao = acaoFilter === "" || acaoFilter === "todas" || item.acao === acaoFilter;
    const matchesData = dataFilter === "" || item.data.startsWith(dataFilter);
    
    return matchesSearch && matchesAcao && matchesData;
  });

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold text-gradient mb-2">Histórico de Ativos</h1>
        <p className="text-muted-foreground">Timeline completo de movimentações</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Buscar por ativo, descrição ou usuário..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64"
        />
        <Select value={acaoFilter} onValueChange={setAcaoFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filtrar por ação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas as ações</SelectItem>
            <SelectItem value="criacao">Criação</SelectItem>
            <SelectItem value="edicao">Edição</SelectItem>
            <SelectItem value="vinculacao">Vinculação</SelectItem>
            <SelectItem value="desvinculacao">Desvinculação</SelectItem>
            <SelectItem value="manutencao">Manutenção</SelectItem>
            <SelectItem value="movimentacao">Movimentação</SelectItem>
            <SelectItem value="baixa">Baixa</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="date"
          value={dataFilter}
          onChange={(e) => setDataFilter(e.target.value)}
          className="w-full sm:w-48"
        />
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {filteredHistorico.map((item, index) => {
          const { date, time } = formatDate(item.data);
          
          return (
            <Card key={item.id} className="card-premium animate-fade-in hover-scale">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center">
                    <div className={`p-2 rounded-full border ${getAcaoColor(item.acao)}`}>
                      {getAcaoIcon(item.acao)}
                    </div>
                    {index < filteredHistorico.length - 1 && (
                      <div className="w-px h-16 bg-border mt-2" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{item.ativo}</h3>
                        <Badge className={getAcaoColor(item.acao)}>
                          {item.acao}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{date} às {time}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground">{item.descricao}</p>
                    
                    {/* Movement details */}
                    {item.localizacaoAnterior && item.localizacaoNova && (
                      <div className="flex items-center gap-2 text-sm bg-muted/30 p-3 rounded-lg">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{item.localizacaoAnterior}</span>
                        <ArrowRight className="h-4 w-4" />
                        <span>{item.localizacaoNova}</span>
                      </div>
                    )}
                    
                    {/* Additional details */}
                    {item.detalhes && (
                      <div className="text-sm bg-muted/30 p-3 rounded-lg">
                        <strong>Detalhes:</strong> {item.detalhes}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Por:</span>
                      <span>{item.usuario}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredHistorico.length === 0 && (
        <div className="text-center py-12">
          <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhum histórico encontrado</h3>
          <p className="text-muted-foreground">Não há registros que correspondam aos filtros aplicados.</p>
        </div>
      )}
    </div>
  );
};