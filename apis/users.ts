import api from "@/apis/network";
interface User {
  id: string;
  username: string;
  profile_image: string;
}

async function getUser(id: string): Promise<User> {
  const res = await api.get<User>(`/users/${id}`);
  return res.data;
}

async function postUser(user: User): Promise<User> {
  const res = await api.post<User>(`/users`, user);
  return res.data;
}

export { getUser, postUser };
