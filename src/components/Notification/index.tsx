import { forwardRef, useImperativeHandle } from 'react';
import { createRoot } from 'react-dom/client';
import { ArgsProps, NotificationInstance } from './interface';
import useNotification from './useNotification';

interface BaseMethods {
  open: (config: ArgsProps) => void;
  destroy: (key?: React.Key) => void;
  useNotification: typeof useNotification;
}
type StaticFn = (config: ArgsProps) => void;
interface NoticeMethods {
  success: StaticFn;
  warning: StaticFn;
  error: StaticFn;
}

let notification: GlobalNotification | null = null;

const act: (callback: VoidFunction) => Promise<void> | void = (
  callback: VoidFunction,
) => callback();

interface GlobalNotification {
  fragment: DocumentFragment;
  instance?: NotificationInstance | null;
}

type Task =
  | {
      type: 'open';
      config: ArgsProps;
    }
  | {
      type: 'destroy';
      key: React.Key;
    };

let taskQueue: Task[] = [];

interface GlobalHolderRef {
  instance: NotificationInstance;
}

const GlobalHolder = forwardRef<GlobalHolderRef, Record<string, unknown>>(
  (_, ref) => {
    const [api, holder] = useNotification();

    useImperativeHandle(ref, () => {
      const instance: NotificationInstance = { ...api };

      Object.keys(instance).forEach((method: keyof NotificationInstance) => {
        instance[method] = (...args: any[]) => {
          return (api as any)[method](...args);
        };
      });

      return {
        instance,
      };
    });

    return <>{holder}</>;
  },
);

function flushNotice() {
  if (!notification) {
    const holderFragment = document.createDocumentFragment();

    const newNotification: GlobalNotification = {
      fragment: holderFragment,
    };

    notification = newNotification;

    // Delay render to avoid sync issue
    act(() => {
      createRoot(holderFragment).render(
        <GlobalHolder
          ref={(node) => {
            const { instance } = node || {};

            Promise.resolve().then(() => {
              if (!newNotification.instance && instance) {
                newNotification.instance = instance;
                flushNotice();
              }
            });
          }}
        />,
      );
    });

    return;
  }

  // Notification not ready
  if (!notification.instance) {
    return;
  }

  // >>> Execute task
  taskQueue.forEach((task) => {
    // eslint-disable-next-line default-case
    switch (task.type) {
      case 'open': {
        act(() => {
          notification!.instance!.open({
            ...task.config,
          });
        });
        break;
      }

      case 'destroy':
        act(() => {
          notification?.instance!.destroy(task.key);
        });
        break;
    }
  });

  // Clean up
  taskQueue = [];
}

function open(config: ArgsProps) {
  taskQueue.push({
    type: 'open',
    config,
  });
  flushNotice();
}
function destroy(key: React.Key) {
  taskQueue.push({
    type: 'destroy',
    key,
  });
  flushNotice();
}
const methods: (keyof NoticeMethods)[] = ['success', 'warning', 'error'];
const baseStaticMethods: BaseMethods = {
  open,
  useNotification,
  destroy,
};
const staticMethods = baseStaticMethods as NoticeMethods & BaseMethods;
methods.forEach((type: keyof NoticeMethods) => {
  staticMethods[type] = (config) => open({ ...config, type });
});
export default staticMethods;
