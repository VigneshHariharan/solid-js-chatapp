import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerMessageObject = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MessageObject, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly message?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMessageObject = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MessageObject, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly message?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type MessageObject = LazyLoading extends LazyLoadingDisabled ? EagerMessageObject : LazyMessageObject

export declare const MessageObject: (new (init: ModelInit<MessageObject>) => MessageObject) & {
  copyOf(source: MessageObject, mutator: (draft: MutableModel<MessageObject>) => MutableModel<MessageObject> | void): MessageObject;
}