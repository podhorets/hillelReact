export interface PlayerPreviewProps {
  avatar: string;
  username: string;
}

export const PlayerPreview = ({ avatar, username }: PlayerPreviewProps) => {
  return (
    <div>
      <img className="w-36 rounded-full" src={avatar} alt="Avatar" />
      <h2 className="pt-3 text-center text-xl font-bold">{username}</h2>
    </div>
  );
};
