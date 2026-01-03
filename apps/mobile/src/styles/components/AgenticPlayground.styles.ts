import { StyleSheet, Platform, StatusBar } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for AgenticPlayground (Chat Interface)
 */
export const agenticPlaygroundStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 50,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: colors.text.white,
    fontWeight: typography.fontWeight.semibold,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  headerSpacer: {
    width: 35,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: spacing.xl,
    paddingBottom: 10,
  },
  messageWrapper: {
    marginBottom: 15,
    flexDirection: 'row',
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  assistantMessageWrapper: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 15,
    borderRadius: 20,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userMessage: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  assistantMessage: {
    backgroundColor: colors.background.white,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 5,
  },
  userMessageText: {
    color: colors.text.white,
  },
  assistantMessageText: {
    color: colors.text.primary,
  },
  timestamp: {
    fontSize: 10,
    opacity: 0.7,
    marginTop: 4,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text.tertiary,
    opacity: 0.6,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.background.white,
    borderTopWidth: 1,
    borderTopColor: colors.border.medium,
    alignItems: 'flex-end',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    borderRadius: 25,
    paddingHorizontal: spacing.xl,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text.primary,
    maxHeight: 100,
    minHeight: 45,
  },
  sendButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: colors.button.disabled,
    shadowOpacity: 0,
    elevation: 0,
  },
  sendButtonText: {
    fontSize: 20,
    color: colors.text.white,
    fontWeight: typography.fontWeight.semibold,
  },
});

