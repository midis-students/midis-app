import { InputHTMLAttributes } from 'react';
import style from './style.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input(props: InputProps) {
  const { label, ...inputProps } = props;

  return (
    <div className={style.input}>
      <label>{props.label}</label>
      <input  {...inputProps} />
    </div>
  );
}
