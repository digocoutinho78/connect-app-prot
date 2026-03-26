import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Star, Package, TrendingUp } from 'lucide-react';
import { LocationIcon } from '../components/icons/LocationIcon';
import { useBrand, getBackgroundImage } from '../contexts/BrandContext';

interface FavoriteProduct {
  id: string;
  name: string;
  ean: string;
  store: string;
  storeId: string;
  stock: number;
  distance: string;
  trend: 'up' | 'down' | 'stable';
}

export function Favorites() {
  const navigate = useNavigate();
  const { selectedBrand } = useBrand();
  
  // Mock data - in production, this would come from local storage or API
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([
    {
      id: '1',
      name: 'DIPIRONA SÓDICA 500MG 10 COMP',
      ean: '7891234567890',
      store: 'DML-30 BANGU',
      storeId: '1',
      stock: 245,
      distance: '0.5 km',
      trend: 'up'
    },
    {
      id: '2',
      name: 'PARACETAMOL 750MG 20 COMP',
      ean: '7891234567891',
      store: 'DML 002 - CENTRO',
      storeId: '2',
      stock: 180,
      distance: '1.2 km',
      trend: 'stable'
    },
    {
      id: '3',
      name: 'IBUPROFENO 600MG 30 COMP',
      ean: '7891234567892',
      store: 'DML 003 - VILA NOVA',
      storeId: '3',
      stock: 92,
      distance: '2.8 km',
      trend: 'down'
    }
  ]);

  const removeFavorite = (productId: string) => {
    setFavorites(favorites.filter(fav => fav.id !== productId));
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-[#10b981]" />;
    if (trend === 'down') return <TrendingUp className="w-4 h-4 text-[#ef4444] rotate-180" />;
    return <div className="w-4 h-4 border-t-2 border-[#fbbf24]" />;
  };

  return (
    <>
      {/* Background Layer */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${getBackgroundImage(selectedBrand)})` }}
      />
      
      {/* Content Layer */}
      <div className="relative min-h-screen pb-20">
        <Header 
          pageTitle="Favoritos"
        />

        <div className="p-4">
          {/* Header Info */}
          {favorites.length > 0 && (
            <div className="mb-4">
              <p className="text-[#717171] font-medium text-sm">
                RESULTADO: {favorites.length} {favorites.length === 1 ? 'PRODUTO' : 'PRODUTOS'}
              </p>
            </div>
          )}

          {/* Empty State */}
          {favorites.length === 0 && (
            <div className="card-base p-8 text-center">
              <div className="w-20 h-20 bg-[#fbbf24]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-[#fbbf24]" />
              </div>
              <h3 className="text-[#006EB4] font-semibold mb-2">Nenhum favorito ainda</h3>
              <p className="text-auxiliary text-[#717171] mb-6">
                Adicione produtos aos favoritos para acompanhar rapidamente
              </p>
              <button
                onClick={() => navigate('/stores')}
                className="btn-primary mx-auto"
              >
                Explorar Produtos
              </button>
            </div>
          )}

          {/* Favorites List */}
          <div className="space-y-3">
            {favorites.map((product) => (
              <div 
                key={product.id} 
                className="card-base p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/products/${product.id}?storeId=${product.storeId}`)}
              >
                <div className="flex items-start gap-3">
                  {/* <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-[#006EB4]" />
                  </div> */}
                  
                  <div className="flex-1 min-w-0">
                    {/* Product Name */}
                    <h4 
                      className="text-[#006EB4] font-semibold mb-1 cursor-pointer hover:text-[#00509E] transition-colors text-[20px]"
                    >
                      {product.name}
                    </h4>
                    
                    {/* EAN */}
                    {/* <p className="text-auxiliary text-[#717171] mb-2 text-[20px]">EAN: {product.ean}</p> */}
                    
                    {/* Store Info */}
                    <div className="flex items-center gap-4 text-auxiliary text-[#717171] mb-2">
                      <span className="flex items-center gap-1 text-[16px] whitespace-nowrap">
                        <LocationIcon className="w-3.5 h-3.5" />
                        {product.distance}
                      </span>
                      <span className="font-medium text-[16px]">{product.store}</span>
                    </div>
                    
                    {/* Stock Info */}
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-1 rounded-lg bg-[#0088CC]/10">
                        <p className="font-semibold text-[#0088CC] text-[16px]">
                          Estoque: {product.stock}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavorite(product.id);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full transition-all active:scale-95 flex-shrink-0"
                  >
                    <Star className="w-6 h-6 fill-[#fbbf24] text-[#fbbf24]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}