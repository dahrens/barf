export const round = (value, roundSettings) => {
  if (!roundSettings.enabled) return value
  let mod = parseInt(roundSettings.value)
  let diff = value % mod
  if (diff === 0) return value
  else if (diff > (mod / 2)) return value + mod - diff
  else return value - diff
}
