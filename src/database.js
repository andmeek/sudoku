export default class Database {
  static async setup () {
    return new Promise((resolve, reject) => {
      if (!indexedDB) {
        reject(new Error('Indexed DB is not supported'))
        return
      }

      const request = indexedDB.open('sudoku', 1)

      request.onupgradeneeded = function () {
        const db = request.result

        db.createObjectStore('games', { keyPath: 'id', autoIncrement: true })
      }

      request.onsuccess = function () {
        resolve(request.result)
      }
    })
  }

  static async games () {
    return Database.setup()
      .then((db) => {
        return new Promise((resolve) => {
          const request = db.transaction(['games'], 'readonly').objectStore('games').getAll()

          request.onsuccess = function () {
            db.close()

            resolve(request.result)
          }
        })
      })
  }

  static async recordGame (game) {
    return Database.setup()
      .then((db) => {
        return new Promise((resolve) => {
          const transaction = db.transaction(['games'], 'readwrite')

          transaction.oncomplete = function () {
            db.close()

            resolve()
          }

          transaction.objectStore('games').add(game.toHash())
        })
      })
  }
}
