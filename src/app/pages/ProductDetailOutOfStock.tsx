import { useParams, useNavigate, useLocation } from 'react-router';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Star, Package, Phone, User, Building2, Map, FileText, BarChart3, AlertCircle, PackageX, TrendingDown, Bell, CheckCircle } from 'lucide-react';
import { LocationIcon } from '../components/icons/LocationIcon';
import { useState, useEffect } from 'react';
import backgroundImage from 'figma:asset/ca44b9278ade571ce23c788ab07a7af85c0382b9.png';

export function ProductDetailOutOfStock() {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleNotificationToggle = () => {
    const newState = !isNotificationActive;
    setIsNotificationActive(newState);
    if (newState) {
      setShowModal(true);
    }
  };

  // Fecha o modal automaticamente após 5 segundos
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  // Mock da loja
  const store = {
    name: 'DML-30 BANGU',
    code: '30',
    distance: '13,17 Km',
    phone: '(21)2472-3000',
    regional: 'Regional VANESSA OLIVEIRA MIRANDA',
    address: 'AV ABILIO AUGUSTO TAVORA,279 LT 35, CABUCU, NOVA IGUACU - RJ'
  };

  const product = {
    name: 'Paracetamol 750mg - Caixa com 10 comprimidos',
    stock: 0,
    inTransit: 10,
    lastStock: '15/02/2026', // Última vez que teve estoque
    avgSales: 45 // Média de vendas mensais
  };

  return (
    <div 
      className="min-h-screen pb-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Header com nome da loja */}
      <Header 
        pageTitle={store.name}
      />

      <div className="p-4 space-y-6">
        {/* Alerta de produto sem estoque */}
        {/* <div className="bg-red-50 border-2 border-red-500 rounded-[10px] p-4 flex items-start gap-3 shadow-sm">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-red-700 font-bold text-base mb-1">Produto Indisponível</h3>
            <p className="text-red-600 text-sm leading-relaxed">
              Este produto está temporariamente sem estoque nesta loja.
            </p>
          </div>
        </div> */}

        {/* Nome do produto com badge */}
        <div className="bg-white rounded-[10px] shadow-sm p-5 relative min-h-[80px] flex items-center">
          <div className="flex-1 pr-24">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full border border-red-300">
                SEM ESTOQUE
              </span>
            </div>
            <h2 className="text-[#006eb4] font-bold text-lg leading-snug text-left break-words">
              {product.name}
            </h2>
          </div>
          
          {/* Botão de notificação */}
          <button
            onClick={handleNotificationToggle}
            className="absolute top-5 right-14 p-2 bg-gray-50 rounded-full shadow-sm hover:shadow-md hover:bg-gray-100 transition-all active:scale-95 mx-[13px] my-[0px]"
          >
            <Bell 
              className={`w-5 h-5 ${isNotificationActive ? 'fill-[#0066cc] text-[#0066cc]' : 'text-gray-400'}`} 
            />
          </button>
          
          {/* Botão de favorito */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-5 right-5 p-2 bg-gray-50 rounded-full shadow-sm hover:shadow-md hover:bg-gray-100 transition-all active:scale-95"
          >
            <Star 
              className={`w-5 h-5 ${isFavorite ? 'fill-[#fbbf24] text-[#fbbf24]' : 'text-gray-400'}`} 
            />
          </button>
        </div>

        {/* Informações da loja */}
        <div className="bg-white rounded-[10px] shadow-sm p-5 space-y-3">
          <div className="flex items-center gap-3 text-[#717171]">
            <Map className="w-5 h-5 flex-shrink-0" />
            <span className="text-[14px]">{store.distance}</span>
          </div>

          <div className="flex items-center gap-3 text-[#717171]">
            <Building2 className="w-5 h-5 flex-shrink-0" />
            <span className="text-[14px]">{store.code}</span>
          </div>

          <div className="flex items-center gap-3 text-[#717171]">
            <Phone className="w-5 h-5 flex-shrink-0" />
            <span className="text-[14px]">{store.phone}</span>
          </div>

          <div className="flex items-center gap-3 text-[#717171]">
            <User className="w-5 h-5 flex-shrink-0" />
            <span className="text-[14px]">{store.regional}</span>
          </div>

          <div className="flex items-start gap-3 text-[#717171]">
            <LocationIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed text-[14px]">{store.address}</span>
          </div>
        </div>

        {/* Quantidade ZERADA e Localização */}
        <div className="flex items-stretch gap-4">
          {/* Quantidade */}
          <div className="flex-1 bg-white rounded-[10px] shadow-sm p-2 flex items-center justify-center gap-6">
            {/* Coluna 1: Unidades em Estoque (0 em vermelho) */}
            <div className="flex flex-col items-center">
              <span className="text-red-600 font-bold text-[28px] leading-none">{product.stock}</span>
              <span className="text-gray-500 text-[12px] mt-1">unidade{product.stock !== 1 ? 's' : ''}</span>
            </div>
            
            {/* Barra divisória */}
            {product.inTransit && product.inTransit > 0 && (
              <div className="h-12 w-px bg-gray-300"></div>
            )}
            
            {/* Coluna 2: Unidades em Trânsito */}
            {product.inTransit && product.inTransit > 0 && (
              <div className="flex flex-col items-center">
                <span className="text-[#10b981] font-bold text-[28px] leading-none">{product.inTransit}</span>
                <span className="text-gray-500 text-[12px] mt-1">Trânsito</span>
              </div>
            )}
          </div>

          {/* Localização */}
          <div 
            className="flex-1 bg-white rounded-[10px] shadow-sm p-2 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow active:scale-95"
            onClick={() => navigate(`/map?storeId=${store.code}&storeName=${encodeURIComponent(store.name)}&storeAddress=${encodeURIComponent(store.address)}`)}
          >
            <LocationIcon className="w-12 h-12 text-[#0066cc] mb-2" />
            <p className="text-[#717171] text-[16px]">Localização</p>
          </div>
        </div>

        {/* Informações adicionais sobre o produto */}
        {/* <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-[10px] p-5 space-y-3">
          <h3 className="text-orange-800 font-bold text-base flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            Informações do Produto
          </h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-orange-700">Último estoque:</span>
              <span className="font-semibold text-orange-900">{product.lastStock}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-orange-700">Média de vendas mensal:</span>
              <span className="font-semibold text-orange-900">{product.avgSales} unidades</span>
            </div>
          </div>
        </div> */}

        {/* Botão para buscar em outras lojas */}
        {/* <button
          onClick={() => navigate(`/products/${productId}`)}
          className="w-full bg-[#0066cc] text-white font-bold text-base py-5 px-6 rounded-[10px] shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <Package className="w-5 h-5" />
          Buscar em Outras Lojas
        </button> */}

        {/* Botão de sugestão - REATIVADO */}
        <button
          onClick={() => navigate(`/suggestion/${productId}`)}
          className="w-full bg-[#0066cc] text-white font-bold text-base py-5 px-6 rounded-[10px] shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
        >
          Sugerir Faceamento
        </button>
      </div>

      {/* Footer customizado com 2 botões: Estoque e Vendas */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom shadow-lg">
        <div className="flex">
          <button 
            className="flex-1 flex flex-col items-center justify-center py-3 transition-all active:scale-95 text-[#006eb4] bg-[#006eb4]/5"
          >
            <FileText className="w-6 h-6 mb-1 stroke-[2.5]" />
            <span className="font-semibold text-[16px]">Estoque</span>
          </button>
          
          <button 
            className="flex-1 flex flex-col items-center justify-center py-3 transition-all active:scale-95 text-gray-500 hover:text-[#006eb4] hover:bg-gray-50"
            onClick={() => navigate(`/product-sales/${productId}/${store.code}`)}
          >
            <BarChart3 className="w-6 h-6 mb-1" />
            <span className="font-medium text-[16px]">Vendas</span>
          </button>
        </div>
      </nav>

      {/* Modal de notificação */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-[10px] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#006eb4] mb-2">
                Aviso de Retorno ao Estoque
              </h3>
              <p className="text-[#717171]">
                Você será avisado quando o produto retornar ao estoque.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}