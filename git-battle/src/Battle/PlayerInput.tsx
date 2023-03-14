import { useState } from "react";

export interface PlayerInputProps {
  index: number;
  onSubmit: (index: number, username: string) => void;
}

export const PlayerInput = ({ index, onSubmit }: PlayerInputProps) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(index, username);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl text-center">Player {index + 1}</h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <input
          id="username"
          className=" w-56 pl-1 border"
          placeholder="Github username"
          autoComplete="off"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="button" disabled={!username}>
          Submit
        </button>
      </form>
    </div>
  );
};
