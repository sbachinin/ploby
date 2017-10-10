import { getPropType } from '../src/utils/checkRequiredProps';

test('should return nice prop type', () => {
  expect(getPropType(true)).toBe('boolean')
  expect(getPropType([])).toBe('array')
  expect(getPropType({})).toBe('object')
  expect(getPropType()).toBe('undefined')
})