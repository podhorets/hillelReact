import { Repository } from "../../models";
import { POPULAR } from "./popular.constants"

export const setLanguageAction = (payload: string) => ({
    type: POPULAR.SET_LANGUAGE,
    payload
});

export const filterReposAction = (payload: Repository[]) => ({
    type: POPULAR.FILTER_REPOS,
    payload
});


export const getReposSuccessAction = (payload: Repository[]) => ({
    type: POPULAR.GET_REPOS_SUCCESS,
    payload
});

export const getReposLoadingAction = () => ({
    type: POPULAR.GET_REPOS_LOADING
});

export const getReposFailureAction = (payload: any) => ({
    type: POPULAR.GET_REPOS_FAILURE,
    payload
});
