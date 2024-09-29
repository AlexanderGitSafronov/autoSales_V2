const formCall = document.querySelector("#form__call");
const formCar = document.querySelector("#form__car");
const callMe = document.querySelectorAll(".call__me");
const modalCall = document.querySelector(".modal");
const modalCars = document.querySelector(".modal__cars");
let formCallName = document.querySelector("#name");
let formCallPhone = document.querySelector("#phone");
let formCarName = document.querySelector("#name_car");
let formCarPhone = document.querySelector("#phone_car");
const closeModalbtn = document.querySelectorAll(".close__button button");
const headerWrapper = document.querySelector(".header__wrapper");
const body = document.querySelector("body");
const mobilAlert = document.querySelector(".mobil__alert");
const nameAlert = document.querySelector(".mobil__alert_name");

const selectYears = document.querySelector('.select__years')

const TOKEN = "5918847125:AAHcH_WlzTRNSKMvAXrsXx0R2FxI4KuEfB0";
const CHAT_ID = "-1001984639295";
const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

formCall.addEventListener("submit", function (e) {
  e.preventDefault();
  let message = `<b>Заявка с сайта!</b>\n`;
  message += `<b>Отправитель:</b> ${this.name.value.trim()}\n`;
  message += `<b>Номер:</b> ${this.phone.value}`;

  if (
    this.phone.value.charAt(this.phone.value.length - 1) !== "_" &&
    this.name.value
  ) {
    axios
      .post(URL_API, {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: message,
      })
      .then((res) => {
        this.name.value = "";
        this.phone.value = "";
        
        maskNumber();
      })
      .catch((err) => {
        console.log(err);
      });
    modalCall.classList.add("modal__hide");
  } else if (
    this.phone.value.charAt(this.phone.value.length - 1) == "_" &&
    this.name.value
  ) {
    mobilAlert.classList.remove("alert_hide");
  } else if (
    this.phone.value.charAt(this.phone.value.length - 1) == "_" &&
    !this.name.value
  ) {
    mobilAlert.classList.remove("alert_hide");
    nameAlert.classList.remove("alert_hide");
  } else if (
    this.phone.value.charAt(this.phone.value.length - 1) !== "_" &&
    !this.name.value
  ) {
    nameAlert.classList.remove("alert_hide");
  }
});
callMe.forEach((item) => {
  item.addEventListener("click", () => {
    modalCall.classList.remove("modal__hide");
    body.classList.add("body_overflow");
  });
});

closeModalbtn.forEach((item) => {
  item.addEventListener("click", () => {
    modalCall.classList.add("modal__hide");
    modalCars.classList.add("modal__hide");
    body.classList.remove("body_overflow");
  });
});

formCallName.addEventListener("input", (e) => {
  formCallName.value = formCallName.value.replace(/[0-9]/g, "");
  if (formCallName.value) {
    formCallName.value =
      formCallName.value[0].toUpperCase() + formCallName.value.slice(1);
    nameAlert.classList.add("alert_hide");
  }
});

formCallPhone.addEventListener("input", () => {
  if (formCallPhone.value.charAt(this.phone.value.length - 2) !== "_") {
    mobilAlert.classList.add("alert_hide");
  }
});
function maskNumber() {
  let maskOptions = {
    mask: "+38 (000) 000-00-00",
    lazy: false,
  };
  let mask = new IMask(formCallPhone, maskOptions);
  let maskCar = new IMask(formCarPhone, maskOptions);
}
maskNumber();

const headerText = document.querySelector(".hero__section h1");

const accardionBtn = document.querySelector(".section_faq__block");
const accardionText = document.querySelectorAll(".faq__acardion_desc");
const acardionRight = document.querySelectorAll(".right");

accardionBtn.addEventListener("click", (e) => {
  let el = e.target.nextElementSibling;
  let right = e.target.lastElementChild;

  if (el.style.maxHeight) {
    accardionText.forEach((item) => (item.style.maxHeight = null));
    right.classList.remove("down");
  } else {
    accardionText.forEach((item) => (item.style.maxHeight = null));
    acardionRight.forEach((item) => item.classList.remove("down"));
    el.style.maxHeight = el.scrollHeight + "px";
    right.classList.add("down");
  }
});

// const ollTextOpen = document.querySelector(".benefit__container_footer a");
// const ollText = document.querySelector(".oll_text");

// ollTextOpen.addEventListener("click", (e) => {
//   e.preventDefault();
//   if (ollText.style.maxHeight) {
//     ollText.style.maxHeight = null;
//   } else {
//     ollText.style.maxHeight = ollText.scrollHeight + "px";
//   }
// });

// const modalCarInput = document.querySelector("#modal_car");
const nameCarInput = document.querySelector("#name_car");
const mobilAlertCar = document.querySelector(".mobil__alert_car");

// modalCarInput.addEventListener("input", () => {
//   modalCarInput.value = modalCarInput.value.replace(/[0-9]/g, "");
//   if (modalCarInput.value) {
//     modalCarInput.value =
//       modalCarInput.value[0].toUpperCase() + modalCarInput.value.slice(1);
//     nameAlert.classList.add("alert_hide");
//   }
// });
nameCarInput.addEventListener("input", () => {
  nameCarInput.value = nameCarInput.value.replace(/[0-9]/g, "");
  if (nameCarInput.value) {
    nameCarInput.value =
      nameCarInput.value[0].toUpperCase() + nameCarInput.value.slice(1);
    nameAlert.classList.add("alert_hide");
  }
});

const allBtn = document.querySelectorAll(".btn__car");

