import React, { Fragment, useState, useRef } from "react"
import { Route } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import Dialog from "@material-ui/core/Dialog"
import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { createBluePortal, createRedPortal } from "local/core/portals"
import PropTypes from "prop-types"
const clientNames = [`Foo`, `Bar`]
const mountingPoints = [`Left`, `Right`]
const portals = clientNames.reduce((byClientName, clientName) => {
  byClientName[clientName] = mountingPoints.reduce((byMountingPoint, mountingPoint) => {
    const name = `Example1${clientName}${mountingPoint}`
    byMountingPoint[mountingPoint] = {
      BluePortal: createBluePortal(name),
      RedPortal: createRedPortal(name),
    }
    return byMountingPoint
  }, {})
  return byClientName
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
}, { name: `PortalExample` })
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
        <Border>
          <div id="bluePortals">
            {bluePortals.mounted && clients.map(({ key, Client }) => (
              <Client key={key} rootInput={text.value} />
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
        <Border>
          {redPortals.mounted && (
            <div id="redPortals" className={classes.columns}>
              {mountingPoints.map(mountingPoint => (
                <div key={mountingPoint}>
                  {clientNames.map(clientName => {
                    const { RedPortal } = portals[clientName][mountingPoint]
                    return <RedPortal key={clientName} Component="div" />
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
export default (<Route exact path="/examples/core/portals" component={PortalExample} />)
const useClientStyles = makeStyles({
  root: {
    margin: 10,
    padding: 10,
    "& > *": {
      margin: 10,
    },
  },
}, { name: `PortalExampleClient` })
const clients = clientNames.map(clientName => {
  function PortalExampleClient ({ rootInput }) {
    const cid = useCid()
    const input = {}
    input.Left = useTextInput()
    input.Right = useTextInput()
    const classes = useClientStyles()
    return (
      <Fragment>
        {mountingPoints.map(mountingPoint => {
          const { BluePortal } = portals[clientName][mountingPoint]
          const oposite = mountingPoint === `Left` ? `Right` : `Left`
          return (
            <BluePortal key={mountingPoint}>
              <Border className={classes.root}>
                <div>
                  Client CID: &nbsp;
                  <span id={`clientCid${mountingPoint}${clientName}`}>{cid}</span>
                </div>
                <div>
                  Root input: &nbsp;
                  <span id={`rootInput${mountingPoint}${clientName}`}>{rootInput}</span>
                </div>
                <div>
                  {oposite} client input: &nbsp;
                  <span id={`clientOpositeInput${oposite}${clientName}`}>
                    {input[oposite].value}
                  </span>
                </div>
                <div>
                  <Input
                    id={`clientInput${mountingPoint}${clientName}`}
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
  }
  PortalExampleClient.propTypes = { rootInput: PropTypes.string.isRequired }
  return {
    key: clientName,
    Client: PortalExampleClient,
  }
})
const useInputStyles = makeStyles({
  root: {
    width: `200px`,
    padding: `10px`,
  },
  textField: {
    width: `100%`,
  },
}, { name: `Input` })
function Input (props) {
  const classes = useInputStyles()
  return (
    <Paper className={classes.root} elevation={2}>
      <TextField {...props} className={classes.textField} />
    </Paper>
  )
}
Input.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
const useBorderStyles = makeStyles({
  root: {
    border: `1px solid #37d278`,
    borderRadius: 5,
  },
}, { name: `Border` })
function Border ({ className, children }) {
  const classes = useBorderStyles()
  return <div className={`${classes.root} ${className}`}>{children}</div>
}
Border.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}