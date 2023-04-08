import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepositoriesByLanguage } from "../api";
import { Repository } from "../models";
import {
  getReposFailureAction,
  getReposLoadingAction,
  getReposSuccessAction,
} from "../state/popular/popular.actions";
import { PopularState } from "../state/popular/popular.reducer";

export const Repos = memo(() => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector(
    (state: { popularReducer: PopularState }) =>
      state.popularReducer.selectedLanguage
  );
  const loading = useSelector(
    (state: { popularReducer: PopularState }) => state.popularReducer.loading
  );
  const repos = useSelector(
    (state: { popularReducer: PopularState }) => state.popularReducer.repos
  );
  const error = useSelector(
    (state: { popularReducer: PopularState }) => state.popularReducer.error
  );

  useEffect(() => {
    dispatch(getReposLoadingAction());

    fetchRepositoriesByLanguage(selectedLanguage)
      .then((data) => dispatch(getReposSuccessAction(data.items)))
      .catch((error) => dispatch(getReposFailureAction(error.message)));
  }, [selectedLanguage]);

  if (loading) {
    return <p className="pt-3 text-center">Loading ...</p>;
  }

  if (error) {
    return <p className="pt-3 text-center font-bold text-red-600">{error}</p>;
  }

  return (
    <ul className="flex flex-wrap justify-around">
      {repos?.map((repo: Repository, index: number) => (
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
});
