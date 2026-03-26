import { Package, BarChart3 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

interface BottomNavProps {
  productId?: string;
}

export function BottomNav({ productId }: BottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: 'Produtos', icon: Package, path: `/stores/${productId || '1'}/products` },
    { label: 'Relatórios', icon: BarChart3, path: `/report-request/${productId || '1'}` },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom shadow-lg">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname.includes(tab.path.split('/')[1]);
          
          return (
            <button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              className={`flex-1 flex flex-col items-center justify-center py-3 transition-all active:scale-95 ${
                isActive 
                  ? 'text-[#006eb4] bg-[#006eb4]/5' 
                  : 'text-gray-500 hover:text-[#006eb4] hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className={`${isActive ? 'font-semibold' : 'font-medium'} text-[16px]`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}