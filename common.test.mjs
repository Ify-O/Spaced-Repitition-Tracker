import assert from "node:assert";
import test from "node:test";

import { getUserIds } from "./common.mjs";
import { calculateRevisionDates } from "../script.mjs";

test("calculateRevisionDates returns 5 revision dates", () => {
  const result = calculateRevisionDates("JS", "2027-07-19");
  assert.equal(result.length, 5);
});

test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});

test("User IDs are correct", () => {
  const expected = ["user1", "user2", "user3", "user4", "user5"];
  assert.deepEqual(getUserIds(), expected);
});

test("All user IDs are strings", () => {
  const ids = getUserIds();
  ids.forEach((id) => assert.strictEqual(typeof id, "string"));
});

test("User array is not empty", () => {
  assert.ok(getUserIds().length > 0);
});
