export type Lesson = {
  id: number;
  flow: string;
  object: string;
  cabinet: string;
  teacher: string;
  danger?: boolean;
  altObject?: string;
};

export type LessonDay = {
  date: string;
  lessons: Lesson[];
};
