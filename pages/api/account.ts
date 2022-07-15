import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";
import { withApiSession } from "@libs/server/withSession";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const {
      body: { email },
    } = req;
    console.log(email);
    const foundEmail = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!foundEmail) return res.json({ ok: false, error: true });
    req.session.user = {
      id: foundEmail.id,
    };
    await req.session.save();
    res.json({ ok: true });
  }
  if (req.method === "GET") {
    const profile = await db.user.findUnique({
      where: {
        id: req.session.user?.id,
      },
    });
    res.json({ ok: true, profile });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler, isPrivate: false })
);
