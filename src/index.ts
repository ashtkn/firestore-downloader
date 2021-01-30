import { fetchAll } from './firebase/firestore'
import { promises as fs } from 'fs'

const downloadAll = async (filename: string) => {
  const data = await fetchAll()
  await fs.writeFile(filename, JSON.stringify(data, null, 2))
}

const main = async () => {
  await downloadAll('download.json')
}

main()
  .then()
  .catch((error) => {
    console.error(error)
  })
  .finally(() => {
    process.exit()
  })
