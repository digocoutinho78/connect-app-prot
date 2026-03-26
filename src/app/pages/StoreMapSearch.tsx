import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { EmptyState } from '../components/EmptyState';
import { Search, Phone, User, Building2, ChevronRight, Map } from 'lucide-react';
import { LocationIcon } from '../components/icons/LocationIcon';
import backgroundImage from 'figma:asset/ca44b9278ade571ce23c788ab07a7af85c0382b9.png';

interface Store {
  id: string;
  name: string;
  code: string;
  distance: string;
  phone: string;
  regional: string;
  address: string;
  productsCount: number;
}

const mockStores: Store[] = [
  {
    id: '1',
    name: 'DML-30 BANGU',
    code: '30',
    distance: '13,17 Km',
    phone: '(21)2472-3000',
    regional: 'Regional VANESSA OLIVEIRA MIRANDA',
    address: 'AV ABILIO AUGUSTO TAVORA,279 LT 35, CABUCU, NOVA IGUACU - RJ',
    productsCount: 45,
  },
  {
    id: '2',
    name: 'DML 020 - NOVA IGUACU',
    code: '20',
    distance: '15,94 Km',
    phone: '(21)2472-3000',
    regional: 'Regional VANESSA OLIVEIRA MIRANDA',
    address: 'AV MARECHAL FLORIANO PEIXOTO,2024 LJ SLJ SOBRELOJA, CENTRO, NOVA IGUACU - RJ',
    productsCount: 38,
  },
  {
    id: '3',
    name: 'DML 025 - NOVA IGUACU BOBS',
    code: '25',
    distance: '26,72 Km',
    phone: '(21)2472-3000',
    regional: 'Regional VANESSA OLIVEIRA MIRANDA',
    address: 'AV DOUTOR MARIO GUIMARAES,347, CENTRO, NOVA IGUACU - RJ',
    productsCount: 52,
  },
  {
    id: '4',
    name: 'DML 030 - BANGU',
    code: '30',
    distance: '8,45 Km',
    phone: '(21)3332-1500',
    regional: 'Regional CARLOS EDUARDO SANTOS',
    address: 'RUA FONSECA,240, BANGU, RIO DE JANEIRO - RJ',
    productsCount: 67,
  },
  {
    id: '5',
    name: 'DML 042 - CAMPO GRANDE',
    code: '42',
    distance: '12,30 Km',
    phone: '(21)3332-1600',
    regional: 'Regional CARLOS EDUARDO SANTOS',
    address: 'EST DO MENDANHA,555 LJ A, CAMPO GRANDE, RIO DE JANEIRO - RJ',
    productsCount: 72,
  },
  {
    id: '6',
    name: 'FML 005 - COPACABANA',
    code: '5',
    distance: '18,90 Km',
    phone: '(21)2548-7800',
    regional: 'Regional PATRICIA ALMEIDA COSTA',
    address: 'AV NOSSA SENHORA DE COPACABANA,680, COPACABANA, RIO DE JANEIRO - RJ',
    productsCount: 89,
  },
  {
    id: '7',
    name: 'FML 012 - IPANEMA',
    code: '12',
    distance: '21,15 Km',
    phone: '(21)2523-4200',
    regional: 'Regional PATRICIA ALMEIDA COSTA',
    address: 'RUA VISCONDE DE PIRAJA,351, IPANEMA, RIO DE JANEIRO - RJ',
    productsCount: 95,
  },
  {
    id: '8',
    name: 'FML 018 - BOTAFOGO',
    code: '18',
    distance: '16,75 Km',
    phone: '(21)2537-9100',
    regional: 'Regional PATRICIA ALMEIDA COSTA',
    address: 'RUA VOLUNTARIOS DA PATRIA,445, BOTAFOGO, RIO DE JANEIRO - RJ',
    productsCount: 78,
  },
  {
    id: '9',
    name: 'TMO 007 - BARRA DA TIJUCA',
    code: '7',
    distance: '24,60 Km',
    phone: '(21)3325-8900',
    regional: 'Regional FERNANDO SILVA OLIVEIRA',
    address: 'AV DAS AMERICAS,7607 BL 2 LJ 115, BARRA DA TIJUCA, RIO DE JANEIRO - RJ',
    productsCount: 103,
  },
  {
    id: '10',
    name: 'TMO 015 - RECREIO',
    code: '15',
    distance: '28,40 Km',
    phone: '(21)3325-9000',
    regional: 'Regional FERNANDO SILVA OLIVEIRA',
    address: 'AV DAS AMERICAS,19019 LJ D E F, RECREIO DOS BANDEIRANTES, RIO DE JANEIRO - RJ',
    productsCount: 87,
  },
  {
    id: '11',
    name: 'TMO 023 - JACAREPAGUA',
    code: '23',
    distance: '19,25 Km',
    phone: '(21)2428-6700',
    regional: 'Regional FERNANDO SILVA OLIVEIRA',
    address: 'EST DOS BANDEIRANTES,7852, JACAREPAGUA, RIO DE JANEIRO - RJ',
    productsCount: 64,
  },
  {
    id: '12',
    name: 'RSO 003 - TIJUCA',
    code: '3',
    distance: '14,55 Km',
    phone: '(21)2568-3400',
    regional: 'Regional MARIANA RODRIGUES LIMA',
    address: 'RUA CONDE DE BONFIM,392, TIJUCA, RIO DE JANEIRO - RJ',
    productsCount: 81,
  },
  {
    id: '13',
    name: 'RSO 009 - MEIER',
    code: '9',
    distance: '11,80 Km',
    phone: '(21)2596-7200',
    regional: 'Regional MARIANA RODRIGUES LIMA',
    address: 'RUA DIAS DA CRUZ,188, MEIER, RIO DE JANEIRO - RJ',
    productsCount: 73,
  },
  {
    id: '14',
    name: 'RSO 014 - MADUREIRA',
    code: '14',
    distance: '9,35 Km',
    phone: '(21)3350-8800',
    regional: 'Regional MARIANA RODRIGUES LIMA',
    address: 'EST DO PORTELA,222, MADUREIRA, RIO DE JANEIRO - RJ',
    productsCount: 92,
  },
  {
    id: '15',
    name: 'DML 050 - NITEROI',
    code: '50',
    distance: '22,90 Km',
    phone: '(21)2719-5500',
    regional: 'Regional VANESSA OLIVEIRA MIRANDA',
    address: 'RUA CORONEL MOREIRA CESAR,229, ICARAI, NITEROI - RJ',
    productsCount: 86,
  },
  {
    id: '16',
    name: 'DML 055 - SAO GONCALO',
    code: '55',
    distance: '25,10 Km',
    phone: '(21)2605-3300',
    regional: 'Regional VANESSA OLIVEIRA MIRANDA',
    address: 'RUA DR FRANCISCO PORTELA,2571, PATRONATO, SAO GONCALO - RJ',
    productsCount: 56,
  },
  {
    id: '17',
    name: 'FML 028 - CENTRO RJ',
    code: '28',
    distance: '17,20 Km',
    phone: '(21)2220-4100',
    regional: 'Regional PATRICIA ALMEIDA COSTA',
    address: 'RUA BUENOS AIRES,68, CENTRO, RIO DE JANEIRO - RJ',
    productsCount: 94,
  },
  {
    id: '18',
    name: 'FML 033 - LEBLON',
    code: '33',
    distance: '23,45 Km',
    phone: '(21)2529-8200',
    regional: 'Regional PATRICIA ALMEIDA COSTA',
    address: 'AV ATAULFO DE PAIVA,1079, LEBLON, RIO DE JANEIRO - RJ',
    productsCount: 101,
  },
  {
    id: '19',
    name: 'TMO 038 - FREGUESIA',
    code: '38',
    distance: '20,65 Km',
    phone: '(21)2427-9900',
    regional: 'Regional FERNANDO SILVA OLIVEIRA',
    address: 'EST DO GABINAL,313, FREGUESIA, RIO DE JANEIRO - RJ',
    productsCount: 68,
  },
  {
    id: '20',
    name: 'RSO 045 - VILA ISABEL',
    code: '45',
    distance: '15,40 Km',
    phone: '(21)2576-4800',
    regional: 'Regional MARIANA RODRIGUES LIMA',
    address: 'BLVD 28 DE SETEMBRO,382, VILA ISABEL, RIO DE JANEIRO - RJ',
    productsCount: 77,
  },
];

