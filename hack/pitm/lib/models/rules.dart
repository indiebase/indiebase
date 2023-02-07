import 'package:json_annotation/json_annotation.dart';

part 'rules.g.dart';

@JsonSerializable()
class Rule {
  final String appName;
  final String packageName;
  final String callbackUrl;

  Rule({
    required this.appName,
    required this.packageName,
    required this.callbackUrl,
  });

  factory Rule.fromJson(Map<String, dynamic> json) => _$RuleFromJson(json);

  Map<String, dynamic> toJson() => _$RuleToJson(this);
}



