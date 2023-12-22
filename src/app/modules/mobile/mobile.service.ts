import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/paginationOption';
import { IMobile, IMobileFilterablefield } from './mobile.interface';
import { mobileSearchableField } from './mobile.constance';
import { Mobile } from './mobile.model';

const insertIntoDB = async (data: IMobile): Promise<IMobile> => {
  const result = await Mobile.create(data);
  return result;
};

const getAllData = async (
  filters: IMobileFilterablefield,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IMobile[]>> => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: mobileSearchableField.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  if (minPrice !== undefined) {
    andCondition.push({
      price: {
        $gte: Number(minPrice),
      },
    });
  }

  if (maxPrice !== undefined) {
    andCondition.push({
      price: {
        $lte: Number(maxPrice),
      },
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    if (sortBy === 'price') {
      sortCondition[sortBy] = sortOrder === 'asc' ? 1 : -1;
    } else {
      sortCondition[sortBy] = sortOrder;
    }
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await Mobile.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Mobile.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleData = async (id: string): Promise<IMobile | null> => {
  const result = await Mobile.findOne({ _id: id });
  return result;
};

export const MobileService = {
  insertIntoDB,
  getAllData,
  getSingleData,
};
