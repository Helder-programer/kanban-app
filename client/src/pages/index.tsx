import { Button, Container } from "react-bootstrap";
import Sidebar from "@/components/common/sidebar";
import AppContainer from "@/components/layouts/appContainer";


function Home() {
    return (
        <AppContainer>
            <Sidebar />
            <main className="d-flex w-100 h-100 justify-content-center align-items-center">
                <Button variant="none" className="btn btn-outline-custom-green">
                    CLICK HERE TO CREATE YOUR FIRST BOARD
                </Button>
            </main>
        </AppContainer>
    );
}

export default Home;