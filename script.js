const form = document.querySelector("#form");
const words =document.querySelector('#word');
const phonetic =document.querySelector('#phonetic');
const audio = document.querySelector('#audio');
const meaning =document.querySelector('#meaning');
const ul = document.querySelector('ul');
const box = document.querySelector('#box')
const box1 = document.querySelector('.box1')
const readMore = document.querySelector('#readMore');


form.addEventListener('submit',(e)=>{
    e.preventDefault();

    if (!form.elements[0].value.trim()) {
        alert("enter your word");
    }
    else{
        // Clear previous output
        words.innerHTML = '';
        phonetic.innerHTML = '';
        ul.innerHTML = ''; 
        readMore.innerHTML = '';
        audio.innerHTML = '';
        readMore.style.display = 'block'
        // Clear the list of meanings
        const inputValue = form.elements[0].value.trim();
        form.elements[0].value = '';
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`;
        

    const search = fetch(`${url}`);
    search.then((response)=>{
        return response.json();
    }).then((search)=>{
        console.log(search.title);
        if(search.title === `No Definitions Found`){
            box1.innerHTML=`<div style="font-size:xx-large; font-weight:600;">
                Sorry word not found !
            </div>`
            box.style.display='none'
            box1.style.display = "block"
        }
        else{
            box.style.display= 'block'
            box1.style.display='none'
        words.innerHTML = `<p style="text-transform: capitalize; font-weight: 600; font-size:1.5rem ">
        word : ${search[0].word}
        </p>`
        if(search[0].phonetic){
        phonetic.innerHTML = `<p style=" font-size:1rem ;display:inline">
        '${search[0].phonetic}'
        </p>`
        }

        if (search[0].phonetics && search[0].phonetics[0] && search[0].phonetics[0].audio) {
            audio.innerHTML = `<span id="sound-icon" style="cursor: pointer; font-size: 1.5rem;">🔊</span>`;

            const soundIcon = document.getElementById('sound-icon');
            
            // Add click event listener to sound icon
            soundIcon.addEventListener('click', function playAudioOnce() {
                    const audioElement = new Audio(search[0].phonetics[0].audio);
                    audioElement.play();
            });
        }


        

        if (search[0].sourceUrls && search[0].sourceUrls.length > 0) {
            readMore.innerHTML = `<a href="${search[0].sourceUrls[0]}" target="_blank" style="color: white; text-decoration: none; margin-top: 1rem;">Read More</a>`;
        }

        repeat(search[0].meanings); //repeat call 

        function repeat(p) {
            for (let i = 0; i < p.length; i++) {
                function values(params) {
                    if(params){
                        const li = document.createElement("li")
                        const para = document.createElement("p")
                        const example = document.createElement('p');

                        li.textContent = `${p[i].partOfSpeech }: `
                        ul.appendChild(li);
                        // li.setAttribute("class", "bold");
                        function defining(def) {
                            if(def){
                                
                                para.textContent= `Meaning: ${def.definition}`
                                if(def.example){
                                example.textContent =`Example: ${def.example}`
                                }
                                li.appendChild(para)  
                                li.appendChild(example)  
                            }
                        }
                        defining(p[i].definitions[0])
                        
                    }   
                }
                values(p[i].partOfSpeech);
            }
        }
    }
        })
    
    }
})
