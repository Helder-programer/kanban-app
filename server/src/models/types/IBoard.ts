
export interface IBoard {
    board_id: string
    icon: string;
    title: string;
    description: string;
    position: number;
    favorite: boolean;
    favoritePosition: number;
    created_at: Date;
    updated_at: Date;
    user_id: string;
}