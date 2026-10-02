(function(){
var $=function(i){return document.getElementById(i)};
var nl=$('nl'),mt=$('mt');
if(mt&&nl){mt.onclick=function(){nl.classList.toggle('open')};nl.onclick=function(){nl.classList.remove('open')}}
var S=["Occupational Therapy", "Sensory Integration Therapy", "Play & Engagement Therapy", "Neurodevelopmental Therapy", "Oral Placement Therapy", "Cognitive Behavioral Therapy (CBT)", "Group Therapy", "Social Skills Training", "Activities of Daily Living (ADL) Training"];
var opts='<option value="">Not sure yet</option>'+S.map(function(s){return '<option>'+s.replace(/&/g,'&amp;')+'</option>'}).join('');
var d=document.createElement('div');d.className='md';d.id='md';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.setAttribute('aria-labelledby','mdt');d.hidden=true;
d.innerHTML='<div class="mb"><button type="button" class="mx" id="mx" aria-label="Close">&times;</button><h2 id="mdt">Book an appointment</h2><p>Share a few details and we will continue on WhatsApp.</p><form id="bf"><input id="bn" placeholder="Parent\'s name *" maxlength="60" required autocomplete="name"><input id="ba" placeholder="Child\'s age" maxlength="20"><select id="bs" aria-label="Service">'+opts+'</select><textarea id="bm" rows="3" placeholder="Your concern (optional)" maxlength="300"></textarea><button class="btn" type="submit">Send on WhatsApp</button></form><a class="md-call" href="tel:+917507338969">or call 075073 38969</a></div>';
document.body.appendChild(d);
function open(e){if(e)e.preventDefault();d.hidden=false;document.body.style.overflow='hidden';setTimeout(function(){$('bn').focus()},50)}
function close(){d.hidden=true;document.body.style.overflow=''}
document.querySelectorAll('.nc a[href$="#contact"],.ct a[href$="#contact"],.cta a[href$="#contact"],.tb a[href$="#contact"],[data-book]').forEach(function(a){a.addEventListener('click',open)});
$('mx').onclick=close;d.addEventListener('click',function(e){if(e.target===d)close()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!d.hidden)close()});
function wa(n,a,s,m){var t="Hello Dr. Devyani, I'd like to book an appointment.\nParent: "+n+(a?"\nChild's age: "+a:"")+(s?"\nService: "+s:"")+(m?"\nConcern: "+m:"");window.open("https://wa.me/917507338969?text="+encodeURIComponent(t),"_blank")}
$('bf').onsubmit=function(e){e.preventDefault();wa($('bn').value,$('ba').value,$('bs').value,$('bm').value);close()};
var af=$('af');if(af)af.onsubmit=function(e){e.preventDefault();wa($('n').value,$('a').value,'',$('m').value)};
})();
