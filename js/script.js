//$( document ).ready(function() {
console.log( "ready!" );

//First field (name) is focused.
$('#name').focus();  //Select by id. Other option:document.getElmentById('name'); With focus we can be focus on name field when page loads. 
const punsColor = ['cornflowerblue', 'darkslategrey', 'gold'];
const heartColor = ['tomato', 'steelblue', 'dimgrey'];

//Other Job role. Display other field.  
const $otherTitle = $('#other-title'); 
$otherTitle.hide();
$('#title').on('change', (e) => {
    if (e.target.value === 'other'){
      $otherTitle.show();
    } else {
        $otherTitle.hide();
    }
}); 


//T-SHIRT INFO
$('#color').hide();
const title = "Color: Please select a T-shirt theme";
$('label[for="color"]').text(title);

//Display the colors according to the design selected.
$('#design').on('change', function() {
    $('label[for="color"]').text("Color:");
    if ($(this).val() === 'js puns') {
      showColor(punsColor);
    } else if ($(this).val() === 'heart js') {
      showColor(heartColor);
    } else {
        $('#color').hide();
        $('label[for="color"]').text(title);
    }
});

//Function to shoe the colors accordign to the designf selected. 
const showColor = colorGroup => {
    $('#color').show();
    $('#color option').hide();
    $('#color').prepend('<option selected>Please select a T-shirt color</option>');
    $.each(colorGroup, function (index, value){ //https://api.jquery.com/jQuery.each/
        $('#color').children(`option[value="${value}"]`).show();
     });
}

//ACTIVITY SECTION
//Creating a new field to display the total price of activities selected. 
let totalCost = 0; 
let totalCostMessage = $('<div id="total">Total price: $0 </div>');
$('.activities').append(totalCostMessage); //Selected by class. 
const coursesInput = $('.activities input');

//Setting the price course in the value attribute of the input. 
$.each(coursesInput, function (index, input){ 
    if (index === 0) {
        input.value = "200";
    } else {
        input.value = "100";
    }
});

//Evaluating the register acttivities selected in orther to update the total price of the courses selected and disables the actitivites in the same data and time. 
let coursesNotChecked = $( ".activities input:checkbox:not(:checked)");
coursesInput.on('click', function() {
    //Setting the price of the course value to a int. 
   const priceCourse = Number($(this).val());
   if ($(this).is(':checked')) {
       totalCost+=priceCourse;
       const courseTime = $(this).attr('data-day-and-time');
       coursesNotChecked = $( ".activities input:checkbox:not(:checked)");
       $.each(coursesNotChecked, function (index){ 
         if (coursesNotChecked.eq(index).attr('data-day-and-time') === courseTime) {
            coursesNotChecked.eq(index).prop('disabled', true);
         } 
      });
   } else if (!$(this).is(':checked')) {
       totalCost-=priceCourse;
       const courseTime = $(this).attr('data-day-and-time');
        $.each(coursesNotChecked, function (index, input){ 
            if (coursesNotChecked.eq(index).attr('data-day-and-time') === courseTime) {
                coursesNotChecked.eq(index).prop('disabled', false);
             }
       });
    } 
   totalCostMessage.text(`Total Price: $${totalCost}`);
});


//PAYMENT INFO
$('#payment [value="select method"]').hide();  
//Credit card payment selected by default. 
$('#payment [value="Credit Card"]').prop('selected', true);  
$('#paypal').hide();
$('#bitcoin').hide();
const $payment = $('#payment');

//Update the payment information and message acording to the payment option selected. 
$payment.on('change', function() {
    const payOption = $('#payment option').filter(':selected').val();
    switch(payOption) {
        case 'Credit Card': 
                $('#credit-card').show();
                $('#paypal').hide();
                $('#bitcoin').hide();
                break;
        case 'PayPal':
                $('#credit-card').hide();
                $('#paypal').show();
                $('#bitcoin').hide();
                break;
        case 'Bitcoin':
                $('#credit-card').hide();
                $('#paypal').hide();
                $('#bitcoin').show();
                break;

        default: 
                $('#credit-card').show();
                $('#paypal').show();
                $('#bitcoin').show();
                break;
    }
});


//VALIDATION

//Real time validation of the name, email, activities, credit card fields. 
$('#name').focusout(function(){
    nameValidate();
});

