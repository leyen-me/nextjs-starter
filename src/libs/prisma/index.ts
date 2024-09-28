import { PrismaClient } from "@prisma/client";

/**
 * PrismaClient instance
 * 
 * This is the main database client for the application.
 * It provides an interface to interact with the database using Prisma ORM.
 * 
 * Usage:
 * - Import this instance in other files to perform database operations.
 * - Use it to query, create, update, or delete data in the database.
 * 
 * Note: It's important to use a single instance of PrismaClient across the application
 * to avoid opening too many database connections.
 */
export const prisma = new PrismaClient();