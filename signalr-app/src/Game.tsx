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
        <div className='Game'>
            <div>
                <input type='text' ref={ref} />
                <button onClick={connect} disabled={!!connection}>
                    Connect
                </button>
                <button onClick={disconnect} disabled={!connection}>
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
