import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RoutePath } from "../RoutePath";
import {
  handleResetAction,
  handleSubmitAction,
} from "../state/battle/battle.actions";
import { PlayerState } from "../state/battle/battle.reducer";
import { PlayerInput } from "./PlayerInput";
import { PlayerPreview } from "./PlayerPreview";

export interface Player {
  username: string;
  avatar: string;
}

export const Battle = () => {
  const dispatch = useDispatch();

  const players = useSelector(
    (state: { battleReducer: PlayerState }) => state.battleReducer.players
  );

  const handleSubmit = (index: number, username: string) => {
    dispatch(handleSubmitAction({ index, username }));
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
                onClick={() => dispatch(handleResetAction(index))}
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
          }}
          state={players.map((player) => player.username)}
          className="button  text-center ml-40"
        >
          Battle
        </Link>
      )}
    </>
  );
};
