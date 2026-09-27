import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';

function FailureScreen({ error }) {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: '#fbf8f2', color: '#0f2a3d', fontFamily: 'system-ui, sans-serif' }}>
      <section style={{ width: 'min(680px, 100%)', padding: 28, border: '1px solid #e4ddcd', borderRadius: 18, background: '#fff', boxShadow: '0 12px 36px rgba(15,42,61,.1)' }}>
        <p style={{ margin: '0 0 8px', color: '#2452b8', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' }}>Dharohar X</p>
        <h1 style={{ margin: '0 0 12px', fontSize: 28 }}>The page could not start</h1>
        <p style={{ margin: '0 0 16px', lineHeight: 1.6 }}>A JavaScript error stopped the app from rendering. The error is shown here so the blank screen can be diagnosed.</p>
        <pre style={{ margin: 0, padding: 14, maxHeight: 260, overflow: 'auto', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', borderRadius: 10, background: '#f3f5f7', color: '#253746', fontSize: 13 }}>{error?.stack || error?.message || String(error)}</pre>
        <button onClick={() => window.location.reload()} style={{ marginTop: 18, padding: '10px 16px', border: 0, borderRadius: 999, background: '#2452b8', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Reload page</button>
      </section>
    </main>
  );
}

class AppErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error) { console.error('Dharohar X render error:', error); }
  render() { return this.state.error ? <FailureScreen error={this.state.error} /> : this.props.children; }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<main style={{ minHeight: '100vh', background: '#fbf8f2' }} aria-label="Loading Dharohar X" />);

import('./App').then(({ default: App }) => {
  root.render(
    <React.StrictMode>
      <AppErrorBoundary>
        <BrowserRouter><App /></BrowserRouter>
      </AppErrorBoundary>
    </React.StrictMode>
  );
}).catch((error) => {
  console.error('Dharohar X startup error:', error);
  root.render(<FailureScreen error={error} />);
});
