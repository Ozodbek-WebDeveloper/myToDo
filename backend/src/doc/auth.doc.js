/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 */




/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */



/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current logged-in user info
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the authenticated user's profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 roles:
 *                   type: string
 *                 avatar:
 *                   type: string
 *                   example: "http://localhost:8000/static/avatar123.jpg"
 *                 isActive:
 *                   type: boolean
 *                 settings:
 *                   type: object
 *                   properties:
 *                     themeDark:
 *                       type: boolean
 *       401:
 *         description: Unauthorized – invalid or missing token
 */

/**
 * @swagger
 * /auth/getUsers:
 *   get:
 *     summary: Barcha foydalanuvchilarni olish
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Foydalanuvchilar ro'yxati muvaffaqiyatli olindi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "672eabf1b38a17a9d33c5b21"
 *                   name:
 *                     type: string
 *                     example: "Ozodbek"
 *                   email:
 *                     type: string
 *                     example: "ozodbek@example.com"
 *                   roles:
 *                     type: string
 *                     example: "admin"
 *                   avatar:
 *                     type: string
 *                     example: "http://localhost:8000/static/avatar123.jpg"
 *                   isActive:
 *                     type: boolean
 *                     example: true
 *                   settings:
 *                     type: object
 *                     properties:
 *                       themeDark:
 *                         type: boolean
 *                         example: false
 *       401:
 *         description: Token noto‘g‘ri yoki yo‘q
 *       500:
 *         description: Server xatosi
 *
 * /auth/user/{id}:
 *   delete:
 *     summary: Foydalanuvchini o‘chirish
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O‘chiriladigan foydalanuvchi ID raqami
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli o‘chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */


//-***************************************** todo start**************************************
/**
 * @swagger
 * tags:
 *   name: Todo
 *   description: Todo management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         _id:
 *           type: string
 *           example: 671f0e8a23c5b4f9b12a0cde
 *         auther:
 *           type: string
 *           example: 671f0e8a23c5b4f9b12a0cdd
 *         title:
 *           type: string
 *           example: "Finish Swagger docs"
 *         description:
 *           type: string
 *           example: "Write Swagger documentation for the Todo API"
 *         isCompleted:
 *           type: boolean
 *           example: false
 *         priority:
 *           type: string
 *           enum: [low, medium, high]
 *           example: "medium"
 *         deadline:
 *           type: string
 *           format: date-time
 *           example: "2025-11-01T00:00:00.000Z"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /todo:
 *   post:
 *     summary: Create new Todo
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - priority
 *             properties:
 *               title:
 *                 type: string
 *                 example: "my todo"
 *               description:
 *                 type: string
 *                 example: "my todo description"
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: "medium"
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-01T00:00:00.000Z"
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       400:
 *         description: Invalid input data
 */

/**
 * @swagger
 * /todo:
 *   get:
 *     summary: Get all todos of current user
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */

/**
 * @swagger
 * /todo/{id}:
 *   get:
 *     summary: Get todo by ID
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */

/**
 * @swagger
 * /todo/{id}:
 *   put:
 *     summary: Update todo by ID
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - priority
 *             properties:
 *               title:
 *                 type: string
 *                 example: "my todo"
 *               description:
 *                 type: string
 *                 example: "my todo description"
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: "medium"
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-01T00:00:00.000Z"
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       404:
 *         description: Todo not found
 */

/**
 * @swagger
 * /todo/{id}:
 *   delete:
 *     summary: Delete todo by ID
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 */
