import { useState } from "react";
import { PageType } from "@/pages/Index";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Users, 
  Shield, 
  Database, 
  Mail, 
  Bell,
  Palette,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle,
  User,
  UserPlus,
  Key,
  Eye,
  EyeOff
} from "lucide-react";

interface AdministracaoProps {
  onNavigate: (page: PageType) => void;
}

interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: 'admin' | 'manager' | 'user';
  status: 'ativo' | 'inativo';
  ultimoAcesso: string;
}

export const Administracao = ({ onNavigate }: AdministracaoProps) => {
  const [activeTab, setActiveTab] = useState("usuarios");
  const [showUserForm, setShowUserForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // System settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    systemAlerts: true,
    autoBackup: true,
    maintenanceMode: false,
    requireStrongPassword: true,
    sessionTimeout: 30
  });

  // Mock users data
  const [usuarios] = useState<Usuario[]>([
    {
      id: 1,
      nome: "Admin Sistema",
      email: "admin@empresa.com",
      perfil: "admin",
      status: "ativo",
      ultimoAcesso: "2024-01-20T10:30:00"
    },
    {
      id: 2,
      nome: "João Silva",
      email: "joao.silva@empresa.com",
      perfil: "manager",
      status: "ativo",
      ultimoAcesso: "2024-01-19T16:45:00"
    },
    {
      id: 3,
      nome: "Maria Santos",
      email: "maria.santos@empresa.com",
      perfil: "user",
      status: "ativo",
      ultimoAcesso: "2024-01-20T09:15:00"
    },
    {
      id: 4,
      nome: "Carlos Lima",
      email: "carlos.lima@empresa.com",
      perfil: "user",
      status: "inativo",
      ultimoAcesso: "2024-01-10T14:20:00"
    }
  ]);

  const getPerfilColor = (perfil: string) => {
    switch (perfil) {
      case 'admin': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'manager': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'user': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'inativo': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const formatLastAccess = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold text-gradient mb-2">Administração</h1>
        <p className="text-muted-foreground">Configurações e gerenciamento do sistema</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="usuarios" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="configuracoes" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configurações
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Backup
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="usuarios" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Gerenciar Usuários</h2>
            <Button onClick={() => setShowUserForm(!showUserForm)} className="btn-premium">
              <UserPlus className="h-4 w-4 mr-2" />
              {showUserForm ? "Cancelar" : "Novo Usuário"}
            </Button>
          </div>

          {showUserForm && (
            <Card className="card-premium animate-fade-in">
              <CardHeader>
                <CardTitle>Cadastrar Novo Usuário</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome Completo</label>
                    <Input placeholder="Digite o nome completo" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="email@empresa.com" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Perfil de Acesso</label>
                    <select className="w-full p-2 border border-border rounded-md bg-background">
                      <option value="user">Usuário</option>
                      <option value="manager">Gerente</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Senha Temporária</label>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Senha temporária" 
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex gap-2">
                    <Button type="submit" className="btn-premium">Criar Usuário</Button>
                    <Button type="button" variant="outline" onClick={() => setShowUserForm(false)}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {usuarios.map((usuario) => (
              <Card key={usuario.id} className="card-premium animate-fade-in hover-scale">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/20 rounded-full">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{usuario.nome}</h3>
                        <p className="text-muted-foreground">{usuario.email}</p>
                        <p className="text-sm text-muted-foreground">
                          Último acesso: {formatLastAccess(usuario.ultimoAcesso)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge className={getPerfilColor(usuario.perfil)}>
                        {usuario.perfil}
                      </Badge>
                      <Badge className={getStatusColor(usuario.status)}>
                        {usuario.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Editar</Button>
                        <Button variant="outline" size="sm">
                          {usuario.status === 'ativo' ? 'Desativar' : 'Ativar'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="configuracoes" className="space-y-6">
          <h2 className="text-xl font-semibold">Configurações do Sistema</h2>
          
          <div className="grid gap-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Notificações por email</label>
                    <p className="text-sm text-muted-foreground">Enviar notificações importantes por email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(value) => handleSettingChange('emailNotifications', value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Alertas do sistema</label>
                    <p className="text-sm text-muted-foreground">Exibir alertas na interface do usuário</p>
                  </div>
                  <Switch
                    checked={settings.systemAlerts}
                    onCheckedChange={(value) => handleSettingChange('systemAlerts', value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Backup automático</label>
                    <p className="text-sm text-muted-foreground">Realizar backup automático diariamente</p>
                  </div>
                  <Switch
                    checked={settings.autoBackup}
                    onCheckedChange={(value) => handleSettingChange('autoBackup', value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Modo manutenção</label>
                    <p className="text-sm text-muted-foreground">Bloquear acesso ao sistema para usuários</p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(value) => handleSettingChange('maintenanceMode', value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-medium">Timeout de sessão (minutos)</label>
                  <Input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                    className="w-24"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="seguranca" className="space-y-6">
          <h2 className="text-xl font-semibold">Configurações de Segurança</h2>
          
          <div className="grid gap-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Políticas de Senha
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Exigir senhas complexas</label>
                    <p className="text-sm text-muted-foreground">Mínimo 8 caracteres, números e símbolos</p>
                  </div>
                  <Switch
                    checked={settings.requireStrongPassword}
                    onCheckedChange={(value) => handleSettingChange('requireStrongPassword', value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Ações de Segurança
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Logs de Acesso
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Relatório de Tentativas Inválidas
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Key className="h-4 w-4 mr-2" />
                    Resetar Todas as Senhas
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Auditoria de Permissões
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Backup Tab */}
        <TabsContent value="backup" className="space-y-6">
          <h2 className="text-xl font-semibold">Gerenciamento de Backup</h2>
          
          <div className="grid gap-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Backup e Restauração
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h3 className="font-medium">Criar Backup</h3>
                    <p className="text-sm text-muted-foreground">
                      Gerar backup completo do banco de dados e arquivos do sistema.
                    </p>
                    <Button className="btn-premium w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Gerar Backup
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Restaurar Sistema</h3>
                    <p className="text-sm text-muted-foreground">
                      Restaurar o sistema a partir de um arquivo de backup.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Selecionar Arquivo
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Histórico de Backups</h3>
                  <div className="space-y-3">
                    {[
                      { date: '2024-01-20', size: '245 MB', status: 'success' },
                      { date: '2024-01-19', size: '242 MB', status: 'success' },
                      { date: '2024-01-18', size: '238 MB', status: 'success' },
                      { date: '2024-01-17', size: '235 MB', status: 'error' }
                    ].map((backup, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          {backup.status === 'success' ? 
                            <CheckCircle className="h-4 w-4 text-green-400" /> :
                            <AlertTriangle className="h-4 w-4 text-red-400" />
                          }
                          <div>
                            <p className="font-medium">{backup.date}</p>
                            <p className="text-sm text-muted-foreground">{backup.size}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};