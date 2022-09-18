var CryptoJS = require("crypto-js");
export default {
  // Encrypt
  encrypt(obj, key) {
    return CryptoJS.AES.encrypt(JSON.stringify(obj), key).toString();
  },
  // Decrypt
  decrypt(str, key) {
    const bytes = CryptoJS.AES.decrypt(str, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
}
