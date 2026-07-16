import { SendOtpRequest } from '@vion/api/contracts';
import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IdentifierValidator', async: false })
export class IdentifierValidator implements ValidatorConstraintInterface {
	validate(value: string, validationArguments: ValidationArguments): boolean {
		const object = validationArguments.object as SendOtpRequest;

		if (object.type === 'email')
			return /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(value);
		else if (object.type === 'phone') return /^\+?\d{10,15}$/.test(value);

		return false;
	}

	defaultMessage(validationArguments: ValidationArguments): string {
		const object = validationArguments.object as SendOtpRequest;

		if (object.type === 'email') return 'identifier must be a valid email';
		if (object.type === 'phone')
			return 'identifier must be a valid phone number';

		return 'invalid identifier';
	}
}
