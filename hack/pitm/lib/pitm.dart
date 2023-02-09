import 'dart:ui';
import 'dart:isolate';
import 'package:firebase_analytics/firebase_analytics.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_notification_listener/flutter_notification_listener.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:pitm/pages/add_rules/add_rules_controller.dart';
import 'package:sentry_flutter/sentry_flutter.dart';
import 'package:get/get.dart';
import 'i18n/i18n.dart';
import 'constants.dart';
import 'notification_utils.dart';
import 'routes.dart';
import 'theme.dart';

class PITM extends StatefulWidget {
  const PITM({super.key});

  @override
  State<StatefulWidget> createState() {
    return _PITMState();
  }
}

class _PITMState extends State<PITM> {
  final ReceivePort _notificationPort = ReceivePort();

  // prevent dart from stripping out this function on release build in Flutter 3.x
  @pragma('vm:entry-point')
  static void _callback(NotificationEvent event) {
    final SendPort? send =
        IsolateNameServer.lookupPortByName(NOTIFICATION_LISTENER);

    send?.send(event);
  }

  static void _handleNotificationListener(NotificationEvent event) {
    print(event);
    print(1);
  }

  void _initListener() {
    NotificationsListener.initialize(callbackHandle: _callback);

    IsolateNameServer.removePortNameMapping(NOTIFICATION_LISTENER);
    IsolateNameServer.registerPortWithName(
        _notificationPort.sendPort, NOTIFICATION_LISTENER);

    _notificationPort.listen((message) => _handleNotificationListener(message));
  }

  @override
  void initState() {
    super.initState();
    Get.put(RulesController(), permanent: true);
    _initListener();
  }

  @override
  void didChangeDependencies() async {
    super.didChangeDependencies();
    await LocalNotification.init();
  }

  @override
  void dispose() async {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: const Size(360, 690),
      minTextAdapt: true,
      splitScreenMode: true,
      builder: (context, child) {
        return AnnotatedRegion<SystemUiOverlayStyle>(
          value: const SystemUiOverlayStyle(
            systemNavigationBarIconBrightness: Brightness.dark,
            systemNavigationBarColor: Colors.transparent,
            statusBarColor: Colors.transparent,
            statusBarIconBrightness: Brightness.dark,
          ),
          child: GetMaterialApp(
            defaultTransition: Transition.native,
            enableLog: true,
            translations: TranslationService(),
            locale: TranslationService.locale,
            fallbackLocale: TranslationService.fallbackLocale,
            navigatorObservers: [
              SentryNavigatorObserver(),
              FirebaseAnalyticsObserver(analytics: FirebaseAnalytics.instance)
            ],
            initialRoute: '/',
            getPages: routes,
            theme: lightThemeData,
          ),
        );
      },
      // child: DoublePopExit(),
    );
  }
}
