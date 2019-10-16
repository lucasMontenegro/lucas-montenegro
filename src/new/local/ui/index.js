import ReactDOM from "react-dom"
import styling from "new/local/ui/styling"
import throwPropTypeErrors from "new/local/ui/throwPropTypeErrors"
import globals from "new/local/utils/globals"
throwPropTypeErrors()
ReactDOM.render(styling, globals.document.getElementById(`root`))