export interface Task {

    pk: number,
    title: string,
    description: string,
    completion_status: boolean,
    due_date: string,
    notes: string,
    user: number,
    list: number,
    difficulty: number
}

export interface TaskList {
    data: Task[]
}