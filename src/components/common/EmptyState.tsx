import { Package, Plus } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title,
  message,
  actionText,
  onAction,
  icon = <Package className="h-12 w-12" />,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-50 rounded-full mb-4">
        <div className="text-primary-600">{icon}</div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600 max-w-sm mx-auto">{message}</p>
      {actionText && onAction && (
        <div className="mt-6">
          <Button onClick={onAction}>
            <Plus className="h-4 w-4 mr-2" />
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
}