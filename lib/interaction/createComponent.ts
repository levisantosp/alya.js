import type { Options } from "../i18n/translate.ts"
import ComponentInteractionContext from "./ComponentInteractionContext.ts"

type CreateInteractionProps = {
  ctx: ComponentInteractionContext
  t: (content: string, args?: Options) => string
}
type CreateInteractionOptions = {
  name: string
  isThinking?: boolean
  ephemeral?: boolean
  flags?: number
  run: (props: CreateInteractionProps) => Promise<any>
}
export default function(options: CreateInteractionOptions) {
  return options
}