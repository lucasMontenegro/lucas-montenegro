module.exports = () => (
  process.env.NODE_ENV === `production` ? [] :
  [`connect`, `disconnect`, `task`, `transact`, `query`]
)