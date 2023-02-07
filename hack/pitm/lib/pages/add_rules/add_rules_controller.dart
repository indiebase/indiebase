import 'dart:convert';

import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:pitm/models/rules.dart';

class RulesController extends GetxController {
  static RulesController get to => Get.find();

  final box = GetStorage();

  final rules = <Rule>[].obs;

  @override
  void onInit() {
    String? rulesString = box.read("rules");

    if (rulesString != null) {
      List<dynamic> parsedListJson = jsonDecode(rulesString);
      List<Rule> itemsList = List<Rule>.from(
          parsedListJson.map<Rule>((dynamic v) => Rule.fromJson(v)));
      rules.addAll(itemsList);
    }

    ever(rules, (callback) {
      box.write("rules", jsonEncode(callback));
    });

    super.onInit();
  }

  @override
  void onClose() {
    Get.printInfo(info: 'Rules: onClose');
    super.onClose();
  }
}
