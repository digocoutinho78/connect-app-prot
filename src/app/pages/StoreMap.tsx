import { Header } from '../components/Header';
import { LocationIcon } from '../components/icons/LocationIcon';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import mapImage from 'figma:asset/f982bd844f93a97751c36bc7ec58eb4c035fd0de.png';

export function StoreMap() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header pageTitle="MAPA DE LOJAS" />

      <div className="relative h-[calc(100vh-64px)]">
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center overflow-hidden">
          <ImageWithFallback 
            src={mapImage}
            alt="Mapa de lojas"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          {/* <div className="relative text-center p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg max-w-md">
            <MapPin className="w-20 h-20 text-[#0088CC] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Mapa Interativo
            </h3>
            <p className="text-gray-600 max-w-md">
              Visualização de todas as lojas próximas com clustering inteligente
            </p>
            <p className="text-sm text-gray-500 mt-4">
              (Integração com Google Maps / Mapbox)
            </p>
          </div> */}
        </div>

        {/* <button className="absolute bottom-6 right-6 bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow">
          <MapPin className="w-6 h-6 text-[#0066cc]" />
        </button> */}
      </div>
    </div>
  );
}