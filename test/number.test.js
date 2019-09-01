import '../src/number.js'

describe('Number helpers', () => {
  describe('.lpad', () => {
    test('returns "01" when the value is one but the padding length is 2', () => {
      const num = 1

      expect(num.lpad(2)).toEqual('01')
    })

    test('returns "1" when the value is one and the length provided is 1', () => {
      const num = 1

      expect(num.lpad(1)).toEqual('1')
    })

    test('returns "120" when the value is 120 but the length provided is 2', () => {
      const num = 120

      expect(num.lpad(1)).toEqual('120')
    })
  })
  describe('.toTimerDisplay', () => {
    test('returns "00:00:02" when the value is 2', () => {
      const num = 2

      expect(num.toTimerDisplay()).toEqual('00:00:02')
    })

    test('returns "00:02:50" when the value is 170', () => {
      const num = 170

      expect(num.toTimerDisplay()).toEqual('00:02:50')
    })

    test('returns "00:02:02" when the value is 122', () => {
      const num = 122

      expect(num.toTimerDisplay()).toEqual('00:02:02')
    })

    test('returns "02:02:02" when the value is 7233', () => {
      const num = 7322

      expect(num.toTimerDisplay()).toEqual('02:02:02')
    })

    test('returns "120:10:00" when the value is 432600', () => {
      const num = 432600

      expect(num.toTimerDisplay()).toEqual('120:10:00')
    })
  })
})
