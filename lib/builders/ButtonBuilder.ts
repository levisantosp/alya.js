import * as Oceanic from "oceanic.js"

export default class ButtonBuilder {
  public type: number = Oceanic.Constants.ComponentTypes.BUTTON
  public style?: 1 | 2 | 3 | 4 | 5
  public label?: string
  public customID: string = ""
  public emoji?: Oceanic.NullablePartialEmoji
  public url?: string | null = null
  public disabled?: boolean
  /**
   * set the style
   */
  public setStyle(style: "blue" | "gray" | "green" | "red" | "link"): this {
    switch (style.toLowerCase()) {
      case "blue": this.style = Oceanic.Constants.ButtonStyles.PRIMARY
        break
      case "gray": this.style = Oceanic.Constants.ButtonStyles.SECONDARY
        break
      case "green": this.style = Oceanic.Constants.ButtonStyles.SUCCESS
        break
      case "red": this.style = Oceanic.Constants.ButtonStyles.DANGER
        break
      case "link": this.style = Oceanic.Constants.ButtonStyles.LINK
        break
      default: throw new Error("Invalid style! Please, choose: \"BLUE\", \"GRAY\", \"GREEN\", \"RED\", \"LINK\"")
    }
    return this
  }
  /**
   * set the label
   */
  public setLabel(label: string): this {
    this.label = label
    return this
  }
  /**
   * set the custom id
   */
  public setCustomId(id: string): this {
    if(this.style === 5) throw new Error("URL buttons must not have a custom ID")
    this.customID = id
    return this
  }
  /**
   * set the emoji
   */
  public setEmoji(emoji: string): this {
    if(isNaN(Number(emoji))) this.emoji = {
      name: emoji
    }
    else this.emoji = {
      id: emoji
    }
    return this
  }
  /**
   * set the url
   */
  public setURL(url: string): Oceanic.URLButton & this {
    if(this.style !== 5) throw new Error("The component style must be 'link'")
    this.url = url
    return this as this & Oceanic.URLButton
  }
  /**
   * set the component as disabled
   */
  public setDisabled(): this {
    this.disabled = true
    return this
  }
  /**
   * set the component as enabled
   */
  public setEnabled(): this {
    this.disabled = false
    return this
  }
  /**
   * build the component
   */
  public build(content?: string | Oceanic.InteractionContent): Oceanic.InteractionContent {
    if(typeof content === "string") {
      return {
        content: content ?? "",
        components: [
          {
            type: 1,
            components: [this]
          }
        ]
      }
    }
    else {
      return {
        components: [
          {
            type: 1,
            components: [this]
          }
        ],
        ...content
      }
    }
  }
}