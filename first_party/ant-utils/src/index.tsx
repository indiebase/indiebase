import type {
  BaseProFieldFC,
  ProFieldFCMode,
  ProFieldFCRenderProps,
  ProRenderFieldPropsType,
} from '@ant-design/pro-provider';
import { arrayMoveImmutable } from './array-move';
import { DropdownFooter } from './components/DropdownFooter';
import { ErrorBoundary } from './components/ErrorBoundary';
import { FieldLabel } from './components/FieldLabel';
import { FilterDropdown } from './components/FilterDropdown';
import { InlineErrorFormItem } from './components/InlineErrorFormItem';
import { LabelIconTip } from './components/LabelIconTip';
import type { ProFormInstanceType } from './components/ProFormContext';
import { ProFormContext } from './components/ProFormContext';
import { conversionMomentValue, convertMoment, dateFormatterMap } from './conversionMomentValue';
import { dateArrayFormatter } from './dateArrayFormatter';
import { genCopyable } from './genCopyable';
import { getFieldPropsOrFormItemProps } from './getFieldPropsOrFormItemProps';
/** Hooks */
import { useDebounceFn } from './hooks/useDebounceFn';
import { useDebounceValue } from './hooks/useDebounceValue';
import { useDeepCompareEffect, useDeepCompareEffectDebounce } from './hooks/useDeepCompareEffect';
import { useDocumentTitle } from './hooks/useDocumentTitle';
import type { ProRequestData } from './hooks/useFetchData';
import { useFetchData } from './hooks/useFetchData';
import { useLatest } from './hooks/useLatest';
import { usePrevious } from './hooks/usePrevious';
import { useRefFunction } from './hooks/useRefFunction';
import { isBrowser } from './isBrowser';
import { isDeepEqualReact } from './isDeepEqualReact';
import { isDropdownValueType } from './isDropdownValueType';
import { isImg } from './isImg';
import { isNil } from './isNil';
import { isUrl } from './isUrl';
import { merge } from './merge';
import { nanoid } from './nanoid';
import { omitBoolean } from './omitBoolean';
import { omitUndefined } from './omitUndefined';
import { omitUndefinedAndEmptyArr } from './omitUndefinedAndEmptyArr';
import { parseValueToDay } from './parseValueToMoment';
import { pickProFormItemProps } from './pickProFormItemProps';
import { pickProProps } from './pickProProps';
import { runFunction } from './runFunction';
import { transformKeySubmitValue } from './transformKeySubmitValue';
import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import {
  lighten,
  operationUnit,
  resetComponent,
  setAlpha,
  useStyle,
} from '@ant-design/pro-provider';
/** Type */
import type {
  ProCoreActionType,
  ProFieldProps,
  ProFieldRequestData,
  ProFieldTextType,
  ProFieldValueEnumType,
  ProFieldValueObjectType,
  ProFieldValueType,
  ProFieldValueTypeWithFieldProps,
  ProSchema,
  ProSchemaComponentTypes,
  ProSchemaValueEnumMap,
  ProSchemaValueEnumObj,
  ProSchemaValueType,
  ProTableEditableFnType,
  RequestOptionsType,
  SearchConvertKeyFn,
  SearchTransformKeyFn,
} from './typing';
import type {
  RowEditableConfig,
  RowEditableType,
  UseEditableType,
  UseEditableUtilType,
} from './useEditableArray';
import { editableRowByKey, recordKeyToString, useEditableArray } from './useEditableArray';
import type { UseEditableMapType, UseEditableMapUtilType } from './useEditableMap';
import { useEditableMap } from './useEditableMap';
import { useMountMergeState } from './useMountMergeState';
import { compareVersions } from './compareVersions';
import { openVisibleCompatible } from './compareVersions/openVisibleCompatible';
import { menuOverlayCompatible } from './compareVersions/menuOverlayCompatible';

export type {
  SearchConvertKeyFn,
  ProAliasToken,
  GenerateStyle,
  RequestOptionsType,
  ProSchema,
  ProFormInstanceType,
  ProFieldValueTypeWithFieldProps,
  ProSchemaValueType,
  ProCoreActionType,
  ProSchemaComponentTypes,
  ProSchemaValueEnumMap,
  ProSchemaValueEnumObj,
  SearchTransformKeyFn,
  ProTableEditableFnType,
  RowEditableConfig,
  RowEditableType,
  ProRequestData,
  ProFieldRequestData,
  UseEditableType,
  UseEditableUtilType,
  UseEditableMapType,
  UseEditableMapUtilType,
  ProFieldValueType,
  ProRenderFieldPropsType,
  ProFieldFCRenderProps,
  ProFieldFCMode,
  BaseProFieldFC,
  ProFieldTextType,
  ProFieldValueEnumType,
  ProFieldValueObjectType,
  ProFieldProps,
};
export {
  LabelIconTip,
  ProFormContext,
  isDeepEqualReact,
  FilterDropdown,
  menuOverlayCompatible,
  FieldLabel,
  arrayMoveImmutable,
  InlineErrorFormItem,
  DropdownFooter,
  ErrorBoundary,
  dateFormatterMap,
  // function
  transformKeySubmitValue,
  conversionMomentValue as conversionSubmitValue,
  conversionMomentValue,
  convertMoment,
  parseValueToDay,
  genCopyable,
  useDocumentTitle,
  isImg,
  omitBoolean,
  isNil,
  merge,
  isDropdownValueType,
  omitUndefined,
  omitUndefinedAndEmptyArr,
  pickProFormItemProps,
  isUrl,
  isBrowser,
  pickProProps,
  runFunction,
  getFieldPropsOrFormItemProps,
  dateArrayFormatter,
  openVisibleCompatible,
  nanoid,
  editableRowByKey,
  recordKeyToString,
  compareVersions,
  // hooks
  useEditableArray,
  useEditableMap,
  useRefFunction,
  useDeepCompareEffect,
  usePrevious,
  useDebounceFn,
  useMountMergeState,
  useFetchData,
  useDeepCompareEffectDebounce,
  useLatest,
  useDebounceValue,
  useStyle,
  setAlpha,
  resetComponent,
  operationUnit,
  lighten,
};
