import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service like Sentry or LogRocket here
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 text-center bg-background rounded-2xl border border-destructive/20 m-4 sm:m-6 shadow-sm">
          <div className="bg-destructive/10 p-4 rounded-full mb-6 sm:mb-8">
            <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-destructive" />
          </div>
          <h2 className="font-bold mb-4 text-foreground text-[clamp(1.5rem,5vw,2.25rem)] leading-tight">Something went wrong</h2>
          <p className="text-muted-foreground mb-8 max-w-md text-[clamp(0.95rem,3vw,1.125rem)] leading-relaxed px-2">
            We apologize for the inconvenience. An unexpected error has occurred in this section of the application.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <RefreshCcw className="w-4 h-4" />
            Reload Page
          </button>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-muted/50 rounded-lg text-left overflow-auto max-w-full text-xs text-muted-foreground">
              <p className="font-bold mb-2 text-destructive">{this.state.error && this.state.error.toString()}</p>
              <pre className="whitespace-pre-wrap">{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
            </div>
          )}
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
