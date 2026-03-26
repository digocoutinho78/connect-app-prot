import { Loader2 } from 'lucide-react';

interface LoadingProps {
  text?: string;
}

export function Loading({ text = 'Carregando...' }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-[#0066cc]" />
      <p className="text-gray-500 text-sm">{text}</p>
    </div>
  );
}
