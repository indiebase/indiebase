import 'package:get/get.dart';

import 'pages/add_rules/add_rules.dart';
import 'pages/index/index_binding.dart';
import 'pages/index/index.dart';

final routes = [
  GetPage(
    name: '/',
    page: () => const IndexPage(),
    bindings: [IndexBinding()],
    children: [
      GetPage(
        name: '/add_rules',
        page: () => const AddRulesPage(),
      ),
    ],
  ),
];
