import axios from "axios"

export const fetchRepositoriesByLanguage = async (language: string) => {
    const response = await axios.get(window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`));
    return response.data;
}
export const fetchRepositoriesByName = async (name: string) => {
    const response = await axios.get(window.encodeURI(`https://api.github.com/search/repositories?q=${name}+in:name&sort=stars&order=desc&type=Repositories`));
    return response.data.items;
}
