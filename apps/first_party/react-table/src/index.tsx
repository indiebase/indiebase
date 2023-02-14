import * as React from 'react';
import {
  ColumnFiltersState,
  ColumnOrderState,
  FilterFn,
  FilterMeta,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import {
  Box,
  Table as MantineTable,
  TableProps as MantineTableProps,
  Pagination,
  Select,
  Title,
  Group,
  Input,
  useMantineTheme,
  Button,
} from '@mantine/core';
import { IconCaretDown, IconCaretUp } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { Filter } from './Filter';
import { RightToolbar } from './RightToolbar';

interface TableProps<T = any> {
  mantineTableProps?: MantineTableProps;
  columns: ColumnDef<T, any>[];
  data: T[];
  title?: string;
  globalFilter?: boolean;
  defaultPageSize?: number;
  onChangePagination?: OnChangeFn<PaginationState>;
  pagination?: PaginationState;
  total: number;
  onRequestFilter?: (p: T) => void;
}

export const Table = function <P extends unknown>(props: TableProps<P>) {
  const {
    mantineTableProps,
    columns,
    data,
    title,
    defaultPageSize,
    onRequestFilter,
    onChangePagination,
    pagination,
    total,
  } = props;
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pageSize, setPageSize] = useState<string>(defaultPageSize + '');
  const [pageIndex, setPageIndex] = useState<number>();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState('');

  const theme = useMantineTheme();


  React.forwardRef

  useEffect(() => {
    const p = {};
    for (const col of columnFilters) {
      p[col.id] = col.value;
    }
    onRequestFilter(p as any);
  }, [columnFilters]);

  const table = useReactTable({
    data,
    columns,
    pageCount: total ?? -1,
    state: {
      columnVisibility,
      columnOrder,
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
    // globalFilterFn: onRequestFilter,
    onPaginationChange: onChangePagination,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    // debugAll: process.env.NODE_ENV === 'development',
  });

  return (
    <>
      <Box
        p={30}
        style={{
          width: '100%',
          maxWidth: '100%',
          overflowX: 'auto',
          border: '1px solid #0505050f',
          borderRadius: 5,
        }}
      >
        <Group mb="md" style={{ justifyContent: 'space-between' }}>
          <Group>
            {title && (
              <Title mr="xs" order={3}>
                {title}
              </Title>
            )}
            <Select
              size="xs"
              variant="filled"
              style={{ width: 70 }}
              placeholder="show"
              value={pageSize}
              onChange={(v) => {
                setPageSize(v);
                table.setPageSize(parseInt(v));
              }}
              data={Array.from({ length: 10 }).map((_, index) => {
                const val = ((index + 1) * 10).toString();
                return {
                  value: val,
                  label: val,
                };
              })}
            />
          </Group>
          <Group>
            <RightToolbar table={table} />
          </Group>
        </Group>
        <MantineTable
          captionSide="bottom"
          striped
          highlightOnHover
          withBorder
          verticalSpacing="sm"
          {...mantineTableProps}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <span
                          onClick={header.column.getToggleSortingHandler()}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'default',
                            userSelect: 'none',
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}

                          <Box ml="xs" style={{ width: 16, height: 16 }}>
                            {
                              {
                                asc: <IconCaretDown size={16} />,
                                desc: <IconCaretUp size={16} />,
                              }[header.column.getIsSorted() as string]
                            }
                          </Box>
                          {header.column.getCanFilter() && (
                            <Filter column={header.column} table={table} />
                          )}
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </MantineTable>
        <br />
        <Group position="center">
          <Pagination
            page={table.getState().pagination.pageIndex + 1}
            onChange={(page) => {
              table.setPageIndex(page - 1);
            }}
            total={table.getPageCount()}
            radius="lg"
            styles={() => ({
              item: {
                float: 'right',
                fontSize: 14,
              },
            })}
          />
          <Group ml="md" spacing="xs">
            <Input
              size="xs"
              type="number"
              style={{ width: 50 }}
              placeholder="page"
              onChange={(e) => setPageIndex(parseInt(e.target.value))}
            />
            <Button
              radius="lg"
              size="xs"
              type="submit"
              variant="gradient"
              gradient={theme.other.buttonGradient}
              onClick={() =>
                pageIndex <= table.getPageCount() &&
                pageIndex > 0 &&
                table.setPageIndex(pageIndex - 1)
              }
            >
              Go to
            </Button>
          </Group>
        </Group>
      </Box>
    </>
  );
};

Table.defaultProps = {
  globalFilter: true,
  defaultPageSize: 20,
};
