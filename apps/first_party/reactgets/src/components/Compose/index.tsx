import { type FC, type PropsWithChildren, cloneElement } from 'react';

export interface ComposeProps extends PropsWithChildren {
  providers: Array<React.ReactElement>;
}

/**
 *
 * @example
 * ```tsx
 *  const providers: ComposeProps['providers'] = [
 *    <MantineProvider />,
 *    <QueryClientProvide  client={queryClient} />,
 *  ]
 *
 *  <Compose providers={providers}>
 *     Hello
 *  </Compose>
 * ```
 */
export const Compose: FC<ComposeProps> = function (props) {
  const { providers, children } = props;

  return providers.reduceRight(
    (acc, Provider) => cloneElement(Provider, null, acc),
    children,
  );
};
