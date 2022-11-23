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
    langue(korean, english);
}
init();


function sendBusinessAlliance() {
    let obj = new Object
    obj.name = document.getElementById("name").value
    obj.subject = document.getElementById("subject").value
    obj.body = document.getElementById("body").value
    obj.email = document.getElementById("email").value
    console.log(obj)
    fetch("https://v9lsocdqh0.execute-api.ap-northeast-2.amazonaws.com/default/business-alliance", {
      method: 'POST',
      body: JSON.stringify(obj),
    })
    .then((response) => {
        if (!response.ok) {
            response.text().then(function (text) {
                return
            });
        }
        return response.json()
    })
    .then((obj) => {
      alert("Information has been sent.");
      console.log(obj)
    })
    .catch((err) => {
        console.log(err)
    });
}