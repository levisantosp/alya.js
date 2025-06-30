let localesPath: string | null = null
export const setPath = (path: string) => {
  localesPath = path
}
export const getPath = () => {
  return localesPath
}