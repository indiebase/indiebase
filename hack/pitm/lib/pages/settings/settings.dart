import 'package:cached_memory_image/cached_memory_image.dart';
import 'package:disable_battery_optimization/disable_battery_optimization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_notification_listener/flutter_notification_listener.dart';
import 'package:get/get.dart';

import '../add_rules/add_rules_controller.dart';

class SettingsPage extends StatelessWidget {
  SettingsPage({super.key});

  final RulesController _rulesController = RulesController.to;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView(
        padding: const EdgeInsets.only(top: 50),
        children: [
          const ListTile(
            title: Text(
              'Settings',
              style: TextStyle(fontSize: 34),
            ),
          ),
          const SizedBox(height: 10),
          Obx(
            () => Column(
              children: [
                _rulesController.rules.isEmpty
                    ? Container()
                    : const SizedBox(
                        height: 40,
                        child: ListTile(
                          title: Text(
                            "listening apps",
                            style: TextStyle(fontSize: 14, color: Colors.green),
                          ),
                        ),
                      ),
                ..._rulesController.rules
                    .map(
                      (element) => ListTile(
                        onTap: () {},
                        leading: SizedBox(
                          width: 45,
                          height: 45,
                          child: CachedMemoryImage(
                            bytes: element.icon,
                            width: 45,
                            height: 45,
                            uniqueKey: element.packageName,
                          ),
                        ),
                        title: Text(element.appName),
                        subtitle: Text(element.packageName),
                      ),
                    )
                    .toList(),
              ],
            ),
          ),
          Column(
            children: [
              const SizedBox(
                height: 40,
                child: ListTile(
                  title: Text(
                    "permission",
                    style: TextStyle(fontSize: 14, color: Colors.green),
                  ),
                ),
              ),
              ListTile(
                onTap: () {
                  NotificationsListener.openPermissionSettings();
                },
                title: const Text("Notification listener permission"),
              ),
              ListTile(
                onTap: () async {
                  await DisableBatteryOptimization.showEnableAutoStartSettings(
                      "Enable Auto Start",
                      "Follow the steps and enable the auto start of this app");
                },
                title: const Text("Auto start"),
              ),
              ListTile(
                onTap: () async {
                  await DisableBatteryOptimization
                      .showDisableBatteryOptimizationSettings();
                },
                title: const Text("Battery optimization"),
              ),
              ListTile(
                onTap: () async {
                  await DisableBatteryOptimization
                      .showDisableManufacturerBatteryOptimizationSettings(
                          "Your device has additional battery optimization",
                          "Follow the steps and disable the optimizations to allow smooth functioning of this app");
                },
                title: const Text("Manufacturer specific Battery Optimization"),
              ),
            ],
          )
        ],
      ),
    );
  }
}
