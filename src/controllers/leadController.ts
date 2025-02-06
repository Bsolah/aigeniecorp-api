import { Request, Response, NextFunction } from "express";
import Lead from "../models/Lead";
// import sendMail from "../utils/mail";
// import welcomeMail from "../views/welcome";

export const createLead = async (req: Request, res: Response) => {
  try {
    const leadBody = req.body;
    const lead = new Lead(leadBody);
    await lead.save();
    // await sendMail(
    //   lead.email,
    //   "Welcome to our platform",
    //   welcomeMail(lead.firstName),
    // );
    // await sendMail(
    //   "bisola@niyis.co.uk",
    //   "New lead",
    //   welcomeMail(lead.firstName),
    // );
    res.status(201).send({ message: "Lead uploaded successfully", data: null });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getLeads = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.find({});

    if (!lead) {
      res.status(404).json({ error: "Lead not found" });
    } else {
      res.status(200).json({ success: true, data: lead });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
