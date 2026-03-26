import { Header } from '../components/Header';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Package, Download, FileText, BarChart3, Star } from 'lucide-react';
import { LocationIcon } from '../components/icons/LocationIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import backgroundImage from 'figma:asset/ca44b9278ade571ce23c788ab07a7af85c0382b9.png';

// Generate last 12 months from current date
const generateLast12Months = () => {
  const months = [];
  const now = new Date();
  
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = date.getMonth() + 1; // 1-12
    months.push(month.toString());
  }
  
  return months;
};

const monthLabels = generateLast12Months();

const mockData = {
  normal: [
    { month: monthLabels[0], current: 120, previous: 0 },
    { month: monthLabels[1], current: 150, previous: 0 },
    { month: monthLabels[2], current: 180, previous: 0 },
    { month: monthLabels[3], current: 140, previous: 0 },
    { month: monthLabels[4], current: 200, previous: 0 },
    { month: monthLabels[5], current: 175, previous: 0 },
    { month: monthLabels[6], current: 160, previous: 0 },
    { month: monthLabels[7], current: 190, previous: 0 },
    { month: monthLabels[8], current: 210, previous: 0 },
    { month: monthLabels[9], current: 185, previous: 0 },
    { month: monthLabels[10], current: 195, previous: 0 },
    { month: monthLabels[11], current: 220, previous: 0 },
  ],
  pbm: [
    { month: monthLabels[0], current: 85, previous: 35 },
    { month: monthLabels[1], current: 92, previous: 58 },
    { month: monthLabels[2], current: 105, previous: 75 },
    { month: monthLabels[3], current: 88, previous: 52 },
    { month: monthLabels[4], current: 115, previous: 85 },
    { month: monthLabels[5], current: 98, previous: 77 },
    { month: monthLabels[6], current: 102, previous: 58 },
    { month: monthLabels[7], current: 120, previous: 70 },
    { month: monthLabels[8], current: 135, previous: 75 },
    { month: monthLabels[9], current: 110, previous: 75 },
    { month: monthLabels[10], current: 125, previous: 70 },
    { month: monthLabels[11], current: 140, previous: 80 },
  ],
  anual: [
    { month: monthLabels[0], current: 220, previous: 180 },
    { month: monthLabels[1], current: 240, previous: 195 },
    { month: monthLabels[2], current: 285, previous: 245 },
    { month: monthLabels[3], current: 228, previous: 210 },
    { month: monthLabels[4], current: 315, previous: 280 },
    { month: monthLabels[5], current: 273, previous: 250 },
    { month: monthLabels[6], current: 262, previous: 235 },
    { month: monthLabels[7], current: 310, previous: 275 },
    { month: monthLabels[8], current: 345, previous: 295 },
    { month: monthLabels[9], current: 295, previous: 260 },
    { month: monthLabels[10], current: 320, previous: 285 },
    { month: monthLabels[11], current: 360, previous: 310 },
  ],
};

