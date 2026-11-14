const test=import.meta.env?.DEV&&typeof location!=='undefined'?new URLSearchParams(location.search).get('test'):null;
export const KEY=(import.meta.env?.VITE_COLLECTION_MODE==='live'?'psp404tc.live.v1':'psp404tc.preview.v1')+(['A','B'].includes(test)?'.test'+test:'');
export function save(s,storage=localStorage){storage.setItem(KEY,JSON.stringify(s));}
export function restore(storage=localStorage){const raw=storage.getItem(KEY);if(!raw)return null;const s=JSON.parse(raw);if(s.schema_version!==1||!['A','B'].includes(s.condition)||s.order?.length!==8||new Set(s.order).size!==8||!Array.isArray(s.trials))throw Error('Invalid saved session');return s;}
export function clear(storage=localStorage){storage.removeItem(KEY);}
