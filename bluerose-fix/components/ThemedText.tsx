// components/ThemedText.tsx
import { Text as DefaultText } from "react-native";
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
