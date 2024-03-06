import AgencyImage from '../assets/Illustration/Agency.png'
import DocumentsImage from '../assets/Illustration/Documents.png'
import PieChartImage from '../assets/Illustration/PieChart.png'
import PresentationImage from '../assets/Illustration/Presentation.png'
import Team1Image from '../assets/Illustration/Team.png'
import Team2Image from '../assets/Illustration/Team-2.png'
import Team3Image from '../assets/Illustration/Team-3.png'
import Team4Image from '../assets/Illustration/Team-4.png'

import UserSVG from '../assets/Icons/user.svg'
import LockSVG from '../assets/Icons/lock.svg'
import TextField from '../components/TextField'
import ActivityIndicator from '../components/ActivityIndicator'

import { useRef, useState } from 'react'
import { useAuthState, useAuthStateContext } from '../hooks/AuthStateContext'
import signin from '../services/signin'
import sleep from '../utils/sleep'
import { Navigate, useNavigate } from 'react-router-dom'

let images = [
    AgencyImage, DocumentsImage, PieChartImage, PresentationImage, 
    Team1Image, Team2Image, Team3Image, Team4Image
]

export default function LoginPage() {

    let navigate = useNavigate()

    let [isLoading, setIsLoading] = useState(false)

    let [image] = useState(images[Math.floor(Math.random() * images.length)])

    let [auth, setAuth] = useAuthStateContext()
    let [error, setError] = useState(null)

    let username = useRef(null)
    let password = useRef(null)

    async function login() {
        setIsLoading(() => true)
        setError(null)
        let res = await signin(
            username.current.value, 
            password.current.value
        )
        console.log(res.status)

        await sleep(1000)

        if (res.status === 200) {
            let json = await res.json()
            setAuth(json.accessToken)
        } else if (res.status === 400) {
            let json = await res.json()
            setError(json.error)
        } else {
            setError("Unable to signin")
        }
        setIsLoading(() => false)
    }

    if (auth) return <Navigate to='/'/>

    return (
        <>
        <div className="flex h-screen p-[20px] gap-[20px]">
            <div className="
            grow h-full basis-0
            flex items-center justify-end  
            rounded-[14px] 
            bg-gradient-to-r from-primary-50 to-transparent
            ">
                <img 
                    className="block my-auto"
                    src={image}
                />
            </div>

            <div className="flex grow basis-0">
                <form 
                    className="flex flex-col gap-[20px] m-auto p-[20px] w-[375px]"
                    onSubmit={(e) => {
                        e.preventDefault()
                        login()
                    }}>
                    <header className="text-hl font-hl">HRMS</header>
                    <TextField 
                        ref={username}
                        name="username"
                        title="Username"
                        required
                        placeholder={"eg. john-doe"}
                        leftImageSrc={UserSVG}
                    />
                    <TextField 
                        ref={password}
                        name="password"
                        title="Password"
                        required
                        placeholder={"eg. super#john"}
                        secureTextEntry
                        leftImageSrc={LockSVG}
                    />
                    { error && <p className="
                    p-[10px] bg-danger-50 border rounded-[4px] border-danger-500
                    text-danger-500 text-bs
                    ">{error}</p>}
                    {!isLoading && <button 
                        className="
                        font-bs text-bs 
                        text-white bg-primary-500
                        hover:bg-primary-600
                        focus:bg-primary-700
                        rounded-[4px] 
                        px-[16px] py-[10px]"
                    >Sign In</button>}
                    {isLoading && <ActivityIndicator className="grow"/>}
                    <p className="text-center font-ll text-ll">
                        By signing in, you agree to terms and policy.
                    </p>
                </form>
            </div>
        </div>
        </>
    )
}