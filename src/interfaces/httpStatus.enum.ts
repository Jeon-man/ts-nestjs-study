export enum SuccessStatusCode {
  /**
   * @description This interim response indicates that everything so far is OK and that the client should continue with the request or ignore it if it is already finished.
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.2.1 Official Documentation}
   */
  CONTINUE = 100,

  /**
   * @description This code is sent in response to an Upgrade request header by the client, and indicates the protocol the server is switching too.
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.2.2 Official Documentation}
   */
  SWITCHING_PROTOCOLS = 101,

  /**
   * @description This code indicates that the server has received and is processing the request, but no response is available yet.
   * @see {@link https://tools.ietf.org/html/rfc2518#section-10.1 Official Documentation}
   */
  PROCESSING = 102,

  /**
   * @description The request has succeeded. The meaning of a success varies depending on the HTTP method:
   * - GET: The resource has been fetched and is transmitted in the message body.
   * - HEAD: The entity headers are in the message body.
   * - POST: The resource describing the result of the action is transmitted in the message body.
   * - TRACE: The message body contains the request message as received by the server
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.3.1 Official Documentation}
   */
  OK = 200,

  /**
   * @description The request has succeeded and a new resource has been created as a result of it. This is typically the response sent after a PUT request.
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.3.2 Official Documentation}
   */
  CREATED = 201,

  /**
   * @description The request has been received but not yet acted upon. It is non-committal, meaning that there is no way in HTTP to later send an asynchronous response indicating the outcome of processing the request. It is intended for cases where another process or server handles the request, or for batch processing.
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.3.3 Official Documentation}
   */
  ACCEPTED = 202,

  /**
   * @description This response code means returned meta-information set is not exact set as available from the origin server, but collected from a local or a third party copy. Except this condition, 200 OK response should be preferred instead of this response.
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.3.4 Official Documentation}
   */
  NON_AUTHORITATIVE_INFORMATION = 203,

  /**
   * @description There is no content to send for this request, but the headers may be useful. The user-agent may update its cached headers for this resource with the new ones.
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.3.5 Official Documentation}
   */
  NO_CONTENT = 204,

  /**
   * @description This response code is sent after accomplishing request to tell user agent reset document view which sent this request.
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.3.6 Official Documentation}
   */
  RESET_CONTENT = 205,

  /**
   * @description This response code is used because of range header sent by the client to separate download into multiple streams.
   * @see {@link https://tools.ietf.org/html/rfc7233#section-4.1 Official Documentation}
   */
  PARTIAL_CONTENT = 206,

  /**
   * @description A Multi-Status response conveys information about multiple resources in situations where multiple status codes might be appropriate.
   * @see {@link https://tools.ietf.org/html/rfc2518#section-10.2 Official Documentation}
   */
  MULTI_STATUS = 207,

  /**
   * @description The request has more than one possible responses. User-agent or user should choose one of them. There is no standardized way to choose one of the responses.
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.4.1 Official Documentation}
   */
  MULTIPLE_CHOICES = 300,

  /**
   * @description This response code means that URI of requested resource has been changed. Probably, new URI would be given in the response.
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.4.2 Official Documentation}
   */
  MOVED_PERMANENTLY = 301,

  /**
   * @description This response code means that URI of requested resource has been changed temporarily. New changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests.
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.4.3 Official Documentation}
   */
  MOVED_TEMPORARILY = 302,

  /**
   * @description Server sent this response to directing client to get requested resource to another URI with an GET request.
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.4.4 Official Documentation}
   */
  SEE_OTHER = 303,

  /**
   * @description This is used for caching purposes. It is telling to client that response has not been modified. So, client can continue to use same cached version of response.
   * @see {@link https://tools.ietf.org/html/rfc7232#section-4.1 Official Documentation}
   */
  NOT_MODIFIED = 304,

  /**
   * @deprecated
   * @description Was defined in a previous version of the HTTP specification to indicate that a requested response must be accessed by a proxy. It has been deprecated due to security concerns regarding in-band configuration of a proxy.
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.4.6 Official Documentation}
   */
  USE_PROXY = 305,

  /**
   * @description Server sent this response to directing client to get requested resource to another URI with same method that used prior request. This has the same semantic than the 302 Found HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.4.7 Official Documentation}
   */
  TEMPORARY_REDIRECT = 307,
  /**
   * @description This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header. This has the same semantics as the 301 Moved Permanently HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.
   * @see {@link https://tools.ietf.org/html/rfc7538#section-3 Official Documentation}
   */
  PERMANENT_REDIRECT = 308,
}

