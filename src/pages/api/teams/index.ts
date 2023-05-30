import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { teamValidationSchema } from 'validationSchema/teams';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getTeams();
    case 'POST':
      return createTeam();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTeams() {
    const data = await prisma.team.findMany(convertQueryToPrismaUtil(req.query, 'team'));
    return res.status(200).json(data);
  }

  async function createTeam() {
    await teamValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.event?.length > 0) {
      const create_event = body.event;
      body.event = {
        create: create_event,
      };
    } else {
      delete body.event;
    }
    if (body?.player?.length > 0) {
      const create_player = body.player;
      body.player = {
        create: create_player,
      };
    } else {
      delete body.player;
    }
    const data = await prisma.team.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
