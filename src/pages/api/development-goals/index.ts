import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { developmentGoalValidationSchema } from 'validationSchema/development-goals';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getDevelopmentGoals();
    case 'POST':
      return createDevelopmentGoal();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDevelopmentGoals() {
    const data = await prisma.development_goal.findMany(convertQueryToPrismaUtil(req.query, 'development_goal'));
    return res.status(200).json(data);
  }

  async function createDevelopmentGoal() {
    await developmentGoalValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.development_goal.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
