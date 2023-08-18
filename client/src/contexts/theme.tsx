import { createContext, useContext, Dispatch, SetStateAction, ReactNode, useState, useEffect } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { dark, light } from '@/styles/theme.styled';
import { GlobalStyles } from '@/styles/global';
import { parseCookies, setCookie } from 'nookies';

interface IThemeContext {
    theme: any;
    setTheme: Dispatch<SetStateAction<any>>;
    sidebarIsOpen: boolean;
    setSidebarIsOpen: Dispatch<SetStateAction<boolean>>;
}




const ThemeContext = createContext({} as IThemeContext);


export function ThemeContextProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<any>(light);
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);


    useEffect(() => {
        const { 'kanban-theme': theme } = parseCookies();
        if (theme) {
            const parsedTheme = JSON.parse(theme);
            setTheme(parsedTheme);
        }
    }, []);


    const handleSetTheme = (theme: any) => {
        setCookie({}, 'kanban-theme', JSON.stringify(theme), {
            path: '/'
        });
        setTheme(theme);
    }

    return (
        <ThemeContext.Provider
            value={{
                theme: theme,
                setTheme: handleSetTheme,
                setSidebarIsOpen,
                sidebarIsOpen,
            }}
        >
            <SCThemeProvider theme={theme}>
                <GlobalStyles />
                {children}
            </SCThemeProvider>
        </ThemeContext.Provider>
    );

}


export function useTheme() {
    const context = useContext(ThemeContext);
    return context;
}

