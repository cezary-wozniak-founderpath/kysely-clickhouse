# @cezary-wozniak-founderpath/kysely-clickhouse

`@founderpath/kysely-clickhouse` 1.6.1, exactly as published to npm, with one fix: string parameters inlined into the SQL now have their backslashes escaped as well as their single quotes. Escaping only the quotes let a value like `O\'Brien` close the string literal early. 1.6.1's TypeScript source isn't in the upstream repository, so this branch (`v1.6.x`) keeps the published `dist/` as its source. The same fix for upstream `main` is [founderpathcom/kysely-clickhouse#8](https://github.com/founderpathcom/kysely-clickhouse/pull/8).

To keep the original import name, install it under an alias:

```bash
npm i @clickhouse/client @founderpath/kysely-clickhouse@npm:@cezary-wozniak-founderpath/kysely-clickhouse@1.6.3
```

---

# @founderpath/kysely-clickhouse

[Kysely](https://github.com/koskimas/kysely) adapter for [Clickhouse](https://clickhouse.com).

```bash
npm i @clickhouse/client @founderpath/kysely-clickhouse
```

This project was largely adapted from [kysely-planetscale](https://github.com/depot/kysely-planetscale). It's a barebone version, there's a lot of improvements that can be done here. 

## Usage

Pass your Clickhouse connection options into the dialect in order to configure the Kysely client. Follow [these docs](https://www.npmjs.com/package/@clickhouse/client) for instructions on how to do so.

```typescript
import { Kysely } from 'kysely';
import { ClickhouseDialect } from '@founderpath/kysely-clickhouse';

interface SomeTable {
  key: string;
  value: string;
}

interface Database {
  some_datasets.some_table: SomeTable
}

const db = new Kysely<Database>({ dialect: new ClickhouseDialect() });
```

