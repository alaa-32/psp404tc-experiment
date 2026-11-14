import assert from 'node:assert/strict';
import fs from 'node:fs';
assert.equal(process.env.VITE_COLLECTION_MODE,'preview');
assert.equal(process.env.VITE_PUBLIC_PREVIEW,'true');
assert.equal(process.env.VITE_SUBMISSION_ENDPOINT,'');
const bundles=fs.readdirSync('dist/assets').filter(f=>f.endsWith('.js')).map(f=>fs.readFileSync('dist/assets/'+f,'utf8')).join('\n');
assert.ok(bundles.includes('This public preview is for team testing.'));
assert.ok(!bundles.includes('https://formsubmit.app/f/'),'Preview contains a receiving endpoint');
console.log('Public preview audit passed: forced preview, blank endpoint, practice-only boundary.');
