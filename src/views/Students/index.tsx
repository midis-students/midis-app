import { Group, Panel, PanelHeader, View } from '@vkontakte/vkui';
import { useLocation } from '@happysanta/router';
import { Panels } from '@/router';

type ExampleProps = {
  id: string;
};

export default function StudentView(props: ExampleProps) {
  const location = useLocation();

  const activePanel = location.getPanelId();

  return (
    <View id={props.id} activePanel={activePanel}>
      <Panel id={Panels.Students}>
        <PanelHeader>Example Page</PanelHeader>
        <Group>Hello world</Group>
      </Panel>
    </View>
  );
}
