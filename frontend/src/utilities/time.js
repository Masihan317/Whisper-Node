export function time(rawTime) {
  const date = new Date(rawTime)
  const hours = padZero(date.getHours())
  const minutes = padZero(date.getMinutes())
  return `${hours}:${minutes} `
}

function padZero(number) {
  return number.toString().padStart(2, "0")
}