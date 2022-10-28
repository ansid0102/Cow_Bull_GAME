const reveal_word = document.getElementById('guess')
var actual_word=document.getElementById('actual_word');
words_list = ['Area','Army','Baby','Back','Ball','Band','Bank','Base','Bill','Body','Book','Call',
'Card','Care','Case','Cash','City','Club','Cost','Date','Deal',
'Door','Duty','East','Edge','Face','Fact','Farm','Fear','File',
'Film','Fire','Firm','Fish','Food','Foot','Form','Fund','Game',
'Girl','Goal','Gold','Hair','Half','Hall','Hand','Head','Help',
'Hill','Home','Hope','Hour','Idea','Jack','John','Kind','King',
'Lack','Lady','Land','Life','Line','List','Look','Lord','Loss','Love','Mark','Mary','Mind','Miss','Move','Name','Need','News','Note','Page',
'Pain','Pair','Park','Part','Past','Path','Paul','Plan','Play','Post','Race','Rain','Rate','Rest','Rise','Risk','Road','Rock','Role','Room','Rule','Sale',
'Seat','Shop','Show','Side','Sign','Site','Size','Skin','Sort','Star','Step','Task','Team','Term','Test','Text','Time','Tour','Town','Tree','Turn','Type',
'Unit','User','View','Wall','Week','West','Wife','Will','Wind','Wine','Wood','Word','Work','Year']
var generated_word;
function randomIndex(words_list){
    var index= Math.floor(Math.random()*words_list.length-1)
    console.log(index)
    actual_word.innerHTML=words_list[index];
    generated_word=words_list[index];
}
randomIndex(words_list)
generated_word=generated_word.toLowerCase();
console.log(generated_word)

reveal_word.addEventListener('click',function(){
    console.log('clicked')
    if(reveal_word.setAttribute)
    if(document.getElementById('actual_word').style.visibility==='visible'){
        document.getElementById('actual_word').style.visibility='hidden';
        reveal_word.textContent='Reveal'
    }else{
        reveal_word.textContent='Hide'

        document.getElementById('actual_word').style.visibility='visible';
    }
})
var bull_score = document.getElementById('bull');
var cow_score = document.getElementById('cow');
var s='Hell';
var user_word=document.getElementById('user_word')
var htmlHistory = document.getElementById('history')
var word_history = []
// = document.getElementById('user_word').textContent;
document.getElementById('user_word').addEventListener('keyup',(enter)=>{
    if(enter.key=='Enter'){
        // console.log('Enterr')
        user_word.value = user_word.value.toLowerCase();
        if(user_word.value.length<4){
            document.getElementById('error').textContent='Word should be of 4 characters'
        }else{
            document.getElementById('error').textContent=''
            bull_score.textContent='0'
            cow_score.textContent='0'
            word_history.push(user_word.value)
            compare(user_word.value);
            word_pusher(user_word.value)
        }
    }
})

function word_pusher(item){
        let li = document.createElement("li");
        li.innerText=item+"  Bulls: "+bull_score.textContent+ " Cows: "+cow_score.textContent;
        htmlHistory.appendChild(li)
}

var map = {}
for(let i=0;i<4;i++){
    if(map[generated_word[i]]>=1){
        map[generated_word[i]]=map[generated_word[i]]+1;
    }else{
        map[generated_word[i]]=1
}
}

function compare(s){
    for(let i=0;i<4;i++){
        if(s[i]==generated_word[i]){
            console.log(s[i]+" "+generated_word[i]);
            console.log(s[i]+'  '+generated_word[i])
            console.log(map)

            let b = Number(bull_score.textContent);
            b++;
            bull_score.textContent=b;
            if(map[generated_word[i]]>1){
                map[generated_word[i]]=map[generated_word[i]]-1;
            }
            else if(map[generated_word[i]]==1){
            delete map[generated_word[i]]
            }
            if(b==4){
                alert('Hurray Winner');
                randomIndex(words_list)
                bull_score.textContent='0'
            cow_score.textContent='0'
            }
        }else{
            if(s[i] in map){
                let c = Number(cow_score.textContent);
                c++;
                cow_score.textContent=c;
            }
        }
    }
}
