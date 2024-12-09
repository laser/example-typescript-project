import * as assert from 'node:assert';
import { test } from 'node:test';
import os from 'os';

test('addition', { concurrency: os.cpus().length }, async () => {
  assert.strictEqual(1 + 1, 4);
});
