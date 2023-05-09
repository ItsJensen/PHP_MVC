    const usernameField = document.getElementById("username");
    const passwordField = document.getElementById("password");
    const usernameError = document.getElementById("username_error")
    const passwordError = document.getElementById("password_error")

    $("form").submit(function (event) { 
        event.preventDefault()
        removeClasses()
        // we gaan kijken of de gebruikersnaam en het wachtwoord is ingevuld
        if (usernameField.value != '' && passwordField.value != "") { 
            $.ajax({ 
                type: "POST", 
                url: "./controller/ajax_login_controller.php",
                data: $(this).serialize(),
            }).done(function (data) {
                document.write(data);
              })

        } if (usernameField.value == '') { 
            usernameField.classList.add("is-invalid")
            usernameError.innerHTML = "Username can't be empty"
        } else { 
            usernameField.classList.add("is-valid")
        } if (passwordField.value == '') { 
            passwordField.classList.add("is-invalid")
            passwordError.innerHTML = "Password can't be empty"
        } else { 
            passwordField.classList.add("is-valid")
        }
    })


    function removeClasses() { 
        usernameField.classList.remove("is-invalid")
        passwordField.classList.remove("is-invalid")
        usernameError.innerHTML = ""
        passwordError.innerHTML = ""
    }

