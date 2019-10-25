(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('uranus-web3'), require('buffer'), require('ethers'), require('bignumber.js')) :
    typeof define === 'function' && define.amd ? define(['uranus-web3', 'buffer', 'ethers', 'bignumber.js'], factory) :
    (global = global || self, factory(global.uranus, global.buffer, global.ethers, global.BigNumber));
}(this, function (uranus, buffer, ethers, BigNumber) { 'use strict';

    BigNumber = BigNumber && BigNumber.hasOwnProperty('default') ? BigNumber['default'] : BigNumber;

    var nodeInfo = 'http://127.0.0.1:8000';
    console.log(nodeInfo);
    uranus.utils.default.setEndpoint(nodeInfo);
    var tx = {};
    tx.type = 0;
    tx.nonce = 1;
    tx.gasPrice = 10000;
    tx.tos = ['0xC08B5542D177ac6686946920409741463a15dDdB', '0x970e8128ab834e8eac17ab8e3812f010678cf791'];
    tx.gasLimit = 1000;
    tx.value = 10000;
    tx.payload = buffer.Buffer.from('sign tx test');
    var priv = '0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658';
    var signature = '0x20ceb32d94ea10f50425233e5d355fa05337d23b50646839c6d0689acdd054557f867ab7e187863a6841efbc19d03ba38762fe24d49815185d5a3f4a7b196ac101';
    var sig = uranus.singer.signTransaction(tx, priv);
    var address = '0xC08B5542D177ac6686946920409741463a15dDdB';
    console.log('sig', sig);
    if (sig !== signature) {
      console.error('err sig', sig);
    }
    var addr = uranus.singer.recoverSignedTransaction(tx, sig);
    console.log('addr', addr);
    if (addr !== address) {
      console.error('err addr', addr);
    }
    console.log('--------------erc20------------');
    var payload = '0x';
    payload += uranus.utils.default.getContractPayload('transfer', ['address', 'uint256'], ['0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be', '10']);
    console.log('payload ', payload);
    console.log('--------------erc20------------');
    tx.type = 0;
    tx.nonce = 321880;
    tx.gasPrice = 310000000000000;
    tx.tos = ['0x2b818b6569af3bf2a3f318cf72c06b606a4d132c'];
    tx.gasLimit = 2000000;
    tx.value = 500000000000000000000;
    var priv1 = '0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658';
    var sig1 = uranus.singer.signTransaction(tx, priv1);
    console.log('0000000', sig1);
    var signature1 = uranus.utils.default.hex2Bytes(sig1);
    var txBytes = uranus.utils.default.ethUtil.rlp.encode([tx.type, tx.nonce, tx.gasPrice, tx.gasLimit, tx.tos, tx.value, tx.payload, signature1]);
    console.log('txBytes', '0x' + txBytes.toString('hex'));
    var privateKey = '0x3141592653589793238462643383279502884197169399375105820974944592';
    var wallet = new ethers.Wallet(privateKey);
    var password = 'password123';
    console.time('encrypt');
    var options = {
      scrypt: {
        N: 1 << 15
      }
    };
    var encryptPromise = wallet.encrypt(password, options);
    encryptPromise.then(function (json) {
      console.timeEnd('encrypt');
      console.log(json);
    });
    console.log('-------------------big.number--------------');
    var n = 5999999999999999580200;
    var renderValue = new BigNumber(n.toString());
    renderValue = renderValue.shiftedBy(18 * -1);
    console.log('----->', renderValue.toString(10));

}));
