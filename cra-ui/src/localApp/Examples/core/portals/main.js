import React, { Fragment, useState, useRef } from "react"
import { Route } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import Dialog from "@material-ui/core/Dialog"
import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { makeBluePortal, makeRedPortal } from "local/core/portals"
const appNames = [`Foo`, `Bar`]
const mountingPoints = [`Left`, `Right`]
const portals = appNames.reduce((byAppName, appName) => {
  byAppName[appName] = mountingPoints.reduce((byMountingPoint, mountingPoint) => {
    const name = `Example1${appName}${mountingPoint}`
    byMountingPoint[mountingPoint] = {
      BluePortal: makeBluePortal(name),
      RedPortal: makeRedPortal(name),
    }
    return byMountingPoint
  }, {})
  return byAppName
}, {})
const useCid = (i => function useCid () {
  const cid = useRef(null)
  !cid.current && (cid.current = (i++).toString())
  return cid.current
})(0)
const usePortalExampleStyles = makeStyles({
  root: {
    color: `white`,
    backgroundColor: `#27ae60`,
    width: `90vw`,
    maxWidth: 1024,
    padding: 10,
  },
  contents: {
    "& > *": {
      margin: 10,
    },
  },
  columns: {
    display: `flex`,
    "& > *": {
      flex: `0 1 100%`,
    },
  },
})
function useTextInput () {
  const [value, setValue] = useState(``)
  return {
    value,
    update (e) {
      setValue(e.target.value)
    },
  }
}
function useMountingState () {
  const [mounted, setMounted] = useState(true)
  return {
    mounted,
    toggle () {
      setMounted(mounted => !mounted)
    },
  }
}
function PortalExample () {
  const cid = useCid()
  const bluePortals = useMountingState()
  const redPortals = useMountingState()
  const text = useTextInput()
  const classes = usePortalExampleStyles()
  return (
    <Dialog open PaperProps={{ className: classes.root }}>
      <div id="dialogContents" className={classes.contents}>
        <div><Button id="sentinel">sentinel</Button></div>
        <div>Root CID: <span id="rootCid">{cid}</span></div>
        <div><Input id="rootInput" value={text.value} onChange={text.update} /></div>
        <div>
          <Button
            id="toggleBluePortals"
            variant="contained"
            color={bluePortals.mounted ? `primary` : `secondary`}
            onClick={bluePortals.toggle}
          >
            Mount/Unmount Blue Portals
          </Button>
        </div>
        <Border className={classes.bluePortals}>
          <div id="bluePortals">
            {bluePortals.mounted && subapps.map(({ key, Subapp }) => (
              <Subapp key={key} rootInput={text.value} />
            ))}
          </div>
        </Border>
        <div>
          <Button
            id="toggleRedPortals"
            variant="contained"
            color={redPortals.mounted ? `primary` : `secondary`}
            onClick={redPortals.toggle}
          >
            Mount/Unmount Red Portals
          </Button>
        </div>
        <Border className={classes.redPortals}>
          {redPortals.mounted && (
            <div id="redPortals" className={classes.columns}>
              {mountingPoints.map(mountingPoint => (
                <div key={mountingPoint}>
                  {appNames.map(appName => {
                    const { RedPortal } = portals[appName][mountingPoint]
                    return <RedPortal key={appName} Component="div" />
                  })}
                </div>
              ))}
            </div>
          )}
        </Border>
      </div>
    </Dialog>
  )
}
export default (<Route exact path="/examples/core/portals/main" component={PortalExample} />)
const useSubappStyles = makeStyles({
  root: {
    margin: 10,
    padding: 10,
    "& > *": {
      margin: 10,
    },
  },
})
const subapps = appNames.map(appName => ({
  key: appName,
  Subapp ({ rootInput }) {
    const cid = useCid()
    const input = {}
    input.Left = useTextInput()
    input.Right = useTextInput()
    const classes = useSubappStyles()
    return (
      <Fragment>
        {mountingPoints.map(mountingPoint => {
          const { BluePortal } = portals[appName][mountingPoint]
          const oposite = mountingPoint === `Left` ? `Right` : `Left`
          return (
            <BluePortal key={mountingPoint}>
              <Border className={classes.root}>
                <div>
                  Client CID: &nbsp;
                  <span id={`subappCid${mountingPoint}${appName}`}>{cid}</span>
                </div>
                <div>
                  Root input: &nbsp;
                  <span id={`rootInput${mountingPoint}${appName}`}>{rootInput}</span>
                </div>
                <div>
                  {oposite} subapp input: &nbsp;
                  <span id={`subappOpositeInput${oposite}${appName}`}>
                    {input[oposite].value}
                  </span>
                </div>
                <div>
                  <Input
                    id={`subappInput${mountingPoint}${appName}`}
                    value={input[mountingPoint].value}
                    onChange={input[mountingPoint].update}
                  />
                </div>
              </Border>
            </BluePortal>
          )
        })}
      </Fragment>
    )
  },
}))
const useInputStyles = makeStyles({
  root: {
    width: `200px`,
    padding: `10px`,
  },
  textField: {
    width: `100%`,
  },
})
function Input (props) {
  const classes = useInputStyles()
  return (
    <Paper className={classes.root} elevation={2}>
      <TextField {...props} className={classes.textField} />
    </Paper>
  )
}
const useBorderStyles = makeStyles({
  root: {
    border: `1px solid #37d278`,
    borderRadius: 5,
  },
})
function Border ({ className, ...other }) {
  const classes = useBorderStyles()
  return <div {...other} className={className ? `${classes.root} ${className}` : classes.root} />
}