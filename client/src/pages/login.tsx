import { Card, Container, Form, Button, Spinner } from "react-bootstrap";
import CustomInput from "@/components/common/inputStyled";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "@/contexts/auth";
import Link from "next/link";


export default function Login() {
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
        <Container fluid className="bg-custom-black d-flex justify-content-center align-items-center vh-100 vw-100">
            <Card className="bg-custom-black border-0" style={{ width: '25%' }}>
                <Card.Body>
                    <h2 className="text-center text-white fw-bold">Kanban App</h2>
                    <h4 className="text-center text-white">Make Your Login</h4>
                    <Form style={{ width: '100%' }} onSubmit={handleSubmit}>

                        <CustomInput
                            label="E-mail"
                            type="text"
                            id="email"
                            name="email"
                            $withValueColor="white"
                            $withoutValueColor="#6e6e6e"
                            className="mt-3"
                            autoComplete="off"
                        />
                        <CustomInput
                            label="Password"
                            type="password"
                            id="password"
                            name="password"
                            $withValueColor="white"
                            $withoutValueColor="#6e6e6e"
                            className="mt-4"
                            autoComplete="off"
                        />
                        <div className="buttons w-100 d-flex flex-column align-items-center">
                            {error && <p style={{ fontSize: '0.9rem' }} className="text-danger align-self-start mt-3 mb-0">{error}</p>}

                            <Button className="btn-custom-black-light w-100 mt-3" type="submit">
                                {isLoading ? <Spinner variant="secondary" animation="border" /> : 'Login'}
                            </Button>
                            <Link href="/register" className="mt-3 text-white text-decoration-none">Don't have account? Create your account</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}
