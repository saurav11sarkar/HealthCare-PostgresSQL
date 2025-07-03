import { adminService } from "./admin.service";
import { pick } from "../../../shared/pick";
import { adminFilterableFiels } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsych from "../../../shared/catchAsycn";

const getAllData = catchAsych(async (req, res) => {
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
});

const getById = catchAsych(async (req, res) => {
  const result = await adminService.getById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "admin data frech by Id",
    data: result,
  });
});

const updateById = catchAsych(async (req, res) => {
  const result = await adminService.updateById(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "updated data successfully",
    data: result,
  });
});

const deletedById = catchAsych(async (req, res) => {
  const result = await adminService.deletedById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "deleted data successfully",
    data: result,
  });
});

const softDeleteAdminById = catchAsych(async (req, res) => {
  const result = await adminService.softDeleteAdminById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "deleted data successfully",
    data: result,
  });
});

export const adminController = {
  getAllData,
  getById,
  updateById,
  deletedById,
  softDeleteAdminById,
};
