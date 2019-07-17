class App extends React.Component {
  constructor (props) {
    super(props)
    this.id = Math.floor(Math.random() * 1000000).toString()
  }
  render () {
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          <p>Blue paragraph, id: {this.id}.</p>,
          this.props.blueWrapper
        )}
        {ReactDOM.createPortal(
          <p>Red paragraph, id: {this.id}.</p>,
          this.props.redWrapper
        )}
      </React.Fragment>
    )
  }
}
function Frame () {
  const arr = [0, 1, 2]
  const blueWrappers = arr.map(() => document.createElement(`div`))
  const redWrappers = arr.map(() => document.createElement(`div`))
  return (
    <div>
      {arr.map(n => <App key={`app${n}`} blueWrapper={blueWrappers[n]} redWrapper={redWrappers[n]}/>)}
      <div ref={node => arr.forEach(n => node.appendChild(blueWrappers[n]))} style={{ backgroundColor: `blue` }} />
      <div ref={node => arr.forEach(n => node.appendChild(redWrappers[n]))} style={{ backgroundColor: `red` }} />
    </div>
  )
}
ReactDOM.render(<Frame />, document.getElementById('root'))