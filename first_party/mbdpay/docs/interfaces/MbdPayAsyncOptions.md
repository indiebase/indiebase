[@letscollab/mbdpay](../README.md) / [Exports](../modules.md) / MbdPayAsyncOptions

# Interface: MbdPayAsyncOptions<T\>

## Type parameters

| Name | Type                                           |
| :--- | :--------------------------------------------- |
| `T`  | [`MbdPayOptions`](../modules.md#mbdpayoptions) |

## Table of contents

### Properties

- [imports](MbdPayAsyncOptions.md#imports)
- [inject](MbdPayAsyncOptions.md#inject)

### Methods

- [useFactory](MbdPayAsyncOptions.md#usefactory)

## Properties

### imports

• `Optional` **imports**: (`Type`<`any`\> \| `DynamicModule` \| `Promise`<`DynamicModule`\> \| `ForwardReference`<`any`\>)[]

#### Defined in

[nest.ts:29](https://github.com/deskbtm-letscollab/mbdpay/blob/b88957d/src/nest.ts#L29)

---

### inject

• `Optional` **inject**: `any`[]

#### Defined in

[nest.ts:27](https://github.com/deskbtm-letscollab/mbdpay/blob/b88957d/src/nest.ts#L27)

## Methods

### useFactory

▸ **useFactory**(...`args`): `T`

Factory function that returns an instance of the provider to be injected.

#### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

#### Returns

`T`

#### Defined in

[nest.ts:25](https://github.com/deskbtm-letscollab/mbdpay/blob/b88957d/src/nest.ts#L25)
