# databag-js

Databag - your local credential management tool

## Why Databag?

Databag is a lightweight tool for you to easily encrypt and decrypt development
credentials for your JavaScript projects. It provides a CLI to help you create 
and update credentials, as well as a TypeScript library to be able to decrypt 
the credentials from your code.

## How to use?

Generally, you will need these before starting to use Databag:
- Credential file. This file stores all the encrypted key-value pairs.
- Password. This is a 64-byte Base62 string to encrypt and decrypt values.

### Encrypt an entire JSON file

`npx databag --file=decrypted.json --encrypt`

If you add `--output-file=encrypted.json`, the original `decrypted.json` will
remain unchanged.

### Decrypt an entire JSON file

`npx databag --file=encrypted.json --decrypt`

If you add `--output-file=decrypted.json`, the original `encrypted.json` will
remain unchanged.

### Add a credential to your credential file

`npx databag --file=my_keys.json --password=my_password_string --key=my_key --value=my_value`

### View a credential in your credential file

`npx databag --file=my_keys.json --password=my_password_string --key=my_key`

## Remove a credential from your credential file

This is not supported in the CLI, but you can always open the JSON file to
remove the key-value pair directly.