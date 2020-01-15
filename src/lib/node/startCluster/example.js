import startCluster from "./index.js"
const t = Math.round(Math.random() * 2000 + 1000)
const id = t.toString()
startCluster(() => {
  console.log(`Hello! (${id})`)
  setTimeout(() => {
    console.log(`Bye! (${id})`)
    process.exit()
  }, t)
})