'use client';

import { useState, useEffect } from 'react';
import { FRAUD_TYPES, SEVERITY, PAYMENT_METHODS } from '../../../lib/constants';
import { formatCurrency, getRelativeTime } from '../../../lib/utils';
import { generateMockAlerts } from '../../../lib/mockData';
import { useLang } from '../../../lib/LangContext';

export default function AlertsPage() {
  const { t } = useLang();
  const [alerts, setAlerts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => { setAlerts(generateMockAlerts()); setLoaded(true) }, 250);
    return () => clearTimeout(timer);
  }, []);

  const unresolved = alerts.filter(a => !a.resolved).length;

  const resolve = (id, action) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true, resolution: action } : a));
  };

  if (!loaded) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><div className="spinner spinner-lg"></div></div>;

  const getSevStyle = (sev) => {
    switch (sev) {
      case 'CRITICAL': return { bg: 'var(--kw-danger)', color: '#fff', icon: 'fa-ban' };
      case 'HIGH': return { bg: 'var(--kw-danger)', color: '#fff', icon: 'fa-skull' };
      case 'MEDIUM': return { bg: 'var(--kw-warning)', color: '#000', icon: 'fa-circle-exclamation' };
      default: return { bg: 'var(--kw-info)', color: '#fff', icon: 'fa-info' };
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title"><i className="fa-solid fa-triangle-exclamation"></i> {t('alerts_title')}</h1>
          <p className="page-subtitle">{unresolved > 0 ? `${unresolved} ${t('alerts_unresolved')}` : t('alerts_none')}</p>
        </div>
      </div>

      {/* Summary warning banner */}
      {unresolved > 0 && (
        <div className="alert-card alert-card-danger anim-fade-up" style={{
          marginBottom: 20,
          background: 'linear-gradient(145deg, rgba(248,113,113,.06), rgba(22,23,28,.95))',
          borderLeft: '4px solid var(--kw-danger)',
        }}>
          <div className="alert-card-icon" style={{ background: 'var(--kw-danger)', color: '#fff', width: 32, height: 32, fontSize: 14 }}>
            <i className="fa-solid fa-skull"></i>
          </div>
          <div className="alert-card-content">
            <div className="alert-card-title" style={{ color: 'var(--kw-danger)' }}>{t('alerts_attention')}</div>
            <div className="alert-card-desc">{t('alerts_attention_desc')}</div>
          </div>
        </div>
      )}

      {/* Alert list — reference-inspired clean cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {alerts.map(alert => {
          const sev = SEVERITY[alert.severity] || {};
          const sevStyle = getSevStyle(alert.severity);
          const mt = PAYMENT_METHODS[alert.paymentMethod];
          const isResolved = alert.resolved;

          return (
            <div key={alert.id} className="alert-card" style={{
              borderLeft: `4px solid ${isResolved ? 'var(--kw-success)' : sev.color}`,
              opacity: isResolved ? .6 : 1,
            }}>
              <div className="alert-card-icon" style={{
                background: isResolved ? 'var(--kw-success)' : sevStyle.bg,
                color: isResolved ? '#fff' : sevStyle.color,
                width: 30, height: 30, fontSize: 12,
              }}>
                <i className={`fa-solid ${isResolved ? 'fa-check' : sevStyle.icon}`}></i>
              </div>
              <div className="alert-card-content" style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                  <span className="alert-card-title">{alert.title}</span>
                  <span style={{
                    padding: '2px 8px', borderRadius: 'var(--kw-r-full)',
                    background: `${sev.color}15`, color: sev.color,
                    fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: .5
                  }}>{sev.label}</span>
                  {isResolved && <span className="badge badge-verified"><i className="fa-solid fa-check"></i> {t('alerts_resolved')}</span>}
                </div>
                <div className="alert-card-desc" style={{ marginBottom: 8 }}>{alert.description}</div>
                <div style={{ display: 'flex', gap: 16, fontSize: 11, color: 'var(--kw-text-4)', flexWrap: 'wrap' }}>
                  <span><i className="fa-solid fa-mobile-screen-button" style={{ marginRight: 4 }}></i>{mt?.name}</span>
                  <span><i className="fa-solid fa-coins" style={{ marginRight: 4 }}></i>{formatCurrency(alert.transactionAmount)}</span>
                  <span><i className="fa-solid fa-user" style={{ marginRight: 4 }}></i>{alert.senderName}</span>
                  <span><i className="fa-regular fa-clock" style={{ marginRight: 4 }}></i>{getRelativeTime(alert.createdAt)}</span>
                </div>
                {!isResolved && (
                  <div className="alert-card-actions">
                    <button className="btn btn-danger btn-sm" onClick={() => resolve(alert.id, 'CONFIRMED_FRAUD')}>
                      <i className="fa-solid fa-ban"></i> {t('alerts_confirm_fraud')}
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={() => resolve(alert.id, 'FALSE_POSITIVE')}>
                      <i className="fa-solid fa-circle-check"></i> {t('alerts_false_positive')}
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={() => resolve(alert.id, 'IGNORED')}>
                      {t('alerts_ignore')}
                    </button>
                  </div>
                )}
              </div>
              {!isResolved && (
                <button className="alert-card-close" onClick={() => resolve(alert.id, 'DISMISSED')}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {alerts.length === 0 && (
        <div className="card">
          <div className="empty">
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'var(--kw-success-bg)', border: '2px solid var(--kw-success-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <i className="fa-solid fa-shield-halved" style={{ fontSize: 24, color: 'var(--kw-success)' }}></i>
            </div>
            <div className="empty-title">{t('alerts_all_clear')}</div>
            <div className="empty-desc">{t('alerts_no_fraud')}</div>
          </div>
        </div>
      )}
    </div>
  );
}
