import { useAuth } from '@/contexts/auth';
import { Button } from 'react-bootstrap';
import AppLayout from '@/components/layouts/appLayout';
import styled from 'styled-components';
import { useTheme } from '@/contexts/theme';

import CustomInput from '@/components/common/inputStyled';

function Settings({ className }: { className: string }) {
    const { user, setUser } = useAuth();
    const { theme } = useTheme();
    return (
        <AppLayout>
            <main className={`px-5 py-3 d-flex flex-column w-100 ${className}`}>
                <h1 className="text mb-4 fw-sembold">Settings</h1>
                <section id="user-informations">
                    <h4 className="text">User Informations</h4>
                    <div className="inputs">
                        <CustomInput
                            label="Name*"
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
                            value={user?.name}
                        />
                        <CustomInput
                            label="E-mail*"
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
                            value={user?.email}
                        />
                        <CustomInput
                            label="Old Password*"
                            type="password"
                            id="oldPassword"
                            name="oldPassword"
                            required
                            className="mt-3"
                            autoComplete="off"
                            $withValueColor={theme.name === 'dark-theme' ? '#eeeeee' : '#000000'}
                            $withoutValueColor={`#6e6e6e`}
                            $animationDuration="1s"
                            $animationDelay="0s"
                        />
                        <CustomInput
                            label="New Password"
                            type="text"
                            id="newPassword"
                            name="newPassword"
                            className="mt-3"
                            autoComplete="off"
                            $withValueColor={theme.name === 'dark-theme' ? '#eeeeee' : '#000000'}
                            $withoutValueColor={`#6e6e6e`}
                            $animationDuration="1s"
                            $animationDelay="0s"
                        />
                        <CustomInput
                            label="New Password Confirmation"
                            type="text"
                            id="NewPasswordConfirmation"
                            name="NewPasswordConfirmation"
                            className="mt-3"
                            autoComplete="off"
                            $withValueColor={theme.name === 'dark-theme' ? '#eeeeee' : '#000000'}
                            $withoutValueColor={`#6e6e6e`}
                            $animationDuration="1s"
                            $animationDelay="0s"
                        />
                    </div>
                    <div className="d-flex gap-4 mt-3">
                        <Button variant="none" className="btn-success">
                            Edit
                        </Button>
                        <Button variant="none" className="btn-danger">
                            Cancel
                        </Button>
                    </div>

                </section>
            </main>
        </AppLayout>
    );
}

const StyledSettings = styled(Settings)`
    #user-informations {     
        .inputs {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            grid-column-gap: 80px;
        }
    }
`;


export default StyledSettings;