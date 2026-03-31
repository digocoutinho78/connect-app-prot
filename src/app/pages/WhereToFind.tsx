import { Header } from '../components/Header';
import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { Navigation, Phone } from 'lucide-react';
import { LocationIcon } from '../components/icons/LocationIcon';
import { FileText, BarChart3 } from 'lucide-react';
import mapImage from 'figma:asset/f982bd844f93a97751c36bc7ec58eb4c035fd0de.png';
import backgroundImage from 'figma:asset/ca44b9278ade571ce23c788ab07a7af85c0382b9.png';

interface StoreLocation {
  id: string;
  name: string;
  quantity: number;
  distance: string;
  address: string;
  phone: string;
  coordinates: { lat: number; lng: number };
}

const mockLocations: StoreLocation[] = [
  {
    id: '1',
    name: 'DML-30 BANGU',
    quantity: 150,
    distance: '13,17 Km',
    address: 'AV ABILIO AUGUSTO TAVORA,279 LT 35, CABUCU, NOVA IGUACU - RJ',
    phone: '(21) 2472-3000',
    coordinates: { lat: -22.7503, lng: -43.4618 }
  },
  {
    id: '2',
    name: 'DML 020 - NOVA IGUACU',
    quantity: 85,
    distance: '15,94 Km',
    address: 'AV MARECHAL FLORIANO PEIXOTO,2024, CENTRO, NOVA IGUACU - RJ',
    phone: '(21) 2472-3000',
    coordinates: { lat: -22.7590, lng: -43.4508 }
  },
  {
    id: '3',
    name: 'DML 025 - NOVA IGUACU BOBS',
    quantity: 42,
    distance: '26,72 Km',
    address: 'AV DOUTOR MARIO GUIMARAES,347, CENTRO, NOVA IGUACU - RJ',
    phone: '(21) 2472-3000',
    coordinates: { lat: -22.7610, lng: -43.4490 }
  },
  {
    id: '4',
    name: 'DML 096 - SHOPPING NOVA IGUACU I',
    quantity: 80,
    distance: '18,45 Km',
    address: 'AV ABILIO AUGUSTO TAVORA,1111, CENTRO, NOVA IGUACU - RJ',
    phone: '(21) 3332-1500',
    coordinates: { lat: -22.7480, lng: -43.4550 }
  },
  {
    id: '5',
    name: 'DML 087 - ESTRADA DA PALHADA',
    quantity: 39,
    distance: '22,30 Km',
    address: 'EST DA PALHADA,555, CAMPO GRANDE, RIO DE JANEIRO - RJ',
    phone: '(21) 3332-1600',
    coordinates: { lat: -22.8890, lng: -43.5520 }
  },
];

export function WhereToFind() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedStore, setSelectedStore] = useState<StoreLocation | null>(null);

  const handleOpenGoogleMaps = (store: StoreLocation) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header pageTitle="ONDE TEM" />

      {/* Map Area - Simulated */}
      <div className="relative flex-1 bg-gray-200">
        {/* Map Background Image */}
        <img 
          src={mapImage} 
          alt="Mapa das lojas" 
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* My Location Button */}
        {/* <button className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all active:scale-95">
          <Navigation className="w-6 h-6 text-[#0088CC]" />
        </button> */}
      </div>

      {/* Bottom Sheet - Store Details */}
      <div className="bg-white rounded-t-3xl shadow-2xl overflow-hidden" style={{ maxHeight: '45vh' }}>
        {selectedStore ? (
          <div className="p-6 space-y-4">
            {/* Drag Handle */}
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-2"></div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <h2 className="text-[#006eb4] font-bold text-lg">{selectedStore.name}</h2>
                
                <div className="flex items-center gap-2 text-[#717171]">
                  <LocationIcon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{selectedStore.distance}</span>
                </div>

                <div className="flex items-center gap-2 text-[#717171]">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{selectedStore.phone}</span>
                </div>

                <p className="text-sm text-[#717171] leading-relaxed">
                  {selectedStore.address}
                </p>
              </div>

              <div className="flex flex-col items-center gap-1 bg-[#0088CC]/10 rounded-xl px-4 py-3">
                <span className="text-[#0088CC] font-bold text-3xl">{selectedStore.quantity}</span>
                <span className="text-[#717171] text-xs">unidades</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => navigate(`/products/${productId}?storeId=${selectedStore.id}`)}
                className="flex-1 bg-[#006eb4] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg active:scale-95 transition-all"
              >
                Ver Estoque
              </button>
              
              <button
                onClick={() => handleOpenGoogleMaps(selectedStore)}
                className="flex-1 bg-white border-2 border-[#0088CC] text-[#0088CC] font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-5 h-5" />
                Ir até lá
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center hidden">
            {/* Drag Handle */}
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
            
            <LocationIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-[#717171] font-medium">
              Selecione um pin no mapa para ver os detalhes da loja
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex">
          <button 
            onClick={() => navigate('/stores-by-product', { state: { productId, productName: location.state?.productName } })}
            className="flex-1 flex flex-col items-center justify-center py-3 transition-all active:scale-95 text-gray-500 hover:text-[#006eb4] hover:bg-gray-50"
          >
            <FileText className="w-6 h-6 mb-1" />
            <span className="font-medium text-[14px]">Estoque</span>
          </button>
          
          <button 
            onClick={() => navigate(`/sales/${productId}`)}
            className="flex-1 flex flex-col items-center justify-center py-3 transition-all active:scale-95 text-gray-500 hover:text-[#006eb4] hover:bg-gray-50"
          >
            <BarChart3 className="w-6 h-6 mb-1" />
            <span className="font-medium text-[14px]">Vendas</span>
          </button>

          <button 
            className="flex-1 flex flex-col items-center justify-center py-3 transition-all active:scale-95 text-[#006eb4] bg-[#006eb4]/5"
          >
            <LocationIcon className="w-6 h-6 mb-1 stroke-[2.5]" />
            <span className="font-semibold text-[14px]">Onde Tem</span>
          </button>
        </div>
      </nav>
    </div>
  );
}