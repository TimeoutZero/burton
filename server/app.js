/// <reference path="typings/tsd.d.ts" />


var express = require('express'),
    burton  = express();

burton.use(require('./controllers'));
 
var PORT = process.env.PORT || 42000;

burton.listen(PORT, () => {
    console.log(`[BURTON] Started... PORT: ${PORT}`);
});