import { createContext, useContext, Dispatch, SetStateAction, ReactNode, useState } from "react";

import { IBoard } from "@/types/IBoard";

interface IBoardsContext {
    boards: IBoard[];
    setBoards: Dispatch<SetStateAction<IBoard[]>>;
    favoritesBoards: IBoard[];
    setFavoritesBoards: Dispatch<SetStateAction<IBoard[]>>;
}


export const BoardsContext = createContext({} as IBoardsContext);


export function BoardsContextProvider({ children }: { children: ReactNode }) {
    const [boards, setBoards] = useState<IBoard[]>([]);
    const [favoritesBoards, setFavoritesBoards] = useState<IBoard[]>([]);

    return (
        <BoardsContext.Provider
            value={{ boards, setBoards, favoritesBoards, setFavoritesBoards }}
        >
            {children}
        </BoardsContext.Provider>
    );
}


export const useBoards = () => {
    const context = useContext(BoardsContext);
    return context;
}


