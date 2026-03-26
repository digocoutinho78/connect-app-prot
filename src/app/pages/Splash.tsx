import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import svgPaths from '../../imports/svg-yrn9730x8s';
import logoImage from 'figma:asset/d6754dfbde50ea97a075ec4e9d3e03a86b0264a9.png';
import { useBrand, getBackgroundImage } from '../contexts/BrandContext';

export function Splash() {
  const navigate = useNavigate();
  const { selectedBrand } = useBrand();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-6 gap-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${getBackgroundImage(selectedBrand)})` }}
    >
      {/* Logo Container */}
      <div className="flex flex-col items-center">
        <img 
          src={logoImage}
          alt="Rede d1000"
          className="w-64 h-auto"
        />
      </div>

      {/* Loading Container */}
      <div className="flex flex-col items-center justify-center gap-3">
        {/* Loader animado */}
        <div className="relative w-8 h-8 animate-spin">
          <svg 
            className="absolute block size-full" 
            fill="none" 
            preserveAspectRatio="none" 
            viewBox="0 0 31.9867 31.9867"
          >
            <path 
              d={svgPaths.pdf560c0}
              stroke="#006eb4" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2.66556" 
            />
          </svg>
        </div>

        {/* Texto */}
        <p className="text-[#6a7282] text-sm font-normal">
          Verificando acesso...
        </p>
      </div>
    </div>
  );
}