import { createContext, useContext, useState, ReactNode } from 'react';
import backgroundImageDrogasmil from 'figma:asset/b37fc0fff58a9e81515315a9c9dc218736e159a0.png';
import backgroundImageFarmalife from 'figma:asset/834e83c5382cd45ab332b11617b9d8506b13303f.png';
import backgroundImageTamoio from 'figma:asset/4e46ab1bb8e56ea234940105e91670b53142143f.png';
import backgroundImageRosario from 'figma:asset/ad70f8145c2bfc9e64635c36bb57bc8a7e3d0e71.png';

console.log('🖼️ Background Images Loaded:');
console.log('Drogasmil:', backgroundImageDrogasmil);
console.log('Farmalife:', backgroundImageFarmalife);
console.log('Tamoio:', backgroundImageTamoio);
console.log('Rosário:', backgroundImageRosario);

export interface Brand {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
  backgroundImage: string;
}

export const brands: Brand[] = [
  { 
    id: 'drogasmil', 
    name: 'DROGASMIL-LOGO', 
    bgColor: '#FDB913',
    textColor: '#ffffff',
    backgroundImage: backgroundImageDrogasmil
  },
  { 
    id: 'farmalife', 
    name: 'FARMALIFE-LOGO',
    bgColor: '#F58C1E',
    textColor: '#ffffff',
    backgroundImage: backgroundImageFarmalife
  },
  { 
    id: 'tamoio', 
    name: 'TAMOIO-LOGO',
    bgColor: '#6BBE44',
    textColor: '#ffffff',
    backgroundImage: backgroundImageTamoio
  },
  { 
    id: 'rosario', 
    name: 'ROSÁRIO-LOGO',
    bgColor: '#0066CC',
    textColor: '#ffffff',
    backgroundImage: backgroundImageRosario
  },
];

// Helper function to get background image
export const getBackgroundImage = (brand: Brand | null): string => {
  const bgImage = (!brand || !brand.backgroundImage) ? backgroundImageDrogasmil : brand.backgroundImage;
  console.log('🎨 getBackgroundImage called:', { brand: brand?.id, bgImage });
  return bgImage;
};

interface BrandContextType {
  selectedBrand: Brand | null;
  setSelectedBrand: (brand: Brand) => void;
  clearBrand: () => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandProvider({ children }: { children: ReactNode }) {
  const [selectedBrand, setSelectedBrandState] = useState<Brand | null>(() => {
    // Initialize from localStorage only once on mount
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = localStorage.getItem('selectedBrand');
        if (saved) {
          const brandId = JSON.parse(saved);
          const brand = brands.find(b => b.id === brandId);
          if (brand) {
            console.log('Brand loaded from localStorage:', brand);
            return brand;
          }
        }
      } catch {
        // Invalid data in localStorage, ignore
      }
    }
    return null;
  });

  const setSelectedBrand = (brand: Brand) => {
    console.log('Setting brand:', brand);
    setSelectedBrandState(brand);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('selectedBrand', JSON.stringify(brand.id));
    }
  };

  const clearBrand = () => {
    setSelectedBrandState(null);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('selectedBrand');
    }
  };

  return (
    <BrandContext.Provider value={{ selectedBrand, setSelectedBrand, clearBrand }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand(): BrandContextType {
  const context = useContext(BrandContext);
  if (context === undefined) {
    // Durante o desenvolvimento, retorna valores padrão ao invés de lançar erro
    console.warn('useBrand called outside BrandProvider, returning default values');
    return {
      selectedBrand: null,
      setSelectedBrand: () => {
        console.warn('setSelectedBrand called outside BrandProvider');
      },
      clearBrand: () => {
        console.warn('clearBrand called outside BrandProvider');
      }
    };
  }
  return context;
}