import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsDateBefore implements ValidatorConstraintInterface {
    validate(startDate: Date, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
