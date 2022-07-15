import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import db from "@libs/server/db";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const post = await db.post.findUnique({
    where: {
      id: +id.toString(),
    },
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
  const isLike = Boolean(
    await db.fav.findFirst({
      where: {
        postId: post?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  res.json({
    ok: true,
    post,
    isLike,
  });
}

export default withApiSession(
  withHandler({ methods: ["GET"], handler, isPrivate: false })
);
