export function load(key, defaultValue) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
}
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