$('#mail').focusout(function(){
    emailValidate();
});

$('.activities').focusout(function(){
    activitiesValidate();
});

$('#credit-card').focusout(function() {
    creditcardValidate();
    zipValidate();
    cvvValidate();
});

//Name field validation function.
const nameValidate = () => {
    let validate;
    if ($('#name').val() === ""){
        $('#name').css('border-color', 'red').attr('placeholder', 'Please Enter Your Name');
        validate = false;
    } else {
        $('#name').css('border-color', 'green');
        validate = true; 
    }
    return validate;
}

//Email field validation function.
const emailValidate = () => {
    let emailTest = /\S+@\S+\.\S+/;
    let validate; 
    if ($('#mail').val() === ""){
        $('#mail').css('border-color', 'red').attr('placeholder', 'Please Enter Your Email');
        validate = false;
    } else if (emailTest.test($('#mail').val())) {
        $('#mail').css('border-color', 'green')
        validate = true;
    }  else {
        $('#mail').css('border-color', 'red').attr('placeholder', 'Please Enter a Valid Email');
        validate = false;
    }
    return validate;
}

//Register Activities field validation function.
let selectActivity = $('.activities').prepend('<div id="selActivity">Please select at least 1 actitivy </div>');
$('#selActivity').hide();
const activitiesValidate = () => {
    let validate;
    if ($(".activities input[type=checkbox]:checked").length > 0){
        $('#selActivity').hide();
        validate = true; 
    } else {
        $('#selActivity').show();
        validate = false; 
    }
    return validate;
}

//Credit Card Number field validation function.
const creditcardValidate = () => {
    let cardTest = /^[0-9]{13,16}$/;
    let validate;
    if ($('#cc-num').val() === ""){
        $('#cc-num').css('border-color', 'red').attr('placeholder', 'Please Enter Your Credit Card Number');
        validate = false;
    } else if (cardTest.test($('#cc-num').val())) {
        $('#cc-num').css('border-color', 'green')
        validate = true;
    } else {
        $('#cc-num').css('border-color', 'red').attr('placeholder', 'Please Enter a Valid Credit Card Number');
        validate = false;
    }
    return validate;
}

//Credit Card ZIP field validation function.
const zipValidate = () => {
    let zipTest = /^[0-9]{5}$/;
    let validate; 
    if ($('#zip').val() === ""){
        $('#zip').css('border-color', 'red').attr('placeholder', 'Please Enter Your Zip Code');
        validate = false;
    } else if (zipTest.test($('#zip').val())) {
        $('#zip').css('border-color', 'green')
        validate = true;
    } else {
        $('#zip').css('border-color', 'red').attr('placeholder', 'Please Enter a Valid Zip Code');
        validate = false;
    }
    return (validate);
}

//Credit Card CVV field validation function.
const cvvValidate = () => {
    let cvvTest = /^[0-9]{3}$/;
    let validate;
    if ($('#cvv').val() === ""){
        $('#cvv').css('border-color', 'red').attr('placeholder', 'Please Enter Your CVV');
        validate = false; 
    } else if (cvvTest.test($('#cvv').val())) {
        $('#cvv').css('border-color', 'green')
        validate = true; 
    } else {
        $('#cvv').css('border-color', 'red').attr('placeholder', 'Please Enter a Valid CVV');
        validate = false;
    }
    return validate;
}

/*Button to submit form. Before Submit form we validate the base fields as name, email and activities.
In case of credit card payment we validate the credit number, ZIP and CVV fields before submit the form. 
*/
$(":button" ).click ((e) =>{
    e.preventDefault();
    console.log("Button Clicked" );
    if (nameValidate() && emailValidate() && activitiesValidate()){
        console.log("Name ,email and activity validated");
        if($('#payment option').filter(':selected').val() === "Credit Card" && creditcardValidate() && zipValidate() && cvvValidate()) {
            console.log("Submited Credit Card");
            $("form").submit(); 
          } else if ($('#payment option').filter(':selected').val() !== "Credit Card"){
            console.log("Submited other payment");
            $("form").submit();  
        }
    } else {
        nameValidate();
        emailValidate();
        activitiesValidate();
        creditcardValidate();
        zipValidate();
        cvvValidate()
    }

 }); 
        
//});