export function ProductSales() {
  const { productId, storeId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'normal' | 'pbm' | 'anual'>('normal');
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock product data - in production, this would come from API
  const productInfo = {
    name: 'DIPIRONA SÓDICA 500MG 10 COMP',
    ean: '7891234567890',
    manufacturer: 'EUROFARMA'
  };

  // Mock store data
  const store = {
    name: 'DML-30 BANGU',
    code: '30',
  };

  const data = mockData[activeTab];
  const currentTime = new Date().toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const handleExport = () => {
    // Mock export functionality
    alert('Exportando relatório para Excel...');
  };

  return (
    <div 
      className="min-h-screen pb-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header pageTitle={store.name} />
      <div className="p-4">
        {/* Product Info Card */}
        <div className="bg-white rounded-[10px] shadow-sm p-4 mb-6 relative">
          <div className="flex items-start gap-3">
            {/* <div className="w-12 h-12 bg-gradient-to-br from-[#0088CC] to-[#00A6E8] rounded-xl flex items-center justify-center flex-shrink-0">
              <Package className="w-6 h-6 text-white" />
            </div> */}
            <div className="flex-1 min-w-0">
              <h3 className="text-[#006eb4] font-semibold mb-1 text-[20px]">{productInfo.name}</h3>
              {/* <p className="text-auxiliary text-[#717171] text-[14px]">EAN: {productInfo.ean}</p> */}
              {/* <p className="text-auxiliary text-[#717171] text-[14px]">{productInfo.manufacturer}</p> */}
            </div>
          </div>
          
          {/* Botão de favorito */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 p-2 bg-gray-50 rounded-full shadow-sm hover:shadow-md hover:bg-gray-100 transition-all active:scale-95"
          >
            <Star 
              className={`w-5 h-5 ${isFavorite ? 'fill-[#fbbf24] text-[#fbbf24]' : 'text-gray-400'}`} 
            />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('normal')}
            className={`flex-1 py-3 px-4 rounded-[10px] font-semibold transition-all active:scale-95 ${
              activeTab === 'normal'
                ? 'bg-[#0066cc] text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => setActiveTab('pbm')}
            className={`flex-1 py-3 px-4 rounded-[10px] font-semibold transition-all active:scale-95 ${
              activeTab === 'pbm'
                ? 'bg-[#0066cc] text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
            }`}
          >
            PBM
          </button>
          <button
            onClick={() => setActiveTab('anual')}
            className={`flex-1 py-3 px-4 rounded-[10px] font-semibold transition-all active:scale-95 ${
              activeTab === 'anual'
                ? 'bg-[#0066cc] text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
            }`}
          >
            Anual
          </button>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-[10px] shadow-sm p-4 mb-4 pb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">
            Quantidade x Meses
          </h3>
          <div className="h-64 relative">
            {/* Vertical separator lines */}
            <div className="absolute inset-0 flex pointer-events-none" style={{ paddingLeft: '44px', paddingRight: '3px', paddingTop: '5px', paddingBottom: '70px' }}>
              {data.map((_, index) => {
                if (index >= data.length - 1) return null;
                return (
                  <div
                    key={`separator-${activeTab}-${index}`}
                    className="flex-1 relative"
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gray-300" />
                  </div>
                );
              })}
              <div className="flex-1" />
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                key={activeTab} 
                data={data} 
                barGap={activeTab === 'anual' || activeTab === 'pbm' ? 12 : 0} 
                barCategoryGap="30%"
                barSize={16}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} horizontal={true} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: '#666' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#666' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '8px'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={20}
                  wrapperStyle={{ paddingTop: '0px', marginTop: '-10px' }}
                />
                {activeTab === 'normal' && (
                  <Bar 
                    key="normal-current"
                    dataKey="current" 
                    fill="#0066cc" 
                    name="Vendas"
                    radius={[4, 4, 0, 0]}
                  />
                )}
                {activeTab === 'pbm' && (
                  <>
                    <Bar 
                      key="pbm-current"
                      dataKey="current" 
                      fill="#0066cc" 
                      name="Vendas Normais"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      key="pbm-previous"
                      dataKey="previous" 
                      fill="#424242" 
                      name="Vendas PBM"
                      radius={[4, 4, 0, 0]}
                    />
                  </>
                )}
                {activeTab === 'anual' && (
                  <>
                    <Bar 
                      key="anual-current"
                      dataKey="current" 
                      fill="#0066cc" 
                      name="Vendas Normais"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      key="anual-previous"
                      dataKey="previous" 
                      fill="#10b981" 
                      name="Vendas Ano Anterior"
                      radius={[4, 4, 0, 0]}
                    />
                  </>
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* <p className="text-xs text-gray-500 text-center mt-4">
            Atualizado às {currentTime}
          </p> */}
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-[10px] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Últimos<br />12 Meses
                  </th>
                  {activeTab === 'normal' && (
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                      Qtde. Vendida
                    </th>
                  )}
                  {activeTab === 'pbm' && (
                    <>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                        Vendas<br />Normais
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                        Vendas PBM
                      </th>
                    </>
                  )}
                  {activeTab === 'anual' && (
                    <>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                        Vendas<br />Normais
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                        Vendas Ano<br />Anterior
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((row, index) => (
                  <tr key={index} className={`hover:bg-gray-100 ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-500">
                      {row.month}
                    </td>
                    {activeTab === 'normal' && (
                      <td className="px-4 py-3 text-sm font-bold text-[#0066cc] text-right">
                        {row.current}
                      </td>
                    )}
                    {activeTab === 'pbm' && (
                      <>
                        <td className="px-4 py-3 text-sm font-bold text-right text-[#0066cc]">
                          {row.current}
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-gray-600 text-right">
                          {row.previous}
                        </td>
                      </>
                    )}
                    {activeTab === 'anual' && (
                      <>
                        <td className="px-4 py-3 text-sm font-bold text-right text-[#0066cc]">
                          {row.current}
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-right text-[#10b981]">
                          {row.previous}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex">
          <button 
            onClick={() => navigate(`/products/${productId}`)}
            className="flex-1 flex flex-col items-center justify-center py-3 transition-all active:scale-95 text-gray-500 hover:text-[#006eb4] hover:bg-gray-50"
          >
            <FileText className="w-6 h-6 mb-1" />
            <span className="font-medium text-[14px]">Estoque</span>
          </button>
          
          <button 
            className="flex-1 flex flex-col items-center justify-center py-3 transition-all active:scale-95 text-[#006eb4] bg-[#006eb4]/5"
          >
            <BarChart3 className="w-6 h-6 mb-1 stroke-[2.5]" />
            <span className="font-semibold text-[14px]">Vendas</span>
          </button>

          {/* <button 
            onClick={() => navigate(`/where-to-find/${productId}`)}
            className="flex-1 flex flex-col items-center justify-center py-3 transition-all active:scale-95 text-gray-500 hover:text-[#006eb4] hover:bg-gray-50"
          >
            <LocationIcon className="w-6 h-6 mb-1" />
            <span className="font-medium text-[14px]">Onde Tem</span>
          </button> */}
        </div>
      </nav>
    </div>
  );
}