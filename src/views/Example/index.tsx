import { useLocation } from '@happysanta/router';
import { Group, Panel, PanelHeader, View } from '@vkontakte/vkui';

type ExampleProps = {
  id: string;
};

export default function ExampleView(props: ExampleProps) {
  const location = useLocation();

  const activePanel = location.getPanelId();

  return (
    <View id={props.id} activePanel={activePanel}>
      <Panel id={'EXAMPLE'}>
        <PanelHeader>Example Page</PanelHeader>
        <Group>Hello world</Group>
      </Panel>
    </View>
  );
}
