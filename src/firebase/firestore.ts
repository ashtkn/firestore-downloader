import admin from './admin'

const db = admin.firestore()

export default db

export const fetchAll = async (): Promise<{
  rootCollections: {
    id: string
    docs: FirebaseFirestore.DocumentData[]
  }[]
}> => {
  const rootCollectionsIds = await db.listCollections()
  const fetchRootCollectionsTasks = rootCollectionsIds.map(async ({ id }) => {
    const response = await db.collection(id).get()
    const docs = response.docs.map((doc) => doc.data())
    return { id, docs }
  })
  const rootCollections = await Promise.all(fetchRootCollectionsTasks)
  return { rootCollections }
}