export enum ClientErrorStatusCode {
  /**
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.5.1 Official Documentation}
   * @description This response means that server could not understand the request due to invalid syntax.
   */
  BAD_REQUEST = 400,

  /**
   * @see {@link https://tools.ietf.org/html/rfc7235#section-3.1 Official Documentation}
   * @description Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
   */
  UNAUTHORIZED = 401,

  /**
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.5.2 Official Documentation}
   * @description This response code is reserved for future use. Initial aim for creating this code was using it for digital payment systems however this is not used currently.
   */
  PAYMENT_REQUIRED = 402,

  /**
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.5.3 Official Documentation}
   * @description The client does not have access rights to the content, i.e. they are unauthorized, so server is rejecting to give proper response.
   */
  FORBIDDEN = 403,

  /**
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.5.4 Official Documentation}
   * @description The server can not find requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurrence on the web.
   */
  NOT_FOUND = 404,

  /**
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.5.5 Official Documentation}
   * @description The request method is known by the server but has been disabled and cannot be used. For example, an API may forbid DELETE-ing a resource. The two mandatory methods, GET and HEAD, must never be disabled and should not return this error code.
   */
  METHOD_NOT_ALLOWED = 405,

  /**
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.5.6 Official Documentation}
   * @description This response is sent when the web server, after performing server-driven content negotiation, doesn't find any content following the criteria given by the user agent.
   */
  NOT_ACCEPTABLE = 406,

  /**
   * @see {@link https://tools.ietf.org/html/rfc7235#section-3.2 Official Documentation}
   * @description This is similar to 401 but authentication is needed to be done by a proxy.
   */
  PROXY_AUTHENTICATION_REQUIRED = 407,

  /**
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.5.7 Official Documentation}
   * @description This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection. This response is used much more since some browsers, like Chrome, Firefox 27+, or IE9, use HTTP pre-connection mechanisms to speed up surfing. Also note that some servers merely shut down the connection without sending this message.
   */
  REQUEST_TIMEOUT = 408,

  /**
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.5.8 Official Documentation}
   * @description This response is sent when a request conflicts with the current state of the server.
   */
  CONFLICT = 409,

  /**
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.5.9 Official Documentation}
   * @description This response would be sent when the requested content has been permanently deleted from server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for "limited-time, promotional services". APIs should not feel compelled to indicate resources that have been deleted with this status code.
   */
  GONE = 410,

  /**
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.5.10 Official Documentation}
   * @description The server rejected the request because the Content-Length header field is not defined and the server requires it.
   */
  LENGTH_REQUIRED = 411,

