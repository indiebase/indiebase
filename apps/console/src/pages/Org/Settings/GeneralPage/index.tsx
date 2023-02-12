import { Table } from '@letscollab-react/table';
import { createColumnHelper } from '@tanstack/react-table';
import { Suspense } from 'react';

// const countAtom = atom(1);
// const derivedAtom = atom(
//   (get) => get(countAtom),
//   (get, set, action: any) => {
//     if (action === 'a') {
//       set(countAtom, 10);
//     } else if (action === 'b') {
//       set(countAtom, (c) => c + 1);
//     }

//     const a = get(countAtom);
//     const b = get(countAtom);
//     console.log()
//     console.log(get(countAtom));
//     console.log(a, '===============');
//   },
// );

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor('firstName', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header(value) {
      console.log(value);
      return <span>FirstName</span>;
    },
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: 'lastName',
    cell: (info) => <i>{info.getValue()}</i>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('visits', {
    header: () => <span>Visits</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',

    footer: (info) => info.column.id,
  }),
];

export const GeneralPage = function (props) {
  return (
    <Suspense>
      <Table<Person> columns={columns} data={[]}></Table>
    </Suspense>
  );
};
