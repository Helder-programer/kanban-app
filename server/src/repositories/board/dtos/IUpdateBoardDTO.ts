export interface IUpdateBoardDTO {
    boardId: string;
    userId: string;
    title: string;
    description: string;
    favorite: boolean;
    icon: string;
}