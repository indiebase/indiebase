<img width="800" src="https://user-images.githubusercontent.com/45007226/226185397-b8be4abb-18e9-450d-94cf-31f443091f0a.png"/>

## Note Bene

1. Only support fastify; PR welcome.
2. @vercel/ncc. Please add `ncc build ./src/main.ts -o dist -m && cp -r ./node_modules/@indiebase/nest-stoplight-elements/views .`

## New features.

This library depends on the forked [stoplight-elements](https://github.com/Nawbc/elements), and provides some new features.

- Upload multiple files.

## Usage

```ts
const app = await NestFactory.create<NestFastifyApplication>(
  TestModule,
  new FastifyAdapter(),
);
const options = new DocumentBuilder()
  .setTitle('indiebase REST API')
  .setDescription('Stoplight Elements Test API ')
  .build();

const doc = SwaggerModule.createDocument(app, options, {
  include: [TestModule],
});

await StoplightElementsModule.setup('/docs', app, doc, {
  logo: 'https://user-images.githubusercontent.com/45007226/220814748-96ec88ec-673d-4d38-abae-dce7d7c6695f.png',
});

app.listen(3000);
```

## Options

- favicon - Website favicon.
- auth - Authorization handler

```ts
auth(req) {
  return req['Authorization'];
},
```

---

- apiDescriptionUrl - OpenAPI document URL, supporting http://, https://, and - documents containing $ref to other http(s) documents.
- apiDescriptionDocument - OpenAPI document, provided as YAML string, JSON string, or JavaScript object.
- basePath - Helps when using router: 'history' but docs are in a subdirectory like https://example.com/docs/api.
- hideInternal - Pass "true" to filter out any content which has been marked as internal with x-internal.
- hideTryIt - Pass true to hide the Try It feature.
- hideSchemas - Pass true to hide the schemas in the Table of Contents, when using the sidebar layout.
- hideExport - Pass true to hide the Export button on overview section of the documentation.
- tryItCorsProxy - Pass the URL of a CORS proxy used to send requests to the Try It feature. The provided URL is pre-pended to the URL of an actual request.
- tryItCredentialPolicy - Use to fetch the credential policy for the Try It feature. Options are: omit (default), include, and same-origin.
- layout - There are two layouts for Elements:
  - sidebar - (default) Three-column design with a sidebar that can be resized.
  - stacked - Everything in a single column, making integrations with existing websites that have their own sidebar or other columns already.
- logo - URL to an image that displays as a small square logo next to the title, above the table of contents.
- router - Determines how navigation should work:
  - hash - uses the hash portion of the URL to keep the UI in sync with the URL.
  - memory - keeps the history of your "URL" in memory (doesn't read or write to the address bar).

<a href="https://www.zhihu.com/people/mrno-64" target="_blank" rel="noopener noreferrer">
<img width="30" src="https://user-images.githubusercontent.com/45007226/239428136-92080c5b-7d02-4218-b264-e87c633f092a.png" alt="Han zhihu" /></a>
