import { Repository } from "../RepositoryModel";

export interface ReposProps {
  repos: Repository[];
}

export const Repos = ({ repos }: ReposProps) => {
  return (
    <ul className="flex flex-wrap justify-around">
      {repos?.map((repo, index) => (
        <li key={repo.id} className="m-5 text-center">
          <div className="m-2.5 text-xl">#{index + 1}</div>
          <ul className="mb-2">
            <li>
              <img
                src={repo.owner.avatar_url}
                alt="Avatar"
                className="w-36 rounded-full"
              />
            </li>
            <li style={{ maxWidth: "144px" }}>
              <a href={repo.html_url}>{repo.name}</a>
            </li>
            <li>@{repo.owner.login}</li>
            <li>{repo.stargazers_count}</li>
          </ul>
        </li>
      ))}
    </ul>
  );
};
