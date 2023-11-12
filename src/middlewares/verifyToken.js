import api from '../services/api'

export default async function isValidToken(token) {
    let valid = false

    try{
        const { status } = await api.get('/validarToken', { 
            headers: {
                'Content-Type': 'application/json',
                Authorization : token
            } 
        })

        valid = (status === 200)
    }catch(error){
        console.log(`catch valid token: ${error}`)
        return false
    }
    
    return (valid)
}