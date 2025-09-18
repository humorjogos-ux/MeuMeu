import { useState } from "react";
import { PageType } from "@/pages/Index";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Wrench, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface ManutencaoProps {
  onNavigate: (page: PageType) => void;
}

interface ManutencaoItem {
  id: number;
  ativo: string;
  tipo: 'preventiva' | 'corretiva' | 'preditiva';
  status: 'agendada' | 'em_andamento' | 'concluida' | 'cancelada';
  dataAgendada: string;
  dataConclusao?: string;
  responsavel: string;
  descricao: string;
  custo?: number;
  observacoes?: string;
}

export const Manutencao = ({ onNavigate }: ManutencaoProps) => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  
  // Mock data
  const [manutencoes] = useState<ManutencaoItem[]>([
    {
      id: 1,
      ativo: "Dell Laptop 001",
      tipo: "preventiva",
      status: "agendada",
      dataAgendada: "2024-01-20",
      responsavel: "João Silva",
      descricao: "Limpeza interna e atualização de drivers"
    },
    {
      id: 2,
      ativo: "HP Impressora 003",
      tipo: "corretiva",
      status: "em_andamento",
      dataAgendada: "2024-01-18",
      responsavel: "Maria Santos",
      descricao: "Reparo do mecanismo de alimentação de papel",
      custo: 150.00
    },
    {
      id: 3,
      ativo: "Monitor Samsung 005",
      tipo: "corretiva",
      status: "concluida",
      dataAgendada: "2024-01-15",
      dataConclusao: "2024-01-16",
      responsavel: "Carlos Lima",
      descricao: "Substituição da fonte de alimentação",
      custo: 80.00,
      observacoes: "Peça substituída com garantia de 6 meses"
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'agendada': return <Clock className="h-4 w-4" />;
      case 'em_andamento': return <Wrench className="h-4 w-4" />;
      case 'concluida': return <CheckCircle className="h-4 w-4" />;
      case 'cancelada': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendada': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'em_andamento': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'concluida': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'cancelada': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'preventiva': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'corretiva': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'preditiva': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const filteredManutencoes = manutencoes.filter(item =>
    item.ativo.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === "" || item.status === statusFilter)
  );

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold text-gradient mb-2">Manutenção</h1>
        <p className="text-muted-foreground">Registro e controle de manutenções</p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Buscar por ativo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os status</SelectItem>
              <SelectItem value="agendada">Agendada</SelectItem>
              <SelectItem value="em_andamento">Em Andamento</SelectItem>
              <SelectItem value="concluida">Concluída</SelectItem>
              <SelectItem value="cancelada">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="btn-premium">
          {showForm ? "Cancelar" : "Nova Manutenção"}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card className="card-premium animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Agendar Manutenção
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
                <label className="text-sm font-medium">Tipo de Manutenção</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="preventiva">Preventiva</SelectItem>
                    <SelectItem value="corretiva">Corretiva</SelectItem>
                    <SelectItem value="preditiva">Preditiva</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Data Agendada</label>
                <Input type="date" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Responsável</label>
                <Input placeholder="Nome do responsável" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Descrição</label>
                <Textarea placeholder="Descreva o serviço a ser realizado..." />
              </div>

              <div className="md:col-span-2 flex gap-2">
                <Button type="submit" className="btn-premium">Agendar</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Maintenance List */}
      <div className="grid gap-4">
        {filteredManutencoes.map((item) => (
          <Card key={item.id} className="card-premium animate-fade-in hover-scale">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{item.ativo}</h3>
                    <Badge className={getTipoColor(item.tipo)}>
                      {item.tipo}
                    </Badge>
                    <Badge className={getStatusColor(item.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(item.status)}
                        {item.status.replace('_', ' ')}
                      </div>
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground">{item.descricao}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      <span>Agendada: {new Date(item.dataAgendada).toLocaleDateString('pt-BR')}</span>
                    </div>
                    {item.dataConclusao && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Concluída: {new Date(item.dataConclusao).toLocaleDateString('pt-BR')}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground">Responsável: </span>
                      <span>{item.responsavel}</span>
                    </div>
                    {item.custo && (
                      <div>
                        <span className="text-muted-foreground">Custo: </span>
                        <span className="text-green-400">R$ {item.custo.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                  
                  {item.observacoes && (
                    <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Observações:</strong> {item.observacoes}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Editar</Button>
                  {item.status === 'agendada' && (
                    <Button variant="outline" size="sm">Iniciar</Button>
                  )}
                  {item.status === 'em_andamento' && (
                    <Button variant="outline" size="sm">Concluir</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredManutencoes.length === 0 && (
        <div className="text-center py-12">
          <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhuma manutenção encontrada</h3>
          <p className="text-muted-foreground">Não há manutenções que correspondam aos filtros aplicados.</p>
        </div>
      )}
    </div>
  );
};