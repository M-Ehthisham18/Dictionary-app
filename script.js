// const data = fetch('https://api.dictionaryapi.dev/api/v2/entries/en/fun');

// data
// .then((response)=>{
//     return response.json();
// })
// .then((meaning)=>{
//     console.log(meaning);
//     console.log(meaning[0].word);
//     console.log(meaning[0].phonetic);
//     console.log(meaning[0].meanings);
// repeat()
// function repeat() {
// for (let i = 0; i < meaning[0].meanings.length; i++) {
//     function values(params) {
//         if(params){
//             console.log(params);
//         }
//     }
//     values(meaning[0].meanings[i].partOfSpeech);
//     values(meaning[0].meanings[i].definitions[0].definition);
//     values(meaning[0].meanings[i].definitions[0].example);
//     values(meaning[0].meanings[i].synonyms[i])
// }
//}
// }
// )

const form = document.querySelector("#form");
const words =document.querySelector('#word');
const phonetic =document.querySelector('#phonetic');
const meaning =document.querySelector('#meaning');
const ul = document.querySelector('ul')

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if (!form.elements[0].value.trim()) {
        alert("enter your word");
    }
    else{
        const inputValue = form.elements[0].value.trim();
        form.elements[0].value = '';
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`;
        

    const search = fetch(`${url}`);
    search.then((response)=>{
        return response.json();
    }).then((search)=>{

        words.innerHTML = `<p style="text-transform: capitalize; font-weight: 600; font-size:1.5rem ">
        word : ${search[0].word}
        </p>`

        phonetic.innerHTML = `<p style=" font-size:1rem ">
        '${search[0].phonetic}'
        </p>`

        repeat(search[0].meanings); //repeat call 

        function repeat(p) {
            for (let i = 0; i < p.length; i++) {
                function values(params) {
                    if(params){
                        const li = document.createElement("li")
                        const para = document.createElement("p")
                        const example = document.createElement('p');

                        para.textContent= `Meaning: ${p[i].definitions[0].definition}`
                        // example.textContent =`Example: ${}`
            
                        li.textContent = `${p[i].partOfSpeech } : `
                        console.log(p[i].definitions[0].definition);
            
                        li.appendChild(para)    
                        ul.appendChild(li);
                    }   
                }
    values(p[i].partOfSpeech);
            }
        }
        })
    }
})


//     values(meaning[0].meanings[i].definitions[0].definition);
//     values(meaning[0].meanings[i].definitions[0].example);
//     values(meaning[0].meanings[i].synonyms[i])