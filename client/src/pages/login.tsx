import { Card, Container, Form, Button, Spinner } from "react-bootstrap";
import { FormEvent, useState } from "react";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import Link from "next/link";
import styled from 'styled-components';
import Head from "next/head";

import CustomInput from "@/components/common/inputStyled";
import { useAuth } from "@/contexts/auth";
import { useTheme } from "@/contexts/theme";
import { dark, light } from "@/styles/theme.styled";

function Login({ className }: { className: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const auth = useAuth();
    const { theme, setTheme } = useTheme();

    const handleSubmit = async (event: FormEvent) => {
        try {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            setIsLoading(true);

            const data = new FormData(form);
            const email = String(data.get('email')).trim();
            const password = String(data.get('password')).trim();

            await auth.signIn(email, password);
            setIsLoading(false);
        } catch (err: any) {
            setIsLoading(false);
            console.log(err);
            if (err.response)
                setError(err.response.data.message);
            else
                setError(err.message);
        }
    }

    return (
        <Container as={'main'} fluid className={`d-flex justify-content-center position-relative align-items-center vh-100 vw-100 ${className}`}>
            <Head>
                <title>Login</title>
            </Head>
            <i className="theme-icon" title="theme swicther">
                {
                    theme.name === 'dark-theme' ? <BsFillSunFill
                        className="text-warning"
                        onClick={() => setTheme(light)}
                    /> : <BsFillMoonFill 
                        className="text-dark-secondary" 
                        onClick={() => setTheme(dark)}
                    />
                }
            </i>
            <Card className="bg-transparent border-0">
                <Card.Body>
                    <h1 className="text-center fw-bold text tipography">Hn Kanban</h1>
                    <h5 className="text-center text tipography">Make Your Login</h5>
                    <Form style={{ width: '100%' }} onSubmit={handleSubmit}>

                        <CustomInput
                            label="E-mail"
                            type="text"
                            id="email"
                            name="email"
                            required
                            className="mt-3"
                            autoComplete="off"
                            $withValueColor={theme.name === 'dark-theme' ? '#eeeeee' : '#000000'}
                            $withoutValueColor={`#6e6e6e`}
                            $animationDuration="1s"
                            $animationDelay="0s"
                        />
                        <CustomInput
                            label="Password"
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="mt-4"
                            autoComplete="off"
                            $withValueColor={theme.name === 'dark-theme' ? '#eeeeee' : '#000000'}
                            $withoutValueColor="#6e6e6e"
                            $animationDuration="1s"
                            $animationDelay="0.1s"
                        />
                        <div className="buttons w-100 d-flex flex-column align-items-center">
                            {error && <p style={{ fontSize: '0.9rem' }} className="text-danger align-self-start mt-3 mb-0">{error}</p>}

                            <Button className='w-100 mt-3 btn-dark-secondary' variant="none"  type="submit">
                                {isLoading ? <Spinner variant="secondary" animation="border" /> : 'Login'}
                            </Button>
                            <Link href="/register" className="mt-3 text-center text-decoration-none">Don't have account? Create your account</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

const StyledLogin = styled(Login)`
    min-height: 100vh;
    min-width: 100vw;
    background-color: ${({theme}) => theme.colors.primary};


    .tipography {
        letter-spacing: -0.75px;
    }

    .card {
        width: 25%;
        min-width: 300px;
    }


    .theme-icon {
        position: absolute;
        left: calc(100vw - 45px);
        top: 10px;
        font-size: 1.2rem;
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
        .card { 
            width: 100%;
        }
    }

`;


export default StyledLogin;