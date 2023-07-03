import { ReactNode } from 'react';
import styled from 'styled-components';

interface IProps {
    className?: string;
    children?: ReactNode
}


function AppContainer({ className, children }: IProps) {
    return (
        <div className={`${className} bg-custom-black`}>
            {children}
        </div>
    );
}


const StyledAppContainer = styled(AppContainer)`
    height: 100vh;
    width: 100vw;
    display: flex;
`;

export default StyledAppContainer;