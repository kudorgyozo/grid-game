import { useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { GameTable } from './GameTable';
import { PieceInfo } from './utils';
import { GamePiece } from './GamePiece';
import { useImmer } from 'use-immer';

export type GameState = {
    pieces?: PieceInfo[];
};

export const Game = () => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>();
    const [gameState, setGameState] = useImmer<GameState>({});
    //const [playerName, setPlayerName] = useState<string>();
    const ref = useRef<HTMLInputElement>(null);

    const connect = async () => {
        try {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl('https://localhost:7026/gamehub')
                .withAutomaticReconnect()
                //.AddNewtonsoftJsonProtocol()
                .build();

            await connection.start();
            setConnection(connection);

            const playerName = ref.current?.value;
            //setPlayerName(playerName);
            const response: GameState = await connection.invoke('AddPlayer', playerName);
            setGameState(response);

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
        <div>
            <div className='inline-grid grid-cols-game grid-rows-game gap-game'>
                <div className=''></div>
                <div className=''></div>
            </div>
            <div>
                <input type='text' ref={ref} />
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={connect}
                    disabled={!!connection}
                >
                    Connect
                </button>
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={disconnect}
                    disabled={!connection}
                >
                    Disconnect
                </button>
                <div>
                    {gameState?.pieces?.map((piece) => (
                        <GamePiece piece={piece} onRotate={() => null} />
                    ))}
                    <GameTable onDrop={() => null} pieces={gameState?.pieces} />
                </div>
            </div>
        </div>
    );
};
