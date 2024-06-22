import { EyeOutlined, EyeSlashOutlined } from 'icons';
import { useTera } from 'lib';
import React, {
  ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useState,
} from 'react';
import Input, { InputProps } from '.';
export interface VisibilityToggle {
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}
export interface InputPasswordProps extends InputProps {
  iconRender?: (visible: boolean) => ReactNode;
  visibilityToggle?: VisibilityToggle;
}

const defaultIconRender = (visible: boolean): React.ReactNode =>
  visible ? (
    <EyeOutlined className="stroke-2" />
  ) : (
    <EyeSlashOutlined className="stroke-2" />
  );

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  (props, ref) => {
    const {
      placeholder = 'Làm ơn nhập mật khẩu',
      className,
      iconRender = defaultIconRender,
      visibilityToggle,
      ...restProps
    } = props;
    const visibilityControlled =
      typeof visibilityToggle === 'object' &&
      visibilityToggle.visible !== undefined;
    const [visible, setVisible] = useState(() =>
      visibilityControlled ? visibilityToggle.visible! : false,
    );
    const toggleVisiblePassword = () => {
      const { disabled } = props;
      if (disabled) return;

      setVisible((prevState) => {
        const newState = !prevState;
        if (typeof visibilityToggle === 'object') {
          visibilityToggle.onVisibleChange?.(newState);
        }
        return newState;
      });
    };

    useEffect(() => {
      if (visibilityControlled) {
        setVisible(visibilityToggle.visible!);
      }
    }, [visibilityControlled, visibilityToggle]);

    function getIcon() {
      const icon = iconRender(visible);
      return cloneElement(isValidElement(icon) && icon);
    }

    const { is_verify } = useTera();
    if (!is_verify) return null;

    return (
      <Input
        type={visible ? 'text' : 'password'}
        ref={ref}
        suffixProps={{
          onClick: toggleVisiblePassword,
          className:
            'cursor-pointer text-gray-600 disabled:cursor-not-allowed disabled:hover:text-gray-600 hover:text-gray-900 pointer-events-auto',
        }}
        suffix={<i className="w-4 h-4">{getIcon()}</i>}
        className={className}
        placeholder={placeholder}
        {...restProps}
      />
    );
  },
);

export default InputPassword;
