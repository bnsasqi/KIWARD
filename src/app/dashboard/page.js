'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { PAYMENT_METHODS, TRANSACTION_STATUS } from '../../lib/constants';
import { formatCurrency, getRelativeTime } from '../../lib/utils';
import { generateMockTransactions, generateMockStats } from '../../lib/mockData';
import { useLang } from '../../lib/LangContext';

const LOGOS = { YAPE: '/logos/yape.png', PLIN: '/logos/plin.png', BIPAY: '/logos/BiPay.png' };

export default function DashboardPage() {
  const { t } = useLang();
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats(generateMockStats());
      setTransactions(generateMockTransactions(15));
      setLoaded(true);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  if (!loaded) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><div className="spinner spinner-lg"></div></div>;
  }

  const cards = [
    { label: t('stat_daily_sales'), value: formatCurrency(stats.totalSales), change: stats.salesChange, icon: 'fa-coins', ic: 'ic-green' },
    { label: t('stat_transactions'), value: stats.totalTransactions, change: stats.transactionsChange, icon: 'fa-credit-card', ic: 'ic-blue' },
    { label: t('stat_verified'), value: stats.verifiedPayments, extra: `${stats.verificationRate}% ${t('stat_rate')}`, icon: 'fa-circle-check', ic: 'ic-green' },
    { label: t('stat_fraud_alerts'), value: stats.fraudAttempts, icon: 'fa-triangle-exclamation', ic: 'ic-red', alert: stats.fraudAttempts > 0 },
  ];

  const methodCounts = {};
  transactions.forEach(tx => { methodCounts[tx.paymentMethod] = (methodCounts[tx.paymentMethod] || 0) + 1 });

  return (
    <div>
      {/* Stats */}
      <div className="stats-grid">
        {cards.map((c, i) => (
          <div key={i} className={`card stat-card anim-fade-up d${i + 1} ${c.alert ? 'card-glow-danger' : ''}`}>
            <div className={`stat-card-icon ${c.ic}`}><i className={`fa-solid ${c.icon}`}></i></div>
            <div className="stat-label">{c.label}</div>
            <div className="stat-value">{c.value}</div>
            {c.change != null && <div className={`stat-change ${c.change >= 0 ? 'stat-up' : 'stat-down'}`}><i className={`fa-solid ${c.change >= 0 ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i> {Math.abs(c.change)}% {t('stat_vs_yesterday')}</div>}
            {c.extra && <div className="stat-change stat-up">{c.extra}</div>}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="dash-grid">
        {/* Activity */}
        <div className="card anim-fade-up d3">
          <div className="card-header">
            <h3 className="card-title"><i className="fa-solid fa-signal"></i> {t('activity_title')}</h3>
            <Link href="/dashboard/transactions" className="btn btn-ghost btn-sm">{t('activity_see_all')} <i className="fa-solid fa-arrow-right" style={{ fontSize: 10 }}></i></Link>
          </div>
          <div className="activity-feed">
            {transactions.slice(0, 8).map(tx => {
              const st = TRANSACTION_STATUS[tx.status] || TRANSACTION_STATUS.PENDING;
              const cls = st.color === 'danger' ? 'danger' : st.color === 'warning' ? 'pending' : 'success';
              const stIcon = cls === 'success' ? 'fa-circle-check' : cls === 'danger' ? 'fa-skull' : 'fa-clock';
              return (
                <div key={tx.id} className="activity-item">
                  <div className={`activity-icon ${cls}`}><i className={`fa-solid ${stIcon}`}></i></div>
                  <div className="activity-info">
                    <div className="activity-name" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {tx.senderName}
                      <img src={LOGOS[tx.paymentMethod]} alt={tx.paymentMethod} width={16} height={16} style={{ borderRadius: 3 }} />
                    </div>
                    <div className="activity-meta">{getRelativeTime(tx.createdAt)} · {tx.operationCode}</div>
                  </div>
                  <div className="activity-amount">{formatCurrency(tx.amount)}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Quick verify */}
          <div className="card anim-fade-up d4" style={{ borderLeft: '3px solid var(--kw-red)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 'var(--kw-r-md)',
                background: 'linear-gradient(135deg, rgba(var(--kw-red-rgb),.15), rgba(var(--kw-red-rgb),.05))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, color: 'var(--kw-red)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.05)'
              }}>
                <i className="fa-solid fa-bolt"></i>
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--kw-text-1)' }}>{t('quick_verify_title')}</h3>
                <p style={{ fontSize: 12, color: 'var(--kw-text-4)' }}>{t('quick_verify_desc')}</p>
              </div>
            </div>
            <Link href="/dashboard/verify" className="btn btn-primary" style={{ width: '100%' }}>
              <i className="fa-solid fa-magnifying-glass-dollar"></i> {t('quick_verify_btn')}
            </Link>
          </div>

          {/* Payment Methods with logos */}
          <div className="card anim-fade-up d5">
            <div className="card-header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 14 }}>
              <h3 className="card-title"><i className="fa-solid fa-wallet"></i> {t('payment_methods')}</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {['YAPE', 'PLIN', 'BIPAY'].map(m => {
                const info = PAYMENT_METHODS[m];
                const count = methodCounts[m] || 0;
                const total = transactions.length || 1;
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img src={LOGOS[m]} alt={info.name} width={28} height={28} style={{ borderRadius: 6 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: info.color }}>{info.name}</span>
                        <span style={{ fontSize: 11, color: 'var(--kw-text-4)', fontFamily: 'var(--kw-font-mono)' }}>{count} {t('payments_count')} ({pct}%)</span>
                      </div>
                      <div style={{ width: '100%', height: 6, background: 'var(--kw-bg-4)', borderRadius: 3, overflow: 'hidden', boxShadow: 'inset 0 1px 2px rgba(0,0,0,.2)' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${info.color}, ${info.color}AA)`, borderRadius: 3, transition: 'width .5s ease', boxShadow: `0 0 8px ${info.color}40` }}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Security Score */}
          <div className="card anim-fade-up d6">
            <div className="card-header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 14 }}>
              <h3 className="card-title"><i className="fa-solid fa-shield-halved"></i> {t('security_score')}</h3>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 100, height: 100, borderRadius: '50%',
                background: `conic-gradient(var(--kw-success) ${stats.verificationRate * 3.6}deg, var(--kw-bg-4) 0deg)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 14px', boxShadow: '0 4px 16px rgba(0,0,0,.3), inset 0 0 0 4px var(--kw-bg-2)'
              }}>
                <div style={{
                  width: 78, height: 78, borderRadius: '50%',
                  background: 'linear-gradient(145deg, var(--kw-bg-2), var(--kw-bg-1))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,.04)'
                }}>
                  <span style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--kw-font-mono)', color: 'var(--kw-success)' }}>{stats.verificationRate}%</span>
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--kw-text-3)', fontWeight: 500 }}>{t('security_rate')}</p>
              <p style={{ fontSize: 11, color: 'var(--kw-text-5)', marginTop: 4 }}>{t('security_avg_time')}: {stats.averageVerifyTime}s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
