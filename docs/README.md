bios-info

# bios-info

## Table of contents

### Functions

- [findWindowsProductKeys](README.md#findwindowsproductkeys)

## Functions

### findWindowsProductKeys

▸ **findWindowsProductKeys**(`biosBuffer`): `string`[]

Extract the Windows product key from a BIOS dump.

**`Remarks`**

Whereas for previous Windows versions, the Windows product key on OEM systems was provided on a COA sticker, since
Windows 8, it is typically stored in the MSDM ACPI table in the BIOS/UEFI
(https://dellwindowsreinstallationguide.com/the-oem-product-key-and-oem-system-locked-preinstallation/).

This function tries to extract the key from a BIOS dump using two methods:

- Various sources (https://vlab.su/viewtopic.php?f=35&t=30952,
  https://www.alisaler.com/find-windows-key-from-bios-bin-file/) indicate that the key should be stored in the BIOS
  immediately following the marker `010000000000000001000000000000001d000000`. If we find this marker, we extract the
  following 29 characters (the length of a product key).
- As a backup, we also extract everything that looks like a product key in the dump using a regex.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `biosBuffer` | `Buffer` | The BIOS dump as a buffer. |

#### Returns

`string`[]

The product key(s) found in the BIOS dump.

#### Defined in

[index.ts:21](https://github.com/baltpeter/bios-info/blob/main/src/index.ts#L21)
