import { AnyAction } from "@reduxjs/toolkit";
import { BATTLE } from "./battle.constants";

export interface Player {
    username: string;
    avatar: string;
}

export interface PlayerState {
    players: Player[]
}

const initialState: PlayerState = {
    players: [
        { username: "", avatar: "" },
        { username: "", avatar: "" },
    ]
};

const updatePlayer = (state: PlayerState, index: number, updates: Partial<Player>): PlayerState => {
    const updatedPlayers = [...state.players];
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      ...updates
    };
    return { ...state, players: updatedPlayers };
}

export const battleReducer = (state = initialState, action: AnyAction) => {    
    switch (action.type) {
        case BATTLE.HANDLE_SUBMIT:   
            const { index, username } = action.payload;
            return updatePlayer(state, index, {
              username,
              avatar: `https://github.com/${username}.png?size=200`
            });
        case BATTLE.HANDLE_RESET:            
            return updatePlayer(state, action.payload.index, { username: '', avatar: '' });
        default: 
            return state;
    }
}