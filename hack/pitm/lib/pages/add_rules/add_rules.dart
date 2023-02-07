import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:pitm/components/back_button.dart';
import 'package:pitm/models/rules.dart';
import 'package:unicons/unicons.dart';

import 'add_rules_controller.dart';

class AddRulesPage extends GetView<RulesController> {
  const AddRulesPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(leading: const AppBarBackButton()),
      body: Container(
        padding: const EdgeInsets.only(left: 20, right: 20, top: 10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            TextFormField(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                labelText: "匹配规则",
              ),
              // 校验用户名
              validator: (v) {},
            ),
            const SizedBox(height: 15),
            const Text(
              "回调地址",
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
            const SizedBox(height: 15),
            Row(
              children: [
                Expanded(
                  flex: 1,
                  child: TextFormField(
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: "请求字段",
                    ),
                    // 校验用户名
                    validator: (v) {},
                  ),
                ),
                const SizedBox(width: 5),
                const Text(":"),
                const SizedBox(width: 10),
                Expanded(
                  flex: 3,
                  child: TextFormField(
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: "值",
                    ),
                    // 校验用户名
                    validator: (v) {},
                  ),
                ),
              ],
            )
          ],
        ),
      ),
      // floatingActionButtonLocation: FloatingActionButtonLocation.endDocked,
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          controller.rules.add(
              Rule(appName: "demo", packageName: "demo", callbackUrl: "demo"));
        },
        tooltip: 'Add match rules',
        icon: const Icon(
          UniconsLine.check,
        ),
        label: const Text(
          'Done',
        ),
      ),
    );
  }
}
