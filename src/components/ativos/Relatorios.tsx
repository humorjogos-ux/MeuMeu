import { useState } from "react";
import { PageType } from "@/pages/Index";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Calendar,
  Filter,
  PieChart,
  BarChart3,
  TrendingUp,
  Package,
  Users,
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign
} from "lucide-react";

interface RelatoriosProps {
  onNavigate: (page: PageType) => void;
}

interface RelatorioTemplate {
  id: string;
  nome: string;
  descricao: string;
  categoria: 'ativos' | 'financeiro' | 'manutencao' | 'usuarios';
  icon: React.ReactNode;
  campos: string[];
  formato: ('PDF' | 'Excel' | 'CSV')[];
}

export const Relatorios = ({ onNavigate }: RelatoriosProps) => {
  const [selectedReport, setSelectedReport] = useState<string>("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [format, setFormat] = useState("PDF");
  const [filters, setFilters] = useState({
    categoria: "",
    status: "",
    localizacao: ""
  });

  // Report templates
  const relatorioTemplates: RelatorioTemplate[] = [
    {
      id: "inventario-completo",
      nome: "Inventário Completo",
      descricao: "Lista completa de todos os ativos cadastrados",
      categoria: "ativos",
      icon: <Package className="h-5 w-5" />,
      campos: ["Nome", "Categoria", "Serial", "Status", "Localização", "Responsável"],
      formato: ["PDF", "Excel", "CSV"]
    },
    {
      id: "ativos-por-categoria",
      nome: "Ativos por Categoria",
      descricao: "Relatório agrupado por categoria de ativos",
      categoria: "ativos",
      icon: <PieChart className="h-5 w-5" />,
      campos: ["Categoria", "Quantidade", "Valor Total", "Status"],
      formato: ["PDF", "Excel"]
    },
    {
      id: "manutencoes-realizadas",
      nome: "Manutenções Realizadas",
      descricao: "Histórico de manutenções no período",
      categoria: "manutencao",
      icon: <Wrench className="h-5 w-5" />,
      campos: ["Ativo", "Tipo", "Data", "Custo", "Responsável", "Status"],
      formato: ["PDF", "Excel", "CSV"]
    },
    {
      id: "custos-manutencao",
      nome: "Custos de Manutenção",
      descricao: "Análise financeira das manutenções",
      categoria: "financeiro",
      icon: <DollarSign className="h-5 w-5" />,
      campos: ["Período", "Tipo", "Custo Total", "Média por Ativo"],
      formato: ["PDF", "Excel"]
    },
    {
      id: "ativos-vencimento",
      nome: "Ativos com Vencimento Próximo",
      descricao: "Garantias e contratos próximos do vencimento",
      categoria: "ativos",
      icon: <AlertTriangle className="h-5 w-5" />,
      campos: ["Ativo", "Tipo", "Data Vencimento", "Dias Restantes"],
      formato: ["PDF", "Excel"]
    },
    {
      id: "utilizacao-ativos",
      nome: "Utilização de Ativos",
      descricao: "Taxa de utilização e disponibilidade",
      categoria: "ativos",
      icon: <TrendingUp className="h-5 w-5" />,
      campos: ["Ativo", "Status", "Tempo Ativo", "Utilização %"],
      formato: ["PDF", "Excel"]
    },
    {
      id: "usuarios-responsaveis",
      nome: "Usuários Responsáveis",
      descricao: "Ativos vinculados por usuário",
      categoria: "usuarios",
      icon: <Users className="h-5 w-5" />,
      campos: ["Usuário", "Departamento", "Qtd Ativos", "Valor Total"],
      formato: ["PDF", "Excel", "CSV"]
    },
    {
      id: "performance-manutencao",
      nome: "Performance de Manutenção",
      descricao: "Indicadores de performance das manutenções",
      categoria: "manutencao",
      icon: <BarChart3 className="h-5 w-5" />,
      campos: ["Período", "SLA Cumprido", "Tempo Médio", "Satisfação"],
      formato: ["PDF", "Excel"]
    }
  ];

  // Quick stats
  const quickStats = [
    {
      title: "Total de Ativos",
      value: "1,234",
      icon: <Package className="h-5 w-5" />,
      color: "bg-blue-500/20 text-blue-300"
    },
    {
      title: "Manutenções Mês",
      value: "45",
      icon: <Wrench className="h-5 w-5" />,
      color: "bg-yellow-500/20 text-yellow-300"
    },
    {
      title: "Ativos Livres",
      value: "342",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "bg-green-500/20 text-green-300"
    },
    {
      title: "Pendências",
      value: "23",
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "bg-red-500/20 text-red-300"
    }
  ];

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'ativos': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'financeiro': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'manutencao': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'usuarios': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const handleGenerateReport = () => {
    // Logic to generate report would go here
    console.log("Generating report:", {
      template: selectedReport,
      dateRange,
      format,
      filters
    });
  };

  const filteredReports = relatorioTemplates.filter(report =>
    filters.categoria === "" || filters.categoria === "todas" || report.categoria === filters.categoria
  );

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold text-gradient mb-2">Relatórios</h1>
        <p className="text-muted-foreground">Análises e exportações de dados</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="card-premium">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Generation */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Gerar Relatório
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria</label>
              <Select value={filters.categoria} onValueChange={(value) => setFilters(prev => ({ ...prev, categoria: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as categorias</SelectItem>
                  <SelectItem value="ativos">Ativos</SelectItem>
                  <SelectItem value="financeiro">Financeiro</SelectItem>
                  <SelectItem value="manutencao">Manutenção</SelectItem>
                  <SelectItem value="usuarios">Usuários</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Data Início</label>
              <Input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Data Fim</label>
              <Input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Formato</label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="Excel">Excel</SelectItem>
                  <SelectItem value="CSV">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Modelos de Relatório</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReports.map((template) => (
            <Card 
              key={template.id} 
              className={`card-premium cursor-pointer transition-all hover-scale ${
                selectedReport === template.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedReport(template.id)}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    {template.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{template.nome}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{template.descricao}</p>
                    
                    <Badge className={getCategoriaColor(template.categoria)}>
                      {template.categoria}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Campos inclusos:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.campos.slice(0, 3).map((campo, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {campo}
                      </Badge>
                    ))}
                    {template.campos.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.campos.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex gap-1">
                    {template.formato.map((fmt) => (
                      <Badge key={fmt} variant="secondary" className="text-xs">
                        {fmt}
                      </Badge>
                    ))}
                  </div>
                  
                  {selectedReport === template.id && (
                    <Button
                      size="sm"
                      className="btn-premium"
                      onClick={handleGenerateReport}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Gerar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Relatórios Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                nome: "Inventário Completo",
                data: "2024-01-20",
                formato: "PDF",
                tamanho: "2.3 MB"
              },
              {
                nome: "Manutenções Realizadas",
                data: "2024-01-19",
                formato: "Excel",
                tamanho: "856 KB"
              },
              {
                nome: "Custos de Manutenção",
                data: "2024-01-18",
                formato: "PDF",
                tamanho: "1.1 MB"
              }
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-medium">{report.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(report.data).toLocaleDateString('pt-BR')} • {report.formato} • {report.tamanho}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhum relatório encontrado</h3>
          <p className="text-muted-foreground">Não há relatórios que correspondam aos filtros aplicados.</p>
        </div>
      )}
    </div>
  );
};