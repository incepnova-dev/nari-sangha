import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { modalStyles, buttons } from '../styles';

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
        <View style={modalStyles.modalOverlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={modalStyles.alertModalContent}>
              <View style={modalStyles.alertModalHeader}>
                <Text style={modalStyles.alertModalTitle}>Alerts</Text>
                <TouchableOpacity onPress={onClose}>
                  <Text style={modalStyles.alertModalClose}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={modalStyles.alertModalBody}>
                {alerts.length === 0 ? (
                  <View style={modalStyles.alertModalEmpty}>
                    <Text style={modalStyles.alertModalEmptyText}>No alerts</Text>
                  </View>
                ) : (
                  alerts.map((alert) => (
                    <TouchableOpacity
                      key={alert.id}
                      style={modalStyles.alertItem}
                      onPress={() => {
                        // Handle alert click
                        onClose();
                      }}
                    >
                      <View style={modalStyles.alertItemContent}>
                        <Text style={modalStyles.alertItemTitle}>{alert.title}</Text>
                        <Text style={modalStyles.alertItemMessage}>{alert.message}</Text>
                        <Text style={modalStyles.alertItemTime}>{alert.time}</Text>
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

