(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _sweetlyHotCartoon = require("sweetly-hot-cartoon");

var _sweetlyHotCartoon2 = _interopRequireDefault(_sweetlyHotCartoon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_sweetlyHotCartoon2.default);
var inputty = _sweetlyHotCartoon2.default.Input;
var build = new inputty("input");
build.init();
},{"sweetly-hot-cartoon":3}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a calendar datepicker
 *
 */
var Calendar = function () {
  function Calendar(container) {
    _classCallCheck(this, Calendar);

    this.state = {
      weekday: 0,
      day: 0,
      month: 0,
      year: 0,
      currentSelection: 0
    };
    this.daysOftheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    this.container = document.querySelector("." + container);
  }

  /**
   * Adds event listeners on the buttons and the calendar
   *
   */


  _createClass(Calendar, [{
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this = this;

      document.querySelector(".datepicker__back").addEventListener("click", function (e) {
        return _this.onBack();
      });
      document.querySelector(".datepicker__forward").addEventListener("click", function (e) {
        return _this.onForward();
      });
      document.querySelector(".calendar").addEventListener("click", this.onClick.bind(this));
      document.querySelector(".calendar").addEventListener("keyup", this.onKeyUp.bind(this));
    }

    /**
     * Fills the calendar for the particular month
     *
     * @param the number of days in that month
     */

  }, {
    key: "buildCalendar",
    value: function buildCalendar(days) {
      //this is hacky but when you create dates January is 01
      var monthsOfTheYear = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      var weekdays = "" + this.createWeekdayHeaders().join("");

      var daysOfTheMonth = this.createDaysOfTheMonth(days, monthsOfTheYear);

      var monthLabel = "<h2 class=\"datepicker__month\">" + monthsOfTheYear[this.state.month] + " " + this.state.year + "</h2>";
      var back = "<button class=\"datepicker__back\" aria-label=\"Previous Month\">Back</button>";
      var forth = "<button class=\"datepicker__forward\" aria-label=\"Next Month\">Forth</button>";

      this.container.innerHTML = back + monthLabel + forth + weekdays + daysOfTheMonth;
      document.getElementById(this.state.currentSelection).classList.add("selected");
      document.getElementById(this.state.currentSelection).focus();
      this.addEventListeners();
    }

    /**
     * Helper function change the date onKeyUp
     *
     * @param type: String
     * @param amount: Number
     */

  }, {
    key: "changeDate",
    value: function changeDate(type, amount) {
      var currentSelection = new Date(this.state.month + ", " + this.state.currentSelection + ", " + this.state.year);
      var newSelection = new Date(currentSelection);

      var timestamp = void 0;
      if (type == "subtract") {
        timestamp = newSelection.setDate(currentSelection.getDate() - amount);
      } else {
        timestamp = newSelection.setDate(currentSelection.getDate() + amount);
      }

      var theDayToday = new Date(timestamp);
      this.state.currentSelection = theDayToday.getDate();
      //if we're adding, we need to add +1 to the month because of the discrepancy between the index of months when created (see comment in buildCalendar)
      var month = type == "subtract" ? theDayToday.getMonth() : theDayToday.getMonth() + 1;
      if (month != this.state.month) {
        this.prepareCalendarData(theDayToday);
      }
    }

    /**
     * Helper function to create a div for the days of the week and the empty days at the beginning of the month
     *
     * @returns a string of divs that create the days of the month
     */

  }, {
    key: "createDaysOfTheMonth",
    value: function createDaysOfTheMonth(days, months) {
      var state = this.state;
      var daysOftheWeek = this.daysOftheWeek;
      var firstDayOfTheMonth = new Date(this.state.month + " 01 " + this.state.year);

      if (firstDayOfTheMonth.getDay() == 0) {
        return "<div class=\"calendar\">" + createDaysOfTheWeek(Array(days).fill(1)).join("") + "</div>";
      } else {
        var emptyDays = "" + createEmptyDivs(Array(firstDayOfTheMonth.getDay()).fill(1)).join("");
        return "<div class=\"calendar\">" + emptyDays + createDaysOfTheWeek(Array(days).fill(1)).join("") + "</div>";
      }

      function createDaysOfTheWeek(arrayOfDays) {
        return arrayOfDays.map(function (elem, index) {
          //we're creating a new Date each day so we can get the day of the week to include in the label
          var newDay = new Date(state.month + ", " + (index + 1) + ", " + state.year);
          var weekday = newDay.getDay();
          return "<button class=\"calendar__days\" id=\"" + (index + 1) + "\" aria-label=\"" + daysOftheWeek[weekday] + " " + months[state.month] + " " + (index + 1) + "\">" + (index + 1) + "</button>";
        });
      }

      function createEmptyDivs(array) {
        return array.map(function (elem) {
          return "<div></div>";
        });
      }
    }

    /**
     * Helper function to create the weekday headers
     *
     * @returns a string of divs that create the weekday headers
     */

  }, {
    key: "createWeekdayHeaders",
    value: function createWeekdayHeaders() {
      return this.daysOftheWeek.map(function (weekday) {
        return "<div class=\"datepicker__weekday\">" + weekday + "</div>";
      });
    }

    /**
     * Initializes a calendar on the curresnt date
     *
     */

  }, {
    key: "init",
    value: function init() {
      var rightNow = new Date();
      this.prepareCalendarData(rightNow);
    }

    /**
     * Switches view to previous month
     *
     */

  }, {
    key: "onBack",
    value: function onBack(e, fromKeyboard) {
      var previousMonth = this.state.month == 1 ? new Date("12 01 " + (this.state.year - 1)) : new Date(this.state.month - 1 + " 01 " + this.state.year);

      if (fromKeyboard) {
        return previousMonth;
      } else this.prepareCalendarData(previousMonth);
    }

    /**
     * Adds highlight when clicked and updates state
     *
     */

  }, {
    key: "onClick",
    value: function onClick(e) {
      if (this.state.currentSelection) {
        document.getElementById(this.state.currentSelection).classList.remove("selected");
      }

      document.getElementById(e.target.id).classList.add("selected");
      this.state.currentSelection = Number(e.target.id);
    }

    /**
     * Switches view to next month
     *
     */

  }, {
    key: "onForward",
    value: function onForward(e, fromKeyboard) {
      var nextMonth = this.state.month == 12 ? new Date("01 01 " + (this.state.year + 1)) : new Date(this.state.month + 1 + " 01 " + this.state.year);

      if (fromKeyboard) {
        return nextMonth;
      } else this.prepareCalendarData(nextMonth);
    }

    /**
     * Adds keyboard navigation and updates state
     */

  }, {
    key: "onKeyUp",
    value: function onKeyUp(e) {
      if (this.state.currentSelection) {
        document.getElementById(this.state.currentSelection).classList.remove("selected");
      }

      if (e.key.toLowerCase() === "tab") {
        this.state.currentSelection = Number(e.target.id);
      }
      if (e.key === "ArrowLeft") {
        this.changeDate("subtract", 1);
      }
      if (e.key === "ArrowRight") {
        this.changeDate("add", 1);
      }
      if (e.key === "ArrowUp") {
        this.changeDate("subtract", 7);
      }
      if (e.key === "ArrowDown") {
        this.changeDate("add", 7);
      }

      document.getElementById(this.state.currentSelection).focus();
      document.getElementById(this.state.currentSelection).classList.add("selected");
    }

    /**
     * Sets state and prepares to fill calendar
     *
     * @param a Date object
     */

  }, {
    key: "prepareCalendarData",
    value: function prepareCalendarData(currentDate) {
      this.state.weekday = currentDate.getDay();
      this.state.day = currentDate.getDate();
      this.state.month = currentDate.getMonth() + 1;
      this.state.year = currentDate.getFullYear();
      this.state.currentSelection = this.state.day;
      var daysInMonth = new Date(this.state.year, this.state.month, 0).getDate();
      this.buildCalendar(daysInMonth);
    }
  }, {
    key: "returnState",
    value: function returnState() {
      return this.state;
    }
  }]);

  return Calendar;
}();

