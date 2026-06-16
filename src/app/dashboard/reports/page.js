'use client';

import { useState, useEffect } from 'react';
import { PAYMENT_METHODS } from '../../../lib/constants';
import { formatCurrency, randomInRange } from '../../../lib/utils';
import { useLang } from '../../../lib/LangContext';

function genData(period) {
  const mul = period === 'today' ? 1 : period === 'week' ? 7 : 30;
  const days = period === 'today' ? ['Hoy'] : period === 'week' ? ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] : ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
  return {
    totalSales: randomInRange(500, 2000) * mul, totalTx: randomInRange(10, 50) * mul, avgTicket: randomInRange(8, 45),
    fraudsBlocked: randomInRange(1, 5), fraudSaved: randomInRange(100, 800), verifyRate: randomInRange(94, 99),
    avgTime: randomInRange(2, 6), salesGrowth: randomInRange(5, 25), verifiedCount: randomInRange(8, 40) * mul,
    pendingReview: randomInRange(0, 3),
    daily: days.map(l => ({ label: l, amount: randomInRange(200, 1200) })),
    methods: [
      { m: 'YAPE', amount: randomInRange(2000, 8000), pct: randomInRange(45, 60) },
      { m: 'PLIN', amount: randomInRange(1000, 4000), pct: randomInRange(25, 35) },
      { m: 'BIPAY', amount: randomInRange(500, 2000), pct: randomInRange(10, 20) },
    ],
    peaks: [
      { time: '12:00', count: randomInRange(15, 30), pct: 90 },
      { time: '18:00', count: randomInRange(12, 25), pct: 75 },
      { time: '08:00', count: randomInRange(8, 18), pct: 55 },
      { time: '15:00', count: randomInRange(6, 15), pct: 45 },
      { time: '20:00', count: randomInRange(4, 12), pct: 35 },
    ],
  };
}

