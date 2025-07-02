import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";
import { pick } from "../../../shared/pick";
import { adminFilterableFiels } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const getAllData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter = pick(req.query, adminFilterableFiels);
    const option = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = await adminService.getAllData(filter, option);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Get Data Admin",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminService.getById(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "admin data frech by Id",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminService.updateById(req.params.id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "updated data successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const deletedById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminService.deletedById(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "deleted data successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const softDeleteAdminById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await adminService.softDeleteAdminById(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "deleted data successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const adminController = {
  getAllData,
  getById,
  updateById,
  deletedById,
  softDeleteAdminById,
};
