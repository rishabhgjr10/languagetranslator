let langoptions = document.querySelectorAll('select');
let fromText = document.querySelector('.fromText');
let transText = document.querySelector('.toTranslate');
let fromVoice = document.querySelector('#left-speaker');
let transVoice = document.querySelector('#right-speaker');
let cpybtn = document.querySelector(".ri-file-copy-line");
let count = document.querySelector('#count');
let swipbtn = document.querySelector('.ri-arrow-left-right-line');


langoptions.forEach((get,con)=>{
    for(let contryCode in language){

        let selected;
        if(con==0 && contryCode === 'en-GB'){
            selected = 'selected';
        }else if(con==1 && contryCode === 'hi-IN'){
            selected = 'selected';
        }

        let options =`<option value="${contryCode}"${selected}>${language[contryCode]}</option>`;
        console.log(options);
        get.innerHTML += options;
    }
})

fromText.addEventListener("input",function(){
    let content = fromText.value;
    fromContent =langoptions[0].value;
    transcontent = langoptions[1].value;

    let transLink =`https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromContent}|${transcontent}`;

    fetch(transLink).then(translate => translate.json()).then(data =>{
        transText.value = data.responseData.translatedText;
    })
})

fromVoice.addEventListener('click',function(){
    let fromTalk;
    fromTalk = new SpeechSynthesisUtterance(fromText.value);
    fromTalk.lang = langoptions[0].value;
    speechSynthesis.speak(fromTalk);

})
transVoice.addEventListener('click',function(){
    let fromTalk;
    fromTalk = new SpeechSynthesisUtterance(transText.value);
    fromTalk.lang = langoptions[1].value;
    speechSynthesis.speak(fromTalk);

})

cpybtn.addEventListener('click',function(){
    if (transText.value.length == 0) {
        alert("Please Translate the text first!");
        return;
    }
    navigator.clipboard.writeText(transText.value);
    cpybtn.className = 'ri-check-double-fill';
})


fromText.addEventListener("keyup",function(){
    count.innerHTML = `${transText.value.length}/5000`;
    if (count.innerHTML == '5000/5000'){
        count.style.color = 'red';
    }
})

swipbtn.addEventListener('click',function(){
    let temp = langoptions[0].value;
    langoptions[0].value = langoptions[1].value;
    langoptions[1].value = temp;
})