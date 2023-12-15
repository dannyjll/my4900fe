export interface User {
    pk?: number,
    username: string,
    is_superuser: boolean,
    first_name: string,
    last_name: string,
    email: string
}

export interface UserList {
    data: User[]
}