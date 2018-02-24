
function calculator(input)
{
    // global array and variable declared
    var expressionArray = [];
    var divisionByZero = 0;
    var incorrectFormat = 0;

    // while loop to remove any non numbers or operators at the beginning of the string
    while (isNaN(input.charAt(0)) && (isNaN(input.charAt(1)) || (input.charAt(0)) != '-'))
    {
        var myString = input.slice(1);
        input = myString;
    }

    // calling functions to perform the calculation
    creatingArray(input);

    // ends the function due to invalid format
    if (incorrectFormat == 1)
    {
        var finalCalculation = 'Incorrect format, check your expression entered.';
        console.log(finalCalculation);
        return finalCalculation;
    }
    else
    {
        orderOfProcedence(expressionArray);
    }

    // returning the final answer or an error after all sub expressions have been solved
    if (divisionByZero == 1)
    {
        var finalCalculation = 'Undefined due to division by zero.';
        console.log(finalCalculation);
        return finalCalculation;
    }
    else
    {
        var finalCalculation = expressionArray[0];
        console.log(finalCalculation);
        return finalCalculation;
    }




    // Function for splitting the string into array elements
    function creatingArray(expression)
    {
        // initial variables declared
        var Operator = '/*+-';
        var term = '';

        // iteration to loop through the string
        for (var i = 0, j; j = expression.charAt(i); i++)
        {
            // first if statement to check for a number, also works for decimal places
            if ((!isNaN(j) || ((j == '.' && (expression.charAt(i + 1) != '.' || Operator.indexOf(expression.charAt(i + 1) == -1))))))
            {
                term += j;

                // second if statement to check how big the number is by looking for the next operator inline
                if (Operator.indexOf(expression.charAt(i + 1)) > -1)
                {
                    var k = 0;
                    // checking the term variable for multiple decimal places
                    for (var g = 0, h; h = term.charAt(g); g++) {
                        if (h == '.')
                        {
                            k++;
                        }
                        if (k > 1)
                        {
                            incorrectFormat = 1;
                            return false;
                        }


                    }
                    expressionArray.push(parseFloat(term));
                }

                // continues the loop should the number be larger than a single digit
                else
                {
                   continue;
                }
            }

            // Checks for two negative numbers which makes a positive number
            else if ((Operator.indexOf(j) == 3 && expression.charAt(i + 1) == '-') || (Operator.indexOf(j) == 2 && expression.charAt(i + 1) == '+'))
            {
                if (expressionArray[expressionArray.length - 1] == Operator.charAt(2) || expressionArray[expressionArray.length - 1] == Operator.charAt(3))
                {
                    expressionArray.pop();
                }

                expressionArray.push('+');
                term = '';

                //expression = expression.slice(i);
                continue;
            }

            // Checks for alternate minus and positive numbers
            else if ((Operator.indexOf(j) == 2 && expression.charAt(i + 1) == '-') || (Operator.indexOf(j) == 3 && expression.charAt(i + 1) == '+'))
            {
                if (expressionArray[expressionArray.length - 1] == Operator.charAt(3) || expressionArray[expressionArray.length - 1] == Operator.charAt(2))
                {
                    expressionArray.pop();
                }
                expressionArray.push('-');
                term = '';

                //expression = expression.slice(i);
                continue;
            }

            // Checks for a valid operator and empties the term variable
            else if (Operator.indexOf(j) > -1)
            {

                // Final check for two negative numbers to make positive number
                if ((Operator.indexOf(j) == 3 && expressionArray[expressionArray.length - 1] == '-') || (Operator.indexOf(j) == 2 && expressionArray[expressionArray.length - 1] == '+'))
                {
                    expressionArray.pop();
                    expressionArray.push('+');
                    term = '';
                }

                // Final check for two alternate minus and positive number
                else if ((Operator.indexOf(j) == 3 && expressionArray[expressionArray.length - 1] == '+') || (Operator.indexOf(j) == 2 && expressionArray[expressionArray.length - 1] == '-'))
                {
                    expressionArray.pop();
                    expressionArray.push('-');
                    term = '';
                }
                else
                {
                    expressionArray.push(j);
                    term = '';
                }

                //Checks for any negative integers
                if (expression.charAt(i + 1) == '-')
                {
                    term += '-';
                    i++;
                    continue;
                }
            }

            // Invalid format for this calculator
            else
            {
                incorrectFormat = 1;
                return false;
            }

        }

        // Checks for a ambiguous minus sign at the beginning of the array
        if (expressionArray[0] === '-')
        {
            var firstElement = '-' + expressionArray[1];
            expressionArray.splice(0, 2, parseFloat(firstElement));
        }
        console.log(expressionArray);
        return expressionArray
    }



    // function to perform the calculation using DMAS of the BODMAS order
    function orderOfProcedence(expressionArray) {
        // calculating division and multiplication from left to right
        for (var i = 0, d; d = expressionArray[i]; i++) {
            if (d == '/') {
                var elementPosition = expressionArray.indexOf('/');
                var sign = expressionArray[elementPosition];
                calculationByOperation(sign, elementPosition);  // calling the function to resolve the sub expression found

                if (divisionByZero == 1)                        // if division by zero is detected the program breaks out of the function
                {
                    return false;
                }
                else
                {
                    i = 0;    // resets the counter to begin from the start of the expression
                }

            }
            else if (d == '*') {
                var elementPosition = expressionArray.indexOf('*');
                var sign = expressionArray[elementPosition];
                calculationByOperation(sign, elementPosition);  // calling the function to resolve the sub expression found
                i = 0;    // resets the counter to begin from the start of the expression
            }
        }

        // calculating addition and subtraction from left to right
        for (var i = 0, d; d = expressionArray[i]; i++) {
            if (d == '+') {
                var elementPosition = expressionArray.indexOf('+');
                var sign = expressionArray[elementPosition];
                calculationByOperation(sign, elementPosition);  // calling the function to resolve the sub expression found
                i = 0;  // resets the counter to begin from the start of the expression
            }
            if (d == '-') {
                var elementPosition = expressionArray.indexOf('-');
                var sign = expressionArray[elementPosition];
                calculationByOperation(sign, elementPosition);  // calling the function to resolve the sub expression found
                i = 0;  // resets the counter to begin from the start of the expression
            }
        }
    }

    // function to perform the calculation
    function calculationByOperation(sign, elementPosition) {
        // declaring the variables required
        var a = expressionArray[elementPosition - 1];   // selecting the first term
        var b = expressionArray[elementPosition + 1];   // selecting the second term
        var elementDelete = elementPosition - 1;        // selecting the start position to delete the elements resolved
        var answer = 0;

        // this will perform the calculation per term
        switch (sign) {
            // division case and checks for division by zero
            case '/':
                if (b == 0)
                {
                    divisionByZero = 1;
                }
                else
                {
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
        }

        expressionArray.splice(elementDelete, 3, answer); // replaces the current sub expression with an answer
    }

}
