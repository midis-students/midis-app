import { useLocation } from '@happysanta/router';
import { Group, Panel, PanelHeader, View } from '@vkontakte/vkui';
import { Panels } from '@/router';

type ExampleProps = {
  id: string;
};

export default function ExampleView(props: ExampleProps) {
  const location = useLocation();

  const activePanel = location.getPanelId();

  return (
    <View id={props.id} activePanel={activePanel}>
      <Panel id={Panels.Profile}>
        <PanelHeader>Профиль</PanelHeader>
        <Group>Прив пчел</Group>
      </Panel>
    </View>
  );
}
