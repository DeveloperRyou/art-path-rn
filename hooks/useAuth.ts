import { User } from "@react-native-google-signin/google-signin";
import { atom, useAtom } from "jotai";

const authAtom = atom<User | null>(null);

function useAuth() {
  const [auth, setAuth] = useAtom(authAtom);
  return {
    auth,
    setAuth,
  };
}

export { useAuth };
