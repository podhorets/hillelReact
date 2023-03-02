export interface Repository {
  id: string;
  owner: Owner;
  html_url: string;
  stargazers_count: string;
  name: string;
}

export interface Owner {
  avatar_url: string;
  login: string;
}
