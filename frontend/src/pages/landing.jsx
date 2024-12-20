import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div className='landingPageContainer'>
            <nav>
                <div className="navHeader">
                    <h2>Flux Video Call</h2>
                </div>
                <div className="navList">
                    <p>Join as Guest</p>
                    <p>Register</p>
                    <div role='button'>
                        <p>Login</p>
                    </div>
                </div>
            </nav>

            <div className="landingMainContainer">
                <div>
                    <h1><span style={{ color: "#ff9839" }}>Connect</span> with your loved Ones</h1>
                    <p>Cover a distance by Flux Video Call</p>
                    <div className="btn" role='button'>
                        <Link to={"/auth"}>Get  Started</Link>
                    </div>

                </div>
                <div className="">
                    <img src="/mobile.png" alt="" />
                </div>
            </div>
        </div>
    )
}
