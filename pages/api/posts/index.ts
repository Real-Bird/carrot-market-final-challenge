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
      body: { tweet },
      session: { user },
    } = req;
    const tweetPost = await db.post.create({
      data: {
        content: tweet,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ ok: true, tweetPost });
  }
  if (req.method === "GET") {
    const {
      session: { user },
    } = req;
    const tweets = await db.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        fav: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            fav: true,
          },
        },
      },
    });
    res.json({ ok: true, tweets });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler, isPrivate: false })
);
