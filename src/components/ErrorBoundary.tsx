import { Component, ReactNode } from 'react';
import { Icon12ArrowUpRightOutSquareOutline } from '@vkontakte/icons';
import { Button, Placeholder } from '@vkontakte/vkui';

import { LINK_SUPPORT_CHAT } from '@/config/vk';

type ErrorBoundaryProps = {
  children: ReactNode;
  id?: string;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(_error: unknown) {
    console.error(_error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Placeholder
          icon={
            <img
              src="https://vk.com/sticker/1-18504-128.png"
              alt="Эникей"
              className="sticker"
            />
          }
          action={
            <Button
              after={<Icon12ArrowUpRightOutSquareOutline />}
              mode="link"
              href={LINK_SUPPORT_CHAT}
              target={'_blank'}
            >
              Сообщить об проблеме
            </Button>
          }
        >
          Что-то пошло не так.
        </Placeholder>
      );
    }

    return this.props.children;
  }
}
