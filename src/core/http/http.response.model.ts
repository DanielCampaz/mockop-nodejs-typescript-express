export type HttpStatusResponse =
  | "successRequest"
  | "createdRequest"
  | "acceptedRequest"
  | "noContentRequest"
  | "movedPermanentlyRequest"
  | "notModifiedRequest"
  | "badRequest"
  | "unAuthorizedRequest"
  | "paymentRequiredRequest"
  | "forbiddenRequest"
  | "notFoundRequest"
  | "methodNotAllowedRequest"
  | "conflictRequest"
  | "goneRequest"
  | "unprocessableEntityRequest"
  | "tooManyRequestsRequest"
  | "internalServerErrorRequest"
  | "noImplementRequest"
  | "badGatewayRequest"
  | "serviceUnavailableRequest"
  | "gatewayTimeoutRequest";

export const HttpStatusMap: Record<HttpStatusResponse, number> = {
  // 2xx - Éxito
  successRequest: 200,
  createdRequest: 201,
  acceptedRequest: 202,
  noContentRequest: 204,

  // 3xx - Redirección
  movedPermanentlyRequest: 301,
  notModifiedRequest: 304,

  // 4xx - Errores del cliente
  badRequest: 400,
  unAuthorizedRequest: 401,
  paymentRequiredRequest: 402,
  forbiddenRequest: 403,
  notFoundRequest: 404,
  methodNotAllowedRequest: 405,
  conflictRequest: 409,
  goneRequest: 410,
  unprocessableEntityRequest: 422,
  tooManyRequestsRequest: 429,

  // 5xx - Errores del servidor
  internalServerErrorRequest: 500,
  noImplementRequest: 501,
  badGatewayRequest: 502,
  serviceUnavailableRequest: 503,
  gatewayTimeoutRequest: 504,
};
