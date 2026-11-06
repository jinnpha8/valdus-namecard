export const cardSlugs = { COO: 'jinnpha', PM: 'nattapong', HR: 'rannilin' };
export function resolveCard(pathname, search = '') {
  const slug = pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  const match = Object.keys(cardSlugs).find(key => cardSlugs[key] === slug);
  if (match) return match;
  const legacy = new URLSearchParams(search).get('card');
  return Object.hasOwn(cardSlugs, legacy) ? legacy : 'COO';
}
export function cardUrl(href, key) {
  const url = new URL(href);
  url.pathname = '/' + cardSlugs[key];
  url.searchParams.delete('card');
  url.hash = '';
  return url;
}
