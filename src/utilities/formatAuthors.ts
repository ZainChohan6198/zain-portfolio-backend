import { Post } from '@/payload-types'

/**
 * Formats a populatedAuthor from Posts into a prettified string.
 * @param author - The populatedAuthor from a Post.
 * @returns A prettified string of the author name.
 * @example
 *
 * { name: 'Author Name' } becomes 'Author Name'
 *
 */
export const formatAuthors = (author: NonNullable<Post['populatedAuthor']>) => {
  if (!author || !author.name) return ''

  return author.name
}
