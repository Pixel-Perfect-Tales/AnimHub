import { axiosDefaults } from "../api";
export async function createCategory(data) {
  const response = await axiosDefaults.post(
    "api/v1/category/createCategory",
    data
  );
  return response;
}
export async function updateCategory(data) {
  const response = await axiosDefaults.post(
    "api/v1/category/updateCategory",
    data
  );
  return response;
}
export async function getAllCategories() {
  const response = await axiosDefaults.get("api/v1/category/getAllCategories");
  return response.data.categories;
}
