export const originalFiles={CS:'cs.pdf',RB:'robotic.pdf',EC:'economic.pdf',ED:'edu.pdf'};
export function practicePresentation(condition){if(!['A','B'].includes(condition))throw Error('Invalid practice condition');return {initialPage:condition==='B'?2:1,highlighted:condition==='B',pageCount:2};}
export function sourceURL(claim,condition,mapping,{dev=false,base='./'}={}){
 if(!mapping||mapping.paper_id!==claim.paper_id||mapping.question_id!==claim.id)throw Error('Invalid claim-source mapping');
 if(!['A','B'].includes(condition))throw Error('Invalid condition');
 if(condition==='B'){
  const local=dev&&mapping.local_guided_asset&&mapping.local_review_verified;
  if((!local&&(!mapping.guided_asset||!mapping.researcher_approval))||!mapping.content_equivalence_verified)throw Error('Approved guided source unavailable: '+claim.id);
  if(![1,2].includes(mapping.highlight_passage_count)||mapping.highlight_claim_ids?.length!==1||mapping.highlight_claim_ids[0]!==claim.id)throw Error('Invalid highlight scope');
  if(!Number.isInteger(mapping.target_page)||mapping.target_page<1||mapping.target_page>mapping.page_count||!Number.isFinite(mapping.target_scroll_anchor)||mapping.target_scroll_anchor<0||mapping.target_scroll_anchor>1)throw Error('Invalid guided anchor');
  return local?'/local-papers/'+mapping.local_guided_asset:base+mapping.guided_asset;
 }
 if(mapping.original_asset)return base+mapping.original_asset;
 if(dev&&originalFiles[claim.paper_id])return '/local-papers/'+originalFiles[claim.paper_id];
 throw Error('Original source unavailable: '+claim.id);
}
