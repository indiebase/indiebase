import React, { type FC, MouseEventHandler } from 'react';
import cx from 'clsx';

import {
  defaultOptionsFilter,
  type FilterOptionsInput,
} from './default-options-filter';
import { isEmptyComboboxData } from './is-empty-combobox-data';
import { isOptionsGroup } from './is-options-group';
import { validateOptions } from './validate-options';
import {
  Box,
  CheckIcon,
  Combobox,
  type ComboboxItem,
  type ComboboxParsedItem,
  ScrollArea,
} from '@mantine/core';
// import classes from '../Combobox.module.css';

const classes = Combobox.Option.classes;

export type OptionsFilter = (input: FilterOptionsInput) => ComboboxParsedItem[];

export interface OptionsGroup {
  group: string;
  items: ComboboxItem[];
}

export type OptionsData = (ComboboxItem | OptionsGroup)[];

interface OptionProps {
  data: ComboboxItem | OptionsGroup;
  withCheckIcon?: boolean;
  value?: string | string[] | null;
  checkIconPosition?: 'left' | 'right';
  unstyled: boolean | undefined;
  itemComponent?: FC<any>;
}

function isValueChecked(
  value: string | string[] | undefined | null,
  optionValue: string,
) {
  return Array.isArray(value)
    ? value.includes(optionValue)
    : value === optionValue;
}

function Option({
  data,
  withCheckIcon,
  value,
  checkIconPosition,
  unstyled,
  itemComponent,
}: OptionProps) {
  if (!isOptionsGroup(data)) {
    const check = withCheckIcon && isValueChecked(value, data.value) && (
      <CheckIcon className={classes.optionsDropdownCheckIcon} />
    );

    return (
      <Combobox.Option
        value={data.value}
        disabled={data.disabled}
        className={cx({
          [classes.optionsDropdownOption]: !unstyled,
        })}
        data-reverse={checkIconPosition === 'right' || undefined}
        data-checked={isValueChecked(value, data.value) || undefined}
        aria-selected={isValueChecked(value, data.value)}
      >
        {itemComponent ? (
          React.createElement(itemComponent, data)
        ) : (
          <>
            {checkIconPosition === 'left' && check}
            {data.label}
            {checkIconPosition === 'right' && check}
          </>
        )}
      </Combobox.Option>
    );
  }

  const options = data.items.map((item) => (
    <Option
      data={item}
      value={value}
      key={item.value}
      unstyled={unstyled}
      withCheckIcon={withCheckIcon}
      checkIconPosition={checkIconPosition}
    />
  ));

  return <Combobox.Group label={data.group}>{options}</Combobox.Group>;
}

export interface OptionsDropdownProps {
  data: OptionsData;
  filter: OptionsFilter | undefined;
  search: string | undefined;
  limit: number | undefined;
  withScrollArea: boolean | undefined;
  maxDropdownHeight: number | string | undefined;
  hidden?: boolean;
  hiddenWhenEmpty?: boolean;
  filterOptions?: boolean;
  withCheckIcon?: boolean;
  value?: string | string[] | null;
  checkIconPosition?: 'left' | 'right';
  nothingFoundMessage?: React.ReactNode;
  unstyled: boolean | undefined;
  labelId: string;
  itemComponent?: FC<any>;
  creatable?: boolean;
  getCreateLabel?(query: string): React.ReactNode;
  onCreate?(query: string): OptionsData | string | null | undefined;
}

export function OptionsDropdown({
  data,
  hidden,
  hiddenWhenEmpty,
  filter,
  search,
  limit,
  maxDropdownHeight,
  withScrollArea = true,
  filterOptions = true,
  withCheckIcon = false,
  value,
  checkIconPosition,
  nothingFoundMessage,
  unstyled,
  labelId,
  itemComponent,
  creatable = false,
  getCreateLabel,
}: OptionsDropdownProps) {
  validateOptions(data);

  const shouldFilter = typeof search === 'string';
  const filteredData = shouldFilter
    ? (filter || defaultOptionsFilter)({
        options: data,
        search: filterOptions ? search : '',
        limit: limit ?? Infinity,
      })
    : data;
  const isEmpty = isEmptyComboboxData(filteredData);

  const options = filteredData.map((item) => (
    <Option
      itemComponent={itemComponent}
      data={item}
      key={isOptionsGroup(item) ? item.group : item.value}
      withCheckIcon={withCheckIcon}
      value={value}
      checkIconPosition={checkIconPosition}
      unstyled={unstyled}
    />
  ));

  return (
    <Combobox.Dropdown hidden={hidden || (hiddenWhenEmpty && isEmpty)}>
      <Combobox.Options labelledBy={labelId}>
        {withScrollArea ? (
          <ScrollArea.Autosize
            mah={maxDropdownHeight ?? 220}
            type="scroll"
            scrollbarSize="var(--_combobox-padding)"
            offsetScrollbars="y"
            className={classes.optionsDropdownScrollArea}
          >
            {options}
          </ScrollArea.Autosize>
        ) : (
          options
        )}

        {isEmpty && nothingFoundMessage && (
          <Combobox.Empty>{nothingFoundMessage}</Combobox.Empty>
        )}
        {creatable && filteredData.length < 1 && (
          <Box className={classes.option}>
            {typeof getCreateLabel === 'function' && getCreateLabel(search!)}
          </Box>
        )}
      </Combobox.Options>
    </Combobox.Dropdown>
  );
}
