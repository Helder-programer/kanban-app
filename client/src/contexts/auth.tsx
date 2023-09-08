import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import Router from "next/router";

import { IUser } from "../types/IUser";
import { light } from "@/styles/theme.styled";
import { authService } from "@/services/auth";

interface IAuthContext {
    signIn: (email: string, password: string) => Promise<void>;
    logout: () => void;
    user: IUser | null;
    setUser: Dispatch<SetStateAction<IUser | null>>;
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
            }).catch(err => {
                console.log('Invalid Token (In Auth Context)');
            });
        }
    }, []);


    const signIn = async (email: string, password: string) => {
        const { user, token } = await authService.signIn({ email, password });

        setCookie({}, 'kanban-token', token, {
            maxAge: 60 * 60 * 1, //1 hour
            path: '/'
        });

        setCookie({}, 'kanban-theme', JSON.stringify(light), {
            path: '/'
        });

        setUser(user);
        Router.push('/');
    }

    const logout = () => {
        setUser(null);
        destroyCookie({}, 'kanban-token', {
            path: '/'
        });
        Router.reload();
    }

    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated, user, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}


export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}
