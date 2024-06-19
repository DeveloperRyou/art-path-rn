import { Stack } from "expo-router";
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#fff",
          },
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          contentStyle: {
            backgroundColor: "#fff",
          },
        }}
      />
    </Stack>
  );
}
