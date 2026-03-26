import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Header } from '../components/Header';
import { ArrowLeft, User, Mail, Phone, IdCard, Smartphone, Calendar, Bell, Fingerprint, LogOut, RefreshCw, ChevronRight, KeyRound, Copy } from 'lucide-react';
import { useBrand, getBackgroundImage } from '../contexts/BrandContext';
import { toast } from 'sonner';

export function Profile() {
  const navigate = useNavigate();
  const { selectedBrand } = useBrand();
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Mock user data - in production, this would come from authentication context
  const userData = {
    name: "João Silva",
    email: "joao.silva@example.com",
    login: "joao.silva",
    phone: "(11) 98765-4321",
    deviceId: "D1000-MOBILE-2024-001",
    activationDate: "15/08/2025",
    brand: "D1000"
  };

  const handleLogout = () => {
    // In production, clear authentication tokens
    navigate('/login');
  };

  const handleDeviceChange = () => {
    // In production, this would initiate the device change flow
    navigate('/activation-expired');
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(userData.email);
      toast.success('E-mail copiado para área de transferência');
    } catch (err) {
      toast.error('Erro ao copiar e-mail');
    }
  };

  const daysUntilExpiration = () => {
    const expDate = new Date('2026-02-15');
    const today = new Date();
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const expirationDays = daysUntilExpiration();
  const isExpiringSoon = expirationDays <= 30;

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${getBackgroundImage(selectedBrand)})` }}
    >
      <Header pageTitle="MEU PERFIL" />
      
      <div className="p-4 max-w-2xl mx-auto">
        {/* Profile Picture & Name */}
        <div className="card-base p-6 mb-4">
          <div className="flex items-center gap-4">
            {/* <div className="w-20 h-20 bg-gradient-to-br from-[#006EB4] to-[#00509E] rounded-2xl flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div> */}
            <div>
              <h2 className="font-bold text-[#006EB4] text-[24px]">{userData.name}</h2>
              <p className="text-auxiliary text-[#717171] font-bold text-[16px]">Representante {userData.brand}</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="card-base p-6 mb-4">
          <h3 className="text-[#006EB4] mb-4">Informações Pessoais</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 bg-[#00509E]/10 rounded-[10px] flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-[#00509E]" />
              </div>
              <div>
                <p className="text-[#717171] mb-1 text-[20px]">Login</p>
                <p className="text-[#006EB4] font-medium text-[20px]">{userData.login}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 bg-[#00509E]/10 rounded-[10px] flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#00509E]" />
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <p className="text-[#717171] text-[20px]">E-mail</p>
                  <Copy className="w-4 h-4 ml-2 cursor-pointer text-[#717171] hover:text-[#006EB4] transition-colors" onClick={handleCopyEmail} />
                </div>
                <p className="text-[#006EB4] font-medium text-[20px]">{userData.email}</p>
              </div>
            </div>

            
          </div>
        </div>

        {/* Change Password Button */}
        <button
          onClick={() => navigate('/change-password')}
          className="card-base w-full flex items-center justify-between p-4 mb-4 border-2 border-[#006eb4] text-[#006eb4] hover:bg-[#006eb4]/5 transition-all active:scale-95"
        >
          <div className="flex items-center gap-3">
            <KeyRound className="w-5 h-5" />
            <span className="font-semibold text-[20px]">Alterar Senha</span>
          </div>
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Card Dispositivo e Ativação oculto para análise de escopo */}
        {/* <div className="card-base p-6 mb-4">
          <h3 className="text-[#006EB4] mb-4">Dispositivo e Ativação</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 bg-[#00509E]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-5 h-5 text-[#00509E]" />
              </div>
              <div className="flex-1">
                <p className="text-[#717171] mb-1 text-[20px]">ID do Dispositivo</p>
                <p className="text-[#006EB4] font-medium font-mono text-[20px]">{userData.deviceId}</p>
              </div>
            </div>

            <button
              onClick={handleDeviceChange}
              className="w-full flex items-center justify-between p-4 rounded-sm border-2 border-[#006eb4] text-[#006eb4] hover:bg-[#006eb4]/5 transition-all active:scale-95"
            >
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5" />
                <span className="font-semibold text-[20px]">Trocar Dispositivo</span>
              </div>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div> */}

        {/* Settings */}
        <div className="card-base p-6 mb-4">
          <h3 className="text-[#006EB4] mb-4">Configurações</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#00509E]/10 rounded-[10px] flex items-center justify-center">
                  <Fingerprint className="w-5 h-5 text-[#00509E]" />
                </div>
                <div>
                  <p className="font-semibold text-[#006EB4] text-[20px]">Biometria</p>
                  <p className="text-[#717171] text-[15px]">Acesso rápido por impressão digital</p>
                </div>
              </div>
              <button
                onClick={() => setBiometricEnabled(!biometricEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  biometricEnabled ? 'bg-[#00509E]' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  biometricEnabled ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Seção de notificações oculta para análise de escopo */}
            {/* <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00509E]/10 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#00509E]" />
              </div>
              <div>
                <p className="font-semibold text-[#006EB4] text-[20px]">Notificações</p>
                <p className="text-[#717171] text-[15px]">Alertas e atualizações importantes</p>
              </div>
            </div> */}
          </div>
        </div>

        {/* Logout Button */}
        {/* <button
          onClick={handleLogout}
          className="card-base w-full py-5 px-4 border-2 border-red-600 text-red-600 flex items-center justify-center gap-3 hover:bg-red-50 transition-all active:scale-95"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-bold text-[20px]">Sair da Conta</span>
        </button> */}

        {/* Version Info */}
        <div className="mt-6 text-center">
          <p className="text-auxiliary text-[#717171]">Connect d1000 v3.0</p>
          <p className="text-xs text-[#717171] mt-1">© 2026 Rede d1000 - Todos os direitos reservados</p>
          <p className="text-xs text-[#717171] mt-1">Powered by NEKI</p>
        </div>
      </div>
    </div>
  );
}