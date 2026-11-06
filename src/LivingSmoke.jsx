import {useEffect, useRef} from 'react';
import './living-smoke.css';

export default function LivingSmoke() {
  const ref = useRef(null);
  useEffect(() => {
    const sync = () => { if (ref.current) ref.current.dataset.paused = String(document.hidden); };
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);
  return <div ref={ref} className="living-smoke" aria-hidden="true">
    <div className="living-smoke__layer living-smoke__layer--near"/>
    <div className="living-smoke__layer living-smoke__layer--far"/>
    <div className="living-smoke__light"/>
    <div className="living-smoke__shade"/>
  </div>;
}
