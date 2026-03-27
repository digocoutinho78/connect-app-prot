import { Menu, User, Package, ArrowLeft, Bell } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { MenuDrawer } from "./MenuDrawer";
import { NotificationDrawer, mockNotifications } from "./NotificationDrawer";
import { useBrand } from "../contexts/BrandContext";
import drogasmilLogo from "figma:asset/fc0f585d851dab04e089736185d70d79ef0c7a18.png";
import farmalifeLogo from "figma:asset/82f31354c8e2bb456faddfab79417280bba54b14.png";
import tamoioLogo from "figma:asset/47d261bf6a4381db5634bcabc87013e6f8c5bf7d.png";
import rosarioLogo from "figma:asset/1b25586e75eafcc22733ea08e8d81009cea2bc72.png";

interface HeaderProps {
  pageTitle?: string;
  isHome?: boolean;
  onBack?: () => void;
}

export function Header({
  pageTitle,
  isHome = false,
  onBack,
}: HeaderProps) {
  const navigate = useNavigate();
  const { selectedBrand } = useBrand();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] =
    useState(false);

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <header 
        className="shadow-md"
        style={{ 
          backgroundColor: selectedBrand?.bgColor || '#0066cc',
          color: selectedBrand?.id === 'drogasmil' ? '#000000' : '#ffffff'
        }}
      >
        {/* LINHA 1: Menu + CONNECT d1000 + Package + User */}
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 hover:bg-white/10 rounded-xl transition-all active:scale-95"
            >
              <Menu className="w-6 h-6" style={{ color: selectedBrand?.id === 'drogasmil' ? '#000000' : '#ffffff' }} />
            </button>
            <h1 className="text-lg font-bold tracking-wide" style={{ color: selectedBrand?.id === 'drogasmil' ? '#000000' : '#ffffff' }}>Connect d1000</h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="relative p-2 hover:bg-white/10 rounded-xl transition-all active:scale-95"
              onClick={() => navigate("/news")}
              title="Notícias"
            >
              <Bell className="w-6 h-6" style={{ color: selectedBrand?.id === 'drogasmil' ? '#000000' : '#ffffff' }} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[#333333] text-white text-[11px] font-bold leading-none px-1">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>
            <button
              className="relative p-2 hover:bg-white/10 rounded-xl transition-all active:scale-95"
              onClick={() => navigate("/suggestions-status")}
              title="Status Sugestões"
            >
              <Package className="w-6 h-6" style={{ color: selectedBrand?.id === 'drogasmil' ? '#000000' : '#ffffff' }} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[#333333] text-white text-[11px] font-bold leading-none px-1">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>
            <button
              className="p-2 hover:bg-white/10 rounded-xl transition-all active:scale-95"
              onClick={() => navigate("/profile")}
            >
              <User className="w-6 h-6" style={{ color: selectedBrand?.id === 'drogasmil' ? '#000000' : '#ffffff' }} />
            </button>
          </div>
        </div>

        {/* Barra colorida decorativa */}
        <div 
          className="w-full h-2"
          style={{
            background: 'linear-gradient(to right, #E8AC35, #F36E31, #32B666, #0872BA)'
          }}
        />

        {/* LINHA 2: Navegação - Botão Voltar + Página Atual + Logo da Bandeira */}
        {selectedBrand && !isHome && (
          <div
            className="px-4 py-3 border-t border-white/20 flex items-center justify-between"
            style={{ 
              backgroundColor: selectedBrand.id === 'rosario' ? '#006BB4' :
                               selectedBrand.id === 'tamoio' ? '#006BB4' :
                               selectedBrand.id === 'drogasmil' ? '#FFB700' :
                               selectedBrand.id === 'farmalife' ? '#000000' : '#000000'
            }}
          >
            {/* Botão de voltar */}
            <button
              onClick={handleBack}
              className="p-2 hover:bg-white/10 rounded-[10px] transition-all active:scale-95"
              title="Voltar"
            >
              <ArrowLeft className="w-5 h-5" style={{ color: selectedBrand.id === 'drogasmil' ? '#000000' : selectedBrand.textColor }} />
            </button>

            {/* Nome da página atual */}
            {pageTitle && (
              <h2
                className="font-bold flex-1 mx-4 text-left text-[18px]"
                style={{ color: selectedBrand.id === 'drogasmil' ? '#000000' : selectedBrand.textColor }}
              >
                {pageTitle?.toLowerCase() === 'dml 001 - jardim alvorada' 
                  ? 'DML-30 BANGU'
                  : pageTitle?.toLowerCase().split(' ').map((word, index) => 
                      ['de', 'da', 'do', 'a', 'e', 'para'].includes(word) && index !== 0
                        ? word 
                        : word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')
                }
              </h2>
            )}

            {/* Logo da bandeira */}
            <div className="flex-shrink-0">
              {selectedBrand.id === "drogasmil" ? (
                <img
                  src={drogasmilLogo}
                  alt="DROGASMIL"
                  className="h-10 w-auto object-contain"
                />
              ) : selectedBrand.id === "farmalife" ? (
                <img
                  src={farmalifeLogo}
                  alt="FARMALIFE"
                  className="h-10 w-auto object-contain"
                />
              ) : selectedBrand.id === "tamoio" ? (
                <img
                  src={tamoioLogo}
                  alt="TAMOIO"
                  className="h-10 w-auto object-contain"
                />
              ) : selectedBrand.id === "rosario" ? (
                <img
                  src={rosarioLogo}
                  alt="DROGARIA ROSÁRIO"
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <span
                  className="font-bold tracking-wider text-sm"
                  style={{ color: selectedBrand.textColor }}
                >
                  {selectedBrand.name}
                </span>
              )}
            </div>
          </div>
        )}

        {/* LINHA 2 ALTERNATIVA: Para Home - Apenas logo da bandeira centralizada */}
        {selectedBrand && isHome && (
          <div
            className="px-4 py-0 border-t border-white/20"
            style={{ 
              backgroundColor: selectedBrand.id === 'rosario' ? '#006BB4' :
                               selectedBrand.id === 'tamoio' ? '#006BB4' :
                               selectedBrand.id === 'drogasmil' ? '#FFB700' :
                               selectedBrand.id === 'farmalife' ? '#000000' : '#000000'
            }}
          >
            <div className="flex items-center justify-center gap-1">
              <div
                className="px-2 py-0 rounded-lg flex items-center gap-2"
              >
                {selectedBrand.id === "drogasmil" ? (
                  <img
                    src={drogasmilLogo}
                    alt="DROGASMIL"
                    className="h-12 w-auto object-contain"
                  />
                ) : selectedBrand.id === "farmalife" ? (
                  <img
                    src={farmalifeLogo}
                    alt="FARMALIFE"
                    className="h-12 w-auto object-contain"
                  />
                ) : selectedBrand.id === "tamoio" ? (
                  <img
                    src={tamoioLogo}
                    alt="TAMOIO"
                    className="h-12 w-auto object-contain"
                  />
                ) : selectedBrand.id === "rosario" ? (
                  <img
                    src={rosarioLogo}
                    alt="DROGARIA ROSÁRIO"
                    className="h-12 w-auto object-contain"
                  />
                ) : (
                  <span
                    className="font-bold tracking-wider text-[15px]"
                    style={{ color: selectedBrand.textColor }}
                  >
                    {selectedBrand.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </>
  );
}