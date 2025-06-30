import * as Oceanic from "oceanic.js"
import translate, { Options } from "../i18n/translate.ts"
import { Client } from "../client/Client.ts"

type CommandContextOptions = {
  client: Client
  guild: Oceanic.Guild | null
  interaction: Oceanic.CommandInteraction | Oceanic.ComponentInteraction | Oceanic.ModalSubmitInteraction
  locale: string
  args: string[]
}
export default class CommandContext {
  public client: Client
  public guild: Oceanic.Guild | null
  public interaction: Oceanic.CommandInteraction | Oceanic.ComponentInteraction | Oceanic.ModalSubmitInteraction
  public locale: string
  public args: string[]
  public constructor(options: CommandContextOptions) {
    this.client = options.client
    this.guild = options.guild
    this.interaction = options.interaction
    this.locale = options.locale
    this.args = options.args
  }
  public async reply(content: string | Oceanic.InteractionContent, options?: Options): Promise<any> {
    switch(typeof content) {
      case "string": {
        if(options?.files) {
          if(this.interaction.acknowledged) return await this.interaction.createFollowup(
            {
              content: translate(this.locale, content, options),
              files: options.files as Oceanic.File[]
            }
          ).catch(e => console.log(e))
          else return await this.interaction.createMessage(
            {
              content: translate(this.locale, content, options)
            }
          ).catch(e => console.log(e))
        }
        else {
          if(this.interaction.acknowledged) return await this.interaction.createFollowup(
            {
              content: translate(this.locale, content, options)
            }
          ).catch(e => console.log(e))
          else return await this.interaction.createMessage(
            {
              content: translate(this.locale, content, options)
            }
          ).catch(e => console.log(e))
        }
      }
      case "object": {
        if(options?.files) {
          if(this.interaction.acknowledged) return await this.interaction.createFollowup(Object.assign(content, { files: options.files as Oceanic.File[] })).catch(e => console.log(e))
          else return await this.interaction.createMessage(Object.assign(content, { files: options.files as Oceanic.File[] })).catch(e => console.log(e))
        }
        else {
          if(this.interaction.acknowledged) return await this.interaction.createFollowup(content).catch(e => console.log(e))
          else return await this.interaction.createMessage(content).catch(e => console.log(e))
        }
      }
    }
  }
  public async edit(content: string | Oceanic.EditInteractionContent, options?: Options): Promise<any> {
    if(this.interaction instanceof Oceanic.CommandInteraction) {
      switch(typeof content) {
        case "string": {
          if(options?.files) {
            if(this.interaction.acknowledged) return await this.interaction.editOriginal(
              {
                content: translate(this.locale, content, options),
                files: options.files as Oceanic.File[],
                components: []
              }
            ).catch(e => console.log(e))
            else return await this.interaction.createMessage({
              content: translate(this.locale, "helper.interaction_failed"),
              flags: 64
            }).catch(e => console.log(e))
          }
          else {
            if(this.interaction.acknowledged) return await this.interaction.editOriginal(
              {
                content: translate(this.locale, content, options),
                components: []
              }
            ).catch(e => console.log(e))
            else return await this.interaction.createMessage({
              content: translate(this.locale, "helper.interaction_failed"),
              flags: 64
            }).catch(e => console.log(e))
          }
        }
        case "object": {
          if(options?.files) {
            if(this.interaction.acknowledged) return await this.interaction.editOriginal(
              Object.assign(
                content,
                {
                  files: options.files as Oceanic.File[],
                  components: []
                }
              )
            )
            else return await this.interaction.createMessage({
              content: translate(this.locale, "helper.interaction_failed"),
              flags: 64
            }).catch(e => console.log(e))
          }
          else {
            if(this.interaction.acknowledged) return await this.interaction.editOriginal({
              ...content,
              components: []
            })
            else return await this.interaction.createMessage({
              content: translate(this.locale, "helper.interaction_failed"),
              flags: 64
            }).catch(e => console.log(e))
          }
        }
      }
    }
    else if(this.interaction instanceof Oceanic.ComponentInteraction) {
      switch(typeof content) {
        case "string": {
          if(options?.files) {
            if(this.interaction.acknowledged) return await this.interaction.editOriginal(
              {
                content: translate(this.locale, content, options),
                files: options.files as Oceanic.File[],
                components: []
              }
            ).catch(e => console.log(e))
            else return await this.interaction.createMessage({
              content: translate(this.locale, "helper.interaction_failed"),
              flags: 64
            }).catch(e => console.log(e))
          }
          else {
            if(this.interaction.acknowledged) return await this.interaction.editOriginal(
              {
                content: translate(this.locale, content, options),
                components: []
              }
            ).catch(e => console.log(e))
            else return await this.interaction.createMessage({
              content: translate(this.locale, "helper.interaction_failed"),
              flags: 64
            }).catch(e => console.log(e))
          }
        }
        case "object": {
          if(options?.files) {
            if(this.interaction.acknowledged) return await this.interaction.editOriginal(Object.assign(content, { files: options.files as Oceanic.File[] })).catch(e => console.log(e))
            else return await this.interaction.createMessage({
              content: translate(this.locale, "helper.interaction_failed"),
              flags: 64
            }).catch(e => console.log(e))
          }
          else {
            if(this.interaction.acknowledged) return await this.interaction.editOriginal({
              ...content,
              components: !content.components ? [] : content.components,
              content: !content.content ? "" : content.content
            })
            else return await this.interaction.createMessage({
              content: translate(this.locale, "helper.interaction_failed"),
              flags: 64
            }).catch(e => console.log(e))
          }
        }
      }
    }
  }
}