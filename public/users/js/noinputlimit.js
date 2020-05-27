var limit = {
  noInputAlert: function (target, name) {
    console.log("noinputalert done");
    jason = $(`.${target}`);
    if (jason.val() === "") {
      alert(`${name}이 채워지지 않았습니다.`);
    } else {
      continue;
    }
  },
  noCheckAlert: function (target) {
    jason = $(target);
    if (jason.prop("checked") == false) {
      alert(`Something not checked!`);
    }
  },
};
