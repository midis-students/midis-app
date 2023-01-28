import Div from "@/components/Div";
import Text from "@/components/Text";
import Tab from "@/components/Tab";
import Day from "@/pages/table/Day";
import style from "./style.module.scss";
import { useSchedule } from "@/store/Schedule";
import { useEffect } from "react";

export default function TablePage() {
  const data = useSchedule((select) => select.data);
  const fetchSchedule = useSchedule((select) => select.fetch);

  useEffect(() => {
    fetchSchedule();
  }, []);

  if (!data) {
    return <Text>Loading...</Text>;
  }

  const days = [...data.first, ...data.second];

  const currentDay = days.find((day) => day.date.includes("Сегодня"));
  const nextDay = days.find((day) => day.date.includes("Завтра"));

  return (
    <div className={style.page}>
      <Tab>
        <Tab.Item id={"short"} label={"Краткий"} default>
          <Div className={style.week}>
            {currentDay && <Day day={currentDay} />}
            {nextDay && <Day day={nextDay} />}
          </Div>
        </Tab.Item>
        <Tab.Item id={"full"} label={"Полный"}>
          <div className={style.fullWeek}>
            <Div className={style.week}>
              <Text as={"h3"}>Расписание на 1 неделю</Text>
              {data.first.map((day) => (
                <Day key={day.date} day={day} />
              ))}
            </Div>
            <Div className={style.week}>
              <Text as={"h3"}>Расписание на 2 неделю</Text>
              {data.second.map((day) => (
                <Day key={day.date} day={day} />
              ))}
            </Div>
          </div>
        </Tab.Item>
      </Tab>
    </div>
  );
}
