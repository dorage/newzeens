import { z } from "@hono/zod-openapi";

/**
 * pagination 에 사용되는 쿼리
 *
 * @param firstPage - 1 페이지의 index 값 - default 0
 * @param required - 필수 여부 - default "false"
 * @returns
 */
const paginationPage = (props?: Partial<{ firstPage: number; required: "true" | "false" }>) => {
  const firstPage = props?.firstPage ?? 0;
  const required = props?.required ?? "false";

  return z.coerce
    .number()
    .optional()
    .default(firstPage)
    .transform((val) => {
      if (val < firstPage) return firstPage;
      return val;
    })
    .openapi({
      description: `${firstPage} 이 첫번쩨 페이지 입니다`,
      example: firstPage,
      required: [required],
    });
};

/**
 * pagination 에서 한 페이지 요소의 개수를 지정하기 위해 사용되는 쿼리
 *
 * @param limit - 1 페이지의 요소 개수 - default 10
 * @param required - 필수 여부 - default "false"
 * @returns
 */
const paginationLimit = (props?: Partial<{ limit: number; required: "true" | "false" }>) => {
  const limit = props?.limit ?? 10;
  const required = props?.required ?? "false";

  return z.coerce
    .number()
    .optional()
    .default(limit)
    .transform((val) => {
      if (val < limit) return limit;
      return val;
    })
    .openapi({
      description: `${limit} 이 불러올 최소 요소 개수 입니다`,
      example: limit,
      required: [required],
    });
};

export const queryObject = {
  paginationPage,
  paginationLimit,
};
