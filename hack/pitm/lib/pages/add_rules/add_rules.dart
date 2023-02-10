import 'package:cached_memory_image/cached_memory_image.dart';
import 'package:device_apps/device_apps.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:get/get.dart';
import 'package:pitm/components/back_button.dart';
import 'package:pitm/models/rule.dart';
import 'package:pitm/pages/add_rules/rule_form_controller.dart';
import 'package:unicons/unicons.dart';
import 'add_rules_controller.dart';

class AddRulesPage extends GetView<RulesController> {
  AddRulesPage({super.key});

  final _ruleFormController = RuleFormController.to;

  _showDeviceApps(BuildContext context) {
    return showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (BuildContext context) {
        return FractionallySizedBox(
          heightFactor: 0.9,
          child: ListView.builder(
            shrinkWrap: true,
            padding: const EdgeInsets.only(top: 20),
            itemCount: _ruleFormController.deviceApps.length,
            itemBuilder: (BuildContext context, int index) {
              ApplicationWithIcon app = _ruleFormController.deviceApps[index];

              return ListTile(
                onTap: () {
                  _ruleFormController.selectedApp.value = app;
                  Get.back();
                },
                leading: SizedBox(
                  width: 50,
                  height: 50,
                  child: CachedMemoryImage(
                    bytes: app.icon,
                    width: 50,
                    height: 50,
                    uniqueKey: app.packageName,
                  ),
                ),
                title: Text(app.appName),
                subtitle: Text(app.packageName),
              );
            },
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    var action = Get.parameters["action"] as String;

    return GestureDetector(
      onTap: () => FocusScope.of(context).requestFocus(FocusNode()),
      child: Scaffold(
        appBar: AppBar(leading: const AppBarBackButton()),
        body: ListView(
          children: [
            Container(
              padding: const EdgeInsets.only(left: 20, right: 20, top: 10),
              child: Form(
                key: _ruleFormController.formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Obx(
                      () => SizedBox(
                        width: double.infinity,
                        height: 64,
                        child: ElevatedButton(
                          onPressed: () {
                            _showDeviceApps(context);
                          },
                          style: ButtonStyle(
                            shape: MaterialStateProperty.all<
                                RoundedRectangleBorder>(
                              const RoundedRectangleBorder(
                                borderRadius:
                                    BorderRadius.all(Radius.circular(5)),
                              ),
                            ),
                          ),
                          child: _ruleFormController.selectedApp.value != null
                              ? Row(
                                  children: [
                                    CachedMemoryImage(
                                      bytes: _ruleFormController
                                          .selectedApp.value!.icon,
                                      width: 50,
                                      height: 50,
                                      uniqueKey: _ruleFormController
                                          .selectedApp.value!.packageName,
                                    ),
                                    const SizedBox(width: 10),
                                    Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        Text(_ruleFormController
                                            .selectedApp.value!.appName),
                                        Text(
                                          _ruleFormController
                                              .selectedApp.value!.packageName,
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                      ],
                                    )
                                  ],
                                )
                              : const Text("选择应用",
                                  style: TextStyle(fontSize: 16)),
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                    TextFormField(
                      autofocus: false,
                      controller: _ruleFormController.matchPatternController,
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: "匹配规则",
                        helperText: "请使用正则表达式",
                      ),
                      // 校验用户名
                      validator: _ruleFormController.validator,
                    ),
                    const SizedBox(height: 15),
                    const Text(
                      "回调使用http方法",
                      style: TextStyle(fontSize: 12),
                    ),
                    Obx(
                      () => Row(
                        children: HttpMethods.values
                            .map(
                              (e) => Row(
                                children: [
                                  Text(e.name),
                                  Radio<HttpMethods>(
                                    value: e,
                                    groupValue:
                                        _ruleFormController.httpMethod.value,
                                    onChanged: _ruleFormController
                                        .selectCallbackHttpMethod,
                                  ),
                                ],
                              ),
                            )
                            .toList(),
                      ),
                    ),
                    TextFormField(
                      controller: _ruleFormController.callbackController,
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: "回调地址",
                      ),
                      // 校验用户名
                      validator: _ruleFormController.validator,
                    ),
                    // Row(
                    //   children: [
                    //     Expanded(
                    //       flex: 1,
                    //       child: TextFormField(
                    //         autofocus: false,
                    //         initialValue: "callbackUrl",
                    //         decoration: const InputDecoration(
                    //           border: OutlineInputBorder(),
                    //           labelText: "请求字段",
                    //         ),
                    //         validator: (v) {},
                    //       ),
                    //     ),
                    //     const SizedBox(width: 5),
                    //     const Text(":"),
                    //     const SizedBox(width: 10),

                    //   ],
                    // )
                  ],
                ),
              ),
            ),
          ],
        ),
        // floatingActionButtonLocation: FloatingActionButtonLocation.endDocked,
        floatingActionButton: FloatingActionButton.extended(
          onPressed: () {
            Rule? rule = _ruleFormController.submit();
            if (rule != null) {
              if (controller.addRule(rule)) {
                Get.back();
              } else {
                Fluttertoast.showToast(msg: "${rule.packageName} has exist");
              }
            }
          },
          tooltip: 'Add match rules',
          icon: const Icon(
            UniconsLine.check,
          ),
          label: Text(
            action == "create" ? 'Done' : "Update",
          ),
        ),
      ),
    );
  }
}
