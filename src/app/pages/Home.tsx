import { useNavigate } from 'react-router';
import { Store, Package, TrendingUp, MessageCircle, Bell, BarChart3, Star, MapPin } from 'lucide-react';
import { Header } from '../components/Header';
import { LocationIcon } from '../components/icons/LocationIcon';
import { useBrand, getBackgroundImage } from '../contexts/BrandContext';

export function Home() {
  const navigate = useNavigate();
  const { selectedBrand } = useBrand();

  const backgroundUrl = getBackgroundImage(selectedBrand);
  console.log('🏠 Home render:', { selectedBrand, backgroundUrl });

  // Mock data - in production, this would come from API
  const kpiData = {
    totalStores: 248,
    productsTracked: 1432,
    monthSales: 'R$ 2.8M',
    growth: '+12.5%'
  };

  return (
    <>
      {/* Background Layer */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />
      
      {/* Content Layer */}
      <div className="relative min-h-screen">
      <Header 
        isHome
      />

      <div className="px-4 py-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-6">
          <h3 className="text-[#006eb4] mb-1">Bem-vindo!</h3>
          {/* <p className="text-auxiliary text-[#717171] text-[16px]">Aqui estão suas informações estratégicas</p> */}
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* KPI Cards - Lojas e Produtos aumentados */}
          <div 
            onClick={() => navigate('/stores')}
            className="card-base p-8 cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <div 
                className="w-16 h-14 rounded-[10px] flex items-center justify-center"
                style={{ backgroundColor: `${selectedBrand?.bgColor || '#006eb4'}1A` }}
              >
                <Store 
                  className="w-8 h-8" 
                  style={{ color: selectedBrand?.id === 'drogasmil' ? '#F58C1E' : selectedBrand?.bgColor || '#006eb4' }}
                />
              </div>
              <p 
                className="font-semibold text-[24px]"
                style={{ color: selectedBrand?.id === 'farmalife' ? '#006eb4' : '#006eb4' }}
              >
                Lojas
              </p>
              {/* <p className="text-strategic text-[#006eb4] text-[16px]">{kpiData.totalStores}</p> */}
            </div>
          </div>

          <div 
            onClick={() => navigate('/products')}
            className="card-base p-8 cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <div 
                className="w-16 h-14 rounded-[10px] flex items-center justify-center"
                style={{ backgroundColor: `${selectedBrand?.bgColor || '#006eb4'}1A` }}
              >
                <Package 
                  className="w-8 h-8" 
                  style={{ color: selectedBrand?.id === 'drogasmil' ? '#F58C1E' : selectedBrand?.bgColor || '#006eb4' }}
                />
              </div>
              <p 
                className="font-semibold text-[24px]"
                style={{ color: selectedBrand?.id === 'farmalife' ? '#006eb4' : '#006eb4' }}
              >
                Produtos
              </p>
              {/* <p className="text-strategic text-[#006eb4] text-[16px]">{kpiData.productsTracked}</p> */}
            </div>
          </div>

          {/* Cards de KPI escondidos para análise de escopo */}
          {/* <div className="card-base p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-[#10b981]/10 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[#10b981]" />
              </div>
            </div>
            <p className="text-strategic text-[#006eb4]">{kpiData.monthSales}</p>
            <p className="text-auxiliary text-[#717171] mt-1">Vendas do mês</p>
          </div>

          <div className="card-base p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-[#10b981]/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#10b981]" />
              </div>
            </div>
            <p className="text-strategic text-[#10b981]">{kpiData.growth}</p>
            <p className="text-auxiliary text-[#717171] mt-1">Crescimento</p>
          </div> */}
        </div>

        {/* Actions Section */}
        <div className="mb-4">
          <h3 className="text-[#006eb4] mb-4 text-[20px]">Acesso Rápido</h3>
        </div>

        {/* Action Cards */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/favorites')}
            className="card-base w-full p-5 flex items-center gap-4 active:scale-[0.98] transition-transform"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#ffb914] to-[#ffb914] rounded-[10px] flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-[#006eb4] font-semibold text-[20px]" style={{ color: selectedBrand?.id === 'farmalife' ? '#006eb4' : '#006eb4' }}>Meus Favoritos</h4>
              <p 
                className="text-auxiliary text-[16px] font-bold"
                style={{ color: '#006eb4' }}
              >
                Produtos salvos
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/store-map-search')}
            className="card-base w-full p-5 flex items-center gap-4 active:scale-[0.98] transition-transform"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#f58c1e] to-[#f58c1e] rounded-[10px] flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-[#006eb4] font-semibold text-[20px]" style={{ color: selectedBrand?.id === 'farmalife' ? '#006eb4' : '#006eb4' }}>Mapa de Lojas</h4>
              <p 
                className="text-auxiliary text-[16px] font-bold"
                style={{ color: '#006eb4' }}
              >
                Visualizar no mapa
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/contact')}
            className="card-base w-full p-5 flex items-center gap-4 active:scale-[0.98] transition-transform"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#006eb4] to-[#006eb4] rounded-[10px] flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-[#006eb4] font-semibold text-[20px]" style={{ color: selectedBrand?.id === 'farmalife' ? '#006eb4' : '#006eb4' }}>Fale Conosco</h4>
              <p 
                className="text-auxiliary text-[16px] font-bold"
                style={{ color: '#006eb4' }}
              >
                Enviar mensagem ou sugestão
              </p>
            </div>
          </button>
        </div>

        {/* Version Info */}
        <div className="card-base mt-6 p-2 text-center mb-2 bg-[#ffffffb3]">
          {/* <p className="text-auxiliary text-[#717171]">Connect d1000 v2.0.0</p> */}
          <p className="text-xs mt-1 text-[#000000]">© 2026 Rede d1000 - Todos os direitos reservados</p>
          <p className="text-xs mt-1 text-[#000000]">Powered by NEKI</p>
        </div>

        {/* Recent Activity - Seção escondida para análise de escopo */}
        {/* <div className="mt-8">
          <h3 className="text-[#006eb4] mb-4 text-[20px]">Atividades Recentes</h3>
          <div className="card-base p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#fbbf24]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-[#fbbf24]" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#006eb4]">Nova atualização disponível</p>
                <p className="text-auxiliary text-[#717171] mt-1">Dados sincronizados há 5 minutos</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      </div>
    </>
  );
}