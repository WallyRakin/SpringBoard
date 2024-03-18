import express, { Request, Response, NextFunction } from 'express';
import { EmployeeRequest } from '../../__utilities__/requestInterfaces';

import bcrypt from 'bcrypt';

import { ExpressError, NotFoundError, UnauthorizedError, BadRequestError, ForbiddenError } from '../../__utilities__/expressError';
import { authenticateEmployee } from '../../__utilities__/authenticateToken'

import { Employee } from '../../models/Employee';
import { validateSchema } from '../../__utilities__/validateSchema';
import employeeSchema from './schemas/employeeSchema';

const router = express.Router();

router.use(express.json());


// User signup route
router.post('/signup', validateSchema(employeeSchema), async (req: EmployeeRequest, res: Response, next: NextFunction) => {
    const { employee_name, employee_email, employee_phone, password, confirmPassword }
        : { employee_name: string, employee_email: string, employee_phone: string, password: string, confirmPassword: string }
        = req.body;

    try {



        if (!employee_name || !employee_email || !employee_phone || !password || !confirmPassword) {
            throw new BadRequestError("Required data is missing or improperly formatted.");
        };

        if (password !== confirmPassword) {
            throw new Error("Password and confirmation password do not match.");
        };


        const password_hash = await bcrypt.hash(password, 10); // Hash the password
        let user = new Employee(employee_name, employee_email, employee_phone, password_hash,);
        await user.save();

        const token = await user.authenticate(password);
        res.status(201).json({ token });
    } catch (err) {
        console.dir(err);
        return next(err);
    };
});

// User login route
router.post('/login', validateSchema(employeeSchema), async (req: EmployeeRequest, res: Response, next: NextFunction) => {
    try {
        const { employee_email, password }: { employee_email: string, password: string } = req.body;
        const employee = await Employee.findByEmail(employee_email);
        if (!employee) { throw new NotFoundError('employee not forund') };
        const token = await employee.authenticate(password);
        if (!token) { throw new UnauthorizedError() };


        res.status(200).json({ token });

    } catch (error) {
        console.dir(error);


        if (error instanceof ExpressError) {
            if (error.status >= 400 && error.status < 500) {
                throw new UnauthorizedError('Invalid email or password.');
            } else {
                next(error);
            }
        } else {
            // Handle non-ExpressError cases
            next(new Error('An unexpected error occurred.'));
        }

    };
});

// User logout route
router.post('/logout', authenticateEmployee, async (req: EmployeeRequest, res: Response, next: NextFunction) => {
    try {
        const employee = req.employee;
        const colNum = req.colNum;

        if (!employee) { throw new UnauthorizedError() };

        switch (colNum) {
            case 1:
                employee.auth_token_hash1 = null;
                break;
            case 2:
                employee.auth_token_hash2 = null;
                break;
            case 3:
                employee.auth_token_hash3 = null;
                break;
            case 4:
                employee.auth_token_hash4 = null;
                break;
            default:
                throw new UnauthorizedError('Invalid token.');
        };

        await employee.save();
    } catch (err) {
        console.dir(err);
        next(err);
    };
});


export default router;