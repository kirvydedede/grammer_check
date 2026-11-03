const chapters={
10:{title:'動詞 -ing形',desc:'「生き生きとした躍動感」を保ったまま、名詞位置・修飾位置で使う。',sections:[
{id:'10-1',name:'名詞位置での動詞-ing形',desc:'主語・目的語として使う'},
{id:'10-2',name:'修飾位置での動詞-ing形',desc:'前置修飾・後置修飾・文の説明'}]},
11:{title:'to不定詞',desc:'「これから・矢印」の感覚を、名詞位置・修飾位置などで使い分ける。',sections:[
{id:'11-1',name:'名詞位置での to不定詞',desc:'主語・目的語として使う'},
{id:'11-2',name:'修飾位置での to不定詞①',desc:'come/get・説明・形容詞との組み合わせ'},
{id:'11-3',name:'修飾位置での to不定詞②',desc:'目的・結果・感情などの説明'},
{id:'11-4',name:'to不定詞が使われるその他の形',desc:'it構文・too…to・enough to など'}]},
12:{title:'過去分詞形',desc:'「〜される／〜してしまった」状態を核に、受動文と修飾を理解する。',sections:[
{id:'12-1',name:'受動文とは？',desc:'能動と受動の視点の違い'},
{id:'12-2',name:'受動文基礎',desc:'be + 過去分詞と文型'},
{id:'12-3',name:'受動文のバリエーション',desc:'授与・目的語説明・to不定詞との結合'},
{id:'12-4',name:'過去分詞で修飾',desc:'名詞の前後から状態を説明'}]}
};

