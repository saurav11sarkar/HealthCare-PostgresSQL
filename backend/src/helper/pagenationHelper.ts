type IOption = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};

type IOptionResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

export const calcuatePagenation = (option: IOption): IOptionResult => {
  const page: number = option.page ? Number(option.page) : 1;
  const limit: number = option.limit ? Number(option.limit) : 10;
  const skip: number = (page - 1) * limit;

  const sortBy: string = option.sortBy ? option.sortBy : "createdAt";
  const sortOrder: string = option.sortOrder ? option.sortOrder : "asc";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
