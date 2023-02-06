import { useEffect } from "react";
import Div from "@/components/Div";
import Text from "@/components/Text";
import Tab from "@/components/Tab";
import Day from "@/pages/table/Day";
import style from "./style.module.scss";
import { useSchedule } from "@/store/Schedule";
import Loading from "@/components/Loading";

export default function TablePage() {
  const url = new URLSearchParams(location.search);
  const group = url.get("group") || "";
  const data = useSchedule((select) => select.data[group]);
  const fetchSchedule = useSchedule((select) => select.fetch);

  useEffect(() => {
    fetchSchedule(group);
    document.title = "Расписание";
  }, []);

  if (!data) {
    return <Loading />;
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
