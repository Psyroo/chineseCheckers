export interface UserData {
    username: string,
    token: string,
    wins: number,
    loses: number,
    winstreak: number
}

export interface UserRO {
    user: UserData
}