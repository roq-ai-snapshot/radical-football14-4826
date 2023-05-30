import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { trainingPlanValidationSchema } from 'validationSchema/training-plans';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getTrainingPlans();
    case 'POST':
      return createTrainingPlan();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTrainingPlans() {
    const data = await prisma.training_plan.findMany(convertQueryToPrismaUtil(req.query, 'training_plan'));
    return res.status(200).json(data);
  }

  async function createTrainingPlan() {
    await trainingPlanValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.training_plan.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
