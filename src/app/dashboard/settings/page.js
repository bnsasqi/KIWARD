'use client';

import { useState } from 'react';

import { BUSINESS_TYPES, PAYMENT_METHODS } from '../../../lib/constants';
import { mockMerchant } from '../../../lib/mockData';
import { useLang } from '../../../lib/LangContext';

const LOGOS = { YAPE: '/logos/yape.png', PLIN: '/logos/plin.png', BIPAY: '/logos/BiPay.png' };

export default function SettingsPage() {
  const { t } = useLang();
  const [tab, setTab] = useState('business');
  const [merchant, setMerchant] = useState(mockMerchant);
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) };

  const tabs = [
    { id: 'business', key: 'settings_biz', icon: 'fa-store' },
    { id: 'payments', key: 'settings_payments', icon: 'fa-wallet' },
    { id: 'notifications', key: 'settings_notif', icon: 'fa-bell' },
    { id: 'security', key: 'settings_security', icon: 'fa-lock' },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title"><i className="fa-solid fa-gear"></i> {t('settings_title')}</h1>
          <p className="page-subtitle">{t('settings_subtitle')}</p>
        </div>
        {saved && <div className="badge badge-verified anim-scale-in" style={{ padding: '8px 16px', fontSize: 13 }}><i className="fa-solid fa-circle-check"></i> {t('settings_saved')}</div>}
      </div>

      <div className="settings-grid">
        <div className="card" style={{ padding: 10, height: 'fit-content' }}>
          <nav className="settings-nav">
            {tabs.map(tb => (
              <button key={tb.id} className={`settings-nav-link ${tab === tb.id ? 'active' : ''}`} onClick={() => setTab(tb.id)}>
                <i className={`fa-solid ${tb.icon}`}></i> {t(tb.key)}
              </button>
            ))}
          </nav>
        </div>

        <div>
          {tab === 'business' && (
            <div className="card anim-fade-in">
              <div className="card-header"><h3 className="card-title"><i className="fa-solid fa-store"></i> {t('settings_biz')}</h3></div>
              <div className="settings-form-group">
                <div className="input-group"><label>{t('settings_biz_name')}</label><input className="input" value={merchant.businessName} onChange={e => setMerchant({ ...merchant, businessName: e.target.value })} /></div>
                <div className="input-group"><label>{t('settings_owner')}</label><input className="input" value={merchant.ownerName} onChange={e => setMerchant({ ...merchant, ownerName: e.target.value })} /></div>
                <div className="input-group"><label>{t('settings_phone')}</label><input className="input" type="tel" value={merchant.phone} onChange={e => setMerchant({ ...merchant, phone: e.target.value })} /></div>
                <div className="input-group"><label>{t('settings_email')}</label><input className="input" type="email" value={merchant.email} onChange={e => setMerchant({ ...merchant, email: e.target.value })} /></div>
                <div className="input-group"><label>{t('settings_biz_type')}</label>
                  <select className="select" value={merchant.businessType} onChange={e => setMerchant({ ...merchant, businessType: e.target.value })}>
                    {Object.values(BUSINESS_TYPES).map(bt => <option key={bt.id} value={bt.id}>{bt.label}</option>)}
                  </select>
                </div>
                <div className="input-group"><label>{t('settings_city')}</label><input className="input" value={merchant.location.city} onChange={e => setMerchant({ ...merchant, location: { ...merchant.location, city: e.target.value } })} /></div>
              </div>
              <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary" onClick={save}><i className="fa-solid fa-floppy-disk"></i> {t('settings_save')}</button>
              </div>
            </div>
          )}

          {tab === 'payments' && (
            <div className="card anim-fade-in">
              <div className="card-header"><h3 className="card-title"><i className="fa-solid fa-wallet"></i> {t('settings_linked_methods')}</h3></div>
              <p style={{ fontSize: 13, color: 'var(--kw-text-3)', marginBottom: 20 }}>{t('settings_linked_desc')}</p>
              <div className="payment-methods-grid">
                {['YAPE', 'PLIN', 'BIPAY', 'BCP', 'INTERBANK', 'BBVA', 'SCOTIABANK'].map(m => {
                  const info = PAYMENT_METHODS[m];
                  const linked = merchant.paymentMethods.find(pm => pm.type === m);
                  const active = linked?.isActive;
                  const available = ['YAPE', 'PLIN', 'BIPAY'].includes(m);
                  return (
                    <div key={m} className={`card pm-card ${active ? 'active' : ''}`} style={{ opacity: available ? 1 : .5 }}>
                      {active && <span className="pm-card-check"><i className="fa-solid fa-circle-check"></i></span>}
                      {LOGOS[m] ? <img src={LOGOS[m]} alt={info.name} width={36} height={36} className="pm-card-logo" /> : <i className="fa-solid fa-building-columns" style={{ fontSize: 24, color: info.color, marginBottom: 8 }}></i>}
                      <div className="pm-card-name" style={{ color: info.color }}>{info.name}</div>
                      <div className="pm-card-status">{active ? t('settings_active') : available ? t('settings_available') : t('settings_coming_soon')}</div>
                      {available ? (
                        <button className={`btn ${active ? 'btn-ghost' : 'btn-outline'} btn-sm`} style={{ marginTop: 10, width: '100%' }}>
                          {active ? t('settings_unlink') : t('settings_link')}
                        </button>
                      ) : (
                        <span className="badge badge-info" style={{ marginTop: 10 }}>{t('settings_coming_soon')}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === 'notifications' && (
            <div className="card anim-fade-in">
              <div className="card-header"><h3 className="card-title"><i className="fa-solid fa-bell"></i> {t('settings_notif_prefs')}</h3></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { key: 'settings_notif_verified', desc: 'settings_notif_verified_desc', icon: 'fa-circle-check', on: true },
                  { key: 'settings_notif_fraud', desc: 'settings_notif_fraud_desc', icon: 'fa-skull', on: true },
                  { key: 'settings_notif_pending', desc: 'settings_notif_pending_desc', icon: 'fa-clock', on: true },
                  { key: 'settings_notif_daily', desc: 'settings_notif_daily_desc', icon: 'fa-chart-column', on: false },
                  { key: 'settings_notif_sound', desc: 'settings_notif_sound_desc', icon: 'fa-volume-high', on: true },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'var(--kw-bg-3)', borderRadius: 'var(--kw-r-md)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <i className={`fa-solid ${item.icon}`} style={{ color: 'var(--kw-text-3)', width: 20, textAlign: 'center' }}></i>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{t(item.key)}</div>
                        <div style={{ fontSize: 11, color: 'var(--kw-text-4)' }}>{t(item.desc)}</div>
                      </div>
                    </div>
                    <label style={{ position: 'relative', width: 42, height: 22, cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked={item.on} style={{ display: 'none' }} />
                      <span style={{ position: 'absolute', inset: 0, background: item.on ? 'var(--kw-red)' : 'var(--kw-bg-5)', borderRadius: 11, transition: 'background .2s ease' }}>
                        <span style={{ position: 'absolute', top: 2, left: item.on ? 22 : 2, width: 18, height: 18, background: '#fff', borderRadius: '50%', transition: 'left .2s ease' }}></span>
                      </span>
                    </label>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary" onClick={save}><i className="fa-solid fa-floppy-disk"></i> {t('settings_save_prefs')}</button>
              </div>
            </div>
          )}

          {tab === 'security' && (
            <div className="card anim-fade-in">
              <div className="card-header"><h3 className="card-title"><i className="fa-solid fa-lock"></i> {t('settings_security')}</h3></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <i className="fa-solid fa-key" style={{ color: 'var(--kw-text-3)' }}></i> {t('settings_change_pin')}
                  </h4>
                  <div className="settings-form-group">
                    <div className="input-group"><label>{t('settings_current_pin')}</label><input type="password" className="input" placeholder="••••••" maxLength={6} /></div>
                    <div className="input-group"><label>{t('settings_new_pin')}</label><input type="password" className="input" placeholder="••••••" maxLength={6} /></div>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,.04)', paddingTop: 24 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <i className="fa-solid fa-desktop" style={{ color: 'var(--kw-text-3)' }}></i> {t('settings_sessions')}
                  </h4>
                  <div style={{ padding: 14, background: 'var(--kw-bg-3)', borderRadius: 'var(--kw-r-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}><i className="fa-solid fa-laptop" style={{ marginRight: 8, color: 'var(--kw-text-3)' }}></i>{t('settings_this_device')}</div>
                      <div style={{ fontSize: 11, color: 'var(--kw-text-4)' }}>{t('settings_session_active')} · Lima, Perú</div>
                    </div>
                    <span className="badge badge-verified">{t('settings_current')}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                  <button className="btn btn-ghost" style={{ color: 'var(--kw-danger)' }}><i className="fa-solid fa-right-from-bracket"></i> {t('settings_close_sessions')}</button>
                  <button className="btn btn-primary" onClick={save}><i className="fa-solid fa-floppy-disk"></i> {t('settings_save')}</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
