export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner com múltiplas cores */}
        <div className="relative w-16 h-16">
          {/* Azul */}
          <div className="absolute inset-0 border-[16px] border-transparent border-t-[#006eb4] rounded-full animate-spin"></div>
          {/* Verde */}
          <div className="absolute inset-0 border-[16px] border-transparent border-r-[#10b981] rounded-full animate-spin" style={{ animationDelay: '0.15s' }}></div>
          {/* Amarelo */}
          <div className="absolute inset-0 border-[16px] border-transparent border-b-[#fbbf24] rounded-full animate-spin" style={{ animationDelay: '0.3s' }}></div>
          {/* Laranja/Vermelho */}
          <div className="absolute inset-0 border-[16px] border-transparent border-l-[#dc3545] rounded-full animate-spin" style={{ animationDelay: '0.45s' }}></div>
        </div>
        
        {/* Texto */}
        <p className="text-sm text-muted-foreground animate-pulse">Carregando...</p>
      </div>
    </div>
  );
}