const Q=[
// Chapter 10
{id:'q1001',ch:10,sec:'10-1',type:'文法判断',skill:'文法ルール',prompt:'「図書館で話すことは禁止されています。」として自然なのは？',choices:['Talking in the library is prohibited.','To talking in the library is prohibited.','Talk in the library is prohibited.'],answer:0,explain:'動詞-ing形は名詞位置に置くと「〜すること」として主語になれます。Chapter 10では -ing の「生き生きとした躍動感」を保つ点が中心です。'},
{id:'q1002',ch:10,sec:'10-1',type:'ニュアンス比較',skill:'ニュアンス',prompt:'次の2文の違いとして最も適切なのは？',context:'A. I like playing video games.\nB. I like to play video games.',choices:['Aは実際の活動を生き生きと捉えやすく、Bは行為を少し距離を置いて捉えやすい','Aは未来だけ、Bは過去だけを表す','意味は必ず完全に同一でニュアンス差はない'],answer:0,explain:'-ing は活動そのものを生き生きと感じるニュアンス。to不定詞は「これから」の矢印・行為への距離感を持ちやすい、という対比が重要です。'},
{id:'q1003',ch:10,sec:'10-1',type:'誤文訂正',skill:'語順・形',prompt:'誤りを直すならどれ？',context:'Stop to picking your nose!',choices:['Stop picking your nose!','Stop pick your nose!','Stopping to pick your nose!'],answer:0,explain:'stop の目的語として活動そのものを置くときは動詞-ing形。'},
{id:'q1004',ch:10,sec:'10-2',type:'文法判断',skill:'文法ルール',prompt:'「向こうで走っている男の人」を表すのに自然なのは？',choices:['the man running over there','the running over there man','the man to running over there'],answer:0,explain:'修飾語が長い場合、動詞-ing形は名詞の後ろから説明するのが自然です。'},
{id:'q1005',ch:10,sec:'10-2',type:'ニュアンス比較',skill:'ニュアンス',prompt:'「running shoes」の running の役割として最も近い説明は？',choices:['「走るための／走ることに関係する」靴の種類を限定している','靴が今走っている最中だと述べている','過去に走った靴だと述べている'],answer:0,explain:'名詞の前の -ing は種類・用途を限定することがあります。文脈で「進行中」と機械的に決めないことが大切です。'},
{id:'q1006',ch:10,sec:'10-2',type:'状況選択',skill:'使い分け',prompt:'目の前で泣いている赤ちゃんを説明するとき、最も自然なのは？',choices:['a crying baby','a cried baby','a cry babying'],answer:0,explain:'能動的に「泣いている」という動きを持つ対象なので crying が自然です。'},
{id:'q1007',ch:10,sec:'10-1',type:'意味理解',skill:'ニュアンス',prompt:'動詞-ing形の中心イメージとして、この章で最も重視されているものは？',choices:['生き生きとした躍動感','未来への矢印','受動・完了の状態'],answer:0,explain:'Chapter 10の核は -ing の「生き生きとした躍動感」です。'},
{id:'q1008',ch:10,sec:'10-2',type:'文法判断',skill:'語順・形',prompt:'「英語を話す国」を自然に表すのは？',choices:['English-speaking countries','English-spoken countries','countries speaking-English'],answer:0,explain:'複合的な前置修飾では English-speaking のようにハイフンでまとまりを作れます。'},
// Chapter 11
{id:'q1101',ch:11,sec:'11-1',type:'文法判断',skill:'文法ルール',prompt:'「新しい友達を作るのは簡単ではない。」として自然なのは？',choices:['To make new friends is not so easy.','To making new friends is not so easy.','Make new friends is not so easy.'],answer:0,explain:'to不定詞は名詞位置で主語になれます。本文では「これから」の方向感を持つパッケージとして扱われます。'},
{id:'q1102',ch:11,sec:'11-1',type:'文法判断',skill:'文法ルール',prompt:'「もっとプロになりたい。」として自然なのは？',choices:['I want to be a professional.','I want being a professional.','I want be a professional.'],answer:0,explain:'want は「これからそうしたい」という内容と相性がよく、to不定詞を目的語に取ります。'},
{id:'q1103',ch:11,sec:'11-1',type:'ニュアンス比較',skill:'ニュアンス',prompt:'to不定詞の中心イメージとして最も適切なのは？',choices:['「これから」へ向かう矢印','今まさに進行中の躍動感','完了して結果だけ残った状態'],answer:0,explain:'Chapter 11では to の方向性から「これから」が重要な核として扱われます。'},
{id:'q1104',ch:11,sec:'11-2',type:'使い分け',skill:'使い分け',prompt:'「彼女は医者になりました。」の「なる」に、変化の到達を表す自然な形は？',choices:['She came to be a doctor.','She came being a doctor.','She came be a doctor.'],answer:0,explain:'come/get + to不定詞は、ある状態・認識に至る流れを表せます。'},
{id:'q1105',ch:11,sec:'11-2',type:'文法判断',skill:'語順・形',prompt:'「読むべき本がたくさんあります。」として自然なのは？',choices:['There are many books to read.','There are many to read books.','There are many books reading.'],answer:0,explain:'to不定詞が名詞の後ろから「どんな本か」を説明します。'},
{id:'q1106',ch:11,sec:'11-3',type:'状況選択',skill:'使い分け',prompt:'「英語を勉強するために図書館へ行った。」目的を表すなら？',choices:['I went to the library to study English.','I went to the library studying English.','I went to the library studied English.'],answer:0,explain:'目的は「〜するために」という未来方向の矢印と相性がよく、to不定詞が自然です。'},
{id:'q1107',ch:11,sec:'11-4',type:'文法判断',skill:'文法ルール',prompt:'「この箱は重すぎて持てない。」として自然なのは？',choices:['This box is too heavy to carry.','This box is too heavy carrying.','This box is enough heavy to carry.'],answer:0,explain:'too + 形容詞 + to不定詞は「〜すぎて…できない」という定型。'},
{id:'q1108',ch:11,sec:'11-4',type:'文法判断',skill:'文法ルール',prompt:'「彼は一人で運転できる年齢だ。」として自然なのは？',choices:['He is old enough to drive by himself.','He is enough old to drive by himself.','He is old to enough drive by himself.'],answer:0,explain:'enough は形容詞の後ろ：old enough to ... の語順です。'},
{id:'q1109',ch:11,sec:'11-4',type:'語順判断',skill:'語順・形',prompt:'「毎日運動することが大切だ。」を it を使って自然に言うのは？',choices:['It is important to exercise every day.','It to exercise is important every day.','It is to important exercise every day.'],answer:0,explain:'長い主語を後ろへ送り、it を仮主語にする形です。'},
{id:'q1110',ch:11,sec:'11-3',type:'ニュアンス比較',skill:'ニュアンス',prompt:'「I was surprised to hear the news.」の to hear は何を説明している？',choices:['驚いた原因・きっかけ','驚く前に完了した義務','ニュースを聞く能力'],answer:0,explain:'感情を表す形容詞の後ろのto不定詞は、その感情の原因・きっかけを説明できます。'},
// Chapter 12
{id:'q1201',ch:12,sec:'12-1',type:'視点判断',skill:'ニュアンス',prompt:'受動文を選ぶと話し手の視線は主にどこに置かれる？',choices:['行為を受ける対象・結果側','必ず行為者だけ','未来の予定だけ'],answer:0,explain:'Chapter 12では能動文との視点の違いが重要です。受動文は行為を受ける側を主語として取り上げます。'},
{id:'q1202',ch:12,sec:'12-2',type:'文法判断',skill:'文法ルール',prompt:'「Johnは犬に襲われた。」として自然なのは？',choices:['John was attacked by the dog.','John attacked by the dog.','John was attacking by the dog.'],answer:0,explain:'受動文の基本は be + 過去分詞。行為者を示すなら by を使えます。'},
{id:'q1203',ch:12,sec:'12-2',type:'ニュアンス比較',skill:'ニュアンス',prompt:'「John was attacked by the dog.」で by the dog を省略しやすいのはどんなとき？',choices:['行為者が重要でない・明らかなとき','受動文ではby句を必ず省略する','主語が人の場合だけ'],answer:0,explain:'受動文では行為者より受け手・出来事に焦点があるため、行為者が不要ならby句は省略できます。'},
{id:'q1204',ch:12,sec:'12-2',type:'語順判断',skill:'語順・形',prompt:'疑問文「その橋はいつ建てられましたか？」として自然なのは？',choices:['When was the bridge built?','When did the bridge built?','When was built the bridge?'],answer:0,explain:'受動文の疑問形は be動詞を主語の前へ。built は過去分詞のままです。'},
{id:'q1205',ch:12,sec:'12-3',type:'文法判断',skill:'文法ルール',prompt:'「私は先生に英語を教えてもらった。」受動文として自然なのは？',choices:['I was taught English by my teacher.','I was taught by English my teacher.','I taught English by my teacher.'],answer:0,explain:'teach のように目的語を2つ取る動詞では、人を主語にした受動文を作れます。'},
{id:'q1206',ch:12,sec:'12-3',type:'文法判断',skill:'文法ルール',prompt:'「彼は正直な人だと思われている。」として自然なのは？',choices:['He is thought to be an honest person.','He is thought being an honest person.','He thought to be an honest person.'],answer:0,explain:'受動文 + to不定詞の組み合わせ。think A to be... の受動化として理解できます。'},
{id:'q1207',ch:12,sec:'12-4',type:'使い分け',skill:'使い分け',prompt:'「壊れた窓」を表すなら？',choices:['a broken window','a breaking window','a break window'],answer:0,explain:'窓は「壊された／壊れてしまった」状態なので過去分詞 broken が自然です。'},
{id:'q1208',ch:12,sec:'12-4',type:'ニュアンス比較',skill:'ニュアンス',prompt:'「a crying baby」と「a broken vase」の違いとして正しいものは？',choices:['crying は能動的な動き、broken は受動・完了した状態を表す','どちらも必ず進行形を表す','どちらも未来の予定を表す'],answer:0,explain:'-ing と過去分詞の対比は重要。-ing は能動・躍動、過去分詞は受動・完了の状態。'},
{id:'q1209',ch:12,sec:'12-4',type:'語順判断',skill:'語順・形',prompt:'長い修飾語を自然に置くなら？「駅の前に駐車されている車」',choices:['the car parked in front of the station','the parked in front of the station car','the car parking in front of the station'],answer:0,explain:'長い過去分詞句は名詞の後ろから説明するのが自然です。'},
{id:'q1210',ch:12,sec:'12-3',type:'ニュアンス比較',skill:'使い分け',prompt:'受動文を使うのが特に自然なのは？',choices:['「誰がしたか」より「何が起きたか」を中心に伝えたいとき','行為者を必ず強調したいときだけ','未来の意思を伝えたいときだけ'],answer:0,explain:'受動文は、行為者ではなく対象・出来事・結果に焦点を合わせるための選択です。'}
];

