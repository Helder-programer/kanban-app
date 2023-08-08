import { AuthProvider } from '@/contexts/auth';
import type { AppProps } from 'next/app';
import '../styles/global.scss';
import { BoardsContextProvider } from '@/contexts/boards';
import { ThemeProvider, ThemeContext } from 'styled-components';
import { light } from '@/styles/theme.styled';
import { GlobalStyles } from '@/styles/global';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <ThemeProvider theme={light}>
                <BoardsContextProvider>
                    <Component {...pageProps} />
                    <GlobalStyles/>
                </BoardsContextProvider>
            </ThemeProvider>
        </AuthProvider>
    )
}
