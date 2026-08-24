// src/utils/paths.js
const base = import.meta.env.BASE_URL || '/'

export const getImagePath = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${base}${cleanPath}`
}