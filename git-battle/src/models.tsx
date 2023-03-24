export interface Repository {
  id: string;
  owner: Owner;
  html_url: string;
  stargazers_count: number;
  name: string;
}

export interface Profile {
  followers: number;
  following: string;
  login: string;
  name: string;
  blog: string;
  location: string;
  public_repos: string;
  public_gists: string;
}

export interface Owner {
  avatar_url: string;
  login: string;
}

export interface UserScore {
  userProfile: Profile;
  score: number;
}
