# bios-info

> Library for extracting data from UEFI BIOS dumps (currently only the Windows product key).

`bios-info` is a TypeScript library to extract data from UEFI BIOS dumps.

Currently, `bios-info` provides a single function (`findWindowsProductKeys()`) that can extract Windows 8+ product key from a BIOS dump. Whereas for previous Windows versions, the Windows product key on OEM systems was provided on a COA sticker, since Windows 8, it is typically stored in the [MSDM ACPI table in the BIOS/UEFI](https://dellwindowsreinstallationguide.com/the-oem-product-key-and-oem-system-locked-preinstallation/). It does so based on a [specific marker](https://vlab.su/viewtopic.php?f=35&t=30952) ([`010000000000000001000000000000001d000000`](https://www.alisaler.com/find-windows-key-from-bios-bin-file/)) that should indicate where the product key is stored in the BIOS. As a fallback, it also uses a regular expression to find anything that looks like a product key in the dump.

You can use this online through my [CyberChef instance](https://cyberchef.bn.al/#recipe=Extract_Windows_product_keys_from_BIOS_dump()).

## Installation

You can install bios-info using yarn or npm:

```sh
yarn add bios-info
# or `npm i bios-info`
```

## API reference

A full API reference can be found in the [`docs` folder](/docs/README.md).

## Example usage

Here is an example of how to use this library in TypeScript:

```ts
import { readFile } from 'fs/promises';
import { findWindowsProductKeys } from 'bios-info';

(async () => {
    const biosBuffer = await readFile('bios.bin');
    const keys = findWindowsProductKeys(biosBuffer);

    console.log(keys);
    // [ '3V66T-NKG7Y-8B7W4-X2WWD-8QK9K' ]
})();
```

## License

This code is licensed under the MIT license, see the [`LICENSE`](LICENSE) file for details.

Issues and pull requests are welcome! Please be aware that by contributing, you agree for your work to be licensed under an MIT license.
