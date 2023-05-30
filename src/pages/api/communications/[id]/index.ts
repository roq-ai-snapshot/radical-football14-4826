import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { communicationValidationSchema } from 'validationSchema/communications';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getCommunicationById();
    case 'PUT':
      return updateCommunicationById();
    case 'DELETE':
      return deleteCommunicationById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCommunicationById() {
    const data = await prisma.communication.findFirst(convertQueryToPrismaUtil(req.query, 'communication'));
    return res.status(200).json(data);
  }

  async function updateCommunicationById() {
    await communicationValidationSchema.validate(req.body);
    const data = await prisma.communication.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteCommunicationById() {
    const data = await prisma.communication.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
