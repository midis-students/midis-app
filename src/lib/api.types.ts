export interface ApiError {
  message: string;
  longmessage: string;
}

export interface ApiSchedule {
  [x: string]: { weeks: MidisSchedule };
}

export interface MidisSchedule {
  firstWeek: MidisDay[];
  secondWeek: MidisDay[];
}

export interface MidisDay {
  dayName: string;
  dayTimetable: string;
  dayPars: MidisLesson[];
  isSaturday: boolean;
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

export interface Profile {
  id: number;
  name: string;
  pic: string;
  group: string;
  type: string;
}

export interface ApiInfo {
  version: string;
  developers: [
    {
      name: string;
      subname: string;
      image: string;
    },
  ];
}
