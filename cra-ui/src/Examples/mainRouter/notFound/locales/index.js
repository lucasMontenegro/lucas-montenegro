import en from "./en"
import es from "./es"

export default {
  render: {
    en: en.render,
    es: es.render,
  },
  exports: {
    en: en.exports,
    es: es.exports,
  },
}
