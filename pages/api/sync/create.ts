import { TempSyncKey } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import {
  createSyncKeyByUserId,
  createSyncSessionByUserId,
} from "../../../prisma/script";

type Data = {
  key: TempSyncKey | null;
  msg?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body;
  console.log("Body");
  console.log(body);
  // get totalToPair from request body
  const totalToPair: number = body.totalToPair;
  console.log(totalToPair);
  // Get data submitted in request's body.
  try {
    const userId: string | string[] | undefined = req.headers["user-id"];
    if (!userId || typeof userId != "string") {
      throw new Error(
        "No user id available or user id was of the wrong type (expected string)."
      );
    }
    // ensure we have required data
    if (totalToPair === undefined) {
      console.log("hereeee");
      throw new Error("Total number to pair not provided. Expected a number.");
    }
    try {
      // create temp key
      await createSyncKeyByUserId(userId);
      // create session
      // await createSyncSessionByUserId(userId, totalToPair);
    } catch (e) {
      console.log(e);
      throw new Error("Unable to create sync key.");
    }
    const keyResult = await createSyncKeyByUserId(userId);
    return res
      .status(200)
      .json({ key: keyResult, msg: "Session has been created." });
  } catch (e: any) {
    return res.status(400).json({ key: null, msg: `${e.message}` });
  }
}
