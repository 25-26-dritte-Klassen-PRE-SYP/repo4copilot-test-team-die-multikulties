import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Items Demo',
      home: const ItemsPage(),
    );
  }
}

class ItemsPage extends StatefulWidget {
  const ItemsPage({super.key});

  @override
  State<ItemsPage> createState() => _ItemsPageState();
}

class _ItemsPageState extends State<ItemsPage> {
  final controller = TextEditingController();
  final baseUrl = 'http://localhost:3000';
  List items = [];

  Future<void> loadItems() async {
    final response = await http.get(Uri.parse('$baseUrl/items'));
    setState(() {
      items = jsonDecode(response.body);
    });
  }

  Future<void> addItem() async {
    await http.post(
      Uri.parse('$baseUrl/items'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'name': controller.text}),
    );
    controller.clear();
    await loadItems();
  }

  Future<void> deleteItem(int id) async {
    await http.delete(Uri.parse('$baseUrl/items/$id'));
    await loadItems();
  }

  @override
  void initState() {
    super.initState();
    loadItems();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Items Demo')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Row(
              children: [
                Expanded(child: TextField(controller: controller)),
                const SizedBox(width: 8),
                ElevatedButton(onPressed: addItem, child: const Text('Speichern'))
              ],
            ),
            const SizedBox(height: 16),
            Expanded(
              child: ListView.builder(
                itemCount: items.length,
                itemBuilder: (context, index) {
                  final item = items[index];
                  return ListTile(
                    title: Text(item['name']),
                    trailing: IconButton(
                      icon: const Icon(Icons.delete),
                      onPressed: () => deleteItem(item['id']),
                    ),
                  );
                },
              ),
            )
          ],
        ),
      ),
    );
  }
}