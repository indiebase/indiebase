﻿---
title: DragSortTable - 拖动排序表格
group:
  path: /
nav:
  title: 组件
  path: /components
---

# DragSortTable - 拖动排序表格

`DragSortTable`排序采用的[react-sortable-hoc](https://www.npmjs.com/package/react-sortable-hoc)，需要提供`rowKey`来确定数据的唯一值，否则不能正常工作。暂不支持`request`请求的数据进行排序，可将`request`请求的数据存起来通过`dataSource`传入。

## Demo

### 拖拽排序

<code src="./demos/drag.tsx" background="#f5f5f5" height="437px" title="拖拽排序"/>

### 拖拽排序编辑表格

<code src="./demos/drag-sort-table.tsx" background="#f5f5f5" height="697px" title="可编辑表格"/>

## API

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dragSortKey | 如配置此参数，则会在该 key 对应的行显示拖拽排序把手，允许拖拽排序 | `any` | - |
| dragSortHandlerRender | 渲染自定义拖动排序把手的函数 如配置了 dragSortKey 但未配置此参数，则使用默认把手图标 | `(rowData: T, idx: number) => React.ReactNode` | `<MenuOutlined className="dragSortDefaultHandle" style={{ cursor: 'grab', color: '#999' }} />` |
| onDragSortEnd | 拖动排序完成回调 | `(newDataSource: T[]) => Promise<void> \| void` | - |
