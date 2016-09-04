$('#guestForm').submit(function(e){
    e.preventDefault()
    $this = $(this);
    var name = $this.find('#name').val(),
        email = $this.find('#email').val(),
        mobile = $this.find('#mobile').val();
        message = $this.find('#message').val();

    $('#thankyouName').html(capitalizeFirstLetter(name));
    if(!validateName(name)) {
        $this.find('#name').siblings('p[id^="inputWarning"]').slideDown();
    }

    var validateEmailOrMobile = validateEmail(email) || validateMobileNumber(mobile);
    if(!validateEmailOrMobile) {
        $this.find('#email').siblings('p[id^="inputWarning"]').slideDown();    
        $this.find('#mobile').siblings('p[id^="inputWarning"]').slideDown();    
    }

    if(!validateEmail(email)) {
        email = "";
    }
    if(!validateMobileNumber(mobile)) {
        mobile = "";
    }

    if(validateName(name) && validateEmailOrMobile) {
        var key = name + "_"+ (new Date()).getTime();
        var guest = {
            "id" : (new Date()).getTime(),
            "name" : name,
            "email" : email,
            "mobile" : mobile,
            "message" : message
        }
        console.log("key", key);
        console.log("guest", guest);
        localforage.setItem(key, guest);
        $this[0].reset();
        $('p[id^="inputWarning"]').hide();
        $this.hide();
        $('#thankyouBox').show();

    } else {
        console.log('not validate');
    }

})


function validateMobileNumber(number) {
    var re = /^\d{10}$/;
    return re.test(number);
}
function validateEmail (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validateName(name) {
    return name.length >= 3;
}
function submitAnother() {
    $('#thankyouBox').hide();
    $('#guestForm').show();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$(document).ready(function() {
    $('input').on('change', function () {
        $(this).siblings('p[id^="inputWarning"]').slideUp();
    })
});