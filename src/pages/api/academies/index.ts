import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { academyValidationSchema } from 'validationSchema/academies';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getAcademies();
    case 'POST':
      return createAcademy();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAcademies() {
    const data = await prisma.academy.findMany(convertQueryToPrismaUtil(req.query, 'academy'));
    return res.status(200).json(data);
  }

  async function createAcademy() {
    await academyValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.team?.length > 0) {
      const create_team = body.team;
      body.team = {
        create: create_team,
      };
    } else {
      delete body.team;
    }
    const data = await prisma.academy.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
