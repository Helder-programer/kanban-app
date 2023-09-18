import styled from 'styled-components';

function Navbar({ className }: { className?: string }) {
    return (
        <nav className={className}>
            <span>
                <h4 className="text logo m-0">Hn Kanban</h4>
            </span>
        </nav>
    );
}

const StyledNavbar = styled(Navbar)`

    background-color: ${({ theme }) => theme.colors.navbar};
    padding: 0.50rem 0rem;
    position: relative;
    z-index: 9999;
    box-shadow: 0px 0px 5px #322;
    
    
    span {
        width: 230px;
        display: flex;
        justify-content: center;
    }
`;

export default StyledNavbar;