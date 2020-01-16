import createApp from "new/local/paperbase/createApp"
import makeTranslations from "new/local/utils/makeTranslations"
import routing from "new/local/ui/routing"
import logo from "new/local/ui/logo"
import home from "new/local/home"
import notFound from "new/local/notFound"
const appName = `main`
export default createApp({
  name: appName,
  routing,
  logo,
  clients: {
    home: home(appName, routing),
    notFound: notFound(appName, routing),
  },
  titles: makeTranslations(() => `Lucas Montenegro`),
})