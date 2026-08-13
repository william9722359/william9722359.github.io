window.DEMO_SCRIPT = {
  start: {
    bg: "black",
    name: "指示",
    who: "sys",
    chapter: "DEMO",
    text: "你是劉赫。",
    next: "s2"
  },
  s2: {
    text: "我們只把指示放到你面前。\n願望要你自己走完。",
    next: "s3"
  },
  s3: {
    text: "天主教國立輔仁大學。應用美術學系。\n今天先從開學開始。",
    next: "wei1"
  },

  wei1: {
    bg: "classroom",
    chapter: "指示 01　鄰座",
    sprite: "wei",
    name: "",
    who: "",
    text: "座位表。她坐在旁邊。",
    next: "wei2"
  },
  wei2: {
    text: "第一眼：感覺很兇。像是沒睡飽。",
    next: "wei3"
  },
  wei3: {
    name: "劉赫",
    who: "you",
    text: "「妳好。」",
    next: "wei4"
  },
  wei4: {
    name: "魏妍姻",
    who: "wei",
    text: "「嗯。」",
    next: "wei5"
  },
  wei5: {
    name: "",
    who: "",
    text: "連你好都沒有回。",
    next: "wei_choice"
  },
  wei_choice: {
    text: "兩人幾乎沒有交流。指示在這裡分岔。",
    choices: [
      { text: "再補一句", next: "wei_more", flag: "wei" },
      { text: "先這樣就好", next: "wei_pass" }
    ]
  },
  wei_more: {
    name: "",
    who: "",
    text: "你又開了口。她沒有接。\n視線轉回前面。空氣沒有比較暖。",
    next: "wei_end"
  },
  wei_pass: {
    text: "一節課就這樣過了。\n只是每天都坐在旁邊。",
    next: "wei_end"
  },
  wei_end: {
    text: "真正變熟，是以後一起做作品的事。\n那條路還沒開放。",
    next: "yang1"
  },

  yang1: {
    bg: "campus",
    sprite: null,
    chapter: "指示 02　重逢",
    name: "",
    who: "",
    text: "開學。校園裡有一個熟悉的身影。",
    next: "yang2"
  },
  yang2: {
    sprite: "yang",
    spriteClass: "bust",
    name: "楊詩寧",
    who: "yang",
    text: "她愣了幾秒，然後笑著說：\n「好久不見。」",
    next: "yang_choice"
  },
  yang_choice: {
    name: "",
    who: "",
    text: "那一瞬間，兩人都想起以前。",
    choices: [
      { text: "走過去", next: "yang_go", flag: "yang" },
      { text: "低著頭走過", next: "yang_pass" }
    ]
  },
  yang_go: {
    name: "",
    who: "",
    text: "你走過去。",
    next: "yang_mem1"
  },
  yang_mem1: {
    bg: "classroom",
    memory: true,
    name: "",
    who: "",
    text: "重考班。準備進輔大應美。\n那時兩人都滿十八。你壓力很大，精神並不好。",
    next: "yang_mem2"
  },
  yang_mem2: {
    name: "楊詩寧",
    who: "yang",
    text: "她當時笑著問：\n「妳還好嗎？」",
    next: "yang_mem3"
  },
  yang_mem3: {
    name: "",
    who: "",
    text: "後來她小聲問過：\n「如果偷偷交往呢？」",
    next: "yang_mem4"
  },
  yang_mem4: {
    name: "劉赫",
    who: "you",
    text: "「先專心考試吧。」",
    next: "yang_mem5"
  },
  yang_mem5: {
    name: "",
    who: "",
    text: "那一步沒有跨出去。考完之後，聯絡變少。\n你曾經以為這段關係已經結束了。",
    next: "yang_now"
  },
  yang_now: {
    bg: "campus",
    memory: false,
    name: "楊詩寧",
    who: "yang",
    text: "「其實我一直都記得。」",
    next: "yang_end"
  },
  yang_pass: {
    sprite: null,
    text: "「好久不見」留在身後。\n你沒有回頭。",
    next: "yang_end"
  },
  yang_end: {
    name: "",
    who: "",
    text: "她喜歡的是一起吃飯、散步、讀書、看展。\n那條陪伴的路，還沒開放。",
    next: "jiang1"
  },

  jiang1: {
    bg: "room",
    sprite: null,
    memory: false,
    chapter: "指示 03　語音",
    name: "",
    who: "",
    text: "晚上。同一款遊戲，長期組隊的人又上線了。",
    next: "jiang2"
  },
  jiang2: {
    sprite: "jiang",
    spriteClass: "small",
    text: "最初印象：這女的脾氣好爆。",
    next: "jiang3"
  },
  jiang3: {
    name: "語音",
    who: "jiang",
    text: "耳機裡又在罵隊友。\n不是在罵你。大概。",
    next: "jiang_choice"
  },
  jiang_choice: {
    name: "",
    who: "",
    text: "她人還不在這間大學的走廊上。\n現在只是網的另一邊。",
    choices: [
      { text: "繼續跟她排", next: "jiang_more", flag: "jiang" },
      { text: "今天先下", next: "jiang_pass" }
    ]
  },
  jiang_more: {
    name: "",
    who: "",
    text: "語音掛著就不關。\n以後才會問出「你讀哪間學校？」",
    next: "jiang_end"
  },
  jiang_pass: {
    sprite: null,
    text: "你退出隊伍。\n耳機忽然很安靜。",
    next: "jiang_end"
  },
  jiang_end: {
    sprite: null,
    name: "",
    who: "",
    text: "見面、149 公分、「閉嘴」，以及那句\n「所以你打算什麼時候告白？」都還在後面。",
    next: "card"
  },

  card: {
    bg: "black",
    sprite: null,
    chapter: "指示 04　冬季",
    name: "指示",
    who: "sys",
    text: "時間往前。\n學校第一次冬季大型展覽結束了。",
    next: "li1"
  },
  li1: {
    bg: "mrt",
    chapter: "指示 04　冬季",
    sprite: "li",
    name: "",
    who: "",
    text: "傍晚回家的捷運上。\n李侑禾難得安靜下來，在想著什麼。",
    next: "li2"
  },
  li2: {
    bg: "dusk",
    text: "下車後，捷運駛出月台。",
    next: "li_choice"
  },
  li_choice: {
    text: "布展的時候，好友都有女友陪著。",
    choices: [
      { text: "把羨慕說出來", next: "li_say", flag: "li" },
      { text: "看著車離開", next: "li_pass" }
    ]
  },
  li_say: {
    name: "劉赫",
    who: "you",
    text: "「布展的時候大家身邊都有人。\n我也挺羨慕的。」",
    next: "li_hug"
  },
  li_hug: {
    name: "",
    who: "",
    text: "她忽然抱住你。沉默幾秒。",
    next: "li_line"
  },
  li_line: {
    name: "李侑禾",
    who: "li",
    text: "「我們也可以像那樣子的。」",
    next: "li_after"
  },
  li_after: {
    name: "",
    who: "",
    text: "用很模糊的描述告白了。",
    next: "li_end"
  },
  li_pass: {
    name: "",
    who: "",
    text: "車走了。那句羨慕沒有出口。\n她也沒有抱上來。",
    next: "li_end"
  },
  li_end: {
    text: "交往以後她會變成什麼樣子，這份 demo 先不停在這裡。",
    next: "check_long"
  },

  check_long: {
    bg: "black",
    sprite: null,
    name: "指示",
    who: "sys",
    text: "四條路都見過面了。",
    next: "end_gate"
  },
  end_gate: {
    gate: true
  },

  long1: {
    bg: "campus",
    sprite: "long",
    chapter: "不可攻略",
    name: "",
    who: "",
    text: "有個人從一開始就站在你這邊。\n你都不心領。",
    next: "long2"
  },
  long2: {
    name: "阿龍陳",
    who: "long",
    text: "「時間差不多了。」",
    next: "long3"
  },
  long3: {
    name: "",
    who: "",
    text: "這不是告白。\n他的結局還不能走。",
    next: "ending"
  },

  ending: {
    bg: "dusk",
    sprite: null,
    chapter: "DEMO 終",
    name: "指示",
    who: "sys",
    text: "指示到這裡暫停。\n李侑禾、魏妍姻、姜雨婷、楊詩寧的個人線尚未實裝。",
    next: "ending2"
  },
  ending2: {
    text: "選擇已經記下。\n願望還是要你自己走完。",
    next: null
  }
};
