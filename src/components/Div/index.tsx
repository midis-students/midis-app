import { ComponentProps, CSSProperties, ElementType, ReactNode } from "react";
import css from "./style.module.scss";
import { classNames } from "@/lib/cssTools";

type DivOwnProps<E extends ElementType> = {
  as?: E;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

type DivProps<E extends ElementType> = DivOwnProps<E> &
  Omit<ComponentProps<E>, keyof DivOwnProps<E>>;

const defaultTag = "div";

export default function Div<E extends ElementType = typeof defaultTag>(
  props: DivProps<E>
) {
  const { as, className, style, children, ...otherProps } = props;
  const Tag = as || defaultTag;
  return (
    <Tag
      className={classNames(css.Div, className)}
      style={style}
      {...otherProps}
    >
      {children}
    </Tag>
  );
}
