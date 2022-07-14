import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import db from "@libs/server/db";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, name } = req.body;
  const newAccount = await db.user.create({
    data: {
      name,
      email,
    },
  });
  return res.json({
    ok: true,
    newAccount,
  });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
