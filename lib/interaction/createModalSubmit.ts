import type { Options } from "../i18n/translate.ts"
import ModalSubmitInteractionContext from "./ModalSubmitInteractionContext.ts"

type CreateModalSubmitInteractionProps = {
  ctx: ModalSubmitInteractionContext
  t: (content: string, args?: Options) => string
}
type CreateModalSubmitInteractionOptions = {
  name: string
  isThinking?: boolean
  ephemeral?: boolean
  flags?: number
  run: (props: CreateModalSubmitInteractionProps) => Promise<any>
}
export default function(options: CreateModalSubmitInteractionOptions) {
  return options
}