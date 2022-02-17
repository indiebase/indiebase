"use strict";
exports.__esModule = true;
var config_1 = require("@nestjs/config");
exports["default"] = (0, config_1.registerAs)('nacos', function () {
    return {
        namespace: process.env.NACOS_NAMESPACE,
        serverList: process.env.NACOS_SERVERLIST
    };
});
