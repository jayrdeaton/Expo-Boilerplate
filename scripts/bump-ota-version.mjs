/* eslint-disable no-console */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const configPath = path.resolve(__dirname, '../src/constants/config.ts')

const source = fs.readFileSync(configPath, 'utf8')
const pattern = /(otaVersion:\s*)(\d+)/
const match = source.match(pattern)

if (!match) {
  console.error('Could not find otaVersion in src/constants/config.ts')
  process.exit(1)
}

const current = Number.parseInt(match[2], 10)
const next = current + 1
const updated = source.replace(pattern, `$1${next}`)

fs.writeFileSync(configPath, updated)
console.log(`otaVersion bumped: ${current} -> ${next}`)
