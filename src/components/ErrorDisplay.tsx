
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
  title?: string;
}

const ErrorDisplay = ({ 
  error, 
  onRetry, 
  title = "Error" 
}: ErrorDisplayProps) => {
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>{error}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm" className="self-start">
            Try Again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorDisplay;
