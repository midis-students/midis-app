import {useEffect, useState} from 'react';
import bridge, {
    AnyRequestMethodName,
    RequestIdProp,
    RequestProps,
    AnyReceiveMethodName,
    ReceiveData,
} from '@vkontakte/vk-bridge';

export default function useBridge<K extends AnyRequestMethodName>(
    method: K,
    props?: RequestProps<K> & RequestIdProp
) {
    const [data, setData] =
        useState<K extends AnyReceiveMethodName ? ReceiveData<K> : void>();
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetch = async () => {
        setIsLoading(true);
        try {
            const data = await bridge.send(method, props);
            setData(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error);
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetch();
    }, []);

    return {data, error, isLoading, fetch};
}