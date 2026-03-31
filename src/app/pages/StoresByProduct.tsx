import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Header } from '../components/Header';
import { EmptyState } from '../components/EmptyState';
import { Search, Phone, User, Building2, ChevronRight, Map, FileText, BarChart3, SlidersHorizontal, X, LayoutGrid, LayoutList } from 'lucide-react';
import { LocationIcon } from '../components/icons/LocationIcon';
import { useBrand, getBackgroundImage } from '../contexts/BrandContext';

interface Store {
  id: string;
  name: string;
  code: string;
  distance: string;
  phone: string;
  regional: string;
  address: string;
  productQuantity: number;
  transitQuantity: number;
}

// Mock: lojas que têm o produto selecionado
const mockStoresByProduct: Store[] = [
  {
    id: '1',
    name: 'DML-30 BANGU',
    code: '30',
    distance: '13,17 Km',
    phone: '(21)2472-3000',
    regional: 'Regional VANESSA OLIVEIRA MIRANDA',
    address: 'AV ABILIO AUGUSTO TAVORA,279 LT 35, CABUCU, NOVA IGUACU - RJ',
    productQuantity: 150,
    transitQuantity: 20,
  },
  {
    id: '2',
    name: 'DML 018 - NOVA IGUAÇU',
    code: '18',
    distance: '9,20 Km',
    phone: '(21)2667-8800',
    regional: 'Regional VANESSA OLIVEIRA MIRANDA',
    address: 'RUA GENERAL RONDON,1050, CENTRO, NOVA IGUACU - RJ',
    productQuantity: 0,
    transitQuantity: 0,
  },
  {
    id: '4',
    name: 'DML 030 - BANGU',
    code: '30',
    distance: '8,45 Km',
    phone: '(21)3332-1500',
    regional: 'Regional CARLOS EDUARDO SANTOS',
    address: 'RUA FONSECA,240, BANGU, RIO DE JANEIRO - RJ',
    productQuantity: 85,
    transitQuantity: 15,
  },
  {
    id: '5',
    name: 'DML 042 - CAMPO GRANDE',
    code: '42',
    distance: '12,30 Km',
    phone: '(21)3332-1600',
    regional: 'Regional CARLOS EDUARDO SANTOS',
    address: 'EST DO MENDANHA,555 LJ A, CAMPO GRANDE, RIO DE JANEIRO - RJ',
    productQuantity: 42,
    transitQuantity: 10,
  },
  {
    id: '6',
    name: 'FML 005 - COPACABANA',
    code: '5',
    distance: '18,90 Km',
    phone: '(21)2548-7800',
    regional: 'Regional PATRICIA ALMEIDA COSTA',
    address: 'AV NOSSA SENHORA DE COPACABANA,680, COPACABANA, RIO DE JANEIRO - RJ',
    productQuantity: 95,
    transitQuantity: 5,
  },
  {
    id: '7',
    name: 'FML 012 - IPANEMA',
    code: '12',
    distance: '21,15 Km',
    phone: '(21)2523-4200',
    regional: 'Regional PATRICIA ALMEIDA COSTA',
    address: 'RUA VISCONDE DE PIRAJA,351, IPANEMA, RIO DE JANEIRO - RJ',
    productQuantity: 28,
    transitQuantity: 0,
  },
  {
    id: '9',
    name: 'TMO 007 - BARRA DA TIJUCA',
    code: '7',
    distance: '24,60 Km',
    phone: '(21)3325-8900',
    regional: 'Regional FERNANDO SILVA OLIVEIRA',
    address: 'AV DAS AMERICAS,7607 BL 2 LJ 115, BARRA DA TIJUCA, RIO DE JANEIRO - RJ',
    productQuantity: 120,
    transitQuantity: 25,
  },
  {
    id: '12',
    name: 'RSO 003 - TIJUCA',
    code: '3',
    distance: '14,55 Km',
    phone: '(21)2568-3400',
    regional: 'Regional MARIANA RODRIGUES LIMA',
    address: 'RUA CONDE DE BONFIM,392, TIJUCA, RIO DE JANEIRO - RJ',
    productQuantity: 67,
    transitQuantity: 10,
  },
];

