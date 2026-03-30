import { ItemRenderer } from '@/components/ItemRenderer';
import { ItemSkeleton } from '@/components/ItemSkeleton';
import { DataItem } from '@/store/appStore';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

interface ItemListProps {
  items: DataItem[];
  loading: boolean;
  error: string | null;
}

export const ItemList: React.FC<ItemListProps> = ({ items, loading, error }) => {
  if (loading && items.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6750A4" />
        <Text style={styles.loadingText}>Fetching data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>Press &quot;Fetch Data&quot; to load items</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.dataList}
      data={loading ? Array.from({ length: 8 }, (_, i) => ({ id: i })) : items}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) =>
        loading ? (
          <ItemSkeleton />
        ) : (
          <ItemRenderer item={item as DataItem} />
        )
      }
      contentContainerStyle={styles.scrollContent}
    />
  );
};

const styles = StyleSheet.create({
  dataList: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#DDDDDD',
    fontWeight: '500',
    letterSpacing: 0.25,
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.25,
  },
  emptyText: {
    fontSize: 16,
    color: '#AAAAAA',
    fontWeight: '500',
    letterSpacing: 0.25,
  },
  skeletonCard: {
    height: 100,
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 14,
    backgroundColor: '#24212A',
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.55,
    shadowRadius: 8,
    elevation: 12,
    justifyContent: 'space-between',
  },
  skeletonLineShort: {
    height: 12,
    width: '40%',
    backgroundColor: '#3C3A47',
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonLineLong: {
    height: 12,
    width: '80%',
    backgroundColor: '#3C3A47',
    borderRadius: 4,
  },
  skeletonLineMedium: {
    height: 10,
    width: '60%',
    backgroundColor: '#3C3A47',
    borderRadius: 4,
    marginTop: 6,
  },
});
