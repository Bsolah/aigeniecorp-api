import Organization from "../models/Organization";
import Invitation from "../models/Invitation";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import mongoose from "mongoose";

export const createOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.body;
    const user = await User.findById(req.user?.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      const organization = await Organization.create({
        name: req.body.name,
        creator: req.user?.id,
      });

      user.organizations.push({
        organization: organization._id as unknown as mongoose.Types.ObjectId,
        role: "creator",
      });
      await user?.save();
      res.status(201).json({ data: organization });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const addUserToOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, role } = req.body;
    const organization = await Organization.findById(req.params.id);
    if (!organization) {
      res.status(404).json({ message: "Organization not found" });
    } else {
      const checkUserPermission = await User.findOne({
        _id: req.user?.id,
        $or: [
          {
            organizations: {
              $elemMatch: { organization: req.params.id, role: "creator" },
            },
          },
          {
            organizations: {
              $elemMatch: { organization: req.params.id, role: "admin" },
            },
          },
        ],
      });
      if (!checkUserPermission) {
        res
          .status(401)
          .json({ message: "You are not authorized to perform this action" });
      } else {
        const user = await User.findOne({ email });
        if (!user) {
          res.status(404).json({ message: "User not found" });
        } else {
          const invitation = await Invitation.findOne({
            email,
            organization: req.params.id,
          });
          if (invitation) {
            res
              .status(400)
              .json({ message: "User already invited to organization" });
          } else {
            const newInvitation = new Invitation({
              email,
              organization: req.params.id,
              role,
            });
            await newInvitation.save();
            res.status(200).json({ data: organization, success: true });
          }
          // if (
          //   user.organizations.find(
          //     (org) => org.organization.toString() === req.params.id
          //   )
          // ) {
          //   res.status(400).json({ message: "User already in organization" });
          // } else {
          //   user.organizations.push({
          //     organization:
          //       organization._id as unknown as mongoose.Types.ObjectId,
          //     role,
          //   });

          //   await user.save();

          // organization.users.push(req.body.userId);
        }
      }
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getUserOrganizations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userOrg = await Organization.findOne({creator: req.user?.id})

    if (!userOrg) {
      res.status(404).json({ message: "Organization not found" });
    } else {
      res.status(200).json({ data: userOrg });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getOrganizationUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({
      "organizations.organization": req.params.id,
    }).select("username email");
    res.status(200).json({ data: users });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const removeUserFromOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    const organization = await Organization.findById(req.params.id);
    if (!organization) {
      res.status(404).json({ message: "Organization not found" });
    } else {
      const checkUserPermission = await User.findOne({
        _id: req.user?.id,
        $or: [
          {
            organizations: {
              $elemMatch: { organization: req.params.id, role: "creator" },
            },
          },
          {
            organizations: {
              $elemMatch: { organization: req.params.id, role: "admin" },
            },
          },
        ],
      });
      if (!checkUserPermission) {
        res
          .status(401)
          .json({ message: "You are not authorized to perform this action" });
      } else {
        const user = await User.findById(userId);
        if (!user) {
          res.status(404).json({ message: "User not found" });
        } else {
          if (
            user.organizations.find(
              (organization) =>
                organization.organization.toString() === req.params.id &&
                organization.role === "creator"
            )
          ) {
            res.status(400).json({
              message: "You cannot remove the creator of the organization",
            });
          } else {
            user.organizations = user.organizations.filter(
              (org) => org.organization.toString() !== req.params.id
            );
            await user.save();
            res.status(200).json({ data: organization });
          }
        }
      }
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
