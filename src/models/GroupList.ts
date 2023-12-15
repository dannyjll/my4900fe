export interface Group {
    pk: number,
    title: string,
    users: number[],
    lists: number[],
}

export interface GroupList {
    data?: Group[]
}