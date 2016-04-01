/// <reference path="typings/tsd.d.ts" />


var express = require('express');
var burton = express();
 
burton.listen(9000, () => {
    console.log('[BURTON] Started...');
});