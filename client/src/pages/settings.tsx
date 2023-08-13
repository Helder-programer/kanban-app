import AppLayout from '@/components/layouts/appLayout';
import styled from 'styled-components';

import CustomInput from '@/components/common/inputStyled';

function Settings({ className }: { className: string }) {
    return (
        <AppLayout>
            <main className={`px-5 py-3 d-flex flex-column w-100 ${className}`}>
                <h1 className="text mb-4 fw-sembold">Settings</h1>
            </main>
        </AppLayout>
    );
}

const StyledSettings = styled(Settings)`

`;


export default StyledSettings;