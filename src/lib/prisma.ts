import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "pg";

const { Pool } = pkg;

// এনভায়রনমেন্ট থেকে ডাটাবেজ ইউআরএল নেওয়া
const connectionString = process.env.DATABASE_URL;

// pg Pool তৈরি করা
const pool = new Pool({ connectionString });

// Prisma-এর জন্য pg অ্যাডাপ্টার ইনস্ট্যান্স তৈরি করা
const adapter = new PrismaPg(pool);

// অ্যাডাপ্টার সহ PrismaClient পাস করা (কাস্টম আউটপুট পাথ ঠিক রেখে)
const prisma = new PrismaClient({ adapter } as any);

export default prisma;
