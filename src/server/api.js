import express from "express"
import todo from "lib/todo/router"
const api = express.Router()
api.use(`/todo`, todo)
export default api