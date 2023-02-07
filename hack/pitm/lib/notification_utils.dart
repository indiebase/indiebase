import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

class LocalNotification {
  static late FlutterLocalNotificationsPlugin? plugin;

  static Future<void> init() async {
    plugin = FlutterLocalNotificationsPlugin();
    var android = const AndroidInitializationSettings('notification');
    var initSetttings = InitializationSettings(android: android);
    await plugin?.initialize(initSetttings);
  }

  static Future<void> showNotification({
    String id = '0',
    int index = 0,
    required String name,
    required String title,
    String? subTitle,
    String? payload,
    bool ongoing = false,
    bool onlyAlertOnce = false,
    bool showProgress = false,
    bool indeterminate = false,
    bool autoCancel = false,
    NotificationVisibility visibility = NotificationVisibility.public,
  }) async {
    var android = AndroidNotificationDetails(
      id,
      name,
      priority: Priority.high,
      importance: Importance.max,
      ongoing: ongoing,
      autoCancel: autoCancel,
      onlyAlertOnce: onlyAlertOnce,
      showProgress: showProgress,
      indeterminate: indeterminate,
      visibility: visibility,
      color: const Color(0xFF007AFF),
    );
    var platform = NotificationDetails(android: android);
    await plugin?.show(index, title, subTitle, platform, payload: payload);
  }
}
