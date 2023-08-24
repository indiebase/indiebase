import Image from 'next/image';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: {
    template: '%s | Indiebase',
    default: 'Indiebase',
  },
  description: 'Indiebase',
};

export default function Home() {
  return <main></main>;
}
