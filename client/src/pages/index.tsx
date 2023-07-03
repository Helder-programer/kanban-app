import { Container } from "react-bootstrap";
import Sidebar from "@/components/common/sidebar";
import AppContainer from "@/components/layouts/appContainer";


function Home() {
    return (
        <AppContainer>
            <Sidebar />
            <div>Home</div>
        </AppContainer>
    );
}

export default Home;