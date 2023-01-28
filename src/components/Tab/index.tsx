import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Text from "@/components/Text";
import style from "./style.module.scss";
import { classNames } from "@/lib/cssTools";

type TabProps = {
  children: ReactNode;
};

type TabContext = {
  current: string;
  setCurrentElement: (label: string, element: ReactNode) => void;
};

const TabContext = createContext<TabContext>({
  current: "",
  setCurrentElement: () => {},
});

export default function Tab({ children }: TabProps) {
  const [current, setCurrent] = useState<string>("");
  const [element, setElement] = useState<ReactNode>(null);

  const setCurrentElement = (id: string, element: ReactNode) => {
    setCurrent(id);
    setElement(element);
  };

  return (
    <TabContext.Provider value={{ current, setCurrentElement }}>
      <div className={style.tabsLabels}>{children}</div>
      {element}
    </TabContext.Provider>
  );
}

type TabItemProps = {
  id: string;
  label: string;
  children: ReactNode;
  default?: boolean;
};

Tab.Item = (props: TabItemProps) => {
  const { current, setCurrentElement } = useContext(TabContext);

  useEffect(() => {
    if (props.default) {
      onClick();
    }
  }, []);

  const onClick = () => {
    setCurrentElement(props.id, props.children);
  };

  const isCurrent = props.id === current;

  return (
    <Text
      onClick={onClick}
      className={classNames(style.label, isCurrent && style.active)}
    >
      {props.label}
    </Text>
  );
};
