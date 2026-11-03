
const chapters=COURSE_DATA;
const skillNames=['コアイメージ','文法ルール','ニュアンス','語順・形','使い分け'];

function allSections(){
  const out=[];
  Object.entries(chapters).forEach(([ch,c])=>c.sections.forEach(s=>out.push({...s,ch:+ch})));
  return out;
}
const SECTIONS=allSections();

function hashInt(s){
  let h=2166136261>>>0;
  for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}
  return h>>>0;
}
function seededShuffle(arr,seedStr){
  const a=[...arr]; let seed=hashInt(seedStr)||1;
  function rnd(){seed=(seed*1664525+1013904223)>>>0; return seed/4294967296}
  for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
  return a;
}
function distinctPool(current, field, sameChapterFirst=true){
  let p=SECTIONS.filter(s=>s.id!==current.id && (!sameChapterFirst || s.ch===current.ch)).map(s=>s[field]).filter(Boolean);
  if(p.length<4)p=p.concat(SECTIONS.filter(s=>s.id!==current.id).map(s=>s[field]).filter(Boolean));
  return [...new Set(p)];
}
function fiveChoices(correct,pool,seed){
  const others=seededShuffle(pool.filter(x=>x!==correct),seed).slice(0,4);
  while(others.length<4) others.push('このSectionでは中心にならない考え方');
  const shuffled=seededShuffle([correct,...others],seed+'x');
  return {choices:shuffled,answer:shuffled.indexOf(correct)};
}
function translationDistractors(en){
  const out=[];
  const tokens=en.replace(/[.!?]$/,'').split(/\s+/);
  if(tokens.length>3){
    out.push([tokens[0],tokens[2],tokens[1],...tokens.slice(3)].join(' ')+'.');
    out.push(tokens.slice(0,-1).concat(tokens[tokens.length-1],'to').join(' ')+'.');
  }
  let x=en;
  if(/\b(is|are|was|were)\b/.test(x)) out.push(x.replace(/\b(is|are|was|were)\b/,'do'));
  if(/\bto\b/.test(x)) out.push(x.replace(/\bto\b/,'for'));
  if(/\bdo(es)?\b/.test(x)) out.push(x.replace(/\bdo(es)?\b/,'is'));
  if(/\bhas\b/.test(x)) out.push(x.replace(/\bhas\b/,'is'));
  if(/\bhave\b/.test(x)) out.push(x.replace(/\bhave\b/,'are'));
  if(/\bwill\b/.test(x)) out.push(x.replace(/\bwill\b/,'did'));
  if(/\bcan\b/.test(x)) out.push(x.replace(/\bcan\b/,'can to'));
  if(/\bmust\b/.test(x)) out.push(x.replace(/\bmust\b/,'must to'));
  if(/\bby\b/.test(x)) out.push(x.replace(/\bby\b/,'from'));
  if(/\bwho\b/.test(x)) out.push(x.replace(/\bwho\b/,'which'));
  if(/\bwhich\b/.test(x)) out.push(x.replace(/\bwhich\b/,'who'));
  if(/\bwhere\b/.test(x)) out.push(x.replace(/\bwhere\b/,'what'));
  if(/\bthat\b/.test(x)) out.push(x.replace(/\bthat\b/,'what'));
  if(/\bthe\b/.test(x)) out.push(x.replace(/\bthe\b/,'a'));
  out.push('※語順・動詞の形・前置詞のいずれかが不自然な文');
  return [...new Set(out.filter(v=>v!==en))].slice(0,12);
}

