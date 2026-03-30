import { AnimatedCounter } from '@/components/AnimatedCounter';
import { ItemList } from '@/components/ItemList';
import { useAppStore } from '@/store/appStore';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { counter, items, loading, error, fetchData } = useAppStore();
  const [buttonPressed, setButtonPressed] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixedHeader}>
        <View style={styles.header}>
          <Text style={styles.title}>Data Fetcher</Text>
          <Text style={styles.subtitle}>An assignment for Deejungle to showcase React Native skills</Text>
        </View>

        <View style={styles.counterButtonRow}>
          <AnimatedCounter value={counter} />
          <TouchableOpacity
            style={[
              styles.button,
              loading && styles.buttonDisabled,
              buttonPressed && styles.buttonPressed,
            ]}
            onPress={fetchData}
            disabled={loading}
            activeOpacity={0.8}
            onPressIn={() => setButtonPressed(true)}
            onPressOut={() => setButtonPressed(false)}
          >
            <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Fetch Data'}</Text>
          </TouchableOpacity>
          <Text
            style={[styles.buttonText, { fontSize: 14, marginVertical: 8, textDecorationLine: 'underline' }]}
            onPress={() => {
              useAppStore.getState().resetData();
            }}
          >
            Clear data
          </Text>
        </View>
      </View>

      <View style={styles.listWrapper}>
        <Text style={styles.listTitle}>{items.length > 0 ? `Latest Items (${items.length})` : 'No Data'}</Text>
        <ItemList items={items} loading={loading} error={error} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  header: {
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#AAAAAA',
    fontWeight: '500',
    letterSpacing: 0.25,
  },
  button: {
    marginHorizontal: 24,
    marginVertical: 18,
    paddingVertical: 16,
    paddingHorizontal: 28,
    backgroundColor: '#A855F7',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
    shadowOpacity: 0.3,
  },
  buttonPressed: {
    transform: [{ scale: 0.96 }],
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginHorizontal: 24,
    marginBottom: 16,
    letterSpacing: -0.25,
  },
  fixedHeader: {
    paddingTop: 18,
    paddingBottom: 14,
    backgroundColor: '#100A1A',
    borderBottomWidth: 1,
    borderBottomColor: '#3A2D5F',
  },
  counterButtonRow: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
  },
  listWrapper: {
    flex: 1,
    backgroundColor: '#0A0A0D',
    paddingTop: 16,
  },
});
