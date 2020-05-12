const numbers = document.querySelectorAll('.btn-num');
const operators = document.querySelectorAll('.btn-ope');
const screen = document.querySelector('#screen');
const clear = document.querySelector('#clear');
const undo = document.querySelector('#undo');
const dot = document.querySelector('#dot');
const equal = document.querySelector('#equal');
let operands = [];
let operations = [];
let reg = /[*/+-]/g
const re2 = /[.]/g;
let boolean = false;
let click = 0;
let dotBoolean = true

//evento de igual
equal.addEventListener('click', () => {
    playEqual();
})

// evento que busca el punto en el texto
dot.addEventListener('click', () => {
    if (dotBoolean == true && screen.textContent == ''){
        screen.textContent += '0.';
        click -= 2;
    } else if ( dotBoolean == true && screen.textContent !== ''){
        screen.textContent += '.';
        click--;
    }

    dotBoolean = false;

})

//limpia completamente la calculadora
clear.addEventListener('click', () => {
    clean();
    screen.textContent = '';
});

//va un paso atras en la calculadora
undo.addEventListener('click', () => {
    playUndo();
});

//pone los numeros en la calculadora
numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        click--;
        screen.textContent += number.textContent;
        boolean = true;
    }); 
});

//separa los dos operandos
operators.forEach((operator) => {
    operator.addEventListener( 'click',  (e) => {
        if (boolean == true) {
            if (click == 0){
                operands.push(parseFloat(screen.textContent));
            } else {
                operands.push(parseFloat(screen.textContent.slice(click)));
            }
            if  (operations[0] !== undefined){
                if (operations.length == 1 && operands.length == 2) {
                    if (operations[0] == '*' || operations[0] == '/') {

                            operands[0] = operation(operands[0], operands[1], 0);
                            operations.splice(0,1);
                            operands.splice(1,2);
                            console.log(operands);
                            console.log(operations); 
                    }
                } else if (operations.length == 2 && operands.length == 3) {
                
                    if (operations[1] == '+' || operations[1] == '-'){
                        
                        operands[0] = operation(operands[0], operands[1], 0);
                        operations.splice(0,1);
                        operands.splice(1,1);
                        console.log(operands);
                        console.log(operations);
                    } else if (operations[1] == '*' || operations[1] == '/') {
        
                        operands[1] = operation(operands[1], operands[2], 1);
                        operations.splice(1,1);
                        operands.splice(2,1);
                        operands[0] = operation(operands[0], operands[1], 0);
                        operations.splice(0,1);
                        operands.splice(1,1);
                        console.log(operands);
                        console.log(operations);
                    }
                }
            }
            click = 0;
            operations.push(operator.textContent);
            screen.textContent += operator.textContent;
            boolean = false;
            dotBoolean = true;
            console.log(operands);
            console.log(operations);
        }
    })
});

function add(a, b){
    return a+b
}

function subtract(a, b){
    return a-b
}

function multiply(a, b){  
    return a*b
}

function divide(a, b){
    return a/b
}

function operation(a, b, c){

        switch (operations[c]) {
            case '*':
                return multiply(a, b);
                break;
            case '/':
                return divide(a, b);
                break;
            case '+':
                return add(a, b); 
                break;
            case '-':
                return subtract(a, b);
                break;
        } 
};

function clean(){
    operands = [];
    operations = [];
    console.log(operands);
    console.log(operations);
};

function playUndo() {
    click++;
    let clean = screen.textContent.length;
    console.log(clean);
    screen.textContent = screen.textContent.slice(0, clean-1);
    operands.pop();
    operations.pop();

}

function playNum(e) {
    click--;
    screen.textContent += e.key;
    boolean = true;
};

function playOpe (e) {
    if (boolean == true) {
        if (click == 0){
            operands.push(parseFloat(screen.textContent));
        } else {
            operands.push(parseFloat(screen.textContent.slice(click)));
        }
        if  (operations[0] !== undefined){
            if (operations.length == 1 && operands.length == 2) {
                if (operations[0] == '*' || operations[0] == '/') {

                        operands[0] = operation(operands[0], operands[1], 0);
                        operations.splice(0,1);
                        operands.splice(1,2);
                        console.log(operands);
                        console.log(operations); 
                }
            } else if (operations.length == 2 && operands.length == 3) {
            
                if (operations[1] == '+' || operations[1] == '-'){
                    
                    operands[0] = operation(operands[0], operands[1], 0);
                    operations.splice(0,1);
                    operands.splice(1,1);
                    console.log(operands);
                    console.log(operations);
                } else if (operations[1] == '*' || operations[1] == '/') {
    
                    operands[1] = operation(operands[1], operands[2], 1);
                    operations.splice(1,1);
                    operands.splice(2,1);
                    operands[0] = operation(operands[0], operands[1], 0);
                    operations.splice(0,1);
                    operands.splice(1,1);
                    console.log(operands);
                    console.log(operations);
                }
            }
        }
        click = 0;
        operations.push(e.key);
        screen.textContent += e.key;
        boolean = false;
        dotBoolean = true;
        console.log(operands);
        console.log(operations);
    }
};

function playEqual (){
    operands.push(parseFloat(screen.textContent.slice(click)));
    console.log(operands);
    if (operations.length == 1 && operands.length == 2) {
        screen.textContent = Math.round(operation(operands[0], operands[1], 0));
    } else if (operations.length == 2 && operands.length == 3) {
        if (operations[1] == '+' || operations[1] == '-'){
                
            operands[0] = operation(operands[0], operands[1], 0);
            operations.splice(0,1);
            operands.splice(1,1);
            console.log(operands);
            console.log(operations);
        } else if (operations[1] == '*' || operations[1] == '/') {

            operands[1] = operation(operands[1], operands[2], 1);
            operations.splice(1,1);
            operands.splice(2,1);
            console.log(operands);
            console.log(operations);
        }
         screen.textContent = Math.round(operation(operands[0], operands[1], 0));
    }
    clean();
    click = 0;
}


window.addEventListener('keydown', (e) => {
    if (e.keyCode >= 96 && e.keyCode <= 105 ){
        playNum(e);
    } else if (e.keyCode == 111 || e.keyCode == 106 || e.keyCode == 109 || e.keyCode == 107){
        playOpe(e);
    } else if (e.keyCode == 8){
        playUndo();
    } else if (e.keyCode == 67) {
        clean();
        screen.textContent = '';
    } else if (e.keyCode == 190 || e.keyCode == 110){
        if (dotBoolean == true && screen.textContent == ''){
            screen.textContent += '0.';
            click -= 2;
        } else if ( dotBoolean == true && screen.textContent !== ''){
            screen.textContent += '.';
            click--;
        }
    
        dotBoolean = false;
        
    } else if (e.keyCode == 13) {
        playEqual();
    }

});


