import Database from '../src/database.js'
import indexedDB from 'fake-indexeddb'

global.indexedDB = indexedDB

describe('Database', () => {
  let db

  describe('#setup', () => {
    test('creates the game table', async () => {
      const db = await Database.setup()

      expect(db.objectStoreNames).toContain('games')
    })

    test('returns an error when indexedDB is not available', (done) => {
      global.indexedDB = null

      Database.setup().catch((err) => {
        expect(err.message).toEqual('Indexed DB is not supported')
        done()
      })

      global.indexedDB = indexedDB
    })
  })

  describe('with a setup database', () => {
    beforeEach(async () => {
      db = await Database.setup()
    })

    test('.recordGame adds a game to the object store', async (done) => {
      await Database.recordGame(genTestGame())

      const request = db.transaction(['games'], 'readwrite').objectStore('games').getAll()

      request.onsuccess = function () {
        const result = request.result

        expect(result.length).toEqual(1)
        expect(result[0].id).toEqual(1)
        expect(result[0].difficulty).toEqual('Easy')

        done()
      }
    })

    test('.games returns all the games stored', async () => {
      await Database.recordGame(genTestGame())
      await Database.recordGame(genTestGame())

      const results = await Database.games()

      expect(results.length).toEqual(2)
      console.log(results)
    })
  })
})
