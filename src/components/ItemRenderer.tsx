import { DataItem } from '@/store/appStore';
import { StyleSheet, Text, View } from 'react-native';

export const ItemRenderer = ({ item }: { item: DataItem }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemHeader}>
      <Text style={styles.itemTitle} numberOfLines={2}>
        {item.title}
      </Text>
    </View>
    {item.body && (
      <Text style={styles.itemBody} numberOfLines={3}>
        {item.body}
      </Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#1C1A24',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 16,
    borderRadius: 16,
    borderLeftWidth: 16,
    borderLeftColor: '#A855F7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  itemTitle: {
    flex: 1,
    fontWeight: '700',
    color: '#FFFFFF',
    fontSize: 16,
    letterSpacing: -0.25,
  },
  itemBody: {
    color: '#DDDDDD',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
});
