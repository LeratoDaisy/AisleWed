import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type Guest = {
  id: number;
  name: string;
  attending: boolean | null;
};

export default function GuestsScreen() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [name, setName] = useState('');

  const addGuest = () => {
    if (!name) return;

    const newGuest: Guest = {
      id: Date.now(),
      name,
      attending: null,
    };

    setGuests([...guests, newGuest]);
    setName('');
  };

  const markAttending = (id: number, status: boolean) => {
    setGuests(
      guests.map((g) =>
        g.id === id ? { ...g, attending: status } : g
      )
    );
  };

  const total = guests.length;
  const confirmed = guests.filter((g) => g.attending === true).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guests</Text>

      <View style={styles.card}>
        <Text style={styles.summary}>Total: {total}</Text>
        <Text style={styles.summary}>Confirmed: {confirmed}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Add Guest</Text>

        <TextInput
          placeholder="Guest name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={addGuest}>
          <Text style={styles.buttonText}>Add Guest</Text>
        </Pressable>
      </View>

      <FlatList
        data={guests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.guest}>
            <Text style={styles.name}>{item.name}</Text>

            <View style={styles.actions}>
              <Pressable
                style={[styles.btn, { backgroundColor: '#2F2F2F' }]}
                onPress={() => markAttending(item.id, true)}
              >
                <Text style={styles.btnText}>Yes</Text>
              </Pressable>

              <Pressable
                style={[styles.btn, { backgroundColor: '#A0A0A0' }]}
                onPress={() => markAttending(item.id, false)}
              >
                <Text style={styles.btnText}>No</Text>
              </Pressable>
            </View>

            <Text style={styles.status}>
              {item.attending === null
                ? 'Pending'
                : item.attending
                ? 'Coming'
                : 'Not coming'}
            </Text>
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
  guest: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EAE2D6',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  btn: {
    padding: 8,
    borderRadius: 8,
    width: 60,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  status: {
    marginTop: 8,
    fontSize: 12,
    color: '#7A7A7A',
  },
});