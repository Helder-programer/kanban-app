import React, { createContext, useContext, useState, useEffect } from "react";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { IUser } from "../types/IUser";
import { authService } from "@/services/auth";
import Router from "next/router";

interface IAuthContext {
    signIn: (email: string, password: string) => Promise<void>;
    logout: () => void;
    user: IUser | null;
    isAuthenticated: boolean;
}



export const AuthContext = createContext({} as IAuthContext);


export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);
    const isAuthenticated = !!user;


    useEffect(() => {
        const { 'kanban-token': token } = parseCookies();

        if (token) {
            authService.recoverUserInformations().then(user => {
                setUser(user);
            });
        }
    }, []);


    const signIn = async (email: string, password: string) => {
        const { user, token } = await authService.signIn({ email, password });

        setCookie(undefined, 'kanban-token', token, {
            maxAge: 60 * 60 * 1 //1 hour
        });

        setUser(user);
        Router.push('/');
    }

    const logout = () => {
        setUser(null);
        destroyCookie(undefined, 'kanban-token');
        Router.push('/login');
    }

    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated, user, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}
