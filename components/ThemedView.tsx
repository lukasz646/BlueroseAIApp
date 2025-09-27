// components/ThemedView.tsx
import { View as DefaultView } from 'react-native';
import { useThemeColor } from './Themed';

export function View(props: React.ComponentProps<typeof DefaultView>) {
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <DefaultView
      {...props}
      style={[{ backgroundColor }, props.style]}
    />
  );
}
