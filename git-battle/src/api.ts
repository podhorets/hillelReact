import axios from "axios"
import { Repository, Profile, UserScore } from "./models";

export const fetchRepositoriesByLanguage = async (language: string) => {
    const response = await axios.get(window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`));
    return response.data;
}

export const fetchRepositoriesByName = async (name: string) => {
    const response = await axios.get(window.encodeURI(`https://api.github.com/search/repositories?q=${name}+in:name&sort=stars&order=desc&type=Repositories`));
    return response.data.items;
}

export const battle = async (players: string[]): Promise<UserScore[]> => {
    const userScores = await Promise.all(players.map(getUserScore));
    return sortUserScores(userScores);
}

const getUserScore = async (username: string): Promise<UserScore> => {
    const [profile, repositories] = await Promise.all([
        getProfile(username),
        getRepos(username)
    ]);
    return { userProfile: profile, score: calculateScore(profile.followers, repositories) };
}

const getRepos = async (username: string): Promise<Repository[]> => {
    const reponse = await axios.get(`https://api.github.com/users/${username}/repos`);
    return reponse.data;
} 

const getProfile = async (username: string): Promise<Profile> => {
    const reponse = await axios.get(`https://api.github.com/users/${username}`);
    return reponse.data;
}

const sortUserScores = (userScores: UserScore[]) => {
    return userScores.sort((a, b) => b.score - a.score);
}

const calculateScore = (followers: number, repos: Repository[]): number => {
    return (followers * 3) + getStarCount(repos);
}

const getStarCount = (repos: Repository[]) => {
    return repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
}
