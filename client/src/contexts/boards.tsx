import { createContext, useContext, Dispatch, SetStateAction, ReactNode, useState } from "react";

import { IBoard } from "@/types/IBoard";

interface IBoardsContext {
    boards: IBoard[];
    setBoards: Dispatch<SetStateAction<IBoard[]>>;
}


const BoardsContext = createContext({} as IBoardsContext);


export function BoardsContextProvider({ children }: { children: ReactNode }) {
    const [boards, setBoards] = useState<IBoard[]>([]);

    console.log(boards);
    
    return (
        <BoardsContext.Provider value={{ boards: boards, setBoards: setBoards }}>
            {children}
        </BoardsContext.Provider>
    );
}


export const useBoards = () => {
    const context = useContext(BoardsContext);
    return context;
}


