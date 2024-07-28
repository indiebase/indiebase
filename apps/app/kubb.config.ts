import { defineConfig } from '@kubb/core';
import { pluginOas } from '@kubb/plugin-oas';
import { pluginFaker } from '@kubb/swagger-faker';
import { pluginTanstackQuery } from '@kubb/swagger-tanstack-query';
import { pluginTs } from '@kubb/swagger-ts';

export default defineConfig({
  input: {
    path: './document.json',
  },
  output: {
    path: './src/gen',
  },
  hooks: {
    done: ['npm run lint'],
  },
  plugins: [
    pluginOas({
      validate: false,
    }),
    pluginTs(),
    pluginTanstackQuery({
      output: {
        path: './src/hooks',
      },
      group: {
        type: 'tag',
        output: './src/hooks/{{tag}}Hooks',
      },
      framework: 'react',
      dataReturnType: 'full',
      mutate: {
        variablesType: 'hook',
        methods: ['post', 'put', 'delete'],
      },
      infinite: {
        queryParam: 'next_page',
        initialPageParam: 0,
        cursorParam: 'nextCursor',
      },
      query: {
        methods: ['get'],
        importPath: '@tanstack/react-query',
      },
      suspense: {},
    }),
    pluginFaker({
      output: {
        path: './src/mocks',
      },
      group: {
        type: 'tag',
        output: './src/mocks/{{tag}}Mocks',
      },
      dateType: 'date',
      unknownType: 'unknown',
      seed: [100],
    }),
  ],
});
