'use client';

import { useState, useEffect } from 'react';
import { PAYMENT_METHODS, TRANSACTION_STATUS } from '../../../lib/constants';
import { formatCurrency, formatDateTime, maskPhone } from '../../../lib/utils';
import { generateMockTransactions } from '../../../lib/mockData';
import { useLang } from '../../../lib/LangContext';

export default function TransactionsPage() {
  const { t } = useLang();
  const [transactions, setTransactions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState({ status: '', method: '', search: '' });

  useEffect(() => {
    const timer = setTimeout(() => { setTransactions(generateMockTransactions(30)); setLoaded(true) }, 250);
    return () => clearTimeout(timer);
  }, []);

  const filtered = transactions.filter(tx => {
    if (filter.status && tx.status !== filter.status) return false;
    if (filter.method && tx.paymentMethod !== filter.method) return false;
    if (filter.search && !tx.operationCode.includes(filter.search) && !tx.senderName.toLowerCase().includes(filter.search.toLowerCase())) return false;
    return true;
  });

  if (!loaded) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><div className="spinner spinner-lg"></div></div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title"><i className="fa-solid fa-receipt"></i> {t('tx_title')}</h1>
          <p className="page-subtitle">{t('tx_subtitle')}</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-ghost"><i className="fa-solid fa-file-export"></i> {t('tx_export')}</button>
        </div>
      </div>
      <div className="filter-bar">
        <div className="input-icon-wrap">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input className="input" placeholder={t('tx_search')} value={filter.search}
            onChange={e => setFilter({ ...filter, search: e.target.value })} style={{ maxWidth: 260 }} />
        </div>
        <select className="select" value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })} style={{ maxWidth: 200 }}>
          <option value="">{t('tx_all_status')}</option>
          {Object.values(TRANSACTION_STATUS).map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
        <select className="select" value={filter.method} onChange={e => setFilter({ ...filter, method: e.target.value })} style={{ maxWidth: 200 }}>
          <option value="">{t('tx_all_methods')}</option>
          {['YAPE', 'PLIN', 'BIPAY'].map(m => <option key={m} value={m}>{PAYMENT_METHODS[m].name}</option>)}
        </select>
        <span style={{ fontSize: 12, color: 'var(--kw-text-4)' }}>{filtered.length} {filtered.length === 1 ? t('tx_result') : t('tx_results')}</span>
      </div>
      <div className="table-wrap">
        <table className="table">
          <thead><tr>
            <th>{t('tx_col_status')}</th><th>{t('tx_col_code')}</th><th>{t('tx_col_client')}</th>
            <th>{t('tx_col_method')}</th><th>{t('tx_col_amount')}</th><th>{t('tx_col_risk')}</th><th>{t('tx_col_date')}</th>
          </tr></thead>
          <tbody>
            {filtered.map(tx => {
              const st = TRANSACTION_STATUS[tx.status] || TRANSACTION_STATUS.PENDING;
              const mt = PAYMENT_METHODS[tx.paymentMethod];
              const badgeCls = st.color === 'danger' ? 'badge-fraud' : st.color === 'warning' ? 'badge-pending' : 'badge-verified';
              return (
                <tr key={tx.id}>
                  <td><span className={`badge ${badgeCls}`}><i className={`fa-solid ${st.color === 'danger' ? 'fa-skull' : st.color === 'warning' ? 'fa-clock' : 'fa-circle-check'}`}></i> {st.label}</span></td>
                  <td><span style={{ fontFamily: 'var(--kw-font-mono)', fontSize: 12 }}>{tx.operationCode}</span></td>
                  <td><div style={{ fontWeight: 500, fontSize: 13 }}>{tx.senderName}</div><div style={{ fontSize: 11, color: 'var(--kw-text-5)' }}>{maskPhone(tx.senderPhone)}</div></td>
                  <td><span className={`method-tag ${tx.paymentMethod.toLowerCase()}`}>{mt?.name}</span></td>
                  <td><span style={{ fontFamily: 'var(--kw-font-mono)', fontWeight: 600 }}>{formatCurrency(tx.amount)}</span></td>
                  <td><span style={{ fontFamily: 'var(--kw-font-mono)', fontWeight: 600, fontSize: 12, color: tx.fraudScore <= 20 ? 'var(--kw-success)' : tx.fraudScore <= 50 ? 'var(--kw-warning)' : 'var(--kw-danger)' }}>{tx.fraudScore}</span></td>
                  <td><span style={{ fontSize: 11, color: 'var(--kw-text-4)' }}>{formatDateTime(tx.createdAt)}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="empty"><i className="fa-solid fa-magnifying-glass"></i><div className="empty-title">{t('tx_no_results')}</div><div className="empty-desc">{t('tx_change_filters')}</div></div>
        )}
      </div>
    </div>
  );
}
