import './globals.css';
import AuthProvider from '../contexts/AuthContext'; // Corrigido para exportação padrão

export const metadata = {
  title: 'OCR Platform',
  description: 'Platform for document OCR and management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}