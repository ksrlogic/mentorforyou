JotForm.init(function () {
  if (window.JotForm && JotForm.accessible)
    $("input_14").setAttribute("tabindex", 0);
  setTimeout(function () {
    $("input_4").hint("ex: myname@example.com");
  }, 20);
  if (window.JotForm && JotForm.accessible)
    $("input_15").setAttribute("tabindex", 0);
  if (window.JotForm && JotForm.accessible)
    $("input_18").setAttribute("tabindex", 0);
  if (window.JotForm && JotForm.accessible)
    $("input_19").setAttribute("tabindex", 0);
  if (window.JotForm && JotForm.accessible)
    $("input_10").setAttribute("tabindex", 0);
  JotForm.newDefaultTheme = false;
  /*INIT-END*/
});

JotForm.prepareCalculationsOnTheFly([
  null,
  {
    name: "input1",
    qid: "1",
    text: "나는 누구인가요..?",
    type: "control_head",
  },
  { name: "input2", qid: "2", text: "제출", type: "control_button" },
  null,
  {
    name: "input4",
    qid: "4",
    subLabel: "멘토분을 찾으면 이쪽으로 연락을 드릴게요!",
    text: "이메일주소",
    type: "control_email",
  },
  null,
  null,
  null,
  null,
  { name: "gender", qid: "9", text: "성별", type: "control_radio" },
  {
    name: "input10",
    qid: "10",
    text: "간단한 자기소개",
    type: "control_textarea",
  },
  null,
  null,
  null,
  {
    description: "",
    name: "input14",
    qid: "14",
    subLabel: "",
    text: "이름",
    type: "control_textbox",
  },
  {
    description: "",
    name: "id",
    qid: "15",
    subLabel: "멘토분을 찾으면 이쪽으로 연락을 드릴게요! 플러스친구 멘토포유!",
    text: "카카오톡ID",
    type: "control_textbox",
  },
  {
    description: "",
    name: "input16",
    qid: "16",
    text: "준비하는 전형    (중복선택가능)",
    type: "control_checkbox",
  },
  {
    description: "",
    name: "input17",
    qid: "17",
    text: "목표 대학       (중복선택가능)",
    type: "control_checkbox",
  },
  {
    description: "",
    name: "input18",
    qid: "18",
    subLabel: "",
    text: "현재 내신등급",
    type: "control_textbox",
  },
  {
    description: "",
    name: "input19",
    qid: "19",
    subLabel: "",
    text: "최근 모의고사    성적",
    type: "control_textbox",
  },
  {
    description: "",
    name: "input20",
    qid: "20",
    text:
      "최근 모의고사 점수(가장 최근 점수를 솔직하게 입력해주세요. 없다면 다음으로.)",
    type: "control_matrix",
  },
  {
    description: "",
    name: "input21",
    qid: "21",
    text: "계열",
    type: "control_radio",
  },
  {
    description: "",
    name: "input22",
    qid: "22",
    text: "탐구선택과목",
    type: "control_checkbox",
  },
  {
    description: "",
    name: "input23",
    qid: "23",
    text: "탐구선택과목",
    type: "control_checkbox",
  },
]);
setTimeout(function () {
  JotForm.paymentExtrasOnTheFly([
    null,
    {
      name: "input1",
      qid: "1",
      text: "나는 누구인가요..?",
      type: "control_head",
    },
    { name: "input2", qid: "2", text: "제출", type: "control_button" },
    null,
    {
      name: "input4",
      qid: "4",
      subLabel: "멘토분을 찾으면 이쪽으로 연락을 드릴게요!",
      text: "이메일주소",
      type: "control_email",
    },
    null,
    null,
    null,
    null,
    { name: "gender", qid: "9", text: "성별", type: "control_radio" },
    {
      name: "input10",
      qid: "10",
      text: "간단한 자기소개",
      type: "control_textarea",
    },
    null,
    null,
    null,
    {
      description: "",
      name: "input14",
      qid: "14",
      subLabel: "",
      text: "이름",
      type: "control_textbox",
    },
    {
      description: "",
      name: "id",
      qid: "15",
      subLabel:
        "멘토분을 찾으면 이쪽으로 연락을 드릴게요! 플러스친구 멘토포유!",
      text: "카카오톡ID",
      type: "control_textbox",
    },
    {
      description: "",
      name: "input16",
      qid: "16",
      text: "준비하는 전형    (중복선택가능)",
      type: "control_checkbox",
    },
    {
      description: "",
      name: "input17",
      qid: "17",
      text: "목표 대학       (중복선택가능)",
      type: "control_checkbox",
    },
    {
      description: "",
      name: "input18",
      qid: "18",
      subLabel: "",
      text: "현재 내신등급",
      type: "control_textbox",
    },
    {
      description: "",
      name: "input19",
      qid: "19",
      subLabel: "",
      text: "최근 모의고사    성적",
      type: "control_textbox",
    },
    {
      description: "",
      name: "input20",
      qid: "20",
      text:
        "최근 모의고사 점수(가장 최근 점수를 솔직하게 입력해주세요. 없다면 다음으로.)",
      type: "control_matrix",
    },
    {
      description: "",
      name: "input21",
      qid: "21",
      text: "계열",
      type: "control_radio",
    },
    {
      description: "",
      name: "input22",
      qid: "22",
      text: "탐구선택과목",
      type: "control_checkbox",
    },
    {
      description: "",
      name: "input23",
      qid: "23",
      text: "탐구선택과목",
      type: "control_checkbox",
    },
  ]);
}, 20);
