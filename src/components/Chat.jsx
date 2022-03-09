import React, { useEffect, useState } from 'react'
import './chat.css'
import faker from '@faker-js/faker'
import bg from '../../public/bg.png'
// Params
import { useParams } from 'react-router-dom'
import db from '../../firebase'
// Redux
import { useSelector } from 'react-redux'
// firebase local
import firebase from 'firebase/compat/app'

export default function Chat () {

    const randomAvatar = faker.image.people(40, 40)
    const color = '#54656F'
    const user = useSelector( state => state.sign_reducer.user)

    // Params
    const { identifier } = useParams()

    // States //
    const [input, setInput] = useState('')
    const [roomName, setRoomName] = useState('')
    const [messages, setMessages] = useState([])

    // Effects
    useEffect(() => {
        // Si el identificador corresponde al nombre de el doc
        if (identifier) {
            db.collection('rooms')
                .doc(identifier)
                .onSnapshot(snapshot => 
                setRoomName(snapshot.data().name));

            db.collection('rooms')
                .doc(identifier)
                .collection('messages')
                .orderBy('lastseen', 'asc')
                .onSnapshot( snapshot => (
                    setMessages( snapshot.docs.map(doc => doc.data()) )
                    ))
                    
                }
    }, [identifier])
            
    // Functions //
    function sendMessage (e) {
        e.preventDefault()

        // Use this for send the message
        db.collection('rooms')
            .doc(identifier)
            .collection('messages')
            .add({
                lastseen: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                name: user.displayName
            })

        setInput('')
    }
    
    return (
        <div className="chat">

            {/* === HEADER === */}
            <div className="chat__header noselect">
                <div className="chat__header-left">
                    <img src={randomAvatar} alt="" />
                    <div className="chat__header-info">
                        <h3>{roomName}</h3>
                        <p> Last seen {' '}
                            {new Date(
                            messages[messages.length - 1]?.lastseen?.toDate()
                            ).toUTCString()}
                        </p>
                    </div>
                </div>
                <div className="chat__header-right">
                    <div className="button">
                        <box-icon name='search' color={color}></box-icon>
                    </div>
                    <div className="button">
                        <box-icon name='paperclip' rotate='270'color={color} ></box-icon>
                    </div>
                    <div className="button">
                        <box-icon name='dots-vertical-rounded'color={color} ></box-icon>
                    </div>
                </div>
            </div>

            {/* === BODY === */}
            <div className="chat__body">
                <div className="chat__back">
                    <img src={bg} alt="" />
                    <div className="chat__back-messages">

                        {/* MAP MESSAGES */}
                        { messages.map( message => (
                            <p  key={message.lastseen}
                                className={`message 
                                ${message.name === user.displayName && 'receiver'}`}>
                                {message.message}
                                <span className='message__name'>{message.name.split(' ')[0]}</span>
                            </p>
                        ))}

                    </div>
                </div>
            </div>
            {/* === INPUT === */}
            <div className="chat__input">
                <div className="button">
                    <box-icon name='face'color={color} ></box-icon>
                </div>
                <form>
                    
                    <input 
                        type="text" 
                        value={input} 
                        onChange={ e => setInput(e.target.value)}
                        placeholder='Type message'/>

                    <button onClick={sendMessage} type='submit' onChange={ e => setInput(e.target.value)}>Send a message</button>
                </form>
                <div className="button">
                    <box-icon name='microphone'color={color} ></box-icon>
                </div>
            </div>
        </div>
    )
}