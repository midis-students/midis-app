export interface ILesson {
  id: number;
  flow: string;
  object: string;
  cabinet: string;
  teacher: string;
  //danger: boolean;
  //altObject?: string;
}

export interface IDay {
  date: string;
  table: ILesson[];
}

export type IWeekTable = IDay[];
