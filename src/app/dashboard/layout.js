'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LangProvider, useLang } from '../../lib/LangContext';

const NAV = [
  { path: '/dashboard', icon: 'fa-house', key: 'dash_overview' },
  { path: '/dashboard/verify', icon: 'fa-magnifying-glass-dollar', key: 'dash_verify' },
  { path: '/dashboard/transactions', icon: 'fa-receipt', key: 'dash_transactions' },
  { path: '/dashboard/alerts', icon: 'fa-triangle-exclamation', key: 'dash_alerts', badge: true },
  { path: '/dashboard/reports', icon: 'fa-chart-pie', key: 'dash_reports' },
  { path: '/dashboard/settings', icon: 'fa-gear', key: 'dash_settings' },
];

function DashContent({ children }) {
  const { t, lang, setLang, LANGUAGES } = useLang();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const currentLang = LANGUAGES.find(l => l.code === lang);

  const isActive = (p) => p === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(p);
  const pageTitle = NAV.find(n => isActive(n.path))?.key || 'dash_overview';

  return (
    <div className="dash-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon"><i className="fa-solid fa-shield-halved"></i></div>
          <span className="sidebar-logo-text">KiWARD</span>
        </div>
        <div className="sidebar-section">
          <div className="sidebar-section-label">MENU</div>
          <nav className="sidebar-nav">
            {NAV.map(n => (
              <Link key={n.path} href={n.path}
                className={`sidebar-link ${isActive(n.path) ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}>
                <i className={`fa-solid ${n.icon}`}></i>
                {t(n.key)}
                {n.badge && <span className="sidebar-link-badge">3</span>}
              </Link>
            ))}
          </nav>
        </div>
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">JP</div>
            <div>
              <div className="sidebar-user-name">Bodega Don Pepe</div>
              <div className="sidebar-user-plan">{t('dash_plan_label')}</div>
            </div>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Content */}
      <div className="dash-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <button className="header-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <i className="fa-solid fa-bars"></i>
            </button>
            <h2 className="header-title">{t(pageTitle)}</h2>
          </div>
          <div className="header-right">
            <div className="lang-select">
              <button className="lang-btn" onClick={() => setLangOpen(!langOpen)}>
                <i className="fa-solid fa-globe"></i> {currentLang?.code.toUpperCase()}
              </button>
              {langOpen && (
                <div className="lang-dropdown">
                  {LANGUAGES.map(l => (
                    <button key={l.code} className={`lang-option ${lang === l.code ? 'active' : ''}`}
                      onClick={() => { setLang(l.code); setLangOpen(false) }}>
                      {l.flag} {l.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="header-status">
              <span className="header-status-dot"></span>
              {t('dash_system_active')}
            </div>
            <button className="header-notif-btn" onClick={() => setNotifOpen(!notifOpen)}>
              <i className="fa-solid fa-bell"></i>
              <span className="header-notif-dot"></span>
            </button>
          </div>
        </header>

        {/* Notification Panel */}
        {notifOpen && <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 299 }} onClick={() => setNotifOpen(false)} />
          <div className="notif-panel">
            <div className="notif-panel-header">
              <h3 className="notif-panel-title"><i className="fa-solid fa-bell"></i> {t('dash_notifications')}</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setNotifOpen(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="notif-list">
              <div className="notif-item unread">
                <div className="notif-icon" style={{ background: 'var(--kw-success-bg)', color: 'var(--kw-success)' }}>
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <div>
                  <div className="notif-title">{t('status_verified')}</div>
                  <div className="notif-msg">S/ 45.50 vía Yape — María García</div>
                  <div className="notif-time">Hace 2 min</div>
                </div>
              </div>
              <div className="notif-item unread">
                <div className="notif-icon" style={{ background: 'var(--kw-danger-bg)', color: 'var(--kw-danger)' }}>
                  <i className="fa-solid fa-skull"></i>
                </div>
                <div>
                  <div className="notif-title" style={{ color: 'var(--kw-danger)' }}>{t('stat_fraud_alerts')}</div>
                  <div className="notif-msg">Código de operación duplicado detectado</div>
                  <div className="notif-time">Hace 5 min</div>
                </div>
              </div>
              <div className="notif-item">
                <div className="notif-icon" style={{ background: 'var(--kw-success-bg)', color: 'var(--kw-success)' }}>
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <div>
                  <div className="notif-title">{t('status_verified')}</div>
                  <div className="notif-msg">S/ 12.00 vía Plin — José López</div>
                  <div className="notif-time">Hace 10 min</div>
                </div>
              </div>
            </div>
          </div>
        </>}

        <main className="dash-main">{children}</main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return <LangProvider><DashContent>{children}</DashContent></LangProvider>;
}
