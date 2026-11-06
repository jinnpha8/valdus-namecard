import LivingSmoke from './LivingSmoke.jsx';

import {resolveCard,cardUrl} from './card-routes.js';
import React, {useState,useEffect,useLayoutEffect} from 'react';
import {WechatLogo,ChatCircle,WhatsappLogo,Phone,EnvelopeSimple,ArrowUpRight,DownloadSimple,Copy,Check,Printer,ShareNetwork} from '@phosphor-icons/react';
const members={COO:{first:'JINNPHA',last:'RAKTHACHAROECNCHEEP',nick:'PAPP',title:'Chief Operating Officer',email:'JINNPHA@VALDUS.CO.TH',phone:'+66614935625',display:'+66 61 493 5625'},PM:{first:'NATTAPONG',last:'YEESAN',nick:'DONUT',title:'Project Manager',email:'NATTAPONG@VALDUS.CO.TH',phone:'+66922806459',display:'092-280-6459'},HR:{first:'RANNILIN',last:'SOMBUTCHAROEN',nick:'PANG-RUM',title:'HR & Administration Manager',email:'RANNILIN@VALDUS.CO.TH',phone:'+66647965036',display:'064-796-5036'}};
export default function App(){useEffect(()=>{if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;const pair=document.querySelector('.card-pair');if(!pair)return;const timers=new Set();const tap=e=>{if(e.target.closest('a,button'))return;const card=e.target.closest('article');if(!card)return;const rect=card.getBoundingClientRect();const ripple=document.createElement('span');ripple.className='card-tap-light';ripple.setAttribute('aria-hidden','true');ripple.style.left=(e.clientX-rect.left)+'px';ripple.style.top=(e.clientY-rect.top)+'px';card.appendChild(ripple);const timer=setTimeout(()=>{ripple.remove();timers.delete(timer)},1000);timers.add(timer)};pair.addEventListener('pointerdown',tap);return()=>{pair.removeEventListener('pointerdown',tap);timers.forEach(clearTimeout);pair.querySelectorAll('.card-tap-light').forEach(el=>el.remove())}},[]);const [memberKey,setMemberKey]=useState(()=>resolveCard(location.pathname,location.search));const member=members[memberKey];const displayEmail=member.email.charAt(0)+member.email.slice(1).toLowerCase();useEffect(()=>{history.replaceState(null,'',cardUrl(location.href,resolveCard(location.pathname,location.search)));const onPop=()=>{setMemberKey(resolveCard(location.pathname,location.search));setTeamOpen(false);setCopied(false);setNotice('')};window.addEventListener('popstate',onPop);return()=>window.removeEventListener('popstate',onPop)},[]);useEffect(()=>{document.title=member.first+' · VALDUS Interactive'},[memberKey]);function selectMember(key){setMemberKey(key);setTeamOpen(false);setBack(false);setCopied(false);setNotice('');history.pushState(null,'',cardUrl(location.href,key));document.title=members[key].first+' · VALDUS Interactive'}const [back,setBack]=useState(false);const [lang,setLang]=useState('en');const [teamOpen,setTeamOpen]=useState(false);const t=(th,en)=>lang==='th'?th:en;const [copied,setCopied]=useState(false);const [notice,setNotice]=useState('');useEffect(()=>{if(!matchMedia('(hover:hover) and (pointer:fine)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches)return;const cards=[...document.querySelectorAll('.card-pair article')];const move=e=>{const card=e.currentTarget,r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.setProperty('--tilt-x',(-y*3)+'deg');card.style.setProperty('--tilt-y',(x*3)+'deg');card.style.setProperty('--shine-x',((x+.5)*100)+'%');card.style.setProperty('--shine-y',((y+.5)*100)+'%')};const leave=e=>{e.currentTarget.style.setProperty('--tilt-x','0deg');e.currentTarget.style.setProperty('--tilt-y','0deg')};cards.forEach(card=>{card.addEventListener('pointermove',move);card.addEventListener('pointerleave',leave)});return()=>cards.forEach(card=>{card.removeEventListener('pointermove',move);card.removeEventListener('pointerleave',leave)})},[]);useEffect(()=>{const cards=[...document.querySelectorAll('.card-pair article')];if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;cards.forEach(card=>{card.classList.add('reveal-ready');card.classList.remove('text-visible')});const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('text-visible');observer.unobserve(entry.target)}})},{threshold:.12});cards.forEach(card=>observer.observe(card));return()=>{observer.disconnect();cards.forEach(card=>card.classList.remove('reveal-ready','text-visible'))}},[memberKey,lang]);useLayoutEffect(()=>{const pair=document.querySelector('.card-pair');if(!pair)return;const cards=[...pair.querySelectorAll('article')];let frame=0,lastWidth=0;const equalize=()=>{cards.forEach(card=>card.style.removeProperty('height'));const height=Math.ceil(Math.max(...cards.map(card=>card.getBoundingClientRect().height)));cards.forEach(card=>card.style.height=height+'px')};const schedule=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(equalize)};const observer=new ResizeObserver(entries=>{const width=entries[0].contentRect.width;if(Math.abs(width-lastWidth)>.5){lastWidth=width;schedule()}});observer.observe(pair);schedule();document.fonts.ready.then(schedule);window.addEventListener('resize',schedule);return()=>{observer.disconnect();cancelAnimationFrame(frame);window.removeEventListener('resize',schedule)}},[memberKey,lang]);
async function copy(){try{await navigator.clipboard.writeText(member.email);setCopied(true);setTimeout(()=>setCopied(false),2200)}catch{setNotice(member.email)}}
function save(){const card=['BEGIN:VCARD','VERSION:3.0',`N:${member.last};${member.first};;;`,`FN:${member.first} ${member.last}`,`NICKNAME:${member.nick}`,'ORG:VALDUS INTERACTIVE CO., LTD.',`TITLE:${member.title}`,`TEL;TYPE=CELL:${member.phone}`,`EMAIL:${member.email}`,'END:VCARD'].join('\r\n').replaceAll('\\r\\n','\r\n');const url=URL.createObjectURL(new Blob([card],{type:'text/vcard;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=member.first+'-VALDUS.vcf';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);setNotice(t('บันทึกไฟล์ผู้ติดต่อแล้ว','Contact file downloaded'))}async function copyPhone(){try{await navigator.clipboard.writeText(member.phone);setNotice('คัดลอกเบอร์แล้ว / PHONE NUMBER COPIED')}catch{setNotice(member.display)}} async function share(){const url=cardUrl(location.href,memberKey).href;const name=member.first+' '+member.last;const data={title:name+' · VALDUS Interactive',text:name+' — '+member.title,url};if(typeof navigator.share==='function'){try{await navigator.share(data);return}catch(error){if(error.name==='AbortError')return}}try{await navigator.clipboard.writeText(url);setNotice(t('คัดลอกลิงก์นามบัตรแล้ว','Card link copied'))}catch{setNotice(t('ลิงก์นามบัตร: ','Card link: ')+url)}}
return <><LivingSmoke/><main><nav className="site-header"><a className="site-brand" href="https://valdus.co.th" target="_blank" rel="noopener noreferrer" aria-label="VALDUS Interactive website"><img src="/assets/valdus-logo.png" alt="VALDUS Interactive"/></a><span className="header-caption">{t('นามบัตรดิจิทัล','DIGITAL BUSINESS CARD')}</span><div className="nav-actions"><div className="team-menu"><button className="team-trigger" aria-expanded={teamOpen} onClick={()=>setTeamOpen(!teamOpen)}>{t('นามบัตรทีม','Team cards')}</button>{teamOpen&&<div className="team-dropdown"><p>{t('นามบัตรทีม VALDUS','VALDUS team cards')}</p>{[['CEO','Chief Executive Officer'],['COO','Chief Operating Officer'],['CTO','Chief Technology Officer'],['PM','Project Manager'],['HR','HR & Administration Manager']].map(([role,title])=>members[role]?<button key={role} onClick={()=>selectMember(role)}><strong>{role} · {members[role].first} {members[role].nick?`(${members[role].nick})`:''}</strong><span>{title}</span></button>:<div className="pending-member" key={role}><strong>{role}</strong><span>{title}</span><small>{t('รอข้อมูลนามบัตร','Card details pending')}</small></div>)}<a href="https://valdus.co.th" target="_blank" rel="noopener noreferrer">valdus.co.th <ArrowUpRight size={16}/></a></div>}</div><div className="language" aria-label="Language"><button aria-pressed={lang==='th'} onClick={()=>setLang('th')}>TH</button><button aria-pressed={lang==='en'} onClick={()=>setLang('en')}>EN</button></div><button className="share" aria-label={t('แชร์นามบัตร','Share card')} onClick={share}><ShareNetwork size={21}/><span>{t('แชร์','Share')}</span></button></div></nav><div className="card-pair">{[false,true].map(back=><article key={back?'back':'front'} className={back?'back-side':'front-side'}><div className="card-sheen" aria-hidden="true"/><header><img src="/assets/valdus-logo.png" alt="VALDUS Interactive"/></header>{!back?<div className="front-content"><p className="eyebrow">VALDUS INTERACTIVE</p><h1>{member.first} {member.nick&&<em>({member.nick})</em>}<span>{member.last}</span></h1><div className="person-meta"><strong>{member.title}</strong></div><p className="front-description">Your vision. Our commitment.</p><div className="front-contact"><a href={`mailto:${member.email}`}>{displayEmail}</a><a href="#save-contact" onClick={e=>{e.preventDefault();save()}} aria-label={t('บันทึกเบอร์ลงรายชื่อ','Save number to contacts')}>{member.display}</a></div></div>:<div className="back-content"><section className="company-intro"><h2>{t('มาสร้างประสบการณ์ด้วยกัน','Let’s create. Connect.')}</h2><p>{t('พัฒนาเกม แอป และประสบการณ์ดิจิทัล','We build games, apps, and digital experiences.')}</p></section><section className="about back-identity"><h2>{member.first} {member.last}{member.nick&&<em> ({member.nick})</em>}</h2><p className="back-position">{member.title}</p></section><section className="contact-list icon-contacts"><a href="#save-contact" onClick={e=>{e.preventDefault();save()}} aria-label={t('บันทึกเบอร์ลงรายชื่อ','Save number to contacts')}><Phone size={23}/><span><small>{t('โทรศัพท์ · บันทึกผู้ติดต่อ','Mobile · Save contact')}</small><strong>{member.display}</strong></span><DownloadSimple size={19}/></a><div className="contact-row"><EnvelopeSimple size={23}/><a href={`mailto:${member.email}`}><span><small>{t('อีเมล','Email')}</small><strong>{displayEmail}</strong></span></a><button onClick={copy} aria-label={t('คัดลอกอีเมล','Copy email')}>{copied?<Check size={21}/>:<Copy size={21}/>}</button></div><div className="social-contact-actions"><span>{t('เพิ่มเพื่อน / แชต','Add contact / Chat')}</span><div><button onClick={copyPhone} aria-label={t('LINE · คัดลอกเบอร์เพื่อเพิ่มเพื่อน','LINE · Copy number to add contact')} title="LINE"><ChatCircle size={24}/><small>LINE</small></button><button onClick={copyPhone} aria-label={t('WeChat · คัดลอกเบอร์เพื่อเพิ่มเพื่อน','WeChat · Copy number to add contact')} title="WeChat"><WechatLogo size={25}/><small>WeChat</small></button><a href={`https://wa.me/${member.phone.slice(1)}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp"><WhatsappLogo size={25}/><small>WhatsApp</small></a></div></div></section></div>}</article>)}</div><div className="actions"><button className="save" onClick={save}><DownloadSimple size={22}/>{t('บันทึกผู้ติดต่อ','Save contact')}</button></div><div className="notice" role="status">{notice}</div><footer className="web-footer"><strong>VALDUS INTERACTIVE CO., LTD.</strong><p>Address: 124 Sukhaphiban 5 Road, Tha Raeng, Bang Khen, Bangkok 10220</p><p>Registration Number: 0105564086120</p></footer></main></>}
















































