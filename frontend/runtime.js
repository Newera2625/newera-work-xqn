/* ===== 2. 工具函数 ===== */
function qs(s,r){return(r||document).querySelector(s);}
function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));}
function el(t,c,x){var n=document.createElement(t);if(c)n.className=c;if(x!=null)n.textContent=x;return n;}
function clamp(v,a,b){return v<a?a:(v>b?b:v);}
function findPost(id){for(var i=0;i<POSTS.length;i++){if(POSTS[i].id===id)return POSTS[i];}return null;}
/* ===== 3. 状态 ===== */
var STATE={view:'list',activeTag:'all',keyword:'',theme:'light',currentPostId:null,listScrollY:0};
/* ===== 4. 头像加载与降级 ===== */
var FALLBACK_SVG='<svg viewBox="0 0 120 120" role="presentation" aria-hidden="true"><defs><linearGradient id="ag" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4a5bd6"/><stop offset="1" stop-color="#3a49b8"/></linearGradient></defs><rect width="120" height="120" fill="url(#ag)"/><circle cx="60" cy="60" r="40" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="3"/><rect x="52" y="34" width="16" height="52" rx="4" fill="rgba(255,255,255,.85)" transform="rotate(18 60 60)"/></svg>';
function initAvatar(img){
if(!img)return;
img.setAttribute('referrerpolicy','no-referrer');
if(img.complete&&img.naturalWidth===0)handleAvatarError(img);
img.addEventListener('error',function(){handleAvatarError(img);});
}
function handleAvatarError(img){
if(!img||img.dataset.fallback==='1')return;
img.dataset.fallback='1';
var holder=img.parentNode;if(!holder)return;
var fb=el('span','avatar-fallback');fb.setAttribute('aria-hidden','true');fb.innerHTML=FALLBACK_SVG;
img.style.display='none';holder.appendChild(fb);
/* 失败提示只在 Hero 出现一次 */
var hero=qs('.hero__avatar-wrap');
if(hero&&!qs('.avatar-note',hero))hero.appendChild(el('p','avatar-note','头像加载失败，已使用默认头像'));
}
/* ===== 5. 主题 ===== */
function readTheme(){
var t='';try{t=localStorage.getItem('theme')||'';}catch(e){}
if(t!=='light'&&t!=='dark')t=(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light';
return t;
}
function applyTheme(theme,persist){
STATE.theme=theme;
document.documentElement.setAttribute('data-theme',theme);
var meta=qs('meta[name="theme-color"]');if(meta)meta.setAttribute('content',theme==='dark'?'#0f1115':'#ffffff');
var btn=qs('#theme-toggle');
if(btn){btn.setAttribute('aria-pressed',theme==='dark'?'true':'false');btn.setAttribute('aria-label',theme==='dark'?'切换浅色模式':'切换深色模式');}
if(persist){try{localStorage.setItem('theme',theme);}catch(e){}}
}
/* ===== 6. Toast ===== */
var toastTimer=null;
function showToast(msg,ok){
var t=qs('#toast');if(!t)return;
t.textContent=msg;t.classList.toggle('toast--success',!!ok);t.classList.add('is-visible');
if(toastTimer)clearTimeout(toastTimer);
toastTimer=setTimeout(function(){t.classList.remove('is-visible');},2200);
}
/* ===== 7. 复制 QQ 号 ===== */
function legacyCopy(text){
var ta=document.createElement('textarea');ta.value=text;ta.setAttribute('readonly','readonly');
ta.style.position='fixed';ta.style.top='-1000px';document.body.appendChild(ta);ta.select();
var ok=false;try{ok=document.execCommand('copy');}catch(e){ok=false;}
document.body.removeChild(ta);return ok;
}
function handleCopy(btn){
var text=btn.getAttribute('data-copy')||SITE.qq;
function done(){
btn.classList.add('is-copied');
var l=qs('.copy-inline__text',btn);if(l)l.textContent='已复制';
showToast('已复制到剪贴板',true);
setTimeout(function(){btn.classList.remove('is-copied');var x=qs('.copy-inline__text',btn);if(x)x.textContent='复制';},1500);
}
function fail(){
var num=qs('#qq-number');if(num)num.classList.add('is-highlight');
showToast('复制失败，请手动复制：'+text,false);
setTimeout(function(){if(num)num.classList.remove('is-highlight');},2200);
}
if(navigator.clipboard&&navigator.clipboard.writeText){
navigator.clipboard.writeText(text).then(done).catch(function(){if(legacyCopy(text))done();else fail();});
}else if(legacyCopy(text))done();else fail();
}
/* ===== 8. 列表渲染 ===== */
function coverVars(c){
var a=COVER_THEMES[c.from]||COVER_THEMES.brand,b=COVER_THEMES[c.to]||a;
return{a:a.a,b:b.a,shape:b.shape,shape2:b.shape2,text:b.text};
}
function filteredPosts(){
var kw=STATE.keyword.trim().toLowerCase();
return POSTS.filter(function(p){
var tagOk=STATE.activeTag==='all'||p.tags.indexOf(STATE.activeTag)!==-1;
var kwOk=!kw||(p.title+p.summary+p.tags.join('')).toLowerCase().indexOf(kw)!==-1;
return tagOk&&kwOk;});
}
function renderList(){
var grid=qs('#post-grid'),empty=qs('#empty-state'),count=qs('#posts-count');
var list=filteredPosts();
grid.innerHTML='';
list.forEach(function(p){
var card=el('article','post-card');card.setAttribute('data-id',p.id);
var cover=el('div','post-card__cover'),v=coverVars(p.cover);
cover.style.setProperty('--cover-a',v.a);cover.style.setProperty('--cover-b',v.b);
cover.style.setProperty('--cover-shape',v.shape);cover.style.setProperty('--cover-shape-2',v.shape2);cover.style.setProperty('--cover-text',v.text);
cover.appendChild(el('span',null,p.tags[0]||'Note'));
card.appendChild(cover);
var body=el('div','post-card__body');
var h3=el('h3','post-card__title'),link=el('a',null,p.title);
link.href='#post/'+p.id;link.setAttribute('data-post-link',p.id);
h3.appendChild(link);body.appendChild(h3);
body.appendChild(el('p','post-card__summary',p.summary));
var meta=el('div','post-card__meta'),time=el('time',null,p.dateText);
time.setAttribute('datetime',p.date);meta.appendChild(time);meta.appendChild(el('span',null,'·'));
meta.appendChild(el('span',null,p.readingTime+' 分钟阅读'));body.appendChild(meta);
var tags=el('div','post-card__tags');
p.tags.forEach(function(t){tags.appendChild(el('span','pill',t));});
body.appendChild(tags);card.appendChild(body);
/* 点击卡片非链接区域等价于点击标题 */
card.addEventListener('click',function(e){if(!e.target.closest('a'))openPost(p.id);});
grid.appendChild(card);
});
if(count){
if(!list.length)count.textContent='没有找到相关文章';
else if(list.length===POSTS.length)count.textContent='共 '+list.length+' 篇文章';
else count.textContent='找到 '+list.length+' 篇';
}
if(empty)empty.hidden=list.length!==0;
qsa('.filter__btn').forEach(function(b){
var on=b.getAttribute('data-tag')===STATE.activeTag;
b.classList.toggle('is-active',on);b.setAttribute('aria-pressed',on?'true':'false');
});
}
/* ===== 9. 详情渲染 ===== */
function renderBody(post){
var host=qs('#detail-body'),tocList=qs('#toc-list');
host.innerHTML='';tocList.innerHTML='';
var n=0;
post.body.forEach(function(b){
var node;
if(b.type==='h2'){
n+=1;node=el('h2',null,b.text);node.id='sec-'+post.id+'-'+n;
var li=el('li'),a=el('a',null,b.text);
a.setAttribute('data-toc',node.id);
a.addEventListener('click',function(e){e.preventDefault();var t=document.getElementById(node.id);if(t)t.scrollIntoView({behavior:'smooth',block:'start'});});
li.appendChild(a);tocList.appendChild(li);
}else if(b.type==='h3'){node=el('h3',null,b.text);}
else if(b.type==='ul'||b.type==='ol'){node=el(b.type);(b.items||[]).forEach(function(it){node.appendChild(el('li',null,it));});}
else if(b.type==='quote'){node=el('blockquote');node.appendChild(el('p',null,b.text));}
else if(b.type==='code'){node=el('pre');node.setAttribute('data-lang',b.lang||'code');node.appendChild(el('code',null,b.text));}
else{node=el('p',null,b.text);}
host.appendChild(node);
});
}
function navPair(post){
var arr=filteredPosts(),i=-1,j;
if(!arr.length)arr=POSTS;
for(j=0;j<arr.length;j++){if(arr[j].id===post.id){i=j;break;}}
if(i===-1){arr=POSTS;for(j=0;j<arr.length;j++){if(arr[j].id===post.id){i=j;break;}}}
return{prev:i>0?arr[i-1]:null,next:(i>=0&&i<arr.length-1)?arr[i+1]:null};
}
function renderDetail(post){
STATE.currentPostId=post.id;
qs('#detail-title').textContent=post.title;
var time=qs('#detail-date');time.textContent=post.dateText;time.setAttribute('datetime',post.date);
qs('#detail-reading').textContent=post.readingTime+' 分钟阅读';
var tags=qs('#detail-tags');tags.innerHTML='';
post.tags.forEach(function(t){tags.appendChild(el('span','pill',t));});
var cover=qs('#detail-cover'),v=coverVars(post.cover);
cover.style.setProperty('--cover-a',v.a);cover.style.setProperty('--cover-b',v.b);
cover.style.setProperty('--cover-shape',v.shape);cover.style.setProperty('--cover-shape-2',v.shape2);
renderBody(post);
var pair=navPair(post),prevBtn=qs('#prev-post'),nextBtn=qs('#next-post');
prevBtn.disabled=!pair.prev;nextBtn.disabled=!pair.next;
prevBtn.setAttribute('aria-disabled',pair.prev?'false':'true');
nextBtn.setAttribute('aria-disabled',pair.next?'false':'true');
qs('strong',prevBtn).textContent=pair.prev?pair.prev.title:'没有更多了';
qs('strong',nextBtn).textContent=pair.next?pair.next.title:'没有更多了';
prevBtn.setAttribute('data-post-id',pair.prev?pair.prev.id:'');
nextBtn.setAttribute('data-post-id',pair.next?pair.next.id:'');
}
/* ===== 10. 视图切换与路由 ===== */
function setView(view){
STATE.view=view;
var home=qs('#home'),posts=qs('#posts'),detail=qs('#post-detail'),bar=qs('#reading-progress');
if(view==='detail'){
home.hidden=true;posts.hidden=true;detail.hidden=false;bar.hidden=false;
}else{
home.hidden=false;posts.hidden=false;detail.hidden=true;bar.hidden=true;
qs('#reading-progress-bar').style.transform='scaleX(0)';
bar.setAttribute('aria-valuenow','0');
}
}
function openPost(id){
var post=findPost(id);if(!post)return;
if(STATE.view!=='detail')STATE.listScrollY=window.scrollY||0;
if(location.hash!=='#post/'+id)history.pushState({post:id},'','#post/'+id);
renderDetail(post);setView('detail');window.scrollTo(0,0);updateProgress();
}
function goBackToList(restore){
if(location.hash.indexOf('#post/')===0)history.pushState({list:true},'','#posts');
setView('list');renderList();
if(restore)requestAnimationFrame(function(){window.scrollTo(0,STATE.listScrollY);});
}
function scrollToSection(id){
var target=document.getElementById(id);if(!target)return;
requestAnimationFrame(function(){
var top=target.getBoundingClientRect().top+window.scrollY-70;
window.scrollTo({top:top,behavior:'smooth'});
});
}
function route(){
var hash=location.hash||'',m=hash.match(/^#post\/(.+)$/);
if(m){
var post=findPost(m[1]);
if(post){
if(STATE.view!=='detail')STATE.listScrollY=window.scrollY||0;
renderDetail(post);setView('detail');window.scrollTo(0,0);updateProgress();return;
}
goBackToList(false);return;
}
if(STATE.view==='detail'){setView('list');renderList();requestAnimationFrame(function(){window.scrollTo(0,STATE.listScrollY);});return;}
if(hash==='#posts'||hash==='#home'||hash==='#about')scrollToSection(hash.slice(1));
}
/* ===== 11. 阅读进度条 ===== */
var progressRaf=null;
function updateProgress(){
if(progressRaf)return;
progressRaf=requestAnimationFrame(function(){
progressRaf=null;
if(STATE.view!=='detail')return;
var detail=qs('#post-detail'),bar=qs('#reading-progress-bar'),wrap=qs('#reading-progress');
if(!detail||!bar)return;
var rect=detail.getBoundingClientRect();
var total=rect.height-window.innerHeight;
var p=total>0?clamp(-rect.top/total,0,1):(rect.top<=0?1:0);
bar.style.transform='scaleX('+p+')';
wrap.setAttribute('aria-valuenow',String(Math.round(p*100)));
updateTocActive();
});
}
function updateTocActive(){
var links=qsa('#toc-list a');if(!links.length)return;
var current=null;
links.forEach(function(a){
var t=document.getElementById(a.getAttribute('data-toc'));
if(t&&t.getBoundingClientRect().top<=140)current=a;
});
links.forEach(function(a){a.classList.toggle('is-active',a===current);});
}
/* ===== 12. 导航 ===== */
function initHeader(){
var header=qs('#site-header');
function onScroll(){header.classList.toggle('is-scrolled',(window.scrollY||0)>8);}
window.addEventListener('scroll',function(){onScroll();updateProgress();},{passive:true});
onScroll();
var links=qsa('.nav__link');
function setActive(target){
links.forEach(function(l){l.classList.toggle('is-active',l.getAttribute('data-target')===target);});
qsa('.nav-panel__list a').forEach(function(l){l.classList.toggle('is-active',l.getAttribute('data-target')===target);});
}
if('IntersectionObserver' in window){
var io=new IntersectionObserver(function(entries){
entries.forEach(function(e){if(e.isIntersecting)setActive(e.target.id);});
},{rootMargin:'-45% 0px -50% 0px',threshold:0});
['home','posts','about'].forEach(function(id){var s=document.getElementById(id);if(s)io.observe(s);});
}
/* 页内锚点由脚本接管，避免详情视图下 hash 冲突 */
qsa('a[href^="#"]').forEach(function(a){
a.addEventListener('click',function(e){
var href=a.getAttribute('href');
if(href.indexOf('#post/')===0||href==='#main')return;
e.preventDefault();
if(STATE.view==='detail'){setView('list');renderList();}
history.pushState(null,'',href);
var target=a.getAttribute('data-target');
if(target==='contact'){
var c=qs('#contact');
if(c)requestAnimationFrame(function(){c.scrollIntoView({behavior:'smooth',block:'center'});c.setAttribute('tabindex','-1');c.focus({preventScroll:true});});
}else if(href.length>1){
scrollToSection(href.slice(1));
}
});
});
var toggle=qs('#nav-toggle'),panel=qs('#nav-panel');
function closePanel(){
panel.classList.remove('is-open');panel.hidden=true;
toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','打开菜单');
document.body.classList.remove('is-locked');
}
function openPanel(){
panel.hidden=false;
requestAnimationFrame(function(){panel.classList.add('is-open');});
toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','关闭菜单');
document.body.classList.add('is-locked');
}
toggle.addEventListener('click',function(){
if(toggle.getAttribute('aria-expanded')==='true')closePanel();else openPanel();
});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closePanel();});
window.addEventListener('resize',function(){if(window.innerWidth>768)closePanel();});
}
/* ===== 13. 滚动淡入 ===== */
function initReveal(){
var nodes=qsa('.reveal');
var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduced||!('IntersectionObserver' in window)){
nodes.forEach(function(n){n.classList.add('is-visible');});return;
}
var io=new IntersectionObserver(function(entries){
entries.forEach(function(entry){
if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target);}
});
},{threshold:0.15});
nodes.forEach(function(n){io.observe(n);});
}
/* ===== 14. 初始化 ===== */
function init(){
applyTheme(readTheme(),false);
qsa('img.avatar-img').forEach(initAvatar);
renderList();
qs('#theme-toggle').addEventListener('click',function(){applyTheme(STATE.theme==='dark'?'light':'dark',true);});
qsa('.filter__btn').forEach(function(btn){
btn.addEventListener('click',function(){STATE.activeTag=btn.getAttribute('data-tag');renderList();});
});
var input=qs('#search-input');
input.addEventListener('input',function(){STATE.keyword=input.value||'';renderList();});
qs('#reset-filters').addEventListener('click',function(){
STATE.activeTag='all';STATE.keyword='';input.value='';renderList();input.focus();
});
qsa('[data-copy]').forEach(function(btn){btn.addEventListener('click',function(){handleCopy(btn);});});
qs('#back-to-posts').addEventListener('click',function(){goBackToList(true);});
qs('#back-to-top').addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
qs('#footer-top').addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
qs('#prev-post').addEventListener('click',function(){var id=this.getAttribute('data-post-id');if(id)openPost(id);});
qs('#next-post').addEventListener('click',function(){var id=this.getAttribute('data-post-id');if(id)openPost(id);});
qs('#year').textContent=String(new Date().getFullYear());
window.addEventListener('hashchange',route);
window.addEventListener('popstate',function(){
if(STATE.view==='detail'&&location.hash.indexOf('#post/')!==0){
setView('list');renderList();
requestAnimationFrame(function(){window.scrollTo(0,STATE.listScrollY);});
}else{route();}
});
initHeader();initReveal();route();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
