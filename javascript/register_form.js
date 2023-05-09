const usernameField = document.getElementById("username"); 
const passwordField = document.getElementById("password"); 
const confirmPasswordField = document.getElementById("confirm_password");

const username_error = document.getElementById("username_error");
const password_error = document.getElementById("password_error");
const confirm_password_error = document.getElementById("confirm_password_error");

$("form").submit(function (event) { 
    event.preventDefault();
    removeClasses()

    // als alles is ingevuld 
    if (usernameField.value!= '' && passwordField.value != '' && confirmPasswordField.value != '') { 
        $.ajax({
            type: "POST",
            url: "./controller/ajax_register_controller.php",
            data: $(this).serialize(),
        }).done(function (data) { 
            // de gebruiker is aangemaakt
            window.location = 'login'
        }).fail(function (data) { 
            var errors = JSON.parse(data.responseText);
            for (var i = 0; i < errors.length; i++) { 
                if (errors[i] == "empty_username") { 
                    emptyUsername()
                } 
                if (errors[i] == "empty_password") {
                    emptyPassword()
                } 
                if (errors[i] == "empty_confirm_password") {
                    emptyConfirmPassword()
                }
                if (errors[i] == "password_too_short") { 
                    passwordField.classList.add("is-invalid")
                    password_error.innerHTML = "Password must be at least 8 characters long"
                }
                if (errors[i] == "passwords_not_match") {
                    confirmPasswordField.classList.add("is-invalid")
                    confirm_password_error.innerHTML = "Passwords do not match"
                }
                if (errors[i] == "username_exists") { 
                    usernameField.classList.add("is-invalid")
                    username_error.innerHTML = "Username already exists"
                }
            }
        })
    }

    // als er iets niet is ingevuld geven we een error een een error melding 
    if (usernameField.value == '') { 
        usernameField.classList.add("is-invalid")
        username_error.innerHTML = "Username can't be empty"
    } else { 
        usernameField.classList.add("is-valid")
        username_error.innerHTML = ""
    }
    if (passwordField.value == '') { 
        passwordField.classList.add("is-invalid"); 
        password_error.innerHTML = "Password can't be empty"
    } else { 
        passwordField.classList.add("is-valid")
        password_error.innerHTML = ""
    }
    if (confirmPasswordField.value == '') { 
        confirmPasswordField.classList.add("is-invalid")
        confirm_password_error.innerHTML = "Confirm password can't be empty"
    } else { 
        confirmPasswordField.classList.add("is-valid")
        confirm_password_error.innerHTML = ""
    }
    
    function removeClasses() { 
        usernameField.classList.remove("is-invalid")
        usernameField.classList.remove("is-valid")
        username_error.innerHTML = ""
        passwordField.classList.remove("is-invalid")
        passwordField.classList.remove("is-valid")
        password_error.innerHTML = ""
        confirmPasswordField.classList.remove("is-invalid")
        confirmPasswordField.classList.remove("is-valid")
        confirm_password_error.innerHTML = ""
    }

    function emptyUsername() { 
        usernameField.classList.add("is-invalid")
        username_error.innerHTML = "Username can't be empty"
    }
    
    function emptyPassword() { 
        passwordField.classList.add("is-invalid")
        password_error.innerHTML = "Password can't be empty"
    }
    
    function emptyConfirmPassword() { 
        confirmPasswordField.classList.add("is-invalid")
        confirm_password_error.innerHTML = "Confirm password can't be empty"
    }
});