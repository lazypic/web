var korean = document.getElementById('kor_click'),
    english = document.getElementById('eng_click'),
    korean_txt = document.querySelectorAll('.kor'),
    english_txt = document.querySelectorAll('.eng'),
    nb_korean = korean_txt.length,
    nb_english = english_txt.length;

korean.addEventListener('click', function() {
    langue(korean,english);
}, false);

english.addEventListener('click', function() {
    langue(english,korean);
}, false);

function langue(langueOn,langueOff){
    if (!langueOn.classList.contains('current_lang')) {
        langueOn.classList.toggle('current_lang');
        langueOff.classList.toggle('current_lang');
    }
    if(langueOn.innerHTML == 'Kor'){
        afficher(korean_txt, nb_korean);
        cacher(english_txt, nb_english);
    }
    else if(langueOn.innerHTML == 'Eng'){
        afficher(english_txt, nb_english);
        cacher(korean_txt, nb_korean);
    }
}

function afficher(txt,nb){
    for(var i=0; i < nb; i++){
        txt[i].style.display = 'block';
    }
}
function cacher(txt,nb){
    for(var i=0; i < nb; i++){
        txt[i].style.display = 'none';
    }
}
function init(){
    langue(english, korean);
}
init();