function buildQuestions(){
  const Q=[];
  SECTIONS.forEach(s=>{
    let c;
    c=fiveChoices(s.core,distinctPool(s,'core'),s.id+'core');
    Q.push({id:s.id+'-q1',ch:s.ch,sec:s.id,type:'コアイメージ',skill:'コアイメージ',
      prompt:`「${s.name}」のコアイメージとして最も近いものは？`,choices:c.choices,answer:c.answer,
      explain:s.core});
    c=fiveChoices(s.focus,distinctPool(s,'focus'),s.id+'focus');
    Q.push({id:s.id+'-q2',ch:s.ch,sec:s.id,type:'コア判断',skill:'文法ルール',
      prompt:'このSectionで特に意識すべき判断として最も適切なのは？',choices:c.choices,answer:c.answer,
      explain:s.focus});
    const td=translationDistractors(s.exampleEN);
    c=fiveChoices(s.exampleEN,td,s.id+'trans');
    Q.push({id:s.id+'-q3',ch:s.ch,sec:s.id,type:'英訳',skill:'語順・形',
      prompt:`「${s.exampleJP}」として最も自然な英文は？`,choices:c.choices,answer:c.answer,
      explain:`モデル：${s.exampleEN}　${s.nuance}`});
    c=fiveChoices(s.nuance,distinctPool(s,'nuance'),s.id+'nuance');
    Q.push({id:s.id+'-q4',ch:s.ch,sec:s.id,type:'ニュアンス',skill:'ニュアンス',
      prompt:'次の英文を、このSectionの観点から説明したものとして最も適切なのは？',
      context:s.exampleEN,choices:c.choices,answer:c.answer,explain:s.nuance});
    const imageCorrect=`この文は「${s.core}」というイメージで捉える。`;
    const imgPool=distinctPool(s,'core').map(x=>`この文は「${x}」というイメージで捉える。`);
    c=fiveChoices(imageCorrect,imgPool,s.id+'image');
    Q.push({id:s.id+'-q5',ch:s.ch,sec:s.id,type:'文のイメージ',skill:'使い分け',
      prompt:'次の英文の「文のイメージ」として最も近いものは？',context:s.exampleEN,
      choices:c.choices,answer:c.answer,explain:`${s.core} ${s.nuance}`});
  });
  return Q;
}
const Q=buildQuestions();

