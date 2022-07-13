import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email } = req.body;
  const foundEmail = await client.user.findUnique({
    where: {
      email,
    },
  });
  if (!foundEmail) return res.status(404).end();
  req.session.user = {
    id: foundEmail.id,
  };
  await req.session.save();
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