allBtn.forEach((item) => {
  item.addEventListener("click", () => {
    modalCars.classList.remove("modal__hide");
    body.classList.add("body_overflow");
  });
});

formCarPhone.addEventListener("input", () => {
  if (formCarPhone.value.charAt(formCarPhone.value.length - 1) !== "_") {
    mobilAlertCar.classList.add("alert_hide");
  }
});

formCar.addEventListener("submit", function (e) {
  e.preventDefault();
  let message = `<b>Заявка с сайта!</b>\n`;
  message += `<b>Отправитель:</b> ${this.name_car.value.trim()}\n`;
  message += `<b>Номер:</b> ${this.phone_car.value}\n`;
  message += `<b>Марка авто:</b> ${this.select__car.value}\n`;
  message += `<b>Рік випуску:</b> ${this.select__years.value}\n`;
  message += `<b>Модeль авто:</b> ${this.modal_car.value}`;

  if (this.phone_car.value.charAt(this.phone_car.value.length - 1) !== "_") {
    axios
      .post(URL_API, {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: message,
      })
      .then((res) => {
        this.name_car.value = "";
        this.phone_car.value = "";
        this.select__car.value = 1;
        this.select__years.value = 1;
        this.modal_car.value = "";
        maskNumber();
      })
      .catch((err) => {
        console.log(err);
      });
    modalCall.classList.add("modal__hide");
  } else {
    mobilAlertCar.classList.remove("alert_hide");
  }
});

let scrollpos = window.scrollY;
const btnScroll = document.querySelector(".button__scroll");
const scrollChange = 300;

const add_class_on_scroll = () => {
  btnScroll.classList.add("button__scroll_hide");
};
const remove_class_on_scroll = () => {
  btnScroll.classList.remove("button__scroll_hide");
};

if (scrollpos <= scrollChange) {
  add_class_on_scroll();
} else {
  remove_class_on_scroll();
}
window.addEventListener("scroll", function () {
  scrollpos = window.scrollY;
  if (scrollpos <= scrollChange) {
    add_class_on_scroll();
  } else {
    remove_class_on_scroll();
  }

  //   mainLeftBlockAnimation();
});

// SWIPER
const headerWrapperMobil = document.querySelector(".header__wrapper_mobil");

if (window.innerWidth <= 768) {
  headerWrapperMobil.style.display = "block";
}


const elements = document.querySelectorAll(".main__avto_info");
elements.forEach((element) => {
  let elementPosition;
  if (window.innerWidth > 768) {
    elementPosition =
      element.getBoundingClientRect().top +
      window.scrollY -
      (element.getBoundingClientRect().height + 100);
  } else {
    elementPosition =
      element.getBoundingClientRect().top +
      window.scrollY -
      (element.getBoundingClientRect().height + 250);
  }
  let currentPosition = window.scrollY;
  if (window.innerWidth > 768) {
    if (currentPosition >= elementPosition) {
      element.classList.add("animation__car_block");
      setTimeout(() => {
        element.classList.add("animation__car_block_hover");
      }, 400);
    } else {
      element.classList.remove("animation__car_block");
      element.classList.remove("animation__car_block_hover");
    }
  } else if (window.innerWidth <= 768) {
    if (currentPosition >= elementPosition) {
      element.classList.add("animation__car_block");
      element.style.transitionDelay = "0s";
    } else {
      element.classList.remove("animation__car_block");
      element.style.transitionDelay = "0s";
    }
  }
  window.addEventListener("scroll", () => {
    currentPosition = window.scrollY;

    if (window.innerWidth > 768) {
      if (currentPosition >= elementPosition) {
        element.classList.add("animation__car_block");
        setTimeout(() => {
          element.classList.add("animation__car_block_hover");
        }, 400);
      } else {
        element.classList.remove("animation__car_block");
        element.classList.remove("animation__car_block_hover");
      }
    } else if (window.innerWidth <= 768) {
      if (currentPosition >= elementPosition) {
        element.classList.add("animation__car_block");
        element.style.transitionDelay = "0s";
      } else {
        element.classList.remove("animation__car_block");
        element.style.transitionDelay = "0s";
      }
    }
  });
});

const heroHeaderText = document.querySelector(".hero__section h1");

window.addEventListener("DOMContentLoaded", () => {
  heroHeaderText.style.opacity = "1";
  heroHeaderText.style.transform = "translateX(0px)";
});

const sellBlock = document.querySelectorAll(".sell__description_block");

sellBlock.forEach((element) => {
  let elementPosition;
  let currentPosition = window.scrollY;
  if (window.innerWidth > 768) {
    elementPosition =
      element.getBoundingClientRect().top +
      window.scrollY -
      (element.getBoundingClientRect().height + 100);
  } else {
    elementPosition =
      element.getBoundingClientRect().top +
      window.scrollY -
      (element.getBoundingClientRect().height + 150);
  }

  if (currentPosition >= elementPosition) {
    element.classList.add("sell__description_block_show");
  } else {
    element.classList.remove("sell__description_block_show");
  }

  window.addEventListener("scroll", () => {
    currentPosition = window.scrollY;

    if (window.innerWidth > 768) {
      if (currentPosition >= elementPosition) {
        element.classList.add("sell__description_block_show");
      } else {
        element.classList.remove("sell__description_block_show");
      }
    } else if (window.innerWidth <= 768) {
      if (currentPosition >= elementPosition) {
        element.classList.add("sell__description_block_show");
        element.style.transitionDelay = "0s";
      } else {
        element.classList.remove("sell__description_block_show");
        element.style.transitionDelay = "0s";
      }
    }
  });
});
