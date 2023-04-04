import { memo, ReactNode, Suspense } from 'react';
import { useLocation } from '@happysanta/router';
import { router } from '@/router';
import { NavigationItem } from './type';
import {
  Cell,
  Epic,
  Group,
  Panel,
  PanelHeader,
  Platform,
  SplitCol,
  SplitLayout,
  Tabbar,
  TabbarItem,
  useAdaptivityConditionalRender,
  usePlatform,
} from '@vkontakte/vkui';
import { useMediaQueries } from '@vkontakte/vkui/dist/hooks/useMediaQueries';

type NavigationProps = {
  items: NavigationItem[];
  children: ReactNode;
  header?: ReactNode;
  fallback?: ReactNode;
};

export default function Navigation(props: NavigationProps) {
  const platform = usePlatform();
  const { viewWidth } = useAdaptivityConditionalRender();
  const location = useLocation();
  const activeView = location.getViewId();
  const isVKCOM = platform !== Platform.VKCOM;
  const mediaQueries = useMediaQueries();
  const isDesktop = mediaQueries.desktopPlus.matches;

  const NavbarItem = memo(({ item }: { item: NavigationItem }) => {
    const onClick = () => router.pushPage(item.id);
    if (isDesktop) {
      return (
        <Cell
          key={item.id}
          disabled={activeView === item.page.viewId}
          onClick={onClick}
          before={item.icon}
          style={
            activeView === item.page.viewId
              ? {
                  backgroundColor: 'var(--vkui--color_background_secondary)',
                  borderRadius: 8,
                }
              : {}
          }
        >
          {item.label}
        </Cell>
      );
    }

    return (
      <TabbarItem
        selected={activeView === item.page.viewId}
        text={item.label}
        aria-label={item.label}
        onClick={onClick}
      >
        {item.icon}
      </TabbarItem>
    );
  });

  return (
    <SplitLayout header={isVKCOM && <PanelHeader separator={false} />}>
      {viewWidth.tabletPlus && (
        <SplitCol
          className={viewWidth.tabletPlus.className}
          fixed
          width={280}
          maxWidth={280}
        >
          <Panel>
            {isVKCOM && props.header ? props.header : <PanelHeader />}
            <Group className="vkcom-epic">
              {props.items.map((item) => (
                <NavbarItem key={item.id} item={item} />
              ))}
            </Group>
          </Panel>
        </SplitCol>
      )}
      <SplitCol width="60%" stretchedOnMobile autoSpaced>
        <Suspense fallback={props.fallback}>
          <Epic
            activeStory={activeView}
            tabbar={
              viewWidth.tabletMinus && (
                <Tabbar className={viewWidth.tabletMinus.className}>
                  {props.items.map((item) => (
                    <NavbarItem key={item.id} item={item} />
                  ))}
                </Tabbar>
              )
            }
          >
            {props.children}
          </Epic>
        </Suspense>
      </SplitCol>
    </SplitLayout>
  );
}
