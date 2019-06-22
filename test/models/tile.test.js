import Tile from '../../src/models/tile.js'

describe('Tile', () => {
  var tile

    beforeEach(() => {
      tile = new Tile('id', 1, 2, 9, true)
    })

  test('initialization', () => {
    expect(tile.id).toEqual('id')
    expect(tile.x).toEqual(1)
    expect(tile.x).toEqual(1)
    expect(tile.y).toEqual(2)
    expect(tile.actualValue).toEqual(9)
    expect(tile.userEditable).toEqual(true)
    expect(tile.userValue).toBeNull()
    expect(tile.userDrafts).toEqual([])
  })

  describe('.error', () => {
    test('returns false if no user value has been set', () => {
      tile.userValue = null

      expect(tile.error).toBeFalsy()
    })

    test('returns false if the user value is correct', () => {
      tile.userValue = tile.actualValue

      expect(tile.error).toBeFalsy()
    })

    test('returns true if the user value is incorrect', () => {
      tile.userValue = tile.actualValue + 1

      expect(tile.error).toBeTruthy()
    })
  })

  describe('.completed', () => {
    test('returns false when its user editable and no value is set', () => {
      tile.userValue = null
        tile.userEditable = true

      expect(tile.completed).toBeFalsy()
    })

    test('returns true when its not user editable', () => {
      tile.userValue = null
      tile.userEditable = false

      expect(tile.completed).toBeTruthy()
    })

    test('returns false when its user editable but has the wrong value', () => {
      tile.userValue = tile.actualValue + 1
      tile.userEditable = true

      expect(tile.completed).toBeFalsy()
    })

    test('returns true when the user value is correct', () => {
      tile.userValue = tile.actualValue
      tile.userEditable = true

      expect(tile.completed).toBeTruthy()
    })
  })

  describe('.isSibling', () => {
    test('returns false if its being compared against the same tile', () => {
      expect(tile.isSibling(tile)).toBeFalsy()
    })

    test('returns true if the tiles share the same "x" value', () => {
      var tile2 = new Tile("id", tile.x, 1, 1)

      expect(tile.isSibling(tile2)).toBeTruthy()
    })

    test('returns true if the tiles share the same "y" value', () => {
      var tile2 = new Tile("id", 9, tile.y, 1)

      expect(tile.isSibling(tile2)).toBeTruthy()
    })

    test('returns false if the tiles are on different x or y values', () => {
      var tile2 = new Tile("id", 0, 0, 1)

      expect(tile.isSibling(tile2)).toBeFalsy()
    })

    test('returns false if no value or null value is provide', () => {
      expect(tile.isSibling()).toBeFalsy()
      expect(tile.isSibling(null)).toBeFalsy()
    })
  })

  describe('.toggleDraft', () => {
    test('adds the value if not set', () => {
      expect(tile.userDrafts).not.toContain(2)

      tile.toggleDraft(2)

      expect(tile.userDrafts).toContain(2)
    })

    test('only removes the value if set', () => {
      tile.userDrafts = [1, 2]

      tile.toggleDraft(2)

      expect(tile.userDrafts).toEqual([1])
    })
  })

  describe('.toggleValue', () => {
    test('sets the user value', () => {
      tile.userValue = null

      tile.toggleValue(2)

      expect(tile.userValue).toEqual(2)
    })

    test('unsets the user value if provided the same input', () => {
      tile.userValue = 2
      tile.toggleValue(2)

      expect(tile.userValue).toBeNull()
    })

    test('replaces the current value if not the same', () => {
      tile.userValue = 2
      tile.toggleValue(3)

      expect(tile.userValue).toEqual(3)
    })
  })

  describe('.value', () => {
    test('returns the userValue if editable', () => {
      tile.userValue = null
      tile.userEditable = true

      expect(tile.value).toEqual(null)

      tile.userValue = 9

      expect(tile.value).toEqual(9)
    })

    test('returns the actualValue if not editable regardless of the userValue', () => {
      tile.userEditable = false

      expect(tile.value).toEqual(9)

      tile.userValue = 2

      expect(tile.value).toEqual(9)
    })
  })
})
