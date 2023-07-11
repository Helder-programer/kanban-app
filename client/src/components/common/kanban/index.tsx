import { Button } from "react-bootstrap";
import { Dispatch, SetStateAction } from 'react';

import { ISection } from "@/types/ISection";

interface IProps {
    sections: ISection[];
    setSections: Dispatch<SetStateAction<ISection[]>>
}

function Kanban({ sections, setSections }: IProps) {
    return (
        <>
            <div className="d-flex w-100 mt-3 justify-content-between align-items-center">
                <Button variant="none" className="btn-outline-custom-black-light text-primary  border-0">
                    Add Section
                </Button>

                <span className="text-custom-white pe-4">
                    {/* {currentBoardInformations.sections.length}  Sections */}
                </span>

            </div>
            <hr className="text-white mt-1" />

            <section id="kanban">

            </section>
        </>
    );
}

export default Kanban;