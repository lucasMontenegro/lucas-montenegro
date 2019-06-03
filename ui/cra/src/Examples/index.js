let Examples
if (process.env.NODE_ENV === `production`) {
  Examples = null
} else {
  Examples = require("./Examples").default
}

export default Examples
