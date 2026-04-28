// for validating the watchlistschema data using zod schema validation library

import {z} from "zod";

export const validateSigupSchema = z.object({
  name: z.string()
  .min(1, "name is required"),
  email: z.string()
    .trim()
    .min(1, "Email is required")
    .email("please provide valid email")
    .toLowerCase(),
  password: z.string()
    .min(1, "password is required")
    .min(6, "password must be atleast 6 characters"),
});

//for login validation schema
export const validateLoginSchema = z.object({
  email: z.string()
    .trim()
    .email("please provide valid email")
    .toLowerCase(),
  password: z.string()
    .min(1, "password is required")
    .min(6, "password must be atleast 6 characters"),
})