import Div from "@/components/Div";
import Text from "@/components/Text";
import type { ILesson } from "@/lib/type";
import { classNames } from "@/lib/cssTools";
import style from "./style.module.scss";

type LessonCellProps = {
  lesson: ILesson;
  display?: boolean;
  isSaturday?: boolean;
};

export const schedule_time = {
  weekdays: [
    { start: "08:00", end: "09:35" },
    { start: "09:45", end: "11:20" },
    { start: "11:30", end: "13:05" },
    { start: "13:45", end: "15:20" },
    { start: "15:30", end: "17:05" },
    { start: "17:15", end: "18:50" },
    { start: "18:55", end: "20:30" },
    { start: "20:35", end: "22:10" },
  ],
  saturday: [
    { start: "08:00", end: "09:35" },
    { start: "09:45", end: "11:20" },
    { start: "11:30", end: "13:05" },
    { start: "13:15", end: "14:50" },
    { start: "15:00", end: "16:35" },
    { start: "16:45", end: "18:20" },
    { start: "18:30", end: "20:05" },
  ],
};

export default function LessonCell({
  lesson,
  display,
  isSaturday,
}: LessonCellProps) {
  const isCurrent = display && lesson.id === 3;

  const { start, end } =
    schedule_time[isSaturday ? "saturday" : "weekdays"][lesson.id - 1];

  return (
    <Div
      className={classNames(
        style.lessonCell,
        isCurrent && style.lessonCell__current
      )}
    >
      <div className={style.lessonCell__info}>
        <Text className={style.lessonCell__class}>{lesson.cabinet}</Text>
        <div className={style.lessonCell__column}>
          <Text className={style.lessonCell__object}>{start}</Text>
          <Text className={style.lessonCell__teacher}>{end}</Text>
        </div>
        <div className={style.lessonCell__column}>
          <Text className={style.lessonCell__object}>{lesson.object}</Text>
          <Text className={style.lessonCell__teacher}>{lesson.teacher}</Text>
        </div>
      </div>
    </Div>
  );
}
