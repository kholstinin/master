export function getDbPath(env: string | undefined) {
  return env === "development" ? "db.json" : "";
}
