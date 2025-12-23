import { StyleSheet } from 'react-native';

/**
 * Component-specific styles for TopMenuBar
 */
export const topMenuBarStyles = StyleSheet.create({
  topBar: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#111827',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#374151',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flex: 1,
  },
  topBarTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  topBarSubtitle: {
    color: '#9CA3AF',
    fontSize: 14,
    marginTop: 4,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  profileIconText: {
    fontSize: 20,
  },
});

