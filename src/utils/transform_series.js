function seriesRadius (series) {
  if (series.radius) {
    series.radius += '%'
  }
  return series
}

export default {
  seriesRadius
}
