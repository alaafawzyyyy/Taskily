import './globals.css';
import Providers from './storeProvider';
type childrenProps = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: childrenProps) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
