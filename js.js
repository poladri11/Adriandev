const { createApp } = Vue;

function randomNum() {
    return Math.floor(Math.random() * 50);
}
document.querySelectorAll(".logoLetter").forEach(letter => {

    const negative = Math.floor(Math.random() * 2) === 1;
    let minus = "";
    if(!negative) { minus = "-" }
    letter.style.left = randomNum() + minus + "px";
    letter.style.top = randomNum() + minus + "px";
})

createApp({
    data() {
        return {
            nameLetters: ['a','d','r','i','a','n','D','e','v','.','e','s'],
            abcLetters: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'ñ', 'o', 'p', 'q', 'r',  's', 't', 'u', 'v', 'w', 'x',
            'y', 'z', '%', '€', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            numOfSwaps: 0,
            selfName: "",
            selfNameBase: "Adrián Sanz Gutiérrez",
            typesOfKnow: "",
            typesOfKnowBase: ["HTML", "JavaScript", "Css", "PHP", "SASS", "AnimeJs", "jQuery", "NodeJs", "Composer"]
        }
    },
    methods: {
        nameLettersSwap() {

            if(this.numOfSwaps >= this.nameLetters.length) { return }
            let numOfSwapsEach = 0;
            const originalLetter = this.nameLetters[this.numOfSwaps];
            const numOfSwapsActual = this.numOfSwaps;

            let timedLetter = setInterval(() => {
                let randomSelector = Math.floor(Math.random() * this.nameLetters.length);
                this.nameLetters[numOfSwapsActual] = this.abcLetters[randomSelector];                
      
                if(numOfSwapsEach === 5) {
                    this.numOfSwaps++;
                    this.nameLettersSwap();
                }
                
                if(numOfSwapsEach > 15) {
                    clearInterval(timedLetter);
                    this.nameLetters[numOfSwapsActual] = originalLetter;
                }
                numOfSwapsEach++;
            }, 25);

        },

        animeLetters() {

            anime({
                targets: ".logoLetter",
                opacity: 1,
                left: "0px",
                top: "0px",
                delay: anime.stagger(160)
            })
        },
        fillName() {
            const name = this.selfNameBase.split("");
            let index = 0;


            const filled = setInterval(() => {
                if(index >= name.length) { 
                    clearInterval(filled);
                    return
                }
                this.selfName += name[index];
                index++;
            }, 75);
        },
        fillKnow() {
            
            setInterval(() => {

                let active = false;

                
                if(this.typesOfKnow.length > 0) {
                    
                    active = true;
                    const removeChar = setInterval(() => {
                        if(this.typesOfKnow.length === 0) {
                            clearInterval(removeChar);
                            active = false;
                        }
                        this.typesOfKnow = this.typesOfKnow.slice(0, -1);
                    }, 50);
                }
                
                
                let randomSel = Math.floor(Math.random() * this.typesOfKnowBase.length);
                let indexOfWord = 0;
                
                if(this.typesOfKnow === this.typesOfKnowBase[randomSel]) { return; }
                
                
                
                setInterval(() => {
                    
                    if(indexOfWord >= this.typesOfKnowBase[randomSel].length || active) { return; }
                    
                    const word = this.typesOfKnowBase[randomSel];
                    const splitted = word.split("");
                    this.typesOfKnow += splitted[indexOfWord];
                    indexOfWord++;
                }, 50);

            }, 2000);
        }
    },  
    mounted() {
        this.nameLettersSwap();
        this.animeLetters();
        this.fillName();
        this.fillKnow();
    }
}).mount("#app");
