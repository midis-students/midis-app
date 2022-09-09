import { useRecoilValue } from 'recoil';
import { InfoAtom } from '../../../../atoms/info.atom';
import { ProfileAtom } from '../../../../atoms/profile.atom';
import Div from '../../../../components/Div';
import View from '../../../../components/View';

import style from './style.module.scss';

export default function ProfileView() {
  const profile = useRecoilValue(ProfileAtom);
  const { version: serverVersion, developers } = useRecoilValue(InfoAtom);

  const version = document.getElementsByTagName('html')[0].getAttribute('version') || 'Dev';
  return (
    <View>
      <Div className={style.profile}>
        <img src={profile.pic} />
        <div>
          <span>{profile.name}</span>
          <span>{profile.group}</span>
        </div>
      </Div>
      <Div className={style.developers}>
        <h3>Разработчики</h3>
        <ul>
          {developers.map((developer) => (
            <li className={style.developer} key={developer.subname}>
              <img src={developer.image} />
              <div>
                <h4>{developer.name}</h4>
                <span>{developer.subname}</span>
              </div>
            </li>
          ))}
        </ul>
      </Div>
      <Div className={style.version}>
        <span>Client: {version}</span>
        <span>Server: {serverVersion}</span>
      </Div>
    </View>
  );
}
