
// This function will operate a slide motion for the text explaining the
// allowed formats for the calculator
$(document).ready(function()
{

// focus the cursor on the expression text box on webpage load
    $('#inputTextBox').focus();


// focus the cursor on the expression text box after clicking the
// 'Clear Expression' button
    $( "#clearExpression" ).click(function()
  {
    $( "#inputTextBox" ).focus()
  });

  // focus the cursor on the expression text box after clicking the
  // 'Clear All' button
  $( "#clearAll" ).click(function()
{
  $( "#inputTextBox" ).focus()
});


// opens the quick guide on how to use the calculator
    $( "#buttonReadMe" ).click(function()
    {
      $( ".readMeTextBox" ).slideToggle();
    });
});
