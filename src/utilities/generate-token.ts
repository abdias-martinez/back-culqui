export const generateToken = () => {
    const CHARACTERS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    const TOKEN_LENGTH = 16
    const UNIQUE_SET = new Set()
    let token = ''
  
    while (token.length < TOKEN_LENGTH) {
      const randomIndex = Math.floor(Math.random() * CHARACTERS.length)
      const randomChar = CHARACTERS[randomIndex]
      if (!UNIQUE_SET.has(randomChar)) {
        token += randomChar
        UNIQUE_SET.add(randomChar)
      }
    }
  
    return  token
  }