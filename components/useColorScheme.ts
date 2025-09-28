import { useColorScheme as useNativeColorScheme } from "react-native";

export default function useColorScheme(): "light" | "dark" {
  return useNativeColorScheme() ?? "light";
}
