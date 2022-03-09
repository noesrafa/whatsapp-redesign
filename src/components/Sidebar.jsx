import React, { useEffect, useState } from 'react'
import './sidebar.css'
import 'boxicons'
import SidebarChat from './SidebarChat'
import db from '../../firebase'
// Redux
import { useSelector } from 'react-redux'

export default function Sidebar () {
    const color = '#54656F'
    // States
    // Instantiate as array for insert the rooms here
    const [ theRooms, setTheRooms ] = useState([])

    // Store
    const user = useSelector( state => state.sign_reducer.user)

    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot => (
            setTheRooms(snapshot.docs.map (document => 
                ({
                    id: document.id,
                    data: document.data()
                })
            ))
        ))
    }, [])

    return (
        <div className='sidebar'>
            {/* === PROFILE === */}
            <div className="sidebar__profile">
                <div className="profile__left">
                    {/* AVATAR IMAGE */}
                    {/* <img src="/static/avatar.png" alt="avatar" className='noselect'/> */}
                    <img src={user?.photoURL} alt="avatar" className='noselect'/>
                    <p className='noselect'>BETA</p>
                </div>
                <div className="profile__right">
                    <div className='button'>
                        <box-icon name='shape-circle'color={color}></box-icon>
                    </div>
                    <div className='button'>
                        <box-icon name='message-square-dots' color={color}></box-icon>
                    </div>
                    <div className='button'>
                        <span><box-icon name='dots-vertical-rounded'color={color} ></box-icon></span>
                    </div>
                </div>
            </div>

            {/* === SEARCH === */}
            <div className="sidebar__search">
                <div className="search">
                    <div className="search__button">
                        <box-icon name='search'color={color} ></box-icon>
                    </div>
                    <input type="text" placeholder='Search or start new chat'/>
                </div>
            </div>

            {/* === CHATS === */}
            <div className="sidebar__chats">
                    <SidebarChat addNewChat={true}/>
                    {theRooms.map(room => (
                        <SidebarChat 
                            key={room.id}
                            id={room.id}
                            name={room.data.name}/>
                    ))}
            </div>
        </div>
    )
}