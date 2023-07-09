export interface IBoard {
    _id: string;
    icon: string;
    title: string;
    description: string;
    position: number;
    favorite: boolean;
    favoritePosition: number;
    user: string;
    sections: []
    createdAt: Date;
    updatedAt: Date;
}