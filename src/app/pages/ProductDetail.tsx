import { useParams, useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { Button } from '../components/Button';
import { Star, TrendingUp, Package, Activity, Phone, User, Building2, Map, FileText, BarChart3, Search, List, Grid3x3, ChevronRight, Truck } from 'lucide-react';
import { LocationIcon } from '../components/icons/LocationIcon';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import exampleImage from 'figma:asset/b5841aa0b8480fd0f73e553fb5d3a0b2d666e4be.png';
import productImage from 'figma:asset/fd91ecaee5de57563cdceace6678882d11a1b09d.png';
import backgroundImage from 'figma:asset/ca44b9278ade571ce23c788ab07a7af85c0382b9.png';

interface StoreWithProduct {
  id: string;
  name: string;
  code: string;
  quantity: number;
  inTransit?: number;
  distance: string;
  phone: string;
  regional: string;
  address: string;
}

const mockStoresWithProduct: StoreWithProduct[] = [
  {
    id: '1',
    name: 'DML-30 BANGU',
    code: '30',
    quantity: 56,
    inTransit: 120,
    distance: '13,12 Km',
    phone: '(21)2472-3000',
    regional: 'Regional VANESSA OLIVEIRA MIRANDA',
    address: 'AV ABILIO AUGUSTO TAVORA,279 LT 35, CABUCU, NOVA IGUACU - RJ',
  },
  {
    id: '2',
    name: 'DML 020 - NOVA IGUACU',
    code: '20',
    quantity: 92,
    inTransit: 85,
    distance: '15,93 Km',
    phone: '(21)2472-3000',
    regional: 'Regional VANESSA OLIVEIRA MIRANDA',
    address: 'AV MARECHAL FLORIANO PEIXOTO,2024, CENTRO, NOVA IGUACU - RJ',
  },
  {
    id: '3',
    name: 'DML 025 - NOVA IGUACU BOBS',
    code: '25',
    quantity: 42,
    distance: '26,72 Km',
    phone: '(21)2472-3000',
    regional: 'Regional VANESSA OLIVEIRA MIRANDA',
    address: 'AV DOUTOR MARIO GUIMARAES,347, CENTRO, NOVA IGUACU - RJ',
  },
  {
    id: '4',
    name: 'DML 096 - SHOPPING NOVA IGUACU I',
    code: '96',
    quantity: 80,
    inTransit: 45,
    distance: '18,45 Km',
    phone: '(21)3332-1500',
    regional: 'Regional CARLOS EDUARDO SANTOS',
    address: 'AV ABILIO AUGUSTO TAVORA,1111, CENTRO, NOVA IGUACU - RJ',
  },
  {
    id: '5',
    name: 'DML 087 - ESTRADA DA PALHADA',
    code: '87',
    quantity: 39,
    inTransit: 150,
    distance: '22,30 Km',
    phone: '(21)3332-1600',
    regional: 'Regional CARLOS EDUARDO SANTOS',
    address: 'EST DA PALHADA,555, CAMPO GRANDE, RIO DE JANEIRO - RJ',
  },
];

export function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Estados para pesquisa de lojas (quando não há storeId)
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'bairro' | 'loja' | 'cidade'>('bairro');
  const [stores, setStores] = useState<StoreWithProduct[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [viewMode, setViewMode] = useState<'detailed' | 'compact'>('detailed');

  const handleSearch = () => {
    setHasSearched(true);
    if (searchQuery.trim()) {
      setStores(mockStoresWithProduct);
    } else {
      setStores([]);
    }
  };

  // Se não tem storeId, mostra interface de busca de lojas
  if (!productId) {
    return (
      <div 
        className="min-h-screen pb-24 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Header 
          pageTitle="PRODUTO"
        />

        <div className="p-4 space-y-4">
          {/* Nome do produto com imagem */}
          <div className="bg-[#F7F9FC] rounded-sm p-4 flex items-center gap-4">
            {/* <img src={productImage} alt="Produto" className="w-20 h-20 object-contain" /> */}
            <h2 className="text-[#006eb4] font-bold text-lg flex-1">
              DORFLEX 300+35+50MG 10CPR
            </h2>
          </div>

          {/* Barra de pesquisa */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0066cc]" />
              <input
                type="text"
                placeholder="Buscar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-[10px] focus:border-[#006eb4] focus:ring-2 focus:ring-[#006eb4]/10 outline-none bg-white text-[#717171]"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-[#006eb4] text-white px-6 rounded-[10px] hover:bg-[#0066cc] transition-colors active:scale-95"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Filtros */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveFilter('bairro')}
              className={`flex-1 py-3 px-1 rounded-[10px] font-medium transition-all active:scale-95 ${
                activeFilter === 'bairro'
                  ? 'bg-[#006eb4] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Bairro
            </button>
            <button
              onClick={() => setActiveFilter('loja')}
              className={`flex-1 py-3 px-1 rounded-[10px] font-medium transition-all active:scale-95 ${
                activeFilter === 'loja'
                  ? 'bg-[#006eb4] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Loja
            </button>
            <button
              onClick={() => setActiveFilter('cidade')}
              className={`flex-1 py-3 px-1 rounded-[10px] font-medium transition-all active:scale-95 ${
                activeFilter === 'cidade'
                  ? 'bg-[#006eb4] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cidade / UF
            </button>
          </div>

          {/* Resultado e toggle de visualização */}
          {stores.length > 0 && (
            <div className="flex items-center justify-between">
              <p className="text-[#717171] font-medium text-sm">
                RESULTADO: {stores.length} {stores.length === 1 ? 'LOJA' : 'LOJAS'}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('detailed')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'detailed' ? 'text-[#0066cc]' : 'text-gray-400'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('compact')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'compact' ? 'text-[#0066cc]' : 'text-gray-400'
                  }`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Lista de lojas - Vista detalhada */}
          {stores.length > 0 && viewMode === 'detailed' && (
            <div className="space-y-4">
              {stores.map((store) => (
                <div
                  key={store.id}
                  className="card-base w-full p-5 text-left"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex-1 min-w-0 space-y-2.5">
                      <h3 className="font-bold text-[#006eb4] text-lg">{store.name}</h3>
                      
                      <div className="flex items-center gap-2 text-[#717171]">
                        <Map className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{store.distance}</span>
                      </div>

                      <div className="flex items-center gap-2 text-[#717171]">
                        <Building2 className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{store.code}</span>
                      </div>

                      <div className="flex items-center gap-2 text-[#717171]">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{store.phone}</span>
                      </div>

                      <div className="flex items-center gap-2 text-[#717171]">
                        <User className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{store.regional}</span>
                      </div>

                      <div className="flex items-start gap-2 text-[#717171]">
                        <LocationIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">{store.address}</span>
                      </div>

                      {/* <div className="flex items-center gap-2 text-[#006eb4]">
                        <Package className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm font-bold">{store.quantity} unidades em estoque</span>
                        {store.inTransit && store.inTransit > 0 && (
                          <div className="ml-2 w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-[12px]">{store.inTransit}</span>
                          </div>
                        )}
                      </div> */}
                    </div>
                    
                    {/* <ChevronRight className="w-5 h-5 text-[#717171] flex-shrink-0 mt-1" /> */}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-6 flex-1 border border-gray-200 rounded-lg px-[23px] py-[8px]">
                      {/* Coluna 1: Unidades em Estoque */}
                      <div className="flex flex-col items-center">
                        <span className="text-[#0066cc] font-bold text-[28px] leading-none">{store.quantity}</span>
                        <span className="text-gray-500 text-[12px] mt-1">unidade{store.quantity !== 1 ? 's' : ''}</span>
                      </div>
                      
                      {/* Barra divisória */}
                      <div className="h-12 w-px bg-gray-300"></div>
                      
                      {/* Coluna 2: Unidades em Trânsito */}
                      <div className="flex flex-col items-center">
                        <span className={`font-bold text-[28px] leading-none ${(store.inTransit && store.inTransit > 0) ? 'text-[#10b981]' : 'text-[#717171]'}`}>
                          {store.inTransit || 0}
                        </span>
                        <span className="text-gray-500 text-[12px] mt-1">Trânsito</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/map?storeId=${store.id}&storeName=${encodeURIComponent(store.name)}&storeAddress=${encodeURIComponent(store.address)}`);
                      }}
                      className="flex flex-col items-center justify-center flex-1 py-2 hover:bg-gray-50 rounded-lg transition-all active:scale-95"
                    >
                      <LocationIcon className="w-7 h-7 text-[#0066cc] mb-1" />
                      <span className="text-gray-700 text-[12px] font-medium">Localização</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Lista de lojas - Vista compacta */}
          {stores.length > 0 && viewMode === 'compact' && (
            <div className="space-y-2">
              {stores.map((store) => (
                <div key={store.id} className="bg-white border-b rounded-[10px] border-gray-200 flex items-center justify-between gap-0 px-[12px] py-[8px]">
                  <h3 className="font-bold text-[#006eb4] flex-1 text-[16px]">{store.name}</h3>
                  <div className="flex items-center justify-center gap-2 flex-1 border border-gray-200 rounded-lg px-[0px] py-[8px]">
                    {/* Coluna 1: Unidades em Estoque */}
                    <div className="flex flex-col items-center">
                      <span className="text-[#0066cc] font-bold text-[28px] leading-none">{store.quantity}</span>
                      <span className="text-gray-500 text-[12px] mt-1">unidade{store.quantity !== 1 ? 's' : ''}</span>
                    </div>
                    
                    {/* Barra divisória */}
                    <div className="h-12 w-px bg-gray-300"></div>
                    
                    {/* Coluna 2: Unidades em Trânsito */}
                    <div className="flex flex-col items-center">
                      <span className={`font-bold text-[28px] leading-none ${(store.inTransit && store.inTransit > 0) ? 'text-[#10b981]' : 'text-[#717171]'}`}>
                        {store.inTransit || 0}
                      </span>
                      <span className="text-gray-500 text-[12px] mt-1">Trânsito</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BottomNav */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <div className="flex">
            <button 
              className="flex-1 flex flex-col items-center justify-center py-3 transition-all active:scale-95 text-[#006eb4] bg-[#006eb4]/5"
            >
              <FileText className="w-6 h-6 mb-1 stroke-[2.5]" />
              <span className="font-semibold text-[14px]">Estoque</span>
            </button>
            
            <button 
              onClick={() => navigate(`/sales/${productId}`)}
              className="flex-1 flex flex-col items-center justify-center py-3 transition-all active:scale-95 text-gray-500 hover:text-[#006eb4] hover:bg-gray-50"
            >
              <BarChart3 className="w-6 h-6 mb-1" />
              <span className="font-medium text-[14px]">Vendas</span>
            </button>

            {/* <button 
              className="flex-1 flex flex-col items-center justify-center py-3 transition-all active:scale-95 text-gray-500 hover:text-[#006eb4] hover:bg-gray-50"
              onClick={() => navigate(`/where-to-find/${productId}`)}
            >
              <LocationIcon className="w-6 h-6 mb-1" />
              <span className="font-medium text-[14px]">Onde Tem</span>
            </button> */}
          </div>
        </nav>
      </div>
    );
  }

  // Mock da loja - em produção viria do storeId
  const store = mockStoresWithProduct.find(s => s.id === productId) || {
    name: 'DML-30 BANGU',
    code: '30',
    distance: '13,17 Km',
    phone: '(21)2472-3000',
    regional: 'Regional VANESSA OLIVEIRA MIRANDA',
    address: 'AV ABILIO AUGUSTO TAVORA,279 LT 35, CABUCU, NOVA IGUACU - RJ'
  };

  const product = {
    name: 'DORFLEX 300+35+50MG 10CPR',
    stock: 156,
    inTransit: 999
  };

  return (
    <div className="h-screen flex flex-col relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      {/* Header com nome da loja */}
      <Header 
        pageTitle={store.name}
      />

      <div className="flex-1 overflow-y-auto relative">
      <div className="p-4 pb-24 space-y-6">
        {/* Nome do produto */}
        <div className="bg-white rounded-[10px] shadow-sm p-5 relative min-h-[80px] flex items-center">
          <h2 className="text-[#006eb4] font-bold text-lg leading-snug text-left pr-12 break-words">
            {product.name}
          </h2>
          
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

        {/* Quantidade e Localização */}
        <div className="flex items-stretch gap-4 bg-">
          {/* Quantidade */}
          <div className="flex-1 bg-white rounded-[10px] shadow-sm p-2 flex items-center justify-center gap-6">
            {/* Coluna 1: Unidades em Estoque */}
            <div className="flex flex-col items-center">
              <span className="text-[#0066cc] font-bold text-[28px] leading-none">{product.stock}</span>
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
            onClick={() => navigate('/map')}
          >
            <LocationIcon className="w-12 h-12 text-[#0066cc] mb-2" />
            <p className="text-[#717171] text-[16px]">Localização</p>
          </div>
        </div>

        {/* Botão Sugerir Valor ou Faceamento */}
        <button
          onClick={() => navigate(`/suggestion/${productId}`)}
          className="w-full bg-[#0066cc] text-white font-bold text-lg py-5 px-6 rounded-[10px] shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
        >
          Sugerir Faceamento
        </button>
      </div>
      </div>

      {/* Footer customizado com 2 botões: Estoque e Vendas */}
      <nav className="bg-white border-t border-gray-200 safe-area-bottom shadow-lg shrink-0">
        <div className="flex">
          <button 
            className="flex-1 flex flex-col items-center justify-center py-3 transition-all active:scale-95 text-[#006eb4] bg-[#006eb4]/5"
          >
            <FileText className="w-6 h-6 mb-1 stroke-[2.5]" />
            <span className="font-semibold text-[16px]">Estoque</span>
          </button>
          
          <button 
            className="flex-1 flex flex-col items-center justify-center py-3 transition-all active:scale-95 text-gray-500 hover:text-[#006eb4] hover:bg-gray-50"
            onClick={() => navigate(`/product-sales/${productId}/${productId}`)}
          >
            <BarChart3 className="w-6 h-6 mb-1" />
            <span className="font-medium text-[16px]">Vendas</span>
          </button>
        </div>
      </nav>
    </div>
  );
}