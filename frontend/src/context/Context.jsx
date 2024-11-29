import React, { createContext, useEffect, useState } from "react";
import axios from "../config/axios";
import model from "../config/gemini_api";

export const Context = createContext();
const ContextProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // controls sidebar for small screen size
    const [isNewChat, setIsNewChat] = useState(true);  // controls creating new chat or update chat
    const [chats, setChats] = useState([]);  // recent chats

    const [chatToBeUpdateId, setChatToBeUpdateId] = useState("");  // chat's Id to be updated
    const [prompt, setPrompt] = useState("");  // chat title
    const [body, setBody] = useState("");  // chat body
    let [displayText, setDisplayText] = useState("");

    // toggle sidebar handler for small screen size
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // update prompt (title) while user typing
    const promptChangeHandler = (e) => setPrompt(e.target.value);

    // get all recently chats
    const fetchChats = async () => {
        try {
            await axios.get('/chat/chats')
                .then(res => {
                    setChats(res.data.message);  // update chats
                });
        } catch (error) {
            console.log(error?.response?.data?.message || error.message);  // if any error in fetching chats from server
        }
    }

    // create new chat handler
    const createNewChat = async (title, body) => {
        try {
            await axios.post('/chat/new-chat', { title, body })
                .then(res => {
                    console.log(res.data);
                });
        } catch (error) {
            console.log(error?.response?.data?.message || error.message);
        }
    };

    // update chat handler
    const updateChat = async (id, body) => {
        try {
            await axios.patch('/chat/update-chat', { id, body })
                .then(res => {
                    console.log(res.data);
                });

        } catch (error) {
            console.log(error?.response?.data?.message || error.message);
        }
    };


    // text Animation and format
    const textTypingSpeed = (idx, nextWord) => {
        setTimeout(function () {
            setDisplayText(prev => prev + nextWord);
        }, 1 * idx)
    }

    const FormatText = (bodyText) => {
        const boldText = bodyText.split("**");
        let formattedText = "";
        for (let i = 0; i < boldText.length; i++) {
            if (i === 0 || i % 2 !== 1) formattedText += boldText[i];
            else formattedText += `<b>${boldText[i]} </b>`
        }
        formattedText = formattedText.split('*').join('<br/>');
        const textTypeDelay = formattedText.split(" ");
        for (let i = 0; i < textTypeDelay.length; i++) {
            textTypingSpeed(i, textTypeDelay[i] + " ");
        }

    }
    // ask gemini to generate content
    const run = async (e, prompt, id) => {
        e.preventDefault();
        const title = prompt.trim(); // clear whitespaces;
        try {
            if (title.length) {
                await model.generateContent(title)
                    .then(res => {
                        console.log(res.response.text());
                        // create or update chat 
                        isNewChat ? createNewChat(title, res.response.text()) : updateChat(id, res.response.text());
                        setBody(res.response.text())  // update chat body text
                        setDisplayText("");
                        FormatText(res.response.text());  // pass body text gemini's generated content
                        setPrompt("");  // clear input 
                        setIsNewChat(false);
                    });
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    const value = { isSidebarOpen, toggleSidebar, setIsSidebarOpen, fetchChats, chats, run, prompt, promptChangeHandler, body, setBody, displayText, setDisplayText, FormatText, setIsNewChat, chatToBeUpdateId, setChatToBeUpdateId }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;
