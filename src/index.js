import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { errorHandler, NotFound } from "./middlewares/errorHandler.js";
import { registerRoute } from "./routes/auth.js";
import { categRoute } from "./routes/category.js";
import { productRoute } from "./routes/product.js";
import { subCateg } from "./routes/subCategory.js";
import { passRoute } from "./routes/password.js";
import { userRoute } from "./routes/user.js";
import { cartRoute } from "./routes/cart.js";
import { seedDatabase } from "./data.js";

const app = express();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "../images")));

// Routes
app.use("/api/auth", registerRoute);
app.use("/api/password", passRoute);
app.use("/api/users", userRoute);
app.use("/api/categories", categRoute);
app.use("/api/subcategories", subCateg);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});
// In your routes file
app.post("/api/seed", async (req, res) => {
  await seedDatabase();
  res.json({ message: "Database seeded successfully!" });
});
// Error handling (should be last)
app.use(NotFound);
app.use(errorHandler);

export default app;
