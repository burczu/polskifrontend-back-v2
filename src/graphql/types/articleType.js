import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import GraphQLDate from 'graphql-date';
import { BlogType } from './blogType';

export const ArticleType = new GraphQLObjectType({
  name: 'Article',
  description: 'Article item type.',
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    href: { type: GraphQLString },
    description: { type: GraphQLString },
    summary: { type: GraphQLString },
    date: { type: GraphQLDate },
    slug: { type: GraphQLString },
    _blog: { type: BlogType }
  })
});
