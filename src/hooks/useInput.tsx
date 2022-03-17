import React from 'react';

import { Input, InputProps } from '@vkontakte/vkui';

export function useInput(props: InputProps): [string, JSX.Element] {
  const [value, setValue] = React.useState('');
  const input = <Input onChange={(e) => setValue(e.target.value)} {...props} />;
  return [value, input];
}
