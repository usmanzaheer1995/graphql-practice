import { extendType, nonNull, objectType, queryType, stringArg } from 'nexus';
import { Context } from './context';

export interface Author {
  id: string;
  name: string;
}

export const Author = objectType({
  name: "Author",
  definition(t) {
    t.id("id"),
    t.string("name")
  }
});

export const AuthorQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field('allAuthors', {
      type: 'Author',
      resolve: (parent, args, ctx: Context) => {
        return ctx.db.find("select * from public.author");
      },
    })
  },
});

export default [
  Author,
  AuthorQuery
];
