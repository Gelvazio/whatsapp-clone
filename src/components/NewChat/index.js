import React, { useEffect, useState } from 'react'
import './newchat.css'

import Api from '../../conexao/Api'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const NewChat = ({ user, chatlist, show, setshow }) => {
    const [list, setList] = useState([])

    useEffect(() => {
        const getList = async () => {
            if (user !== null) {
                let results = await Api.getContatList(user.id)
                setList(results)
            }
        }
        getList()
    }, [user])

    const handleAddNewChat = async (user2) => {
        await Api.addNewChat(user, user2)
        handleClose()
    }

    const handleClose = () => {
        setshow(false)
    }

    return (
        <div
            className="newchat"
            style={{ left: show ? 0 : -415 }}
        >

            <div className="newchat--head">
                <div className="newchat--backbutton">
                    <ArrowBackIcon
                        style={{ color: '#FFF' }}
                        onClick={handleClose}
                    />
                </div>
                <div className="newchat--headtitle">
                    Nova Conversa
                </div>
            </div>

            <div className="newchat--list">
                {list.map((item, key) => (
                    <div
                        key={key}
                        className="newchat--item"
                        onClick={() => handleAddNewChat(item)}
                    >
                        <img
                            className="newchat--itemavatar"
                            src={item.avatar}
                            alt=""
                        />
                        <div className="newchat--itemnane">
                            {item.name}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default NewChat
