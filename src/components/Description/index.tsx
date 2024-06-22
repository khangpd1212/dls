import { Col, Row, useTera } from 'lib';
import { ReactNode, forwardRef } from 'react';
import { customTwMerge } from 'tailwind-merge.config';

export interface DescriptionProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  label?: ReactNode;
  labelClassName?: string;
  childrenClassName?: string;
}

const Description = forwardRef<HTMLDivElement, DescriptionProps>(
  ({ children, labelClassName, childrenClassName, label, className }, ref) => {
    const { is_verify } = useTera();
    if (!is_verify) return null;
    return (
      <Row className={customTwMerge('grid-cols-2 mb-2.5', className)} ref={ref}>
        <Col
          className={customTwMerge(
            'font-normal truncate text-xxs text-gray-500',
            labelClassName,
          )}
        >
          {label}
        </Col>
        <Col
          className={customTwMerge(
            'font-normal break-words text-xxs text-gray-800',
            childrenClassName,
          )}
        >
          {children}
        </Col>
      </Row>
    );
  },
);

export default Description;
