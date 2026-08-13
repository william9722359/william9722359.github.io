window.DEMO_SCRIPT = {
  start: {
    bg: "black",
    sprite: null,
    name: "指示",
    who: "sys",
    chapter: "序",
    text: "先確認一件事。\n你是劉赫。",
    next: "s2"
  },
  s2: {
    name: "指示",
    who: "sys",
    text: "願望不會替你走完。\n我們只把路放到你面前。",
    next: "s3"
  },
  s3: {
    name: "指示",
    who: "sys",
    text: "天主教國立輔仁大學。新莊。\n應用美術學系。",
    next: "s4"
  },
  s4: {
    name: "指示",
    who: "sys",
    text: "今天從開學開始。",
    next: "card_wei"
  },

  card_wei: {
    card: true,
    bg: "black",
    sprite: null,
    chapter: "第一話　鄰座",
    next: "wei1"
  },
  wei1: {
    bg: "classroom",
    sprite: null,
    name: "",
    who: "",
    text: "開學第一天。\n座位表貼在黑板旁邊。",
    next: "wei2"
  },
  wei2: {
    text: "她剛好坐在你旁邊。",
    next: "wei3"
  },
  wei3: {
    sprite: "wei",
    text: "書包上掛著娃娃。",
    next: "wei4"
  },
  wei4: {
    text: "感覺很兇。\n像是沒睡飽。",
    next: "wei5"
  },
  wei5: {
    name: "劉赫",
    who: "you",
    text: "「妳好。」",
    next: "wei6"
  },
  wei6: {
    name: "魏妍姻",
    who: "wei",
    text: "「嗯。」",
    next: "wei7"
  },
  wei7: {
    name: "",
    who: "",
    text: "連你好都沒有回。",
    next: "wei_choice"
  },
  wei_choice: {
    text: "一開始兩人幾乎沒有交流。",
    choices: [
      { text: "再補一句", next: "wei_more", flag: "wei" },
      { text: "先這樣就好", next: "wei_pass" }
    ]
  },
  wei_more: {
    text: "你又開了口。\n她沒有接。",
    next: "wei_end"
  },
  wei_pass: {
    text: "你沒再說話。\n她也沒有。",
    next: "wei_end"
  },
  wei_end: {
    sprite: null,
    text: "幾乎不講話。\n你覺得她很難相處。",
    next: "card_yang"
  },

  card_yang: {
    card: true,
    bg: "black",
    sprite: null,
    chapter: "第二話　重逢",
    next: "yang1"
  },
  yang1: {
    bg: "campus",
    sprite: null,
    memory: false,
    name: "",
    who: "",
    text: "開學。\n校園裡有一個熟悉的身影。",
    next: "yang2"
  },
  yang2: {
    sprite: "yang",
    spriteClass: "bust",
    text: "身高在人群裡特別顯眼。",
    next: "yang3"
  },
  yang3: {
    text: "很有氣質。\n感覺是個很好相處的人。",
    next: "yang4"
  },
  yang4: {
    text: "她愣了幾秒。",
    next: "yang5"
  },
  yang5: {
    text: "然後笑著說：",
    next: "yang6"
  },
  yang6: {
    name: "楊詩寧",
    who: "yang",
    text: "「好久不見。」",
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
    text: "你走過去。\n她沒有後退。",
    next: "yang_mem1"
  },
  yang_mem1: {
    bg: "classroom",
    memory: true,
    sprite: "yang",
    spriteClass: "bust",
    name: "",
    who: "",
    text: "你想起來了。\n重考班。準備進輔大應美。",
    next: "yang_mem2"
  },
  yang_mem2: {
    text: "第一次見面剛好坐隔壁。\n你當時壓力很大，每天都在讀書，精神並不好。",
    next: "yang_mem3"
  },
  yang_mem3: {
    text: "她當時笑著問：",
    next: "yang_mem4"
  },
  yang_mem4: {
    name: "楊詩寧",
    who: "yang",
    text: "「妳還好嗎？」",
    next: "yang_mem5"
  },
  yang_mem5: {
    name: "",
    who: "",
    text: "慢慢變成每天都會聊天的人。\n一起上課，一起吃晚餐，一起討論未來。",
    next: "yang_mem6"
  },
  yang_mem6: {
    text: "她總能讓氣氛變輕鬆。\n像陽光一樣溫暖。",
    next: "yang_mem7"
  },
  yang_mem7: {
    text: "後來有一天，她小聲問過。",
    next: "yang_mem8"
  },
  yang_mem8: {
    name: "楊詩寧",
    who: "yang",
    text: "「如果偷偷交往呢？」",
    next: "yang_mem9"
  },
  yang_mem9: {
    name: "劉赫",
    who: "you",
    text: "「先專心考試吧。」",
    next: "yang_mem10"
  },
  yang_mem10: {
    name: "",
    who: "",
    text: "那一步沒有跨出去。",
    next: "yang_mem11"
  },
  yang_mem11: {
    text: "考完之後，聯絡變少。\n你曾經以為這段關係已經結束了。",
    next: "yang_now"
  },
  yang_now: {
    bg: "campus",
    memory: false,
    sprite: "yang",
    spriteClass: "bust",
    name: "楊詩寧",
    who: "yang",
    text: "「其實我一直都記得。」",
    next: "yang_end"
  },
  yang_pass: {
    sprite: null,
    name: "",
    who: "",
    text: "「好久不見」留在身後。\n你沒有回頭。",
    next: "yang_end"
  },
  yang_end: {
    sprite: null,
    memory: false,
    name: "",
    who: "",
    text: "風還在。",
    next: "card_jiang"
  },

  card_jiang: {
    card: true,
    bg: "black",
    sprite: null,
    chapter: "第三話　語音",
    next: "jiang1"
  },
  jiang1: {
    bg: "room",
    sprite: null,
    memory: false,
    name: "",
    who: "",
    text: "晚上。\n同一款遊戲，長期組隊的人又上線了。",
    next: "jiang2"
  },
  jiang2: {
    text: "耳機裡是姜雨婷。",
    next: "jiang3"
  },
  jiang3: {
    text: "耳機裡在罵人。",
    next: "jiang4"
  },
  jiang4: {
    text: "這女的脾氣好爆。",
    next: "jiang5"
  },
  jiang5: {
    sprite: "jiang",
    spriteClass: "small",
    text: "照片很好看。\n像日系模特兒。",
    next: "jiang6"
  },
  jiang6: {
    text: "她喜歡掛著語音。",
    next: "jiang_choice"
  },
  jiang_choice: {
    text: "隊伍還在。罵聲也還在。",
    choices: [
      { text: "繼續跟她排", next: "jiang_more", flag: "jiang" },
      { text: "今天先下", next: "jiang_pass" }
    ]
  },
  jiang_more: {
    text: "後來開始聊天。\n遊戲，學校，作業，日常。",
    next: "jiang_more3"
  },
  jiang_more3: {
    name: "姜雨婷",
    who: "jiang",
    text: "「等等，你讀哪間學校？」",
    next: "jiang_more4"
  },
  jiang_more4: {
    name: "劉赫",
    who: "you",
    text: "「輔大啊」",
    next: "jiang_more5"
  },
  jiang_more5: {
    name: "姜雨婷",
    who: "jiang",
    text: "「我也是」",
    next: "jiang_more6"
  },
  jiang_more6: {
    name: "劉赫",
    who: "you",
    text: "「很巧啊」",
    next: "jiang_end"
  },
  jiang_pass: {
    sprite: null,
    name: "",
    who: "",
    text: "你退出隊伍。\n耳機忽然很安靜。",
    next: "jiang_end"
  },
  jiang_end: {
    sprite: null,
    name: "",
    who: "",
    text: "你下了線。",
    next: "card_winter"
  },

  card_winter: {
    card: true,
    bg: "black",
    sprite: null,
    chapter: "第四話　冬季",
    next: "li0"
  },
  li0: {
    bg: "black",
    sprite: null,
    name: "",
    who: "",
    text: "學校第一次冬季大型展覽結束了。",
    next: "li1"
  },
  li1: {
    bg: "mrt",
    sprite: "li",
    name: "",
    who: "",
    text: "傍晚。回家的捷運上。",
    next: "li2"
  },
  li2: {
    text: "李侑禾難得安靜下來，在想著什麼。",
    next: "li3"
  },
  li3: {
    bg: "dusk",
    sprite: "li",
    text: "下車後，捷運駛出月台。",
    next: "li_choice"
  },
  li_choice: {
    text: "布展的時候，好友們都有女友陪著。",
    choices: [
      { text: "把羨慕說出來", next: "li_say", flag: "li" },
      { text: "看著車離開", next: "li_pass" }
    ]
  },
  li_say: {
    name: "劉赫",
    who: "you",
    text: "「布展的時候好友們都有女友陪著。\n我也挺羨慕的。」",
    next: "li_hug"
  },
  li_hug: {
    name: "",
    who: "",
    text: "她忽然抱住你。\n沉默幾秒。",
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
    text: "月台上只剩下車軌的風。",
    next: "end_gate"
  },
  li_pass: {
    name: "",
    who: "",
    sprite: null,
    text: "那句話沒有出口。\n車走了。",
    next: "end_gate"
  },

  end_gate: {
    gate: true
  },

  long1: {
    bg: "campus",
    sprite: "long",
    chapter: "阿龍陳",
    name: "",
    who: "",
    text: "阿龍陳從一開始就站在你這邊。\n你都不心領。",
    next: "long2"
  },
  long2: {
    name: "阿龍陳",
    who: "long",
    text: "「時間差不多了。」",
    next: "ending"
  },

  ending: {
    bg: "dusk",
    sprite: null,
    chapter: "體驗版終",
    name: "指示",
    who: "sys",
    text: "體驗版到此為止。",
    next: "ending2"
  },
  ending2: {
    name: "指示",
    who: "sys",
    text: "願望還是要你自己走完。",
    next: "endcard"
  },
  endcard: {
    endcard: true
  }
};
