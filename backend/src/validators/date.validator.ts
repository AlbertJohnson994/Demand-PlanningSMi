import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isDateBefore', async: false })
export class IsDateBefore implements ValidatorConstraintInterface {
  validate(startDate: Date, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const endDate = (args.object as any)[relatedPropertyName];

    if (!startDate || !endDate) {
      return true; // Let other validators handle missing dates
    }

    return new Date(startDate) < new Date(endDate);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Start date must be before end date';
  }
}
