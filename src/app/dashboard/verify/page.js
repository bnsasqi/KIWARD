'use client';

import { useState } from 'react';

import { PAYMENT_METHODS } from '../../../lib/constants';
import { formatCurrency } from '../../../lib/utils';
import { VerificationEngine } from '../../../services/verification';
import { useLang } from '../../../lib/LangContext';

const LOGOS = { YAPE: '/logos/yape.png', PLIN: '/logos/plin.png', BIPAY: '/logos/BiPay.png' };

export default function VerifyPage() {
  const { t } = useLang();
  const [form, setForm] = useState({ operationCode: '', amount: '', paymentMethod: '', senderPhone: '' });
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState(null);
  const [step, setStep] = useState('form');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStep('verifying');
    setVerifying(true);
    try {
      const r = await VerificationEngine.verify(form);
      setResult(r);
      setStep('result');
    } catch {
      setResult({ success: false, status: 'ERROR', message: 'Error inesperado.' });
      setStep('result');
    } finally { setVerifying(false) }
  };

  const reset = () => { setForm({ operationCode: '', amount: '', paymentMethod: '', senderPhone: '' }); setResult(null); setStep('form') };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title"><i className="fa-solid fa-magnifying-glass-dollar"></i> {t('verify_title')}</h1>
          <p className="page-subtitle">{t('verify_subtitle')}</p>
        </div>
      </div>
      <div className="verify-grid">
        {/* Form */}
        <div className="card anim-fade-up">
          <form className="verify-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>{t('verify_method')}</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {['YAPE', 'PLIN', 'BIPAY'].map(m => {
                  const info = PAYMENT_METHODS[m];
                  const sel = form.paymentMethod === m;
                  return (
                    <button key={m} type="button" onClick={() => setForm({ ...form, paymentMethod: m })}
                      style={{ flex: 1, padding: '14px 10px', background: sel ? `${info.color}12` : 'var(--kw-bg-3)',
                        border: `2px solid ${sel ? info.color : 'rgba(255,255,255,.06)'}`, borderRadius: 'var(--kw-r-md)',
                        cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                        transition: 'all .2s ease', color: sel ? info.color : 'var(--kw-text-3)', fontFamily: 'var(--kw-font)',
                        boxShadow: sel ? `0 0 16px ${info.color}20, inset 0 1px 0 rgba(255,255,255,.05)` : 'inset 0 2px 4px rgba(0,0,0,.2)' }}>
                      <img src={LOGOS[m]} alt={info.name} width={28} height={28} style={{ borderRadius: 6 }} />
                      <span style={{ fontSize: 12, fontWeight: 600 }}>{info.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="input-group">
              <label>{t('verify_code')}</label>
              <div className="input-icon-wrap">
                <i className="fa-solid fa-hashtag"></i>
                <input className="input" placeholder="Ej: 142-8934521" value={form.operationCode}
                  onChange={e => setForm({ ...form, operationCode: e.target.value })} required disabled={verifying} />
              </div>
            </div>
            <div className="input-group">
              <label>{t('verify_amount')}</label>
              <div className="input-icon-wrap">
                <i className="fa-solid fa-coins"></i>
                <input className="input" type="number" step="0.01" min="0.01" placeholder="0.00" value={form.amount}
                  onChange={e => setForm({ ...form, amount: e.target.value })} required disabled={verifying} />
              </div>
            </div>
            <div className="input-group">
              <label>{t('verify_phone')}</label>
              <div className="input-icon-wrap">
                <i className="fa-solid fa-phone"></i>
                <input className="input" type="tel" placeholder="912 345 678" value={form.senderPhone}
                  onChange={e => setForm({ ...form, senderPhone: e.target.value })} disabled={verifying} maxLength={9} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg" disabled={verifying || !form.paymentMethod || !form.operationCode || !form.amount}
              style={{ width: '100%' }}>
              {verifying ? <><span className="spinner spinner-sm" style={{ borderTopColor: '#fff' }}></span> {t('verify_verifying')}</> :
                <><i className="fa-solid fa-magnifying-glass-dollar"></i> {t('verify_btn')}</>}
            </button>
          </form>
        </div>

        {/* Result */}
        <div className={`card ${result?.success ? 'card-glow-success' : result?.status === 'FRAUD' ? 'card-glow-danger' : ''}`}>
          {step === 'form' && (
            <div className="verify-result">
              <div className="verify-result-icon" style={{ background: 'var(--kw-bg-3)', border: '2px solid var(--kw-card-border)' }}>
                <i className="fa-solid fa-magnifying-glass" style={{ color: 'var(--kw-text-4)' }}></i>
              </div>
              <h3 style={{ color: 'var(--kw-text-4)', fontSize: 16 }}>{t('verify_enter_data')}</h3>
              <p style={{ color: 'var(--kw-text-5)', fontSize: 13 }}>{t('verify_result_here')}</p>
            </div>
          )}
          {step === 'verifying' && (
            <div className="verify-result">
              <div className="spinner spinner-lg"></div>
              <h3 style={{ color: 'var(--kw-text-2)', fontSize: 16 }}>{t('verify_checking')}</h3>
              <p style={{ color: 'var(--kw-text-4)', fontSize: 13 }}>{t('verify_consulting')} {PAYMENT_METHODS[form.paymentMethod]?.name}</p>
            </div>
          )}
          {step === 'result' && result && (
            <div className="verify-result anim-scale-in">
              <div className={`verify-result-icon ${result.success ? 'success' : 'danger'}`}>
                <i className={`fa-solid ${result.success ? 'fa-circle-check' : result.status === 'FRAUD' ? 'fa-ban' : 'fa-circle-xmark'}`}></i>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: result.success ? 'var(--kw-success)' : 'var(--kw-danger)' }}>
                {result.success ? t('verify_success') : result.status === 'FRAUD' ? t('verify_fraud') : t('verify_failed')}
              </h3>
              <p style={{ color: result.success ? 'var(--kw-success)' : 'var(--kw-danger)', fontSize: 13, fontWeight: 600 }}>
                {result.message}
              </p>
              {result.details && (
                <div className="verify-details">
                  <div className="verify-row"><span className="verify-label">{t('verify_provider')}</span><span className="verify-val">{result.provider}</span></div>
                  <div className="verify-row"><span className="verify-label">{t('verify_op_code')}</span><span className="verify-val">{result.details.operationCode}</span></div>
                  {result.details.amount && <div className="verify-row"><span className="verify-label">{t('verify_amount')}</span><span className="verify-val">{formatCurrency(result.details.amount)}</span></div>}
                  {result.details.senderName && <div className="verify-row"><span className="verify-label">{t('verify_sender')}</span><span className="verify-val">{result.details.senderName}</span></div>}
                  {result.fraudScore !== undefined && <div className="verify-row"><span className="verify-label">{t('verify_risk')}</span><span className="verify-val" style={{ color: result.fraudScore <= 20 ? 'var(--kw-success)' : result.fraudScore <= 50 ? 'var(--kw-warning)' : 'var(--kw-danger)' }}>{result.fraudScore}/100</span></div>}
                  <div className="verify-row"><span className="verify-label">{t('verify_time')}</span><span className="verify-val">{(result.processingTime / 1000).toFixed(1)}s</span></div>
                </div>
              )}
              <button onClick={reset} className="btn btn-ghost btn-lg" style={{ width: '100%', marginTop: 4 }}>
                <i className="fa-solid fa-rotate-right"></i> {t('verify_new')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
