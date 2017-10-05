import pipe from '../src/utils/pipe';

test('should throw error if any piped fn returns primitive value (& not undefined)', () => {
  const fns = [
    () => 1,
  ]
  expect(() => {
    pipe(fns, {});
  }).toThrow();
});


test('should return the positive pipeResult', () => {
  const fns = [
    () => ({a: 1}),
    () => ({ pipeResult: 2 }),
    () => ({c: 2})
  ]
  const result = pipe(fns, {})
  expect(result).toBe(2);
});


test('should not break with pipeResult of 0', () => {
  const fns = [
    () => ({a: 1}),
    () => ({ pipeResult: 0 }),
    () => 'fsdfdsf'
  ]
  const result = pipe(fns, {})
  expect(result).toBe(0);
})


test('should not run fns after { pipeResult }', () => {
  const lastFn = jest.fn()
  const fns = [
    () => ({a: 1}),
    () => ({ pipeResult: 2 }),
    lastFn
  ]
  const result = pipe(fns, {})
  expect(lastFn).not.toHaveBeenCalled();
});