import {
  NotificationAPI as NotificationRcAPI,
  NotificationConfig as NotificationRcConfig,
  useNotification as useRcNotification,
} from 'rc-notification';
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import Notice, { CloseDefaultIcon } from './Notice';
import { ArgsProps, NotificationInstance } from './interface';
import motion from './motion';
export interface NotificationConfig extends NotificationRcConfig {}

const Holder = forwardRef<NotificationRcAPI, NotificationConfig>(
  (props, ref) => {
    const [api, holder] = useRcNotification({
      motion: motion,
      closable: true,
      prefixCls: 'tera-notification',
      duration: 2,
      ...props,
    });
    useImperativeHandle(ref, () => api);
    return holder;
  },
);

const useInternalNotification = (
  notificationConfig?: NotificationConfig,
): readonly [NotificationInstance, React.ReactElement] => {
  const holderRef = useRef<NotificationRcAPI>(null);

  const wrapAPI = useMemo<NotificationInstance>(() => {
    const open = (config: ArgsProps) => {
      const { open: originOpen } = holderRef.current;
      const { duration, closeIcon, type, ...restConfig } = config;

      return originOpen({
        ...restConfig,
        closeIcon: (
          <div className="absolute cursor-pointer top-3 right-4">
            {closeIcon || <CloseDefaultIcon />}
          </div>
        ),
        duration: duration,
        content: <Notice {...config} type={type} />,
      });
    };

    const destroy = (key?: React.Key) => {
      if (key !== undefined) {
        holderRef.current?.close(key);
      } else {
        holderRef.current?.destroy();
      }
    };

    const clone = {
      open,
      destroy,
    } as NotificationInstance;
    const keys = ['success', 'warning', 'error'] as const;
    keys.forEach((type) => {
      clone[type] = (config) =>
        open({
          ...config,
          type,
        });
    });

    return clone;
  }, []);

  return [wrapAPI, <Holder {...notificationConfig} ref={holderRef} />] as const;
};

export default function useNotification(
  notificationConfig?: NotificationConfig,
) {
  return useInternalNotification(notificationConfig);
}
