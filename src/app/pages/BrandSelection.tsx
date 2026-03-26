import { useState } from 'react';
import { Brand } from '../types/Brand';
import { useNavigate } from 'react-router';
import { ChevronRight } from 'lucide-react';
import logoImage from 'figma:asset/d6754dfbde50ea97a075ec4e9d3e03a86b0264a9.png';
import drogasmilLogo from 'figma:asset/fc0f585d851dab04e089736185d70d79ef0c7a18.png';
import farmalifeLogo from 'figma:asset/82f31354c8e2bb456faddfab79417280bba54b14.png';
import tamoioLogo from 'figma:asset/47d261bf6a4381db5634bcabc87013e6f8c5bf7d.png';
import rosarioLogo from 'figma:asset/1b25586e75eafcc22733ea08e8d81009cea2bc72.png';
import backgroundImage from 'figma:asset/4880b469a6272c65f7cf4091f2e31e23615e3970.png';
import { useBrand, brands } from '../contexts/BrandContext';

export function BrandSelection() {
  const navigate = useNavigate();
  const { setSelectedBrand } = useBrand();
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);

  const handleBrandSelection = (brand: Brand) => {
    if (brand) {
      setSelectedBrand(brand);
      setTimeout(() => {
        navigate('/news');
      }, 300);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white relative">
      {/* Background image with opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full">
        <img 
          src={logoImage}
          alt="Rede d1000"
          className="w-74 h-auto mb-12"
        />
        
        <h1 className="font-bold text-center mb-8 tracking-wide text-[20px] text-[#006eb4]">
          Selecione uma bandeira
        </h1>

        <div className="w-full max-w-md space-y-4">
          {brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => handleBrandSelection(brand)}
              className={`w-full p-2 rounded-[10px] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-between shadow-md ${
                selectedBrandId === brand.id ? 'ring-4 ring-[#0066cc]' : ''
              }`}
              style={{ 
                backgroundColor: brand.id === 'rosario' ? '#006BB4' :
                                 brand.id === 'tamoio' ? '#006BB4' :
                                 brand.id === 'drogasmil' ? '#FFB700' :
                                 brand.id === 'farmalife' ? '#000000' : brand.bgColor
              }}
            >
              {brand.id === 'drogasmil' ? (
                <img 
                  src={drogasmilLogo} 
                  alt="DROGASMIL" 
                  className="h-20 w-auto object-contain"
                />
              ) : brand.id === 'farmalife' ? (
                <img 
                  src={farmalifeLogo} 
                  alt="FARMALIFE" 
                  className="h-20 w-auto object-contain"
                />
              ) : brand.id === 'tamoio' ? (
                <img 
                  src={tamoioLogo} 
                  alt="TAMOIO" 
                  className="h-20 w-auto object-contain"
                />
              ) : brand.id === 'rosario' ? (
                <img 
                  src={rosarioLogo} 
                  alt="DROGARIA ROSÁRIO" 
                  className="h-20 w-auto object-contain"
                />
              ) : (
                <span 
                  className="text-2xl font-bold tracking-wider"
                  style={{ color: brand.textColor }}
                >
                  {brand.name}
                </span>
              )}
              <ChevronRight 
                className="w-7 h-7"
                style={{ color: brand.textColor }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}