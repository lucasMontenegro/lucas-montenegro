import ReactDOM from "react-dom"
import styling from "new/app/ui/styling"
import throwPropTypeErrors from "new/app/ui/throwPropTypeErrors"
import global from "global"
throwPropTypeErrors()
ReactDOM.render(styling, global.document.getElementById(`root`))