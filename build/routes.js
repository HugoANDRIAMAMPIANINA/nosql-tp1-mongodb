"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const controller_1 = require("./api/profiles/controller");
let profilesRouter = express_1.default.Router();
profilesRouter.get("/", controller_1.getProfiles);
profilesRouter.get("/:id", controller_1.getProfileById);
profilesRouter.post("/", controller_1.createProfile);
profilesRouter.put("/:id", controller_1.updateProfile);
profilesRouter.delete("/:id", controller_1.deleteProfile);
profilesRouter.post("/:id/experience", controller_1.createExperience);
profilesRouter.delete("/:id/experience/:exp", controller_1.deleteExperience);
profilesRouter.post("/:id/skills", controller_1.createSkill);
profilesRouter.delete("/:id/skills/:skill", controller_1.deleteSkill);
profilesRouter.put("/:id/information", controller_1.updateInformation);
module.exports = profilesRouter;
