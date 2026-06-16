'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LangProvider, useLang } from '../../lib/LangContext';

function LoginContent() {
  const { t } = useLang();
  const router = useRouter();
  const [form, setForm] = useState({ phone: '', pin: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 800));
    if (form.phone && form.pin.length >= 4) {
      router.push('/dashboard');
    } else {
      setError('Ingresa tu número de teléfono y PIN');
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card anim-scale-in">
        <div className="auth-logo">
          <div className="landing-nav-logo" style={{ width: 44, height: 44, fontSize: 16 }}>
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <span className="landing-nav-name" style={{ fontSize: 22 }}>KiWARD</span>
        </div>
        <h1 className="auth-title">{t('login_title')}</h1>
        <p className="auth-subtitle">{t('login_subtitle')}</p>
        <form className="auth-form" onSubmit={handleSubmit} id="login-form">
          {error && (
            <div style={{ padding: '10px 14px', background: 'var(--kw-danger-bg)', border: '1px solid var(--kw-danger-border)', borderRadius: 'var(--kw-r-md)', color: 'var(--kw-danger)', fontSize: 13 }}>
              <i className="fa-solid fa-circle-exclamation" style={{ marginRight: 6 }}></i>{error}
            </div>
          )}
          <div className="input-group">
            <label>{t('login_phone')}</label>
            <div className="input-icon-wrap">
              <i className="fa-solid fa-phone"></i>
              <input className="input" type="tel" placeholder="912 345 678" value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })} maxLength={9} required />
            </div>
          </div>
          <div className="input-group">
            <label>{t('login_pin')}</label>
            <div className="input-icon-wrap">
              <i className="fa-solid fa-lock"></i>
              <input className="input" type="password" placeholder="••••••" value={form.pin}
                onChange={e => setForm({ ...form, pin: e.target.value })} maxLength={6} required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%', marginTop: 4 }}>
            {loading ? <><span className="spinner spinner-sm" style={{ borderTopColor: '#fff' }}></span> {t('login_loading')}</> : t('login_btn')}
          </button>
        </form>
        <div className="auth-footer">
          {t('login_no_account')} <Link href="/register">{t('login_register')}</Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <LangProvider><LoginContent /></LangProvider>;
}
