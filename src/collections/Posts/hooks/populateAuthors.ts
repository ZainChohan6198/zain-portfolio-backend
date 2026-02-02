import type { CollectionAfterReadHook } from 'payload'

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the authors manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `populatedAuthors` field to populate the user data, hidden from the admin UI
export const populateAuthors: CollectionAfterReadHook = async ({ doc, req: { payload } }) => {
  if (doc?.author) {
    try {
      const authorDoc = await payload.findByID({
        id: typeof doc.author === 'object' ? doc.author?.id : doc.author,
        collection: 'users',
        depth: 0,
      })

      if (authorDoc) {
        let avatarData = null
        if (authorDoc.avatar) {
          try {
            const avatarDoc = await payload.findByID({
              id: typeof authorDoc.avatar === 'object' ? authorDoc.avatar?.id : authorDoc.avatar,
              collection: 'media',
              depth: 0,
            })
            if (avatarDoc) {
              avatarData = avatarDoc
            }
          } catch {
            // swallow error for avatar
          }
        }

        doc.populatedAuthor = {
          name: authorDoc.name,
          avatar: avatarData,
        }
      }
    } catch {
      // swallow error
    }
  }

  return doc
}
