import * as Oceanic from "oceanic.js"
import CommandContext from "./CommandContext.ts"
import type { Client } from "../client/Client.ts"
import type { Options } from "../i18n/translate.ts"
import ComponentInteractionContext from "../interaction/ComponentInteractionContext.ts"
import ModalSubmitInteractionContext from "../interaction/ModalSubmitInteractionContext.ts"

type CommandOptions = {
  ctx: CommandContext
  client: Client
  t: (content: string, options?: Options) => string
  id: string
}
type CreateAutocompleteInteractionOptions = {
  i: Oceanic.AutocompleteInteraction
  t: (content: string, options?: Options) => string
  client: Client
  args?: string[]
}
type CreateComponentInteractionOptions = {
  ctx: ComponentInteractionContext
  t: (content: string, options?: Options) => string
  i: Oceanic.ComponentInteraction
  client: Client
}
type CreateModalSubmitInteractionOptions = {
  ctx: ModalSubmitInteractionContext
  client: Client
  t: (content: string, options?: Options) => string
  i: Oceanic.ModalSubmitInteraction
}
export type Command = {
  name: string
  nameLocalizations?: Partial<Record<Oceanic.Locale, string>>
  description: string
  category: "simulator" | "admin" | "esports" | "misc" | "premium"
  descriptionLocalizations?: Partial<Record<Oceanic.Locale, string>>
  options?: Oceanic.ApplicationCommandOptions[]
  syntax?: string
  syntaxes?: string[]
  examples?: string[]
  client?: Client
  permissions?: Oceanic.Constants.PermissionName[]
  botPermissions?: Oceanic.Constants.PermissionName[]
  onlyDev?: boolean
  ephemeral?: boolean
  userInstall?: boolean
  run: (options: CommandOptions) => Promise<any>
  createAutocompleteInteraction?: (options: CreateAutocompleteInteractionOptions) => Promise<any>
  createInteraction?: (options: CreateComponentInteractionOptions) => Promise<any>
  createModalSubmitInteraction?: (options: CreateModalSubmitInteractionOptions) => Promise<any>
}
export default function(command: Command) {
  return command
}