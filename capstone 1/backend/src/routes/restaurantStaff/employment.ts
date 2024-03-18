import express, { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { EmployeeRequest } from '../../__utilities__/requestInterfaces';

import { ExpressError, NotFoundError, UnauthorizedError, BadRequestError, ForbiddenError } from '../../__utilities__/expressError';
import { authenticateEmployee } from '../../__utilities__/authenticateToken'

import { Restaurant } from '../../models/Restaurant';
import { Employee } from '../../models/Employee';

const router = express.Router();

router.use(express.json());


router.route('/employeecode')
    .get(authenticateEmployee, async (req: EmployeeRequest, res: Response, next: NextFunction) => {
        try {
            const { employee } = req;
            if (employee === undefined) { throw new UnauthorizedError() };

            res.status(200).json({ code: employee.employee_code });
        } catch (err) {
            next(err);
        };
    })
    .post(authenticateEmployee, async (req: EmployeeRequest, res: Response, next: NextFunction) => {
        try {
            const { employee } = req;
            if (employee === undefined) { throw new UnauthorizedError() };

            const code = crypto.randomBytes(6).toString('hex');
            const oldE = await Employee.findByEmployeeCode(code);
            if (oldE !== null) { oldE.employee_code = null; oldE.save() };

            employee.employee_code = code;

            res.status(200).json({ code: employee.employee_code });
        } catch (err) {
            next(err);
        };

    })

export default router;