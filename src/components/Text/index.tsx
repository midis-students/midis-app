import { ComponentProps, CSSProperties, ElementType, ReactNode } from "react";

type TextOwnProps<E extends ElementType> = {
  as?: E;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

type TextProps<E extends ElementType> = TextOwnProps<E> &
  Omit<ComponentProps<E>, keyof TextOwnProps<E>>;

const defaultTag = "span";

export default function Text<E extends ElementType = typeof defaultTag>(
  props: TextProps<E>
) {
  const { as, className, style, children, ...otherProps } = props;

  const Tag = as || defaultTag;

  return (
    <Tag className={className} style={style} {...otherProps}>
      {children}
    </Tag>
  );
}
