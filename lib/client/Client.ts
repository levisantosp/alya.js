import { statSync } from "node:fs"
import * as Oceanic from "oceanic.js"
import { setPath } from "../scripts/locales.ts"

export type ClientOptionsLocales = {
  path: string
}
export type ClientOptions = {
  client: Oceanic.Client
  locales?: ClientOptionsLocales
}
export class Client extends Oceanic.Client {
  public client: Oceanic.Client
  public constructor(options: ClientOptions) {
    super()
    this.client = options.client
    if(
      options.locales &&
      !statSync(options.locales.path).isDirectory()
    ) {
      throw new Error(`Invalid locales path has been provided. '${options.locales.path}' is not a valid path.`)
    }
    if(options.locales) {
      setPath(options.locales.path)
    }
  }
}