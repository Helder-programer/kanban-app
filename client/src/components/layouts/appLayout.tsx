import { ReactNode } from 'react';

import styled from 'styled-components';
import Sidebar from '../common/sidebar';

interface IProps {
    className?: string;
    children?: ReactNode
}


function AppLayout({ className, children }: IProps) {
    return (
        <div className={className}>
            <Sidebar />
            {children}
        </div>
    );
}


const StyledAppLayout = styled(AppLayout)`
    height: 100vh;
    width: 100vw;
    display: flex;
    background-color: ${({theme}) => theme.colors.primary};
`;

export default StyledAppLayout;