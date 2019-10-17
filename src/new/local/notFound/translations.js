import React from "react"
import supportedLanguages from "new/local/supportedLanguages"
import makeTranslations from "new/local/utils/makeTranslations"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const icon = <FontAwesomeIcon icon={[`far`, `dizzy`]} />
export default {
  subtitles: makeTranslations({
    en: `Not Found`,
    es: `No Encontrado`,
  }),
  icons: makeTranslations(() => icon),
  messages: {
    default: supportedLanguages.reduce((messages, languageCode) => {
      messages[languageCode] = messages[languageCode].map((text, i) => ({
        key: `${languageCode}${i}`,
        text,
      }))
      return messages
    }, makeTranslations({
      en: [
        `Broken links redirect to this page.`,
        `There is nothing to show you right now.`,
      ],
      es: [
        `Los links inservibles redirigen a esta página.`,
        `Por ahora no hay nada para mostrar.`,
      ],
    })),
    error: makeTranslations({
      en: `Couldn't find the page you where looking for:`,
      es: `No se pudo encontrar la página solicitada:`,
    }),
  },
  links: {
    close: makeTranslations({
      en: `Close`,
      es: `Cerrar`,
    }),
    home: makeTranslations({
      en: `Home`,
      es: `Inicio`,
    }),
  },
}