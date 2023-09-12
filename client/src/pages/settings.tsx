    import { useTheme } from '@/contexts/theme';
import { Button } from 'react-bootstrap';
import { ChangeEvent, useState, FormEvent } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import { useAuth } from '@/contexts/auth';
import AppLayout from '@/components/layouts/appLayout';
import CustomInput from '@/components/common/inputStyled';
import { authService } from '@/services/auth';

type UserInputs = {
    name: string | undefined;
    email: string | undefined;
    oldPassword: string | undefined;
    newPassword: string | undefined;
    confirmNewPassword: string | undefined;
}


function Settings({ className }: { className: string }) {
    const { theme } = useTheme();
    const { user, setUser } = useAuth();
    const [userInputs, setUserInputs] = useState({ name: user?.name, email: user?.email } as UserInputs);
    const [message, setMessage] = useState({ text: '', isError: false });


    const handleChangeUserInputs = (event: ChangeEvent<HTMLInputElement>) => {
        setUserInputs({ ...userInputs, [event.target.id]: event.target.value });
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setMessage({ ...message, isError: false });

        try {

            if (userInputs.newPassword !== userInputs.confirmNewPassword) throw new Error('New password not matched with new password confirmation');
            const user = await authService.update({
                name: userInputs.name,
                email: userInputs.email,
                oldPassword: userInputs.oldPassword,
                newPassword: userInputs.newPassword
            });

            setMessage({ isError: false, text: "User successfully modified!" });
            setUser(user);

        } catch (err: any) {
            console.log(err);
            if (err.response)
                setMessage({ text: err.response.data.message, isError: true });
            else
                setMessage({ text: err.message, isError: true });
        }
    }

    const handleClearInputs = () => {
        setUserInputs({
            name: user?.name,
            email: user?.email,
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        });
    }

    return (
        <AppLayout>
            <Head>
                <title>Settings</title>
            </Head>
            <main className={`px-5 py-3 d-flex flex-column w-100 ${className}`}>
                <h1 className="text mb-4 fw-sembold">Settings</h1>
                <section id="user-informations">
                    <h4 className="text">User Informations</h4>
                    <form onSubmit={handleSubmit}>
                        <CustomInput
                            label="Name*"
                            type="text"
                            id="name"
                            name="name"
                            maxLength={45}
                            required
                            className="mt-3"
                            autoComplete="off"
                            value={userInputs.name}
                            onChange={handleChangeUserInputs}
                            $withValueColor={theme.name === 'dark-theme' ? '#eeeeee' : '#000000'}
                            $withoutValueColor={`#6e6e6e`}
                            $animationDuration="1s"
                            $animationDelay="0s"
                        />
                        <CustomInput
                            label="E-mail*"
                            type="text"
                            id="email"
                            name="email"
                            maxLength={200}
                            required
                            className="mt-3"
                            autoComplete="off"
                            value={userInputs.email}
                            onChange={handleChangeUserInputs}
                            $withValueColor={theme.name === 'dark-theme' ? '#eeeeee' : '#000000'}
                            $withoutValueColor={`#6e6e6e`}
                            $animationDuration="1s"
                            $animationDelay="0s"
                        />
                        <CustomInput
                            label="Old Password*"
                            type="password"
                            id="oldPassword"
                            name="oldPassword"
                            required
                            className="mt-4"
                            autoComplete="off"
                            value={userInputs.oldPassword}
                            onChange={handleChangeUserInputs}
                            $withValueColor={theme.name === 'dark-theme' ? '#eeeeee' : '#000000'}
                            $withoutValueColor="#6e6e6e"
                            $animationDuration="1s"
                            $animationDelay="0.1s"
                        />
                        <CustomInput
                            label="New Password"
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            className="mt-4"
                            autoComplete="off"
                            value={userInputs.newPassword}
                            onChange={handleChangeUserInputs}
                            $withValueColor={theme.name === 'dark-theme' ? '#eeeeee' : '#000000'}
                            $withoutValueColor="#6e6e6e"
                            $animationDuration="1s"
                            $animationDelay="0.1s"
                        />
                        <CustomInput
                            label="Confirm New Password"
                            type="password"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            className="mt-4"
                            autoComplete="off"
                            value={userInputs.confirmNewPassword}
                            onChange={handleChangeUserInputs}
                            $withValueColor={theme.name === 'dark-theme' ? '#eeeeee' : '#000000'}
                            $withoutValueColor="#6e6e6e"
                            $animationDuration="1s"
                            $animationDelay="0.1s"
                        />
                        <div className="mt-4 d-flex gap-3 align-items-center flex-wrap">
                            <Button type="submit" variant="none" className="btn-dark-secondary text-light-primary">Save</Button>
                            <Button variant="none" type="button" className="btn-danger text-light-primary" onClick={handleClearInputs}>Cancel</Button>
                            {message.text && <p className={`${message.isError ? 'text-danger' : 'text-success'} m-0`}>{message.text}</p>}
                        </div>
                    </form>

                </section>



            </main>
        </AppLayout>
    );
}

const StyledSettings = styled(Settings)`
    #user-informations {
        form {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 10px 50px;
        }
    }
`;

export default StyledSettings;