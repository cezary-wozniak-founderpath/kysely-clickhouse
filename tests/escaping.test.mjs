import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { test } from 'node:test'
import { Kysely, sql } from 'kysely'

const require = createRequire(import.meta.url)
const { ClickhouseConnection, ClickhouseDialect } = require('../dist/index.js')

// prepareQuery only builds SQL text, so these tests need no ClickHouse server.
const kysely = new Kysely({ dialect: new ClickhouseDialect({ options: { url: 'http://localhost:8123' } }) })
const connection = new ClickhouseConnection({ options: { url: 'http://localhost:8123' } })

const cases = [
  { value: "O'Brien", literal: String.raw`'O\'Brien'` },
  // A backslash before a quote closed the literal when only quotes were escaped.
  { value: String.raw`O\'Brien`, literal: String.raw`'O\\\'Brien'` },
  { value: String.raw`C:\temp\\`, literal: String.raw`'C:\\temp\\\\'` },
  { value: String.raw`{"a":"x\"y"}`, literal: String.raw`'{"a":"x\\"y"}'` },
  // A `?` inside a value is not read as another placeholder.
  { value: 'why? 100%', literal: `'why? 100%'` },
]

for (const { value, literal } of cases) {
  test(`inlines ${value} as ${literal}`, () => {
    const query = kysely.selectFrom('customers').select('id').where('name', '=', value)

    assert.equal(connection.prepareQuery(query.compile()), `select \`id\` from \`customers\` where \`name\` = ${literal}`)
  })
}

test('escapes the parameters of a raw query', () => {
  const query = sql`ALTER TABLE customers DELETE WHERE id = ${String.raw`x\' OR 1 = 1 --`}`

  assert.equal(
    connection.prepareQuery(query.compile(kysely)),
    String.raw`ALTER TABLE customers DELETE WHERE id = 'x\\\' OR 1 = 1 --'`,
  )
})

test('keeps numbers bare and other values as quoted JSON', () => {
  const query = sql`SELECT ${42}, ${null}, ${true}`

  assert.equal(connection.prepareQuery(query.compile(kysely)), `SELECT 42, 'null', 'true'`)
})
