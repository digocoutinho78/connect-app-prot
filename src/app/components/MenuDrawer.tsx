import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { 
  Home, 
  Store, 
  Package, 
  Star, 
  MessageCircle, 
  User, 
  TrendingUp,
  ChevronLeft,
  Bell,
  BarChart3,
  LogOut,
  Flag,
  AlertCircle
} from 'lucide-react';
import { LocationIcon } from './icons/LocationIcon';
import logoImage from 'figma:asset/cd0a1b8fae68cd6e3c41f36e890bb9eaef061841.png';
import { useBrand } from '../contexts/BrandContext';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { path: '/home', icon: Home, label: 'Início' },
  { path: '/brand-selection', icon: Flag, label: 'Selecionar Bandeira' },
  { path: '/news', icon: AlertCircle, label: 'Notícias' },
  { path: '/stores', icon: Store, label: 'Lojas' },
  { path: '/products', icon: Package, label: 'Produtos' },
  { path: '/favorites', icon: Star, label: 'Favoritos' },
  { path: '/map', icon: LocationIcon, label: 'Mapa de Lojas' },
  { path: '/contact', icon: MessageCircle, label: 'Fale Conosco' },
  { path: '/profile', icon: User, label: 'Perfil' },
];

export function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedBrand } = useBrand();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    navigate('/login');
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div 
          className="px-6 py-6"
          style={{ backgroundColor: selectedBrand?.bgColor || '#0066cc' }}
        >
          <div className="flex items-left justify-between mb-4">
            <img 
              src={logoImage}
              alt="Rede d1000"
              className="h-18 w-auto object-contain"
            />
            <button 
              onClick={onClose}
              className="p-2  rounded-[10px] transition-all active:scale-95"
            >
              <ChevronLeft className="w-6 h-6" style={{ color: selectedBrand?.id === 'drogasmil' ? '#000000' : '#ffffff' }} />
            </button>
          </div>
          <div>
            <p className="font-semibold text-[20px]" style={{ color: selectedBrand?.id === 'drogasmil' ? '#000000' : '#ffffff' }}>Connect d1000</p>
            <p className="text-sm" style={{ color: selectedBrand?.id === 'drogasmil' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)' }}>Menu Principal</p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-[10px] transition-all active:scale-95 ${
                  isActive 
                    ? 'text-white shadow-md' 
                    : 'hover:bg-[#F7F9FC] text-[#006eb4]'
                }`}
                style={isActive ? { backgroundColor: selectedBrand?.bgColor || '#0066cc' } : {}}
              >
                <Icon 
                  className="w-5 h-5"
                  style={isActive && selectedBrand?.id === 'drogasmil' ? { color: '#000000' } : {}}
                />
                <span 
                  className="font-semibold"
                  style={isActive && selectedBrand?.id === 'drogasmil' ? { color: '#000000' } : {}}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Footer - Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-[10px] hover:bg-red-50 text-[#006eb4] transition-all active:scale-95"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-semibold">Sair</span>
          </button>
        </div>
      </div>
    </>
  );
}