import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { communicationValidationSchema } from 'validationSchema/communications';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getCommunications();
    case 'POST':
      return createCommunication();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCommunications() {
    const data = await prisma.communication.findMany(convertQueryToPrismaUtil(req.query, 'communication'));
    return res.status(200).json(data);
  }

  async function createCommunication() {
    await communicationValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.communication.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
