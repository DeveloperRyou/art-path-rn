import api from "@/apis/network";

function getUser(id: string) {
  return api.get(`/users/${id}`);
}

interface User {
  id: string;
  username: string;
  profile_image: string;
}

function postUser(user: User) {
  return api.post(`/users`, {
    user,
  });
}

export { getUser, postUser };
