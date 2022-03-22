//una forma de hacer que al tocar el mayus o el control aparezcan otras teclas es asignandoselas al mismo boton
const keys = [
    [
        ["1","!"],
        ["2","@"],
        ["3","#"],
        ["4","$"],
        ["5","%"],
        ["6","&"],
        ["7","/"],
        ["8","("],
        ["9",")"],
        ["0","="],
        ["'","?"],
        ["¡","¿"]
    ],//primera fila
    [
        ["q","Q"],
        ["w","W"],
        ["e","E"],
        ["r","R"],
        ["t","T"],
        ["y","Y"],
        ["u","U"],
        ["i","I"],
        ["o","O"],
        ["p","P"],
        ["`","^"],
        ["+","*"]
    ],
    [
        ["MAYUS","MAYUS"],
        ["a","A"],
        ["s","S"],
        ["d","D"],
        ["f","F"],
        ["g","G"],
        ["h","H"],
        ["j","J"],
        ["k","K"],
        ["l","L"],
        ["ñ","Ñ"],
        ["´","{"],
        ["ç","}"]
    ],
    [
        ["SHIFT","SHIFT"],
        ["<",">"],
        ["z","Z"],
        ["x","X"],
        ["c","C"],
        ["v","V"],
        ["b","B"],
        ["n","N"],
        ["m","M"],
        [",",";"],
        [".",":"],
        ["-","_"]
    ],
    [
        ["SPACE","SPACE"]
    ]//ultima fila
];

let mayus = false;
let shift = false;
let current = null;

renderKeyboard();

function renderKeyboard(){
    const keyboardContainer = document.querySelector("#keyboard-container");
    let empty = `<div class="key-empty"></div>`; //espacios en el teclado para que no este perfectamente alineado?

    const layers = keys.map((layer)=>{
        //quiero que hagas una iteracion por cada capa o fila y dependiendo los controles que tengamos
        //vamos a tener que volver a hacer una iteracion
        //pimero recorrido por fila y ahora el segundo para ir por cada uno de los elementos
        return layer.map(key => {
            if(key[0] == "SHIFT"){
                //vamos a renderizar un boton especial
                return `<button class="key key-shift ${shift ? "activated" : ""}">${key[0]}</button>`
            }
            if(key[0] == "MAYUS"){
                return `<button class="key key-mayus ${mayus ? "activated" : ""}">${key[0]}</button>`
            }
            if(key[0] == "SPACE"){
                return `<button class="key key-space"></button>`
            }
            //operador ternario anidado
            //evaluo en mayus que el codigo ASCII de la letra minuscula este entre a minuscula (97) y z minuscula (122)
            return `<button class="key key-normal">
                        ${shift ?
                             key[1] : 
                             mayus && key[0].toLowerCase().charCodeAt(0) >= 97 
                             && key[0].toLowerCase().charCodeAt(0) <= 122 ?
                              key[1] : key[0]}
                    </button>`
        })
    });

    //todo eso devuelve un mega arreglo con todos los botones
    layers[0].push(empty);//agrego un elemento al final que es el div vacio al arreglo de botones de la primera fila
    layers[1].unshift(empty);

    const htmlLayers = layers.map(layer => {
        return layer.join("");
    }); //devuleve un arreglo de un solo nivel

    keyboardContainer.innerHTML = "";

    htmlLayers.forEach( layer => {
        keyboardContainer.innerHTML += `<div class="layer">${layer}</div>`
    });

    document.querySelectorAll(".key").forEach(key => {
        key.addEventListener("click", e => {
            if(current){
                if(key.textContent == "SHIFT"){
                    shift = !shift;
                    
                }else if(key.textContent == "MAYUS"){
                    mayus = !mayus;
                    
                }else if(key.textContent == ""){
                    current.value += " ";
                }else{
                    current.value += key.textContent.trim();//se agregan los espacios vacios en la etiqueta
                    if (shift) {
                        shift = false;
                        
                    }
                }
                renderKeyboard();
                current.focus();
            }
        });
    });

}



document.querySelectorAll("input").forEach(input =>{
    input.addEventListener("focusin",e =>{
        current=e.target;
    });
});