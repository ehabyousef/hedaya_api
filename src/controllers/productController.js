// Users\WEB\Desktop\hedaya\src\controllers\productController.js
import expressAsyncHandler from "express-async-handler";
import Product from "../../src/models/Products.js";
import {
  deleteMultipleImages,
  handleImageUpdate,
  uploadMultipleImage,
  uploadSingleImage,
} from "../services/cloudinaryService.js";
import slugify from "slugify";
import mongoose from "mongoose";
import User from "../models/User.js";

export const createProduct = expressAsyncHandler(async (req, res) => {
  try {
    // Extract data from req.body
    const {
      name,
      description,
      price,
      discount,
      status,
      availableItems,
      category,
      subCategory,
    } = req.body;

    // Get user by token
    const createdBy = req.user.id;

    let defaultImage;
    let images = [];

    // Handle file uploads
    if (req.files && req.files.defaultImage) {
      defaultImage = await uploadSingleImage(
        req.files.defaultImage[0],
        "hedaya/products"
      );
    } else {
      return res.status(400).json({
        success: false,
        message: "Default image is required",
      });
    }

    if (req.files && req.files.images.length > 0) {
      images = await uploadMultipleImage(req.files.images, "hedaya/products");
    }

    // Create product data object
    const productData = {
      name,
      description,
      price: parseFloat(price),
      discount: discount ? parseFloat(discount) : 0,
      status: status || "new",
      availableItems: parseInt(availableItems),
      category,
      subCategory,
      createdBy,
      defaultImage,
      images,
    };

    // Create and save product
    const newProd = new Product(productData);
    const savedProduct = await newProd.save();

    res.status(201).json({
      status: "success",
      data: savedProduct,
    });
  } catch (error) {
    console.error("Product creation error:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

export const getAllProd = expressAsyncHandler(async (req, res) => {
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const skip = (page - 1) * limit;

  let products;

  if (page && limit) {
    products = await Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
  } else {
    products = await Product.find().sort({ createdAt: -1 });
  }
  res.status(200).json(products);
});

export const getSingleProd = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  // validate id format first
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid product id" });
  }

  const exist = await Product.findById(id)
    .populate("category", "name ")
    .populate("subCategory", "name ")
    .populate("createdBy", "userName email");

  if (!exist) {
    return res
      .status(404)
      .json({ status: "fail", message: "Product not found" });
  }

  return res.status(200).json({ status: "success", data: exist });
});

export const updateProduc = expressAsyncHandler(async (req, res) => {
  const exist = await Product.findById(req.params.id);
  if (!exist) {
    res.status(404).json({ status: "fail", message: "Product not found" });
  }
  const updateObj = {};

  if (req.body.name && req.body.name.trim() !== "") {
    updateObj.name = req.body.name;
    updateObj.slug = slugify(req.body.name);
  }

  if (req.body.description !== undefined)
    updateObj.description = req.body.description;
  if (req.body.price !== undefined)
    updateObj.price = parseFloat(req.body.price);
  if (req.body.discount !== undefined)
    updateObj.discount = parseFloat(req.body.discount);
  if (req.body.status !== undefined) updateObj.status = req.body.status;
  if (req.body.availableItems !== undefined)
    updateObj.availableItems = parseInt(req.body.availableItems, 10);
  if (req.body.category !== undefined) updateObj.category = req.body.category;
  if (req.body.subCategory !== undefined)
    updateObj.subCategory = req.body.subCategory;

  if (req.files?.defaultImage[0]) {
    const newImage = await handleImageUpdate(req.files.defaultImage[0], exist);
    updateObj.defaultImage = newImage;
  }

  if (req.files.images && req.files.length > 0) {
    const newImages = await uploadMultipleImage(
      req.files.images,
      "hedaya/products"
    );
    if (Array.isArray(exist.images) && exist.images.length > 0) {
      const ids = exist.map((x) => x?.id).filter(Boolean);
      if (ids) {
        await deleteMultipleImages(ids);
      }
    }
    updateObj.images = newImages;
  }

  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: updateObj,
    },
    { new: true, runValidators: true }
  ).populate("");
  res.status(200).json({ message: "product updated", result: updated });
});

export const deleteProduct = expressAsyncHandler(async (req, res) => {
  const exist = await Product.findByIdAndDelete(req.params.id);
  if (!exist) {
    res.status(404).json({ message: "product not found" });
  }
  res.status(200).json({ message: "product deleted" });
});

