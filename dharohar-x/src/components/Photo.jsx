import React, { useEffect, useState } from 'react';
import { Landmark } from 'lucide-react';

// Wraps <img> with a graceful fallback so a broken remote (Wikimedia) URL
// never leaves a blank gap in a card or hero — it degrades to a soft
// branded placeholder instead, keeping every layout intact.
export default function Photo({ src, alt = '', className = '', style, loading = 'lazy', ...rest }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (failed || !src) {
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg, #eef3fa, #f7ece1)', color: '#9aa7b1',
        }}
        role="img"
        aria-label={alt}
      >
        <Landmark size={28} strokeWidth={1.4} />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
