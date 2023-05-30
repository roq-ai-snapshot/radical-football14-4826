import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { userValidationSchema } from 'validationSchema/users';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getUserById();
    case 'PUT':
      return updateUserById();
    case 'DELETE':
      return deleteUserById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getUserById() {
    const data = await prisma.user.findFirst(convertQueryToPrismaUtil(req.query, 'user'));
    return res.status(200).json(data);
  }

  async function updateUserById() {
    await userValidationSchema.validate(req.body);
    const data = await prisma.user.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteUserById() {
    const data = await prisma.user.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
