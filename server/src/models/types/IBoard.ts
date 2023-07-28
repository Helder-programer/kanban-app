
export interface IBoard {
    board_id: string
    icon: string;
    title: string;
    description: string;
    position: number;
    favorite: boolean;
    favoritePosition: number;
    user_id: string;
    created_at: Date;
    updated_at: Date;
}