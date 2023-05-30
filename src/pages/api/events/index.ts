import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { eventValidationSchema } from 'validationSchema/events';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getEvents();
    case 'POST':
      return createEvent();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEvents() {
    const data = await prisma.event.findMany(convertQueryToPrismaUtil(req.query, 'event'));
    return res.status(200).json(data);
  }

  async function createEvent() {
    await eventValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.event.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
