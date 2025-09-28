import { Text as DefaultText, View as DefaultView } from "react-native";
import { useColorScheme } from "./useColorScheme";

export function Text(props: React.ComponentProps<typeof DefaultText>) {
  const colorScheme = useColorScheme();
  return (
    <DefaultText
      {...props}
      style={[
        { color: colorScheme === "dark" ? "white" : "black" },
        props.style,
      ]}
    />
  );
}

export function View(props: React.ComponentProps<typeof DefaultView>) {
  const colorScheme = useColorScheme();
  return (
    <DefaultView
      {...props}
      style={[
        { backgroundColor: colorScheme === "dark" ? "#000" : "#fff" },
        props.style,
      ]}
    />
  );
}
