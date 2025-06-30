import type { File } from "oceanic.js"
import { getPath } from "../scripts/locales.ts"
import { resolve } from "node:path"
import { readFileSync } from "node:fs"

export type Options = {
  [key: string]: string | Error | number | File[] | undefined | null
}
export default function(lang: string, content: string, options?: Options) {
  if(!getPath()) throw new Error("You must to set the locale path on client options")
  const path = resolve(`${getPath()}/${lang}.json`)
  const raw = readFileSync(path, "utf-8")
  let locale = JSON.parse(raw)
  for(const attr of content.split(".")) {
    locale = locale[attr]
    if(!locale) return content
  }
  if(options) {
    for(const option of Object.keys(options)) {
      locale = locale.replaceAll(`{${option}}`, options[option])
    }
  }
  return locale as string
}