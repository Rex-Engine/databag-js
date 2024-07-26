"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = decrypt;
var crypto_1 = __importDefault(require("crypto"));
function decryptString(text, password) {
    var textParts = text.split(":");
    var firstPart = textParts.shift();
    if (!firstPart) {
        throw new Error("Invalid encrypted text");
    }
    var iv = Buffer.from(firstPart, "hex");
    var encryptedText = Buffer.from(textParts.join(":"), "hex");
    var decipher = crypto_1.default.createDecipheriv("aes-256-cbc", Buffer.from(password, "hex"), iv);
    var decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
function decrypt(config, password) {
    if (typeof config === "string") {
        return decryptString(config, password);
    }
    return Object.entries(config).reduce(function (acc, _a) {
        var key = _a[0], value = _a[1];
        acc[key] = decrypt(value, password);
        return acc;
    }, {});
}
//# sourceMappingURL=index.js.map