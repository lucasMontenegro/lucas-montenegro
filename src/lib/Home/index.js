import Translation from "lib/Translation"
import { useRoute } from "lib/react/routing/context"
const translation = new Translation({
  en: { title: `Home` },
  es: { title: `Inicio` },
})
export default function Home () {
  if (useRoute().render.home) {
    return translation.get().title
  }
  return null
}