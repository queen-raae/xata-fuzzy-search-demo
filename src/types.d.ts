import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";
declare const tables: readonly [
  {
    readonly name: "accounts";
    readonly columns: readonly [
      {
        readonly name: "meta";
        readonly type: "object";
        readonly columns: readonly [
          {
            readonly name: "created_at";
            readonly type: "datetime";
          },
          {
            readonly name: "location";
            readonly type: "string";
          },
          {
            readonly name: "description";
            readonly type: "text";
          },
          {
            readonly name: "profile_image_url";
            readonly type: "string";
          },
          {
            readonly name: "url";
            readonly type: "string";
          }
        ];
      },
      {
        readonly name: "name";
        readonly type: "string";
      },
      {
        readonly name: "username";
        readonly type: "string";
      },
      {
        readonly name: "public_metrics";
        readonly type: "object";
        readonly columns: readonly [
          {
            readonly name: "followers_count";
            readonly type: "int";
          },
          {
            readonly name: "following_count";
            readonly type: "int";
          },
          {
            readonly name: "tweet_count";
            readonly type: "int";
          },
          {
            readonly name: "listed_count";
            readonly type: "int";
          }
        ];
      },
      {
        readonly name: "calculated_metrics";
        readonly type: "object";
        readonly columns: readonly [
          {
            readonly name: "average_tweets_per_year";
            readonly type: "int";
          },
          {
            readonly name: "years_on_twitter";
            readonly type: "int";
          }
        ];
      },
      {
        readonly name: "followed_by";
        readonly type: "string";
      },
      {
        readonly name: "unfollowed";
        readonly type: "datetime";
      },
      {
        readonly name: "hidden";
        readonly type: "datetime";
      },
      {
        readonly name: "last";
        readonly type: "datetime";
      },
      {
        readonly name: "accountId";
        readonly type: "string";
      }
    ];
  }
];
export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;
export type Accounts = InferredTypes["accounts"];
export type AccountsRecord = Accounts & XataRecord;
export type DatabaseSchema = {
  accounts: AccountsRecord;
};
declare const DatabaseClient: any;
export declare class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions);
}
export declare const getXataClient: () => XataClient;
export declare const xataWorker: any;
export {};
