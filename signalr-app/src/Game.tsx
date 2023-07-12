import { useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';

export const Game = () => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>();
    const [gameState, setGameState] = useState<Record<string, string>>();
    const ref = useRef<HTMLInputElement>(null);

    // useEffect(() => {
    //     const getState = (state: any) => {
    //         setGameState(state);
    //     };

    //     const startSignalRConnection = async () => {
    //         const connection = new signalR.HubConnectionBuilder()
    //             .withUrl('https://localhost:7026/gamehub')
    //             .withAutomaticReconnect()
    //             .build();

    //         try {
    //             await connection.start();
    //             setConnection(connection);
    //             console.log('SignalR Connected.', connection.connectionId);
    //         } catch (error) {
    //             console.log('SignalR Connection Error: ', error);
    //         }
    //     };

    //     startSignalRConnection();
    // }, []);

    const connect = async () => {
        try {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl('https://localhost:7026/gamehub')
                .withAutomaticReconnect()
                .build();

            await connection.start();
            setConnection(connection);

            console.log('SignalR Connected.', connection.connectionId);
        } catch (error) {
            console.log('SignalR Connection Error: ', error);
        }
    };

    const initGame = async () => {};

    const disconnect = async () => {
        const id = connection?.connectionId;
        await connection?.stop();
        console.log('SignalR Disconnected.', id);
        setConnection(null);
    };

    return (
        <div className='Game'>
            <div>
                <code>{JSON.stringify(gameState)}</code>
            </div>
            <div>
                <input type='text' ref={ref} />
                <button onClick={connect} disabled={!!connection}>
                    Connect
                </button>
                <button onClick={disconnect} disabled={!connection}>
                    Disconnect
                </button>
                <div></div>
            </div>
        </div>
    );
};
