import 'dart:developer';
import 'package:disable_battery_optimization/disable_battery_optimization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_notification_listener/flutter_notification_listener.dart';
import 'package:get/get.dart';

class WatcherController extends GetxController {
  static WatcherController get to => Get.find();

  final isListening = false.obs;

  static showNB({VoidCallback? onConfirm, required String title}) {
    return Get.defaultDialog(
      titlePadding: const EdgeInsets.only(top: 20),
      titleStyle: const TextStyle(fontSize: 22),
      contentPadding: const EdgeInsets.symmetric(horizontal: 25, vertical: 8),
      title: title,
      content: const Text(
        "Note Bene! This app requires notification listener permission and battery optimization turned off to work.",
        style: TextStyle(fontSize: 16),
      ),
      confirm: TextButton(
        child: const Text(
          "Ok",
          style: TextStyle(fontSize: 20),
        ),
        onPressed: () {
          if (onConfirm != null) {
            onConfirm();
          }

          Get.back();
        },
      ),
    );
  }

  @override
  void onInit() async {
    super.onInit();
    var hasPermission = await NotificationsListener.hasPermission ?? false;
    bool isBatteryOptimizationDisabled =
        await DisableBatteryOptimization.isBatteryOptimizationDisabled ?? false;

    if (hasPermission) {
      toggleNotificationService();
    } else {
      await showNB(
          title: 'Notification Listener',
          onConfirm: () {
            NotificationsListener.openPermissionSettings();
          });
    }
    if (!isBatteryOptimizationDisabled) {
      await showNB(
        title: 'Battery Optimization !',
        onConfirm: () async {
          await DisableBatteryOptimization
              .showDisableBatteryOptimizationSettings();
        },
      );
    }
  }

  void toggleNotificationService() async {
    var isRunning = await NotificationsListener.isRunning ?? false;

    if (!isRunning) {
      bool isSuccess = await NotificationsListener.startService(
            foreground: false,
            title: "Listener Running",
          ) ??
          false;
      if (isSuccess) {
        log('Start listening', name: 'NotificationService');
      }
    }
    isListening.value = true;
  }
}
