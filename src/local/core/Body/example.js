import React, { Fragment, useState } from "react"
import { Route } from "react-router-dom"
import Body from "local/core/Body"
import { ThemeProvider } from "@material-ui/styles"
import theme from "local/theme"
import Drawer from "@material-ui/core/Drawer"
import darkTheme from "local/darkTheme"
import makeTranslations from "local/makeTranslations"
const drawerWidth = 256
const titles = makeTranslations(languageCode => `${languageCode} title`)
const subtitles = makeTranslations(languageCode => `${languageCode} subtitle`)
function BodyExample (props) {
  const [
    languageCode,
    isMobile,
    primaryToolbar,
    secondaryToolbar,
    responsiveToolbar,
  ] = props.location.search.slice(1).split(`&`)
  const [count, setCount] = useState(0)
  const viewState = {
    isMobile: isMobile === `true`,
    drawer: {
      isOpen: false,
      open () {
        setCount(count => count + 1)
      },
      close () {},
    },
  }
  return (
    <Fragment>
      {viewState.isMobile || (
        <ThemeProvider theme={darkTheme}>
          <Drawer variant="permanent" PaperProps={{ style: { width: drawerWidth } }}>
            <div id="drawer">{lorem}</div>
          </Drawer>
        </ThemeProvider>
      )}
      <ThemeProvider theme={theme}>
        <Body
          languageCode={languageCode}
          drawerWidth={drawerWidth}
          viewState={viewState}
          titles={titles}
          subtitles={subtitles}
          logo={<Div id="logo">logo</Div>}
          primaryToolbar={primaryToolbar !== `undefined` && (
            <Div id="primaryToolbar">{primaryToolbar}</Div>
          )}
          secondaryToolbar={secondaryToolbar !== `undefined` && (
            <Div id="secondaryToolbar">{secondaryToolbar}</Div>
          )}
          responsiveToolbar={responsiveToolbar !== `undefined` && (
            <Div id="responsiveToolbar">{responsiveToolbar}</Div>
          )}
        >
          <Div>count: <span id="count">{count}</span></Div>
          <Div>{lorem}</Div>
        </Body>
      </ThemeProvider>
    </Fragment>
  )
}
export default (<Route exact path="/examples/core/Body" component={BodyExample} />)
function Div (props) {
  return <div {...props} style={{ padding: `0 8px` }} />
}
const lorem = `Est consequat eu dolore excepteur aliqua tempor aliquip excepteur. Irure deserunt nostrud ut non elit incididunt culpa reprehenderit. Lorem ipsum consectetur veniam dolor consequat nisi ut culpa esse ea est reprehenderit aute quis et adipisicing in ut deserunt. In dolor sit ea sit id in sed qui nulla ut id ut sed dolore ut dolor id. Sunt anim dolore eu irure laboris sint ut sed dolore esse laboris ut laboris eiusmod proident. Fugiat fugiat laborum ullamco in pariatur amet deserunt velit adipisicing dolore. Minim cillum sit aute deserunt cillum velit id minim excepteur adipisicing mollit mollit esse ea commodo. Magna aliquip consectetur eiusmod ad id sed elit laboris occaecat eu incididunt occaecat cupidatat in. Lorem ipsum sed velit commodo mollit fugiat enim quis nostrud dolor qui eiusmod eu. Incididunt dolore aliqua reprehenderit excepteur id aliqua ea irure velit mollit ullamco. In ad aute ut duis do id ex nostrud aliquip voluptate in dolore minim ut reprehenderit. Ad sit sint anim deserunt quis dolore do duis consectetur exercitation sed veniam. Occaecat do labore voluptate dolore minim velit sed sed ullamco duis veniam ut cupidatat proident et do. Dolore pariatur eu do quis laboris dolore id amet ad reprehenderit ex velit labore aliqua. Lorem ipsum esse fugiat aute amet nostrud ea proident esse ut sint consectetur incididunt. Fugiat ut ut aliqua non pariatur officia ut in adipisicing nisi laborum aliqua excepteur minim voluptate. Dolor ex dolore consequat reprehenderit consequat consequat voluptate non qui dolore. Nostrud ut consequat mollit occaecat eiusmod qui duis et nulla in velit aliqua in in incididunt in sint. Aute labore in eu ullamco excepteur mollit in ad dolore mollit commodo est consequat velit. Quis dolor deserunt irure sint non mollit culpa duis. Lorem ipsum aliqua ex consequat et consectetur magna esse ad aliquip irure sint ut nulla deserunt eu. Officia sed pariatur et qui sit amet quis in sed deserunt. Dolor ea aliqua dolor quis sed nostrud minim elit eu aliquip pariatur. Consectetur consequat enim nulla dolore dolore consectetur ullamco ea mollit velit consectetur. Aute proident sed occaecat labore veniam ut sit deserunt. Sint nulla proident esse velit labore dolore excepteur et non aute ut voluptate sint est culpa mollit. Officia reprehenderit do consectetur nisi dolor occaecat labore ullamco voluptate minim officia. Eu commodo ad proident ut in pariatur adipisicing sed proident id et sed cupidatat aliquip occaecat consequat sunt. Nulla aute cillum in duis deserunt ut ut et. Lorem ipsum velit in laboris eu dolore aliqua esse aute officia in elit in est occaecat aliquip. Aute in magna dolor cupidatat pariatur nostrud duis culpa pariatur dolore dolor ut ut aliqua elit id. Nisi ad elit pariatur irure velit in sit consequat aute dolore voluptate ut magna labore esse anim. Lorem ipsum cillum non exercitation ullamco enim ut esse qui quis nisi enim ex quis cillum nostrud velit exercitation. Non occaecat laboris cillum dolore cillum laborum cillum nisi ad eu excepteur. Lorem ipsum amet ex dolor elit nulla incididunt nostrud veniam ullamco mollit pariatur. Et dolor in culpa ex magna amet eiusmod do excepteur nisi. Commodo excepteur sunt nulla ea nostrud reprehenderit tempor occaecat in ex in ex ad pariatur nulla excepteur incididunt. Sit laborum dolor in commodo ut occaecat do quis magna nulla fugiat. Laboris nulla anim occaecat officia in eiusmod ullamco nostrud consequat est laborum sunt veniam tempor do. Et commodo irure laboris officia pariatur pariatur qui tempor officia excepteur velit. Cillum officia quis aliqua elit sed est aliquip dolore occaecat dolore consequat excepteur. Mollit adipisicing sit magna proident commodo non esse sint do in nulla magna. Tempor cillum mollit duis consequat dolore enim labore occaecat quis pariatur laboris dolor veniam labore aliqua incididunt. Ut nulla laboris aliquip laborum ex reprehenderit commodo nulla irure culpa dolore velit fugiat. Sint deserunt proident excepteur culpa ullamco excepteur minim mollit id et aliquip aliquip deserunt. Sit qui eu exercitation in eu id non minim et ut dolor. Consequat dolor ex sint in in do ex esse commodo mollit et labore amet labore aute. Dolore in nisi eiusmod occaecat ex consectetur in reprehenderit enim aliqua nulla eiusmod incididunt. Lorem ipsum eu esse quis dolore nulla eiusmod nisi ut ea labore quis ut in qui nostrud esse. Eiusmod amet est pariatur eu amet non adipisicing mollit in est enim non. Lorem ipsum aute veniam ut est do consequat exercitation laboris exercitation. Sed do anim in dolor velit cupidatat sunt labore id elit. Lorem ipsum veniam occaecat anim sunt non cillum proident labore aliquip dolore anim nulla minim ad in sed. Ad mollit culpa laborum duis duis dolore consectetur id veniam labore in culpa commodo sed sint. Laborum non mollit deserunt ex deserunt labore ut veniam enim adipisicing irure sit dolor qui velit et eu sit. Lorem ipsum ut culpa amet laboris cillum laboris esse consectetur voluptate sunt cupidatat. Lorem ipsum do ex dolore dolore minim magna sed sint minim sunt aliquip occaecat. Lorem ipsum eu consectetur ut velit consequat anim laborum officia labore. Dolore velit non consequat ut laboris adipisicing reprehenderit ullamco commodo sit aliqua. Lorem ipsum pariatur adipisicing minim velit dolor deserunt in proident dolor minim officia adipisicing veniam ut laboris commodo dolore. Magna sint ut enim occaecat enim qui cillum adipisicing qui. Dolore dolor cupidatat elit occaecat est magna minim occaecat enim duis ut. Dolor incididunt magna in sunt minim ex nisi labore enim elit. Tempor ullamco ullamco eiusmod laborum dolore elit nisi deserunt nulla dolore exercitation. Pariatur sit exercitation consequat velit duis dolor aliquip incididunt nostrud eiusmod duis magna aliqua adipisicing ut exercitation dolore. In ut enim sunt ut dolor ut in enim amet id nostrud anim aliquip. Lorem ipsum laboris incididunt non eu veniam sint dolor consectetur deserunt dolore aliquip labore. Sed laboris consequat fugiat amet deserunt proident adipisicing dolor et adipisicing fugiat ut consectetur dolore incididunt irure pariatur. Sed commodo laborum velit minim quis irure proident do amet eu pariatur pariatur cupidatat fugiat. Elit id cupidatat do elit non adipisicing deserunt nisi anim non duis officia. Laborum et excepteur consectetur nisi consequat incididunt non velit elit anim irure. Irure irure reprehenderit duis laborum mollit minim ex labore tempor. Dolore cillum ut proident officia adipisicing fugiat enim occaecat. Lorem ipsum elit occaecat aute ullamco consequat eu ea sed sint cupidatat cillum cupidatat magna cillum aute minim. Lorem ipsum qui id ut incididunt esse elit quis dolore esse sunt et irure qui velit duis non sed nostrud consectetur. Incididunt do enim dolore consectetur labore laboris ex proident ut aute minim. Fugiat irure nulla ut consectetur labore ea pariatur dolor nostrud fugiat labore duis consequat. Quis dolore commodo sit elit eiusmod minim occaecat irure sed veniam dolor. Aliquip id sint ex dolor nostrud ullamco est est mollit quis laborum ut nisi dolor reprehenderit mollit. Cillum cillum esse ut nulla exercitation eu velit nostrud. Anim sed sed ullamco sint dolore est sed ut fugiat ea. Aliqua eiusmod magna veniam consequat dolore ut laborum deserunt reprehenderit consequat eiusmod magna ad duis. Cupidatat nulla nisi aute in sint laborum eu anim non officia minim sint. Voluptate magna pariatur ut eu in cillum aute ut irure nostrud aliquip sed adipisicing eiusmod aliqua ut eu minim. Magna eu sint cupidatat voluptate nisi ut consequat cupidatat laborum occaecat reprehenderit nisi do anim fugiat. Sunt non aute aliqua sit amet aute ullamco nisi reprehenderit incididunt et do ex ut. Voluptate deserunt velit aliquip excepteur duis excepteur commodo labore in id tempor sunt et proident ut consequat sed commodo. Magna quis incididunt veniam deserunt ea cupidatat commodo laborum magna ullamco cupidatat ut cillum. Elit do quis culpa esse duis mollit culpa ad ex dolore eiusmod dolore in consequat eiusmod. Cillum mollit eiusmod dolor et in voluptate exercitation aute nostrud qui esse cupidatat in. Laborum pariatur nisi exercitation ullamco nisi velit labore cillum. Ut nisi minim duis laborum aliqua et exercitation nostrud in anim labore do est sint deserunt aliqua velit in. Deserunt nostrud amet mollit veniam nulla magna esse do incididunt fugiat sed excepteur labore laboris exercitation ut cillum. Magna proident magna officia mollit reprehenderit duis enim ullamco deserunt non aliqua cupidatat aliqua eu. Lorem ipsum magna cillum quis est eiusmod reprehenderit qui sit non. Ut nisi ut labore sit deserunt ut dolor sit ad ad est enim mollit nostrud pariatur voluptate. Aliqua in officia quis ut aliqua nostrud dolore quis et amet amet. Fugiat ut dolore id qui in amet aute adipisicing elit proident magna enim consectetur ad. Magna exercitation reprehenderit amet labore duis ea anim occaecat. Enim cillum duis ut voluptate in eiusmod cillum pariatur ut irure magna exercitation dolore ut enim. Mollit dolor elit in fugiat occaecat exercitation qui deserunt ad elit. Lorem ipsum in et tempor reprehenderit do cupidatat dolor occaecat nulla in laborum laboris minim enim proident duis. Ullamco pariatur quis in in incididunt nisi enim eu culpa non voluptate labore et dolore sit commodo deserunt. Velit incididunt excepteur aliquip non reprehenderit in deserunt dolor consequat in elit minim magna tempor dolor magna sunt est. Laborum ea nisi et ullamco pariatur magna aute ex. In quis commodo proident labore excepteur est sed sunt sunt anim ut id ea. Enim veniam consequat aliquip voluptate excepteur proident exercitation pariatur commodo in sunt. Lorem ipsum culpa veniam sed ut cupidatat labore ex voluptate elit commodo velit eiusmod ut occaecat. Aliquip laborum adipisicing velit do deserunt enim elit sint occaecat qui tempor. Ea non sint veniam consectetur officia ad et sit dolor sint duis ex. Velit deserunt dolore aliqua irure labore et laboris nostrud ex pariatur. Aute dolore sint excepteur voluptate dolor pariatur cupidatat in ut ea. Lorem ipsum in commodo aliquip ullamco ut ex nostrud adipisicing eu aliquip nisi. Excepteur elit aute adipisicing dolore veniam in nisi in minim deserunt aute magna quis pariatur. Occaecat in elit aute labore minim pariatur mollit pariatur. Lorem ipsum sit dolor sed est tempor cillum duis ad dolor ut. In aliquip pariatur ut occaecat aliquip cupidatat nostrud do culpa occaecat est et excepteur dolor. Lorem ipsum aute consequat minim qui occaecat et mollit fugiat est ullamco. Minim pariatur elit pariatur velit commodo esse pariatur laboris dolor commodo. Laborum minim dolore cupidatat dolor eiusmod incididunt ut consectetur dolore aute adipisicing nisi velit fugiat et sit commodo sunt. Quis minim sint laborum adipisicing amet nostrud ad nostrud aute. Sed dolor veniam veniam ut voluptate elit ut labore esse voluptate laboris. Non ut ut et pariatur qui nisi voluptate in in esse mollit sed duis qui. Officia labore sit commodo in commodo tempor occaecat proident consequat irure amet quis. Duis velit anim occaecat fugiat non anim proident est nulla anim eu sed aliqua occaecat culpa dolor sint culpa.`