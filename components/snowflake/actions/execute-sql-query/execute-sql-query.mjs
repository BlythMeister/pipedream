import snowflake from "../../snowflake.app.mjs";

export default {
  name: "Execute Query",
  version: "0.0.1",
  key: "snowflake-execute-sql-query",
  description: "Execute a custom Snowflake query. See [our docs](https://pipedream.com/docs/databases/working-with-sql) to learn more about working with SQL in Pipedream.",
  type: "action",
  props: {
    snowflake,
    // eslint-disable-next-line pipedream/props-description
    sql: {
      type: "sql",
      auth: {
        app: "snowflake",
      },
      label: "SQL Query",
    },
  },
  run() {
    return this.snowflake.collectRows({
      sqlText: this.sql.query,
      binds: this.sql.params,
    });
  },
};
