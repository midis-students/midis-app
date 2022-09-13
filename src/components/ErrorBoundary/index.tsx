import React from 'react';
export class ErrorBoundary extends React.Component<{ children: React.ReactNode }> {
  state = {
    hasError: false,
    error: '',
  };

  constructor(props: any) {
    super(props);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState((prev) => ({ ...prev, error: error.message }));
  }

  render() {
    const version = document.getElementsByTagName('html')[0].getAttribute('version') || 'Dev';
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
          <span>{version}</span>
          <h5
            style={{
              marginTop: '1em',
              color: '#ed3141',
            }}>
            {this.state.error}
          </h5>
        </div>
      );
    }

    return this.props.children;
  }
}
