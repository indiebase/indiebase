import 'dart:developer';
import 'dart:io';
import 'package:disable_battery_optimization/disable_battery_optimization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_notification_listener/flutter_notification_listener.dart';
import 'package:get/get.dart';
import 'package:hive/hive.dart';
import 'package:syncfusion_flutter_xlsio/xlsio.dart';
import '../../constants.dart';
import '../../models/record.dart';

class WatcherController extends GetxController {
  static WatcherController get to => Get.find();
  final records = <Record>[].obs;
  late Box<Record> recordsBox;

  /// This records2 is used for the HomeScreen, it will pop
  /// and push record when out of limit.
  final records2 = <Record>[].obs;
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

  addRecord(Record record) async {
    records.add(record);
    if (records2.length > 2000) {
      records2.insert(0, record);
      records2.removeLast();
    } else {
      records2.add(record);
    }

    await recordsBox.add(record);
  }

  @override
  void onInit() async {
    super.onInit();
    recordsBox = await Hive.openBox<Record>('records');
    records.addAll(recordsBox.values);

    await _permissionDialog();
  }

  _permissionDialog() async {
    var hasPermission = await NotificationsListener.hasPermission ?? false;
    bool isBatteryOptimizationDisabled =
        await DisableBatteryOptimization.isBatteryOptimizationDisabled ?? false;

    if (hasPermission) {
      await toggleNotificationService();
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

  toggleNotificationService() async {
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

  exportXlsx() async {
    int c = 100;
    int n = (records.length / c).ceil();

    final Workbook workbook = Workbook();
    final Worksheet sheet = workbook.worksheets[0];
    sheet.showGridlines = true;
    sheet.enableSheetCalculations();

    final range = sheet.getRangeByName('A');
    // range
    // range.setText("DEMODMEO");

    final List<int> bytes = workbook.saveAsStream();

    if (!Directory(documentsDirectory).existsSync()) {
      Directory(documentsDirectory).createSync();
    }

    File("$documentsDirectory/DeleteRowandColumn.xlsx").writeAsBytes(bytes);

    workbook.dispose();

    for (var i = 0; i < n; i++) {
      for (var j = 0; j < c; j++) {}

      // workbook.dispose();
    }
  }
}
