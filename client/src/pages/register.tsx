import { Card, Container, Form, Button, Spinner } from "react-bootstrap";
import { ChangeEvent, FormEvent, useState } from "react";
import Router from "next/router";
import Link from "next/link";
import { GetServerSideProps } from "next";

import CustomInput from "@/components/common/inputStyled";
import { authService } from "@/services/auth";
import { parseCookies } from "nookies";


export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

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


            if (password !== passwordConfirmation)
                return setError('Password not matched');


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
        <Container fluid className="bg-custom-black d-flex justify-content-center align-items-center vh-100 vw-100">
            <Card className="bg-custom-black border-0" style={{ width: '25%' }}>
                <Card.Body>
                    <h2 className="text-center text-white fw-bold">Kanban App</h2>
                    <h5 className="text-center text-white">Create Your Account</h5>
                    <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
                        <CustomInput
                            label="Name*"
                            type="text"
                            id="name"
                            name="name"
                            $withValueColor="white"
                            $withoutValueColor="#6e6e6e"
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
                            $withValueColor="white"
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
                            $withValueColor="white"
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
                            $withValueColor="white"
                            $withoutValueColor="#6e6e6e"
                            className="mt-4"
                            autoComplete="off"
                            required
                            $animationDuration="1s"
                            $animationDelay="0.3s"
                        />
                        <div className="buttons w-100 d-flex flex-column align-items-center">
                            {error && <p style={{ fontSize: '0.9rem' }} className="text-danger align-self-start mt-3 mb-0">{error}</p>}
                            <Button className="btn-custom-black-light w-100 mt-3" type="submit">
                                {isLoading ? <Spinner variant="secondary" animation="border" /> : 'Create your account'}
                            </Button>
                            <Link href="/login" className="mt-3 text-custom-white text-center text-decoration-none">You have account? Make your login</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

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