const skillNames=['文法ルール','ニュアンス','語順・形','使い分け'];
let state=JSON.parse(localStorage.getItem('grammarCheckState')||'{"attempts":{},"history":[]}');
let current=[],idx=0,answers=[],currentLabel='';
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
function save(){localStorage.setItem('grammarCheckState',JSON.stringify(state))}
function show(id){$$('.view').forEach(v=>v.classList.remove('active'));$('#'+id).classList.add('active');scrollTo(0,0)}
function qScore(filter){const qs=Q.filter(filter);let hit=0,total=0;qs.forEach(q=>{const a=state.attempts[q.id];if(a){total++;if(a.correct)hit++}});return total?Math.round(hit/total*100):null}
function renderBars(target, filter=()=>true){const el=$(target);el.innerHTML='';skillNames.forEach(s=>{const sc=qScore(q=>filter(q)&&q.skill===s);el.innerHTML+=`<div class="skill-row"><div class="skill-label"><span>${s}</span><b>${sc==null?'--':sc+'%'}</b></div><div class="bar"><i style="width:${sc||0}%"></i></div></div>`})}
function renderHome(){const box=$('#chapterCards');box.innerHTML='';[10,11,12].forEach(ch=>{const c=chapters[ch],sc=qScore(q=>q.ch===ch);box.innerHTML+=`<div class="card chapter-card" data-ch="${ch}"><div class="chapter-num">CHAPTER ${ch}</div><h3>${c.title}</h3><p>${c.desc}</p><div class="scoreline"><span>理解度</span><span>${sc==null?'--':sc+'%'}</span></div></div>`});const os=qScore(()=>true);$('#overallScore').textContent=os==null?'--':os+'%';renderBars('#skillBars');$$('.chapter-card').forEach(x=>x.onclick=()=>openChapter(+x.dataset.ch))}
function openChapter(ch){const c=chapters[ch];$('#sectionListTitle').textContent=`Chapter ${ch}｜${c.title}`;$('#sectionListDesc').textContent=c.desc;const box=$('#sectionCards');box.innerHTML='';c.sections.forEach(s=>{const sc=qScore(q=>q.sec===s.id);box.innerHTML+=`<div class="card section-card"><div><h3>${s.name}</h3><p>${s.desc}</p></div><div><div class="section-score">${sc==null?'--':sc+'%'}</div><button class="secondary sec-start" data-sec="${s.id}">確認テスト</button></div></div>`});box.innerHTML+=`<div class="card actions"><button class="primary ch-start" data-ch="${ch}">Chapter ${ch} 総合テスト</button></div>`;$$('.sec-start').forEach(b=>b.onclick=()=>start(Q.filter(q=>q.sec===b.dataset.sec),`${c.title} / Section`));$('.ch-start').onclick=()=>start(Q.filter(q=>q.ch===ch),`Chapter ${ch} 総合`);show('sectionList')}
function start(qs,label){if(!qs.length){alert('対象問題がありません');return}current=[...qs].sort(()=>Math.random()-.5);idx=0;answers=[];currentLabel=label;show('quiz');renderQ()}
function renderQ(){const q=current[idx];$('#qCount').textContent=`${idx+1}/${current.length}`;$('#progressBar').style.width=`${idx/current.length*100}%`;$('#qChapter').textContent=`Chapter ${q.ch}`;$('#qSection').textContent=chapters[q.ch].sections.find(s=>s.id===q.sec)?.name||q.sec;$('#qType').textContent=q.type;$('#qPrompt').textContent=q.prompt;$('#qContext').textContent=q.context||'';$('#qContext').classList.toggle('hidden',!q.context);$('#feedback').className='feedback hidden';$('#nextBtn').classList.add('hidden');const box=$('#choices');box.innerHTML='';q.choices.forEach((c,i)=>{const b=document.createElement('button');b.className='choice';b.textContent=c;b.onclick=()=>answer(i);box.appendChild(b)})}
function answer(choice){const q=current[idx],correct=choice===q.answer;[...$('#choices').children].forEach((b,i)=>{b.disabled=true;if(i===q.answer)b.classList.add('correct');if(i===choice&&!correct)b.classList.add('wrong')});const f=$('#feedback');f.className='feedback '+(correct?'ok':'ng');f.innerHTML=`<b>${correct?'○ 正解':'△ 要確認'}</b><br>${q.explain}`;$('#nextBtn').classList.remove('hidden');answers.push({q,correct,choice});state.attempts[q.id]={correct,ts:Date.now(),skill:q.skill,ch:q.ch,sec:q.sec};save()}
$('#nextBtn').onclick=()=>{idx++;if(idx<current.length)renderQ();else finish()};
function finish(){const good=answers.filter(a=>a.correct).length,score=Math.round(good/answers.length*100);state.history.push({label:currentLabel,score,ts:Date.now()});save();$('#resultScore').textContent=score;$('#resultTitle').textContent=currentLabel+' 結果';$('#resultMessage').textContent=score>=90?'理解はかなり安定しています。':score>=70?'概ね理解できています。誤答分野を短く復習しましょう。':'弱点がはっきり出ています。Section単位で戻るのがおすすめです。';const ring=$('.ring');ring.style.background=`conic-gradient(var(--blue) 0 ${score}%,#e2e8f0 ${score}%)`;const skillBox=$('#resultSkills');skillBox.innerHTML='';skillNames.forEach(s=>{const xs=answers.filter(a=>a.q.skill===s);if(!xs.length)return;const sc=Math.round(xs.filter(a=>a.correct).length/xs.length*100);skillBox.innerHTML+=`<div class="skill-row"><div class="skill-label"><span>${s}</span><b>${sc}%</b></div><div class="bar"><i style="width:${sc}%"></i></div></div>`});const wrong=answers.filter(a=>!a.correct);$('#wrongList').innerHTML=wrong.length?wrong.map(a=>`<div class="wrong-item"><b>${a.q.prompt}</b><span>${a.q.explain}</span></div>`).join(''):'<p>今回の誤答はありません。</p>';$('#retryWrong').classList.toggle('hidden',!wrong.length);$('#retryWrong').onclick=()=>start(wrong.map(a=>a.q),'誤答復習');show('result')}
$$('[data-mode]').forEach(b=>b.onclick=()=>{if(b.dataset.mode==='mixed')start(Q,'Chapter 10–12 ミックス');else{const weak=Q.filter(q=>state.attempts[q.id]&&!state.attempts[q.id].correct);start(weak.length?weak:Q.slice(0,8),'弱点復習')}});
$$('[data-back="home"]').forEach(b=>b.onclick=()=>{renderHome();show('home')});$('#quitQuiz').onclick=()=>{renderHome();show('home')};$('#goHome').onclick=()=>{renderHome();show('home')};$('#resetBtn').onclick=()=>{if(confirm('学習記録をリセットしますか？')){state={attempts:{},history:[]};save();renderHome()}};
renderHome();
if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
