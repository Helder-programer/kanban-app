
export interface IUser {
    user_id: string;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    isCorrectPassword(password: string): Promise<boolean>;
}