export const addToWishlist = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ status: "fail", message: "Product not found" });
  }

  const user = await User.findById(req.user.id);

  // Check if product already exists in wishlist
  const existingItem = user.wishlist.find(
    (item) => item.product.toString() === product._id.toString()
  );

  if (existingItem) {
    return res
      .status(400)
      .json({ status: "fail", message: "Product already in wishlist" });
  }

  // Add product to wishlist with correct structure
  user.wishlist.push({ product: product._id });
  await user.save();

  return res.status(200).json({
    success: true,
    message: "This product has been added to the wishlist",
    result: product,
  });
});

export const getWishlist = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate("wishlist.product");
  if (!user) {
    return res.status(404).json({ status: "fail", message: "user not found" });
  }
  const wishlist = user.wishlist || [];

  if (wishlist.length === 0) {
    return res.status(200).json({
      status: "success",
      message: "Wishlist is empty",
      result: [],
    });
  }

  res.status(200).json({
    status: "success",
    count: wishlist.length,
    result: wishlist,
  });
});

export const deleteWhishlist = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ status: "fail", message: "Product not found" });
  }

  const user = await User.findById(req.user.id);

  // Find the wishlist item to remove
  const wishlistItemIndex = user.wishlist.findIndex(
    (item) => item.product.toString() === product._id.toString()
  );

  if (wishlistItemIndex === -1) {
    return res
      .status(400)
      .json({ status: "fail", message: "Product not exist in wishlist" });
  }

  // Remove the item from wishlist
  user.wishlist.splice(wishlistItemIndex, 1);
  await user.save();

  return res.status(200).json({
    success: true,
    message: "This product has been removed from the wishlist",
  });
});

export const getFilteredProducts = expressAsyncHandler(async (req, res) => {
  const { categoryId, subCategoryId } = req.query;
  let { page, limit, sort, status } = req.query;

  // Build filter object dynamically
  const filter = {};

  // Add category filter if provided
  if (categoryId) {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid category id",
      });
    }
    filter.category = categoryId;
  }

  // Add subcategory filter if provided
  if (subCategoryId) {
    if (!mongoose.Types.ObjectId.isValid(subCategoryId)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid subcategory id",
      });
    }
    filter.subCategory = subCategoryId;
  }

  // Add status filter if provided
  if (status) {
    filter.status = status;
  }

  // Pagination
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const skip = (page - 1) * limit;

  // Sorting options
  let sortOption = { createdAt: -1 }; // default: newest first

  switch (sort) {
    case "price_asc":
      sortOption = { price: 1 };
      break;
    case "price_desc":
      sortOption = { price: -1 };
      break;
    case "name_asc":
      sortOption = { name: 1 };
      break;
    case "name_desc":
      sortOption = { name: -1 };
      break;
    case "oldest":
      sortOption = { createdAt: 1 };
      break;
    default:
      sortOption = { createdAt: -1 };
  }

  try {
    // Get filtered products with pagination
    const products = await Product.find(filter)
      .populate("category", "name slug")
      .populate("subCategory", "name slug")
      .populate("createdBy", "userName email")
      .skip(skip)
      .limit(limit)
      .sort(sortOption);

    // Get total count for pagination info
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    // Build filter description for response
    let filterDescription = "All products";
    if (categoryId && subCategoryId) {
      filterDescription = "Products filtered by category and subcategory";
    } else if (categoryId) {
      filterDescription = "Products filtered by category";
    } else if (subCategoryId) {
      filterDescription = "Products filtered by subcategory";
    }

    if (status) {
      filterDescription += ` with status: ${status}`;
    }

    if (products.length === 0) {
      return res.status(200).json({
        status: "success",
        message: `No products found matching the specified filters`,
        data: [],
        filters: {
          categoryId: categoryId || null,
          subCategoryId: subCategoryId || null,
          status: status || null,
          sort: sort || "newest",
        },
        pagination: {
          currentPage: page,
          totalPages: 0,
          totalProducts: 0,
          hasNextPage: false,
          hasPrevPage: false,
        },
      });
    }

    res.status(200).json({
      status: "success",
      message: filterDescription,
      count: products.length,
      data: products,
      filters: {
        categoryId: categoryId || null,
        subCategoryId: subCategoryId || null,
        status: status || null,
        sort: sort || "newest",
      },
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});
