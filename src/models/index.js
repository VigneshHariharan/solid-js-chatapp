// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { MessageObject } = initSchema(schema);

export {
  MessageObject
};