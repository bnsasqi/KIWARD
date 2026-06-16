# 🛡️ KiWARD — Protección Antifraude para Pagos Digitales

<p align="center">
  <strong>Protege tu bodega, quiosco o negocio contra pagos falsos</strong><br>
  Verificación en tiempo real para Yape, Plin y BiPay en Perú
</p>

---

## 🎯 ¿Qué es KiWARD?

KiWARD es una plataforma de seguridad antifraude diseñada para comerciantes minoristas en Perú (bodegas, quioscos, tiendas de barrio) que aceptan pagos digitales mediante **Yape**, **Plin** y **BiPay**.

El problema: los estafadores muestran capturas de pantalla falsas o usan APKs fraudulentas para simular pagos que nunca llegan. KiWARD verifica en segundos si un pago es real, protegiendo al comerciante.

## ✨ Características Principales

- **⚡ Verificación Instantánea** — Verifica pagos en menos de 3 segundos
- **🔍 Detección de Fraude** — Detecta capturas falsas, códigos duplicados, montos alterados y apps fraudulentas
- **🔔 Notificaciones en Tiempo Real** — Alertas en PC y móvil cuando un pago llega o se detecta fraude
- **📊 Reportes Detallados** — Visualiza ventas diarias, semanales y mensuales
- **📱 Multi-Dispositivo** — Funciona desde celular, tablet o computadora
- **🏪 Hecho para Bodegas** — Interfaz simple, sin necesidad de ser experto en tecnología
- **🌐 Multi-idioma** — Español, English, Quechua

## 🏦 Integración de Pagos

### ✅ Disponible
- **Yape** (BCP)
- **Plin** (Interbank, BBVA, Scotiabank)
- **BiPay**

### 🔜 Próximamente
- BCP (transferencias directas)
- Interbank
- BBVA
- Scotiabank

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Frontend** | React 19, CSS Custom Properties |
| **Tipografía** | Inter, JetBrains Mono (Google Fonts) |
| **Iconos** | Font Awesome 6 Free |
| **Estilos** | CSS modular (variables, components, animations, responsive) |
| **i18n** | Sistema propio (ES/EN/QU) |

## 📁 Estructura del Proyecto

```
KIWARD/
├── public/
│   ├── images/          # Hero SVG, assets
│   └── logos/           # Logos Yape, Plin, BiPay
├── src/
│   ├── app/
│   │   ├── page.js          # Landing page
│   │   ├── login/           # Autenticación
│   │   ├── register/        # Registro multi-paso
│   │   └── dashboard/
│   │       ├── page.js      # Panel general
│   │       ├── verify/      # Verificación de pagos
│   │       ├── transactions/# Historial
│   │       ├── alerts/      # Centro de alertas
│   │       ├── reports/     # Reportes y analytics
│   │       └── settings/    # Configuración
│   ├── lib/
│   │   ├── constants.js     # Planes, métodos de pago, estados
│   │   ├── i18n.js          # Traducciones ES/EN/QU
│   │   ├── LangContext.js   # Context de idioma
│   │   ├── mockData.js      # Datos de demo
│   │   └── utils.js         # Utilidades
│   ├── services/
│   │   └── verification.js  # Motor de verificación
│   └── styles/
│       ├── variables.css    # Design tokens
│       ├── landing.css      # Estilos de landing
│       ├── dashboard.css    # Layout del panel
│       ├── components.css   # UI components
│       ├── animations.css   # Animaciones
│       └── responsive.css   # Media queries
└── package.json
```

## 🚀 Instalación y Desarrollo

```bash
# Clonar repositorio
git clone https://github.com/TU_USUARIO/KIWARD.git
cd KIWARD

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build
```

El servidor estará disponible en `http://localhost:3000`

## 📋 Planes y Precios

| Plan | Precio | Verificaciones | Soporte |
|---|---|---|---|
| **Básico** | Gratis | 30/día | Comunidad |
| **Comerciante** | S/19.90/mes | Ilimitadas | Chat en vivo |
| **Empresarial** | S/49.90/mes | Ilimitadas + API | Prioritario 24/7 |

## 🇵🇪 Hecho en Perú

KiWARD nace de la necesidad real de proteger a los comerciantes peruanos — desde las bodegas de Lima hasta los quioscos de Cusco — contra el fraude digital que crece cada día.

## 📄 Licencia

Este proyecto es de uso privado. Todos los derechos reservados © 2026 KiWARD.