export function StoreMapSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'bairro' | 'loja' | 'cidade'>('bairro');
  const [stores, setStores] = useState<Store[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Função para converter distância em número para ordenação
  const parseDistance = (distance: string): number => {
    return parseFloat(distance.replace(' Km', '').replace(',', '.'));
  };

  const handleSearch = () => {
    setHasSearched(true);
    if (searchQuery.trim()) {
      // Ordena as lojas por distância (do mais próximo para o mais distante)
      const sortedStores = [...mockStores].sort((a, b) => {
        return parseDistance(a.distance) - parseDistance(b.distance);
      });
      setStores(sortedStores);
    } else {
      setStores([]);
    }
  };

  return (
    <div 
      className="min-h-screen pb-20 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header 
        pageTitle="Mapa de Lojas"
      />

      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-[10px] focus:border-[#006eb4] focus:ring-2 focus:ring-[#006eb4]/10 outline-none bg-white"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-[#006eb4] text-white px-6 rounded-[10px] hover:bg-[#006eb4] transition-colors active:scale-95"
          >
            <Search className="w-5 h-5" />
          </button>
          {stores.length > 0 && (
            <button
              onClick={() => navigate('/map')}
              className="bg-[#006eb4] text-white px-6 rounded-[10px] hover:bg-[#006eb4] transition-colors active:scale-95"
            >
              <Map className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveFilter('bairro')}
            className={`flex-1 py-1 px-4 rounded-[10px] font-medium transition-all active:scale-95 ${
              activeFilter === 'bairro'
                ? 'bg-[#006eb4] text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >Bairro</button>
          <button
            onClick={() => setActiveFilter('loja')}
            className={`flex-1 py-1 px-4 rounded-[10px] font-medium transition-all active:scale-95 ${
              activeFilter === 'loja'
                ? 'bg-[#006eb4] text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >Loja</button>
          <button
            onClick={() => setActiveFilter('cidade')}
            className={`flex-1 py-1 px-4 rounded-[10px] font-medium transition-all active:scale-95 ${
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
            description="Selecione uma das opções acima e clique na lupa para pesquisar todas as lojas."
          />
        )}

        {hasSearched && stores.length === 0 && (
          <EmptyState description="Nenhuma loja encontrada para sua busca." />
        )}

        {stores.length > 0 && (
          <div className="space-y-3">
            <p className="text-[#717171] font-medium text-sm mb-1">
              RESULTADO: {stores.length} LOJAS
            </p>
            
            {stores.map((store) => (
              <div
                key={store.id}
                className="card-base w-full p-5"
              >
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
                    
                    {/* Botão de Localização */}
                    <div className="pt-2">
                      <button
                        onClick={() => navigate(`/map?storeId=${store.id}&storeName=${encodeURIComponent(store.name)}&storeAddress=${encodeURIComponent(store.address)}`)}
                        className="flex flex-col items-center justify-center w-full py-2 hover:bg-gray-50 rounded-lg transition-all active:scale-95"
                      >
                        <LocationIcon className="w-12 h-12 text-[#0066cc] mb-1" />
                        <span className="text-gray-700 font-medium text-[16px]">Localização</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}