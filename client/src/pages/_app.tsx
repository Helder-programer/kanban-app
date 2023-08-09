import type { AppProps } from 'next/app';

import { AuthProvider } from '@/contexts/auth';
import { ThemeContextProvider } from '@/contexts/theme';
import { BoardsContextProvider } from '@/contexts/boards';
import '../styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <ThemeContextProvider>
                <BoardsContextProvider>
                    <Component {...pageProps} />
                </BoardsContextProvider>
            </ThemeContextProvider>
        </AuthProvider>
    );
}
