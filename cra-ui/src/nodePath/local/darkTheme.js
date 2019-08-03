import { createMuiTheme } from "@material-ui/core/styles"
import config from "local/config"
let theme = createMuiTheme({
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  palette: {
    primary: {
      light: `#63ccff`,
      main: `#009be5`,
      dark: `#006db3`,
    },
  },
  shape: {
    borderRadius: 8,
  },
})
export default {
  ...theme,
  overrides: {
    MuiPaper: {
      root: {
        color: theme.palette.common.white,
        backgroundColor: `#18202c`,
      },
    },
    MuiDrawer: {
      paper: {
        width: `${config.drawerWidth}px`,
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      },
    },
    MuiButton: {
      root: {
        color: theme.palette.common.white,
      },
      label: {
        textTransform: `none`,
      },
      contained: {
        boxShadow: `none`,
        "&:active": {
          boxShadow: `none`,
        },
      },
    },
    MuiIconButton: {
      root: {
        color: theme.palette.common.white,
        padding: theme.spacing(1),
      },
    },
    MuiExpansionPanel: {
      root: {
        borderRadius: 0,
        margin: `${theme.spacing(1)}px 0`,
        backgroundColor: `#232f3e`,
      },
    },
    MuiExpansionPanelSummary: {
      content: {
        "& > *": {
          flexGrow: 1,
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: `#404854`,
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: `inherit`,
        marginRight: 0,
        "& svg": {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    ...theme.mixins,
    toolbar: {
      minHeight: 48,
    },
  },
}