import { getUserIds } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});

test("User IDs are correct", () => {
  const expected = ["1", "2", "3", "4", "5"];
  assert.deepEqual(getUserIds(), expected);
});

test("All user IDs are strings", () => {
  const ids = getUserIds();
  ids.forEach((id) => assert.strictEqual(typeof id, "string"));
});

test("User array is not empty", () => {
  assert.ok(getUserIds().length > 0);
});