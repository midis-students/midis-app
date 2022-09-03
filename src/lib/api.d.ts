export interface ApiError {
  message: string;
  longmessage: string;
}

export interface ApiSchedule {
  [x: string]: Schedule;
}

export interface MidisSchedule {
  firstWeek: MidisDay[];
  secondWeek: MidisDay[];
}

export interface MidisDay {
  dayName: string;
  dayTimetable: string;
  dayPars: MidisLesson[];
}

export interface MidisLesson {
  id: number;
  flow: string;
  object: string;
  altObject?: string;
  class: string;
  teacher: string;
  danger: boolean;
  time: { start: string; end: string };
}

export interface ApiMarks {
  [groupName: string]: Mark[];
}

export interface Mark {
  date: string;
  mark: string;
  details: string;
}
