declare interface LoginRegister {
    username: string
    password: string 
}

declare interface UserData extends LoginRegister {
    id: string
}