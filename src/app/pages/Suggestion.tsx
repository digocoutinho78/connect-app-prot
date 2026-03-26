import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { CheckCircle, Package } from 'lucide-react';
import backgroundImage from 'figma:asset/ca44b9278ade571ce23c788ab07a7af85c0382b9.png';

// Mock de produtos para buscar informações
const mockProducts: { [key: string]: { name: string; currentStock: number } } = {
  '1': { name: 'Dipirona 500mg - Caixa com 20 comprimidos', currentStock: 150 },
  '2': { name: 'Paracetamol 750mg - Caixa com 10 comprimidos', currentStock: 85 },
  '3': { name: 'Ibuprofeno 600mg - Caixa com 30 comprimidos', currentStock: 42 },
  '4': { name: 'Amoxicilina 500mg - Caixa com 21 cápsulas', currentStock: 28 },
  '5': { name: 'Omeprazol 20mg - Caixa com 28 cápsulas', currentStock: 95 },
};

export function Suggestion() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [newQuantity, setNewQuantity] = useState('');
  const [observation, setObservation] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Pega os dados passados via state
  const storeName = location.state?.storeName || 'Loja não informada';
  const storeId = location.state?.storeId || '';
  
  // Busca informações do produto
  const productInfo = productId ? mockProducts[productId] : null;
  const productName = productInfo?.name || 'Produto não encontrado';
  const currentStock = productInfo?.currentStock || 0;

  console.log('Suggestion - productId:', productId);
  console.log('Suggestion - storeName:', storeName);
  console.log('Suggestion - storeId:', storeId);
  console.log('Suggestion - productInfo:', productInfo);

  // Auto-retorno após 3 segundos quando showSuccess for true
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        navigate(-1);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showSuccess, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header pageTitle="SUGESTÃO" />

      <div className="p-4 max-w-2xl mx-auto">
        {/* Card central com quantidade atual destacada */}
        <div className="card-base p-6 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="hidden w-14 h-14 bg-gradient-to-br from-[#006eb4]/10 to-[#006eb4]/10 rounded-sm flex items-center justify-center flex-shrink-0">
              <Package className="w-7 h-7 text-[#006eb4]" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-[#006eb4] mb-1">{productName}</h2>
              {/* <p className="text-auxiliary text-[#717171]">
                Caixa com 20 comprimidos
              </p> */}
            </div>
          </div>
          
          <div className="bg-[#F7F9FC] rounded-sm p-2 text-center">
            <p className="text-auxiliary text-[#717171] mb-2 font-bold text-[20px]">Quantidade Atual</p>
            <p className="font-bold text-[#006eb4] text-[24px]">{currentStock}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input com label flutuante */}
          <div className="card-base p-5">
            <label className="block font-medium text-[#006eb4] mb-2 text-[20px] font-bold">Nova Quantidade Sugerida*</label>
            <input
              type="number"
              placeholder="Digite a quantidade"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
              required
              className="w-full text-[18px] font-regular text-[#006eb4] bg-transparent border-none outline-none placeholder:text-gray-300"
            />
          </div>

          <div className="card-base p-5">
            <label className="block font-medium text-[#006eb4] mb-0 font-bold text-[20px]">Observação </label>
            <textarea
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              placeholder="Adicione detalhes sobre sua sugestão..."
              rows={3}
              className="w-full text-[#006eb4] bg-transparent border-none outline-none resize-none placeholder:text-gray-300"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-2 px-6 rounded-[10px] border-2 border-[#006eb4] text-[#006eb4] font-semibold hover:bg-[#006eb4]/5 active:scale-95 transition-all"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              disabled={!newQuantity || loading}
              className="flex-1 py-2 px-6 rounded-[10px] bg-[#006eb4] text-white font-semibold hover:shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? 'ENVIANDO...' : 'ENVIAR SUGESTÃO'}
            </button>
          </div>
        </form>
      </div>

      {/* Modal de sucesso */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-[10px] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#006eb4] mb-2">
                Sugestão enviada com sucesso!
              </h3>
              <p className="text-[#717171] mb-1">
                Nova quantidade: <span className="font-semibold text-[#006eb4]">{newQuantity}</span>
              </p>
              {/* <p className="text-sm text-[#717171] mt-2">
                Retornando automaticamente...
              </p> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}