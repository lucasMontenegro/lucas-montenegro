import Translation from "lib/Translation"
import { useRoute } from "lib/react/routing/context"
const translation = new Translation({
  en: { title: `Not Found` },
  es: { title: `No Encontrado` },
})
export default function NotFound () {
  if (useRoute().render.notFound) {
    return translation.get().title
  }
  return null
}