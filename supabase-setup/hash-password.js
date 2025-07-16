const bcrypt = require("bcryptjs")

async function hashPassword() {
  const password = "admin123"
  const saltRounds = 10
  const hash = await bcrypt.hash(password, saltRounds)
  console.log("Password hash:", hash)
}

hashPassword()
