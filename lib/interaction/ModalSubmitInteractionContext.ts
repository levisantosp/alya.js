import type { EditInteractionContent, File, Guild, InteractionContent, ModalSubmitInteraction } from "oceanic.js"
import { Client } from "../client/Client.ts"
import translate, { Options } from "../i18n/translate.ts"

type ModalSubmitInteractionContextOptions = {
  client: Client
  guild: Guild | null
  interaction: ModalSubmitInteraction
  locale: string
  args: string[]
}
export default class ModalSubmitInteractionContext {
  public client: Client
  public guild: Guild | null
  public interaction: ModalSubmitInteraction
  public locale: string
  public args: string[]
  public flags?: number
  public constructor(options: ModalSubmitInteractionContextOptions) {
    this.client = options.client
    this.guild = options.guild
    this.interaction = options.interaction
    this.locale = options.locale
    this.args = options.args
  }
  public setFlags(flags: number) {
    this.flags = flags
    return this
  }
  public async reply(content: string | InteractionContent, options?: Options): Promise<any> {
    switch(typeof content) {
      case "string": {
        if(options?.files) {
          if(this.interaction.acknowledged) return await this.interaction.createFollowup(
            {
              content: translate(this.locale, content, options),
              files: options.files as File[]
            }
          )
          else return await this.interaction.createMessage(
            {
              content: translate(this.locale, content, options),
              files: options.files as File[]
            }
          )
        }
        else {
          if(this.interaction.acknowledged) return await this.interaction.createFollowup(
            {
              content: translate(this.locale, content, options)
            }
          )
          else return await this.interaction.createMessage(
            {
              content: translate(this.locale, content, options)
            }
          )
        }
      }
      case "object": {
        if(options?.files) {
          if(this.interaction.acknowledged) return await this.interaction.createFollowup(
            Object.assign(
              content,
              {
                files: options.files
              }
            )
          )
          else return await this.interaction.createMessage(
            Object.assign(
              content,
              {
                files: options.files
              }
            )
          )
        }
        else {
          if(this.interaction.acknowledged) return await this.interaction.createFollowup(content)
          else return await this.interaction.createMessage(content)
        }
      }
    }
  }
  public async edit(content: string | EditInteractionContent, options?: Options): Promise<any> {
    switch(typeof content) {
      case "string": {
        if(options?.files) {
          if(this.interaction.acknowledged) return await this.interaction.createFollowup(
            {
              content: translate(this.locale, content, options),
              files: options.files as File[]
            }
          )
          else return await this.interaction.createMessage(
            {
              content: translate(this.locale, content, options),
              files: options.files as File[]
            }
          )
        }
        else {
          if(this.interaction.acknowledged) return await this.interaction.editOriginal(
            {
              content: translate(this.locale, content, options)
            }
          )
          else return await this.interaction.editParent(
            {
              content: translate(this.locale, content, options)
            }
          )
        }
      }
      case "object": {
        if(options?.files) {
          if(this.interaction.acknowledged) return await this.interaction.editOriginal(
            Object.assign(
              content,
              {
                files: options.files
              }
            )
          )
          else return await this.interaction.editParent(
            {
              ...content,
              files: options.files
            } as InteractionContent
          )
        }
        else {
          if(this.interaction.acknowledged) return await this.interaction.editOriginal(content as InteractionContent)
          else return await this.interaction.editParent(content as InteractionContent)
        }
      }
    }
  }
}