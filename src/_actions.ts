"use server";

import {
  CreateFormFields,
  FormFields,
  createUserschema,
  loginUserSchema,
} from "./types/users/types";
import prisma from "./lib/db";

export const createUsers = async (clientData: CreateFormFields) => {
  try {
    const validFields = createUserschema.safeParse(clientData);

    if (!validFields.success) {
      const errors = validFields.error.errors.map((error) => ({
        field: error.path.join("."),
        message: error.message,
      }));
      return { success: false, errors };
    }

    const findUser = await prisma.user.findUnique({
      where: { username: validFields.data.username },
    });

    if (findUser) {
      return { success: false, message: "User already exists" };
    }

    const users = await prisma.user.create({
      data: {
        username: validFields.data.username,
        password: validFields.data.password,
      },
    });

    return { success: true, users };
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (clientData: FormFields) => {
  try {
    const validFields = loginUserSchema.safeParse(clientData);

    if (!validFields.success) {
      const errors = validFields.error.errors.map((error) => ({
        field: error.path.join("."),
        message: error.message,
      }));
      return { success: false, errors };
    }

    const findUser = await prisma.user.findUnique({
      where: { username: validFields.data.username },
    });

    if (!findUser) {
      return { success: false, message: "User cannot be found" };
    }

    if (validFields.data.password !== findUser.password) {
      return { success: false, message: "Password do not match" };
    }

    return { success: true, findUser };
  } catch (error) {
    console.log(error);
  }
};
