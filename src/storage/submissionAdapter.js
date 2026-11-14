import {formPayload,checkFormAcknowledgment} from './submissionProtocol.js';
let pending=null;
export function submitSession(session,{mode='preview',endpoint='',provider='custom',ready=false,fetcher=fetch}={}){
 if(mode!=='live'||!ready||session.mode!=='live'||session.testing||session.synthetic)return Promise.reject(Error('Live collection disabled'));
 if(session.trials.length!==8||session.completion_status!=='complete')return Promise.reject(Error('Incomplete session'));
 if(session.submission_status==='acknowledged')return Promise.resolve({alreadyAcknowledged:true});
 if(pending)return pending;
 if(!endpoint.startsWith('https://'))return Promise.reject(Error('HTTPS endpoint required'));
 if(provider==='formsubmit-app'&&!/^https:\/\/formsubmit\.app\/f\/[A-Za-z0-9_-]+$/.test(endpoint))return Promise.reject(Error('Invalid FormSubmit endpoint'));
 const serialized=JSON.stringify(session);
 if(provider==='formsubmit-app'&&serialized.length>100000)return Promise.reject(Error('Session exceeds provider field limit; download backup'));
 const payload=provider==='formsubmit-app'?formPayload(session):{...session,submission_id:session.participant_id};
 pending=(async()=>{const response=await fetcher(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(20000)});if(!response.ok)throw Error('HTTP '+response.status);const body=await response.json();if(provider==='formsubmit-app'){checkFormAcknowledgment(body);}else if(body.accepted!==true||body.submission_id!==session.participant_id)throw Error('Missing session acknowledgment');return body;})().finally(()=>{pending=null;});return pending;
}
