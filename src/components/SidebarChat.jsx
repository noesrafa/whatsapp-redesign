import React, { useEffect, useState } from 'react'
import './sidebarchat.css'
import { faker } from '@faker-js/faker'
import db from '../../firebase'
import { Link } from 'react-router-dom'

export default function SidebarChat ({ addNewChat, id, name }) {
    const randomAvatar = faker.image.people(40, 40, true)
    const [ lastMessage, setLastMessage ] = useState('')

    function handlerNewChat () {
        const chatIdentifier = prompt('Enter the chat id')

        if(chatIdentifier) {
            // Use this for create new document in rooms
            db.collection('rooms').add({
                name: chatIdentifier
            })
        }
    }

    // Effect for last message
    useEffect(() => {
            
            if (id) {
                db.collection('rooms')
                    .doc(id)
                    .collection('messages')
                    .orderBy('lastseen', 'asc')
                    .onSnapshot( snapshot => {
                        setLastMessage( snapshot.docs.map( message => 
                            message.data()
                        ))
                    })
            }
    }, [])

    
    return !addNewChat ? (
        <Link to={`/${id}`}>
            <div className="sidebarchat">
                <img 
                    src={randomAvatar} 
                    alt="avatar"/>
                <div className="sidebarchat__info">
                    {/* === ROOM NAME === */}
                    <h3>{name}</h3>
                    <p>{lastMessage[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div 
            onClick={handlerNewChat}
            className="sidebarchat new-button">
                <div className="new-button__container">
                    <box-icon name='message-square-add' color={'#00A884'}></box-icon>
                    <h2>Add new chat</h2>
                </div>
        </div>
    )
}