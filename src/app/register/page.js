'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LangProvider, useLang } from '../../lib/LangContext';
import { BUSINESS_TYPES } from '../../lib/constants';

function RegisterContent() {
  const { t } = useLang();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    businessName: '', ownerName: '', phone: '', email: '',
    businessType: '', city: '', district: '', pin: '', confirmPin: '',
  });
  const u = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) { setStep(step + 1); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    router.push('/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="card auth-card anim-scale-in" style={{ maxWidth: 480 }}>
        <div className="auth-logo">
          <div className="landing-nav-logo" style={{ width: 44, height: 44, fontSize: 16 }}>
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <span className="landing-nav-name" style={{ fontSize: 22 }}>KiWARD</span>
        </div>
        <h1 className="auth-title">{t('register_title')}</h1>
        <p className="auth-subtitle">
          {step === 1 ? t('register_step1') : step === 2 ? t('register_step2') : t('register_step3')}
        </p>
        <div className="auth-progress">
          {[1, 2, 3].map(s => <div key={s} className={`auth-progress-step ${s <= step ? 'done' : ''}`}></div>)}
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {step === 1 && <>
            <div className="input-group">
              <label>{t('register_biz_name')}</label>
              <input className="input" placeholder="Ej: Bodega Don Pepe" value={form.businessName} onChange={e => u('businessName', e.target.value)} required />
            </div>
            <div className="input-group">
              <label>{t('register_owner')}</label>
              <input className="input" placeholder="Ej: José Pérez" value={form.ownerName} onChange={e => u('ownerName', e.target.value)} required />
            </div>
            <div className="input-group">
              <label>{t('register_biz_type')}</label>
              <select className="select" value={form.businessType} onChange={e => u('businessType', e.target.value)} required>
                <option value="">{t('select_placeholder')}</option>
                {Object.values(BUSINESS_TYPES).map(bt => (
                  <option key={bt.id} value={bt.id}>{bt.label}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label>{t('register_phone')}</label>
              <div className="input-icon-wrap">
                <i className="fa-solid fa-phone"></i>
                <input className="input" type="tel" placeholder="912 345 678" value={form.phone} onChange={e => u('phone', e.target.value)} maxLength={9} required />
              </div>
            </div>
          </>}
          {step === 2 && <>
            <div className="input-group">
              <label>{t('register_city')}</label>
              <div className="input-icon-wrap">
                <i className="fa-solid fa-location-dot"></i>
                <input className="input" placeholder="Ej: Lima, Cusco..." value={form.city} onChange={e => u('city', e.target.value)} required />
              </div>
            </div>
            <div className="input-group">
              <label>{t('register_district')}</label>
              <input className="input" placeholder="Ej: San Juan de Lurigancho" value={form.district} onChange={e => u('district', e.target.value)} required />
            </div>
            <div className="input-group">
              <label>{t('register_email')}</label>
              <div className="input-icon-wrap">
                <i className="fa-solid fa-envelope"></i>
                <input className="input" type="email" placeholder="tu@email.com" value={form.email} onChange={e => u('email', e.target.value)} />
              </div>
            </div>
          </>}
          {step === 3 && <>
            <div className="input-group">
              <label>{t('register_pin')}</label>
              <input className="input input-lg" type="password" placeholder="••••••" value={form.pin}
                onChange={e => u('pin', e.target.value.replace(/\D/g, ''))} maxLength={6} required
                style={{ textAlign: 'center', letterSpacing: '.5rem' }} />
            </div>
            <div className="input-group">
              <label>{t('register_pin_confirm')}</label>
              <input className="input input-lg" type="password" placeholder="••••••" value={form.confirmPin}
                onChange={e => u('confirmPin', e.target.value.replace(/\D/g, ''))} maxLength={6} required
                style={{ textAlign: 'center', letterSpacing: '.5rem' }} />
            </div>
            {form.pin && form.confirmPin && form.pin !== form.confirmPin && (
              <div style={{ color: 'var(--kw-danger)', fontSize: 12 }}>
                <i className="fa-solid fa-circle-exclamation" style={{ marginRight: 4 }}></i>{t('register_pin_mismatch')}
              </div>
            )}
          </>}
          <div style={{ display: 'flex', gap: 10 }}>
            {step > 1 && (
              <button type="button" className="btn btn-ghost btn-lg" onClick={() => setStep(step - 1)} style={{ flex: 1 }}>
                <i className="fa-solid fa-arrow-left"></i> {t('register_back')}
              </button>
            )}
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ flex: 1 }}>
              {loading ? <><span className="spinner spinner-sm" style={{ borderTopColor: '#fff' }}></span> {t('register_creating')}</> :
                step < 3 ? <>{t('register_next')} <i className="fa-solid fa-arrow-right"></i></> :
                  <><i className="fa-solid fa-shield-halved"></i> {t('register_create')}</>}
            </button>
          </div>
        </form>
        <div className="auth-footer">
          {t('register_has_account')} <Link href="/login">{t('register_login')}</Link>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return <LangProvider><RegisterContent /></LangProvider>;
}
