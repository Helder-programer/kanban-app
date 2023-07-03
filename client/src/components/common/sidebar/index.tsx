import styled from 'styled-components';
import { ListGroup } from "react-bootstrap";
import { BiLogOut } from 'react-icons/bi';
import { AiFillFolderAdd } from 'react-icons/ai';

import { useAuth } from "@/contexts/auth";

interface IProps {
    className?: string;
}


function Sidebar({ className }: IProps) {
    const auth = useAuth();
    let username = auth.user?.name;

    if (username)
        username = username![0].toUpperCase() + username?.substring(1);

    return (
        <nav className={`${className} bg-custom-black-light`}>
            <ListGroup className="w-100">
                <ListGroup.Item
                    className="border-0 px-3 text-white bg-custom-black-light rounded-0 d-flex justify-content-between align-items-center w-100"
                    action
                    style={{ cursor: 'default' }}
                >
                    <span className="fw-bold">{username}</span>
                    <BiLogOut className='fs-5' style={{ cursor: 'pointer' }} onClick={() => auth.logout()} />
                </ListGroup.Item>
                <ListGroup.Item
                    className="border-0 mt-3 px-3 text-white bg-custom-black-light rounded-0 d-flex justify-content-between align-items-center w-100"
                    action
                    style={{ cursor: 'default' }}
                >
                    <span>Favorites</span>
                </ListGroup.Item>
                <ListGroup.Item
                    className="border-0 mt-3 px-3 text-white bg-custom-black-light rounded-0 d-flex justify-content-between align-items-center w-100"
                    action
                    style={{ cursor: 'default' }}
                >
                    <span>Boards</span>
                    <AiFillFolderAdd className="fs-5" id="new-board-icon" style={{ cursor: 'pointer' }} />
                </ListGroup.Item>
            </ListGroup>
        </nav>
    );
}

const StyledSidebar = styled(Sidebar)`
    width: 250px;
    height: 100vh;
    display: flex;

    #new-board-icon {
        transition: all 0.3s ease-in-out;
        &:hover {
            color:#4d4d52;
        }
    }
`;

export default StyledSidebar;