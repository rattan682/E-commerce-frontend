import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  addProductasync,
  getproductbyidAsyc,
  selectSelectedproduct,

} from "../AdminSlice";
import { selectcategories, updateproductasync } from "../../productlist/ProductListSlice";

const EditProduct = () => {
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const categories = useSelector(selectcategories);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate=useNavigate()
  const selectedproduct = useSelector(selectSelectedproduct);
  const onSubmit = (data) => {
    const newproduct = { ...data, id: selectedproduct.id };
    dispatch(updateproductasync(newproduct));
    navigate("/admin")
  };
  useEffect(() => {
    if(!selectedproduct){   dispatch(getproductbyidAsyc(id));}
 
    if (selectedproduct) {
        Object.entries(selectedproduct).forEach(([key, value]) => {
            setValue(key, value);
        });
    }
    
  }, [dispatch, id, selectedproduct, setValue]);
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <style>
        {`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield; /* Firefox */
        }
      `}
      </style>
      <h1 className="text-2xl font-bold mb-5">Edit Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">Title is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">Description is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            {...register("category", { required: true })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            {categories.map((e) => (
              <option value={e.value}>{e.label}</option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">Category is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="text"
            {...register("price", {
              required: true,
              pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
              validate: (value) => parseFloat(value) >= 0,
            })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">Price is required</p>
          )}
          {errors.price?.type === "pattern" && (
            <p className="text-red-500 text-sm">Invalid price format</p>
          )}
          {errors.price?.type === "validate" && (
            <p className="text-red-500 text-sm">Price must be non-negative</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            type="text"
            {...register("stock", {
              required: true,
              pattern: /^[0-9]*$/,
              validate: (value) => parseInt(value, 10) >= 0,
            })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm">Stock is required</p>
          )}
          {errors.stock?.type === "pattern" && (
            <p className="text-red-500 text-sm">Invalid stock format</p>
          )}
          {errors.stock?.type === "validate" && (
            <p className="text-red-500 text-sm">Stock must be non-negative</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="url"
            {...register("images", {
              required: true,
            })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">Image is required</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Thumnail
          </label>
          <input
            type="url"
            {...register("thumbnail", {
              required: true,
            })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.thumbnail && (
            <p className="text-red-500 text-sm">Thumnail is required</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Weight
          </label>
          <input
            type="text"
            {...register("weight", {
              required: true,
              pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
              validate: (value) => parseFloat(value) >= 0,
            })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.weight && (
            <p className="text-red-500 text-sm">Weight is required</p>
          )}
          {errors.weight?.type === "pattern" && (
            <p className="text-red-500 text-sm">Invalid weight format</p>
          )}
          {errors.weight?.type === "validate" && (
            <p className="text-red-500 text-sm">Weight must be non-negative</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Dimensions (Width, Height, Depth)
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              {...register("dimensions.width", {
                required: true,
                pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
                validate: (value) => parseFloat(value) >= 0,
              })}
              placeholder="Width"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="text"
              {...register("dimensions.height", {
                required: true,
                pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
                validate: (value) => parseFloat(value) >= 0,
              })}
              placeholder="Height"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="text"
              {...register("dimensions.depth", {
                required: true,
                pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
                validate: (value) => parseFloat(value) >= 0,
              })}
              placeholder="Depth"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          {errors.dimensions?.width && (
            <p className="text-red-500 text-sm">Width is required</p>
          )}
          {errors.dimensions?.height && (
            <p className="text-red-500 text-sm">Height is required</p>
          )}
          {errors.dimensions?.depth && (
            <p className="text-red-500 text-sm">Depth is required</p>
          )}
          {errors.dimensions?.width?.type === "pattern" && (
            <p className="text-red-500 text-sm">Invalid width format</p>
          )}
          {errors.dimensions?.height?.type === "pattern" && (
            <p className="text-red-500 text-sm">Invalid height format</p>
          )}
          {errors.dimensions?.depth?.type === "pattern" && (
            <p className="text-red-500 text-sm">Invalid depth format</p>
          )}
          {errors.dimensions?.width?.type === "validate" && (
            <p className="text-red-500 text-sm">Width must be non-negative</p>
          )}
          {errors.dimensions?.height?.type === "validate" && (
            <p className="text-red-500 text-sm">Height must be non-negative</p>
          )}
          {errors.dimensions?.depth?.type === "validate" && (
            <p className="text-red-500 text-sm">Depth must be non-negative</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <input
            type="text"
            {...register("rating", {
              required: true,
              pattern: /^[0-5](\.[0-9]{1,2})?$/,
              validate: (value) =>
                parseFloat(value) >= 0 && parseFloat(value) <= 5,
            })}
            placeholder="Rating (0-5)"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.rating && (
            <p className="text-red-500 text-sm">Rating is required</p>
          )}
          {errors.rating?.type === "pattern" && (
            <p className="text-red-500 text-sm">Invalid rating format</p>
          )}
          {errors.rating?.type === "validate" && (
            <p className="text-red-500 text-sm">
              Rating must be between 0 and 5
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Discount Percentage
          </label>
          <input
            type="text"
            {...register("discountPercentage", {
              required: true,
              pattern: /^(100(\.00?)?|[0-9]?[0-9](\.[0-9]{1,2})?)$/,
              validate: (value) =>
                parseFloat(value) >= 0 && parseFloat(value) <= 100,
            })}
            placeholder="Discount Percentage (0-100)"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.discountPercentage && (
            <p className="text-red-500 text-sm">
              Discount Percentage is required
            </p>
          )}
          {errors.discountPercentage?.type === "pattern" && (
            <p className="text-red-500 text-sm">
              Invalid discount percentage format
            </p>
          )}
          {errors.discountPercentage?.type === "validate" && (
            <p className="text-red-500 text-sm">
              Discount Percentage must be between 0 and 100
            </p>
          )}
        </div>
        <Link
          to={"/admin"}
          className="inline-flex me-5 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