let state=JSON.parse(localStorage.getItem('grammarCheckStateV2')||'{"attempts":{},"history":[]}');
let current=[],idx=0,answers=[],currentLabel='';
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
function save(){localStorage.setItem('grammarCheckStateV2',JSON.stringify(state))}
function show(id){$$('.view').forEach(v=>v.classList.remove('active'));$('#'+id).classList.add('active');scrollTo(0,0)}
function qScore(filter){const qs=Q.filter(filter);let hit=0,total=0;qs.forEach(q=>{const a=state.attempts[q.id];if(a){total++;if(a.correct)hit++}});return total?Math.round(hit/total*100):null}
function renderBars(target, filter=()=>true){const el=$(target);el.innerHTML='';skillNames.forEach(s=>{const sc=qScore(q=>filter(q)&&q.skill===s);el.innerHTML+=`<div class="skill-row"><div class="skill-label"><span>${s}</span><b>${sc==null?'--':sc+'%'}</b></div><div class="bar"><i style="width:${sc||0}%"></i></div></div>`})}
function chapterDesc(ch){
  const n=chapters[ch].sections.length;
  return `${n} Section・${n*5}問`;
}
function renderHome(){
  const box=$('#chapterCards');box.innerHTML='';
  Object.keys(chapters).map(Number).sort((a,b)=>a-b).forEach(ch=>{
    const c=chapters[ch],sc=qScore(q=>q.ch===ch);
    box.innerHTML+=`<div class="card chapter-card" data-ch="${ch}"><div class="chapter-num">CHAPTER ${ch}</div><h3>${c.title}</h3><p>${chapterDesc(ch)}</p><div class="scoreline"><span>理解度</span><span>${sc==null?'--':sc+'%'}</span></div></div>`
  });
  const os=qScore(()=>true);$('#overallScore').textContent=os==null?'--':os+'%';
  renderBars('#skillBars');
  $$('.chapter-card').forEach(x=>x.onclick=()=>openChapter(+x.dataset.ch))
}
function openChapter(ch){
  const c=chapters[ch];
  $('#sectionListTitle').textContent=`Chapter ${ch}｜${c.title}`;
  $('#sectionListDesc').textContent=`各Section 5問・すべて5択。コアイメージからニュアンスまで確認します。`;
  const box=$('#sectionCards');box.innerHTML='';
  c.sections.forEach(s=>{
    const sc=qScore(q=>q.sec===s.id);
    box.innerHTML+=`<div class="card section-card"><div><h3>${s.name}</h3><p>${s.core}</p></div><div><div class="section-score">${sc==null?'--':sc+'%'}</div><button class="secondary sec-start" data-sec="${s.id}">5問テスト</button></div></div>`
  });
  box.innerHTML+=`<div class="card actions"><button class="primary ch-start" data-ch="${ch}">Chapter ${ch} 総合テスト（${c.sections.length*5}問）</button></div>`;
  $$('.sec-start').forEach(b=>b.onclick=()=>start(Q.filter(q=>q.sec===b.dataset.sec),`${c.title} / ${c.sections.find(s=>s.id===b.dataset.sec)?.name}`));
  $('.ch-start').onclick=()=>start(Q.filter(q=>q.ch===ch),`Chapter ${ch} 総合`);
  show('sectionList')
}
function start(qs,label,limit=null){
  if(!qs.length){alert('対象問題がありません');return}
  let list=seededShuffle(qs,label+Date.now().toString().slice(-4));
  if(limit && list.length>limit)list=list.slice(0,limit);
  current=list;idx=0;answers=[];currentLabel=label;show('quiz');renderQ()
}
function renderQ(){
  const q=current[idx];
  $('#qCount').textContent=`${idx+1}/${current.length}`;
  $('#progressBar').style.width=`${idx/current.length*100}%`;
  $('#qChapter').textContent=`Chapter ${q.ch}`;
  $('#qSection').textContent=chapters[q.ch].sections.find(s=>s.id===q.sec)?.name||q.sec;
  $('#qType').textContent=q.type;
  $('#qPrompt').textContent=q.prompt;
  $('#qContext').textContent=q.context||'';
  $('#qContext').classList.toggle('hidden',!q.context);
  $('#feedback').className='feedback hidden';$('#nextBtn').classList.add('hidden');
  const box=$('#choices');box.innerHTML='';
  q.choices.forEach((c,i)=>{const b=document.createElement('button');b.className='choice';b.textContent=`${String.fromCharCode(65+i)}. ${c}`;b.onclick=()=>answer(i);box.appendChild(b)})
}
function answer(choice){
  const q=current[idx],correct=choice===q.answer;
  [...$('#choices').children].forEach((b,i)=>{b.disabled=true;if(i===q.answer)b.classList.add('correct');if(i===choice&&!correct)b.classList.add('wrong')});
  const f=$('#feedback');f.className='feedback '+(correct?'ok':'ng');f.innerHTML=`<b>${correct?'○ 正解':'△ 要確認'}</b><br>${q.explain}`;
  $('#nextBtn').classList.remove('hidden');answers.push({q,correct,choice});
  state.attempts[q.id]={correct,ts:Date.now(),skill:q.skill,ch:q.ch,sec:q.sec};save()
}
$('#nextBtn').onclick=()=>{idx++;if(idx<current.length)renderQ();else finish()};
function finish(){
  const good=answers.filter(a=>a.correct).length,score=Math.round(good/answers.length*100);
  state.history.push({label:currentLabel,score,ts:Date.now()});save();
  $('#resultScore').textContent=score;$('#resultTitle').textContent=currentLabel+' 結果';
  $('#resultMessage').textContent=score>=90?'理解はかなり安定しています。':score>=70?'概ね理解できています。誤答分野を短く復習しましょう。':'弱点がはっきり出ています。Section単位で戻るのがおすすめです。';
  $('.ring').style.background=`conic-gradient(var(--blue) 0 ${score}%,#e2e8f0 ${score}%)`;
  const skillBox=$('#resultSkills');skillBox.innerHTML='';
  skillNames.forEach(s=>{const xs=answers.filter(a=>a.q.skill===s);if(!xs.length)return;const sc=Math.round(xs.filter(a=>a.correct).length/xs.length*100);skillBox.innerHTML+=`<div class="skill-row"><div class="skill-label"><span>${s}</span><b>${sc}%</b></div><div class="bar"><i style="width:${sc}%"></i></div></div>`});
  const wrong=answers.filter(a=>!a.correct);
  $('#wrongList').innerHTML=wrong.length?wrong.map(a=>`<div class="wrong-item"><b>${a.q.prompt}</b><span>${a.q.explain}</span></div>`).join(''):'<p>今回の誤答はありません。</p>';
  $('#retryWrong').classList.toggle('hidden',!wrong.length);$('#retryWrong').onclick=()=>start(wrong.map(a=>a.q),'誤答復習');show('result')
}
$$('[data-mode]').forEach(b=>b.onclick=()=>{
  if(b.dataset.mode==='mixed')start(Q,'全章ミックス',40);
  else if(b.dataset.mode==='core')start(Q.filter(q=>q.type==='コアイメージ'||q.type==='コア判断'),'コアイメージ総復習',40);
  else{
    const weak=Q.filter(q=>state.attempts[q.id]&&!state.attempts[q.id].correct);
    start(weak.length?weak:Q.slice(0,20),'弱点復習',40)
  }
});
$$('[data-back="home"]').forEach(b=>b.onclick=()=>{renderHome();show('home')});
$('#quitQuiz').onclick=()=>{renderHome();show('home')};
$('#goHome').onclick=()=>{renderHome();show('home')};
$('#resetBtn').onclick=()=>{if(confirm('学習記録をリセットしますか？')){state={attempts:{},history:[]};save();renderHome()}};
renderHome();
if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
