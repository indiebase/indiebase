import React, { DOMAttributes, FC, MouseEventHandler, useEffect } from 'react';
import { useId, useUncontrolled } from '@mantine/hooks';
import {
  BoxProps,
  Combobox,
  ComboboxLikeStylesNames,
  ComboboxProps,
  ElementProps,
  Factory,
  InputBase,
  OptionsFilter,
  Pill,
  PillsInput,
  StylesApiProps,
  __BaseInputProps,
  __CloseButtonProps,
  __InputStylesNames,
  extractStyleProps,
  factory,
  getOptionsLockup,
  getParsedComboboxData,
  useCombobox,
  useProps,
  useResolvedStylesApi,
  useStyles,
} from '@mantine/core';
import { filterPickedValues } from './filter-picked-values';
import {
  OptionsData,
  OptionsDropdown,
} from '../Select/OptionsDropdown/OptionsDropdown';

export interface ComboboxItem {
  value: string;
  label: string;
  disabled?: boolean;
  [k: string]: any;
}

export type MultiSelectStylesNames =
  | __InputStylesNames
  | ComboboxLikeStylesNames
  | 'pill'
  | 'pillsList'
  | 'inputField';

export interface ComboboxItemGroup {
  group: string;
  items: (ComboboxItem | string)[];
}
export interface ComboboxParsedItemGroup {
  group: string;
  items: ComboboxItem[];
}
export type ComboboxData = (string | ComboboxItem | ComboboxItemGroup)[];

export interface ComboboxLikeProps {
  /** Data used to generate options */
  data?: ComboboxData;
  /** Controlled dropdown opened state */
  dropdownOpened?: boolean;
  /** Uncontrolled dropdown initial opened state */
  defaultDropdownOpened?: boolean;
  /** Called when dropdown opens */
  onDropdownOpen?: () => void;
  /** Called when dropdown closes */
  onDropdownClose?: () => void;
  /** Determines whether the first option should be selected when value changes, `false` by default */
  selectFirstOptionOnChange?: boolean;
  /** Called when option is submitted from dropdown with mouse click or `Enter` key */
  onOptionSubmit?: (value: string) => void;
  /** Props passed down to `Combobox` component */
  comboboxProps?: ComboboxProps;
  /** Function based on which items are filtered and sorted */
  filter?: OptionsFilter;
  /** Maximum number of options displayed at a time, `Infinity` by default */
  limit?: number;
  /** Determines whether the options should be wrapped with `ScrollArea.AutoSize`, `true` by default */
  withScrollArea?: boolean;
  /** `max-height` of the dropdown, only applicable when `withScrollArea` prop is `true`, `250` by default */
  maxDropdownHeight?: number | string;
}

export interface MultiSelectProps
  extends BoxProps,
    __BaseInputProps,
    ComboboxLikeProps,
    StylesApiProps<MultiSelectFactory>,
    ElementProps<'input', 'size' | 'value' | 'defaultValue' | 'onChange'> {
  /** Controlled component value */
  value?: string[];

  /** Default value for uncontrolled component */
  defaultValue?: string[];

  /** Called whe value changes */
  onChange?: (value: string[]) => void;

  /** Controlled search value */
  searchValue?: string;

  /** Default search value */
  defaultSearchValue?: string;

  /** Called when search changes */
  onSearchChange?: (value: string) => void;

  /** Maximum number of values, `Infinity` by default */
  maxValues?: number;

  /** Determines whether the select should be searchable, `false` by default */
  searchable?: boolean;

  /** Message displayed when no option matched current search query, only applicable when `searchable` prop is set */
  nothingFoundMessage?: React.ReactNode;

  /** Determines whether check icon should be displayed near the selected option label, `true` by default */
  withCheckIcon?: boolean;

  /** Position of the check icon relative to the option label, `'left'` by default */
  checkIconPosition?: 'left' | 'right';

  /** Determines whether picked options should be removed from the options list, `false` by default */
  hidePickedOptions?: boolean;

  /** Determines whether the clear button should be displayed in the right section when the component has value, `false` by default */
  clearable?: boolean;

  /** Props passed down to the clear button */
  clearButtonProps?: __CloseButtonProps & ElementProps<'button'>;

  /** Props passed down to the hidden input */
  hiddenInputProps?: React.ComponentPropsWithoutRef<'input'>;

  itemComponent?: FC<any>;

  getCreateLabel?(query: string): React.ReactNode;

  creatable?: boolean;
}

