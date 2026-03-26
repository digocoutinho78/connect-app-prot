import { useNavigate } from 'react-router';
import { Home } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-4">
      <div className="bg-white rounded-[10px] shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="text-[80px] font-bold text-[#1d4d7b] leading-none">404</div>
          <div className="text-[20px] text-gray-600 mt-2">Página não encontrada</div>
        </div>
        
        <p className="text-gray-500 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        
        <button
          onClick={() => navigate('/home')}
          className="w-full bg-[#1d4d7b] text-white rounded-[10px] py-3 px-6 font-medium flex items-center justify-center gap-2 hover:bg-[#163a5f] transition-colors"
        >
          <Home className="w-5 h-5" />
          Voltar para o Início
        </button>
      </div>
    </div>
  );
}
