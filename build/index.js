"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const mongodb_1 = __importDefault(require("./mongodb"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/profiles", routes_1.default);
(0, mongodb_1.default)().then(() => {
    app.listen(3000, () => {
        console.log("The application is listening on port 3000!");
    });
});
