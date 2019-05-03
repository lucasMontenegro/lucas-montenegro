import React, { Fragment } from "react"

function languageLinkFactory (location, locales) {
  return language => ({
    key: language,
    location: `/${language}/i++`,
    text: locales[language].name,
  })
}

export default {
  english: {
    name: `English`,
    international (location) {
      return `/english/counter`
    },
    match (location) {
      return /^\/english\/counter\/?/.test(location.pathname)
    },
    languageLinkFactory,
    render: {
      title: `Counter`,
      renderText: count => (
        <Fragment>
          Time since you loaded the website: {count} seconds.
        </Fragment>
      ),
    },
  },
  español: {
    name: `Español`,
    international (location) {
      return `/español/contador`
    },
    match (location) {
      return /^\/español\/contador\/?/.test(location.pathname)
    },
    languageLinkFactory,
    render: {
      title: `Contador`,
      renderText: count => (
        <Fragment>
          Tiempo desde que cargaste la página: {count} segundos.
        </Fragment>
      ),
    },
  },
}
