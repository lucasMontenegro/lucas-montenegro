import pgMinify from "pg-minify"
export default function minifySql (str) {
  return pgMinify(str, { compress: true, removeAll: true })
}