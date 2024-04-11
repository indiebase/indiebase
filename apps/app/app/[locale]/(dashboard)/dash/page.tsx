import { redirect } from 'next/navigation';

import { UnknownError } from '~/app/Errors';

export default function Home() {
  // redirect('/dash');

  throw new UnknownError();

  return (
    <div>
      <h1>Hello!</h1>
    </div>
  );
}
