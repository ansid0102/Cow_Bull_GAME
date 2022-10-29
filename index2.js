const reveal_word = document.getElementById('guess')
var actual_word=document.getElementById('actual_word');
var bull_score = document.getElementById('bull');
var cow_score = document.getElementById('cow');
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
    // console.log(index)
    actual_word.innerHTML=words_list[index];
    generated_word=words_list[index];
}
randomIndex(words_list)
generated_word=generated_word.toLowerCase();
// console.log(generated_word)

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

var s='Hell';
var user_word=document.getElementById('user_word')
var htmlHistory = document.getElementById('history')
var word_history = []
// = document.getElementById('user_word').textContent;
document.getElementById('user_word').addEventListener('keyup',(enter)=>{
    if(enter.key=='Enter'){
        // console.log('Enterr')
        bull_score.textContent='0'
        cow_score.textContent='0'
        map_reset();
        console.log()
        user_word.value = user_word.value.toLowerCase();
        if(user_word.value.length<4){
            document.getElementById('error').textContent='Word should be of 4 characters'
        }else{
            document.getElementById('error').textContent=''
            word_history.push(user_word.value);
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
var key_map;
function map_reset(){
key_map = new Map()
for(let i=0;i<4;i++){
    if(key_map.get(generated_word[i])>=1){
        key_map.set(generated_word[i],key_map.get(generated_word[i])+1);
    }else{
        key_map.set(generated_word[i],1)
}
}
console.log(key_map)
}
var user_map = {}
for(let i=0;i<4;i++){
    if(user_map[user_word[i]]>=1){
        user_map[user_word[i]]=user_map[user_word[i]]+1;
    }else{
        user_map[user_word[i]]=1
    }
}
function compare(userText){
    console.log(user_map)

    let b = Number(bull_score.textContent)
    let c = Number(cow_score.textContent)
    for(let i=0;i<4;i++){
        if(userText[i]==generated_word[i]){
            b++;
            key_map.set(userText[i],Number(key_map.get(userText[i]))-1);
        }// }else if(generated_word.includes(userText[i])){
        //     console.log(generated_word.includes(userText[i]))
        //     c++;
        // }
        // console.log(user_map[userText[i]]>map[user_word[i]])
        // if(user_map[userText[i]]>map[user_word[i]]){
        //     if(userText[i]==generated_word[i]){
        //         b++;
        //         user_map[userText[i]]=user_map[userText[i]]-(user_map[userText[i]]-map[userText[i]])-1;
        //         // bull_score.textContent=b;
        //     }else{
        //         continue;
        //     }
        // }else if(userText[i]==generated_word[i]){
        //     b++;
        //     user_map[userText[i]]=user_map[userText[i]]-1;

        // }else if(userText[i] in map){
        //     c++;
        //     user_map[userText[i]]=user_map[userText[i]]-1;

        // }
    }
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            console.log(generated_word[i])
             if(userText[i]==generated_word[j]&&(i!=j)){
                if(key_map.get(userText[i])>=1){
                    c++;
                    key_map.set(userText[i],Number(key_map.get(userText[i])-1))
                }
                // map[userText[i]]=map[userText[i]]-1;
             }
        }
    }
    bull_score.textContent=b;
    cow_score.textContent=c;
    if(b==4){
        confirm(`Hurray Winner, It took you ${word_history.length} attempt to win`)
        window.location.reload()
    }
}
