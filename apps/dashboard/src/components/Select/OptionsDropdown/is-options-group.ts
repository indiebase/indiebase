import { ComboboxParsedItem, ComboboxParsedItemGroup } from '@mantine/core';

export function isOptionsGroup(
  item: ComboboxParsedItem,
): item is ComboboxParsedItemGroup {
  return 'group' in item;
}
