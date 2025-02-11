import { getDbPath } from "./utils.ts";

test("env development returns local db path", () => {
  expect(getDbPath("development")).toBe("db.json");
});
