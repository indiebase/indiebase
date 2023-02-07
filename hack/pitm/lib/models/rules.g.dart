// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'rules.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Rule _$RuleFromJson(Map<String, dynamic> json) => Rule(
      appName: json['appName'] as String,
      packageName: json['packageName'] as String,
      callbackUrl: json['callbackUrl'] as String,
    );

Map<String, dynamic> _$RuleToJson(Rule instance) => <String, dynamic>{
      'appName': instance.appName,
      'packageName': instance.packageName,
      'callbackUrl': instance.callbackUrl,
    };
