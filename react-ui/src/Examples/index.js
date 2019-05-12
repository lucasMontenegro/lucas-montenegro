let Examples
if (process.env.NOVE_ENV === `production`) {
  Examples = null
} else {
  Examples = require("./Examples").default
}

export default Examples
