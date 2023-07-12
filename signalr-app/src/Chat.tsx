import React, { useEffect, useReducer, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import * as signalR from '@microsoft/signalr';

export const Chat = () => {
    const [connection, setConnection] = useState<signalR.HubConnection>();
    const [messages, setMessages] = useState<string>('');
    const nameRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const onReceiveMessage = (user: string, message: string) => {
            console.log(user);
            console.log(message);
            setMessages((prev) => prev + `${user}: ${message}\n`);
        };

        const startSignalRConnection = async () => {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl('https://localhost:7026/chathub')
                .withAutomaticReconnect()
                .build();

            try {
                await connection.start();
                setConnection(connection);

                connection.on('ReceiveMessage', onReceiveMessage);
                console.log('SignalR Connected.  fff');
            } catch (error) {
                console.log('SignalR Connection Error: ', error);
            }
        };

        startSignalRConnection();
    }, []);

    const handleClick = async () => {
        const user = nameRef.current?.value;
        const message = messageRef.current?.value;
        connection?.invoke('SendMessage', user, message);
        messageRef!.current!.value = '';
        // axios
        //     .post('/https://localhost:7026/chathub', {
        //         firstName: 'Fred',
        //         lastName: 'Flintstone',
        //     })
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    };

    return (
        <div className='Chat'>
            Chat
            <textarea rows={20} cols={100} value={messages} readOnly></textarea>
            <br />
            Name: <input type='text' ref={nameRef} /> <br />
            Message: <input type='message' ref={messageRef} /> <br />
            <button onClick={handleClick}>Send</button>
        </div>
    );
};
