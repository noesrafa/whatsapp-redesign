import React, { useState } from 'react'
import './app.css'
import Chat from './components/Chat'
import Sidebar from './components/Sidebar'
// Router dom
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './login'
// Redux
import { useSelector } from 'react-redux'

function App () {
    // const [user, setUser] = useState(null)

    let user = useSelector( state => state.sign_reducer.user)
    
    return (
        <div className='app'>

            <div className="colorbg"></div>

            {user === '' ? (
                <Login/>
            ) : (
            <div className="app__body">
                <BrowserRouter>
                <Sidebar/>
                    <Routes>
                        <Route path ='/:identifier' element={<Chat />} />
                        <Route path ='/' element={<Chat />} />
                    </Routes>
                </BrowserRouter>
            </div>
            )}
            
        </div>
    )
}

export default App