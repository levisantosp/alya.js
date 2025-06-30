import * as Oceanic from "oceanic.js"

export default class SelectMenuBuilder {
  public type: number = Oceanic.Constants.ComponentTypes.STRING_SELECT
  public customID?: string
  public placeholder?: string
  public options: Oceanic.SelectOption[] = []
  public minValues?: number
  public maxValues?: number
  public disabled?: boolean
  /**
   * set the custom id
   */
  public setCustomId(id: string): this {
    this.customID = id
    return this
  }
  /**
   * set the placeholder
   */
  public setPlaceholder(text: string): this {
    this.placeholder = text
    return this
  }
  /**
   * add an option
   */
  public addOption(label: string, value: string, description?: string, emoji?: Oceanic.NullablePartialEmoji): this {
    this.options.push({ label, value, description, emoji })
    return this
  }
  /**
   * add two or more options
   */
  public addOptions(...options: Oceanic.SelectOption[]): this {
    this.options.push(...options)
    return this
  }
  /**
   * set a option
   */
  public setOption(label: string, value: string, description?: string, emoji?: Oceanic.NullablePartialEmoji): this {
    this.options = [{ label, value, description, emoji }]
    return this
  }
  /**
   * set two more options
   */
  public setOptions(...options: Oceanic.SelectOption[]): this {
    this.options = options
    return this
  }
  /**
   * set the min values
   */
  public setMin(min: number): this {
    this.minValues = min
    return this
  }
  /**
   * set the max values
   */
  public setMax(max: number): this {
    this.maxValues = max
    return this
  }
  /**
   * set the button as disabled
   */
  public setDisabled(): this {
    this.disabled = true
    return this
  }
  /**
   * set the button as enabled
   */
  public setEnabled(): this {
    this.disabled = false
    return this
  }
  /**
   * build the component
   */
  public build(content?: string | Oceanic.InteractionContent) {
    const menu: Oceanic.StringSelectMenu = {
      type: this.type,
      customID: this.customID!,
      placeholder: this.placeholder,
      options: this.options,
      minValues: this.minValues,
      maxValues: this.maxValues,
      disabled: this.disabled,
    }
    if(typeof content === "string") {
      return {
        content: content ?? "",
        components: [
          {
            type: 1,
            components: [menu]
          }
        ]
      }
    }
    else {
      return {
        components: [
          {
            type: 1,
            components: [menu]
          }
        ],
        ...content
      }
    }
  }
}