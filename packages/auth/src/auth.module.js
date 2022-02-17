"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthModule = void 0;
var jwt_1 = require("@nestjs/jwt");
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var config_1 = require("@nestjs/config");
var microservices_1 = require("@nestjs/microservices");
var auth_controller_1 = require("./auth.controller");
var auth_constants_1 = require("@/auth.constants");
var nestjs_nacos_1 = require("@letscollab/nestjs-nacos");
var path_1 = require("path");
var config_2 = require("@/config");
// import { CasbinModule } from '@letscollab/nestjs-casbin';
// import { NacosUtils } from '@letscollab/utils';
// import TypeormAdapter from 'typeorm-adapter';
var JwtPassportModule = passport_1.PassportModule.register({
    defaultStrategy: 'jwt'
});
var AuthModule = /** @class */ (function () {
    function AuthModule(nacosNamingService, nacosConfigService) {
        this.nacosNamingService = nacosNamingService;
        this.nacosConfigService = nacosConfigService;
    }
    AuthModule.prototype.onModuleInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dataId, group, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nacosNamingService.client.registerInstance(auth_constants_1.SERVICE_NAME, {
                            ip: '1.1.1.1',
                            port: 11111
                        })];
                    case 1:
                        _a.sent();
                        dataId = 'service-auth-mysql';
                        group = 'DEFAULT_GROUP';
                        return [4 /*yield*/, this.nacosConfigService.client.getConfig(dataId, group)];
                    case 2:
                        content = _a.sent();
                        console.log('current content => ' + content);
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthModule = __decorate([
        (0, common_1.Module)({
            imports: [
                JwtPassportModule,
                config_1.ConfigModule.forRoot({
                    envFilePath: (0, path_1.resolve)(__dirname, "../.env.".concat(process.env.NODE_ENV)),
                    isGlobal: true,
                    load: config_2["default"]
                }),
                nestjs_nacos_1.NacosNamingModule.forRootAsync({
                    inject: [config_1.ConfigService],
                    useFactory: function (config) {
                        return {
                            serverList: config.get('nacos.serverList'),
                            namespace: config.get('nacos.namespace')
                        };
                    }
                }),
                nestjs_nacos_1.NacosConfigModule.forRootAsync({
                    imports: [],
                    inject: [config_1.ConfigService],
                    useFactory: function (config) {
                        return {
                            serverAddr: config.get('nacos.serverList'),
                            namespace: config.get('nacos.namespace')
                        };
                    }
                }),
                // CasbinModule.forRootAsync({
                //   imports: [NacosConfigModule],
                //   useFactory: async (nacosConfigService: NacosConfigService) => {
                //     console.log(await nacosConfigService.client.getConfigs());
                //     const options = await NacosUtils.getConfig(
                //       nacosConfigService,
                //       NACOS_DATA_ID,
                //     );
                //     return {
                //       model: resolve(__dirname, '../model/auth.conf'),
                //       adapter: TypeormAdapter.newAdapter(options),
                //     };
                //   },
                //   inject: [NacosConfigService],
                // }),
                microservices_1.ClientsModule.register([
                    {
                        name: auth_constants_1.USER_CLIENT,
                        transport: microservices_1.Transport.TCP,
                        options: {
                            host: 'localhost',
                            port: 4010
                        }
                    },
                ]),
                jwt_1.JwtModule.registerAsync({
                    imports: [config_1.ConfigModule],
                    useFactory: function (config) { return ({
                        secret: config.get('jwt.secret'),
                        signOptions: { expiresIn: config.get('jwt.expire') }
                    }); },
                    inject: [config_1.ConfigService]
                }),
            ],
            controllers: [auth_controller_1["default"]],
            exports: [JwtPassportModule]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
