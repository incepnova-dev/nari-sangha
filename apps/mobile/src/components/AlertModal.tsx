import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
} from 'react-native';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose }) => {
  // Sample alert data - replace with actual data from your API/state
  const alerts = [
    { id: '1', title: 'New message', message: 'You have a new message from John', time: '2 min ago' },
    { id: '2', title: 'Community update', message: 'New post in your community', time: '1 hour ago' },
    { id: '3', title: 'Reminder', message: 'Don\'t forget your appointment', time: '3 hours ago' },
  ];

  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Alerts</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView 
                style={styles.modalBody}
                contentContainerStyle={styles.modalBodyContent}
                showsVerticalScrollIndicator={true}
              >
                {alerts.length === 0 ? (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>No alerts</Text>
                  </View>
                ) : (
                  alerts.map((alert) => (
                    <TouchableOpacity
                      key={alert.id}
                      style={styles.alertItem}
                      onPress={() => {
                        // Handle alert click
                        onClose();
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={styles.alertItemContent}>
                        <View style={styles.alertItemHeader}>
                          <Text style={styles.alertItemTitle}>{alert.title}</Text>
                          <View style={styles.alertBadge} />
                        </View>
                        <Text style={styles.alertItemMessage}>{alert.message}</Text>
                        <Text style={styles.alertItemTime}>{alert.time}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
    minHeight: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#E91E63',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
    fontWeight: '600',
  },
  modalBody: {
    flex: 1,
  },
  modalBodyContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  alertItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  alertItemContent: {
    flex: 1,
  },
  alertItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    flex: 1,
  },
  alertBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E91E63',
    marginLeft: 8,
  },
  alertItemMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 6,
  },
  alertItemTime: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
});

export default AlertModal;
