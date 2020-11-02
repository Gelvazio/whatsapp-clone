import React, { useState, useEffect } from 'react'
import './App.css'

import Api from './conexao/Api'

import ChatListItem from './components/ChatListItem/ChatListItem'
import ChatIntro from './components/ChatIntro/ChatIntro'
import ChatWindow from './components/ChatWindow/ChatWindow'
import NewChat from './components/NewChat'
import Login from './pages/Login'

import SearchIcon from '@material-ui/icons/Search'
import DeleteIcon from '@material-ui/icons/Delete'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'

export default () => {
    const [showNewChat, setShowNewChat] = useState(false)
    const [activeChat, setActiveChat] = useState({})
    const [user, setUser] = useState(null)
    const [chatlist, setChatlist] = useState([])

    useEffect(() => {
        if (user !== null) {
            let unsub = Api.onChatList(user.id, setChatlist)
            return unsub
        }
    }, [user])

    const handleLoginData = async (u) => {
        let newUser = {
            id: u.uid,
            name: u.displayName,
            avatar: u.photoURL,
            email: u.email,
        }
        await Api.addUser(newUser)
        setUser(newUser)
    }

    if (user === null) {
        return (
            <Login
                onReceive={handleLoginData}
            />
        )
    }

    const handleNewChat = () => {
        setShowNewChat(true)
    }

    return (
        <div className="app-window">

            <div className="sidebar">
                <NewChat
                    chatlist={chatlist}
                    user={user}
                    show={showNewChat}
                    setshow={setShowNewChat}
                />
                <header>
                    <img
                        className="header--avatar"
                        src={user.avatar}
                        alt={user.name} />
                    <div className="header--buttons">
                        <div className="header--btn">
                            <DonutLargeIcon style={{ color: '#919191' }} />
                        </div>
                        <div className="header--btn">
                            <ChatIcon
                                style={{ color: '#919191' }}
                                onClick={handleNewChat}
                            />
                        </div>
                        <div className="header--btn">
                            <MoreVertIcon style={{ color: '#919191' }} />
                        </div>
                    </div>
                </header>

                <div className="search">
                    <div className="search--input">
                        <SearchIcon fontSize="default" style={{ color: '#919191' }} />
                        <input type="search" placeholder="Procurar ou iniciar uma nova conversa" />
                        <DeleteIcon fontSize="small" cursor="pointer" style={{ color: '#919191' }} />
                    </div>
                </div>

                <div className="chatlist">
                    {chatlist.map((item, key) => (
                        <ChatListItem
                            key={key}
                            data={item}
                            active={activeChat.chatId === chatlist[key].chatId}
                            onClick={() => setActiveChat(chatlist[key])}
                        />
                    ))}
                </div>

            </div>

            <div className="contentearea">

                {activeChat.chatId !== undefined &&
                    <ChatWindow
                        user={user}
                        data={activeChat}
                    />
                }

                {activeChat.chatId === undefined &&
                    <ChatIntro />
                }

            </div>

        </div>
    )
}