export function StoresByProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedBrand } = useBrand();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'bairro' | 'loja' | 'cidade'>('bairro');
  const [stores, setStores] = useState<Store[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Estados para pesquisa avançada
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [advancedBairro, setAdvancedBairro] = useState('');
  const [advancedLoja, setAdvancedLoja] = useState('');
  const [advancedCidade, setAdvancedCidade] = useState('');

  // Estado para alternar visualização
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');

  // Salva o productName e productId quando o componente monta (para não perder no re-render)
  const [productName] = useState(() => location.state?.productName || '');
  const [productId] = useState(() => {
    // Se tem productId no state, usa ele
    if (location.state?.productId) {
      return location.state.productId;
    }
    // Fallback: usa um ID genérico para testes
    // Em produção, isso deveria redirecionar para a lista de produtos
    console.warn('productId não encontrado no location.state, usando fallback "1"');
    return '1';
  });

  console.log('StoresByProduct - productName salvo:', productName);
  console.log('StoresByProduct - productId salvo:', productId);
  console.log('StoresByProduct - location.state completo:', location.state);

  // Se não tiver productId, não redireciona mais, apenas mostra mensagem
  // useEffect removido para evitar loops de redirecionamento

  // Função para converter distância em número para ordenação
  const parseDistance = (distance: string): number => {
    return parseFloat(distance.replace(' Km', '').replace(',', '.'));
  };

  const handleSearch = () => {
    setHasSearched(true);
    if (searchQuery.trim()) {
      // Ordena as lojas por distância (do mais próximo para o mais distante)
      const sortedStores = [...mockStoresByProduct].sort((a, b) => {
        return parseDistance(a.distance) - parseDistance(b.distance);
      });
      setStores(sortedStores);
    } else {
      setStores([]);
    }
  };

  const handleAdvancedSearch = () => {
    setHasSearched(true);
    console.log('Pesquisa avançada:', { advancedBairro, advancedLoja, advancedCidade });
    
    // Por enquanto, retorna todas as lojas ordenadas por distância
    // No futuro, filtrar baseado nos campos preenchidos
    if (advancedBairro.trim() || advancedLoja.trim() || advancedCidade.trim()) {
      const sortedStores = [...mockStoresByProduct].sort((a, b) => {
        return parseDistance(a.distance) - parseDistance(b.distance);
      });
      setStores(sortedStores);
      setShowAdvancedSearch(false);
    } else {
      setStores([]);
    }
  };

  return (
    <>
      {/* Background Layer */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${getBackgroundImage(selectedBrand)})` }}
      />
      
      {/* Content Layer */}
      <div className="relative h-screen flex flex-col">
      <Header 
        pageTitle="Produto"
      />

      <div className="flex-1 overflow-y-auto pb-20">
      <div className="p-4 space-y-4">
        {/* Exibe o produto selecionado */}
        {productName && (
          <div className="bg-[#f7f9fc] h-[59.975px] rounded-[16px] flex items-center px-[15.993px]">
            <p className="font-bold text-[#006eb4] text-[18px] tracking-[-0.18px] leading-[28px]">{productName}</p>
          </div>
        )}

        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0066CC]" />
            <input
              type="text"
              placeholder="Buscar" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-3 border border-[#d1d5dc] rounded-[10px] focus:border-[#006eb4] focus:ring-2 focus:ring-[#006eb4]/10 outline-none bg-white text-[16px] placeholder:text-[rgba(113,113,113,0.5)]"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-[#006eb4] text-white px-6 rounded-[10px] hover:bg-[#006eb4] transition-colors active:scale-95 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowAdvancedSearch(true)}
            className="bg-[#006eb4] text-white px-6 rounded-[10px] hover:bg-[#005599] transition-colors active:scale-95 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]"
            title="Pesquisa Avançada"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2 p-[0px]">
          <button
            onClick={() => setActiveFilter('bairro')}
            className={`flex-1 rounded-[10px] font-medium transition-all active:scale-95 ${
              activeFilter === 'bairro'
                ? 'bg-[#006eb4] text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } px-1 py-3`}
          >Bairro</button>
          <button
            onClick={() => setActiveFilter('loja')}
            className={`flex-1 py-3 px-1 rounded-[10px] font-medium transition-all active:scale-95 ${
              activeFilter === 'loja'
                ? 'bg-[#006eb4] text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >Loja</button>
          <button
            onClick={() => setActiveFilter('cidade')}
            className={`flex-1 py-3 px-1 rounded-[10px] font-medium transition-all active:scale-95 ${
              activeFilter === 'cidade'
                ? 'bg-[#006eb4] text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >Cidade / UF</button>
        </div>
      </div>

      <div className="px-4">
        {!hasSearched && (
          <EmptyState
            description="Selecione uma das opções acima e clique na lupa para pesquisar lojas que possuem este produto."
          />
        )}

        {hasSearched && stores.length === 0 && (
          <EmptyState description="Nenhuma loja encontrada com este produto para sua busca." />
        )}

        {stores.length > 0 && (
          <div className="space-y-3">
            {/* Header com contador e botões de visualização */}
            <div className="flex items-center justify-between mb-1">
              <p className="text-[#717171] font-medium text-sm">
                RESULTADO: {stores.length} {stores.length === 1 ? 'LOJA' : 'LOJAS'}
              </p>
              
              {/* Botões de alternância de visualização */}
              <div className="flex gap-1 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                <button
                  onClick={() => setViewMode('card')}
                  className={`p-2 rounded-full transition-all active:scale-95 ${
                    viewMode === 'card'
                      ? 'bg-[#006eb4] text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  title="Visualização em Cards"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-full transition-all active:scale-95 ${
                    viewMode === 'list'
                      ? 'bg-[#006eb4] text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  title="Visualização em Lista"
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Visualização em Cards (padrão) */}
            {viewMode === 'card' && stores.map((store) => (
              <div key={store.id} className="card-base p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0 space-y-2.5">
                    <h3 className="font-bold text-[#006eb4] text-lg">{store.name}</h3>
                    
                    {/* Distância */}
                    <div className="flex items-center gap-2 text-[#717171]">
                      <Map className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{store.distance}</span>
                    </div>

                    {/* Código da loja */}
                    <div className="flex items-center gap-2 text-[#717171]">
                      <Building2 className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{store.code}</span>
                    </div>

                    {/* Telefone */}
                    <div className="flex items-center gap-2 text-[#717171]">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{store.phone}</span>
                    </div>

                    {/* Regional */}
                    <div className="flex items-center gap-2 text-[#717171]">
                      <User className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{store.regional}</span>
                    </div>

                    {/* Endereço */}
                    <div className="flex items-start gap-2 text-[#717171]">
                      <LocationIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{store.address}</span>
                    </div>
                  </div>
                </div>

                {/* Seção de Unidades/Trânsito e Botões */}
                <div className="flex gap-3 pt-3 border-t border-gray-200">
                  {/* Box de Unidades e Trânsito */}
                  <div className="flex items-center justify-center gap-6 flex-1 border border-gray-200 rounded-lg px-[23px] py-[8px]">
                    {/* Coluna 1: Unidades em Estoque */}
                    <div className="flex flex-col items-center">
                      <span className={`font-bold text-[28px] leading-none ${store.productQuantity === 0 ? 'text-[#717171]' : 'text-[#0066cc]'}`}>
                        {store.productQuantity}
                      </span>
                      <span className="text-gray-500 text-[12px] mt-1">unidade{store.productQuantity !== 1 ? 's' : ''}</span>
                    </div>
                    
                    {/* Barra divisória */}
                    <div className="h-12 w-px bg-gray-300"></div>
                    
                    {/* Coluna 2: Unidades em Trânsito */}
                    <div className="flex flex-col items-center">
                      <span className={`font-bold text-[28px] leading-none ${store.transitQuantity === 0 ? 'text-[#717171]' : 'text-[#10b981]'}`}>
                        {store.transitQuantity}
                      </span>
                      <span className="text-gray-500 text-[12px] mt-1">Trânsito</span>
                    </div>
                  </div>

                  {/* Botão Localização */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Abrindo mapa para:', store.name);
                      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`, '_blank');
                    }}
                    className="flex flex-col items-center justify-center flex-1 py-2 hover:bg-gray-50 rounded-lg transition-all active:scale-95"
                  >
                    <LocationIcon className="w-7 h-7 text-[#0066cc] mb-1" />
                    <span className="text-gray-700 text-[12px] font-medium">Localização</span>
                  </button>
                </div>

                {/* Botão Sugerir Valor - Linha separada */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Sugerir faceamento para loja:', store.name);
                    console.log('productId atual:', productId);
                    console.log('URL que será navegada:', `/suggestion/${productId}`);
                    
                    if (!productId) {
                      console.error('ERRO: productId está undefined ou null!');
                      alert('Erro: ID do produto não encontrado');
                      return;
                    }
                    
                    navigate(`/suggestion/${productId}`, {
                      state: { 
                        storeName: store.name,
                        storeId: store.id 
                      }
                    });
                  }}
                  className="w-full bg-[#0066cc] text-white font-semibold py-3 px-4 rounded-[10px] hover:bg-[#0055aa] active:scale-95 transition-all text-sm"
                >
                  Sugerir Faceamento
                </button>
              </div>
            ))}

            {/* Visualização em Lista compacta */}
            {viewMode === 'list' && stores.map((store) => (
              <div key={store.id} className="card-base p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#006eb4] text-base truncate">{store.name}</h3>
                    {/* <div className="flex items-center gap-3 text-xs text-[#717171]">
                      <span className="flex items-center gap-1">
                        <Map className="w-3 h-3" />
                        {store.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {store.phone}
                      </span>
                    </div> */}
                  </div>
                  <div className="flex gap-4 text-center">
                    <div>
                      <div className={`font-bold text-xl ${store.productQuantity === 0 ? 'text-[#717171]' : 'text-[#0066cc]'}`}>
                        {store.productQuantity}
                      </div>
                      <div className="text-[10px] text-gray-500">Unid.</div>
                    </div>
                    <div>
                      <div className={`font-bold text-xl ${store.transitQuantity === 0 ? 'text-[#717171]' : 'text-[#10b981]'}`}>
                        {store.transitQuantity}
                      </div>
                      <div className="text-[10px] text-gray-500">Trâns.</div>
                    </div>
                  </div>
                </div>
                {/* <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`, '_blank');
                    }}
                    className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all active:scale-95 text-sm"
                  >
                    <LocationIcon className="w-4 h-4 text-[#0066cc]" />
                    <span className="text-gray-700 font-medium">Mapa</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!productId) {
                        alert('Erro: ID do produto não encontrado');
                        return;
                      }
                      navigate(`/suggestion/${productId}`, {
                        state: { 
                          storeName: store.name,
                          storeId: store.id 
                        }
                      });
                    }}
                    className="flex-1 py-2 px-3 bg-[#0066cc] text-white font-semibold rounded-lg hover:bg-[#0055aa] active:scale-95 transition-all text-sm"
                  >
                    Sugerir
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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

          <button 
            onClick={() => navigate(`/where-to-find/${productId}`, { state: { productName } })}
            className="flex-1 flex flex-col items-center justify-center py-3 transition-all active:scale-95 text-gray-500 hover:text-[#006eb4] hover:bg-gray-50"
          >
            <LocationIcon className="w-6 h-6 mb-1" />
            <span className="font-medium text-[14px]">Onde Tem</span>
          </button>
        </div>
      </nav>
      </div>

      {/* Modal de Pesquisa Avançada */}
      {showAdvancedSearch && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-[10px] p-6 max-w-md w-full shadow-2xl animate-in zoom-in duration-300">
            {/* Cabeçalho do Modal */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#006eb4]">Pesquisa Avançada</h2>
              <button
                onClick={() => setShowAdvancedSearch(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Formulário de Pesquisa */}
            <div className="space-y-4">
              {/* Campo Bairro */}
              <div>
                <label className="block text-sm font-medium text-[#006eb4] mb-2">
                  Bairro
                </label>
                <input
                  type="text"
                  placeholder="Digite o bairro"
                  value={advancedBairro}
                  onChange={(e) => setAdvancedBairro(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-[10px] focus:border-[#006eb4] focus:ring-2 focus:ring-[#006eb4]/10 outline-none bg-white"
                />
              </div>

              {/* Campo Loja */}
              <div>
                <label className="block text-sm font-medium text-[#006eb4] mb-2">
                  Loja
                </label>
                <input
                  type="text"
                  placeholder="Digite o nome ou código da loja"
                  value={advancedLoja}
                  onChange={(e) => setAdvancedLoja(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-[10px] focus:border-[#006eb4] focus:ring-2 focus:ring-[#006eb4]/10 outline-none bg-white"
                />
              </div>

              {/* Campo Cidade/UF */}
              <div>
                <label className="block text-sm font-medium text-[#006eb4] mb-2">
                  Cidade / UF
                </label>
                <input
                  type="text"
                  placeholder="Digite a cidade ou UF"
                  value={advancedCidade}
                  onChange={(e) => setAdvancedCidade(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-[10px] focus:border-[#006eb4] focus:ring-2 focus:ring-[#006eb4]/10 outline-none bg-white"
                />
              </div>

              {/* Botões */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowAdvancedSearch(false);
                    setAdvancedBairro('');
                    setAdvancedLoja('');
                    setAdvancedCidade('');
                  }}
                  className="flex-1 py-3 px-6 rounded-[10px] border-2 border-[#006eb4] text-[#006eb4] font-semibold hover:bg-[#006eb4]/5 active:scale-95 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAdvancedSearch}
                  disabled={!advancedBairro.trim() && !advancedLoja.trim() && !advancedCidade.trim()}
                  className="flex-1 py-3 px-6 rounded-[10px] bg-[#006eb4] text-white font-semibold hover:bg-[#005599] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  Pesquisar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}