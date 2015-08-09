let assert = require('power-assert')
let sum = require('../dist/sum.js')

describe('sum', () => {
  it('12 + 23', () => {
    assert(sum(12, 23) === 35)
  })
  it('234', () => {
    assert(sum(234) === null)
  })
  it('abc + def', () => {
    assert(sum('abc', 'def') === null)
  })
  it('1 + NaN', () => {
    assert(sum(1, NaN) === null)
  })
  it('NaN + 2', () => {
    assert(sum(NaN, 2) === null)
  })
  it('1 + Infinity', () => {
    assert(sum(1, Infinity) === null)
  })
  it('Infinity + 2', () => {
    assert(sum(Infinity, 2) === null)
  })
  it('1 + false', () => {
    assert(sum(1, false) === null)
  })
  it('true + 2', () => {
    assert(sum(true, 2) === null)
  })
})
