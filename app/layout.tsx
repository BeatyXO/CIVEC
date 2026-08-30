import './styles.css';
import { WalletProvider } from '../src/lib/wallet';

export const metadata = { title: 'CIVEC — civic evidence, settled by consensus', description: 'A public noticeboard for infrastructure proposals.' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body><WalletProvider>{children}</WalletProvider></body></html>; }
