class Field {
    fieldInput;
    errorText;

    constructor(fieldInput) {
        this.fieldInput = fieldInput;
    }
    

    checkRequirements() {
        if (!this.checkRequired(this.fieldInput)) {
            throw "Field is required"
        }
    }

    checkRequired(value) {
        if (!value) {
            return false;
        }
        value = value.toString().trim();
        if (value === "" || value == null) {
            return false;
        }
        return true;
    }

    checkTextLengthRange(value, min, max) {
        if (!value) {
            return false;
        }
        value = value.toString().trim();
        const length = value.length;
        if (max && length > max) {
            return false;
        }
        if (min && length < min) {
            return false;
        }
        return true;
    }
}


class SalaryField extends Field {
    lowerBound;
    upperBound

    constructor(fieldInput, errorText, lowerBound, upperBound) {
        super(fieldInput, errorText);
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
    }

    checkRequirements() {
        super.checkRequirements();

        if (Number.isNaN(parseFloat(this.fieldInput))) {
            throw 'Value must be a number';
        } else if (!this.checkForBounds()) {
            throw `Number must be in bounds of(${this.lowerBound}-${this.upperBound})`;
        }
    }

    checkForBounds() {
        let salary = parseFloat(this.fieldInput);
        return salary >= this.lowerBound && salary <= this.upperBound;
    }
}

export class TextField extends Field {
    minLength;
    maxLength;

    constructor(fieldInput, minLength = 2, maxLength = 60) {
        super(fieldInput);
        this.minLength = minLength;
        this.maxLength = maxLength;
    }

    checkRequirements() {
        super.checkRequirements();

        if (!this.checkTextLengthRange(this.fieldInput, this.minLength, this.maxLength)) {
            throw `Field must contain from ${this.minLength} to ${this.maxLength} characters`;
        }
    }
}

export class EmailField extends TextField {
    checkRequirements() {
        super.checkRequirements();
        if (!this.checkEmail()) {
            throw 'Filed must contain correct email address';
        }
    }

    checkEmail() {
        let email = this.fieldInput.toString().trim();
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email));
    }
}

class DateField extends Field {
    static pattern = /(\d{4})-(\d{2})-(\d{2})/;
    dateIsFromPast;

    constructor(fieldInput, errorText, dateIsFromPast = false) {
        super(fieldInput, errorText);
        this.dateIsFromPast = dateIsFromPast;
    }

    checkRequirements() {
        super.checkRequirements();
        if (!this.checkDateMatchPattern()) {
            throw 'Wrong date format';
        } else if (this.dateIsFromPast && this.isAfter(this.getCurrentDate())) {
            throw 'Date cannot be from future';
        }
    }

    checkDateMatchPattern() {
        return DateField.pattern.test(this.fieldInput);
    }

    getCurrentDate() {
        let nowDate = new Date(),
            month = '' + (nowDate.getMonth() + 1),
            day = '' + nowDate.getDate(),
            year = nowDate.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    }

    isAfter(otherDate) {
        if (!this.checkDateMatchPattern()) {
            return false;
        }
        const valueDate = new Date(this.fieldInput);
        const compareToDate = new Date(otherDate);
        return valueDate.getTime() >= compareToDate.getTime();
    }
}
