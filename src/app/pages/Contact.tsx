import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { CheckCircle, MessageCircle, ChevronDown, Check, ChevronRight } from 'lucide-react';
import { useBrand, getBackgroundImage } from '../contexts/BrandContext';

export function Contact() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedBrand } = useBrand();
  const [formData, setFormData] = useState({
    subject: '',
    store: '',
    product: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSubjectPicker, setShowSubjectPicker] = useState(false);

  // Auto-retorno após 3 segundos quando showSuccess for true
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        navigate('/home');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showSuccess, navigate]);

  // Recebe a loja ou produto selecionado ao retornar da página de pesquisa
  useEffect(() => {
    console.log('Contact - location.state:', location.state);
    console.log('Contact - selectedStore:', location.state?.selectedStore);
    console.log('Contact - selectedProduct:', location.state?.selectedProduct);
    
    const updates: { store?: string; product?: string } = {};
    
    if (location.state?.selectedStore) {
      console.log('Atualizando formData.store com:', location.state.selectedStore);
      updates.store = location.state.selectedStore;
    }
    
    if (location.state?.selectedProduct) {
      console.log('Atualizando formData.product com:', location.state.selectedProduct);
      updates.product = location.state.selectedProduct;
    }
    
    // Atualiza todos os campos de uma vez
    if (Object.keys(updates).length > 0) {
      setFormData((prev) => ({ ...prev, ...updates }));
      // Limpa o state para evitar problemas em navegações futuras
      window.history.replaceState({}, document.title);
    }
  }, [location.state?.selectedStore, location.state?.selectedProduct]);

  const subjectOptions = [
    'Atendimento no Balcão',
    'Organização na Filial',
    'Problemas com Acesso',
    'Inclusão de Usuários',
    'Exclusão de Usuários',
    'Outros',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.subject && formData.message;

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${getBackgroundImage(selectedBrand)})` }}
    >
      <Header pageTitle="FALE CONOSCO" />

      <div className="p-4 max-w-2xl mx-auto">
        <div className="card-base p-6 mb-6 flex items-start gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-[#006EB4]/10 to-[#00509E]/10 rounded-sm flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-7 h-7 text-[#006EB4]" />
          </div>
          <div>
            <h2 className="font-bold text-[#006EB4] mb-1">Como podemos ajudar?</h2>
            <p className="text-auxiliary text-[#717171] text-[20px]">
              Envie suas dúvidas, sugestões ou solicitações
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="card-base p-5">
            <label className="block font-medium text-[#006EB4] mb-2 text-[16px]">
              Assunto *
            </label>
            <button
              type="button"
              onClick={() => setShowSubjectPicker(true)}
              className="w-full flex items-center justify-between text-left"
            >
              <span className={`font-medium ${formData.subject ? 'text-[#006EB4]' : 'text-gray-300'}`}>
                {formData.subject || 'Selecione o assunto'}
              </span>
              <ChevronDown className="w-5 h-5 text-[#006EB4] flex-shrink-0" />
            </button>
          </div>

          {/* Subject Picker Modal */}
          {showSubjectPicker && (
            <div 
              className="fixed inset-0 z-50 flex items-end justify-center"
              onClick={() => setShowSubjectPicker(false)}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 animate-in fade-in duration-200" />
              
              {/* Drawer */}
              <div 
                className="relative w-full max-w-2xl bg-white rounded-t-[20px] shadow-2xl animate-in slide-in-from-bottom duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Handle bar */}
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                </div>

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-[#006EB4] text-center">
                    Selecione o Assunto
                  </h3>
                </div>

                {/* Options List - Scrollable */}
                <div className="max-h-[60vh] overflow-y-auto px-4 py-3">
                  {subjectOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        handleChange('subject', option);
                        setShowSubjectPicker(false);
                      }}
                      className={`w-full p-5 mb-3 rounded-[10px] flex items-center justify-between transition-all active:scale-98 ${
                        formData.subject === option
                          ? 'bg-gradient-to-r from-[#006EB4] to-[#00509E] text-white shadow-lg'
                          : 'bg-gray-50 text-[#006EB4] border-2 border-gray-200 hover:border-[#006EB4]'
                      }`}
                    >
                      <span className="font-semibold text-[18px]">{option}</span>
                      {formData.subject === option && (
                        <Check className="w-6 h-6 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Footer Button */}
                <div className="p-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowSubjectPicker(false)}
                    className="w-full py-4 px-6 rounded-[10px] bg-gray-100 text-[#006EB4] font-semibold hover:bg-gray-200 active:scale-95 transition-all"
                  >
                    FECHAR
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="card-base p-5">
            <label className="block font-medium text-[#006EB4] mb-2 text-[16px]">Loja            </label>
            <button
              type="button"
              onClick={() => navigate('/stores', { state: { returnTo: '/contact', currentProduct: formData.product } })}
              className="w-full flex items-center justify-between text-left group"
            >
              <span className={`font-medium ${formData.store ? 'text-[#006EB4]' : 'text-gray-300'}`}>
                {formData.store || 'Pesquisar loja'}
              </span>
              <ChevronRight className="w-5 h-5 text-[#006EB4] flex-shrink-0 group-active:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="card-base p-5">
            <label className="block font-medium text-[#006EB4] mb-2 text-[16px]">Produto            </label>
            <button
              type="button"
              onClick={() => navigate('/products', { state: { returnTo: '/contact', currentStore: formData.store } })}
              className="w-full flex items-center justify-between text-left group"
            >
              <span className={`font-medium ${formData.product ? 'text-[#006EB4]' : 'text-gray-300'}`}>
                {formData.product || 'Pesquisar produto'}
              </span>
              <ChevronRight className="w-5 h-5 text-[#006EB4] flex-shrink-0 group-active:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="card-base p-5">
            <label className="block font-medium text-[#006EB4] mb-3 text-[16px]">
              Mensagem *
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Descreva sua solicitação..."
              rows={6}
              required
              className="w-full text-[#006EB4] bg-transparent border-none outline-none resize-none placeholder:text-gray-300"
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="w-full py-4 px-6 rounded-[10px] bg-gradient-to-r from-[#006EB4] to-[#00509E] text-white font-semibold hover:shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {loading ? 'ENVIANDO...' : 'ENVIAR MENSAGEM'}
          </button>
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
                Mensagem enviada com sucesso!
              </h3>
              <p className="text-[#717171] mb-1">
                Sua solicitação foi recebida e será analisada em breve
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}