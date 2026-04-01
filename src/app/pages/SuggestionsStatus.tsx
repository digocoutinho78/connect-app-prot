import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Calendar, Package, TrendingUp, AlertCircle, CheckCircle, Phone } from 'lucide-react';
import backgroundImage from 'figma:asset/ca44b9278ade571ce23c788ab07a7af85c0382b9.png';
// import productImage from 'figma:asset/fd91ecaee5de57563cdceace6678882d11a1b09d.png';

interface Suggestion {
  id: string;
  productName: string;
  // productImage: string;
  currentStock: number;
  suggestedStock: number;
  approvedStock?: number;
  date: string;
  status: 'em-analise' | 'aprovada' | 'pendente' | 'entre-em-contato';
  storeName: string;
}

const mockSuggestions: Suggestion[] = [
  // {
  //   id: '1',
  //   productName: 'DORFLEX 300+35+50MG 10CPR',
  //   // productImage: productImage,
  //   currentStock: 45,
  //   suggestedStock: 120,
  //   date: '28/02/2026',
  //   status: 'entre-em-contato',
  //   storeName: 'DML-30 BANGU'
  // },
  {
    id: '2',
    productName: 'DIPIRONA 500MG 20CPR',
    // productImage: productImage,
    currentStock: 80,
    suggestedStock: 200,
    approvedStock: 200,
    date: '27/02/2026',
    status: 'aprovada',
    storeName: 'DML 020 - NOVA IGUACU'
  },
  {
    id: '3',
    productName: 'PARACETAMOL 750MG 10CPR',
    // productImage: productImage,
    currentStock: 25,
    suggestedStock: 150,
    date: '26/02/2026',
    status: 'pendente',
    storeName: 'DML 025 - NOVA IGUACU BOBS'
  },
  {
    id: '4',
    productName: 'IBUPROFENO 600MG 30CPR',
    // productImage: productImage,
    currentStock: 60,
    suggestedStock: 180,
    date: '25/02/2026',
    status: 'em-analise',
    storeName: 'DML 096 - SHOPPING NOVA IGUACU I'
  },
];

export function SuggestionsStatus() {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'aprovada':
        return 'bg-green-100 text-green-700';
      case 'em-analise':
        return 'bg-yellow-100 text-yellow-700';
      case 'pendente':
        return 'bg-orange-100 text-orange-700';
      case 'entre-em-contato':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'aprovada':
        return <CheckCircle className="w-4 h-4" />;
      case 'em-analise':
        return <AlertCircle className="w-4 h-4" />;
      case 'pendente':
        return <AlertCircle className="w-4 h-4" />;
      case 'entre-em-contato':
        return <Phone className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'aprovada':
        return 'Aprovada';
      case 'em-analise':
        return 'Em Análise';
      case 'pendente':
        return 'Pendente';
      case 'entre-em-contato':
        return 'Entre em Contato';
      default:
        return status;
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat pb-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header 
        pageTitle="SUGESTÕES"
      />

      <div className="p-4 space-y-4">
        {/* Contador de sugestões */}
        <div className="bg-white rounded-[10px] shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#006eb4]/10 rounded-[10px] flex items-center justify-center">
                <Package className="w-6 h-6 text-[#006eb4]" />
              </div>
              <div>
                <p className="text-[#006eb4] font-bold text-lg">Total de Sugestões</p>
                {/* <p className="text-[#717171] text-sm">Últimos 30 dias</p> */}
              </div>
            </div>
            <p className="text-[#006eb4] font-bold text-3xl">{mockSuggestions.length}</p>
          </div>
        </div>

        {/* Lista de sugestões */}
        <div className="space-y-3">
          {mockSuggestions.map((suggestion) => (
            <div 
              key={suggestion.id}
              className="bg-white rounded-[10px] shadow-sm p-4 space-y-3 cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]"
              onClick={() => navigate(`/product/${suggestion.id}`)}
            >
              {/* Cabeçalho com produto e status */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#006eb4] font-bold text-base leading-tight break-words">
                      {suggestion.productName}
                    </h3>
                    <p className="text-[#717171] text-sm mt-1">{suggestion.storeName}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap ${getStatusColor(suggestion.status)}`}>
                  {getStatusIcon(suggestion.status)}
                  {getStatusLabel(suggestion.status)}
                </span>
              </div>

              {/* Informações de estoque */}
              <div className={`grid gap-4 pt-3 border-t border-gray-100 ${suggestion.status === 'aprovada' ? 'grid-cols-3' : 'grid-cols-2'}`}>
                <div>
                  <p className="text-[#717171] text-xs mb-1">Estoque Atual</p>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#717171] shrink-0" />
                    <p className="text-[#006eb4] font-bold text-lg">{suggestion.currentStock}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[#717171] text-xs mb-1">Estoque Sugerido</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#00a63e] shrink-0" />
                    <p className="text-[#00a63e] font-bold text-lg">{suggestion.suggestedStock}</p>
                  </div>
                </div>
                {suggestion.status === 'aprovada' && suggestion.approvedStock != null && (
                  <div>
                    <p className="text-[#717171] text-xs mb-1">Estoque Aprovado</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#008236] shrink-0" />
                      <p className="text-[#008236] font-bold text-lg">{suggestion.approvedStock}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Data */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <Calendar className="w-4 h-4 text-[#717171]" />
                <p className="text-[#717171] text-sm">Sugerido em {suggestion.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem quando não há sugestões */}
        {mockSuggestions.length === 0 && (
          <div className="bg-white rounded-sm shadow-sm p-8 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-[#717171] text-lg">Nenhuma sugestão de estoque no momento</p>
            <p className="text-[#717171] text-sm mt-2">As sugestões aparecerão aqui quando forem geradas</p>
          </div>
        )}
      </div>
    </div>
  );
}