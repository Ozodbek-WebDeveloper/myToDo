export interface IUser {
    name?: string | null
    email?: string | null
    password?: string | null,
}

export interface IgetUser {
    avatar?: string | null,
    email?: string | null,
    isActive?: boolean,
    name?: string | null,
    roles?: string | null
}

export interface Ipaging {
    page: number | null,
    size: number | null,
    priority: string | null,
    isCompleted: boolean
}

export interface Itodo {
    title: string | null,
    description: string | null,
    priority: string | null
}