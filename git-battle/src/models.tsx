export interface Repository {
  id: string;
  owner: Owner;
  html_url: string;
  stargazers_count: number;
  name: string;
}

export interface Profile {
  followers: number;
}

export interface Owner {
  avatar_url: string;
  login: string;
}

export interface UserScore {
  userProfile: Profile;
  score: number;
}
