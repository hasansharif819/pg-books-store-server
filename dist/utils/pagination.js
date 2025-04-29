"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagingData = exports.getPagination = void 0;
const getPagination = (page, limit) => {
    const offset = (page - 1) * limit;
    return { offset, limit };
};
exports.getPagination = getPagination;
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: items } = data;
    const currentPage = page || 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, items, totalPages, currentPage };
};
exports.getPagingData = getPagingData;
