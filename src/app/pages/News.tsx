import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { useBrand, getBackgroundImage } from '../contexts/BrandContext';

export function News() {
  const navigate = useNavigate();
  const { selectedBrand } = useBrand();

  return (
    <>
      {/* Background Layer */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${getBackgroundImage(selectedBrand)})` }}
      />
      
      {/* Content Layer */}
      <div className="relative min-h-screen pb-20">
        <Header pageTitle="Notícias" />

        <div className="p-4">
          {/* Conteúdo da página será adicionado aqui posteriormente */}
        </div>

        {/* Botão Avançar fixado na base */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg">
          <button
            onClick={() => navigate('/home')}
            className="w-full bg-[#0066cc] text-white font-semibold py-4 px-6 rounded-[10px] hover:bg-[#0055aa] active:scale-95 transition-all shadow-md"
          >
            Avançar
          </button>
        </div>
      </div>
    </>
  );
}
