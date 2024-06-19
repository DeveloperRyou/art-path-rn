import RoundButton from "@/components/button/RoundButton";
import PathList from "@/components/screen/PathList";
import Profile from "@/components/screen/Profile";
import { useRouter } from "expo-router";

export default function Home() {
  const { push } = useRouter();
  return (
    <>
      <Profile />
      <PathList />
      <RoundButton text="next" onPress={() => push("/main/modal")} />
    </>
  );
}
