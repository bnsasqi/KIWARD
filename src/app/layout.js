import './globals.css';

export const metadata = {
  title: 'KiWARD — Protección Antifraude para Pagos Digitales | Perú',
  description: 'KiWARD protege a comerciantes peruanos contra fraudes con capturas falsas y apps clonadas. Verificación en tiempo real de Yape, Plin y BiPay.',
  keywords: 'antifraude, pagos digitales, Yape, Plin, BiPay, Perú, bodega, verificación, seguridad',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body>{children}</body>
    </html>
  );
}
