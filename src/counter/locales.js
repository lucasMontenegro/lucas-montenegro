import React, { Fragment } from "react"

function languageLinkFactory (language, location) {
  return `/${language}/i++`
}

export default {
  english: {
    localize (location) {
      return `/english/counter`
    },
    match (location) {
      return /^\/english\/counter\/?/.test(location.pathname)
    },
    frameProps: {
      title: `Counter`,
      languageLinkFactory,
    },
    render: {
      textJsx: count => (
        <Fragment>
          Time since you loaded the website: {count} seconds.
        </Fragment>
      ),
    },
  },
  español: {
    localize (location) {
      return `/español/contador`
    },
    match (location) {
      return /^\/español\/contador\/?/.test(location.pathname)
    },
    frameProps: {
      title: `Contador`,
      languageLinkFactory,
    },
    render: {
      textJsx: count => (
        <Fragment>
          Tiempo desde que cargaste la página: {count} segundos.
        </Fragment>
      ),
    },
  },
}
