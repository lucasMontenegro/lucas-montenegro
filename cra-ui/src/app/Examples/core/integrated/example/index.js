import React from "react"
import createBaseClient from "local/core/createBaseClient"
import makeTranslations from "local/makeTranslations"
import initialLocation from "./initialLocation"
import linkTranslators from "./linkTranslators"
import WorkIcon from "@material-ui/icons/Work"
import ToolbarItem from "../ToolbarItem"
const BaseClient = createBaseClient({
  appName: `ExampleApp`,
  clientName: `example`,
  initialLocation,
  linkTranslators,
})
const subtitles = makeTranslations(languageCode => `Example App ${languageCode}`)
const icons = makeTranslations(() => <WorkIcon />)
export default function ExampleClient (props) {
  return (
    <BaseClient
      {...props}
      subtitles={subtitles}
      icons={icons}
      primaryToolbar={<ToolbarItem>primaryToolbar</ToolbarItem>}
      secondaryToolbar={<ToolbarItem>secondaryToolbar</ToolbarItem>}
      responsiveToolbar={<ToolbarItem>responsiveToolbar</ToolbarItem>}
      drawerContent={<div>drawerContent</div>}
    >
      <div>Example App</div>
      <div>
        Consectetur sit commodo in officia do in ut eu fugiat quis do anim incididunt ut nisi exercitation. In eiusmod enim elit culpa occaecat ullamco non cupidatat nulla sunt laboris commodo sint ut excepteur pariatur nostrud non. Culpa ea mollit in commodo velit dolore amet enim consequat consectetur tempor sit velit dolore sunt nisi in. Eiusmod exercitation ut velit id ullamco cillum et ex deserunt eiusmod voluptate proident. Lorem ipsum id proident nulla cupidatat ex cillum anim in labore ex duis. Minim mollit dolore duis exercitation enim aute labore ea velit esse cillum commodo sunt dolore enim commodo non do. Et cupidatat cillum do laborum in nostrud dolor eiusmod sed. Occaecat exercitation quis in qui occaecat tempor sit ad sunt proident in mollit excepteur cupidatat duis culpa ut fugiat. Sint culpa in enim ea velit ut fugiat incididunt. Consequat mollit amet ad irure ex duis occaecat ut ullamco proident consectetur. Reprehenderit eu consectetur enim cillum proident aliquip aliquip dolore. Minim exercitation laborum in nisi irure aute excepteur elit proident. Officia labore proident elit cupidatat officia amet occaecat esse proident do laborum nostrud. Ut cupidatat officia amet cupidatat commodo occaecat mollit quis. Pariatur velit voluptate reprehenderit et tempor dolor ea qui sit non nulla minim adipisicing sed est ut deserunt excepteur. Quis sit cillum laborum veniam ut deserunt aliqua magna minim. In minim in deserunt adipisicing duis aliqua exercitation veniam laboris est in. Sint aute culpa ut ea eiusmod in commodo ut ullamco nostrud veniam id esse pariatur laborum ut in. Lorem ipsum sint eu in eu quis eu irure dolor ea dolore labore laboris magna enim sunt duis officia. Lorem ipsum quis sunt nisi velit ut dolore ea velit id. Lorem ipsum velit eiusmod sit laborum id irure aliqua nisi elit sed commodo reprehenderit duis. Id ut mollit tempor ut anim cupidatat et aute dolor elit. Dolore id deserunt veniam fugiat in cupidatat exercitation dolore laborum. Voluptate duis adipisicing veniam dolor esse ea est dolore enim ut consectetur id deserunt et laboris occaecat ullamco.
      </div>
    </BaseClient>
  )
}