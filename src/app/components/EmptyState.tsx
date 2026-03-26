import { Search } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description: string;
  icon?: React.ReactNode;
}

export function EmptyState({ 
  title, 
  description, 
  icon = <Search className="w-16 h-16 text-gray-300" />
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] px-6 text-center">
      <div className="card-base w-full max-w-md p-8">
        <div className="mb-4 flex justify-center">
          {icon}
        </div>
        {title && (
          <h3 className="text-xl font-bold text-[#006eb4] mb-2">{title}</h3>
        )}
        <p className="text-auxiliary text-[#717171] max-w-md mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}