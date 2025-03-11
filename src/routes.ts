import express from "express";
import {
  createExperience,
  createProfile,
  createSkill,
  deleteExperience,
  deleteProfile,
  deleteSkill,
  getProfileById,
  getProfiles,
  updateInformation,
  updateProfile,
} from "./api/profiles/controller";

let profilesRouter = express.Router();

profilesRouter.get("/", getProfiles);

profilesRouter.get("/:id", getProfileById);

profilesRouter.post("/", createProfile);

profilesRouter.put("/:id", updateProfile);

profilesRouter.delete("/:id", deleteProfile);

profilesRouter.post("/:id/experience", createExperience);

profilesRouter.delete("/:id/experience/:exp", deleteExperience);

profilesRouter.post("/:id/skills", createSkill);

profilesRouter.delete("/:id/skills/:skill", deleteSkill);

profilesRouter.put("/:id/information", updateInformation);

export = profilesRouter;
