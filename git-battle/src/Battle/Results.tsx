import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { battle } from "../api";
import { UserScore } from "../models";
import { RoutePath } from "../RoutePath";

export const Results = () => {
  const [playersData, setPlayersData] = useState<UserScore[]>();

  const playerNames = useLocation().state;

  useEffect(() => {
    async function fetchBattleResult() {
      if (playerNames) {
        const battleResult = await battle(playerNames);
        setPlayersData(battleResult);
      }
    }

    fetchBattleResult();
  }, []);

  if (!playersData) {
    return null;
  }

  const highestScore = Math.max(...playersData.map((profile) => profile.score));

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {playersData.map((playerData, index) => (
          <div
            key={index}
            className={`bg-gray-100 rounded-lg p-8 ${
              playerData.score === highestScore &&
              "border-[#d0021b] border-opacity-50 border-4"
            }`}
          >
            <h2 className="text-lg font-bold mb-4">
              {playerData.userProfile.login}
              {playerData.score === highestScore && (
                <span className="text-green-500"> is Winner</span>
              )}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">Score:</h3>
                <p>{playerData.score}</p>
              </div>
              <div>
                <h3 className="font-bold">Name:</h3>
                <p>{playerData.userProfile.name}</p>
              </div>
              <div>
                <h3 className="font-bold">Followers:</h3>
                <p>{playerData.userProfile.followers}</p>
              </div>
              <div>
                <h3 className="font-bold">Following:</h3>
                <p>{playerData.userProfile.following}</p>
              </div>
              <div>
                <h3 className="font-bold">Public Repos:</h3>
                <p>{playerData.userProfile.public_repos}</p>
              </div>
              <div>
                <h3 className="font-bold">Public Gists:</h3>
                <p>{playerData.userProfile.public_gists}</p>
              </div>
              <div>
                <h3 className="font-bold">Blog:</h3>
                <p>{playerData.userProfile.blog || "-"}</p>
              </div>
              <div>
                <h3 className="font-bold">Location:</h3>
                <p>{playerData.userProfile.location || "-"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Link
          to={{
            pathname: `/${RoutePath.Battle}`,
          }}
          className="button  text-center"
        >
          Battle again
        </Link>
      </div>
    </>
  );
};

export default Results;
