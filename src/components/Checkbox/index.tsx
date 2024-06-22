import { ForwardRefExoticComponent, RefAttributes } from 'react';
import InternalCheckbox from './Checkbox';
import CheckboxGroup from './Group';
import type { CheckboxProps } from './interface';

type CompoundedComponent = ForwardRefExoticComponent<
  CheckboxProps & RefAttributes<HTMLInputElement>
> & {
  Group: typeof CheckboxGroup;
};

const Checkbox = InternalCheckbox as CompoundedComponent;
Checkbox.Group = CheckboxGroup;
if (process.env.NODE_ENV !== 'production') {
  Checkbox.displayName = 'Checkbox';
}

export default Checkbox;
