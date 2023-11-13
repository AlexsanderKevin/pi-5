import bigInt from "big-integer"

const publicKey = {
    e: 11,
    n: 18584059629871
}

export default function criptografar(msg) {
    let caracteres = msg.split('').map(caracter => caracter.charCodeAt()) 
    let caracterCifrado = caracteres.map(caracter => bigInt(caracter).modPow(publicKey.e, publicKey.n)) 
    
    return caracterCifrado.join(' ') 
}