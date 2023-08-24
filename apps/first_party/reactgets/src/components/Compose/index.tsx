import {
  createElement,
  type FC,
  type PropsWithChildren,
  type ReactHTML,
  type ReactSVG,
  type FunctionComponent,
  type ClassicComponent,
  type ClassType,
  type ComponentClass,
} from 'react';

type CreateElementType =
  | 'input'
  | keyof ReactHTML
  | keyof ReactSVG
  | string
  | FunctionComponent<any>
  | ClassicComponent<any>
  | ClassType<any, any, any>
  | ComponentClass<any>;

export interface ComposeProps extends PropsWithChildren {
  providers: ([CreateElementType, Record<string, any>] | [CreateElementType])[];
}

/**
 *
 * @example
 * ```tsx
 *  const providers: ComposeProps['providers'] = [
 *    [MantineProvider],
 *    [QueryClientProvider, { client: queryClient }],
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
    (acc, [Provider, props]) => createElement(Provider, props, acc),
    children,
  );
};
