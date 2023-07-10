import styled from 'styled-components';
import { ListGroup } from "react-bootstrap";
import { BiLogOut } from 'react-icons/bi';
import { AiFillFolderAdd } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DropResult } from 'react-beautiful-dnd';

import { useAuth } from "@/contexts/auth";
import { boardService } from '@/services/board';
import { useBoards } from '@/contexts/boards';
import BoardsList from './boardsList';
import FavoritesBoardsList from './favoritesBoardsList';



interface IProps {
    className?: string;
}


function Sidebar({ className }: IProps) {
    const auth = useAuth();
    const boardsContext = useBoards();
    let username = auth.user?.name;

    if (username)
        username = username![0].toUpperCase() + username?.substring(1);

    const createBoard = async () => {
        const newBoard = await boardService.createBoard();
        const newBoards = [...boardsContext.boards, newBoard];
        boardsContext.setBoards(newBoards);
    }


    return (
        <nav className={`${className} bg-custom-black-light`}>
            <ListGroup className="w-100" as="ul">
                <ListGroup.Item
                    as='li'
                    className="border-0 px-3 py-3 text-white bg-custom-black-light rounded-0 d-flex justify-content-between align-items-center"
                    action
                    style={{ cursor: 'default' }}
                >
                    <span className="fw-bold">{username}</span>
                    <BiLogOut
                        className='fs-5'
                        style={{ cursor: 'pointer' }}
                        onClick={() => auth.logout()}
                    />
                </ListGroup.Item>

                <ListGroup.Item
                    as='li'
                    className="border-0 mt-3 px-3 text-white bg-custom-black-light rounded-0 d-flex justify-content-between align-items-center"
                    action
                    style={{ cursor: 'default' }}
                >
                    <span>Favorites</span>
                </ListGroup.Item>

                <ListGroup.Item
                    as="li"
                    className="border-0 mt-3 p-0 text-white bg-custom-black-light rounded-0"
                >

                    <FavoritesBoardsList />

                </ListGroup.Item>

                <ListGroup.Item
                    as='li'
                    className="border-0 mt-3 px-3 text-white bg-custom-black-light rounded-0 d-flex justify-content-between align-items-center"
                    action
                    style={{ cursor: 'default' }}
                >
                    <span>Boards</span>
                    <AiFillFolderAdd
                        className="fs-5"
                        id="new-board-icon"
                        style={{ cursor: 'pointer' }}
                        onClick={() => createBoard()}
                    />
                </ListGroup.Item>

                <ListGroup.Item
                    as="li"
                    className="border-0 mt-3 p-0 text-white bg-custom-black-light rounded-0"
                >

                    <BoardsList />

                </ListGroup.Item>
                
            </ListGroup>
        </nav>
    );
}

const StyledSidebar = styled(Sidebar)`
    min-width: 250px;
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