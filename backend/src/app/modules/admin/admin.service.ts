import { Admin, Prisma, UserStatus } from "@prisma/client";
import { adminSerchableFild } from "./admin.constant";
import { calcuatePagenation } from "../../../helper/pagenationHelper";
import prisma from "../../../shared/prisma";

const getAllData = async (params: any, option: any) => {
  const { page, limit, skip, sortBy, sortOrder } = calcuatePagenation(option);
  console.log(option);
  const { serchTerm, ...filterData } = params;

  const andConditions: Prisma.AdminWhereInput[] = [];

  if (params.serchTerm) {
    andConditions.push({
      OR: adminSerchableFild.map((field) => ({
        [field]: {
          contains: params.serchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  andConditions.push({
    isDeleted: false,
  });

  const whereCondition: Prisma.AdminWhereInput = { AND: andConditions };

  const result = await prisma.admin.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "asc" },
  });
  const total = await prisma.admin.count({ where: whereCondition });
  return {
    meta: { page, limit, total },
    data: result,
  };
};

const getById = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUniqueOrThrow({
    where: { id, isDeleted: false },
  });
  if (!result) throw new Error("Admin not found");
  return result;
};

const updateById = async (
  id: string,
  payload: Partial<Admin>
): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: { id, isDeleted: false },
  });

  const result = await prisma.admin.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deletedById = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: { id },
  });
  const result = await prisma.$transaction(async (tsc) => {
    const deletedAdmin = await tsc.admin.delete({
      where: { id },
    });
    await tsc.user.delete({
      where: {
        email: deletedAdmin.email,
      },
    });

    return deletedAdmin;
  });
  return result;
};

const softDeleteAdminById = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({ where: { id, isDeleted: false } });

  const result = await prisma.$transaction(async (tsc) => {
    const deletedAdmin = await tsc.admin.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    await tsc.user.updateMany({
      where: {
        email: deletedAdmin.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return deletedAdmin;
  });

  return result;
};

export const adminService = {
  getAllData,
  getById,
  updateById,
  deletedById,
  softDeleteAdminById,
};
