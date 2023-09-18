import { Card, Container, Form, Button, Spinner } from "react-bootstrap";
import { FormEvent, useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import Router from "next/router";
import Link from "next/link";
import styled from 'styled-components';
import Head from "next/head";

import CustomInput from "@/components/common/inputStyled";
import { authService } from "@/services/auth";
import { useTheme } from "@/contexts/theme";
import { light, dark } from "@/styles/theme.styled";


function Register({ className }: { className: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { theme, setTheme } = useTheme();

    const handleSubmit = async (event: FormEvent) => {
        try {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            setIsLoading(true);



            const data = new FormData(form);
            const name = String(data.get('name')).trim();
            const email = String(data.get('email')).trim();
            const password = String(data.get('password')).trim();
            const passwordConfirmation = String(data.get('passwordConfirmation')).trim();


            if (password !== passwordConfirmation) {
                setIsLoading(false);
                return setError('Password not matched');
            }


            await authService.register({ name, email, password });
            setIsLoading(false);
            Router.push('/login');
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
        <Container as='main' fluid className={className}>
            <Head>
                <title>Register</title>
            </Head>
            <i className="theme-icon" title="theme switcher">
                {
                    theme.name === 'dark-theme' ? 
                    <BsFillSunFill
                        className="text-warning"
                        onClick={() => setTheme(light)}
                    /> : 
                    <BsFillMoonFill
                        className="text-dark-secondary"
                        onClick={() => setTheme(dark)}
                    />
                }
            </i>
            <Card className="bg-transparent border-0">
                <Card.Body>
                    <h1 className="text-center text logo">Hn Kanban</h1>
                    <h5 className="text-center text tipography">Create Your Account</h5>
                    <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
                        <CustomInput
                            label="Name*"
                            type="text"
                            id="name"
                            name="name"
                            maxLength={45}
                            $withValueColor={theme.name === 'dark-theme' ? '#eeeeee' : '#000000'}
                            $withoutValueColor='#6e6e6e'
                            className="mt-4"
                            autoComplete="off"
                            required
                            $animationDuration="1s"
                            $animationDelay="0s"
                        />
                        <CustomInput
                            label="E-mail*"
                            type="email"
                            id="email"
                            name="email"
                            maxLength={200}
                            $withValueColor={theme.name === 'dark-theme' ? '#eeeeee' : '#000000'}
                            $withoutValueColor="#6e6e6e"
                            className="mt-4"
                            autoComplete="off"
                            required
                            $animationDuration="1s"
                            $animationDelay="0.1s"
                        />
                        <CustomInput
                            label="Password*"
                            type="password"
                            id="password"
                            name="password"
                            $withValueColor={theme.name === 'dark-theme' ? '#eeeeee' : '#000000'}
                            $withoutValueColor="#6e6e6e"
                            className="mt-4"
                            autoComplete="off"
                            required
                            $animationDuration="1s"
                            $animationDelay="0.2s"
                        />
                        <CustomInput
                            label="Confirm Your Password*"
                            type="password"
                            id="passwordConfirmation"
                            name="passwordConfirmation"
                            $withValueColor={theme.name === 'dark-theme' ? '#eeeeee' : '#000000'}
                            $withoutValueColor="#6e6e6e"
                            className="mt-4"
                            autoComplete="off"
                            required
                            $animationDuration="1s"
                            $animationDelay="0.3s"
                        />
                        <div className="buttons w-100 d-flex flex-column align-items-center">
                            {error && <p style={{ fontSize: '0.9rem' }} className="text-danger align-self-start mt-3 mb-0">{error}</p>}
                            <Button className='w-100 mt-3 btn-dark-secondary' variant="none" type="submit">
                                {isLoading ? <Spinner variant="secondary" animation="border" /> : 'Create your account'}
                            </Button>
                            <Link href="/login" className="mt-3 text-center text-decoration-none">Do you have account? Make your login</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

const StyledRegister = styled(Register)`
    min-height: 100vh;
    min-width: 100vw;
    background-color: ${({ theme }) => theme.colors.primary};
    display: flex;
    justify-content: center;
    align-items: center;


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

export default StyledRegister;