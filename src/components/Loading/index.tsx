import style from "./style.module.scss";
import loader from "./loader.svg";
import Text from "@/components/Text";

export default function Loading() {
  return (
    <div className={style.loading}>
      <img src={loader} alt={"loading"} />
      <Text as={"h2"}>Загрузка...</Text>
    </div>
  );
}
