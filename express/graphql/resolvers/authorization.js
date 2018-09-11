import { ForbiddenError } from 'apollo-server-express';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.');

export const isMessageOwner = async (parent, {id},{models, me},) => {
  const message = await models.message.findById(id);

  if(message.user !== me.id) {
    throw new ForbiddenError('Not authenticated as owner');
  }

  return skip;
}
