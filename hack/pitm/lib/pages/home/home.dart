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
          return ListView(
            children: [
              Container(
                padding: const EdgeInsets.only(top: 20, left: 15, right: 20),
                child: Wrap(
                  children: [
                    SizedBox(
                      // width: 150,
                      // height: 50,
                      child: ElevatedButton.icon(
                        onPressed: watcherController.toggleNotificationService,
                        icon: watcherController.isListening.value
                            ? const Icon(UniconsLine.record_audio)
                            : const Icon(UniconsLine.play),
                        label: Text(
                          watcherController.isListening.value
                              ? "监听中..."
                              : "监听通知",
                          style: const TextStyle(fontSize: 16),
                        ),
                      ),
                    ),
                    const SizedBox(width: 15),
                    FilledButton.tonalIcon(
                      onPressed: watcherController.toggleNotificationService,
                      icon: const Icon(UniconsLine.history),
                      label: const Text(
                        "记录",
                        style: TextStyle(fontSize: 16),
                      ),
                    ),
                  ],
                ),
              ),
              Column(
                children: controller.rules
                    .map((element) => ListTile(
                          title: Text(element.appName),
                        ))
                    .toList(),
              )
            ],
          );
        }),
      ),
    );
  }
}
