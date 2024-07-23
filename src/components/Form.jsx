import React, { useState } from "react";
import api from '../services/AuthService';
import { useNavigate } from "react-router-dom";

const Form = ({route, method}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleUsernameOnChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordOnChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const response = await api.post(route, {
              username,
              password,
            });
            if (response.status === 200 || response.status === 201){
                if (method == "login"){
                    localStorage.setItem('data', response.data);
                    localStorage.setItem('access', response.data.access);
                    localStorage.setItem('refresh', response.data.refresh);
                    navigate("/");
                }
                else {
                    navigate("/login")
                }
            }
            else {
                alert("Whoops, respose=", response)
                console.log(response)
            }
            
          } catch (error) {
            alert(`Something went rogue!${error}`)
            console.log(error.response.data)
          }
        

    }

    return (
        <>
        
        <div className="flex items-center justify-center p-12">
            <h1>{method}</h1>
            <div className="mx-auto w-full max-w-[550px] bg-white">
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="username" className="mb-3 block text-base font-medium text-[#07074D]">
                            Username
                        </label>
                        <input type='text' id="username" name="username" placeholder="Your name" value={username} 
                                onChange={(e)=>{handleUsernameOnChange(e)}}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"  />

                                
                    </div>
                    <div class="mb-5">
                        <label htmlFor="password" className="mb-3 block text-base font-medium text-[#07074D]">
                            Password
                        </label>
                        <input type='password' id="password" name ="password" placeholder="Password" value={password} 
                                onChange={(e)=>{handlePasswordOnChange(e)}}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div>
                        <input type="submit" value='Submit' style={{color: '#000'}}
                                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none" />
                    </div>
                    
                    <br></br>
                    <div className="text-xl">
                        {username}
                    </div>
                    <div className="text-xl">
                        {password}
                    </div>
                    
                
                </form>
            </div>
        </div>
        </>
    );
}

export default Form;

// import React, { useState } from "react";
// import api from '../services/AuthService';
// import { useNavigate } from "react-router-dom";
// import '../styles/Login.css';

// const Form = ({route, method}) => {

//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const navigate = useNavigate()

//     const handleUsernameOnChange = (e) => {
//         setUsername(e.target.value)
//     }

//     const handlePasswordOnChange = (e) => {
//         setPassword(e.target.value)
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         try {

//             const response = await api.post(route, {
//               username,
//               password,
//             });
//             if (response.status === 200 || response.status === 201){
//                 if (method == "login"){
//                     localStorage.setItem('data', response.data);
//                     localStorage.setItem('access', response.data.access);
//                     localStorage.setItem('refresh', response.data.refresh);
//                     navigate("/");
//                 }
//                 else {
//                     navigate("/login")
//                 }
//             }
//             else {
//                 alert("Whoops, respose=", response)
//                 console.log(response)
//             }
            
//           } catch (error) {
//             alert(`Something went rogue!${error}`)
//             console.log(error.response.data)
//           }
        

//     }
//     return (
//         <div className="login-container">
//           <div className="glass-background"></div>
//           <form
//             onSubmit={handleLogin}
//             className="login-form"
//             onMouseMove={(e) => {
//               const { clientX: x, clientY: y } = e;
//               gsap.to('.login-form', {
//                 duration: 0.5,
//                 x: (window.innerWidth / 2 - x) / 20,
//                 y: (window.innerHeight / 2 - y) / 20,
//                 rotationY: (window.innerWidth / 2 - x) / 40,
//                 rotationX: -(window.innerHeight / 2 - y) / 40,
//               });
//             }}
//           >
//             <h2 className="text-2xl font-bold mb-4 text-center text-white">Login</h2>
//             <input
//               type="text"
//               placeholder="Username"
//               className="login-input mb-2"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="login-input mb-4"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button type="submit" className="login-button">Login</button>
//           </form>
//         </div>
//       );
//     };



// export default Form;