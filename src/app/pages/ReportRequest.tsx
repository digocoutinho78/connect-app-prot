import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { FileText, CheckCircle, XCircle } from 'lucide-react';
import backgroundImage from 'figma:asset/ca44b9278ade571ce23c788ab07a7af85c0382b9.png';

export function ReportRequest() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('');

  // Mock store data - in production, this would come from API
  const storeName = 'FARMÁCIA EXEMPLO LTDA';

  const handleRequestReport = (period: string) => {
    setSelectedPeriod(period);
    setShowSuccess(true);
    
    // Auto hide after 2 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  const handleShowError = () => {
    setSelectedPeriod('Mês Anterior');
    setShowError(true);
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  return (
    <>
      <div 
        className="min-h-screen pb-24 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Header 
          pageTitle={storeName}
        />

        <div className="p-6 max-w-2xl mx-auto">
          {/* Title Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-[#0088CC]/10 rounded-[10px] flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#0088CC]" />
              </div>
              <h2 className="text-xl font-bold text-[#006eb4]">
                Solicitação de Relatório
              </h2>
            </div>
            <p className="text-[#717171] text-lg">
              Escolha o mês que deseja solicitar o relatório:
            </p>
          </div>

          {/* Report Period Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => handleRequestReport('Mês Atual')}
              className="w-full bg-white rounded-[10px] p-6 shadow-sm hover:shadow-md active:scale-[0.98] transition-all border-2 border-transparent hover:border-[#0088CC]/20"
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h3 className="font-bold text-[#006eb4] text-lg mb-1">
                    Mês Atual
                  </h3>
                  <p className="text-sm text-[#717171]">
                    Relatório do período atual
                  </p>
                </div>
                <div className="w-10 h-10 bg-[#0088CC]/10 rounded-[10px] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#0088CC]" />
                </div>
              </div>
            </button>

            <button
              onClick={() => handleShowError()}
              className="w-full bg-white rounded-[10px] p-6 shadow-sm hover:shadow-md active:scale-[0.98] transition-all border-2 border-transparent hover:border-[#0088CC]/20"
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h3 className="font-bold text-[#006eb4] text-lg mb-1">
                    Mês Anterior
                  </h3>
                  <p className="text-sm text-[#717171]">
                    Relatório do mês passado
                  </p>
                </div>
                <div className="w-10 h-10 bg-[#0088CC]/10 rounded-[10px] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#0088CC]" />
                </div>
              </div>
            </button>

            {/* <button
              onClick={() => handleRequestReport('Últimos 3 Meses')}
              className="w-full bg-white rounded-[10px] p-6 shadow-sm hover:shadow-md active:scale-[0.98] transition-all border-2 border-transparent hover:border-[#0088CC]/20"
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h3 className="font-bold text-[#006eb4] text-lg mb-1">
                    Últimos 3 Meses
                  </h3>
                  <p className="text-sm text-[#717171]">
                    Relatório consolidado trimestral
                  </p>
                </div>
                <div className="w-10 h-10 bg-[#0088CC]/10 rounded-[10px] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#0088CC]" />
                </div>
              </div>
            </button> */}
          </div>

          {/* Info Card */}
          <div className="mt-8 bg-blue-50 rounded-[10px] p-4 border border-blue-100">
            <p className="text-sm text-[#006eb4] text-center">
              <span className="font-semibold">💡 Dica: </span>O relatório será enviado para seu e-mail.
            </p>
          </div>
        </div>

        <BottomNav productId={storeId} />
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-[10px] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#006eb4] mb-2">
                Solicitação feita com sucesso!
              </h3>
              <p className="text-[#717171] mb-1">
                Período: <span className="font-semibold text-[#006eb4]">{selectedPeriod}</span>
              </p>
              <p className="text-sm text-[#717171] mt-2">
                Você receberá o relatório em breve.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-[10px] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#006eb4] mb-2">
                Erro ao solicitar relatório!
              </h3>
              <p className="text-[#717171] mb-1">
                Período: <span className="font-semibold text-[#006eb4]">{selectedPeriod}</span>
              </p>
              <p className="text-sm text-[#717171] mt-2">
                Tente novamente mais tarde.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}