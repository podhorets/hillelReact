import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchRepositoriesByLanguage, fetchRepositoriesByName } from "../api";
import { Repository } from "../models";
import { Languages } from "./Languages";
import { Repos } from "./Repos";

const languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];

export const Popular = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [filterInput, setFilterInput] = useState("");
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedLanguage = searchParams.get("language") ?? "All";

  useEffect(() => {
    if (!selectedLanguage || !languages.includes(selectedLanguage)) {
      setSearchParams({ language: "All" });
    }
  }, []);

  useEffect(() => {
    setLoading(true);

    fetchRepositoriesByLanguage(selectedLanguage)
      .then((data) => setRepos(data.items))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [selectedLanguage]);

  const showContent = () => {
    if (loading) {
      return <p className="pt-3 text-center">Loading ...</p>;
    }

    if (error) {
      return <p className="pt-3 text-center font-bold text-red-600">{error}</p>;
    }

    return repos.length ? (
      <Repos repos={filterInput ? filteredRepos : repos} />
    ) : null;
  };

  const handleSearch = debounce(async (name) => {
    if (name) {
      setRepos(await fetchRepositoriesByName(name));
    } else {
      fetchRepositoriesByLanguage(selectedLanguage)
        .then((data) => setRepos(data.items))
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));
    }
  }, 400);

  const handleFilter = debounce(async (filterInput: string) => {
    setFilteredRepos(
      repos.filter((repo) =>
        repo.name.toLowerCase().includes(filterInput.toLowerCase())
      )
    );
    setFilterInput(filterInput);
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
      <Languages
        setSearchParams={setSearchParams}
        languages={languages}
        selectedLanguage={selectedLanguage}
      />
      {showContent()}
    </div>
  );
};
