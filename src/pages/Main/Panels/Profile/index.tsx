import View from '../../../../components/View';

export default function ProfileView() {
  const version = document.getElementsByTagName('html')[0].getAttribute('version');
  return <View>Version: {version}</View>;
}
