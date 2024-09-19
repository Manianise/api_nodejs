import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { checkDatabaseConnection } from '../src/app/server/connexion.spec.js';

describe('Connecting', () => {
  it('should return true', () => {
    assert.doesNotThrow(() => checkDatabaseConnection());
  });
});