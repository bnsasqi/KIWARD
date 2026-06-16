'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PLANS } from '../lib/constants';
import { LangProvider, useLang } from '../lib/LangContext';

function LandingContent() {
  const { t, lang, setLang, LANGUAGES } = useLang();
  const [langOpen, setLangOpen] = useState(false);
  const currentLang = LANGUAGES.find(l => l.code === lang);

  return (
    <div>
      {/* Nav */}
      <nav className="landing-nav">
        <Link href="/" className="landing-nav-brand">
          <div className="landing-nav-logo"><i className="fa-solid fa-shield-halved"></i></div>
          <span className="landing-nav-name">KiWARD</span>
        </Link>
        <div className="landing-nav-links">
          <a href="#features" className="landing-nav-link">{t('nav_features')}</a>
          <a href="#how-it-works" className="landing-nav-link">{t('nav_how')}</a>
          <a href="#pricing" className="landing-nav-link">{t('nav_pricing')}</a>
        </div>
        <div className="landing-nav-actions">
          <div className="lang-select">
            <button className="lang-btn" onClick={() => setLangOpen(!langOpen)}>
              <i className="fa-solid fa-globe"></i> {currentLang?.code.toUpperCase()}
              <i className="fa-solid fa-chevron-down" style={{ fontSize: 9 }}></i>
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
          <Link href="/login" className="btn btn-ghost">{t('nav_login')}</Link>
          <Link href="/register" className="btn btn-primary">{t('nav_register_free')}</Link>
        </div>
        <button className="landing-nav-mobile"><i className="fa-solid fa-bars"></i></button>
      </nav>

      {/* Hero */}
      <section className="hero" id="hero">
        <div className="hero-bg"></div>
        <div className="hero-grid"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            {t('hero_badge')}
          </div>
          <h1 className="hero-title">
            {t('hero_title_1')}<br /><em>{t('hero_title_2')}</em>
          </h1>
          <p className="hero-subtitle">{t('hero_subtitle')}</p>
          <div className="hero-actions">
            <Link href="/register" className="btn btn-primary btn-lg">
              <i className="fa-solid fa-shield-halved"></i> {t('hero_cta')}
            </Link>
            <Link href="/dashboard" className="btn btn-ghost btn-lg">
              {t('hero_demo')} <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-value">{t('hero_stat_1_val')}</div>
              <div className="hero-stat-label">{t('hero_stat_1_label')}</div>
            </div>
            <div>
              <div className="hero-stat-value">{t('hero_stat_2_val')}</div>
              <div className="hero-stat-label">{t('hero_stat_2_label')}</div>
            </div>
            <div>
              <div className="hero-stat-value">{t('hero_stat_3_val')}</div>
              <div className="hero-stat-label">{t('hero_stat_3_label')}</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <img src="/images/hero-shield.svg" alt="KiWARD Shield Protection" width={440} height={440} />
        </div>
      </section>

      {/* Compatible with real logos */}
      <div className="compat-bar">
        <div className="compat-label">{t('compatible_with')}</div>
        <div className="compat-items">
          <div className="compat-item">
            <img src="/logos/yape.png" alt="Yape" width={32} height={32} style={{ borderRadius: 6 }} />
            <span className="compat-item-name" style={{ color: 'var(--kw-yape)' }}>Yape</span>
          </div>
          <div className="compat-item">
            <img src="/logos/plin.png" alt="Plin" width={32} height={32} style={{ borderRadius: 6 }} />
            <span className="compat-item-name" style={{ color: 'var(--kw-plin)' }}>Plin</span>
          </div>
          <div className="compat-item">
            <img src="/logos/BiPay.png" alt="BiPay" width={32} height={32} style={{ borderRadius: 6 }} />
            <span className="compat-item-name" style={{ color: 'var(--kw-bipay)' }}>BiPay</span>
          </div>
        </div>
      </div>

      {/* Trust Stats */}
      <div className="trust-section">
        <div className="trust-stats">
          <div className="trust-stat">
            <div className="trust-stat-value">2,500+</div>
            <div className="trust-stat-label">Comerciantes protegidos</div>
          </div>
          <div className="trust-stat">
            <div className="trust-stat-value">S/ 1.2M</div>
            <div className="trust-stat-label">Fraudes prevenidos</div>
          </div>
          <div className="trust-stat">
            <div className="trust-stat-value">150K+</div>
            <div className="trust-stat-label">Verificaciones realizadas</div>
          </div>
          <div className="trust-stat">
            <div className="trust-stat-value">24</div>
            <div className="trust-stat-label">Regiones del Perú</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="section" id="features">
        <div className="section-header">
          <div className="section-label"><i className="fa-solid fa-star"></i> {t('features_label')}</div>
          <h2 className="section-title">{t('features_title')}</h2>
          <p className="section-subtitle">{t('features_subtitle')}</p>
        </div>
        <div className="features-grid">
          {[
            { icon: 'fa-magnifying-glass-dollar', title: t('feature_1_title'), desc: t('feature_1_desc') },
            { icon: 'fa-user-shield', title: t('feature_2_title'), desc: t('feature_2_desc') },
            { icon: 'fa-bell', title: t('feature_3_title'), desc: t('feature_3_desc') },
            { icon: 'fa-chart-line', title: t('feature_4_title'), desc: t('feature_4_desc') },
            { icon: 'fa-display', title: t('feature_5_title'), desc: t('feature_5_desc') },
            { icon: 'fa-store', title: t('feature_6_title'), desc: t('feature_6_desc') },
          ].map((f, i) => (
            <div key={i} className="card card-hover feature-card">
              <div className="feature-icon"><i className={`fa-solid ${f.icon}`}></i></div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="section section-alt" id="how-it-works">
        <div className="section-header">
          <div className="section-label"><i className="fa-solid fa-circle-play"></i> {t('how_label')}</div>
          <h2 className="section-title">{t('how_title')}</h2>
          <p className="section-subtitle">{t('how_subtitle')}</p>
        </div>
        <div className="steps-grid">
          {[
            { n: '1', title: t('step_1_title'), desc: t('step_1_desc') },
            { n: '2', title: t('step_2_title'), desc: t('step_2_desc') },
            { n: '3', title: t('step_3_title'), desc: t('step_3_desc') },
          ].map((s, i) => (
            <div key={i} className="step">
              <div className="step-number">{s.n}</div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
        {/* Visual demo: verification flow */}
        <div className="demo-flow">
          <div className="demo-card">
            <div className="demo-card-header">
              <i className="fa-solid fa-mobile-screen-button" style={{ color: 'var(--kw-yape)' }}></i>
              <span>Cliente paga con Yape</span>
            </div>
            <div className="demo-card-body">
              <div style={{ fontSize: 24, fontWeight: 700, fontFamily: 'var(--kw-font-mono)' }}>S/ 45.00</div>
              <div style={{ fontSize: 11, color: 'var(--kw-text-4)' }}>Op: 142-8934521</div>
            </div>
          </div>
          <div className="demo-arrow"><i className="fa-solid fa-arrow-right"></i></div>
          <div className="demo-card demo-card-active">
            <div className="demo-card-header">
              <i className="fa-solid fa-shield-halved" style={{ color: 'var(--kw-red)' }}></i>
              <span>KiWARD verifica</span>
            </div>
            <div className="demo-card-body">
              <div className="spinner spinner-sm" style={{ margin: '0 auto' }}></div>
              <div style={{ fontSize: 12, color: 'var(--kw-text-3)' }}>Analizando...</div>
            </div>
          </div>
          <div className="demo-arrow"><i className="fa-solid fa-arrow-right"></i></div>
          <div className="demo-card demo-card-success">
            <div className="demo-card-header">
              <i className="fa-solid fa-circle-check" style={{ color: 'var(--kw-success)' }}></i>
              <span>Pago confirmado</span>
            </div>
            <div className="demo-card-body">
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--kw-success)' }}>Verificado</div>
              <div style={{ fontSize: 11, color: 'var(--kw-text-4)' }}>Tiempo: 2.1s</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section" id="pricing">
        <div className="section-header">
          <div className="section-label"><i className="fa-solid fa-tags"></i> {t('pricing_label')}</div>
          <h2 className="section-title">{t('pricing_title')}</h2>
          <p className="section-subtitle">{t('pricing_subtitle')}</p>
        </div>
        <div className="pricing-grid">
          {Object.values(PLANS).map((plan, i) => (
            <div key={plan.id} className={`card pricing-card ${i === 1 ? 'featured' : ''}`}>
              {i === 1 && <div className="pricing-badge">{t('most_popular')}</div>}
              <h3 className="pricing-name">{plan.name}</h3>
              <p className="pricing-desc">{plan.description}</p>
              <div className="pricing-price">
                {plan.price === 0 ? 'Gratis' : `S/${plan.price.toFixed(2)}`}
              </div>
              <div className="pricing-period">
                {plan.price > 0 ? t('per_month') : t('free_forever')}
              </div>
              <ul className="pricing-features">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="pricing-feature">
                    <i className="fa-solid fa-check"></i> {f}
                  </li>
                ))}
              </ul>
              <Link href="/register"
                className={`btn ${i === 1 ? 'btn-primary' : 'btn-outline'} btn-lg`}
                style={{ width: '100%' }}>
                {plan.price === 0 ? t('start_free') : t('choose_plan')}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2 className="cta-title">{t('cta_title')}</h2>
        <p className="cta-subtitle">{t('cta_subtitle')}</p>
        <Link href="/register" className="btn btn-primary btn-lg">
          <i className="fa-solid fa-shield-halved"></i> {t('cta_btn')}
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="landing-nav-logo" style={{ width: 30, height: 30, fontSize: 12 }}>
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <span className="landing-nav-name" style={{ fontSize: 16 }}>KiWARD</span>
            </div>
            <p className="footer-brand-desc">{t('footer_desc')}</p>
          </div>
          <div>
            <h4 className="footer-col-title">{t('footer_product')}</h4>
            <ul className="footer-links">
              <li><a href="#features" className="footer-link">{t('nav_features')}</a></li>
              <li><a href="#pricing" className="footer-link">{t('nav_pricing')}</a></li>
              <li><a href="#how-it-works" className="footer-link">{t('nav_how')}</a></li>
              <li><Link href="/dashboard" className="footer-link">Demo</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">{t('footer_support')}</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">{t('footer_help')}</a></li>
              <li><a href="#" className="footer-link">{t('footer_docs')}</a></li>
              <li><a href="#" className="footer-link">{t('footer_contact')}</a></li>
              <li><a href="#" className="footer-link">{t('footer_status')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">{t('footer_legal')}</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">{t('footer_terms')}</a></li>
              <li><a href="#" className="footer-link">{t('footer_privacy')}</a></li>
              <li><a href="#" className="footer-link">{t('footer_cookies')}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} KiWARD. {t('footer_rights')}</span>
          <span>{t('footer_made')} 🇵🇪</span>
        </div>
      </footer>
    </div>
  );
}

export default function LandingPage() {
  return (
    <LangProvider>
      <LandingContent />
    </LangProvider>
  );
}
