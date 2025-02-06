# Tough Cookie Patched

This repository contains a **patched version** of [Tough Cookie](https://github.com/salesforce/tough-cookie) addressing **prototype pollution vulnerabilities** found in version `2.5.0`.

## Changes

### `lib/memstore.js`

- **MemoryCookieStore Update**:
  - Used `Object.create(null)` to prevent prototype pollution in the cookie jar. This ensures the internal `idx` object does not inherit from `Object.prototype`, which would otherwise allow unintended properties (such as `__proto__`).
  
  **Important Changes**:
  - The patch affects the **constructor** and the **`removeAllCookies()`** function, where `idx` is initialized.
  - The patch prevents prototype pollution by ensuring that **empty objects** (`{}`) used for the cookie jar (`idx`) are **not polluted**.


### `test/prototype_pollution_test.js`

- **Security Test Cases**:
  - Added a test case for **prototype pollution** during cookie setting in the constructor.
    - In the original version, the `idx` property (the **cookie jar**) was set to `{}`, which made it vulnerable to prototype pollution. This test ensures that the vulnerability is fixed.
  - Added a test case for **prototype pollution** during cookie resetting after it was handled in the constructor. 
    - The **`removeAllCookies()`** function reinitializes `idx` to `{}`, and the test ensures that this operation doesn’t reintroduce the vulnerability.

### `./index.js`

- **Example Code**:
  - To demonstrate the vulnerability and the patch, run the following commands:
  
    1. **Unpatched version**:
       ```bash
       npm install tough-cookie@2.5.0 && node index.js
       ```
       This should output:
       ```
       EXPLOITED SUCCESSFULLY
       ```
       
    2. **Patched version**:
       ```bash
       npm install ./tough-cookie-2.5.0-PATCHED.tgz && node index.js
       ```
       This should output:
       ```
       EXPLOIT FAILED
       ```

### Summary of Fixes:

- **Fixed prototype pollution** in the `tough-cookie` package.
- Used **`Object.create(null)`** to prevent contamination from `Object.prototype` in `idx`.
- Added **unit tests** to ensure the vulnerability is no longer present.
- Updated the version to `2.5.0-PATCHED`.
