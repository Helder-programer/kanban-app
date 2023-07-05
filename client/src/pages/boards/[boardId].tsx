import Sidebar from "@/components/common/sidebar";
import AppLayout from "@/components/layouts/appLayout";

function Board() {

    return (
        <AppLayout>
            <Sidebar />
            <main className="d-flex w-100 h-100 justify-content-center align-items-center">

                Board

            </main>
        </AppLayout>
    );
}

export default Board;