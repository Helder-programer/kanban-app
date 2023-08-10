import styled from 'styled-components';
import Image from 'next/image';
import { ListGroup } from "react-bootstrap";
import { BiLogOut } from 'react-icons/bi';
import { AiFillFolderAdd, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useState } from 'react';

import { useAuth } from "@/contexts/auth";
import { boardService } from '@/services/board';
import { useBoards } from '@/contexts/boards';
import BoardsList from './boardsList';
import FavoritesBoardsList from './favoritesBoardsList';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { light, dark } from '@/styles/theme.styled';
import { useTheme } from '@/contexts/theme';



interface IProps {
    className?: string;
}


function Sidebar({ className }: IProps) {
    const auth = useAuth();
    const boardsContext = useBoards();
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    let username = auth.user?.name;

    if (username)
        username = username![0].toUpperCase() + username?.substring(1);

    const createBoard = async () => {
        const newBoard = await boardService.createBoard();
        const newBoards = [...boardsContext.boards, newBoard];
        boardsContext.setBoards(newBoards);
    }


    return (
        <div className={className}>
            {/* Checkbox Hacking */}
            <input
                type="checkbox"
                className="d-none"
                id="checkbox-to-nav"
            />

            <label id="bar-open-nav" htmlFor="checkbox-to-nav"></label>

            <label
                id="open-nav"
                className="text"
                htmlFor="checkbox-to-nav"
                onClick={() => setIsOpen(!isOpen)}
            >
                {
                    isOpen ?
                        <AiOutlineArrowLeft />
                        :
                        <AiOutlineArrowRight />
                }
            </label>

            <nav>
                <i className="theme-icon">
                    {
                        theme.name === 'dark-theme' ? <BsFillSunFill
                            className="text-custom-yellow"
                            onClick={() => setTheme(light)}
                        /> : <BsFillMoonFill
                            className="text-custom-black"
                            onClick={() => setTheme(dark)}
                        />
                    }
                </i>
                <ListGroup className="w-100" as="ul">
                    <ListGroup.Item
                        as='li'
                        className="border-0 text px-3 pt-3 bg-transparent rounded-0 d-flex justify-content-center align-items-center"
                        action
                        style={{ cursor: 'default' }}
                    >
                        <h4 id="title">Hn Kanban</h4>
                    </ListGroup.Item>

                    <ListGroup.Item
                        as='li'
                        className="border-0 text px-3 pt-3 bg-transparent rounded-0 d-flex justify-content-between align-items-center"
                        action
                        style={{ cursor: 'default' }}
                    >
                        <span className="fw-semibold">{username}</span>

                        <BiLogOut
                            className='fs-5 me-1'
                            style={{ cursor: 'pointer' }}
                            onClick={() => auth.logout()}
                        />
                    </ListGroup.Item>
                    <hr className="text my-0" />

                    <ListGroup.Item
                        as='li'
                        className="border-0 text px-3 bg-transparent rounded-0 d-flex justify-content-between align-items-center"
                        action
                        style={{ cursor: 'default' }}
                    >
                        <span>Favorites</span>

                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        className="border-0 p-0 bg-transparent rounded-0"
                    >

                        <FavoritesBoardsList />

                    </ListGroup.Item>
                    <hr className="text my-0" />

                    <ListGroup.Item
                        as='li'
                        className="border-0 px-3 text bg-transparent rounded-0 d-flex justify-content-between align-items-center"
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
                        className="border-0 p-0 text-custom-white bg-transparent rounded-0"
                        id="board-list"
                    >

                        <BoardsList />                

                    </ListGroup.Item>

                </ListGroup>
            </nav>
        </div>
    );
}

const StyledSidebar = styled(Sidebar)`
    position: relative;

    nav {
        background-color: ${({theme}) => theme.colors.sidebar};
        position: relative;
        width: 15px;
        overflow: hidden;
        height: 100vh;
        display: flex;
        transition: width 0.3s ease-in-out;
    }

    #checkbox-to-nav:checked {
        &~#bar-open-nav {
            left: -150%;            
        }

        &~nav {
            width: 250px;
        }
    }

    #title {
        font-weight: 700;
        white-space: nowrap;
    }

    #new-board-icon {
        transition: all 0.3s ease-in-out;
        &:hover {
            color:#4d4d52;
        }
    }

    
    .theme-icon {
        position: absolute;
        top: calc(100vh - 30px);
        left: 5px;
        
        svg {
            font-size: 1.2rem;
            cursor: pointer;
            z-index: 9999;
        }
    }

    #open-nav {
        top: 10px;
        left: calc(100% - 16px);
        border-radius: 50%;
        padding: 0.2rem 0.5rem 0.2rem 0.5rem;
        z-index: 8999;
    }


    #bar-open-nav, #open-nav {
        position: absolute;
        background-color: ${({theme}) => theme.colors.sidebar};
        transition: all 0.3s ease-in-out;
        cursor: pointer;
    }

    #bar-open-nav {
        left: 0;
        height: 100%;
        width: 20px;
        z-index: 8997;
        &:hover {
            background-color: #6b6b6b;
            &~#open-nav {
                background-color: #6b6b6b;
            }
        }
    }


    #board-list {
        max-height: 70%;
        overflow-y: auto;
        overflow-x: hidden;
    }
`;

export default StyledSidebar;