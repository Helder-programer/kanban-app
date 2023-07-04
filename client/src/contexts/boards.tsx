import { createContext, useContext, Dispatch, SetStateAction, ReactNode, useState } from "react";

import { IBoard } from "@/types/IBoard";

interface IBoardsContext {
    boards: IBoard[];
    setBoards: Dispatch<SetStateAction<IBoard[]>>;
}


export const BoardsContext = createContext({} as IBoardsContext);


export function BoardsContextProvider({ children }: { children: ReactNode }) {
    const [boards, setBoards] = useState<IBoard[]>([]);
    
    return (
        <BoardsContext.Provider value={{ boards, setBoards }}>
            {children}
        </BoardsContext.Provider>
    );
}


export const useBoards = () => {
    const context = useContext(BoardsContext);
    return context;
}


