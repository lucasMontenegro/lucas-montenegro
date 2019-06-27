import React from "react"
import { withStyles } from "@material-ui/core/styles"
import theme from "local/theme"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"
import { NavListItemLink } from "local/routerConnectedComponents"
const MenuList = withStyles(
  {
    item: {
      paddingTop: 1,
      paddingBottom: 1,
      color: 'rgba(255, 255, 255, 0.7)',
      '&:hover,&:focus': {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
      },
    },
    itemCategory: {
      backgroundColor: '#232f3e',
      boxShadow: '0 -1px 0 #404854 inset',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    categoryHeader: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    categoryHeaderPrimary: {
      color: theme.palette.common.white,
    },
    itemPrimary: {
      fontSize: 'inherit',
    },
    divider: {
      marginTop: theme.spacing(2),
    },
    activeLink: {
      color: theme.palette.primary.light,
    },
  }
)(
  ({ classes, navLinks, languageLinks, onClick }) => (
    <List disablePadding>
      <ListItem className={classes.categoryHeader}>
        <ListItemText classes={{ primary: classes.categoryHeaderPrimary }}>
          Apps
        </ListItemText>
      </ListItem>
      {navLinks.map(({ text, to }) => (
        <NavListItemLink
          exact to={to}
          key={to}
          className={classes.item}
          activeClassName={classes.activeLink}
          onClick={onClick}
        >
          <ListItemText classes={{ primary: classes.itemPrimary }}>
            {text}
          </ListItemText>
        </NavListItemLink>
      ))}
      <Divider className={classes.divider} />
      <ListItem className={classes.categoryHeader}>
        <ListItemText classes={{ primary: classes.categoryHeaderPrimary }}>
          Languages
        </ListItemText>
      </ListItem>
      {languageLinks.map(({ text, to }) => (
        <NavListItemLink
          exact to={to}
          key={to}
          className={classes.item}
          activeClassName={classes.activeLink}
          onClick={onClick}
        >
          <ListItemText classes={{ primary: classes.itemPrimary }}>
            {text}
          </ListItemText>
        </NavListItemLink>
      ))}
      <Divider className={classes.divider} />
      <ListItem>
        Aliquip duis culpa cupidatat quis eu labore excepteur commodo aute quis ea excepteur exercitation voluptate consectetur aliquip irure et. Lorem ipsum do in cillum laboris adipisicing ut excepteur et adipisicing ex cupidatat pariatur. Do duis magna mollit enim occaecat consectetur commodo fugiat aliqua irure. Lorem ipsum adipisicing cillum reprehenderit est magna amet ad veniam voluptate nostrud est dolor et proident nisi in amet. Lorem ipsum ea culpa id ut laboris proident est id aliquip ut culpa. Sunt et culpa cupidatat deserunt consectetur laboris cupidatat aliqua nostrud eu. Dolor eiusmod deserunt deserunt enim reprehenderit sit dolore elit laborum enim laboris exercitation ut. Excepteur deserunt laborum dolor veniam quis officia laboris amet veniam proident consectetur exercitation labore quis duis occaecat mollit aliqua. Sint est excepteur do labore sunt culpa veniam ea nostrud officia. Enim labore excepteur ut minim sed in aliqua velit veniam nostrud aute dolor laborum sint aliquip. Consectetur dolor minim excepteur laborum ullamco mollit ullamco irure laboris quis laboris ut non magna nostrud fugiat. Nostrud proident cupidatat fugiat esse amet occaecat commodo nostrud enim eiusmod aliqua adipisicing exercitation id do sunt adipisicing dolore. Deserunt adipisicing deserunt qui ad excepteur ut quis ullamco culpa nostrud dolor. Reprehenderit in ad veniam adipisicing excepteur nostrud labore sed. Incididunt cupidatat eu consequat cupidatat nisi est sint velit reprehenderit laborum ut aliqua occaecat duis aute. Lorem ipsum commodo dolor ut nisi ullamco consequat id sint aliquip esse qui laboris incididunt duis ut qui nisi labore anim. Incididunt nostrud aute laborum dolore est do non ea occaecat nulla deserunt enim cillum tempor est sed dolor. Ex sint sed et ut nulla labore ut sunt ad ut eiusmod. Cillum et deserunt qui in tempor reprehenderit exercitation ad ea do pariatur consectetur eiusmod reprehenderit est. Nulla exercitation reprehenderit cillum in magna nulla consectetur enim dolore dolore. Et in excepteur enim nulla consectetur aliqua nostrud pariatur aliquip elit cillum exercitation anim. Fugiat reprehenderit ad magna ea in anim esse qui dolor magna proident ullamco velit do ex cillum ex. Quis qui ut eu pariatur duis ut ea magna aute eu sint sed nulla. Aute ex cillum elit non anim qui elit quis exercitation eu laborum sunt enim est. In in tempor dolor adipisicing nostrud aliqua duis elit amet amet. Nisi dolore pariatur labore in cupidatat dolor sed eiusmod amet anim. Labore nulla ut sunt elit minim in sed laboris laborum consectetur commodo duis deserunt laboris adipisicing qui. Cillum et amet officia est non mollit dolore in amet quis enim nostrud consequat veniam sint aliqua in. Eu sed consequat qui in occaecat exercitation adipisicing ullamco proident mollit incididunt commodo. Lorem ipsum pariatur incididunt veniam dolor minim dolore nisi qui mollit in. Anim dolore aliquip excepteur reprehenderit labore fugiat sed culpa pariatur in aute sint amet eiusmod exercitation. Occaecat laboris sint voluptate est ea commodo id ut dolore quis pariatur dolore incididunt ea commodo. Consequat esse exercitation quis officia pariatur quis dolor et anim aliquip fugiat id excepteur sit officia amet cillum anim. Commodo nisi nisi nulla minim qui in consequat amet anim eu elit esse. Ullamco cupidatat et deserunt commodo dolor minim nostrud minim nisi laborum officia esse ut ullamco ullamco. Sint ut id voluptate voluptate do incididunt duis dolore anim. Nisi non ullamco tempor occaecat elit ut laboris laborum nisi. Anim mollit ut consectetur qui tempor sunt qui minim esse ea aliquip consequat do amet tempor do amet. Lorem ipsum commodo nisi occaecat adipisicing mollit et reprehenderit in elit magna aliquip eu duis adipisicing proident ut ad. Ut anim tempor culpa velit veniam incididunt aliqua nisi nisi cupidatat aliqua incididunt quis consectetur veniam dolor id. Veniam occaecat et duis exercitation occaecat nisi laboris aliquip adipisicing. Ea ex non ut do exercitation laboris labore amet dolore dolor aliqua in eu proident nulla tempor magna. Reprehenderit eiusmod ut velit deserunt sint amet laboris proident ea aliquip non do. Quis ad et velit eu nisi officia proident eu duis magna culpa irure deserunt ut irure fugiat. Laborum non deserunt pariatur non minim dolor nisi enim adipisicing consequat esse eu tempor. Consectetur qui in magna cupidatat ad ullamco esse enim reprehenderit aute deserunt et pariatur in enim quis voluptate. Deserunt dolor dolor laboris aute consequat aliqua in eu et amet sint. Laborum nulla tempor in minim anim labore culpa nulla voluptate esse laborum irure. Duis ad ut aute quis adipisicing ut deserunt dolore officia sint pariatur ea quis exercitation sit qui anim do. Lorem ipsum commodo ex in sit laboris mollit consectetur nulla velit. Ut amet sed irure ea ullamco eiusmod officia ut exercitation. Dolor ea ut tempor et duis qui officia commodo. Reprehenderit ad ut cupidatat nostrud velit commodo aliqua ut sit incididunt. Qui exercitation nulla proident qui laborum nisi voluptate elit fugiat reprehenderit dolore. Aliqua id do ex sed voluptate eu ullamco dolor pariatur tempor excepteur quis adipisicing. Ut ullamco ex officia cupidatat voluptate mollit ullamco irure dolore dolor deserunt nostrud quis nisi deserunt. Commodo dolor tempor incididunt ex aute eu anim deserunt culpa id deserunt pariatur ea in aliqua enim ad. In ut ullamco eu magna dolore incididunt eiusmod incididunt irure do excepteur pariatur culpa dolor minim occaecat amet proident. Ex ut ut adipisicing ad quis cillum elit officia dolore et dolor consectetur. Ullamco dolor nostrud voluptate tempor fugiat ad consequat est ut deserunt exercitation dolor. Veniam id commodo commodo adipisicing enim in esse dolor ex in officia ut laborum ullamco anim sint. Voluptate id qui mollit officia veniam fugiat culpa duis sed. Ullamco officia occaecat et culpa fugiat pariatur duis sed officia fugiat nisi mollit deserunt dolor nostrud non minim sed. Minim ad ut qui esse quis sunt id elit commodo do enim. Lorem ipsum sed incididunt dolor occaecat fugiat ullamco magna ullamco et ad proident sed ea ut. Duis nostrud sit ea aliquip sed exercitation fugiat dolore ullamco adipisicing reprehenderit ad ut pariatur adipisicing nisi velit et. Ex fugiat adipisicing mollit amet dolor ad incididunt sed culpa in dolore amet reprehenderit officia dolore fugiat ex. Dolore dolor reprehenderit elit quis consectetur nostrud voluptate anim et fugiat laboris exercitation do ea nisi non ut.
      </ListItem>
    </List>
  )
)
export default MenuList