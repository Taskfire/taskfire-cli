import { forEach } from '../src/helpers/util'

describe('util.spec', () => {
  describe('forEach', () => {
    test('loops through provided array passing value', () => {
      const arr = ['a', 'b', 'c']
      const out = []
      forEach(arr, (val) => { out.push(val) })
      expect(out).toEqual(arr)
    })

    test('loops through provided array passing index', () => {
      const arr = ['a', 'b', 'c']
      const out = []
      forEach(arr, (val, index) => { out.push(index) })
      expect(out).toEqual([0, 1, 2])
    })

    test('returns value of first undefined loop', () => {
      const arr = ['a', 'b', 'c']
      const out = forEach(arr, val => val)
      expect(out).toEqual('a')
    })

    test('returns null if loop exhausted without return value', () => {
      const arr = ['a', 'b', 'c']
      const out = forEach(arr, () => undefined)
      expect(out).toEqual(null)
    })
  })
})
