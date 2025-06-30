import * as Oceanic from "oceanic.js"

export default class EmbedBuilder {
  public author?: Oceanic.EmbedAuthorOptions
  public title?: string
  public description?: string
  public fields?: Oceanic.EmbedField[] = [];
  public image?: Oceanic.EmbedImageOptions
  public thumbnail?: Oceanic.EmbedImageOptions
  public timestamp?: string
  public footer?: Oceanic.EmbedFooterOptions
  public color?: number = 10086557
  public setAuthor(options: Oceanic.EmbedAuthorOptions) {
    this.author = options
    return this
  }
  /**
   * set the title
   */
  public setTitle(title: string): this {
    this.title = title
    return this
  }
  /**
   * set the description
   */
  public setDesc(desc: string): this {
    this.description = desc
    return this
  }
  /**
   * add a field
   */
  public addField(name: string, value: string, inline = false): this {
    this.fields?.push({ name, value, inline })
    return this
  }
  /**
   * add two or more fields
   */
  public addFields(...fields: Oceanic.EmbedField[]): this {
    fields.forEach(field => {
      this.fields?.push({
        name: field.name,
        value: field.value,
        inline: field.inline
      })
    })
    return this
  }
  /**
   * set a field
   */
  public setField(name: string, value: string, inline = false): this {
    this.fields = [
      {
        name, value, inline
      }
    ]
    return this
  }
  /**
   * set tow or more fields
   */
  public setFields(...fields: Oceanic.EmbedField[]): this {
    this.fields = fields
    return this
  }
  /**
   * set the image URL
   */
  public setImage(url: string) {
    this.image = { url }
    return this
  }
  /**
   * set the thumbnail
   */
  public setThumb(url: string) {
    this.thumbnail = { url }
    return this
  }
  /**
   * set the timestamp
   */
  public setTimestamp(timestamp = new Date()): this {
    this.timestamp = timestamp.toISOString()
    return this
  }
  /**
   * set the footer
   */
  public setFooter(text: string, icon?: string): this {
    this.footer = { text, iconURL: icon }
    return this
  }
  /**
   * build the embed
   */
  public build(content?: string | Oceanic.InteractionContent): Oceanic.InteractionContent {
    if(typeof content === "string" || !content) {
      return {
        content: content ?? "",
        embeds: [this],
        components: []
      }
    }
    else {
      return {
        embeds: [this],
        ...content
      }
    }
  }
}