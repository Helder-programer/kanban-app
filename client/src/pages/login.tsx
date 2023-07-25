import { Card, Container, Form, Button, Spinner } from "react-bootstrap";
import { FormEvent, useState } from "react";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import Link from "next/link";
import styled from 'styled-components';

import CustomInput from "@/components/common/inputStyled";
import { useAuth } from "@/contexts/auth";

function Login({ className }: { className: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const auth = useAuth();

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
        <Container fluid className={`bg-custom-black d-flex justify-content-center align-items-center vh-100 vw-100 ${className}`}>
            <Card className="bg-custom-black border-0">
                <Card.Body>
                    <h2 className="text-center text-white fw-bold">Hn Kanban</h2>
                    <h5 className="text-center text-white">Make Your Login</h5>
                    <Form style={{ width: '100%' }} onSubmit={handleSubmit}>

                        <CustomInput
                            label="E-mail"
                            type="text"
                            id="email"
                            name="email"
                            required
                            className="mt-3"
                            autoComplete="off"
                            $withValueColor="white"
                            $withoutValueColor="#6e6e6e"
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
                            $withValueColor="white"
                            $withoutValueColor="#6e6e6e"
                            $animationDuration="1s"
                            $animationDelay="0.1s"
                        />
                        <div className="buttons w-100 d-flex flex-column align-items-center">
                            {error && <p style={{ fontSize: '0.9rem' }} className="text-danger align-self-start mt-3 mb-0">{error}</p>}

                            <Button className="btn-custom-black-light w-100 mt-3" type="submit">
                                {isLoading ? <Spinner variant="secondary" animation="border" /> : 'Login'}
                            </Button>
                            <Link href="/register" className="mt-3 text-custom-white text-center text-decoration-none">Don't have account? Create your account</Link>
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

    .card {
        width: 25%;
    }

    @media screen and (max-width: 768px) {
        .card { 
            width: 100%;
        }
    }

`;


export default StyledLogin;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { 'kanban-token': token } = parseCookies(ctx);

    if (token)
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }

    return {
        props: {}
    }
}