import React, { useState } from "react"
import { Route, Redirect, Switch } from "react-router-dom"
import { ThemeProvider } from "@material-ui/styles"
import ListItem from "@material-ui/core/ListItem"
import Typography from "@material-ui/core/Typography"
import Drawer from "local/core/Drawer"
import theme from "local/darkTheme"
function DrawerExampleRouter () {
  return (
    <Switch>
      <Redirect
        exact path="/examples/core/drawer"
        to="/examples/core/drawer/example/en/false/false/000000"
      />
      <Route exact path="/examples/core/drawer/target" component={DrawerExampleTarget} />
      <Route
        exact path="/examples/core/drawer/example/:languageCode/:isMobile/:isOpen/:foo"
        component={DrawerExample}
      />
    </Switch>
  )
}
export default (<Route path="/examples/core/drawer" component={DrawerExampleRouter} />)
function DrawerExampleTarget () {
  return <div id="message">it works</div>
}
function P (props) {
  return <Typography {...props} variant="body2" component="p" />
}
function DrawerExample (props) {
  const { languageCode, isMobile, isOpen, foo } = props.match.params
  const [count, setCount] = useState(0)
  return (
    <ThemeProvider theme={theme}>
      <Drawer
        languageCode={languageCode}
        viewState={{
          isMobile: isMobile === `true`,
          drawer: {
            isOpen: isOpen === `true`,
            close () {
              setCount(count + 1)
            },
            open () {},
          },
        }}
        width={40}
        navLinks={<ListItem id="nav-link">nav link</ListItem>}
      >
        <P>languageCode: <span id="languageCode">{languageCode}</span></P>
        <P>foo: <span id="foo">{foo}</span></P>
        <P>count: <span id="count">{count}</span></P>
        <P>
          Lorem ipsum est deserunt non fugiat ut cillum dolor in dolor culpa ut voluptate. Exercitation ut fugiat ullamco cupidatat nisi sit nisi ex nulla ullamco exercitation tempor aliquip aliqua ex est cupidatat consequat. Quis velit ullamco ut commodo in veniam amet consectetur velit ut. Lorem ipsum tempor reprehenderit aliqua reprehenderit reprehenderit pariatur irure laboris ut reprehenderit officia consectetur magna dolor commodo enim cupidatat tempor. Consequat aliquip nostrud adipisicing ex officia reprehenderit pariatur elit ut anim in non ex qui dolor velit ad. Pariatur voluptate enim dolore incididunt anim aute aliqua do. Tempor exercitation et cillum dolor ex sint ad occaecat esse. Sit occaecat dolore tempor sunt ut exercitation mollit excepteur sint aliqua labore officia eu incididunt. In consectetur irure commodo sed elit do enim ut magna ullamco. Dolore sed in elit nostrud duis sed ea quis in voluptate minim. Lorem ipsum veniam incididunt nostrud magna et sint eiusmod quis enim. Exercitation sunt enim proident qui occaecat proident aliquip ex id eiusmod velit veniam in adipisicing enim irure duis eiusmod. Labore nulla irure aute dolore dolore aute ex qui. Enim dolor ut incididunt officia magna proident reprehenderit dolor reprehenderit in deserunt. Ut veniam amet ut labore consequat id sunt aliqua dolor exercitation laborum consectetur irure amet commodo qui. Nulla laborum laborum irure minim aute consectetur ullamco non voluptate non voluptate nulla eiusmod proident ea dolor deserunt.
        </P>
      </Drawer>
    </ThemeProvider>
  )
}