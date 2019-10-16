import createApp from "new/local/paperbase/createApp"
import makeTranslations from "new/local/utils/makeTranslations"
import routing from "new/local/ui/routing"
import logo from "new/local/ui/logo"
import home from "new/local/home"
import notFound from "new/local/notFound"
export default createApp({
  name: `main`,
  routing,
  logo,
  clients: {
    home: home(routing),
    notFound: notFound(routing),
  },
  titles: makeTranslations(() => `Lucas Montenegro`),
})