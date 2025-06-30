import type { ClientEvents } from "oceanic.js"
import { Client } from "./Client.ts"

type Listener<T extends keyof ClientEvents> = {
  name: T
  run: (client: Client, ...args: ClientEvents[T]) => Promise<any>
}
export default function<T extends keyof ClientEvents>(listener: Listener<T>) {
  return listener
}