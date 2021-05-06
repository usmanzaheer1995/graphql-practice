import { extendType, objectType } from 'nexus';

import { Author } from "./author";
import { Context } from './context';

export interface Book {
  id: string;
  name: string;
  authorId: string;
  author: Author;
}

const Books = objectType({
  name: "Book",
  definition(t) {
    t.id("id"),
    t.string("name"),
    t.string("authorId"),
    t.field("author", {
      type: Author,
      async resolve(parent, args, ctx: Context) {
        return ctx.db.findOne("select * from public.author where id = $1", [parent.authorId]);
      }
    })
  }
});

const BooksQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field('allBooks', {
      type: 'Book',
      resolve: (root, args, ctx: Context) => {
        return ctx.db.find("select * from public.books");
      }
    })
  },
});

export default [
  Books,
  BooksQuery
];
