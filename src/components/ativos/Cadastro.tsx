import { useState } from "react";
import { ArrowLeft, Upload, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PageType } from "@/pages/Index";

interface CadastroProps {
  onNavigate: (page: PageType) => void;
}

interface FormData {
  nome: string;
  categoria: string;
  numeroSerie: string;
  marca: string;
  modelo: string;
  localizacao: string;
  dataAquisicao: string;
  garantiaAte: string;
  centroCusto: string;
  observacoes: string;
  status: string;
}

const initialFormData: FormData = {
  nome: "",
  categoria: "",
  numeroSerie: "",
  marca: "",
  modelo: "",
  localizacao: "",
  dataAquisicao: "",
  garantiaAte: "",
  centroCusto: "",
  observacoes: "",
  status: "livre",
};

const categorias = [
  "Computadores",
  "Monitores", 
  "Periféricos",
  "Móveis",
  "Telefonia",
  "Rede",
  "Segurança",
  "Outros"
];

const localizacoes = [
  "TI - Desenvolvimento",
  "TI - Infraestrutura", 
  "Recursos Humanos",
  "Financeiro",
  "Comercial",
  "Diretoria",
  "Recepção",
  "Sala de Reunião",
  "Almoxarifado"
];

export const Cadastro = ({ onNavigate }: CadastroProps) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "Erro no upload",
          description: "A imagem deve ter no máximo 5MB",
          variant: "destructive",
        });
        return;
      }

      setImageFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    const requiredFields = ['nome', 'categoria', 'numeroSerie', 'localizacao'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Ativo cadastrado com sucesso!",
        description: `${formData.nome} foi adicionado ao sistema`,
      });

      // Reset form
      setFormData(initialFormData);
      setImageFile(null);
      setImagePreview(null);

      // Navigate back to catalog
      setTimeout(() => {
        onNavigate("catalogo");
      }, 1000);

    } catch (error) {
      toast({
        title: "Erro ao cadastrar",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 animate-fade-in-up">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onNavigate("catalogo")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        
        <div>
          <h1 className="text-3xl font-bold text-gradient">Cadastrar Ativo</h1>
          <p className="text-muted-foreground">Adicione um novo item ao patrimônio</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="card-premium p-6">
              <h2 className="text-lg font-semibold mb-4">Informações Básicas</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="nome">Nome do Ativo *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    placeholder="ex: Notebook Dell Inspiron 15"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="categoria">Categoria *</Label>
                  <Select 
                    value={formData.categoria} 
                    onValueChange={(value) => handleInputChange("categoria", value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria} value={categoria}>
                          {categoria}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="numeroSerie">Número de Série / TAG *</Label>
                  <Input
                    id="numeroSerie"
                    value={formData.numeroSerie}
                    onChange={(e) => handleInputChange("numeroSerie", e.target.value.toUpperCase())}
                    placeholder="ex: DL2024001"
                    className="mt-2 font-mono"
                  />
                </div>

                <div>
                  <Label htmlFor="marca">Marca</Label>
                  <Input
                    id="marca"
                    value={formData.marca}
                    onChange={(e) => handleInputChange("marca", e.target.value)}
                    placeholder="ex: Dell"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="modelo">Modelo</Label>
                  <Input
                    id="modelo"
                    value={formData.modelo}
                    onChange={(e) => handleInputChange("modelo", e.target.value)}
                    placeholder="ex: Inspiron 15 3000"
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Location & Dates */}
            <div className="card-premium p-6">
              <h2 className="text-lg font-semibold mb-4">Localização e Datas</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="localizacao">Localização *</Label>
                  <Select 
                    value={formData.localizacao} 
                    onValueChange={(value) => handleInputChange("localizacao", value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecione o setor" />
                    </SelectTrigger>
                    <SelectContent>
                      {localizacoes.map((local) => (
                        <SelectItem key={local} value={local}>
                          {local}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="centroCusto">Centro de Custo</Label>
                  <Input
                    id="centroCusto"
                    value={formData.centroCusto}
                    onChange={(e) => handleInputChange("centroCusto", e.target.value)}
                    placeholder="ex: 001.TI"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="dataAquisicao">Data de Aquisição</Label>
                  <Input
                    id="dataAquisicao"
                    type="date"
                    value={formData.dataAquisicao}
                    onChange={(e) => handleInputChange("dataAquisicao", e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="garantiaAte">Garantia até</Label>
                  <Input
                    id="garantiaAte"
                    type="date"
                    value={formData.garantiaAte}
                    onChange={(e) => handleInputChange("garantiaAte", e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="card-premium p-6">
              <h2 className="text-lg font-semibold mb-4">Informações Adicionais</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => handleInputChange("observacoes", e.target.value)}
                    placeholder="Informações adicionais sobre o ativo..."
                    className="mt-2"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Image Upload */}
            <div className="card-premium p-6">
              <h2 className="text-lg font-semibold mb-4">Imagem do Ativo</h2>
              
              {!imagePreview ? (
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Clique para selecionar uma imagem
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => document.getElementById("image-upload")?.click()}
                  >
                    Selecionar Arquivo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Máximo 5MB • JPG, PNG, WebP
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={removeImage}
                      className="absolute top-2 right-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => document.getElementById("image-upload")?.click()}
                  >
                    Alterar Imagem
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                </div>
              )}
            </div>

            {/* Status */}
            <div className="card-premium p-6">
              <h2 className="text-lg font-semibold mb-4">Status Inicial</h2>
              
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleInputChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="livre">Livre</SelectItem>
                  <SelectItem value="em_uso">Em uso</SelectItem>
                  <SelectItem value="manutencao">Em manutenção</SelectItem>
                  <SelectItem value="assistencia">Em assistência</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => onNavigate("catalogo")}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            className="btn-premium"
            disabled={isSubmitting}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? "Cadastrando..." : "Cadastrar Ativo"}
          </Button>
        </div>
      </form>
    </div>
  );
};