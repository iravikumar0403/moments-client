export const Avatar = ({ profile, name, size }) => {
  return (
    <img
      className={`${size ? "w-32 h-32" : "h-12 w-12"} rounded-full`}
      src={profile || "http://www.gravatar.com/avatar/?d=mp"}
      alt={name}
    />
  );
};
