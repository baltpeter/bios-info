/**
 * Extract the Windows product key from a BIOS dump.
 *
 * @remarks
 * Whereas for previous Windows versions, the Windows product key on OEM systems was provided on a COA sticker, since
 * Windows 8, it is typically stored in the MSDM ACPI table in the BIOS/UEFI
 * (https://dellwindowsreinstallationguide.com/the-oem-product-key-and-oem-system-locked-preinstallation/).
 *
 * This function tries to extract the key from a BIOS dump using two methods:
 *
 * - Various sources (https://vlab.su/viewtopic.php?f=35&t=30952,
 *   https://www.alisaler.com/find-windows-key-from-bios-bin-file/) indicate that the key should be stored in the BIOS
 *   immediately following the marker `010000000000000001000000000000001d000000`. If we find this marker, we extract the
 *   following 29 characters (the length of a product key).
 * - As a backup, we also extract everything that looks like a product key in the dump using a regex.
 *
 * @param biosBuffer The BIOS dump as a buffer.
 *
 * @returns The product key(s) found in the BIOS dump.
 */
export const findWindowsProductKeys = (biosBuffer: Buffer): string[] => {
    const keys = new Set<string>();

    const biosHex = biosBuffer.toString('hex');
    const biosAscii = biosBuffer.toString('ascii');

    // The key should come after this marker.
    const marker = '010000000000000001000000000000001d000000';
    let index = -1;
    while ((index = biosHex.indexOf(marker, index + 1)) !== -1) {
        // The key follows immediately after the marker and is 29 characters long.
        const asciiKeyIndex = (index + marker.length) / 2;
        keys.add(biosAscii.substring(asciiKeyIndex, asciiKeyIndex + 29));
    }

    // But just in case, we also extract everything that looks like a key.
    const keyRegex = /[A-Z0-9]{5}(-[A-Z0-9]{5}){4}/g;
    const regexMatches = biosAscii.match(keyRegex);
    if (regexMatches) for (const match of regexMatches) keys.add(match);

    return [...keys];
};
