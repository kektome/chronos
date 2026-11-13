// Usage: node scripts/hash-password.mjs <password>
// Prints an ADMIN_PASSWORD_HASH value: scrypt:<N>:<r>:<p>:<salt>:<hash> (base64url).
// No "$" characters, so Next's env expansion and docker compose leave it intact.
import { randomBytes, scryptSync } from "node:crypto"

const password = process.argv[2]
if (!password) {
  console.error("Usage: node scripts/hash-password.mjs <password>")
  process.exit(1)
}

const N = 16384,
  r = 8,
  p = 1,
  keylen = 64
const salt = randomBytes(16)
const hash = scryptSync(password.normalize("NFKC"), salt, keylen, { N, r, p })

console.log(
  `scrypt:${N}:${r}:${p}:${salt.toString("base64url")}:${hash.toString("base64url")}`
)
