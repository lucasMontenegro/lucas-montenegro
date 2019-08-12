import { useEffect, useRef, useState } from "react"
import i18n from "local/i18n"
/*
routing = {
  matchRoot,
  locations: {
    home: {
      [languageCode]: location,
    },
    notFound: {
      [languageCode]: location,
    },
  }
  routes: [
    {
      appName,
      languageCode,
      match,
    },
  ],
  languageRoutes: {
    root: [
      {
        languageCode,
        match,
      },
    ],
    notFound: [
      {
        languageCode,
        match,
      },
    ],
  },
}
*/
export default function makeRouter (routing) {
  return function useRouter (location) {
    const [booting, setBooting] = useState(true)
    const languageCode = useRef(`en`)
    useEffect(() => {
      if (i18n.isInitialized) {
        languageCode.current = i18n.language
      } else {
        let booting = true
        const fn = () => {
          languageCode.current = i18n.language
          setBooting(booting = false)
          i18n.off(`initialized`, fn)
        }
        i18n.on(`initialized`, fn)
        return () => {
          booting && i18n.off(`initialized`, fn)
        }
      }
    }, [])
    function changeLanguage (newLanguage) {
      languageCode.current = newLanguage
      i18n.language === newLanguage || i18n.changeLanguage(newLanguage)
      return newLanguage
    }
    if (booting) {
      return { type: `booting` }
    }
    if (routing.matchRoot(location)) {
      return {
        type: `redirect`,
        location: routing.locations.home[languageCode.current],
      }
    }
    {
      const route = routing.routes.find(r => r.match(location))
      if (route) {
        return {
          type: `app`,
          languageCode: changeLanguage(route.languageCode),
          appName: route.appName,
        }
      }
    }
    {
      const route = routing.languageRoutes.root.find(r => r.match(location))
      if (route) {
        return {
          type: `redirect`,
          location: routing.locations.home[changeLanguage(route.languageCode)],
        }
      }
    }
    {
      const route = routing.languageRoutes.notFound.find(r => r.match(location))
      route && changeLanguage(route.languageCode)
    }
    return {
      type: `redirect`,
      location: {
        ...routing.locations.notFound[languageCode.current],
        state: { referrer: location },
      },
    }
  }
}