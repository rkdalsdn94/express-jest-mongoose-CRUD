// 단위 테스트를 위한 공간.

describe('Calculation', () => {
  test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
  });

  test('two plus two is not five', () => {
    expect(2 + 2).not.toBe(5);
  });
});
