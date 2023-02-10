import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:hive/hive.dart';
import 'package:pitm/models/rule.dart';

class RulesController extends GetxController {
  static RulesController get to => Get.find();

  final box = GetStorage();

  final rules = <Rule>[].obs;

  late Box<Rule> rulesBox;

  bool addRule(Rule rule) {
    if (rulesBox.values.where((element) {
      return element.packageName == rule.packageName;
    }).isNotEmpty) {
      return false;
    }

    rules.add(rule);

    return true;
  }

  Rule? findRule(String packageName) {
    return rules.firstWhere((p0) => p0?.packageName == packageName);
  }

  @override
  void onInit() async {
    rulesBox = await Hive.openBox<Rule>('rules');

    rules.addAll(rulesBox.values);

    ever(rules, (callback) async {
      if (callback.isNotEmpty) {
        await rulesBox.addAll(callback);
      }
    });

    super.onInit();
  }

  @override
  void onClose() {
    Get.printInfo(info: 'Rules: onClose');

    super.onClose();
  }
}
