import { useEffect, useState } from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { wedding } from '../data/wedding';

type Expense = {
  id: number;
  name: string;
  amount: number;
};

const STORAGE_KEY = 'aislewed_budget';

export default function BudgetScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async (): Promise<void> => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);

      if (data) {
        setExpenses(JSON.parse(data) as Expense[]);
      } else {
        setExpenses(wedding.budget.expenses);
      }
    } catch (error) {
      console.log('Error loading expenses:', error);
    }
  };

  const saveExpenses = async (newExpenses: Expense[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newExpenses));
    } catch (error) {
      console.log('Error saving expenses:', error);
    }
  };

  const addExpense = () => {
    if (!name || !amount) return;

    const newExpense: Expense = {
      id: Date.now(),
      name,
      amount: parseFloat(amount),
    };

    const updated = [...expenses, newExpense];

    setExpenses(updated);
    saveExpenses(updated);

    setName('');
    setAmount('');
  };

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remaining = wedding.budget.total - totalSpent;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget</Text>

      <View style={styles.card}>
        <Text style={styles.item}>Total: R{wedding.budget.total}</Text>
        <Text style={styles.item}>Spent: R{totalSpent}</Text>
        <Text style={styles.item}>Remaining: R{remaining}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Add Expense</Text>

        <TextInput
          placeholder="Expense name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={addExpense}>
          <Text style={styles.buttonText}>Add Expense</Text>
        </Pressable>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.expense}>
            <Text>{item.name}</Text>
            <Text>R{item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5F0',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EAE2D6',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  item: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2F2F2F',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  expense: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
  },
});