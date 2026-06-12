import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Spacing } from '../constants/theme';
import { wedding } from '../data/wedding';

export default function HomeScreen() {
  const budgetUsed = wedding.budget.expenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  const budgetLeft = wedding.budget.total - budgetUsed;

  const completedTasks = wedding.tasks.total - wedding.tasks.remaining;

  const daysLeft = 120;

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.brand}>AisleWed</Text>
      <Text style={styles.tagline}>
        Your wedding, beautifully orchestrated
      </Text>

      {/* HERO */}
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>{wedding.coupleName}</Text>
        <Text style={styles.heroSubtitle}>
          Wedding Date: {wedding.weddingDate}
        </Text>

        <View style={styles.heroRow}>
          <View>
            <Text style={styles.heroLabel}>Days Left</Text>
            <Text style={styles.heroValue}>{daysLeft}</Text>
          </View>

          <View>
            <Text style={styles.heroLabel}>Guests</Text>
            <Text style={styles.heroValue}>
              {wedding.guests.invited}
            </Text>
          </View>
        </View>
      </View>

      {/* Budget */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Budget Overview</Text>

        <Text style={styles.item}>
          Total: R{wedding.budget.total}
        </Text>
        <Text style={styles.item}>
          Spent: R{budgetUsed}
        </Text>
        <Text style={styles.item}>
          Remaining: R{budgetLeft}
        </Text>
      </View>

      {/* Tasks */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tasks Progress</Text>

        <Text style={styles.item}>
          Completed: {completedTasks} / {wedding.tasks.total}
        </Text>
      </View>

      {/* Guests */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Guest Summary</Text>

        <Text style={styles.item}>
          Invited: {wedding.guests.invited}
        </Text>

        <Text style={styles.item}>
          Confirmed: {wedding.guests.confirmed}
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },

  brand: {
    fontSize: 34,
    fontWeight: '700',
    color: Colors.text,
  },

  tagline: {
    fontSize: 14,
    color: Colors.muted,
    marginBottom: Spacing.lg,
  },

  heroCard: {
    backgroundColor: Colors.card,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
  },

  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },

  heroSubtitle: {
    fontSize: 13,
    color: Colors.muted,
    marginBottom: Spacing.md,
  },

  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  heroLabel: {
    fontSize: 12,
    color: Colors.muted,
  },

  heroValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },

  card: {
    backgroundColor: Colors.card,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: Spacing.sm,
    color: Colors.text,
  },

  item: {
    fontSize: 14,
    color: Colors.muted,
    marginBottom: 6,
  },
});