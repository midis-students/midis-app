import React from 'react';
import View from '../../../../components/View';
import { Api } from '../../../../lib/api';

import style from './style.module.scss';

const regex = /(\#\!NGINXNMS\!\#(.+?)\#\!NGINXNME\!\#)/g;

const modules: Record<string, (params: any) => void> = {
  im: (params) => {
    console.log(params);
  },
};

export default function ChatView() {
  const socketRef = React.useRef<WebSocket>();

  React.useEffect(() => {
    const connect = async () => {
      const wsurl = await Api.websocket();
      const socket = new WebSocket(wsurl);

      socketRef.current = socket;

      socket.onopen = () => {
        console.log('Connected');
      };

      socket.onmessage = ({ data }) => {
        const events = data.toString().matchAll(regex);

        for (let event of events) {
          const json = JSON.parse(event[2]);
          const module: string = json.text.module_id;
          if (module in modules) {
            modules[module](json.text.params);
          } else {
            console.log(`Unknown module`, module);
            console.log(json);
          }
        }
      };

      socket.onclose = (e) => {
        console.error(e);
      };
    };

    if (socketRef.current === undefined) {
      connect();
    }

    return () => {
      socketRef.current?.close();
      socketRef.current = undefined;
    };
  }, []);

  return (
    <View>
      <h1>Чата не будет</h1>
    </View>
  );
}
