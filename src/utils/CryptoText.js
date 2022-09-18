var CryptoJS = require("crypto-js");
export default {
  // Encrypt
  encrypt(str, key) {
    return CryptoJS.AES.encrypt(str, key).toString();
  },
  // Decrypt
  decrypt(str, key) {
    const bytes = CryptoJS.AES.decrypt(str, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

}