  /**
   * @see {@link https://tools.ietf.org/html/rfc7232#section-4.2 Official Documentation}
   * @description The client has indicated preconditions in its headers which the server does not meet.
   */
  PRECONDITION_FAILED = 412,
  /**
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.5.11 Official Documentation}
   * @description Request entity is larger than limits defined by server; the server might close the connection or return an Retry-After header field.
   */
  REQUEST_TOO_LONG = 413,
  /**
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.5.12 Official Documentation}
   * @description The URI requested by the client is longer than the server is willing to interpret.
   */
  REQUEST_URI_TOO_LONG = 414,
  /**
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.5.13 Official Documentation}
   * @description The media format of the requested data is not supported by the server, so the server is rejecting the request.
   */
  UNSUPPORTED_MEDIA_TYPE = 415,
  /**
   * @see {@link https://tools.ietf.org/html/rfc7233#section-4.4 Official Documentation}
   * @description The range specified by the Range header field in the request can't be fulfilled; it's possible that the range is outside the size of the target URI's data.
   */
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  /**
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.5.14 Official Documentation}
   * @description This response code means the expectation indicated by the Expect request header field can't be met by the server.
   */
  EXPECTATION_FAILED = 417,
  /**
   * @see {@link https://tools.ietf.org/html/rfc2324#section-2.3.2 Official Documentation}
   * @description Any attempt to brew coffee with a teapot should result in the error code "418 I'm a teapot". The resulting entity body MAY be short and stout.
   */
  IM_A_TEAPOT = 418,
  /**
   * @see {@link https://tools.ietf.org/html/rfc2518#section-10.6 Official Documentation}
   * @description The 507 (Insufficient Storage) status code means the method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request. This condition is considered to be temporary. If the request which received this status code was the result of a user action, the request MUST NOT be repeated until it is requested by a separate user action.
   */
  INSUFFICIENT_SPACE_ON_RESOURCE = 419,
  /**
   * A deprecated response used by the Spring Framework when a method has failed.
   * @see {@link https://tools.ietf.org/rfcdiff?difftype=--hwdiff&url2=draft-ietf-webdav-protocol-06.txt Official Documentation}
   * @description A deprecated response used by the Spring Framework when a method has failed.
   */
  METHOD_FAILURE = 420,
  /**
   * @see {@link https://tools.ietf.org/html/rfc2518#section-10.3 Official Documentation}
   * @description The request was well-formed but was unable to be followed due to semantic errors.
   */
  UNPROCESSABLE_ENTITY = 422,
  /**
   * @see {@link https://tools.ietf.org/html/rfc2518#section-10.4 Official Documentation}
   * @description The resource that is being accessed is locked.
   */
  LOCKED = 423,
  /**
   * @see {@link https://tools.ietf.org/html/rfc2518#section-10.5 Official Documentation}
   * @description The request failed due to failure of a previous request.
   */
  FAILED_DEPENDENCY = 424,
  /**
   * @see {@link https://tools.ietf.org/html/rfc6585#section-3 Official Documentation}
   *  @description The origin server requires the request to be conditional. Intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it, and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.
   */
  PRECONDITION_REQUIRED = 428,
  /**
   * @see {@link https://tools.ietf.org/html/rfc6585#section-4 Official Documentation}
   * @description The user has sent too many requests in a given amount of time ("rate limiting").
   */
  TOO_MANY_REQUESTS = 429,
  /**
   * @see {@link https://tools.ietf.org/html/rfc6585#section-5 Official Documentation}
   * @description The server is unwilling to process the request because its header fields are too large. The request MAY be resubmitted after reducing the size of the request header fields.
   */
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  /**
   * @see {@link https://tools.ietf.org/html/rfc7725 Official Documentation}
   * @description The user-agent requested a resource that cannot legally be provided, such as a web page censored by a government.
   */
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,
}

export enum ServerErrorStatusCode {
  /**
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.6.1 Official Documentation}
   * @description The server encountered an unexpected condition that prevented it from fulfilling the request.
   */
  INTERNAL_SERVER_ERROR = 500,
  /**
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.6.2 Official Documentation}
   * @description The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.
   */
  NOT_IMPLEMENTED = 501,
  /**
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.6.3 Official Documentation}
   * @description This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.
   */
  BAD_GATEWAY = 502,
  /**
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.6.4 Official Documentation}
   * @description The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded. Note that together with this response, a user-friendly page explaining the problem should be sent. This responses should be used for temporary conditions and the Retry-After: HTTP header should, if possible, contain the estimated time before the recovery of the service. The webmaster must also take care about the caching-related headers that are sent along with this response, as these temporary condition responses should usually not be cached.
   */
  SERVICE_UNAVAILABLE = 503,
  /**
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.6.5 Official Documentation}
   * @description This error response is given when the server is acting as a gateway and cannot get a response in time.
   */
  GATEWAY_TIMEOUT = 504,
  /**
   * @see {@link https://tools.ietf.org/html/rfc7231#section-6.6.6 Official Documentation}
   * @description The HTTP version used in the request is not supported by the server.
   */
  HTTP_VERSION_NOT_SUPPORTED = 505,
  /**
   * @see {@link https://tools.ietf.org/html/rfc2518#section-10.6 Official Documentation}
   * @description The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.
   */
  INSUFFICIENT_STORAGE = 507,
  /**
   * @see {@link https://tools.ietf.org/html/rfc6585#section-6 Official Documentation}
   * @description The 511 status code indicates that the client needs to authenticate to gain network access.
   */
  NETWORK_AUTHENTICATION_REQUIRED = 511,
}

export type StatusCode = SuccessStatusCode | ClientErrorStatusCode | ServerErrorStatusCode;
