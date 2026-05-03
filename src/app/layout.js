import './globals.css';
import Providers from '@/components/Providers';

export const metadata = {
  title: 'DocPol — Documentación Policial Inteligente',
  description: 'Sistema web para automatizar la redacción de documentos policiales PNP. Genera actas, oficios, informes y más con formato oficial en minutos.',
  keywords: 'documentación policial, PNP, actas policiales, documentos PNP, sistema documental policial',
  authors: [{ name: 'DocPol' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
