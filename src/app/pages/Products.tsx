import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Header } from "../components/Header";
import { EmptyState } from "../components/EmptyState";
import { Search, Package } from "lucide-react";
import {
  useBrand,
  getBackgroundImage,
} from "../contexts/BrandContext";

interface Product {
  id: string;
  name: string;
  quantity: number;
  storeName: string;
  storeId: string;
}

const mockAllProducts: Product[] = [
  {
    id: "1",
    name: "Dipirona 500mg - Caixa com 20 comprimidos",
    quantity: 150,
    storeName: "DML-30 BANGU",
    storeId: "1",
  },
  {
    id: "2",
    name: "Paracetamol 750mg - Caixa com 10 comprimidos",
    quantity: 85,
    storeName: "DML 002 - CENTRO",
    storeId: "2",
  },
  {
    id: "3",
    name: "Ibuprofeno 600mg - Caixa com 30 comprimidos",
    quantity: 42,
    storeName: "DML 003 - ZONA SUL",
    storeId: "3",
  },
  {
    id: "4",
    name: "Amoxicilina 500mg - Caixa com 21 cápsulas",
    quantity: 28,
    storeName: "DML-30 BANGU",
    storeId: "1",
  },
  {
    id: "5",
    name: "Omeprazol 20mg - Caixa com 28 cápsulas",
    quantity: 95,
    storeName: "DML 004 - BAIRRO NOVO",
    storeId: "4",
  },
  {
    id: "6",
    name: "Dipirona 500mg - Caixa com 20 comprimidos",
    quantity: 75,
    storeName: "DML 002 - CENTRO",
    storeId: "2",
  },
  {
    id: "7",
    name: "Losartana 50mg - Caixa com 30 comprimidos",
    quantity: 120,
    storeName: "DML 003 - ZONA SUL",
    storeId: "3",
  },
];

export function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedBrand } = useBrand();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Salva o returnTo e currentStore quando o componente monta
  const [returnTo] = useState(
    () => location.state?.returnTo || null,
  );
  const [currentStore] = useState(
    () => location.state?.currentStore || null,
  );

  // Debug: mostra de onde veio
  console.log(
    "Products - location.state completo:",
    location.state,
  );
  console.log("Products - returnTo salvo:", returnTo);
  console.log("Products - currentStore salvo:", currentStore);

  const handleSearch = () => {
    setHasSearched(true);
    if (searchQuery.trim()) {
      setProducts(mockAllProducts);
    } else {
      setProducts([]);
    }
  };

  return (
    <>
      {/* Background Layer */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${getBackgroundImage(selectedBrand)})`,
        }}
      />

      {/* Content Layer */}
      <div className="relative min-h-screen pb-6">
        <Header pageTitle="Produtos" />

        <div className="p-4 space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Nome do Produto"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSearch()
                }
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
              description="Preencha o filtro e clique na lupa para pesquisar produtos em todas as lojas."
              icon={
                <Package className="w-16 h-16 text-gray-300" />
              }
            />
          )}

          {hasSearched && products.length === 0 && (
            <EmptyState
              description="Nenhum produto encontrado para sua busca."
              icon={
                <Package className="w-16 h-16 text-gray-300" />
              }
            />
          )}

          {products.length > 0 && (
            <div className="space-y-3">
              <p className="text-[#717171] font-medium text-sm mb-1">
                RESULTADO: {products.length}{" "}
                {products.length === 1 ? "PRODUTO" : "PRODUTOS"}
              </p>

              {products.map((product, index) => (
                <button
                  key={`${product.id}-${product.storeId}-${index}`}
                  onClick={() => {
                    console.log(
                      "Clicou no produto:",
                      product.name,
                    );
                    console.log(
                      "location.state:",
                      location.state,
                    );

                    // Verifica se veio da página de contato
                    if (returnTo === "/contact") {
                      console.log(
                        "Navegando de volta para /contact com:",
                        product.name,
                      );
                      // Retorna para a página de contato com o produto selecionado e preserva a loja
                      navigate("/contact", {
                        state: {
                          selectedProduct: product.name,
                          selectedStore: currentStore,
                        },
                        replace: false,
                      });
                    } else {
                      console.log(
                        "Navegando para pesquisa de lojas com produto:",
                        product.name,
                      );
                      // Fluxo normal: Navega para a pesquisa de lojas que têm esse produto
                      navigate("/stores-by-product", {
                        state: {
                          productId: product.id,
                          productName: product.name,
                        },
                      });
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
                    {/* <p className="text-auxiliary mb-2 text-[15px] font-bold text-[#284659]">
                    {product.storeName}
                  </p> */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-baseline gap-1">
                        <span className="text-[#006eb4] text-[20px]">
                          {product.quantity}
                        </span>
                        <span className="text-auxiliary text-[#717171] text-[20px]">
                          Unidades
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}