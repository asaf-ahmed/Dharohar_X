// The checked-in generated inventory comes from the authenticated Wrangler
// metadata export. Never replace it with a public listing probe.
console.warn(
  'Authenticated inventory is checked in. Refusing to overwrite it from an unauthenticated public listing probe.'
);
