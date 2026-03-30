import { StyleSheet, View } from 'react-native';

export const ItemSkeleton: React.FC = () => (
  <View style={styles.skeletonCard}>
    <View style={styles.skeletonLineShort} />
    <View style={styles.skeletonLineLong} />
    <View style={styles.skeletonLineMedium} />
  </View>
);

const styles = StyleSheet.create({
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
