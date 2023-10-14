import React from "react";
import AdminMenu from "./AdminMenu";
import UserMenu from "./UserMenu";
import { useAuth } from "../../context/auth";

const UserProfile = () => {
  const [auth] = useAuth();
  return (
    <div className="flex flex-col items-center pb-10 pt-10">
      <img
        className="w-24 h-24 mb-3 rounded-full shadow-lg bg-cover"
        src="https://lh3.googleusercontent.com/a/ACg8ocIE190z0-O3FGhbvddiCZX52vQpoZFgFLb3th68-wbxCTw=s360-c-no"
        alt="Bonnie image"
      />
      <h5 className="mb-1 text-3xl font-extrabold text-[var(--black-color)] text capitalize">
        {auth.user.name}
      </h5>
      <span className="text-sm  text-gray-400">{auth.user.email}</span>
      <span className="text-sm  text-gray-400">{auth.user.phone}</span>
      <div className="flex mt-4 space-x-3 md:mt-6">
        {auth.user.role == 1 ? <AdminMenu /> : <UserMenu />}
      </div>
    </div>
  );
};

export default UserProfile;