export type MultiSelectFactory = Factory<{
  props: MultiSelectProps;
  ref: HTMLInputElement;
  stylesNames: MultiSelectStylesNames;
}>;

const defaultProps: Partial<MultiSelectProps> = {
  maxValues: Infinity,
  withCheckIcon: true,
  checkIconPosition: 'left',
};

export const MultiSelect = factory<MultiSelectFactory>((_props, ref) => {
  const props = useProps('MultiSelect', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    size,
    value,
    defaultValue,
    onChange,
    onKeyDown,
    variant,
    data,
    dropdownOpened,
    defaultDropdownOpened,
    onDropdownOpen,
    onDropdownClose,
    selectFirstOptionOnChange,
    onOptionSubmit,
    comboboxProps,
    filter,
    limit,
    withScrollArea,
    maxDropdownHeight,
    searchValue,
    defaultSearchValue,
    onSearchChange,
    readOnly,
    disabled,
    onFocus,
    onBlur,
    onPaste,
    radius,
    rightSection,
    rightSectionWidth,
    rightSectionPointerEvents,
    rightSectionProps,
    leftSection,
    leftSectionWidth,
    leftSectionPointerEvents,
    leftSectionProps,
    inputContainer,
    inputWrapperOrder,
    withAsterisk,
    labelProps,
    descriptionProps,
    errorProps,
    wrapperProps,
    description,
    label,
    error,
    maxValues,
    searchable,
    nothingFoundMessage,
    withCheckIcon,
    checkIconPosition,
    hidePickedOptions,
    withErrorStyles,
    name,
    form,
    id,
    clearable,
    clearButtonProps,
    hiddenInputProps,
    placeholder,
    itemComponent,
    getCreateLabel,
    creatable,
    ...others
  } = props;

  const _id = useId(id);
  const parsedData = getParsedComboboxData(data);
  const optionsLockup = getOptionsLockup(parsedData);

  const combobox = useCombobox({
    opened: dropdownOpened,
    defaultOpened: defaultDropdownOpened,
    onDropdownOpen,
    onDropdownClose: () => {
      onDropdownClose?.();
      combobox.resetSelectedOption();
    },
  });

  const {
    styleProps,
    rest: { type, ...rest },
  } = extractStyleProps(others);

  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: [],
    onChange,
  });

  const [_searchValue, setSearchValue] = useUncontrolled({
    value: searchValue,
    defaultValue: defaultSearchValue,
    finalValue: '',
    onChange: onSearchChange,
  });

  const getStyles = useStyles<MultiSelectFactory>({
    name: 'MultiSelect',
    classes: {} as any,
    props,
    classNames,
    styles,
    unstyled,
  });

  const { resolvedClassNames, resolvedStyles } =
    useResolvedStylesApi<MultiSelectFactory>({
      props,
      styles,
      classNames,
    });

  const handleInputKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);

    if (
      event.key === 'Backspace' &&
      _searchValue.length === 0 &&
      _value.length > 0
    ) {
      setValue(_value.slice(0, _value.length - 1));
    }
  };

  const values = _value.map((item, index) => (
    <Pill
      key={`${item}-${index}`}
      withRemoveButton={!readOnly}
      onRemove={() => setValue(_value.filter((i) => item !== i))}
      unstyled={unstyled}
      {...getStyles('pill')}
    >
      {optionsLockup[item]?.label || item}
    </Pill>
  ));

  useEffect(() => {
    if (selectFirstOptionOnChange) {
      combobox.selectFirstOption();
    }
  }, [selectFirstOptionOnChange, _value]);

  const clearButton = clearable &&
    _value.length > 0 &&
    !disabled &&
    !readOnly && (
      <Combobox.ClearButton
        size={size as string}
        {...clearButtonProps}
        onClear={() => {
          setValue([]);
          setSearchValue('');
        }}
      />
    );

  const filteredData = filterPickedValues({ data: parsedData, value: _value });

  return (
    <>
      <Combobox
        store={combobox}
        classNames={resolvedClassNames}
        styles={resolvedStyles}
        unstyled={unstyled}
        size={size}
        readOnly={readOnly}
        __staticSelector="MultiSelect"
        onOptionSubmit={(val) => {
          onOptionSubmit?.(val);
          setSearchValue('');
          combobox.updateSelectedOptionIndex('selected');

          if (_value.includes(optionsLockup[val].value)) {
            setValue(_value.filter((v) => v !== optionsLockup[val].value));
          } else if (_value.length < maxValues!) {
            setValue([..._value, optionsLockup[val].value]);
          }
        }}
        {...comboboxProps}
      >
        <Combobox.DropdownTarget>
          <PillsInput
            {...styleProps}
            __staticSelector="MultiSelect"
            classNames={resolvedClassNames}
            styles={resolvedStyles}
            unstyled={unstyled}
            size={size}
            className={className}
            style={style}
            variant={variant}
            disabled={disabled}
            radius={radius}
            rightSection={
              rightSection ||
              clearButton || (
                <Combobox.Chevron
                  size={size}
                  error={error}
                  unstyled={unstyled}
                />
              )
            }
            rightSectionPointerEvents={
              rightSectionPointerEvents || clearButton ? 'all' : 'none'
            }
            rightSectionWidth={rightSectionWidth}
            rightSectionProps={rightSectionProps}
            leftSection={leftSection}
            leftSectionWidth={leftSectionWidth}
            leftSectionPointerEvents={leftSectionPointerEvents}
            leftSectionProps={leftSectionProps}
            inputContainer={inputContainer}
            inputWrapperOrder={inputWrapperOrder}
            withAsterisk={withAsterisk}
            labelProps={labelProps}
            descriptionProps={descriptionProps}
            errorProps={errorProps}
            wrapperProps={wrapperProps}
            description={description}
            label={label}
            error={error}
            multiline
            withErrorStyles={withErrorStyles}
            __stylesApiProps={{ ...props, multiline: true }}
            pointer={!searchable}
            onClick={() =>
              searchable ? combobox.openDropdown() : combobox.toggleDropdown()
            }
            id={_id}
          >
            <Pill.Group
              disabled={disabled}
              unstyled={unstyled}
              {...getStyles('pillsList')}
            >
              {values}
              <Combobox.EventsTarget>
                <PillsInput.Field
                  {...rest}
                  ref={ref}
                  id={_id}
                  placeholder={placeholder}
                  type={!searchable && !placeholder ? 'hidden' : 'visible'}
                  {...getStyles('inputField')}
                  unstyled={unstyled}
                  onFocus={(event) => {
                    onFocus?.(event);
                    searchable && combobox.openDropdown();
                  }}
                  onBlur={(event) => {
                    onBlur?.(event);
                    combobox.closeDropdown();
                    searchable && combobox.closeDropdown();
                    setSearchValue('');
                  }}
                  onKeyDown={handleInputKeydown}
                  value={_searchValue}
                  onChange={(event) => {
                    setSearchValue(event.currentTarget.value);
                    searchable && combobox.openDropdown();
                    selectFirstOptionOnChange && combobox.selectFirstOption();
                  }}
                  disabled={disabled}
                  readOnly={readOnly || !searchable}
                  pointer={!searchable}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.DropdownTarget>

        <OptionsDropdown
          creatable={creatable}
          itemComponent={itemComponent}
          data={hidePickedOptions ? filteredData : parsedData}
          getCreateLabel={getCreateLabel}
          hidden={readOnly || disabled}
          filter={filter}
          search={_searchValue}
          limit={limit}
          hiddenWhenEmpty={
            !searchable ||
            !nothingFoundMessage ||
            (!creatable &&
              hidePickedOptions &&
              filteredData.length === 0 &&
              _searchValue.trim().length === 0)
          }
          withScrollArea={withScrollArea}
          maxDropdownHeight={maxDropdownHeight}
          filterOptions={searchable}
          value={_value}
          checkIconPosition={checkIconPosition}
          withCheckIcon={withCheckIcon}
          nothingFoundMessage={nothingFoundMessage}
          unstyled={unstyled}
          labelId={`${_id}-label`}
        />
      </Combobox>
      <input
        type="hidden"
        name={name}
        value={_value.join(',')}
        form={form}
        disabled={disabled}
        {...hiddenInputProps}
      />
    </>
  );
});

MultiSelect.classes = { ...InputBase.classes, ...Combobox.classes };
MultiSelect.displayName = '@mantine/core/MultiSelect';
