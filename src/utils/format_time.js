export function fnTime (date) {
  const d = new Date(date)
  const times =
    d.getFullYear() +
    '-' +
    (d.getMonth() + 1) +
    '-' +
    d.getDate() +
    ' ' +
    fnTimeFiguresMakeUp(d.getHours()) +
    ':' +
    fnTimeFiguresMakeUp(d.getMinutes()) +
    ':' +
    fnTimeFiguresMakeUp(d.getSeconds())
  return times
}

/**
     * 时间数字补齐
     */
function fnTimeFiguresMakeUp (val) {
  return parseInt(val) < 10 ? '0' + val : val
}
