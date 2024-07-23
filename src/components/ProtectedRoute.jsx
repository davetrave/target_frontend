import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import api from "../services/AuthService"
import { jwtDecode } from 'jwt-decode'

const Protected = ({children}) => {

    const [isAuth, setIsAuth] = useState(null)
    const [tokenExpT, setTokenExpT] = useState(0)

    useEffect(() => {
        //auth()
        auth().catch(() => {setIsAuth(false)}) 
        console.log("Exp = ", tokenExpT, ", auth", isAuth)
    }, [])

    const refreshToken =  async () => {
        const refreshToken = localStorage.getItem("refresh")
        try {
            const response = await api.post("api/user/token/refresh/", {refresh:refreshToken})
            if (response.status === 200) {
                localStorage.setItem("access", response.data.access)
                setIsAuth(true)
            }
            else {
                setIsAuth(false)
            }
        } catch (error) {
            setIsAuth(false)
            console.log(error)
        }
        

    }

    const auth = async () => {
        const token = localStorage.getItem('access')
        
        if (!token) {
            setIsAuth(false)
            return
        }
        

        const decodedToken = jwtDecode(token)
        const tokenExp = decodedToken.exp
        
        setTokenExpT(tokenExp - Date.now()/1000)
        
        if (tokenExp > Date.now()/1000) {
            setIsAuth(true)
            console.log("Hello, I am here", tokenExp > Date.now()/1000)
        }
        else {
            await refreshToken()
        }
        


    }

    if (isAuth == null) {
        return <div>Loading...</div>
    }

    
    return isAuth? children : <Navigate to="/login" />
}

export default Protected