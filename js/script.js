document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('regform'); // получение формы
    form.addEventListener('submit', formSend); // добавление обработчика событий

    function formSend(e){
        e.preventDefault(); // отключение возможности взаимодействия с элементами страницы до момента завершения отработки скрипта

        let exit_code = formValidate(form);
        if(exit_code == 1)
        {
            window.open("../html/index.html"); // если регистрация успешна возврат на главную страницу 
        }
    }

    function formValidate(form){
        let formReq = document.querySelectorAll('._req'); // поиск всех обязательныхх полей по классу
    
        for(let index=0; index < formReq.length; index++){
            const input = formReq[index];
            formRemoveError(input);

            if(input.value === ''){ //проверка на заполнение всех обязательных полей
                formAddError(input);
                alert("Заполните обязательное поле");
                return 0;
            }

            else if(input.classList.contains('_email')){ //проверка на заполнение поля почты
                if(emailTest(input)){
                    formAddError(input);
                    alert("Введите почту в формате mail@gmail.com");
                    return 0;
                }
            }
            else if(input.classList.contains('_telephone')){ //проверка на заполнение поля телефон
                if(telephoneTest(input)){
                    formAddError(input);
                    alert("Введите телефон в формате +7(8)XXX-XXX-XX-XX");
                    return 0;
                }
            }
            else if(input.classList.contains('_password')){ //проверка на заполнение поля пароль
                if(passwordTest(input)){
                    formAddError(input);
                    alert("Введите пароль, который содержит хотя бы одно число, хотя бы один спецсимвол(!@#$%^&*), хотя бы одну латинскую букву в нижнем регистре, хотя бы одну латинскую букву в верхнем регистре. Пароль должен состоять более чем из 6 символов.");
                    return0;
                }
                else 
                {
                    var password = input.value; //проверка на совпадение введёных паролей
                }
            }
            else if(input.classList.contains('_confpassword')){ // проверка на заполнение поля подтвердите пароль
                if(input.value != password){
                    formAddError(input);
                    alert("Введённые пароли не совпадают");
                    return 0;
                }
            }
        }
        alert("Регистрация прошла успешно");
        return 1;
    }

    function formAddError(input){ // добавление класса ошибки
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input){ // удаление класса ошибки
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    //Регулярные выражения для проверки полей
    function emailTest(input){
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
    }

    function telephoneTest(input){
        return !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(input.value)
    }

    function passwordTest(input){
        return !/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(input.value)
    } 
})