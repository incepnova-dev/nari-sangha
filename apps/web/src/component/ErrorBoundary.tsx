import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    console.error('Error stack:', error.stack);
    console.error('Component stack:', errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error?.message || 'Unknown error';
      const isReduxError = errorMessage.includes('useMemo') || 
                          errorMessage.includes('react-redux') ||
                          errorMessage.includes('Cannot read properties of null');
      
      return (
        <div style={{ padding: '20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <h1>Something went wrong</h1>
          {isReduxError ? (
            <>
              <p style={{ color: '#d32f2f', marginBottom: '20px' }}>
                Redux packages may not be installed or there's a React version conflict.
              </p>
              <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '4px', marginBottom: '20px', textAlign: 'left' }}>
                <p><strong>Redux packages are not installed. Please follow these steps:</strong></p>
                <ol style={{ marginLeft: '20px', lineHeight: '1.8' }}>
                  <li>Stop the development server (press <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '3px', border: '1px solid #ccc' }}>Ctrl+C</kbd> in the terminal)</li>
                  <li>Navigate to the web app directory:
                    <pre style={{ background: '#fff', padding: '8px', borderRadius: '3px', marginTop: '5px', fontSize: '14px' }}>cd apps/web</pre>
                  </li>
                  <li>Install the missing packages:
                    <pre style={{ background: '#fff', padding: '8px', borderRadius: '3px', marginTop: '5px', fontSize: '14px' }}>npm install</pre>
                    Or install just Redux packages:
                    <pre style={{ background: '#fff', padding: '8px', borderRadius: '3px', marginTop: '5px', fontSize: '14px' }}>npm install @reduxjs/toolkit react-redux</pre>
                  </li>
                  <li>Restart the development server:
                    <pre style={{ background: '#fff', padding: '8px', borderRadius: '3px', marginTop: '5px', fontSize: '14px' }}>npm start</pre>
                  </li>
                </ol>
                <p style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
                  <strong>Note:</strong> If you get permission errors, you may need to use <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '3px' }}>sudo</code> or fix npm permissions.
                </p>
              </div>
              <details style={{ textAlign: 'left', marginTop: '20px' }}>
                <summary style={{ cursor: 'pointer', marginBottom: '10px' }}>Error details</summary>
                <pre style={{ background: '#fff', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
                  {errorMessage}
                  {this.state.error?.stack && `\n\nStack:\n${this.state.error.stack}`}
                </pre>
              </details>
            </>
          ) : (
            <p>{errorMessage}</p>
          )}
          <button 
            onClick={() => window.location.reload()}
            style={{ 
              marginTop: '20px', 
              padding: '10px 20px', 
              fontSize: '16px',
              cursor: 'pointer',
              background: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

