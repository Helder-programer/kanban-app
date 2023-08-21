import { useBoards } from "@/contexts/boards";
import { Button } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { FaFilter } from "react-icons/fa";

function BoardsFilterPopover() {
    const { boards, setBoards } = useBoards();
    return (
        <OverlayTrigger
            trigger="click"
            placement='right'
            overlay={
                <Popover id="popover">
                    <Popover.Header as="h3">Wow</Popover.Header>
                    <Popover.Body>
                        <strong>Holy guacamole!</strong> Check this info.
                    </Popover.Body>
                </Popover>
            }
        >
            <i className="icon small-text">
                <FaFilter />
            </i>
            
           
        </OverlayTrigger>
    );
}

export default BoardsFilterPopover;