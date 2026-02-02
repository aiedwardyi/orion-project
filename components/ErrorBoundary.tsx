import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center space-y-6 font-sans">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-2 animate-pulse">
            <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-[0.2em] italic">System Interrupt</h1>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-2">Critical Protocol Failure Detected</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/5 max-w-sm w-full">
            <p className="text-[10px] font-mono text-amber-500/80 break-all">{this.state.error?.message || 'Unknown Error Exception'}</p>
          </div>
          <button 
            onClick={() => {
                try {
                  window.history.replaceState(null, '', window.location.pathname);
                } catch(e) { console.warn(e); }
                window.location.reload();
            }}
            className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
          >
            Reboot Interface
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;