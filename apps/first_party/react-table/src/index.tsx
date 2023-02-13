import * as React from 'react';
import {
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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
import {
  IconCaretDown,
  IconCaretUp,
  IconChevronDown,
  IconChevronUp,
} from '@tabler/icons';
import { FC } from 'react';

interface TableProps<T = any> {
  mantineTableProps?: MantineTableProps;
  columns: ColumnDef<T, any>[];
  data: T[];
  title?: string;
  globalFilter?: boolean;
  defaultShowCount?: number;
}

export const Table = function <P extends unknown>(props: TableProps<P>) {
  const { mantineTableProps, columns, data, title } = props;
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const theme = useMantineTheme();

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      columnOrder,
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    debugAll: process.env.NODE_ENV === 'development',
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
        <Group mb="md">
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
            data={Array.from({ length: 10 }).map((_, index) => {
              const val = ((index + 1) * 10).toString();
              return {
                value: val,
                label: val,
              };
            })}
          />
        </Group>
        <MantineTable
          captionSide="bottom"
          striped
          highlightOnHover
          withBorder
          withColumnBorders
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
                          {header.column.getCanFilter() && <div></div>}
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
            page={table.getState().pagination.pageIndex}
            onChange={table.setPageIndex}
            total={10}
            radius="lg"
            styles={(theme) => ({
              item: {
                float: 'right',
                fontSize: 14,
              },
            })}
          />
          <Group ml="md" spacing="xs">
            <Input size="xs" style={{ width: 50 }} placeholder="page" />
            <Button
              radius="lg"
              size="xs"
              type="submit"
              variant="gradient"
              gradient={theme.other.buttonGradient}
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
  defaultShowCount: 20,
};

/* <div className="inline-block border border-black shadow rounded">
        <div className="px-1 border-b border-black">
          <label>
            <input
              {...{
                type: 'checkbox',
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              }}
            />{' '}
            Toggle All
          </label>
        </div>
        {table.getAllLeafColumns().map((column) => {
          return (
            <div key={column.id} className="px-1">
              <label>
                <input
                  {...{
                    type: 'checkbox',
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />{' '}
                {column.id}
              </label>
            </div>
          );
        })}
      </div> */
