"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_1 = require("./middlewares/error");
const http_status_1 = __importDefault(require("http-status"));
const api_1 = __importDefault(require("./utils/api"));
const authors_1 = __importDefault(require("./routes/authors"));
const books_1 = __importDefault(require("./routes/books"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Test route (before main routes)
app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'pong' });
});
// Main API routes
// app.use('/api', routes); // Changed from app.use('/', routes)
app.use('/authors', authors_1.default);
app.use('/books', books_1.default);
// 404 handler (must come AFTER all other routes)
app.use((req, res, next) => {
    next(new api_1.default(http_status_1.default.NOT_FOUND, 'Not found'));
});
// Error handlers (must come after all other middleware)
app.use(error_1.errorConverter);
app.use(error_1.errorHandler);
exports.default = app;
