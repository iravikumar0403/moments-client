export const Avatar = ({ profile, name }) => {
  return (
    <img
      className="w-12 rounded-full"
      src={profile || "http://www.gravatar.com/avatar/?d=mp"}
      alt={name}
    />
  );
};
