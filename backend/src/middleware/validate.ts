import { RequestHandler } from "express";
import { ZodTypeAny } from "zod";

interface Schemas {
  body?: ZodTypeAny;
  query?: ZodTypeAny;
  params?: ZodTypeAny;
}

// Parses and replaces req.body / req.query / req.params with the validated
// values. Zod errors are turned into 400 responses by the error handler.
export const validate =
  ({ body, query, params }: Schemas): RequestHandler =>
  (req, _res, next) => {
    try {
      if (body) req.body = body.parse(req.body ?? {});
      if (query) req.query = query.parse(req.query);
      if (params) req.params = params.parse(req.params);
      next();
    } catch (error) {
      next(error);
    }
  };
