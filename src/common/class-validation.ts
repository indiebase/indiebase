// export function IsGoodsNameOrPackageName(
//   validationOptions?: ValidationOptions,
// ) {
//   return function (object: Object, propertyName: string) {
//     registerDecorator({
//       name: 'IsGoodsNameOrPackageName',
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       validator: {
//         validate(value: any, args) {
//           const target = args.object as any;
//           if (target && Object.keys(target).length > 0) {
//             return !!target.goodsName || !!target.packageName;
//           } else {
//             return false;
//           }
//         },
//       },
//     });
//   };
// }
