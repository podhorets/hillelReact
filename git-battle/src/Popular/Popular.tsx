import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepositoriesByLanguage, fetchRepositoriesByName } from "../api";
import {
  filterReposAction,
  getReposFailureAction,
  getReposLoadingAction,
  getReposSuccessAction,
} from "../state/popular/popular.actions";
import { PopularState } from "../state/popular/popular.reducer";
import { Languages } from "./Languages";
import { Repos } from "./Repos";

export const Popular = () => {
  const dispatch = useDispatch();
  const repos = useSelector(
    (state: { popularReducer: PopularState }) => state.popularReducer.repos
  );
  const selectedLanguage = useSelector(
    (state: { popularReducer: PopularState }) =>
      state.popularReducer.selectedLanguage
  );

  const loadAllRepos = async () => {
    dispatch(getReposLoadingAction());

    await fetchRepositoriesByLanguage(selectedLanguage)
      .then((data) => dispatch(getReposSuccessAction(data.items)))
      .catch((error) => dispatch(getReposFailureAction(error.message)));
  };

  const handleSearch = debounce(async (name) => {
    if (name) {
      dispatch(getReposLoadingAction());

      await fetchRepositoriesByName(name)
        .then((data) => dispatch(getReposSuccessAction(data)))
        .catch((error) => dispatch(getReposFailureAction(error.message)));
    } else {
      loadAllRepos();
    }
  }, 400);

  const handleFilter = debounce(async (filterInput: string) => {
    if (filterInput) {
      dispatch(
        filterReposAction(
          repos.filter((repo) =>
            repo.name.toLowerCase().includes(filterInput.toLowerCase())
          )
        )
      );
    } else {
      loadAllRepos();
    }
  }, 400);

  return (
    <div>
      <div className="p-2 flex flex-row">
        <input
          type="text"
          className="pl-1 italic border rounded"
          placeholder="search repo"
          onChange={(event) => {
            handleSearch(event.target.value);
          }}
        />
        <input
          type="name"
          className="ml-10 pl-1 italic border rounded"
          placeholder="filter repo"
          onChange={(event) => {
            handleFilter(event.target.value);
          }}
        />
      </div>
      <Languages />
      <Repos />
    </div>
  );
};
