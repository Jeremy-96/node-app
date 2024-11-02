import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { sum, sub } from '#utils/math.js';

describe('Mathematicals operations', () => {
  it('adds 1 + 3 equal 3', () => {
    const total = sum(1, 2);

    assert.strictEqual(total, 3);
  });

  it('subs 4 - 2 equal 2', () => {
    const total = sub(4, 2);

    assert.strictEqual(total, 2);
  });
});
