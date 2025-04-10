"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("../prisma/client"); // Use relative path
var bcrypt = require("bcryptjs"); // Use * as import syntax
// --- Define the new admin credentials ---
var ADMIN_EMAIL = 'superadmin@example.com';
var ADMIN_PASSWORD = '123456';
var ADMIN_FULL_NAME = 'Super Admin'; // Optional: Add a full name
// ---
function createAdmin() {
    return __awaiter(this, void 0, void 0, function () {
        var existingUser, hashedPassword, newUser, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Attempting to create admin user: ".concat(ADMIN_EMAIL));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 8]);
                    return [4 /*yield*/, client_1.default.user.findUnique({
                            where: { email: ADMIN_EMAIL },
                        })];
                case 2:
                    existingUser = _a.sent();
                    if (existingUser) {
                        console.warn("Admin user with email ".concat(ADMIN_EMAIL, " already exists."));
                        // Optionally, you could update the existing one here if needed, 
                        // but for now, we'll just report it exists.
                        // Example update (uncomment if needed):
                        /*
                        console.log('Updating existing admin user...');
                        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
                        const updatedUser = await prisma.user.update({
                          where: { email: ADMIN_EMAIL },
                          data: {
                              password: hashedPassword,
                              role: 'ADMIN', // Ensure role is ADMIN
                              fullName: ADMIN_FULL_NAME
                          },
                        });
                        console.log(`Successfully updated existing admin user: ${updatedUser.email}`);
                        */
                        return [2 /*return*/];
                    }
                    // Hash the password
                    console.log("Hashing password: \"".concat(ADMIN_PASSWORD, "\""));
                    return [4 /*yield*/, bcrypt.hash(ADMIN_PASSWORD, 10)];
                case 3:
                    hashedPassword = _a.sent();
                    console.log("Generated hash: ".concat(hashedPassword.substring(0, 15), "..."));
                    return [4 /*yield*/, client_1.default.user.create({
                            data: {
                                fullName: ADMIN_FULL_NAME,
                                email: ADMIN_EMAIL,
                                password: hashedPassword,
                                role: 'ADMIN', // Explicitly set role to ADMIN
                            },
                        })];
                case 4:
                    newUser = _a.sent();
                    console.log("Successfully created new admin user: ".concat(newUser.email));
                    return [3 /*break*/, 8];
                case 5:
                    error_1 = _a.sent();
                    console.error('Error creating/updating admin user:', error_1);
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, client_1.default.$disconnect()];
                case 7:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
createAdmin();