export default function ReportsPage() {
  const { t } = useLang();
  const [period, setPeriod] = useState('week');
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => { setData(genData(period)); setLoaded(true) }, 250);
    return () => clearTimeout(timer);
  }, [period]);

  if (!loaded) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><div className="spinner spinner-lg"></div></div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title"><i className="fa-solid fa-chart-pie"></i> {t('reports_title')}</h1>
          <p className="page-subtitle">{t('reports_subtitle')}</p>
        </div>
        <div className="page-actions">
          <select className="select" value={period} onChange={e => { setLoaded(false); setPeriod(e.target.value) }} style={{ maxWidth: 180 }}>
            <option value="today">{t('reports_today')}</option>
            <option value="week">{t('reports_week')}</option>
            <option value="month">{t('reports_month')}</option>
          </select>
          <button className="btn btn-ghost"><i className="fa-solid fa-download"></i> {t('reports_download')}</button>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: 20 }}>
        {[
          { l: t('reports_total_sales'), v: formatCurrency(data.totalSales), sub: `↑ ${data.salesGrowth}% ${t('reports_vs_period')}`, cls: 'stat-up' },
          { l: t('reports_total_tx'), v: data.totalTx, sub: `${t('reports_avg_ticket')}: ${formatCurrency(data.avgTicket)}`, cls: 'stat-up' },
          { l: t('reports_fraud_blocked'), v: data.fraudsBlocked, sub: `${t('reports_saved')} ${formatCurrency(data.fraudSaved)}`, cls: 'stat-up', danger: true },
          { l: t('reports_verify_rate'), v: `${data.verifyRate}%`, sub: `${t('reports_avg_time')}: ${data.avgTime}s`, cls: 'stat-up' },
        ].map((c, i) => (
          <div key={i} className={`card stat-card anim-fade-up d${i + 1}`}>
            <div className="stat-label">{c.l}</div>
            <div className="stat-value" style={c.danger ? { color: 'var(--kw-danger)' } : {}}>{c.v}</div>
            <div className={`stat-change ${c.cls}`}>{c.sub}</div>
          </div>
        ))}
      </div>

      <div className="dash-grid">
        {/* Bar chart */}
        <div className="card anim-fade-up d3">
          <div className="card-header"><h3 className="card-title"><i className="fa-solid fa-chart-column"></i> {t('reports_daily_sales')}</h3></div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 180, paddingTop: 16 }}>
            {data.daily.map((d, i) => {
              const max = Math.max(...data.daily.map(x => x.amount));
              const h = (d.amount / max) * 100;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 9, color: 'var(--kw-text-5)', fontFamily: 'var(--kw-font-mono)' }}>{formatCurrency(d.amount).replace('S/ ', '')}</span>
                  <div style={{ width: '100%', height: `${h}%`, minHeight: 6, background: 'linear-gradient(180deg, var(--kw-red), var(--kw-red-dark))', borderRadius: '4px 4px 0 0', transition: 'height .5s ease' }}></div>
                  <span style={{ fontSize: 10, color: 'var(--kw-text-5)' }}>{d.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Method distribution */}
        <div className="card anim-fade-up d4">
          <div className="card-header"><h3 className="card-title"><i className="fa-solid fa-wallet"></i> {t('reports_method_dist')}</h3></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {data.methods.map(item => {
              const mt = PAYMENT_METHODS[item.m];
              return (
                <div key={item.m}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <i className="fa-solid fa-mobile-screen-button" style={{ color: mt?.color }}></i>
                      <span style={{ fontWeight: 600, color: mt?.color, fontSize: 13 }}>{mt?.name}</span>
                    </span>
                    <span style={{ fontFamily: 'var(--kw-font-mono)', color: 'var(--kw-text-3)', fontSize: 12 }}>{formatCurrency(item.amount)} ({item.pct}%)</span>
                  </div>
                  <div style={{ width: '100%', height: 8, background: 'var(--kw-bg-4)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${item.pct}%`, height: '100%', background: mt?.color, borderRadius: 4, transition: 'width .8s ease' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Peak hours */}
        <div className="card anim-fade-up d5">
          <div className="card-header"><h3 className="card-title"><i className="fa-regular fa-clock"></i> {t('reports_peak_hours')}</h3></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {data.peaks.map((h, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'var(--kw-font-mono)', fontSize: 12, color: 'var(--kw-text-4)', minWidth: 44 }}>{h.time}</span>
                <div style={{ flex: 1, height: 6, background: 'var(--kw-bg-4)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${h.pct}%`, height: '100%', background: i === 0 ? 'var(--kw-red)' : i === 1 ? 'var(--kw-red-light)' : 'var(--kw-silver-dark)', borderRadius: 3 }}></div>
                </div>
                <span style={{ fontSize: 11, color: 'var(--kw-text-5)', minWidth: 55, textAlign: 'right', fontFamily: 'var(--kw-font-mono)' }}>{h.count} pagos</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security summary */}
        <div className="card anim-fade-up d6">
          <div className="card-header"><h3 className="card-title"><i className="fa-solid fa-shield-halved"></i> {t('reports_security')}</h3></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: 'var(--kw-text-3)' }}>{t('reports_verified_payments')}</span>
              <span className="badge badge-verified"><i className="fa-solid fa-circle-check"></i> {data.verifiedCount}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: 'var(--kw-text-3)' }}>{t('reports_blocked')}</span>
              <span className="badge badge-fraud"><i className="fa-solid fa-skull"></i> {data.fraudsBlocked}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: 'var(--kw-text-3)' }}>{t('reports_pending')}</span>
              <span className="badge badge-pending"><i className="fa-solid fa-clock"></i> {data.pendingReview}</span>
            </div>
            <div style={{ padding: 14, background: 'var(--kw-success-bg)', borderRadius: 'var(--kw-r-md)', textAlign: 'center', marginTop: 4 }}>
              <p style={{ fontSize: 13, color: 'var(--kw-success)', fontWeight: 600 }}>
                <i className="fa-solid fa-coins" style={{ marginRight: 6 }}></i>{t('reports_protected')}: {formatCurrency(data.fraudSaved)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
