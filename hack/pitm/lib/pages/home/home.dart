import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:pitm/pages/add_rules/add_rules_controller.dart';
import 'package:unicons/unicons.dart';

import 'watcher_controller.dart';

class HomePage extends StatelessWidget {
  HomePage({super.key});

  final RulesController controller = Get.put(RulesController());
  final WatcherController watcherController = Get.put(WatcherController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Obx(() {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(
                width: 150,
                height: 50,
                child: ElevatedButton.icon(
                  onPressed: watcherController.toggleNotificationService,
                  icon: watcherController.isListening.value
                      ? const Icon(UniconsLine.pause)
                      : const Icon(UniconsLine.play),
                  label: const Text(
                    "监听通知",
                    style: TextStyle(fontSize: 16),
                  ),
                ),
              ),
              Expanded(
                flex: 1,
                child: ListView.builder(
                  itemCount: controller.rules.length,
                  itemBuilder: (BuildContext context, int index) {
                    return ListTile(
                      title: Text(controller.rules[index].appName),
                    );
                  },
                ),
              ),
            ],
          );
        }),
      ),
    );
  }
}
