import globals from "lib/utils/globals"
export default function embedForm (hash, height) {
  try {
    // Wufoo API v3
    const form = new globals.window.WufooForm()
    form.initialize({
      userName: `lucasok`,
      formHash: hash,
      autoResize: true,
      height,
      async: true,
      host: `wufoo.com`,
      header: `show`,
      ssl: true,
    })
    form.display()
  } catch (e) {
    throw e
  }
}