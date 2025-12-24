import { StyleSheet } from 'react-native';
import { spacing } from '../theme/spacing';

/**
 * Component-specific styles for Community
 */
export const communityStyles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 100, // Position above the BottomMenuBar (which has minHeight: 80)
    right: spacing.containerPadding,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#9146ff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    zIndex: 1000,
  },
  floatingButtonImage: {
    width: 40,
    height: 40,
  },
});

