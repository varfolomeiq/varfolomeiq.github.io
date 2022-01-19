new Swiper(".image-slider", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

function functionone() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function functionsecond() {
  document.getElementById("myDropdownsecond").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtnq")) {
    var dropdownsq = document.getElementsByClassName("dropdown-contentq");
    var i;
    for (i = 0; i > dropdownsq.length; i++) {
      var openDropdownq = dropdownsq[i];
      if (openDropdownq.classList.contains("show")) {
        openDropdownq.classList.remove("show");
      }
    }
  }
};

function functionthird() {
  document.getElementById("myDropdownthird").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtnw")) {
    var dropdownsw = document.getElementsByClassName("dropdown-contentw");
    var i;
    for (i = 0; i > dropdownsw.length; i++) {
      var openDropdownw = dropdownsw[i];
      if (openDropdownw.classList.contains("show")) {
        openDropdownw.classList.remove("show");
      }
    }
  }
};

var slider = document.getElementById("costrange");

noUiSlider.create(costrange, {
  start: [50, 2000],
  tooltips: true,
  connect: true,
  range: {
    min: 50,
    max: 2000,
  },
  format: {
    to: function (value) {
      return parseInt(value);
    },
    from: function (value) {
      return parseInt(value);
    },
  },
});

var slider = document.getElementById("playersrange");

noUiSlider.create(playersrange, {
  start: [1, 6],
  tooltips: true,
  connect: true,
  range: {
    min: 1,
    max: 12,
  },
  format: {
    to: function (value) {
      return parseInt(value);
    },
    from: function (value) {
      return parseInt(value);
    },
  },
});
var slider = document.getElementById("agerange");

noUiSlider.create(agerange, {
  start: [3, 14],
  tooltips: true,
  connect: true,
  range: {
    min: 3,
    max: 16,
  },
  format: {
    to: function (value) {
      return parseInt(value);
    },
    from: function (value) {
      return parseInt(value);
    },
  },
});
var acc = document.getElementsByClassName("button-down");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

$(function () {
  $(".scroll-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });
});
