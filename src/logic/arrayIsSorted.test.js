import arrayIsSorted from './arrayIsSorted';

describe('arrayIsSorted', () => {
  describe('ascending', () => {
    it('concludes sorted arrays are sorted', () => {
      expect(arrayIsSorted([1])).toBeTruthy();
      expect(arrayIsSorted([])).toBeTruthy();
      expect(arrayIsSorted([1, 2, 3])).toBeTruthy();
      expect(arrayIsSorted([1, 2, 2, 3])).toBeTruthy();
    });
  });

  describe('descending', () => {
    it('concludes reverse sorted arrays are sorted', () => {
      expect(arrayIsSorted([], x => x, false)).toBeTruthy();
      expect(arrayIsSorted([1], x => x, false)).toBeTruthy();
      expect(arrayIsSorted([3, 2, 1], x => x, false)).toBeTruthy();
      expect(arrayIsSorted([3, 3, 1], x => x, false)).toBeTruthy();
    });

  });
});