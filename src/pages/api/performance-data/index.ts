import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { performanceDataValidationSchema } from 'validationSchema/performance-data';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getPerformanceData();
    case 'POST':
      return createPerformanceData();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPerformanceData() {
    const data = await prisma.performance_data.findMany(convertQueryToPrismaUtil(req.query, 'performance_data'));
    return res.status(200).json(data);
  }

  async function createPerformanceData() {
    await performanceDataValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.performance_data.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
