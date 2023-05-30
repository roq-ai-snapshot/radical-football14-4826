import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { performanceDataValidationSchema } from 'validationSchema/performance-data';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getPerformanceDataById();
    case 'PUT':
      return updatePerformanceDataById();
    case 'DELETE':
      return deletePerformanceDataById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPerformanceDataById() {
    const data = await prisma.performance_data.findFirst(convertQueryToPrismaUtil(req.query, 'performance_data'));
    return res.status(200).json(data);
  }

  async function updatePerformanceDataById() {
    await performanceDataValidationSchema.validate(req.body);
    const data = await prisma.performance_data.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deletePerformanceDataById() {
    const data = await prisma.performance_data.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
