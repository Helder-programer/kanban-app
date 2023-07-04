
import { BoardsContextProvider } from '@/contexts/boards';
import { ReactNode } from 'react';
import styled from 'styled-components';
import Sidebar from '../common/sidebar';

interface IProps {
    className?: string;
    children?: ReactNode
}


function AppLayout({ className, children }: IProps) {
    return (
        <BoardsContextProvider>
            <div className={`${className} bg-custom-black`}>
                <Sidebar />
                {children}
            </div>
        </BoardsContextProvider>
    );
}


const StyledAppLayout = styled(AppLayout)`
    height: 100vh;
    width: 100vw;
    display: flex;
`;

export default StyledAppLayout;