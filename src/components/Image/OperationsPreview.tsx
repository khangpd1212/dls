import { ChevronLeftOutlined, ChevronRightOutlined } from 'icons';
import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { customTwMerge } from 'tailwind-merge.config';

type OperationsPreviewProps = {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  lastIndexImage: number;
  showOperations: boolean;
};
const OperationsPreview = forwardRef<HTMLDivElement, OperationsPreviewProps>(
  ({ current, setCurrent, lastIndexImage, showOperations }, ref) => {
    const disabledBtnClasses = 'opacity-40 cursor-not-allowed';
    const btnClasses = customTwMerge(
      'fixed inset-y-1/2 z-[101] flex items-center justify-center w-10 h-10 -mt-5 text-white -translate-y-1/2 cursor-pointer transition-all select-none',
    );

    const prevImage = () => {
      if (current === 0) return;
      setCurrent(current - 1);
    };
    const nextImage = () => {
      if (current === lastIndexImage) return;
      setCurrent(current + 1);
    };
    return (
      showOperations &&
      createPortal(
        <div className="fixed z-[101]" ref={ref}>
          <div
            className={customTwMerge(
              'start-3',
              btnClasses,
              current === 0 && disabledBtnClasses,
            )}
            onClick={prevImage}
          >
            <ChevronLeftOutlined />
          </div>
          <div
            className={customTwMerge(
              'end-3',
              btnClasses,
              current === lastIndexImage && disabledBtnClasses,
            )}
            onClick={nextImage}
          >
            <ChevronRightOutlined />
          </div>
        </div>,
        document.body,
      )
    );
  },
);

export default OperationsPreview;
