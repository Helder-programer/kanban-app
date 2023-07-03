import { useAuth } from "@/contexts/auth";
import styled from 'styled-components';

interface IProps {
    className?: string;
}


function Sidebar({ className }: IProps) {
    const auth = useAuth();
    return (
        <nav className={`${className}`}>
            asdasd
        </nav>
    );
}

const StyledSidebar = styled(Sidebar)`
    width: '250px';
    height: '100vh';
    display: flex;

`;

export default StyledSidebar;