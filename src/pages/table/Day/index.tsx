import Div from "@/components/Div";
import style from "./style.module.scss";
import Text from "@/components/Text";
import LessonCell from "@/pages/table/Lesson";
import { IDay } from "@/lib/type";

type DayProps = {
  day: IDay;
};

export default function Day({ day }: DayProps) {
  const isToday = day.date.includes("Сегодня");
  const isSaturday = day.date.includes("Суббота");

  return (
    <Div className={style.day}>
      <Text as={"h4"}>{day.date}</Text>
      <Div className={style.table}>
        {day.table.map((lesson) => (
          <LessonCell
            key={lesson.id}
            lesson={lesson}
            display={isToday}
            isSaturday={isSaturday}
          />
        ))}
      </Div>
    </Div>
  );
}
