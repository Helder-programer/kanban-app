import styled, { keyframes } from "styled-components";

function NotFoundPage({ className }: { className: string }) {
    return (
        <main className={className}>¨
            <div>
                <h1 className="text">Ops! Page Not Found :(</h1>,
            </div>
        </main>
    );
}


const typingAnimation = keyframes`
    from {width: 0%;}

    to {width: 100%;}
`

const blinkCaret = keyframes`
    from, to { border-color: transparent }
    50% { border-color: #6d6d6d; }
    
`


const StyledNotFoundPage = styled(NotFoundPage)`
    background-color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    

    h1 {
        letter-spacing: -0.85px; 
        border-right: .15em solid #6d6d6d;
        animation: 
            ${typingAnimation} 3.5s alternate steps(40, end),
            ${blinkCaret} 0.75s step-end infinite;
        ;
        margin: 0px;
        white-space: nowrap;
        overflow: hidden;
    }



`;


export default StyledNotFoundPage;