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
const ope = ['+','-','*','/'];
const re2 = /[.]/g;
let click = 0;

//evento de igual
equal.addEventListener('click', () => {
    operands.push(Number(screen.textContent.slice(click)));
    console.log(operands);
    screen.textContent = operation(operands[0], operands[1]);
    clean();
    click = 0;
})

// evento que busca el punto en el texto
dot.addEventListener('click', () => {
    if (screen.textContent.search(re2) <= 1){
        screen.textContent += '.';
    }
})

//limpia completamente la calculadora
clear.addEventListener('click', () => {
    clean();
    screen.textContent = '';
});

//va un paso atras en la calculadora
undo.addEventListener('click', () => {
    click++;
    let clean = screen.textContent.length;
    console.log(clean);
    screen.textContent = screen.textContent.slice(0, clean-1);
    operands.pop();
    operations.pop();
});

//pone los numeros en la calculadora
numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        click--;
        screen.textContent += number.value;
    }); 
});

//separa los dos operandos
operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        if (click == 0){
            operands.push(Number(screen.textContent));
        } else {
            operands.push(Number(screen.textContent.slice(click)));
        }
        click = 0;
        operations.push(operator.textContent);
        screen.textContent += operator.textContent;
        console.log(operands);
        console.log(operations);

    })
})



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

function operation(a, b){

    if (operations.length <= 1) {
        switch (operations[0]) {
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
    } else {

        if (operations.some( oper => oper = '*') || operations.some(oper => oper ='/')){
            

        }
    }

}

function clean(){
    operands = [];
    operations = [];
    console.log(operands);
    console.log(operations);
}
