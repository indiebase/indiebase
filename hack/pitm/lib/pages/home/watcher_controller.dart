import 'package:get/get.dart';

class WatcherController extends GetxController {
  static WatcherController get to => Get.find();

  final isListening = false.obs;

  void toggleNotificationService() {
    if (isListening.value) {
      isListening.value = false;
    } else {
      isListening.value = true;
    }
  }
}
