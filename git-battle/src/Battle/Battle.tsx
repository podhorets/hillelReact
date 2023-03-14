import { useState } from "react";
import { Link } from "react-router-dom";
import { RoutePath } from "../RoutePath";
import { PlayerInput } from "./PlayerInput";
import { PlayerPreview } from "./PlayerPreview";

export interface Player {
  username: string;
  avatar: string;
}

export const Battle = () => {
  const [players, setPlayers] = useState<Player[]>([
    { username: "", avatar: "" },
    { username: "", avatar: "" },
  ]);

  const handleSubmit = (index: number, username: string) => {
    const playersToUpdate = [...players];
    playersToUpdate[index].username = username;
    playersToUpdate[
      index
    ].avatar = `https://github.com/${username}.png?size=200`;
    setPlayers(playersToUpdate);
  };

  const handleReset = (index: number) => {
    const playersToUpdate = [...players];
    playersToUpdate[index].username = "";
    playersToUpdate[index].avatar = "";
    setPlayers(playersToUpdate);
  };

  return (
    <>
      <section className="flex flex-row gap-52">
        {players.map((player, index) =>
          player.avatar ? (
            <div className="text-center" key={index}>
              <PlayerPreview
                avatar={players[index].avatar}
                username={players[index].username}
              />
              <button
                className="pt-3 text-sm text-[#d0021b]"
                onClick={() => handleReset(index)}
              >
                Reset
              </button>
            </div>
          ) : (
            <PlayerInput key={index} index={index} onSubmit={handleSubmit} />
          )
        )}
      </section>
      {players.every((player) => player.username) && (
        <Link
          to={{
            pathname: `/${RoutePath.Battle}/${RoutePath.Results}`,
            search: `?players=${players
              .map((player) => player.username)
              .join("/")}`,
          }}
          className="button  text-center ml-40"
        >
          Battle
        </Link>
      )}
    </>
  );
};
