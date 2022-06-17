function newCalculator(){
    return{
        display: document.querySelector('.container-grid'),
        input: document.querySelector('#inputCalc'),
        historyTemp: document.querySelector('.history-temp'),
        historyPersist: document.querySelector('.history-persistent'),
        flag: false,
        flagAc: 0,

        init(){
            this.clickButtons();
            this.keyPress();
        },

        changeClass(flag){
            if(flag){
                this.historyTemp.classList.replace('history-temp', 'inputCalc');
                this.input.classList.replace('inputCalc', 'history-temp');
            }else{
                this.input.classList.replace('history-temp','inputCalc');
                this.historyTemp.classList.replace('inputCalc', 'history-temp');
            }
        },

        doEquation(){
            let equation = this.input.value;

            this.historyTemp.innerText = equation;
            equation = eval(equation);
            Number(equation);
            if(!equation){
                return;
            }
            this.historyTemp.innerText = `= ${equation}`;
        },

        keyPress(){
            this.input.addEventListener('keypress', function(e){
                if(e.keyCode === 13){
                    this.flag = true;
                    this.changeClass(this.flag);
                    this.doEquation();
                    console.log(e)
                }
            }.bind(this))
        },

        sendToInput(el){
            if(el.classList.contains('back')){
                this.input.value = this.input.value.slice(0, -1);
            }
            if(el.classList.contains('clear')){
                this.input.value = '';
            }
            if(el.classList.contains('lPar')){
                this.input.value += el.innerText;
            }
            if(el.classList.contains('rPar')){
                this.input.value += el.innerText;
            }
            if(el.classList.contains('number')){
                this.input.value += el.innerText;
            }
            if(el.classList.contains('equals')){
                this.flag = true;
                this.changeClass(this.flag);
            }
        },


        thisFlag(){
            if(this.flag){
                this.flag = false;
                this.changeClass(this.flag);
                this.historyPersist.innerHTML = `<p>${this.input.value} <br> ${this.historyTemp.innerText}</p>`;
                this.input.value = '';
            }
        },


        clickButtons(){
            document.addEventListener('touchend', function(e){
                console.log(e);
                const el = e.target;
                if(el.classList.contains('btn')){
                    //Get the value of the button and put it in input
                    this.thisFlag();
                    this.sendToInput(el);
                    this.doEquation();
                }
            }.bind(this))
        }
    };
}

const calculator = newCalculator();
calculator.init();
