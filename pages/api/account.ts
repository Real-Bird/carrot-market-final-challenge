import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";
import { withApiSession } from "@libs/server/withSession";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email } = req.body;
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

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
