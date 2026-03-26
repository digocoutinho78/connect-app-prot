import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { EmptyState } from '../components/EmptyState';
import { Search, Package, AlertCircle } from 'lucide-react';
import backgroundImage from 'figma:asset/ca44b9278ade571ce23c788ab07a7af85c0382b9.png';

interface Product {
  id: string;
  name: string;
  quantity: number;
  image?: string;
  isLowStock?: boolean;
}

const mockProducts: Product[] = [
  { id: '1', name: 'Dipirona 500mg - Caixa com 20 comprimidos', quantity: 150, isLowStock: false },
  { id: '2', name: 'Paracetamol 750mg - Caixa com 10 comprimidos', quantity: 0, isLowStock: false },
  { id: '3', name: 'Ibuprofeno 600mg - Caixa com 30 comprimidos', quantity: 42, isLowStock: false },
  { id: '4', name: 'Amoxicilina 500mg - Caixa com 21 cápsulas', quantity: 28, isLowStock: true },
  { id: '5', name: 'Omeprazol 20mg - Caixa com 28 cápsulas', quantity: 95, isLowStock: false },
];

export function StoreProducts() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);
    if (searchQuery.trim()) {
      setProducts(mockProducts);
    } else {
      setProducts([]);
    }
  };

  return (
    <div 
      className="min-h-screen pb-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header 
        pageTitle="DML 001 - JARDIM ALVOR..." 
      />

      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Nome do Produto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-[10px] focus:border-[#006eb4] focus:ring-2 focus:ring-[#006eb4]/10 outline-none bg-white"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-[#006eb4] text-white px-6 rounded-[10px] hover:bg-[#006eb4] transition-colors active:scale-95"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-4">
        {!hasSearched && (
          <EmptyState
            description="Preencha o filtro e clique na lupa para pesquisar todos os produtos da loja."
            icon={<Package className="w-16 h-16 text-gray-300" />}
          />
        )}

        {hasSearched && products.length === 0 && (
          <EmptyState 
            description="Nenhum produto encontrado para sua busca."
            icon={<Package className="w-16 h-16 text-gray-300" />}
          />
        )}

        {products.length > 0 && (
          <div className="space-y-3">
            <p className="text-[#717171] font-medium text-sm mb-1">
              RESULTADO: {products.length} {products.length === 1 ? 'PRODUTO' : 'PRODUTOS'}
            </p>
            
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  if (product.quantity === 0) {
                    navigate(`/products-out-of-stock/${product.id}?storeId=${storeId}`);
                  } else {
                    navigate(`/products/${product.id}?storeId=${storeId}`);
                  }
                }}
                className="card-base w-full text-left flex items-center gap-4 active:scale-[0.98] transition-transform ml-[9px] mr-[0px] mt-[0px] mb-[12px] px-[23px] py-[16px]"
              >
                {/* <div className="w-14 h-14 bg-gradient-to-br from-[#006eb4]/10 to-[#006eb4]/10 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Package className="w-7 h-7 text-[#006eb4]" />
                </div> */}
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#006eb4] mb-2 line-clamp-2 text-[20px]">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-baseline gap-1">
                      <span className={` text-[20px] ${product.quantity === 0 ? 'text-[#717171]' : 'text-[#006eb4]'}`}>
                        {product.quantity}
                      </span>
                      <span className="text-auxiliary text-[#717171] text-[20px]">Unidades</span>
                    </div>
                    {/* {product.isLowStock && (
                      <div className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">
                        <AlertCircle className="w-3 h-3" />
                        <span className="text-xs font-medium">Estoque crítico</span>
                      </div>
                    )} */}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <BottomNav productId={storeId} />
    </div>
  );
}