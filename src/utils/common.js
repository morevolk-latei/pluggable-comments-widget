
/**
 * 
 * @param {*} id  `_ prefixed string id`
 * @returns `INT id without _ prefix`
 */
export const getCommentIdParsed = (id) => Number(String(id).substring(1))

/**
 * It returns the id with an underscore prepended, if not already present
 * @param id - The id of the element to be selected.
 * @returns The id with an underscore prepended to it. If already present return as it is
 */
export const getId = (id) => {
  if (String(id).startsWith('_')) return id

  return `_${id}`
}
