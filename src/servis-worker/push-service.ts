import { useRegisterSW } from 'virtual:pwa-register/react';

const intervalMS = 60 * 1000;

export default function PushService() {
  const updateServiceWorker = useRegisterSW({
    onRegistered(r) {
      // r &&
      //   setInterval(() => {
      //     r.update();
      //   }, intervalMS);
    },
  });
  return null;
}
