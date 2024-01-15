import { isShallowEqual, depthOf } from '../../src/utils/isShallowEqual';

describe('isShallowEqual', () => {
  it('depth 0', () => {
    expect(depthOf(0)).toBe(0);
    expect(depthOf(null)).toBe(0);
    expect(depthOf(undefined)).toBe(0);

    expect(isShallowEqual(0, 0)).toBe(true);
    expect(isShallowEqual(0, 1)).toBe(false);
    expect(isShallowEqual(0, null)).toBe(false);
    expect(isShallowEqual(0, undefined)).toBe(false);
    expect(isShallowEqual(0, {})).toBe(false);
    expect(isShallowEqual({}, {})).toBe(true);
    expect(isShallowEqual(0, [])).toBe(false);
    expect(isShallowEqual([], [])).toBe(true);
    expect(isShallowEqual(0, '0')).toBe(false);
    expect(isShallowEqual('0', '0')).toBe(true);
    expect(isShallowEqual(0x0, 0x0)).toBe(true);
    expect(isShallowEqual(Symbol(), Symbol())).toBe(false);
    expect(isShallowEqual(Symbol.for('0'), Symbol.for('0'))).toBe(true);
    expect(isShallowEqual(true, true)).toBe(true);
    expect(isShallowEqual(false, false)).toBe(true);
    expect(isShallowEqual(true, false)).toBe(false);
  });

  it('depth 1', () => {
    expect(depthOf({ a: 0 })).toBe(1);
    expect(depthOf([0])).toBe(1);

    expect(isShallowEqual({ a: 0 }, { a: 0 })).toBe(true);
    expect(isShallowEqual({ a: 0 }, { a: 1 })).toBe(false);
    expect(isShallowEqual({ a: 0 }, { a: null })).toBe(false);
    expect(isShallowEqual([0], [0])).toBe(true);
    expect(isShallowEqual([0], [1])).toBe(false);

    expect(isShallowEqual({ a: 0 }, { a: 0, b: 0 })).toBe(false);
    expect(isShallowEqual({ a: 0, b: 0 }, { a: 0 })).toBe(false);

    expect(isShallowEqual({ a: [0] }, { a: [0] })).toBe(true);
    expect(isShallowEqual({ a: [0] }, { a: [1] })).toBe(false);

    expect(isShallowEqual([{ a: 0 }], [{ a: 0 }])).toBe(true);
    expect(isShallowEqual([{ a: 0 }], [{ a: 1 }])).toBe(false);
  });

  it('depth 2', () => {
    expect(depthOf({ a: { b: 0 } })).toBe(2);
    expect(depthOf({ a: [0] })).toBe(2);
    expect(depthOf([{ a: 0 }])).toBe(2);
    expect(depthOf([[0]])).toBe(2);

    expect(isShallowEqual({ a: { b: 0 } }, { a: { b: 0 } })).toBe(true);
    expect(isShallowEqual({ a: { b: 0 } }, { a: { b: 1 } })).toBe(false);
    expect(isShallowEqual({ a: { b: 0 } }, { a: { b: null } })).toBe(false);
    expect(isShallowEqual({ a: { b: 0 } }, { a: { b: 0, c: 0 } })).toBe(false);
    expect(isShallowEqual({ a: { b: 0, c: 0 } }, { a: { b: 0 } })).toBe(false);
    expect(isShallowEqual({ a: { b: [0] } }, { a: { b: [0] } })).toBe(true);
    expect(isShallowEqual({ a: { b: [0] } }, { a: { b: [1] } })).toBe(false);
  });

  it('depth 3', () => {
    expect(depthOf({ a: { b: { c: 0 } } })).toBe(3);
    expect(depthOf({ a: { b: [0] } })).toBe(3);
    expect(depthOf({ a: [[0]] })).toBe(3);
    expect(depthOf([[[0]]])).toBe(3);

    expect(isShallowEqual({ a: { b: { c: 0 } } }, { a: { b: { c: 0 } } })).toBe(
      true,
    );
    expect(isShallowEqual({ a: { b: { c: 0 } } }, { a: { b: { c: 1 } } })).toBe(
      false,
    );
    expect(
      isShallowEqual({ a: { b: { c: 0 } } }, { a: { b: { c: null } } }),
    ).toBe(false);
    expect(
      isShallowEqual({ a: { b: { c: 0 } } }, { a: { b: { c: 0, d: 0 } } }),
    ).toBe(false);
    expect(
      isShallowEqual({ a: { b: { c: 0, d: 0 } } }, { a: { b: { c: 0 } } }),
    ).toBe(false);
    expect(
      isShallowEqual({ a: { b: { c: [0] } } }, { a: { b: { c: [0] } } }),
    ).toBe(true);
    expect(
      isShallowEqual({ a: { b: { c: [0] } } }, { a: { b: { c: [1] } } }),
    ).toBe(true);
  });

  it('depth 4', () => {
    expect(depthOf({ a: { b: { c: [0] } } })).toBe(Infinity);

    expect(
      isShallowEqual({ a: { b: { c: [0] } } }, { a: { b: { c: [1] } } }, 1, 4),
    ).toBe(false);
  });
});
