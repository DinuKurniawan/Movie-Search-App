export function posterUrl(path, size = 'w342') {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null
}

export function yearFromDate(date) {
  return date ? date.slice(0, 4) : null
}