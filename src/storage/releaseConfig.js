export function collectionErrors({mode,endpoint,provider,verification,consent}){
 if(mode!=='live')return ['collection_disabled'];
 const errors=[];
 if(!/^https:\/\//.test(endpoint||''))errors.push('https_endpoint_required');
 if(!['formsubmit-app','custom'].includes(provider))errors.push('provider_required');
 if(!verification.confirmed||verification.endpoint!==endpoint||verification.provider!==provider||!verification.tested_at||!verification.receipt_reference)errors.push('end_to_end_delivery_unverified');
 if(!consent.approved||!consent.translation_approved||!consent.withdrawal_approved||!consent.retention_approved||Object.values(consent.remoteText||{}).some(v=>/\[[^\]]+\]/.test(v))||['contact','recipient','retention','withdrawal'].some(k=>!consent[k]?.trim())||!consent.remoteText?.en?.trim()||!consent.remoteText?.['zh-CN']?.trim())errors.push('privacy_wording_unapproved');
 return errors;
}
