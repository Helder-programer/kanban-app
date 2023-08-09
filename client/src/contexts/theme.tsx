import { createContext, useContext, Dispatch, SetStateAction, ReactNode, useState } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { dark, light } from '@/styles/theme.styled';
import { GlobalStyles } from '@/styles/global';

interface IThemeContext {
    selectedTheme: string;
    setSelectedTheme: Dispatch<SetStateAction<any>>;
}




const ThemeContext = createContext({} as IThemeContext);


export function ThemeContextProvider({ children }: { children: ReactNode }) {
    const [selectedTheme, setSelectedTheme] = useState<any>(dark);

    return (
        <ThemeContext.Provider
            value={{
                selectedTheme: selectedTheme,
                setSelectedTheme: selectedTheme
            }}
        >
            <SCThemeProvider theme={selectedTheme}>
                <GlobalStyles />
                {children}
            </SCThemeProvider>
        </ThemeContext.Provider>
    );

}

