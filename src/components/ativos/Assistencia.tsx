import { useState } from "react";
import { PageType } from "@/pages/Index";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Headphones, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Phone,
  Mail,
  Calendar,
  User,
  Package
} from "lucide-react";

interface AssistenciaProps {
  onNavigate: (page: PageType) => void;
}

interface ChamadoAssistencia {
  id: number;
  ativo: string;
  solicitante: string;
  contato: string;
  prioridade: 'baixa' | 'media' | 'alta' | 'critica';
  status: 'aberto' | 'em_andamento' | 'aguardando' | 'resolvido' | 'fechado';
  categoria: 'hardware' | 'software' | 'rede' | 'instalacao' | 'configuracao';
  descricao: string;
  dataAbertura: string;
  dataResolucao?: string;
  tecnico?: string;
  solucao?: string;
  tempoResposta?: number; // em horas
}

export const Assistencia = ({ onNavigate }: AssistenciaProps) => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [prioridadeFilter, setPrioridadeFilter] = useState("");
  
  // Mock data
  const [chamados] = useState<ChamadoAssistencia[]>([
    {
      id: 1001,
      ativo: "Dell Laptop 001",
      solicitante: "Maria Santos",
      contato: "maria.santos@empresa.com",
      prioridade: "alta",
      status: "aberto",
      categoria: "hardware",
      descricao: "Laptop não liga após queda de energia",
      dataAbertura: "2024-01-20T09:15:00",
      tempoResposta: 2
    },
    {
      id: 1002,
      ativo: "HP Impressora 003",
      solicitante: "João Silva",
      contato: "(11) 99999-9999",
      prioridade: "media",
      status: "em_andamento",
      categoria: "hardware",
      descricao: "Impressora faz ruído estranho ao imprimir",
      dataAbertura: "2024-01-19T14:30:00",
      tecnico: "Carlos Lima",
      tempoResposta: 4
    },
    {
      id: 1003,
      ativo: "Monitor Samsung 005",
      solicitante: "Ana Costa",
      contato: "ana.costa@empresa.com",
      prioridade: "baixa",
      status: "resolvido",
      categoria: "software",
      descricao: "Problemas de resolução de tela",
      dataAbertura: "2024-01-18T10:00:00",
      dataResolucao: "2024-01-19T16:20:00",
      tecnico: "Roberto Mendes",
      solucao: "Atualização de drivers da placa de vídeo",
      tempoResposta: 30
    },
    {
      id: 1004,
      ativo: "Switch Rede 010",
      solicitante: "Pedro Oliveira",
      contato: "pedro.oliveira@empresa.com",
      prioridade: "critica",
      status: "aguardando",
      categoria: "rede",
      descricao: "Perda total de conectividade na rede",
      dataAbertura: "2024-01-20T11:45:00",
      tecnico: "Lucas Santos",
      tempoResposta: 0.5
    }
  ]);

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'baixa': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'media': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'alta': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'critica': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'aberto': return <AlertCircle className="h-4 w-4" />;
      case 'em_andamento': return <Clock className="h-4 w-4" />;
      case 'aguardando': return <Clock className="h-4 w-4" />;
      case 'resolvido': return <CheckCircle className="h-4 w-4" />;
      case 'fechado': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aberto': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'em_andamento': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'aguardando': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'resolvido': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'fechado': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
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

  const calcularTempoDecorrido = (dataAbertura: string, dataResolucao?: string) => {
    const inicio = new Date(dataAbertura);
    const fim = dataResolucao ? new Date(dataResolucao) : new Date();
    const diffMs = fim.getTime() - inicio.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      return `${diffDays}d ${diffHours % 24}h`;
    }
    return `${diffHours}h`;
  };

  const filteredChamados = chamados.filter(chamado =>
    (chamado.ativo.toLowerCase().includes(searchTerm.toLowerCase()) ||
     chamado.solicitante.toLowerCase().includes(searchTerm.toLowerCase()) ||
     chamado.descricao.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === "" || chamado.status === statusFilter) &&
    (prioridadeFilter === "" || chamado.prioridade === prioridadeFilter)
  );

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold text-gradient mb-2">Assistência Técnica</h1>
        <p className="text-muted-foreground">Gerenciar chamados de assistência técnica</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-premium">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <AlertCircle className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Abertos</p>
                <p className="text-2xl font-bold">{chamados.filter(c => c.status === 'aberto').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-premium">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Em Andamento</p>
                <p className="text-2xl font-bold">{chamados.filter(c => c.status === 'em_andamento').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-premium">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Resolvidos</p>
                <p className="text-2xl font-bold">{chamados.filter(c => c.status === 'resolvido').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-premium">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Críticos</p>
                <p className="text-2xl font-bold">{chamados.filter(c => c.prioridade === 'critica').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <Input
            placeholder="Buscar por ativo, solicitante ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              <SelectItem value="aberto">Aberto</SelectItem>
              <SelectItem value="em_andamento">Em Andamento</SelectItem>
              <SelectItem value="aguardando">Aguardando</SelectItem>
              <SelectItem value="resolvido">Resolvido</SelectItem>
              <SelectItem value="fechado">Fechado</SelectItem>
            </SelectContent>
          </Select>
          <Select value={prioridadeFilter} onValueChange={setPrioridadeFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas</SelectItem>
              <SelectItem value="baixa">Baixa</SelectItem>
              <SelectItem value="media">Média</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
              <SelectItem value="critica">Crítica</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="btn-premium">
          {showForm ? "Cancelar" : "Novo Chamado"}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card className="card-premium animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Headphones className="h-5 w-5" />
              Abrir Chamado de Assistência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Ativo</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar ativo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dell-001">Dell Laptop 001</SelectItem>
                    <SelectItem value="hp-003">HP Impressora 003</SelectItem>
                    <SelectItem value="samsung-005">Monitor Samsung 005</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Prioridade</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="critica">Crítica</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Categoria</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hardware">Hardware</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="rede">Rede</SelectItem>
                    <SelectItem value="instalacao">Instalação</SelectItem>
                    <SelectItem value="configuracao">Configuração</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Contato</label>
                <Input placeholder="Email ou telefone" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Descrição do Problema</label>
                <Textarea placeholder="Descreva detalhadamente o problema..." rows={4} />
              </div>

              <div className="md:col-span-2 flex gap-2">
                <Button type="submit" className="btn-premium">Abrir Chamado</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tickets List */}
      <div className="grid gap-4">
        {filteredChamados.map((chamado) => {
          const { date: dataAbertura, time: horaAbertura } = formatDate(chamado.dataAbertura);
          const dataResolucao = chamado.dataResolucao ? formatDate(chamado.dataResolucao) : null;
          
          return (
            <Card key={chamado.id} className="card-premium animate-fade-in hover-scale">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">#{chamado.id}</h3>
                      <Badge className={getPrioridadeColor(chamado.prioridade)}>
                        {chamado.prioridade}
                      </Badge>
                      <Badge className={getStatusColor(chamado.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(chamado.status)}
                          {chamado.status.replace('_', ' ')}
                        </div>
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {calcularTempoDecorrido(chamado.dataAbertura, chamado.dataResolucao)} decorrido
                    </div>
                  </div>

                  {/* Asset and Description */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      <span className="font-medium">{chamado.ativo}</span>
                    </div>
                    <p className="text-muted-foreground">{chamado.descricao}</p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      <div>
                        <span className="text-muted-foreground">Solicitante: </span>
                        <span>{chamado.solicitante}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {chamado.contato.includes('@') ? 
                        <Mail className="h-4 w-4 text-primary" /> : 
                        <Phone className="h-4 w-4 text-primary" />
                      }
                      <span>{chamado.contato}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{dataAbertura} às {horaAbertura}</span>
                    </div>
                    
                    {chamado.tecnico && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        <div>
                          <span className="text-muted-foreground">Técnico: </span>
                          <span>{chamado.tecnico}</span>
                        </div>
                      </div>
                    )}
                    
                    {dataResolucao && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Resolvido: {dataResolucao.date}</span>
                      </div>
                    )}
                  </div>

                  {/* Solution */}
                  {chamado.solucao && (
                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-sm">
                        <strong className="text-green-400">Solução:</strong> {chamado.solucao}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm">Ver Detalhes</Button>
                    {chamado.status === 'aberto' && (
                      <Button variant="outline" size="sm">Assumir</Button>
                    )}
                    {chamado.status === 'em_andamento' && (
                      <Button variant="outline" size="sm">Resolver</Button>
                    )}
                    {chamado.status === 'resolvido' && (
                      <Button variant="outline" size="sm">Fechar</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredChamados.length === 0 && (
        <div className="text-center py-12">
          <Headphones className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhum chamado encontrado</h3>
          <p className="text-muted-foreground">Não há chamados que correspondam aos filtros aplicados.</p>
        </div>
      )}
    </div>
  );
};