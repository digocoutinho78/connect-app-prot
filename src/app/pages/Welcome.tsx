import { useNavigate } from 'react-router';
import welcomeImage from 'figma:asset/e7ef6228e54b6ab1ddcd7f6ee4344a893966a44b.png';

export function Welcome() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/brand-selection');
  };

  return (
    <div className="fixed inset-0 flex flex-col">
      {/* Imagem fullscreen */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${welcomeImage})` }}
      />

      {/* Botão Avançar sobreposto na base */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <button
          onClick={handleContinue}
          className="w-full py-4 px-6 rounded-[10px] bg-[#006eb4] text-white font-bold hover:bg-gray-700 active:scale-95 transition-all shadow-lg text-[18px]"
        >
          AVANÇAR
        </button>
      </div>
    </div>
  );
}