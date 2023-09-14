import type { AppProps } from 'next/app';

import { AuthProvider } from '@/contexts/auth';
import { ThemeContextProvider } from '@/contexts/theme';
import { BoardsContextProvider } from '@/contexts/boards';
import { StyleSheetManager } from 'styled-components';
import '../styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <ThemeContextProvider>
                <BoardsContextProvider>
                    <StyleSheetManager shouldForwardProp={(prop: string) => !prop.startsWith('$')}>

                        <Component {...pageProps} />

                    </StyleSheetManager>
                </BoardsContextProvider>
            </ThemeContextProvider>
        </AuthProvider>
    );
}
