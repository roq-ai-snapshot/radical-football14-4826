import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { userValidationSchema } from 'validationSchema/users';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getUsers();
    case 'POST':
      return createUser();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getUsers() {
    const data = await prisma.user.findMany(convertQueryToPrismaUtil(req.query, 'user'));
    return res.status(200).json(data);
  }

  async function createUser() {
    await userValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.academy?.length > 0) {
      const create_academy = body.academy;
      body.academy = {
        create: create_academy,
      };
    } else {
      delete body.academy;
    }
    if (body?.communication_communication_receiver_idTouser?.length > 0) {
      const create_communication_communication_receiver_idTouser = body.communication_communication_receiver_idTouser;
      body.communication_communication_receiver_idTouser = {
        create: create_communication_communication_receiver_idTouser,
      };
    } else {
      delete body.communication_communication_receiver_idTouser;
    }
    if (body?.communication_communication_sender_idTouser?.length > 0) {
      const create_communication_communication_sender_idTouser = body.communication_communication_sender_idTouser;
      body.communication_communication_sender_idTouser = {
        create: create_communication_communication_sender_idTouser,
      };
    } else {
      delete body.communication_communication_sender_idTouser;
    }
    if (body?.event?.length > 0) {
      const create_event = body.event;
      body.event = {
        create: create_event,
      };
    } else {
      delete body.event;
    }
    if (body?.player_player_parent_idTouser?.length > 0) {
      const create_player_player_parent_idTouser = body.player_player_parent_idTouser;
      body.player_player_parent_idTouser = {
        create: create_player_player_parent_idTouser,
      };
    } else {
      delete body.player_player_parent_idTouser;
    }
    if (body?.player_player_user_idTouser?.length > 0) {
      const create_player_player_user_idTouser = body.player_player_user_idTouser;
      body.player_player_user_idTouser = {
        create: create_player_player_user_idTouser,
      };
    } else {
      delete body.player_player_user_idTouser;
    }
    if (body?.team?.length > 0) {
      const create_team = body.team;
      body.team = {
        create: create_team,
      };
    } else {
      delete body.team;
    }
    if (body?.training_plan?.length > 0) {
      const create_training_plan = body.training_plan;
      body.training_plan = {
        create: create_training_plan,
      };
    } else {
      delete body.training_plan;
    }
    const data = await prisma.user.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
