import { AuthProvider } from '@/contexts/auth';
import type { AppProps } from 'next/app';
import '../sass/global.scss';
import { BoardsContextProvider } from '@/contexts/boards';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <BoardsContextProvider>
                <Component {...pageProps} />
            </BoardsContextProvider>
        </AuthProvider>
    )
}
