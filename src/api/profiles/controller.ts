import { Request, Response } from "express";
import User from "./model";
import { Error, Types } from "mongoose";

export const getProfiles = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { skills, location, name, company } = req.query;

    // Initialize the query filter
    const filter: any = {};

    if (typeof skills === "string") {
      filter.skills = { $in: skills.split(",") }; // filter if a user has at least 1 skill of the list
    }

    if (typeof location === "string") {
      filter["information.location"] = { $eq: location };
    }

    if (typeof name === "string") {
      filter.name = { $eq: name };
    }

    if (typeof company === "string") {
      filter["experience.company"] = { $eq: company };
    }

    if (typeof company === "string") {
      filter["experience.company"] = { $eq: company };
    }

    const users = await User.find(filter);
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const getProfileById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

export const createProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }

    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

export const deleteProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const deletedUser = await User.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
    });
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(204);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const createExperience = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { title, company, dates, description } = req.body;
    if (!title || !company || !dates?.start || !dates?.end) {
      return res
        .status(400)
        .json({ error: "Title, company, start and end dates are required." });
    }

    const newExperience = {
      _id: new Types.ObjectId(),
      title,
      company,
      dates: {
        start: new Date(dates.start),
        end: new Date(dates.end),
      },
      description: description || "",
    };

    user.experience.push(newExperience);

    await user.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Invalid data" });
  }
};

export const deleteExperience = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.experience.pull({ _id: req.params.exp });

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const createSkill = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.skills.push(req.body.skill);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
};

export const deleteSkill = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.skills = user.skills.filter((skill) => skill !== req.params.skill);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateInformation = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.information = req.body.information;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
};
