import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const Dropdown = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
        <Text style={styles.dropdownButtonText}>
          {selectedOption || 'Select an option'}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.dropdownOptions}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionSelect(option)}
              style={styles.optionButton}
            >
              <Text style={styles.optionButtonText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  dropdownButtonText: {
    fontSize: 16,
    color:"black"
  },
  dropdownOptions: {
    // flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  optionButton: {
    padding: 10,
  },
  optionButtonText: {
    fontSize: 16,
    color: 'black',
  },
});

export default Dropdown;
