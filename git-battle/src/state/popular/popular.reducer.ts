import { AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { Repository } from "../../models";
import { POPULAR } from "./popular.constants";

export interface PopularState {
    selectedLanguage: string;
    repos: Repository[];
    error: any;
    loading: boolean;
}

const initialState: PopularState = {
    selectedLanguage: 'All',
    repos: [],
    loading: false,
    error: null
};

export const popularReducer = (state = initialState, action: AnyAction) => {    
    switch (action.type) {
        case POPULAR.SET_LANGUAGE:            
            return {
                ...state,
                selectedLanguage: action.payload
            };
        case POPULAR.FILTER_REPOS:            
            return {
                ...state,
                repos: action.payload
            };    
        case POPULAR.GET_REPOS_SUCCESS:            
            return {
                ...state,
                loading: false,
                repos: action.payload
            };
        case POPULAR.GET_REPOS_LOADING:            
            return {
                ...state,
                loading: true,
                error: null
            };
        case POPULAR.GET_REPOS_FAILURE:            
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default: 
            return state;
    }
}