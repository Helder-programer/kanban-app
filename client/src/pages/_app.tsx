import { AuthProvider } from '@/contexts/auth';
import type { AppProps } from 'next/app';
import '../sass/global.scss';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    )
}
