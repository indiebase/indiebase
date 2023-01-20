---
title: Modal/DrawerForm
group:
  path: /
nav:
  title: Components
  path: /components
---

# Modal/DrawerForm - Floating Forms

ModalForm and DrawerForm are a variant of ProForm, which is still a form in essence. So you can't customize the footer with `footer`, if you want to define the footer you need to use `submitter.render` to customize it. These two forms behave like ProForm and can be modified directly from ProForm.

ModalForm and DrawerForm both provide triggers to reduce state usage, if you need to use state control you can use `open` and `onOpenChange` to control opening and closing.

## Modal Forms

<code src="./demos/modal-form.tsx" background="#f5f5f5" height="32px" title="Modal Forms"></code>

## Drawer Forms

<code src="./demos/drawer-form.tsx" background="#f5f5f5" height="32px" title="Drawer Forms"></code>

## Nested Drawer Forms

<code src="./demos/drawer-form-nested.tsx" debug background="#f5f5f5" height="32px" title="Drawer Forms"></code>

## Custom Modal Forms' Button

<code src="./demos/modal-form-submitter.tsx" background="#f5f5f5" height="32px" title="Custom Modal Forms' Button"></code>

## Use open and onOpenChange

<code src="./demos/visible-on-visible-change.tsx" background="#f5f5f5" height="32px" title="Use open and onOpenChange"></code>

## Reset Form

<code src="./demos/modal-form-reset.tsx" background="#f5f5f5" height="32px" title="Reset Form"></code>

## API

### ModalForm

ModalForm combines Modal and ProForm to reduce tedious state management.

| Parameters | Description | Type | Default |
| --- | --- | --- | --- |
| trigger | The dom used to trigger the Modal to open, usually the button | `ReactNode` | - |
| open | whether to open | `boolean` | - |
| onOpenChange | trigger when visible changes | `(visible:boolean)=>void` | - |
| modalProps | Modal's props, used in the same way as [antd](https://ant.design/components/modal/). Note: 'visible' is not supported, please use the global visible | [props](https://ant.design/components/modal/#API) | - |
| title | The title of the popup box | `ReactNode` | - |
| width | the width of the popup box | `Number` | - |
| onFinish | Triggered when submitting data, if returns a true, will close the popup and reset the form | `async (values)=>boolean` | - |
| submitTimeout | Disable timeout for the Cancel button when submitting data (ms) | `Number` | - |
| submitter | Submit button configurations in the same way as [ProForm](https://procomponents.ant.design/components/form) | [ProForm](https://procomponents.ant.design/components/form) | - |

### DrawerForm

DrawerForm combines Drawer and ProForm to reduce tedious state management.

| Parameters | Description | Type | Default |
| --- | --- | --- | --- |
| trigger | The dom used to trigger the opening of the Modal, typically the button | `ReactNode` | - |
| open | whether to open | `boolean` | - |
| onOpenChange | trigger when open changes | `(open:boolean)=>void` | - |
| drawerProps | Drawer's props, used in the same way as [antd](https://ant.design/components/drawer/). Note: 'open' is not supported, please use the global open | [props](https://ant.design/components/drawer/#API) | - |
| title | The title of the drawer | `ReactNode` | - |
| width | width of the drawer | `Number` | - |
| onFinish | Triggered when data is submitted. If a true is returned, it will close the drawer and reset the form | `async (values)=>boolean` | - |
| submitTimeout | Disable timeout for the Cancel button when submitting data (ms) | `Number` | - |
