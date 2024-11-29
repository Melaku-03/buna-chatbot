import React, { useContext, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { Context } from '../context/Context'
import axios from '../config/axios';


export default function Chat() {
  const { id } = useParams();
  const { body, setBody, setIsNewChat, setChatToBeUpdateId, displayText, FormatText, setDisplayText } = useContext(Context);


  const fetchChat = async (id) => {
    try {
      await axios.post('/chat/chat', { id })
        .then(res => {
          setIsNewChat(false);  // change to update
          setBody(res.data.message.body); // update chat body text
          setDisplayText("");
          FormatText(res.data.message.body) // pass body text serves's  content
          setChatToBeUpdateId(res.data.message._id);  // update chat's Id to be updated
        })
    } catch (error) {
      console.log(error?.response?.data?.message || error.message); // if any error in fetching chats from server
    }
  }
  useEffect(() => {
    fetchChat(id);
  }, [id, body]);

  return (
    <div dangerouslySetInnerHTML={{ __html: displayText }}></div>
  )
}
