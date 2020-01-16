import { ReactComponent as LightOnlineProfile } from "./onlineProfile/light.svg"
import { ReactComponent as DarkOnlineProfile } from "./onlineProfile/dark.svg"
import { ReactComponent as LightTechnologies } from "./technologies/light.svg"
import { ReactComponent as DarkTechnologies } from "./technologies/dark.svg"
import { ReactComponent as LightWebsite } from "./website/light.svg"
import { ReactComponent as DarkWebsite } from "./website/dark.svg"
export default {
  onlineProfile: {
    light: LightOnlineProfile,
    dark: DarkOnlineProfile,
    aspectRatio: `46%`,
  },
  technologies: {
    light: LightTechnologies,
    dark: DarkTechnologies,
    aspectRatio: `48%`,
  },
  website: {
    light: LightWebsite,
    dark: DarkWebsite,
    aspectRatio: `74%`,
  },
}