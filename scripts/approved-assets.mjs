import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
export function verifyPublicPDF(relative,bytes,manifest){
 assert.ok(/^papers\/[A-Za-z0-9_-]+\.pdf$/.test(relative),'Unsafe PDF path');
 const owners=Object.values(manifest).filter(m=>[m.original_asset,m.guided_asset].includes(relative));
 assert.ok(owners.length,'Unregistered PDF: '+relative);
 for(const m of owners){
  assert.ok(m.rights_clearance===true&&m.researcher_approval===true&&m.content_equivalence_verified===true,'PDF approval missing: '+relative);
  assert.ok(m.publication_permission_reference?.trim(),'Public hosting permission reference missing');
  assert.equal(m.asset_sha256?.[relative],createHash('sha256').update(bytes).digest('hex'),'Approved PDF hash mismatch');
 }
}
