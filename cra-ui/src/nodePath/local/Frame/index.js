import React from "react"
import { ThemeProvider } from "@material-ui/styles"
import theme from "local/theme"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import MenuSlider from "./MenuSlider"
import MenuList from "./MenuList"
const leftWidth = `35ch`
const rightWidth = `120ch`
const leftBgColor = `#18202c`
const rightBgColor = `#eaeff1`
const breakpointDown = theme.breakpoints.down(800)
const breakpointUp = theme.breakpoints.up(800)
const Frame = withStyles(
  {
    root: {
      height: `100vh`,
      width: `100vw`,
      display: `flex`,
    },
    slider: {
      height: `100%`,
      flex: `0 0 4ch`,
      [breakpointUp]: {
        display: `none`,
      },
    },
    mainWrapper: {
      height: `100%`,
      flex: `0 1 100%`,
      display: `flex`,
      justifyContent: `flex-end`,
      overflow: `hidden`,
    },
    scroll: {
      height: `100%`,
      overflowY: `auto`,
      WebkitOverflowScrolling: `touch`, // Add iOS momentum scrolling.
    },
    leftScroll: {
      backgroundColor: leftBgColor,
      flex: `1 0 ${leftWidth}`,
      position: `relative`,
      left: 0,
      [breakpointUp]: {
        position: `static`,
      },
    },
    rightScroll: {
      backgroundColor: rightBgColor,
      flex: `1 1 ${rightWidth}`,
      [breakpointDown]: {
        flex: `0 0 100%`,
      },
    },
    content: {
      width: `100%`,
      outline: `none`,
    },
    leftContent: {
      color: `rgba(255, 255, 255, 0.7)`,
      backgroundColor: leftBgColor,
      maxWidth: leftWidth,
      float: `right`,
    },
    rightContent: {
      backgroundColor: rightBgColor,
      maxWidth: rightWidth,
      float: `left`,
    },
  }
)(
  class Frame extends React.Component {
    constructor (props) {
      super(props)
      this.state = { sliderValue: 0 }
      this.setSlider = this.setSlider.bind(this)
      this.closeTempDrawer = this.closeTempDrawer.bind(this)
    }
    setSlider (event, value) {
      if (value === this.state.sliderValue) return
      this.setState({ sliderValue: value })
    }
    closeTempDrawer () {
      if (this.state.sliderValue === 1) {
        this.setState({ sliderValue: 0 })
      }
    }
    render () {
      const {
        classes,
        title,
        subtitle,
        content,
        navLinks,
        languageLinks,
      } = this.props
      return (
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <MenuSlider
              className={classes.slider}
              value={this.state.sliderValue}
              onChange={this.setSlider}
              label="Menu"
            />
            <div className={classes.mainWrapper}>
              <div
                className={`${classes.scroll} ${classes.leftScroll}`}
                style={{ left: this.state.sliderValue > 0 ? leftWidth : `0px` }}
              >
                <Paper
                  square
                  elevation={0}
                  className={`${classes.content} ${classes.leftContent}`}
                >
                  <MenuList
                    navLinks={navLinks}
                    languageLinks={languageLinks}
                    onClick={this.closeTempDrawer}
                  />
                </Paper>
              </div>
              <div className={`${classes.scroll} ${classes.rightScroll}`}>
                <Paper
                  square
                  elevation={0}
                  className={`${classes.content} ${classes.rightContent}`}
                >
                  <Typography variant="h4">{title} | {subtitle}</Typography>
                  <Typography>{content}</Typography>
                  <Typography>
                    Ad ut qui id adipisicing sed ex consectetur aliquip laboris culpa amet et culpa commodo esse labore commodo in. Eu aliquip et amet eu quis consequat cupidatat in amet nisi duis aute sit sit et eiusmod id. Lorem ipsum aute fugiat ullamco aliqua veniam magna in proident id dolor dolore enim. Labore voluptate nisi enim deserunt mollit aute dolor eiusmod eiusmod incididunt proident tempor. Elit veniam mollit ut laborum esse sint reprehenderit ea nisi dolore sit qui cupidatat dolore nulla adipisicing amet qui. Eu elit elit sint tempor veniam aute ut ut ex aliquip esse voluptate sit ad in veniam consequat ut. Lorem ipsum fugiat ut nostrud tempor cupidatat laboris occaecat pariatur sed quis ad consectetur velit fugiat ullamco. Dolor deserunt proident duis mollit consectetur mollit reprehenderit aute dolore. Quis nisi quis deserunt dolor ea excepteur elit proident nisi amet exercitation nulla excepteur anim consequat. Qui aliquip aliqua eu eiusmod excepteur excepteur duis eu irure dolore consectetur reprehenderit in ut ex ea enim dolore. Lorem ipsum dolor ut dolor in do est dolore et dolore elit sunt velit dolor cupidatat eiusmod et. Occaecat non velit in incididunt proident fugiat proident minim cupidatat nostrud ullamco excepteur. Sint dolor nostrud ut sed nisi laborum aliquip culpa. Laboris anim duis ullamco fugiat laboris magna est ad velit labore sit cupidatat ea cillum anim amet. Labore id magna proident reprehenderit dolor occaecat incididunt eiusmod occaecat amet nisi commodo cupidatat aliqua culpa. Voluptate consectetur veniam ullamco duis pariatur ea aute incididunt cillum. In dolore ut elit in qui dolor mollit sed. Dolore nisi proident ea voluptate cupidatat excepteur ut ullamco ullamco nostrud tempor officia. Elit pariatur non eu commodo magna dolor do pariatur nulla sint dolore labore minim eiusmod quis. Et mollit dolor in velit do sit eiusmod do incididunt aliqua. Aliqua ut enim in ad in ex proident aliqua sit minim nisi. Laboris labore consectetur consequat sint eu cillum in labore ut dolor ea deserunt. Cupidatat aliquip sunt eu cupidatat culpa excepteur velit in aliqua sunt dolor consequat eu ut fugiat. Lorem ipsum voluptate incididunt ut reprehenderit dolor dolore eu pariatur aute do do minim in commodo. Irure reprehenderit ut dolor dolore duis magna et velit commodo cillum voluptate in mollit cillum proident dolore. Veniam laborum in occaecat aute laboris aute in excepteur. Non dolor proident quis duis amet deserunt cillum fugiat excepteur voluptate tempor ut ea dolor laborum. Laboris occaecat nulla incididunt labore eu enim quis esse officia dolore irure. Mollit amet pariatur ut aliqua dolore sit ut commodo. Sint consequat cupidatat tempor est aliqua cillum labore minim. Consectetur veniam ex velit voluptate aliqua occaecat aute dolor in enim laboris reprehenderit sunt excepteur dolor. Lorem ipsum sint ullamco quis ex ea commodo voluptate exercitation commodo. Culpa duis dolor in ullamco anim dolore amet ut consequat anim velit reprehenderit labore esse deserunt. Laborum nulla ut sed dolore in ex nisi in officia non culpa duis. Aliquip enim qui amet do est ut in veniam enim. Sit pariatur et laborum commodo ut ex mollit dolore do officia cillum in minim dolore dolor fugiat ea. Pariatur sed nulla eu in sit adipisicing do est qui. Lorem ipsum mollit laboris occaecat et ullamco consequat quis aute dolore qui eu qui nisi ex sint sunt ut non. Consequat in id consequat voluptate cillum irure ea labore amet esse commodo in. Dolor in labore culpa irure labore fugiat sunt in in ex eu consectetur consequat proident esse. Dolore enim ut in amet ut veniam ut voluptate enim aliqua. In excepteur et dolor sunt et officia ullamco aliquip veniam pariatur irure minim ut reprehenderit veniam. Eiusmod sunt irure eu in aute incididunt fugiat ex cupidatat velit exercitation nostrud ad dolor tempor. Quis cillum occaecat aute est veniam ea magna dolore qui dolore aute dolore labore duis consectetur ex veniam. Sit commodo duis qui ullamco incididunt aliquip pariatur consequat. Non velit nostrud eu pariatur ut consectetur in sint irure. Ex commodo cillum sed occaecat nisi id reprehenderit in. In laboris dolor deserunt adipisicing velit ut est sed sed ut dolor sit excepteur sint anim. Eu consequat tempor in laborum nisi aute aliquip incididunt consectetur reprehenderit anim sunt aute. Pariatur eu elit duis incididunt laboris do in in in commodo ex ut occaecat proident dolor. Adipisicing dolor sit minim duis duis est elit nulla excepteur quis labore et reprehenderit mollit. In officia amet nulla irure mollit officia esse consequat voluptate minim excepteur culpa dolore reprehenderit. Id deserunt pariatur ut consequat et in do elit sunt qui nulla dolor ea in in. Sunt anim anim consectetur aute aliqua mollit aute dolor exercitation dolor proident velit non velit dolor veniam officia laborum. Lorem ipsum excepteur culpa quis adipisicing irure ad nostrud duis et aliqua magna aute in sunt ea adipisicing. Lorem ipsum cillum in dolore eiusmod laborum ea cupidatat adipisicing esse dolore sunt ut ut incididunt laboris dolore. Ut minim do voluptate ex excepteur do veniam reprehenderit laboris veniam ex dolor qui esse dolore dolor exercitation amet. Lorem ipsum officia ad nisi commodo dolor in eu officia do non occaecat ullamco do enim qui voluptate ut. Lorem ipsum in non ut adipisicing eu sit dolore sit dolore fugiat officia est voluptate dolore quis esse proident fugiat. Sit cillum consequat amet dolor in esse tempor do velit do labore laboris in elit occaecat. Fugiat in commodo nisi in dolor in eu culpa est aliqua excepteur sit adipisicing enim velit ullamco deserunt duis. Eiusmod in velit eiusmod esse ut aute ex adipisicing sit dolore aliquip amet aliquip do eu irure officia cupidatat. Sunt reprehenderit dolor irure ullamco ex labore culpa sit pariatur nisi. Lorem ipsum ut amet nisi sunt reprehenderit velit nulla laborum minim amet quis id laboris aliqua enim aliquip elit esse. Cillum tempor nostrud laborum sed qui enim sint amet dolor. Lorem ipsum qui mollit eu nisi aliqua duis consectetur fugiat pariatur laborum ad dolor ut. Ea in magna laboris in in culpa dolore mollit amet in do eiusmod. Ut quis aute cillum dolore id irure in deserunt reprehenderit voluptate aliquip. Cupidatat dolor consectetur in tempor ullamco nostrud deserunt aliquip amet dolore do quis deserunt non. Sint amet pariatur dolore incididunt duis cillum adipisicing minim esse aliqua aliquip ad do quis dolor cupidatat. Lorem ipsum non aliquip sunt ex quis nisi deserunt eiusmod irure est adipisicing in deserunt ea labore velit. Sed aliquip eu quis occaecat ad magna eu id laboris voluptate. Officia dolor reprehenderit aute aute enim velit aliquip quis voluptate commodo. Lorem ipsum est consectetur laboris ut commodo exercitation id veniam fugiat dolore dolore laboris veniam nulla do nulla magna sit. Sed consectetur nulla anim dolore eiusmod esse fugiat ullamco ut commodo laboris elit do occaecat reprehenderit tempor elit. Velit occaecat nulla amet exercitation est labore nulla dolore eiusmod. Pariatur ut in in in sed aliquip sunt reprehenderit occaecat commodo magna sed. Voluptate in anim deserunt dolore magna laboris deserunt ut labore veniam mollit id quis commodo. In sed cupidatat in quis nostrud aliqua dolor sed exercitation ad ex esse. Ea aute laborum nostrud labore in non in aliqua consectetur dolore in cillum in dolor cupidatat in deserunt. Aute veniam anim do consequat magna do mollit aliquip voluptate ad nisi nostrud eu culpa proident sunt. Laboris eiusmod dolore esse dolore sit tempor quis do in adipisicing consequat sint ullamco consectetur. Dolor elit do consectetur incididunt adipisicing aute laborum ad tempor proident do in veniam minim labore nostrud. Id eu excepteur dolor occaecat consequat aliqua dolor consequat fugiat dolore ullamco fugiat in et. Nulla ullamco deserunt ex excepteur elit ea nisi dolor ut anim in reprehenderit. Minim in dolore pariatur elit eu ut ad minim quis dolore officia. Eu proident anim excepteur aliquip nisi dolor voluptate qui labore sunt proident dolor aliqua ad esse. Consectetur anim laboris in elit anim amet ad in qui ad aliqua nisi. Veniam ut anim tempor reprehenderit non occaecat do anim sed laboris ea in nisi enim ea.
                  </Typography>
                </Paper>
              </div>
            </div>
          </div>
        </ThemeProvider>
      )
    }
  }
)
export default Frame