module.exports = { Calendar: Calendar };
},{}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Calendar = require("./datepicker.js");

var Input = function () {
  function Input(container) {
    _classCallCheck(this, Input);

    this.container = document.querySelector("." + container);
    this.input = "";
    this.datepickerDiv = document.querySelector(".datepicker");
    this.cally = new Calendar.Calendar("datepicker");
  }

  _createClass(Input, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.container.innerHTML = "\n      <label for=\"datepicker-input\">Date:</label>\n      <input type=\"text\" id=\"datepicker-input\"></input>\n      <button class=\"datepicker-button\">Datepicker</button>";

      this.listenForDatepickerButton();

      this.input = document.getElementById("datepicker-input");
      this.input.addEventListener("input", function (e) {
        return _this.formatDate(e.target.value);
      });
    }
  }, {
    key: "checkValue",
    value: function checkValue(str, max) {
      if (str.charAt(0) !== "0" || str == "00") {
        var num = parseInt(str);
        if (isNaN(num) || num <= 0 || num > max) {
          num = 1;
        }
        str = num.toString().length == 1 ? "0" + num : num.toString();
      }
      return str;
    }
  }, {
    key: "checkIfItWorks",
    value: function checkIfItWorks() {
      console.log("hey");
    }
  }, {
    key: "formatDate",
    value: function formatDate(date) {
      var inputValue = date;
      if (/\D\/$/.test(inputValue)) {
        inputValue = inputValue.substr(0, inputValue.length - 1);
      }
      var values = inputValue.split("/").map(function (v) {
        return v.replace(/\D/g, "");
      });
      if (values[0]) {
        values[0] = this.checkValue(values[0], 12);
      }
      if (values[1]) {
        values[1] = this.checkValue(values[1], 31);
      }
      var output = values.map(function (v, i) {
        return v.length == 2 && i < 2 ? v + " / " : v;
      });
      this.input.value = output.join("").substr(0, 14);
    }
  }, {
    key: "listenForDatepickerButton",
    value: function listenForDatepickerButton() {
      var _this2 = this;

      document.querySelector(".datepicker-button").addEventListener("click", function (e) {
        return _this2.openDatepicker(e);
      });
    }
  }, {
    key: "openDatepicker",
    value: function openDatepicker(e) {
      var _this3 = this;

      if (this.datepickerDiv.classList.contains("datepicker--active")) {
        this.datepickerDiv.classList.remove("datepicker--active");
        this.datepickerDiv.style.display = "none";
        return;
      }

      this.datepickerDiv.style.display = "grid";

      if (this.input.value) {
        var val = this.input.value;
        var month = val.slice(0, 2) - 1;
        var day = val.slice(5, 7);
        var year = val.slice(10, 14);
        var preselectedDay = new Date(year, month, day);
        this.cally.prepareCalendarData(preselectedDay);
      } else {
        this.cally.init();
        var state = this.cally.returnState();
        this.formatDate(state.month + " / " + state.currentSelection + " / " + state.year);
      }

      this.datepickerDiv.classList.add("datepicker--active");
      this.datepickerDiv.addEventListener("keyup", function (e) {
        return _this3.onKeyUp(e);
      });
      this.datepickerDiv.addEventListener("click", function (e) {
        return _this3.onClick(e);
      });
    }
  }, {
    key: "onClick",
    value: function onClick(e) {
      var state = this.cally.returnState();
      this.formatDate(state.month + " / " + state.currentSelection + " / " + state.year);
      if (e.target.className !== "datepicker__back" && e.target.className !== "datepicker__forward") {
        this.datepickerDiv.classList.remove("datepicker--active");
        this.datepickerDiv.style.display = "none";
      }
    }
  }, {
    key: "onKeyUp",
    value: function onKeyUp(e) {
      var state = this.cally.returnState();
      this.formatDate(state.month + " / " + state.currentSelection + " / " + state.year);
      if (e.key == "Enter") {
        this.datepickerDiv.classList.remove("datepicker--active");
        this.datepickerDiv.style.display = "none";
      }
    }
  }]);

  return Input;
}();

module.exports = { Input: Input };
},{"./datepicker.js":2}]},{},[1]);
