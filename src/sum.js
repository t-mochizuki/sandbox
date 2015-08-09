/**
 * @param {Number} x
 * @param {Number} y
 * @return {Number} Sum of x and y
 */
module.exports = function sum(x, y) {
  if (arguments.length != 2) return null
  if (typeof x != 'number' || typeof y != 'number') return null
  if (x.toString() === 'NaN' || y.toString() === 'NaN') return null
  if (x.toString() === 'Infinity' || y.toString() === 'Infinity') return null
  return x + y
}
