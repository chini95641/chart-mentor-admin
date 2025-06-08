import { sendResponse } from '../utils/response.utils';
import { Request, Response } from 'express';
import mongoose, { ClientSession } from 'mongoose';
import { RequestError } from '../utils/globalErrorHandler';
import {
  handleAssignRole,
  handleDeleteUser,
  handleGetUsers,
  handleUserCreation,
  handleUserLogin,
  handleUpdateUser,
} from '../services/user.services';

export const create = async (req: Request, res: Response) => {
  const session: ClientSession = req.session!;

  try {
    const { user } = req.body;
    const newUser = await handleUserCreation(user, session);
    return sendResponse(res, 201, 'Created User Successfully', {
      user_id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
      phone_number: newUser.phone_number,
      address: newUser.address,
      membership: newUser.membership,
      expiration_date: newUser.expiration_date,
    });
  } catch (error) {
    throw new RequestError(`${error}`, 500);
  }
};

export const login = async (req: Request, res: Response) => {
  const session: ClientSession = req.session!;

  try {
    const { user } = req.body;
    const { token, id, name, email, role, avatar } = await handleUserLogin(
      user,
      session
    );
    return sendResponse(res, 200, 'Login Successfully', {
      user: { id, name, email, avatar, role },
      JWT_token: token,
    });
  } catch (error) {
    throw new RequestError(`${error}`, 500);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const session: ClientSession = req.session!;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const { users, total } = await handleGetUsers(page, limit, session);
    return sendResponse(res, 200, 'Get Users', {
      users,
      total,
      page,
      limit,
    });
  } catch (error) {
    throw new RequestError(`${error}`, 500);
  }
};

export const assignRole = async (req: Request, res: Response) => {
  const session: ClientSession = req.session!;

  try {
    const { user } = req.body;
    const updatedUser = await handleAssignRole(user, session);
    return sendResponse(res, 201, 'Role assigned', {
      id: updatedUser.id,
      role: updatedUser.role,
    });
  } catch (error) {
    throw new RequestError(`${error}`, 500);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const session: ClientSession = req.session!;
  const { id } = req.params;

  try {
    await handleDeleteUser(id, session);
    return sendResponse(res, 200, 'User deleted successfully');
  } catch (error) {
    throw new RequestError(`${error}`, 500);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const session: ClientSession = req.session!;
  const { id } = req.params;
  const { user } = req.body;

  try {
    const updatedUser = await handleUpdateUser(id, user, session);
    return sendResponse(res, 200, 'User updated successfully', {
      user: updatedUser,
    });
  } catch (error) {
    throw new RequestError(`${error}`, 500);
  }
};
