import React from 'react';
export class ErrorBoundary extends React.Component<{ children: React.ReactNode }> {
  state = {
    hasError: false,
  };

  constructor(props: any) {
    super(props);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {}

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}>
          <strong style={{ marginBottom: '1em' }}>Что-то пошло не так...</strong>
          <img src="https://stikvk.ru/wp-content/uploads/2020/10/256-28-2.png" alt="oh no..." />
        </div>
      );
    }

    return this.props.children;
  }
}
