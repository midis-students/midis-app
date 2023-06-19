import { FC, Fragment, ReactElement, ReactNode } from 'react';
import { Card, Group, List, Separator, Spacing } from '@vkontakte/vkui';

type CardListProps = {
  header: ReactNode;
  children: ReactElement[];
};

export const CardList: FC<CardListProps> = (props) => {
  return (
    <Group header={props.header} separator="hide">
      <Card mode={'shadow'} style={{ paddingBottom: '.5rem' }}>
        <List style={{ padding: '4px' }}>
          {props.children.map((children, index) => (
            <Fragment key={children.key + '-' + index}>
              {children}
              <SpacingSeparator
                show={index >= 0 && index < props.children.length - 1}
              />
            </Fragment>
          ))}
        </List>
      </Card>
    </Group>
  );
};

const SpacingSeparator: FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null;
  return (
    <Spacing size={24}>
      <Separator />
    </Spacing>
  );
};
