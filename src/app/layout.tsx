import './globals.css';
import Providers from './storeProvider';
import { Toaster } from 'react-hot-toast';

type childrenProps = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: childrenProps) {
  return (
    <html>
      <body>
        <Providers>
          <Toaster position="bottom-center" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
