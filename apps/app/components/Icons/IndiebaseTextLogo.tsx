import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { type FC } from 'react';

export const IndiebaseEnvTextLogo: FC<unknown> = () => {
  const env = process.env.NEXT_PUBLIC_RELEASE_ENV;
  const pathname = usePathname();
  const isBackend = pathname.includes('backend');
  let alt: string;
  switch (env) {
    case 'development':
      alt = 'Indiebase DEV';
      break;
    case 'canary':
      alt = 'Indiebase Canary';
      break;
    case 'beta':
      alt = 'Indiebase Beta';
      break;
    case 'production':
    default:
      alt = 'Indiebase';
      break;
  }
  const name1 = isBackend ? '-backend' : '',
    name2 = env === 'production' || !env ? '' : '-' + env;

  return (
    <Image
      priority
      width={isBackend ? 210 : 170}
      height={isBackend ? 61.1 : 49.46}
      src={`/text-logo${name1}${name2}.svg`}
      alt={alt}
    />
  );
};
