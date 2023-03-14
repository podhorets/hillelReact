import { useEffect, useState } from "react";
import { battle } from "./api";
import { UserScore } from "./models";

export const Results = () => {
  const [playersData, setPlayersData] = useState<UserScore[]>();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const playerNames = queryParams.get("players")?.split("/");

    async function fetchBattleResult() {
      if (playerNames) {
        const battleResult = await battle(playerNames);
        console.log(battleResult);
        setPlayersData(battleResult);
      }
    }

    fetchBattleResult();
  }, []);

  if (!playersData) {
    return null;
  }

  return <div>Results</div>;
};

export default Results;
