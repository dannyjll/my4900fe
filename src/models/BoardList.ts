export interface Board {
    pk: number,
    title: string,
    description: string,
    notes: string,
    list_image: any,
    group_set: Number[],
    category: Number[],
    task_set: Number[],
}

export interface BoardList {
    data: Board[]
}