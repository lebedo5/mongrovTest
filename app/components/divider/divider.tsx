import * as React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { size as uiSize } from '../../utils/size';

const CONTAINER: ViewStyle = {
  justifyContent: 'center',
};

export interface DividerProps {
  style?: StyleProp<ViewStyle>;
  direction?: 'vertical' | 'horizontal';
  size: number;
}

export const Divider = observer(function Divider(props: DividerProps) {
  const { style, size = 0, direction = 'horizontal' } = props;
  const sizeStyles = direction === 'horizontal' ? { height: uiSize(size) } : { width: uiSize(size) };
  const styles = Object.assign(sizeStyles, CONTAINER, style);

  return <View style={styles} />;
});
