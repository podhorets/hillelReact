import { BATTLE } from "./battle.constants"

export interface PlayerSubmit {
    username: string,
    index: number
}

export const handleSubmitAction = (payload: PlayerSubmit) => ({
    type: BATTLE.HANDLE_SUBMIT,
    payload
});

export const handleResetAction = (payload: number) => ({
    type: BATTLE.HANDLE_RESET,
    payload
});

