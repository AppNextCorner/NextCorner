export interface schedule {
  open: string;
  closed: string;
}

export interface Itime {
  day: string;
  time: schedule;
  status: boolean;
}

export type timeSelector = string[];
