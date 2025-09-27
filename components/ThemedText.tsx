import { Text as DefaultText, TextProps as DefaultTextProps } from 'react-native';
import { useThemeColor } from './Themed';

type TextProps = DefaultTextProps & {
  lightColor?: string;
  darkColor?: string;
};

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}
