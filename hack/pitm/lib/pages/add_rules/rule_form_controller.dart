import 'package:device_apps/device_apps.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:get/get.dart';
import 'package:pitm/models/rule.dart';

import '../../constants.dart';

enum HttpMethods { GET, POST, PUT }

class RuleFormController extends GetxController {
  static RuleFormController get to => Get.find();

  final formKey = GlobalKey<FormState>();
  final callbackController = TextEditingController();
  final matchPatternController = TextEditingController();
  final selectedApp = Rxn<ApplicationWithIcon>();

  final httpMethod = HttpMethods.POST.obs;

  @override
  void onInit() {
    ever(selectedApp, (callback) {
      switch (callback?.packageName) {
        case APLIPAY_PACKAGENAME:
          matchPatternController.text = APLIPAY_MATCH_RULE;
          break;
        case WECHAT_PAY_PACKAGENAME:
          matchPatternController.text = WECHAT_PAY_MATCH_RULE;
          break;
        default:
      }
    });

    super.onInit();
  }

  @override
  void onClose() {
    matchPatternController.dispose();
    callbackController.dispose();
    super.onClose();
  }

  String? validator(String? value) {
    if (value != null && value.isEmpty) {
      return 'Please this field must be filled';
    }
    return null;
  }

  void selectCallbackHttpMethod(HttpMethods? value) {
    httpMethod.value = value ?? HttpMethods.POST;
  }

  Rule? submit() {
    if (selectedApp.value == null) {
      Fluttertoast.showToast(msg: "Please select target app");
      return null;
    }

    if (formKey.currentState != null && formKey.currentState!.validate()) {
      return Rule()
        ..appName = selectedApp.value!.appName
        ..packageName = selectedApp.value!.packageName
        ..callbackUrl = callbackController.text
        ..matchPattern = matchPatternController.text
        ..callbackHttpMethod = httpMethod.value.name
        ..icon = selectedApp.value!.icon;
    }
    return null;
  }
}
