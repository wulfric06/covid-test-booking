const crypto = require('crypto');

module.exports = {
  randomBytes: (size) => crypto.randomBytes(size).toString('hex'),
  uuid: (length) => crypto.randomBytes(length / 4).toString('hex') + Date.now() + crypto.randomBytes(length / 4).toString('hex'),
  encrypt: (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      process.env.CRYPTOALGO,
      Buffer.from(process.env.CRYPTOKEY),
      iv
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}.${encrypted.toString('hex')}`;
  },
  decrypt: (hash) => {
    const brakedValue = hash.split('.');
    const iv = Buffer.from(brakedValue.shift(), 'hex');
    const encryptedValue = Buffer.from(brakedValue.join('.'), 'hex');
    const decipher = crypto.createDecipheriv(
      process.env.CRYPTOALGO,
      Buffer.from(process.env.CRYPTOKEY),
      iv
    );
    let decrypted = decipher.update(encryptedValue);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
};
