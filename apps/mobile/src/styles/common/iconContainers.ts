import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

/**
 * Common icon container styles
 * Used across: ClinicListing, DoctorListing, HospitalListing, ScreeningTracking, VaccineTracking
 */
export const iconContainerStyles = StyleSheet.create({
  iconContainer: {
    backgroundColor: colors.accent.pinkVeryLight,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerSmall: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  iconContainerMedium: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  iconTextSmall: {
    fontSize: 30,
  },
  iconTextMedium: {
    fontSize: 35,
  },
  iconTextLarge: {
    fontSize: 48,
  },
});

