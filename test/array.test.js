import '../src/array.js'

describe('Array helpers', () => {
  describe('.clone', () => {
    var base = [1, 2, 3]

    it('returns a duplicate of the array', () => {
      expect(base.clone()).toEqual([1, 2, 3])
    })

    it('does not reference the previous array', () => {
      var cloned = base.clone()
      cloned[0] = 33

      expect(base[0]).toEqual(1)
    })

    it('deep clones the array', () => {
      var multiDimensionalArray = [[1, 2, 3], [4, 5, 6], [123]],
          cloned = multiDimensionalArray.clone()

      cloned[2] = [7, 8, 9]
      cloned[1][0] = 1

      expect(multiDimensionalArray[2]).toEqual([123])
      expect(multiDimensionalArray[1][0]).toEqual(4)
    })
  })

  describe('.distinct', () => {
    it('returns the same array if there is no distinct values by default', () => {
      var arr = [1, 2, 3]

      expect(arr.distinct()).toEqual([1, 2, 3])
    })

    it('returns only the distinct values of an array with duplicate values', () => {
      var arr = [1, 2, 1, 2, 3]

      expect(arr.distinct()).toEqual([1, 2, 3])
    })

    it('returns a copy that does not reference the original', () => {
      var arr = [1, 2, 1, 2, 3],
        distinct = arr.distinct()

      arr[0] = 22
      distinct[0] = 23
      expect(distinct[0]).not.toEqual(22)
      expect(arr[0]).not.toEqual(23)
    })
  })

  describe('.flat', () => {
    it('returns the same array if it is not multi-dimensional', () => {
      expect([1, 2, 3].flat()).toEqual([1, 2, 3])
    })

    it('returns a flattened array if it has sub-arrays', () => {
      var arr = [[1, 2, 3], [4, 5, 6], 7]

      expect(arr.flat()).toEqual([1, 2, 3, 4, 5, 6, 7])
    })
  })

  describe('.removeItem', () => {
    it('removes the item when found', () => {
      var arr = [1, 2, 3]
      arr.removeItem(3)

      expect(arr).toEqual([1, 2])
    })

    it('does nothing if the item is not found', () => {
      var arr = [1, 2, 3]
      arr.removeItem(33)

      expect(arr).toEqual([1, 2, 3])
    })
  })

  describe('.shuffleSeed', () => {
    it('shuffled the array randomly', () => {
      var arr = [1, 2, 3]
      arr.shuffleSeed()

      expect(arr).toEqual([2, 3, 1])
    })

    it('consistenly shuffles based upon the provided seed', () => {
      var arr = [1, 2, 3, 4, 5, 6]
      arr.shuffleSeed(213)

      expect(arr).toEqual([4, 3, 1, 5, 6, 2])

      var arr2 = [1, 2, 3, 4, 5, 6]
      arr2.shuffleSeed(213)

      expect(arr).toEqual([4, 3, 1, 5, 6, 2])
    })
  })
})
