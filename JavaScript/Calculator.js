function calculator(input) {
    // global array and variables declared
    var expressionArray = [];
    var divisionByZero = 0;
    var incorrectFormat = 0;
    var answer = 0;

    // while loop to remove any non numbers or operators at the beginning of the string
    while (isNaN(input.charAt(0)) && (isNaN(input.charAt(1)) || (input.charAt(0)) != '-')) {
        var editedInput = input.slice(1);
        input = editedInput;
    }

    // calling the first function to create the array
    creatingArray(input);

    // ends the function due to invalid format
    if (incorrectFormat == 1) {
        var finalCalculation = 'Incorrect format, check your expression.';
        console.log(finalCalculation);
        return finalCalculation;
    }
    // calls the second function to decide the order of procedence
    // the third function is called within this function
    else {
        orderOfProcedence(expressionArray);
    }

    // returning the final answer or an error after all sub expressions have been solved
    if (divisionByZero == 1) {
        var finalCalculation = 'Undefined due to division by zero.';
        return finalCalculation;
    }
    else if (incorrectFormat == 1) {
        var finalCalculation = 'Incorrect format, check your expression.';
        return finalCalculation;
    }
    else if (expressionArray[0] === 0 && expressionArray[2] === 0)
    {
        var finalCalculation = 'Undefined due to zero to power of zero';
            return finalCalculation;
    }
    else
    {
        var finalCalculation = expressionArray[0];
        return finalCalculation;
    }




    // The first function for splitting the string into array elements
    function creatingArray(expression) {
        // initial variables declared
        var operator = '/*+-^';
        var nonOperator = '/*^';
        var term = '';

        // iteration to loop through the string
        for (var i = 0, j; j = expression.charAt(i); i++) {
            // first if statement to check for a number, also works for decimal places
            if ((!isNaN(j) || (j == '.')) && (expression.charAt(i + 1) != '.' || operator.indexOf(expression.charAt(i + 1) == -1))) {
                term += j;

                // Second if statement to check how big the number is by looking for the next operator inline
                if (operator.indexOf(expression.charAt(i + 1)) > -1) {
                    var k = 0;
                    // Checking the term variable for multiple decimal places
                    for (var g = 0, h; h = term.charAt(g); g++) {
                        if (h == '.') {
                            k++;
                        }
                        // Condition if too many decimal places are detected thus the initial expression format is incorrect
                        if (k > 1) {
                            incorrectFormat = 1;
                            return false;
                        }


                    }
                    // pushes the term to the array
                    expressionArray.push(parseFloat(term));
                }

                // continues the loop if the term within the string is larger than a single digit
                else {
                    continue;
                }
            }

            // Checks the current location for two negative signs to form a positive sign
            else if ((operator.indexOf(j) == 3 && expression.charAt(i + 1) == '-') || (operator.indexOf(j) == 2 && expression.charAt(i + 1) == '+') || (operator.indexOf(j) == 3 && expression.charAt(i - 1) == '-') || (operator.indexOf(j) == 2 && expression.charAt(i - 1) == '+')) {
                // Checks whether previous element already contains an operator
                if (expressionArray[expressionArray.length - 1] == operator.charAt(2) || expressionArray[expressionArray.length - 1] == operator.charAt(3)) {
                    expressionArray.pop();
                }

                expressionArray.push('+');
                term = '';
                continue;
            }


            // Checks the current location for alternate minus and positive signs to form a negative sign
            else if ((operator.indexOf(j) == 2 && expression.charAt(i + 1) == '-') || (operator.indexOf(j) == 3 && expression.charAt(i + 1) == '+') || (operator.indexOf(j) == 2 && expression.charAt(i - 1) == '-') || (operator.indexOf(j) == 3 && expression.charAt(i - 1) == '+')) {
                // Checks whether previous element already contains an operator
                if (expressionArray[expressionArray.length - 1] == operator.charAt(3) || expressionArray[expressionArray.length - 1] == operator.charAt(2)) {
                    expressionArray.pop();
                }
                expressionArray.push('-');
                term = '';
                continue;
            }

            // Checks for a valid operator and empties the term variable
            else if (operator.indexOf(j) > -1 && nonOperator.indexOf(expression.charAt(i + 1)) == -1) {

                expressionArray.push(j);
                term = '';

                //Checks for any negative signs after current operator
                if (expression.charAt(i + 1) == '-') {
                    term += '-';
                    i++;
                    continue;
                }
                // Checks for any postive signs after current operator
                if (expression.charAt(i + 1) == '+') {
                    term += '+';
                    i++;
                    continue;
                }
            }

            // Checks for invalid characters for this calculator
            else {
                incorrectFormat = 1;
                return false;
            }

        }

        // Checks for an ambiguous minus sign at the beginning of the array, usually means the first term was negative
        if (expressionArray[0] == '-') {
            var firstElement = '-' + expressionArray[1];
            expressionArray.splice(0, 2, parseFloat(firstElement));
        }
        return expressionArray  // Returning the array to pass into the second function
    }



    // Second function to perform the calculation using DMAS of the BODMAS order
    function orderOfProcedence(expressionArray)
    {

        for (var i = 0, d; d = expressionArray[i]; i++)
        {
            if (d == '^') {
                var elementPosition = expressionArray.indexOf('^');   // creates the element's current position of the array
                var sign = expressionArray[elementPosition];          // creates the sign variable to pass into the third function
                calculationByOperation(sign, elementPosition);        // calling the function to resolve the sub expression found
                i = 0;  // resets the counter to begin from the start of the expression
            }
        }

        // Checking and calculating division and multiplication from left to right
        for (var i = 0, d; d = expressionArray[i]; i++) {
            if (d == '/') {
                var elementPosition = expressionArray.indexOf('/'); // creates the element's current position of the array
                var sign = expressionArray[elementPosition];        // creates the sign variable to pass into the third function
                calculationByOperation(sign, elementPosition);      // calling the third function to resolve the sub expression found

                if (divisionByZero == 1)                            // if division by zero is detected the program breaks out of the function
                {
                    return false;
                }
                else {
                    i = 0;    // resets the counter to begin from the start of the array
                }

            }
            else if (d == '*') {
                var elementPosition = expressionArray.indexOf('*'); // creates the element's current position of the array
                var sign = expressionArray[elementPosition];        // creates the sign variable to pass into the third function
                calculationByOperation(sign, elementPosition);      // calling the third function to resolve the sub expression found
                i = 0;    // resets the counter to begin from the start of the array
            }
        }

        // Checking and calculating addition and subtraction from left to right
        for (var i = 0, d; d = expressionArray[i]; i++) {
            if (d == '+') {
                var elementPosition = expressionArray.indexOf('+');   // creates the element's current position of the array
                var sign = expressionArray[elementPosition];          // creates the sign variable to pass into the third function
                calculationByOperation(sign, elementPosition);        // calling the function to resolve the sub expression found
                i = 0;  // resets the counter to begin from the start of the expression
            }
            if (d == '-') {
                var elementPosition = expressionArray.indexOf('-');   // creates the element's current position of the array
                var sign = expressionArray[elementPosition];          // creates the sign variable to pass into the third function
                calculationByOperation(sign, elementPosition);        // calling the function to resolve the sub expression found
                i = 0;  // resets the counter to begin from the start of the expression
            }
        }
    }

    // function to perform the calculation
    function calculationByOperation(sign, elementPosition) {
        // declaring the variables required
        var a = expressionArray[elementPosition - 1];   // selecting the first number
        var b = expressionArray[elementPosition + 1];   // selecting the second number
        var elementDelete = elementPosition - 1;        // selecting the start position to delete the elements after a valid answer is found

        // this will perform the calculation per term
        switch (sign) {
            // division case and checks for division by zero
            case '/':
                if (b == 0) {
                    divisionByZero = 1;
                }
                else {
                    answer = a / b;
                }
                break;
            // multiplication case
            case '*':
                answer = a * b;
                break;
            // addition case
            case '+':
                answer = a + b;
                break;
            // subtraction case
            case '-':
                answer = a - b;
                break;
            // Powers
            case '^':
                answer = Math.pow(a, b);
                break;

        }

        // Catches any answers which are not a number
        if (isNaN(answer)) {
            incorrectFormat = 1;
        }
        expressionArray.splice(elementDelete, 3, answer); // replaces the current term in the array with a valid answer

    }

}
