import { useRecoilValue } from 'recoil';
import { ProfileAtom } from '../../../../atoms/profile.atom';
import View from '../../../../components/View';

import style from './style.module.scss';

export default function ProfileView() {
  const profile = useRecoilValue(ProfileAtom);

  const version = document.getElementsByTagName('html')[0].getAttribute('version');
  return (
    <View>
      <div className={style.profile}>
        <img src={profile.pic} />
        <div>
          <span>{profile.name}</span>
          <span>{profile.group}</span>
        </div>
      </div>
      <h4 className={style.version}>Version: {version}</h4>
    </View>
  );
}
