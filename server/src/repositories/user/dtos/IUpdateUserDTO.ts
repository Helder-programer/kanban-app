interface IUpdateUserDTO {
    userId: string;
    oldPassword: string;
    name?: string;
    email?: string;
    newPassword?: string;
}