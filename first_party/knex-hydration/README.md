Inspired by\
https://github.com/mohaalak/nested-knex\
https://github.com/CoursePark/NestHydrationJS

```ts
n.array(
  n.type({
    id: n.number('post.id', { id: true }), //this for each row you should set an id
    title: n.string('post.title'),
    author: n.type({
      id: n.number('author.id', { id: true }),
      name: n.string('author.name'),
      email: n.nullableString('email'),
    }),
    tags: n.array(
      n.type({ id: n.number('tags.id'), label: n.string('tags.title') }),
    ),
  }),
)
  .withQuery(
    knex('post')
      .leftJoin('author', 'author.id', 'post.authorId')
      .leftJoin('tags', 'tags.postId', 'post.id'),
  )
  .then((records) => {
    [
      {
        id: 1,
        title: 'Test',
        author: { id: 1, name: 'Hadi Aliakbar', email: null },
        tags: [{ id: 1, label: 'test' }],
      },
      {
        id: 2,
        title: 'Test2',
        author: {
          id: 2,
          name: 'Mohammad Hadi Aliakbar',
          email: 'hadi.aliakbar@gmail.com',
        },
        tags: [
          { id: 2, label: 'test2' },
          { id: 3, label: 'test3' },
        ],
      },
    ];
  });
```
