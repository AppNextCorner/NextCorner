export interface schedule {
    open: string;
    closed: string;
}

export  interface time {
    day: string;
    time: schedule;
    status: boolean
}

export type timeSelector = string[]