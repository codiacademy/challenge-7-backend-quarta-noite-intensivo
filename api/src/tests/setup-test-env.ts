import { resetDatabase } from "./resetDB-test";

beforeEach(async () => {
  await resetDatabase();
});
