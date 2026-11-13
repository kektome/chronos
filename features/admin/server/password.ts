import "server-only"

import { scrypt, timingSafeEqual, type ScryptOptions } from "node:crypto"

// Verifies against the format produced by scripts/hash-password.mjs:
// scrypt:<N>:<r>:<p>:<salt>:<hash> (salt and hash are base64url)

function scryptAsync(
  password: string,
  salt: Buffer,
  keylen: number,
  options: ScryptOptions
) {
  return new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, keylen, options, (err, key) =>
      err ? reject(err) : resolve(key)
    )
  })
}

export async function verifyPassword(password: string, stored: string) {
  const [algorithm, n, r, p, salt, hash] = stored.split(":")
  if (algorithm !== "scrypt" || !n || !r || !p || !salt || !hash) {
    throw new Error("ADMIN_PASSWORD_HASH is not a valid scrypt hash.")
  }

  const expected = Buffer.from(hash, "base64url")
  const derived = await scryptAsync(
    password.normalize("NFKC"),
    Buffer.from(salt, "base64url"),
    expected.length,
    { N: Number(n), r: Number(r), p: Number(p) }
  )

  return timingSafeEqual(derived, expected)
}
