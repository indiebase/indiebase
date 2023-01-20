---
title: ProTable
order: 0
legacy: /table
group:
  path: /
nav:
  title: Components
  path: /components
---

# ProTable - Advanced Tables

ProTable was created to solve the problem of having to write a lot of sample code for tables in a project, so a lot of common logic was encapsulated in it. These wrappers can be simply categorized as pre-defined behaviors and pre-defined logic.

Thanks to ProForm's capabilities, ProForm can take many forms, switch between query form types, set up deformations to become a simple Form form, perform new creation, etc.

![layout
](https://gw.alipayobjects.com/zos/antfincdn/Hw%26ryTueTW/bianzu%2525204.png)

## When to Use

When your forms need to interact with the server or need multiple cell styles, ProTable is the right choice.

## Code Demo

### Querying a table

<code src="./demos/single.tsx" background="#f5f5f5" height="500px"></code>

<code src="./demos/dataSource.tsx" background="#f5f5f5" height="500px" debug></code>

### Downgrade to a normal table

<code src="./demos/normal.tsx" background="#f5f5f5" height="400px"></code>

### Lightweight filter replacement query form

<code src="./demos/lightfilter.tsx" background="#f5f5f5" height="400px"></code>

### Forms without ToolBar

<code src="./demos/no-title.tsx" height="350px"></code>

### Nested tables

<code src="./demos/table-nested.tsx" background="#f5f5f5" height="400px"></code>

### Left and right structure

<code src="./demos/split.tsx" background="#f5f5f5" height="500px"></code>

### Batch manipulation of tables

<code src="./demos/batchOption.tsx" background="#f5f5f5" height="420px"></code>

### Manipulating query forms with formRef

<code src="./demos/form.tsx" background="#f5f5f5" height="320px"></code>

### RTL (النسخة العربية)

RTL means right-to-left.

<code src="./demos/rtl_table.tsx" background="#f5f5f5" height="500px"></code>

### Controlled table settings columns

You can hide some columns by default, but in the action column you can select

<code src="./demos/columnsStateMap.tsx" background="#f5f5f5" height="300px"></code>

### Tables polling network data

<code src="./demos/pollinga.tsx" background="#f5f5f5" height="360px"></code>

### Search form customization

When the built-in form items don't meet our basic needs, we need to customize the default components, which we can use with `fieldProps` and `renderFormItem`.

`fieldProps` can pass the props through and set the select style and multi-select issues.

`renderFormItem` does the rewriting logic, passing in item and props for rendering, but note that we have to assign `value` and `onChange` to the props, otherwise the form won't get the parameters.

```tsx | pure
renderFormItem: (_, { type, defaultRender, formItemProps, fieldProps, . .rest }, form) => {
  if (type === 'form') {
    return null;
  }
  const status = form.getFieldValue('state');
  if (status ! == 'open') {
    return <Input {... .fieldProps} placeholder="Please enter test" />;
  }
  return defaultRender(_);
};
```

The definition of `renderFormItem`, the exact value of which can be seen by opening the console.

```tsx | pure
 renderFormItem?: (
    item: ProColumns<T>,
    config: {
      value?: any;
      onChange?: (value: any) => void;
      onSelect?: (value: any) => void;
      type: ProTableTypes;
      defaultRender: (newItem: ProColumns<any>) => JSX.Element | null;
    },
    form: FormInstance,
  ) => JSX.Element | false | null;
```

<code src="./demos/linkage_form.tsx" background="#f5f5f5" height="310px"></code>

### Form action customization

<code src="./demos/search_option.tsx" background="#f5f5f5" height="310px"></code>

### Toolbar Customization

Configure toolbar rendering using the `toolbar` property extension.

<code src="./demos/listToolBar.tsx" background="#f5f5f5" height="450px"></code>

### Required Inquiry Form

Try to use initialValue to solve the problem, required fields are more frustrating

<code src="./demos/open-rules.tsx" height="350px"></code>

### Form body customization

<code src="./demos/renderTable.tsx" background="#f5f5f5" height="500px"></code>

### Internationalization-related configuration

ProTable has built-in support for internationalization, and as a component with a relatively small amount of text, we can implement internationalization ourselves at a low cost.

Here is the full amount of text

```typescript | pure
const enLocale = {
  tableForm: {
    search: 'Query',
    reset: 'Reset',
    submit: 'Submit',
    collapsed: 'Expand',
    expand: 'Collapse',
    inputPlaceholder: 'Please enter',
    selectPlaceholder: 'Please select',
  },
  alert: {
    clear: 'Clear',
  },
  tableToolBar: {
    leftPin: 'Pin to left',
    rightPin: 'Pin to right',
    noPin: 'Unpinned',
    leftFixedTitle: 'Fixed the left',
    rightFixedTitle: 'Fixed the right',
    noFixedTitle: 'Not Fixed',
    reset: 'Reset',
    columnDisplay: 'Column Display',
    columnSetting: 'Settings',
    fullScreen: 'Full Screen',
    exitFullScreen: 'Exit Full Screen',
    reload: 'Refresh',
    density: 'Density',
    densityDefault: 'Default',
    densityLarger: 'Larger',
    densityMiddle: 'Middle',
    densitySmall: 'Compact',
  },
};

// Generate the intl object
const enUSIntl = createIntl('en_US', enUS);
import { ConfigProvider } from '@ant-design/pro-provide';
// use
<ConfigProvider
  value={{
    intl: enUSIntl,
  }}
>
  <ProTable />
</ConfigProvider>;
```

<code src="./demos/intl.tsx" background="#f5f5f5" height="320px"></code>

### Table using self-contained keyWords search

<code src="./demos/search.tsx" background="#f5f5f5" height="200px"></code>

### Value type examples

#### valueType - Date class

<code src="./demos/valueTypeDate.tsx" background="#f5f5f5" height="350px"></code>

#### valueType - numeric class

<code src="./demos/valueTypeNumber.tsx" background="#f5f5f5" height="350px"></code>

#### valueType - Style Classes

<code src="./demos/valueType.tsx" background="#f5f5f5" height="680px"></code>

#### valueType - Selection Classes

<code src="./demos/valueType_select.tsx" background="#f5f5f5" height="462px"></code>

<code src="./demos/config-provider.tsx" debug background="#f5f5f5" height="462px"></code>

## API

ProTable puts a layer of wrapping on top of antd's Table, supports some presets, and encapsulates some behaviors. Only api's that differ from antd Table are listed here.

### request

`request` is the most important API of ProTable, `request` takes an object. The object must have `data` and `success` in it, and `total` is also required if manual paging is needed. `request` takes over the `loading` settings and re-executes them when the query form is queried and the `params` parameters are modified. Also the query form values and `params` parameters are brought in. The following is an example.

```tsx | pure
<ProTable<DataType, Params>
  // params is a parameter that needs to be self-contained
  // This parameter has higher priority and will override the parameters of the query form
  params={params}
  request={async (
    // The first parameter params is the combination of the query form and params parameters
    // The first parameter will always have pageSize and current, which are antd specifications
    params: T & {
      pageSize: number;
      current: number;
    },
    sort,
    filter,
  ) => {
    // Here you need to return a Promise, and you can transform the data before returning it
    // If you need to transform the parameters you can change them here
    const msg = await myQuery({
      page: params.current,
      pageSize: params.pageSize,
    });
    return {
      data: msg.result,
      // Please return true for success.
      // otherwise the table will stop parsing the data, even if there is data
      success: boolean,
      // not passed will use the length of the data, if it is paged you must pass
      total: number,
    };
  }}
/>
```

### ProTable

| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| request | How to get `dataSource` | `(params?: {pageSize,current},sort,filter) => {data,success,total}` | - |
| params | Additional parameters used for `request` query, once changed will trigger reloading | `object` | - |
| postData | Process the data obtained through `request` | `(data: T[]) => T[]` | - |
| defaultData | Default data | `T[]` | - |
| dataSource | Table data, protable recommends using request to load | `T[]` | - |
| onDataSourceChange | Triggered when Table data changes | `(dataSource: T[]) => void` | - |
| actionRef | Reference to Table action for custom triggering | `MutableRefObject<ActionType>` | - |
| formRef | The form instance of the query form can be obtained for some flexible configuration | `MutableRefObject<FormInstance>` | - |
| toolBarRender | Render toolbar, support returning a dom array, will automatically increase margin-right | `(action) => ReactNode[]` | - |
| onLoad | Triggered after the data is loaded, it will be triggered multiple times | `(dataSource: T[]) => void` | - |
| onLoadingChange | Triggered when loading is modified, usually caused by network requests | `(loading:boolean)=>void` | - |
| onRequestError | Triggered when data loading fails | `(error) => void` | - |
| tableClassName | className of the encapsulated table | `string` | - |
| tableStyle | style of the encapsulated table | [CSSProperties](https://www.htmlhelp.com/reference/css/properties.html) | - |
| options | table toolbar, not displayed when set to false | `{{ fullScreen: boolean \| function, reload: boolean \| function,setting: true, density?: boolean }}` | `{ fullScreen: false, reload :true, setting: true}` |
| search | Whether to display the search form, when the object is passed in, it is the configuration of the search form | `false` \| [SearchConfig](#search-search-form) | - |
| dateFormatter | Convert moment format data to a specific type, false will not be converted | `"string"` \| `"number"` \| ((value: Moment, valueType: string) => string \| number) \|`false` | `"string"` |
| defaultSize | Default size | SizeType | - |
| beforeSearchSubmit | Make some changes before searching | `(params:T)=>T` | - |
| onSizeChange | The table size has changed | `(size:'default' \|'middle' \|'small') => void` | - |
| type | pro-table type | `"form"` | - |
| form | antd form configuration | [FormProps](https://ant.design/components/form-cn/#API) | - |
| onSubmit | Triggered when the form is submitted | `(params: U) => void` | - |
| onReset | Triggered when the form is reset | `() => void` | - |
| columnEmptyText | Display when it is empty, display `-` when it is not set, false can turn off this function | `string` \| `false` | false |
| tableRender | Custom rendering table function | `(props,dom,domList:{ toolbar,alert,table}) => ReactNode` | - |
| toolbar | Transparent transmission of `ListToolBar` configuration items | [ListToolBarProps](#listtoolbarprops) | - |
| tableExtraRender | The main function of the custom table | `(props: ProTableProps<T, U>, dataSource: T[]) => ReactNode;` | - |
| manualRequest | Do you need to manually trigger the first request? When configured as `true`, the search form cannot be hidden | `boolean` | false |
| editable | Related configuration of editable table | [TableRowEditable<T>](/components/editable-table#editable-Editable row configuration) | - |
| cardBordered | Border of Card components around Table and Search | `boolean \| {search?: boolean, table?: boolean}` | false |
| debounceTime | Debounce time | `number` | 10 |
| revalidateOnFocus | Automatically re-request when the window is focused | `boolean` | `false` |
| columnsState | Column Status Control, you can operate the display hide | `ColumnsStateType` | - |

#### RecordCreator

| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| record | The row data to be added, generally contains a unique key | `T` | `{}` |
| position | Where does the line increase, start or end | `top` \| `bottom` | `bottom` |
| (...buttonProps) | [ButtonProps](https://ant.design/components/button-cn/#API) of antd | ButtonProps | — |

#### ColumnStateType

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| defaultValue | The default value of the column status, only for the first time | `Record <string, ColumnsState>;` |
| value | Column status, support controlled mode | `Record <string, ColumnsState>;` |
| onChange | Column status After changing | `(value: Record <string, ColumnsState>) => void` |
| PersistenceKey | The key of the persistence column is used to determine if it is the same table | `string \| Number` |
| PersistenceType | The type of persistence column, localStorage is also existing after closing the browser, sessionStorage closes the browser will be lost | `localstorage \| sessionStorage` |

#### Search Search form

| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| filterType | Filter form type | `'query'` \| `'light'` | `'query'` |
| searchText | Search button text | `string` | Search |
| resetText | reset button text | `string` | reset |
| submitText | The text of the submit button | `string` | Submit |
| labelWidth | Label width | `'number'` \| `'auto'` | 80 |
| span | Configure the number of columns in the query form | `'number'` \| [`'ColConfig'`](#ColConfig) | defaultColConfig |
| className | Encapsulated search Form className | `string` | - |
| collapseRender | Collapse button render | `(collapsed: boolean,showCollapseButton?: boolean,) => ReactNode` | - |
| defaultCollapsed | Whether to collapse by default | `boolean` | true |
| collapsed | collapsed | `boolean` | - |
| onCollapse | Collapse button event | `(collapsed: boolean) => void;` | - |
| optionRender | Custom action bar | `((searchConfig,formProps,dom) => ReactNode[])`\|`false` | - |

#### ColConfig

```tsx | pure
const defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6,
};
```

#### Menu bar options configuration

```tsx | pure
export type OptionsType =
  | ((e: React.MouseEvent<HTMLSpanElement>, action?: ActionType) => void)
  | boolean;

export type OptionConfig = {
  density?: boolean;
  fullScreen?: OptionsType;
  reload?: OptionsType;
  setting?: boolean;
  search?: (SearchProps & { name?: string }) | boolean;
};
```

#### ActionRef manually triggered

Sometimes we need to manually trigger the reload of the table and other operations, we can use actionRef, the editable table also provides some operations to help us achieve our requirements faster.

```tsx | pure
interface ActionType {
  reload: (resetPageIndex?: boolean) => void;
  reloadAndRest: () => void;
  reset: () => void;
  clearSelected?: () => void;
  startEditable: (rowKey: Key) => boolean;
  cancelEditable: (rowKey: Key) => boolean;
}

const ref = useRef<ActionType>();

<ProTable actionRef={ref} />;

// refresh
ref.current.reload();

// Refresh and clear, the page number will also be reset, excluding the form
ref.current.reloadAndRest();

// Reset to default values, including forms
ref.current.reset();

// Clear the selected item
ref.current.clearSelected();

// start editing
ref.current.startEditable(rowKey);

// end editing
ref.current.cancelEditable(rowKey);
```

### Columns column definition

> Requesting remote data is more complicated, please see [here](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params) for details.

| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| title | Basically the same as in antd, but supports passing in a method | `ReactNode \| ((config: ProColumnType<T>, type: ProTableTypes) => ReactNode)` | - |
| tooltip | An icon will be displayed after the title, and some information will be prompted after hover | `string` | - |
| ellipsis | Whether to abbreviate automatically | `boolean` | - |
| copyable | Whether to support copying | `boolean` | - |
| valueEnum | The value enumeration will automatically convert the value as a key to retrieve the content to be displayed | [valueEnum](/components/schema#valueenum) | - |
| valueType | The type of value, which will generate different renderers | [`valueType`](/components/schema#valuetype) | `text` |
| order | The weight in the query form, the weight is ranked first | `number` | - |
| fieldProps | The props of the query form will be transparently transmitted to the form item. If it is rendered as Input, all props of input are supported. Similarly, if it is select, all props of select are also supported. Also supports method input | `(form,config)=>Record \| Record` | - |
| `formItemProps` | The configuration passed to Form.Item can be configured with rules, but the default query form rules does not take effect. Need to configure `ignoreRules` | `(form,config)=>formItemProps` \| `formItemProps` | - |
| renderText | Render like table, but must return string. If you just want to convert enumeration, you can use [valueEnum](/components/schema#valueenum) | `(text: any,record: T,index: number,action: UseFetchDataAction<T> ) => string` | - |
| render | Render similar to table, the first parameter becomes dom, and the fourth parameter action is added | `(text: ReactNode,record: T,index: number,action: UseFetchDataAction<T>) => ReactNode \| ReactNode[]` | - |
| renderFormItem | Render the input components of the query form | `(item,{ type, defaultRender, formItemProps, fieldProps, ...rest },form) => ReactNode` | - |
| search | Configuration column search related, false is hidden | `false` \| `{ transform: (value: any) => any }` | true |
| search.transform | The key of the conversion value, generally used for the conversion of the event interval | `(value: any) => any` | - |
| [editable](/components/editable-table) | Whether it is editable in the edit table, the parameters of the function are the same as the render of the table | `false` \| `(text: any, record: T,index: number) => boolean` | true |
| colSize | The number of grids occupied by a form item, `proportion = colSize*span`, `colSize` defaults to 1, `span` is 8, `span` is `form={{span:8}}` global setting Of | `number` | - |
| hideInSearch | Do not show this item in the query form | `boolean` | - |
| hideInTable | Do not show this column in Table | `boolean` | - |
| hideInForm | Do not show this column in Form | `boolean` | - |
| hideInDescriptions | Do not show this column in Descriptions | `boolean` | - |
| filters | The filter menu item in the header. When the value is true, valueEnum is automatically generated | `boolean` \| `object[]` | false |
| onFilter | Filter the form, use the built-in ProTable when it is true, turn off local filtering when it is false | `(value, record) => boolean` \|`false` | false |
| request | Request enumeration from server | [request](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params) | - |
| initialValue | Initial value of query form item | `any` | - |

### valueType value type

ProTable encapsulates some commonly used value types to reduce repeated `render` operations. Configure a [`valueType`](/components/schema#valuetype) to display formatted response data.

### Batch operation

Like antd, batch operations need to be set to "rowSelection" to enable. Unlike antd, pro-table provides an alert to carry some information. You can customize it with `tableAlertRender` and `tableAlertOptionRender`. Set or return false to close.

| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| alwaysShowAlert | Always show alert, no choice not to show by default | `boolean` | - |
| tableAlertRender | Customize the information area on the left side of the batch operation toolbar, not displayed when false | `({ selectedRowKeys: Key[], selectedRows: T[], onCleanSelected: ()=>void }) => ReactNode)`\| `false` | - |
| tableAlertOptionRender | Customize the option area on the right side of the bulk operation toolbar, not displayed when false | `({ selectedRowKeys: Key[], selectedRows: T[], onCleanSelected: ()=>void }) => ReactNode)`\| `false` | - |

### Searching for forms

ProTable will generate a Form for filtering list data based on columns, and the final value will be returned based on the first parameter via `request`, which looks like.

```jsx | pure
<ProTable request={(params,sort,filter)=>{ all params}}>
```

As per the specification, table forms do not require any mandatory parameters, and all clicks on search and reset will trigger a `request` to initiate a query.

Form's columns are generated with different types based on [`valueType`](/components/schema#valuetype).

> Columns with a valueType of index indexBorder option and no dataIndex and key will be ignored.

### ListToolbar

Toolbar section for customizing forms.

#### Code Demo

<code src="./demos/ListToolBar/basic.tsx" background="#f7f8fa"></code>

<code src="./demos/ListToolBar/no-title.tsx" background="#f7f8fa"></code>

<code src="./demos/ListToolBar/multipleLine.tsx" background="#f7f8fa"></code>

<code src="./demos/ListToolBar/tabs.tsx" background="#f7f8fa"></code>

<code src="./demos/ListToolBar/menu.tsx" background="#f7f8fa"></code>

#### ListToolBarProps

Toolbar configuration properties for lists and tables

| Parameters | Description | Type | Default |
| --- | --- | --- | --- |
| title | title | `ReactNode` | - |
| subTitle | subTitle | `ReactNode` | - |
| description | description | `ReactNode` | - |
| search | query area | `ReactNode` \| `SearchProps` | - |
| actions | actions area | `ReactNode[]` | - |
| settings | settings area | `(ReactNode \| Setting)[]` | - |
| filter | The filter area, usually used with `LightFilter` | `ReactNode` | - |
| multipleLine | Whether to display multiple lines | `boolean` | `false` |
| menu | menu configuration | `ListToolBarMenu` | - |
| tabs | Tabs configuration, only valid if `multipleLine` is true | `ListToolBarTabs` | - |

SearchProps is a property of antd's [Input.Search](https://ant.design/components/input/#Input.Search).

#### Setting

| Parameters | Description                 | Type                  | Default |
| ---------- | --------------------------- | --------------------- | ------- |
| icon       | icon                        | `ReactNode`           | -       |
| tooltip    | tooltip Description         | `string`              | -       |
| key        | operation unique identifier | `string`              | -       |
| onClick    | set to be triggered         | `(key: string)=>void` | -       |

#### ListToolBarMenu

| parameters | description                  | type                                  | default    |
| ---------- | ---------------------------- | ------------------------------------- | ---------- |
| type       | type                         | `inline` \| `dropdown` \| `tab`       | `dropdown` |
| activeKey  | current value                | `string`                              | -          |
| items      | menu items                   | `{ key: string; label: ReactNode }[]` | -          |
| onChange   | Callback for switching menus | `(activeKey)=>void`                   | -          |

#### ListToolBarTabs

| parameters | description                      | type                                | default |
| ---------- | -------------------------------- | ----------------------------------- | ------- |
| activeKey  | currently selected item          | `string`                            | -       |
| items      | menu items                       | `{ key: string; tab: ReactNode }[]` | -       |
| onChange   | Callback for toggling menu items | `(activeKey)=>void`                 | -       |
