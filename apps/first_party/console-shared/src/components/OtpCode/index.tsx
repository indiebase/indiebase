import { Group, GroupProps, Input, InputProps } from '@mantine/core';
import { useState, useRef, useEffect, FC } from 'react';

export interface OptCodeProps {
  value: string;
  onChange: (e) => void;
  count?: number;
  rule?: RegExp;
  autoComplete?: string;
  autoFocus?: boolean;
  separator?: any;
  inputProps?: InputProps;
  groupProps?: GroupProps;
  [key: string]: any;
}

const getDefaultValues = (length, inputValues) => {
  if (length < 1) return [];
  return Array.from({ length }, (_, i) => inputValues[i] || '');
};

const isValid = (regex, value) => regex.test(value);

const nextValue = function (newValues, currentValues, setFocusInput) {
  for (let [i, element] of newValues.entries()) {
    if (!element || i === currentValues.length - 1) {
      setFocusInput(i);
      break;
    }
  }
};

export const OtpCode: FC<OptCodeProps> = function (props) {
  const {
    value,
    onChange,
    count,
    rule,
    autoComplete,
    autoFocus,
    separator,
    groupProps,
    inputProps,
  } = props;
  const defaultValues = getDefaultValues(count, value.split(''));
  const [values, setValues] = useState(defaultValues);
  const [focusInput, setFocusInput] = useState(autoFocus ? 0 : null);
  const ref = useRef([]);

  useEffect(() => {
    setValues(defaultValues);
  }, [value, count]);

  useEffect(() => {
    const input = ref.current[focusInput];
    !!input && input.focus();
  }, [focusInput]);

  const handleChange = (inputValue, index) => {
    if (!!rule && !isValid(rule, inputValue)) return;
    const newValues = [...values];

    let j = 0;
    values.forEach((item, i) => {
      if (!item && !!inputValue) {
        newValues[i] = inputValue.split('')[!values[index] ? j : j + 1] || '';
        j++;
      } else if (!!item && index === i && !inputValue) {
        newValues[i] = '';
      }
    });

    if (inputValue) {
      nextValue(newValues, values, setFocusInput);
    }

    onChange(newValues.join(''));
  };

  const onKeyPressed = (key, index) => {
    switch (key) {
      case 'Backspace':
      case 'ArrowLeft':
        return setFocusInput(index - 1);
      case 'ArrowRight':
        return setFocusInput(index + 1);
      default:
        return;
    }
  };

  return (
    <Group {...groupProps}>
      {values.map((item, index) => (
        <Input
          key={index}
          style={{ width: 36, height: 36 }}
          ref={(item) => (ref.current[index] = item)}
          value={item}
          onChange={(e) => handleChange(e.target.value, index)}
          aria-required="true"
          autoComplete={index === 0 ? autoComplete : 'off'}
          onKeyDown={({ key }) => onKeyPressed(key, index)}
          {...inputProps}
        />
      ))}
    </Group>
  );
};

OtpCode.defaultProps = {
  count: 6,
  autoComplete: 'off',
  autoFocus: false,
};
