import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import { ArticleResultType } from '../../../types/articleResultType';
import { ArticleType } from '../../../types/articleType';
import { articleResolvers } from './articleResolvers';

export default {
  articles: {
    type: ArticleResultType,
    description: 'List of all articles (with pagination)',
    args: { page: { type: GraphQLNonNull(GraphQLInt) } },
    resolve: articleResolvers.getAll
  },
  articleBySlug: {
    type: ArticleType,
    description: 'Single article got using its slug.',
    args: { slug: { type: GraphQLNonNull(GraphQLString) } },
    resolve: articleResolvers.getBySlug
  }
};
