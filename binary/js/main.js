"use strict"; // WEBP =======================================

function testWebP(callback) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };

  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
}); //=============================================
// IBG =======================================

function ibg() {
  var ibg = document.querySelectorAll(".ibg");

  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector("img")) {
      ibg[i].style.backgroundImage = "url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
    }
  }
}

ibg(); //=============================================
// Parallax =======================================

$(window).resize(function (event) {
  intro();
});

function intro() {
  var h = $(window).outerHeight();
  $(".intro").css("min-height", h);
}

intro();
$(window).scroll(function (event) {
  var prlx = 0 - $(this).scrollTop() / 3;
  $(".intro__bg").css("transform", "translate3d(0," + prlx + "px,0)");
}); //=============================================
// baguetteBox  ===============================

window.addEventListener("load", function () {
  baguetteBox.run(".gallery");
}); //=============================================
// MixItUp =======================================

var mixer = mixitup(".portfolio__items"); //=============================================
// GOTO =======================================

$(".goto").click(function () {
  var el = $(this).attr("href").replace("#", "");
  var offset = 0;
  $("body,html").animate({
    scrollTop: $("." + el).offset().top + offset
  }, 700, function () {});
  return false;
}); //=============================================
// FORM =======================================

function forms() {
  //FIELDS
  $("input,textarea").focus(function () {
    if ($(this).val() == $(this).attr("data-value")) {
      $(this).addClass("focus");
      $(this).parent().addClass("focus");

      if ($(this).attr("data-type") == "pass") {
        $(this).attr("type", "password");
      }

      $(this).val("");
    }

    removeError($(this));
  }); //MASKS//
  //'+7(999) 999 9999'
  //'+38(999) 999 9999'
  //'+375(99)999-99-99'
  //'a{3,1000}' только буквы минимум 3
  //'9{3,1000}' только цифры минимум 3

  $.each($("input.phone"), function (index, val) {
    $(this).attr("type", "tel");
    $(this).focus(function () {
      $(this).inputmask("+7(999) 999 9999", {
        clearIncomplete: true,
        clearMaskOnLostFocus: true,
        onincomplete: function onincomplete() {
          maskclear($(this));
        }
      });
      $(this).addClass("focus");
      $(this).parent().addClass("focus");
      $(this).parent().removeClass("err");
      $(this).removeClass("err");
    });
  });
  $("input.phone").focusout(function (event) {
    maskclear($(this));
  });
  $.each($("input.num"), function (index, val) {
    $(this).focus(function () {
      $(this).inputmask("9{1,1000}", {
        clearIncomplete: true,
        placeholder: "",
        clearMaskOnLostFocus: true,
        onincomplete: function onincomplete() {
          maskclear($(this));
        }
      });
      $(this).addClass("focus");
      $(this).parent().addClass("focus");
      $(this).parent().removeClass("err");
      $(this).removeClass("err");
    });
  });
  $("input.num").focusout(function (event) {
    maskclear($(this));
  });
}

forms();

function digi(str) {
  var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  return r;
} //VALIDATE FORMS


$("form button[type=submit]").click(function () {
  var er = 0;
  var form = $(this).parents("form");
  var ms = form.data("ms");
  $.each(form.find(".req"), function (index, val) {
    er += formValidate($(this));
  });

  if (er == 0) {
    removeFormError(form);
    /*
     var messagehtml='';
    if(form.hasClass('editprofile')){
     var messagehtml='';
    }
    formLoad();
    */
    //ОПТРАВКА ФОРМЫ

    /*
    function showResponse(html){
     if(!form.hasClass('nomessage')){
      showMessage(messagehtml);
     }
     if(!form.hasClass('noclear')){
      clearForm(form);
     }
    }
    var options={
     success:showResponse
    };
     form.ajaxForm(options);
    
    		  setTimeout(function(){
     if(!form.hasClass('nomessage')){
      // showMessage(messagehtml);
      showMessageByClass(ms);
     }
     if(!form.hasClass('noclear')){
      clearForm(form);
     }
    },0);
    		  return false;
    */

    if (ms != null && ms != "") {
      showMessageByClass(ms);
      return false;
    }
  } else {
    return false;
  }
});

function formValidate(input) {
  var er = 0;
  var form = input.parents("form");

  if (input.attr("name") == "email" || input.hasClass("email")) {
    if (input.val() != input.attr("data-value")) {
      var em = input.val().replace(" ", "");
      input.val(em);
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(input.val()) || input.val() == input.attr("data-value")) {
      er++;
      addError(input);
    } else {
      removeError(input);
    }
  } else {
    if (input.val() == "" || input.val() == input.attr("data-value")) {
      er++;
      addError(input);
    } else {
      removeError(input);
    }
  }

  if (input.attr("type") == "checkbox") {
    if (input.prop("checked") == true) {
      input.removeClass("err").parent().removeClass("err");
    } else {
      er++;
      input.addClass("err").parent().addClass("err");
    }
  }

  if (input.hasClass("name")) {
    if (!/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val())) {
      er++;
      addError(input);
    }
  }

  if (input.hasClass("pass-2")) {
    if (form.find(".pass-1").val() != form.find(".pass-2").val()) {
      addError(input);
    } else {
      removeError(input);
    }
  }

  return er;
}

function clearForm(form) {
  $.each(form.find(".input"), function (index, val) {
    $(this).removeClass("focus").val($(this).data("value"));
    $(this).parent().removeClass("focus");

    if ($(this).hasClass("phone")) {
      maskclear($(this));
    }
  });
}

function addError(input) {
  input.addClass("err");
  input.parent().addClass("err");
  input.parent().find(".form__error").remove();

  if (input.hasClass("email")) {
    var error = "";

    if (input.val() == "" || input.val() == input.attr("data-value")) {
      error = input.data("error");
    } else {
      error = input.data("error");
    }

    if (error != null) {
      input.parent().append('<div class="form__error">' + error + "</div>");
    }
  } else {
    if (input.data("error") != null && input.parent().find(".form__error").length == 0) {
      input.parent().append('<div class="form__error">' + input.data("error") + "</div>");
    }
  }

  if (input.parents(".select-block").length > 0) {
    input.parents(".select-block").parent().addClass("err");
    input.parents(".select-block").find(".select").addClass("err");
  }
}

function removeError(input) {
  input.removeClass("err");
  input.parent().removeClass("err");
  input.parent().find(".form__error").remove();

  if (input.parents(".select-block").length > 0) {
    input.parents(".select-block").parent().removeClass("err");
    input.parents(".select-block").find(".select").removeClass("err").removeClass("active"); //input.parents('.select-block').find('.select-options').hide();
  }
}

function removeFormErrors(form) {
  form.find(".err").removeClass("err");
  form.find(".form__error").remove();
}

function maskclear(n) {
  if (n.val() == "") {
    n.inputmask("remove");
    n.val(n.attr("data-value"));
    n.removeClass("focus");
    n.parent().removeClass("focus");
  }
} //=============================================