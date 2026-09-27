import { R2_ASSET_INVENTORY, R2_BASE_URL as DEFAULT_R2_BASE_URL } from './r2Inventory.generated';
import { R2_ASSET_MANIFEST } from './r2AssetManifest.generated';

const R2_BASE_URL = (import.meta.env.VITE_ASSET_BASE_URL || DEFAULT_R2_BASE_URL).replace(/\/$/, '');

const encodeObjectKey = (key) => key.split('/').map(encodeURIComponent).join('/');

/**
 * Resolve only an explicitly verified object. R2 is intentionally primary for
 * verified assets; the browser's existing loading/error states handle runtime
 * failures without silently downloading a duplicate local copy.
 */
export function assetUrl(localPath) {
  const asset = R2_ASSET_MANIFEST[localPath];
  return asset?.status === 'VERIFIED_R2' && asset.r2Key
    ? `${R2_BASE_URL}/${encodeObjectKey(asset.r2Key)}`
    : localPath;
}

export { R2_ASSET_INVENTORY, R2_BASE_URL };
