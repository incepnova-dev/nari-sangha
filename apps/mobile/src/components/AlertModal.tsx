import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { alertModalStyles } from '../styles';

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
        <View style={alertModalStyles.modalOverlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={alertModalStyles.modalContent}>
              <View style={alertModalStyles.modalHeader}>
                <Text style={alertModalStyles.modalTitle}>Alerts</Text>
                <TouchableOpacity onPress={onClose} style={alertModalStyles.closeButton}>
                  <Text style={alertModalStyles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView 
                style={alertModalStyles.modalBody}
                contentContainerStyle={alertModalStyles.modalBodyContent}
                showsVerticalScrollIndicator={true}
              >
                {alerts.length === 0 ? (
                  <View style={alertModalStyles.emptyState}>
                    <Text style={alertModalStyles.emptyStateText}>No alerts</Text>
                  </View>
                ) : (
                  alerts.map((alert) => (
                    <TouchableOpacity
                      key={alert.id}
                      style={alertModalStyles.alertItem}
                      onPress={() => {
                        // Handle alert click
                        onClose();
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={alertModalStyles.alertItemContent}>
                        <View style={alertModalStyles.alertItemHeader}>
                          <Text style={alertModalStyles.alertItemTitle}>{alert.title}</Text>
                          <View style={alertModalStyles.alertBadge} />
                        </View>
                        <Text style={alertModalStyles.alertItemMessage}>{alert.message}</Text>
                        <Text style={alertModalStyles.alertItemTime}>{alert.time}</Text>
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

export default AlertModal;
