[@letscollab/mbdpay](../README.md) / [Exports](../modules.md) / MbdPayService

# Class: MbdPayService

## Implements

- `OnModuleDestroy`

## Table of contents

### Constructors

- [constructor](MbdPayService.md#constructor)

### Properties

- [#client](MbdPayService.md##client)

### Accessors

- [client](MbdPayService.md#client)

### Methods

- [onModuleDestroy](MbdPayService.md#onmoduledestroy)

## Constructors

### constructor

• **new MbdPayService**(`options?`)

#### Parameters

| Name       | Type                                           |
| :--------- | :--------------------------------------------- |
| `options?` | [`MbdPayOptions`](../modules.md#mbdpayoptions) |

#### Defined in

[nest.ts:55](https://github.com/deskbtm-letscollab/mbdpay/blob/b88957d/src/nest.ts#L55)

## Properties

### #client

• `Private` **#client**: [`MbdPay`](MbdPay.md)

#### Defined in

[nest.ts:53](https://github.com/deskbtm-letscollab/mbdpay/blob/b88957d/src/nest.ts#L53)

## Accessors

### client

• `get` **client**(): [`MbdPay`](MbdPay.md)

#### Returns

[`MbdPay`](MbdPay.md)

#### Defined in

[nest.ts:66](https://github.com/deskbtm-letscollab/mbdpay/blob/b88957d/src/nest.ts#L66)

## Methods

### onModuleDestroy

▸ **onModuleDestroy**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

OnModuleDestroy.onModuleDestroy

#### Defined in

[nest.ts:62](https://github.com/deskbtm-letscollab/mbdpay/blob/b88957d/src/nest.ts#L62)
