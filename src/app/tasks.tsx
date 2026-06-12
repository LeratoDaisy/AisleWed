import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type Task = {
  id: number;
  title: string;
  done: boolean;
};

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  const addTask = () => {
    if (!title) return;

    const newTask: Task = {
      id: Date.now(),
      title,
      done: false,
    };

    setTasks([...tasks, newTask]);
    setTitle('');
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const total = tasks.length;
  const completed = tasks.filter((t) => t.done).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wedding Tasks</Text>

      <View style={styles.card}>
        <Text style={styles.summary}>Total Tasks: {total}</Text>
        <Text style={styles.summary}>Completed: {completed}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Add Task</Text>

        <TextInput
          placeholder="e.g. Book venue"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={addTask}>
          <Text style={styles.buttonText}>Add Task</Text>
        </Pressable>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.task,
              item.done && styles.taskDone,
            ]}
            onPress={() => toggleTask(item.id)}
          >
            <Text
              style={[
                styles.taskText,
                item.done && styles.taskTextDone,
              ]}
            >
              {item.title}
            </Text>

            <Text style={styles.status}>
              {item.done ? 'Done' : 'Pending'}
            </Text>
          </Pressable>
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
  summary: {
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
  task: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EAE2D6',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskDone: {
    backgroundColor: '#E9F7EF',
    borderColor: '#B7E4C7',
  },
  taskText: {
    fontSize: 15,
    fontWeight: '500',
  },
  taskTextDone: {
    textDecorationLine: 'line-through',
    color: '#7A7A7A',
  },
  status: {
    fontSize: 12,
    color: '#7A7A7A',
  },
});