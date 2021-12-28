const swaggerConfig = {
  swagger: '2.0',
  info: {
    title: 'game-store-backend',
    description: 'iTechLab',
    version: '1.0.0',
    contact: {
      name: 'Yauheni Charniauski',
      email: 'yauheni.charniauski.work@gmail.com',
    },
  },
  tags: [
    {
      name: 'Products',
      description: 'Everything about games',
    },
    {
      name: 'Categories',
      description: 'Everything about games categories',
    },
    {
      name: 'Accounts',
      description: 'Everything about accounts',
    },
    {
      name: 'Auth',
      description: 'Everything about authentication',
    },
    {
      name: 'Admin',
      description: 'Everything about admin functionality',
    },
  ],
  servers: [
    {
      url: 'http://localhost:3000', // url
      description: 'Local server', // name
    },
  ],
  schemes: ['http'],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      scheme: 'bearer',
      in: 'headers',
      name: 'Authorization',
      prefix: 'Bearer ',
    },
  },
  paths: {
    '/products': {
      get: {
        tags: ['Products'],
        summary: 'Get all game products',
        description: '',
        operationId: 'getProducts',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'query',
            name: 'displayName',
            schema: {
              type: 'string',
            },
            example: 'craft',
            required: false,
            description: 'Find products by matches in display name',
          },
          {
            in: 'query',
            name: 'price',
            schema: {
              type: 'string',
              pattern: /[0-9]*:[0-9]+/gm,
            },
            example: '<from>:<to>. <from> is not required. Example values -> 30:100 or :100',
            required: false,
            description: 'Select price range',
          },
          {
            in: 'query',
            name: 'minRating',
            schema: {
              type: 'number',
            },
            example: 1,
            required: false,
            description: 'Minimal product rating',
          },
          {
            in: 'query',
            name: 'sortBy',
            schema: {
              type: 'string',
            },
            example: 'price:asc',
            required: false,
            description:
              "The query sortBy must be in the format: 'option:(desc|asc)'. Available options: price, createdAt",
          },
          {
            in: 'query',
            name: 'offset',
            schema: {
              type: 'number',
            },
            example: 3,
            required: false,
            description: 'Pagination. How many products will be passed.',
          },
          {
            in: 'query',
            name: 'limit',
            schema: {
              type: 'number',
            },
            example: 2,
            required: false,
            description: 'Pagination. How many products will be shown.',
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              $ref: '#/definitions/Product',
            },
          },
          404: {
            description: 'Product not found',
          },
        },
      },
    },
    '/products/{id}/rate': {
      post: {
        security: [
          {
            Bearer: [],
          },
        ],
        tags: ['Products'],
        summary: 'Rate product',
        description: 'Available for authenticated buyers',
        operationId: 'rateProducts',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'number',
            },
            example: 1,
            required: true,
            description: 'Product id',
          },
          {
            in: 'body',
            name: 'body',
            description: 'Rating properties',
            required: true,
            schema: {
              type: 'object',
              properties: {
                rating: {
                  type: 'number',
                  example: 10,
                  min: 0,
                  max: 10,
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              $ref: '#/definitions/Product',
            },
          },
          404: {
            description: 'Product not found',
          },
        },
      },
    },
    '/categories': {
      get: {
        tags: ['Categories'],
        summary: 'Get all game categories',
        description: '',
        operationId: 'getCategories',
        consumes: ['application/json'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              $ref: '#/definitions/Category',
            },
          },
          404: {
            description: 'Category not found',
          },
        },
      },
    },
    '/categories/{id}': {
      get: {
        tags: ['Categories'],
        summary: 'Get category by id',
        description: '',
        operationId: 'getCategoriesById',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer',
            },
            required: true,
            description: 'Category id',
          },
          {
            in: 'query',
            name: 'includeProducts',
            schema: {
              type: 'boolean',
            },
            example: true,
            required: false,
            description: 'Include products to category',
          },
          {
            in: 'query',
            name: 'includeTop3Products',
            schema: {
              type: 'string',
            },
            example: 'top',
            required: false,
            description: 'Include only top 3 products to category. Works only with includeProducts param',
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              $ref: '#/definitions/Category',
            },
          },
          404: {
            description: 'Category not found',
          },
        },
      },
    },
    '/register': {
      post: {
        tags: ['Accounts'],
        summary: 'Create new account',
        description: '',
        operationId: 'createAccount',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Account properties',
            required: true,
            schema: {
              type: 'object',
              required: ['username', 'password', 'lastName', 'firstName'],
              properties: {
                username: {
                  type: 'string',
                  example: 'yauheni2012',
                },
                firstName: {
                  type: 'string',
                  example: 'Yauheni',
                },
                lastName: {
                  type: 'string',
                  example: 'Charniauski',
                },
                password: {
                  type: 'string',
                  example: 'MySuPeRsRcUr1tyPassW0rD',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          400: {
            description: 'Bad request',
          },
        },
      },
    },
    '/profile': {
      get: {
        security: [
          {
            Bearer: [],
          },
        ],
        tags: ['Accounts'],
        summary: 'Get profile info',
        description: 'Only for authenticated buyers',
        operationId: 'getProfile',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Account properties',
            required: true,
            schema: {
              type: 'object',
              required: ['username'],
              properties: {
                username: {
                  type: 'string',
                  example: 'yauheni2012',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          400: {
            description: 'Bad request',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
      post: {
        security: [
          {
            Bearer: [],
          },
        ],
        tags: ['Accounts'],
        summary: 'Update profile info',
        description: 'Only for authenticated buyers',
        operationId: 'updateProfile',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Account properties',
            required: true,
            schema: {
              type: 'object',
              required: ['username'],
              properties: {
                username: {
                  type: 'string',
                  example: 'yauheni2012',
                },
                firstName: {
                  type: 'string',
                  example: 'firstName',
                },
                lastName: {
                  type: 'string',
                  example: 'lastName',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          400: {
            description: 'Bad request',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },
    '/profile/password': {
      post: {
        security: [
          {
            Bearer: [],
          },
        ],
        tags: ['Accounts'],
        summary: 'Change password',
        description: 'Only for authenticated buyers',
        operationId: 'changePassword',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Account properties',
            required: true,
            schema: {
              type: 'object',
              required: ['username', 'password'],
              properties: {
                username: {
                  type: 'string',
                  example: 'yauheni2012',
                },
                password: {
                  type: 'string',
                  example: 'NeWpAsSwOrD',
                },
              },
            },
          },
        ],
        responses: {
          204: {
            description: 'Successful operation',
          },
          400: {
            description: 'Bad request',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },
    '/authenticate': {
      post: {
        tags: ['Auth'],
        summary: 'Authentication',
        description: '',
        operationId: 'authenticate',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Account properties',
            required: true,
            schema: {
              type: 'object',
              required: ['username', 'password'],
              properties: {
                username: {
                  type: 'string',
                  example: 'yauheni2012',
                },
                password: {
                  type: 'string',
                  example: 'pAsSwOrD',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              type: 'object',
              properties: {
                user: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'number',
                      example: 1,
                    },
                    username: {
                      type: 'string',
                      example: 'geshka',
                    },
                    role: {
                      type: 'string',
                      example: 'admin | buyer',
                    },
                  },
                },
                token: {
                  type: 'string',
                  example: 'JWT',
                },
                refreshToken: {
                  type: 'string',
                  example: 'refreshToken',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Product not found',
          },
        },
      },
    },
    '/token': {
      post: {
        tags: ['Auth'],
        summary: 'Refresh token',
        description: '',
        operationId: 'refreshToken',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Username and JWT',
            required: true,
            schema: {
              type: 'object',
              required: ['username', 'refreshToken'],
              properties: {
                username: {
                  type: 'string',
                  example: 'yauheni2012',
                },
                refreshToken: {
                  type: 'string',
                  example: 'tMHQY8qlZvlFVioyX54vZbpz',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              type: 'object',
              properties: {
                accountUsername: {
                  type: 'string',
                  example: 'yauheni2012',
                },
                token: {
                  type: 'string',
                  example: 'JWT',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },
    '/admin/products/{id}': {
      get: {
        security: [
          {
            Bearer: [],
          },
        ],
        tags: ['Admin'],
        summary: 'Get product by ID',
        description: '',
        operationId: 'getProductById',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer',
            },
            required: true,
            description: 'Product id',
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Product not found',
          },
        },
      },
      patch: {
        security: [
          {
            Bearer: [],
          },
        ],
        tags: ['Admin'],
        summary: 'Update product by ID',
        description: '',
        operationId: 'updateProductById',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer',
            },
            required: true,
            description: 'Product id',
          },
          {
            in: 'body',
            name: 'body',
            description: 'New Product properties',
            required: true,
            schema: {
              type: 'object',
              properties: {
                displayName: {
                  type: 'string',
                  example: 'Minecraft',
                },
                price: {
                  type: 'number',
                  example: '3',
                },
                categoriesIds: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  example: ['1', '2'],
                  description: 'Category ids list',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          400: {
            description: 'Bad request',
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Product not found',
          },
        },
      },
      delete: {
        security: [
          {
            Bearer: [],
          },
        ],
        tags: ['Admin'],
        summary: 'Delete product by ID',
        description: '',
        operationId: 'deleteProductById',
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer',
            },
            required: true,
            description: 'Product id',
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Product not found',
          },
        },
      },
    },
    '/admin/products': {
      post: {
        security: [
          {
            Bearer: [],
          },
        ],
        tags: ['Admin'],
        summary: 'Add new product',
        description: '',
        operationId: 'refreshingTokens',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Product object that needs to be added',
            required: true,
            schema: {
              type: 'object',
              properties: {
                displayName: {
                  type: 'string',
                  example: 'Minecraft',
                },
                price: {
                  type: 'number',
                  example: '3',
                },
                categoriesIds: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  example: ['1', '2'],
                  description: 'Category ids list',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          400: {
            description: 'Wrong parameters',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },
    '/admin/categories/{id}': {
      get: {
        security: [
          {
            Bearer: [],
          },
        ],
        tags: ['Admin'],
        summary: 'Get category by ID',
        description: '',
        operationId: 'getCategoryById',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer',
            },
            required: true,
            description: 'Category id',
          },
          {
            in: 'query',
            name: 'includeProducts',
            schema: {
              type: 'boolean',
            },
            example: true,
            required: false,
            description: 'Include products to category',
          },
          {
            in: 'query',
            name: 'includeTop3Products',
            schema: {
              type: 'string',
            },
            example: 'top',
            required: false,
            description: 'Include only top 3 products to category. Works only with includeProducts param',
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Category not found',
          },
        },
      },
      patch: {
        security: [
          {
            Bearer: [],
          },
        ],
        tags: ['Admin'],
        summary: 'Update category by ID',
        description: '',
        operationId: 'updateCategoryById',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer',
            },
            required: true,
            description: 'Product id',
          },
          {
            in: 'body',
            name: 'body',
            description: 'New category properties',
            required: true,
            schema: {
              type: 'object',
              properties: {
                displayName: {
                  type: 'string',
                  example: 'Cool Category Name',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          400: {
            description: 'Bad request',
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Category not found',
          },
        },
      },
      delete: {
        security: [
          {
            Bearer: [],
          },
        ],
        tags: ['Admin'],
        summary: 'Delete category by ID',
        description: '',
        operationId: 'deleteCategoryById',
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer',
            },
            required: true,
            description: 'Category id',
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Category not found',
          },
        },
      },
    },
    '/admin/categories': {
      post: {
        security: [
          {
            Bearer: [],
          },
        ],
        tags: ['Admin'],
        summary: 'Add new category',
        description: '',
        operationId: 'addCategory',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Category object that needs to be added',
            required: true,
            schema: {
              type: 'object',
              properties: {
                displayName: {
                  type: 'string',
                  example: 'Cool category name',
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          400: {
            description: 'Wrong parameters',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },
  },
  definitions: {
    Product: {
      type: 'object',
      properties: {
        _id: {
          type: 'number',
          example: '3',
        },
        displayName: {
          type: 'string',
          example: 'Game 1',
        },
        createdAt: {
          type: 'Date',
          example: '2021-11-28T14:18:35.153Z',
        },
        totalRating: {
          type: 'number',
          example: '2',
        },
        price: {
          type: 'number',
          example: '19',
        },
      },
    },
    Category: {
      type: 'object',
      properties: {
        id: {
          type: 'int',
          example: 1,
        },
        displayName: {
          type: 'string',
          example: 'Action',
        },
      },
    },
    Account: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'stmnl',
        },
        firstName: {
          type: 'string',
          example: 'Ilya',
        },
        lastName: {
          type: 'string',
          example: 'Istomin',
        },
        password: {
          type: 'string',
          example: 'password',
        },
        role: {
          type: 'string',
          example: 'buyer | admin',
        },
      },
    },
  },
};
export default swaggerConfig;
