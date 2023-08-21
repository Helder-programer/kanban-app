import styled from 'styled-components';
import { BiLogOut, BiSolidUser } from 'react-icons/bi';
import { AiFillFolderAdd, AiFillSetting, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from "@/contexts/auth";
import { boardService } from '@/services/board';
import { useBoards } from '@/contexts/boards';
import BoardsList from './boardsList';
import FavoritesBoardsList from './favoritesBoardsList';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { light, dark } from '@/styles/theme.styled';
import { useTheme } from '@/contexts/theme';
import { FaFilter } from 'react-icons/fa';
import BoardsFilterPopover from './boardsFiltersPopover/boardsFilterPopover';



interface IProps {
    className?: string;
}


function Sidebar({ className }: IProps) {
    const auth = useAuth();
    const boardsContext = useBoards();
    const { theme, setTheme, sidebarIsOpen, setSidebarIsOpen } = useTheme();
    const router = useRouter();
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
            <input type="checkbox" checked={sidebarIsOpen} className="d-none" id="checkbox-to-nav" />
            <label id="bar-open-nav" htmlFor="checkbox-to-nav" onClick={() => setSidebarIsOpen(!sidebarIsOpen)}></label>
            <label id="open-nav" className="text" htmlFor="checkbox-to-nav" onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>
                {sidebarIsOpen ? <AiOutlineArrowLeft /> : <AiOutlineArrowRight />}
            </label>

            <nav>
                <div
                    className="border-0 text px-3 pt-3 bg-transparent rounded-0 d-flex justify-content-center align-items-center"
                    style={{ cursor: 'default' }}
                >
                    <h4 id="logo">Hn Kanban</h4>
                </div>

                <div
                    className="border-0 text px-3 my-2 bg-transparent rounded-0 d-flex justify-content-between align-items-center"
                    style={{ cursor: 'default' }}
                >
                    <div className="d-flex align-items-center">
                        <BiSolidUser className="me-1" />
                        <span id="username">{username}</span>
                    </div>

                    <BiLogOut
                        className='fs-5 icon'
                        onClick={() => auth.logout()}
                    />
                </div>
                <hr className="text m-0" />

                <div
                    className="border-0 text px-3 mt-2 bg-transparent rounded-0 d-flex justify-content-between align-items-center"
                    style={{ cursor: 'default' }}
                >
                    <span className="align-self-start mb-1">Favorites</span>
                    {/* <FaFilter className="icon small-text" /> */}

                </div>
                <div
                    className="border-0 p-0 text-custom-white bg-transparent rounded-0"
                    id="favorite-board-list"
                >
                    <FavoritesBoardsList />
                </div>
                <hr className="text m-0" />

                <div
                    className="border-0 px-3 mt-2 text bg-transparent rounded-0 d-flex justify-content-between align-items-center"
                    style={{ cursor: 'default' }}
                >
                    <span className="mb-1">Boards</span>
                    <div>
                        <AiFillFolderAdd
                            className="fs-5 me-1 icon"
                            style={{ cursor: 'pointer' }}
                            onClick={() => createBoard()}
                        />
                        <BoardsFilterPopover />

                    </div>
                </div>
                
                <div id="board-list">
                    <BoardsList />
                </div>

                <i className="theme-icon" title="theme switcher">
                    {
                        theme.name === 'dark-theme' ? <BsFillSunFill
                            className="text-warning"
                            onClick={() => setTheme(light)}
                        /> : <BsFillMoonFill
                            className="text-custom-black"
                            onClick={() => setTheme(dark)}
                        />
                    }
                </i>

                <i className="text settings-icon icon">
                    <AiFillSetting onClick={() => router.push('/settings')} />
                </i>
            </nav>
        </div>
    );
}

const StyledSidebar = styled(Sidebar)`
    position: relative;

    nav {
        background-color: ${({ theme }) => theme.colors.sidebar};
        position: relative;
        width: 15px;
        overflow: hidden;
        height: 100vh;
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

    #logo {
        font-weight: 700;
        white-space: nowrap;
        letter-spacing: -0.75px;
    }    
    
    #open-nav {
        top: 10px;
        left: calc(100% - 16px);
        border-radius: 50%;
        padding: 0.2rem 0.5rem 0.2rem 0.5rem;
    }

    
    #bar-open-nav, #open-nav {
        position: absolute;
        background-color: ${({ theme }) => theme.colors.sidebar};
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        z-index: 3;
    }
    
    #bar-open-nav {
        left: 0;
        height: 100%;
        width: 20px;
        &:hover {
            background-color: #6b6b6b;
            &~#open-nav {
                background-color: #6b6b6b;
            }
        }
    }

    #username {
        width: 150px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-weight: 500;
    }
    
    #board-list, #favorite-board-list {
        max-height: calc(200px);
        overflow-y: auto;
        overflow-x: hidden;
    }
    
    .settings-icon {
        position: absolute;
        top: calc(100vh - 30px);
        right: 10px;
        
        svg {
            font-size: 1.2rem;
            cursor: pointer;
            z-index: 9999;
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
`;

export default StyledSidebar;