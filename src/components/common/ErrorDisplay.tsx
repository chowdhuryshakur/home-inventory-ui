import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface ErrorDisplayProps {
  error: Error | any;
  onRetry?: () => void;
  title?: string;
}

export default function ErrorDisplay({
  error,
  onRetry,
  title = 'Something went wrong',
}: ErrorDisplayProps) {
  const errorMessage = error?.message || 'An unexpected error occurred';

  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-medium text-red-800">{title}</h3>
          <p className="mt-1 text-sm text-red-700">{errorMessage}</p>
          {onRetry && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="text-red-700 border-red-300 hover:bg-red-100"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}