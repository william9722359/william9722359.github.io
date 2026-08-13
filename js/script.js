window.DEMO_SCRIPT = {
  start: {
    bg: "black",
    name: "指示",
    who: "sys",
    chapter: "DEMO",
    text: "先確認一件事。\n你是劉赫。",
    next: "s2"
  },
  s2: {
    text: "願望不會替你走完。\n我們只把路放到你面前。",
    next: "s3"
  },
  s3: {
    text: "天主教國立輔仁大學。新莊。\n應用美術學系。",
    next: "s4"
  },
  s4: {
    text: "今天從開學開始。",
    next: "wei1"
  },

  wei1: {
    bg: "classroom",
    chapter: "指示 01　鄰座",
    sprite: null,
    name: "",
    who: "",
    text: "開學第一天。教室裡還有粉筆和新桌貼的味道。\n座位表貼在黑板旁邊。",
    next: "wei2"
  },
  wei2: {
    sprite: "wei",
    text: "她被分到你旁邊。",
    next: "wei3"
  },
  wei3: {
    text: "第一眼：感覺很兇。像是沒睡飽。",
    next: "wei4"
  },
  wei4: {
    text: "蓬鬆的深藍短髮，髮尾微翹。眼鏡後面掛著淡淡的黑眼圈。\n制服穿得很好看。書包上吊著娃娃。",
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
    text: "連你好都沒有回。\n視線已經轉回前面。空氣沒有比較暖。",
    next: "wei_choice"
  },
  wei_choice: {
    text: "一開始其實沒什麼交集。\n只是每天都會坐在旁邊。",
    choices: [
      { text: "再補一句", next: "wei_more", flag: "wei" },
      { text: "先這樣就好", next: "wei_pass" }
    ]
  },
  wei_more: {
    text: "你又開了口。她沒有接。\n偶爾聊天，偶爾借東西——那是以後的事。",
    next: "wei_end"
  },
  wei_pass: {
    text: "一節課就這樣過去。\n她話很少。你覺得她很難相處。",
    next: "wei_end"
  },
  wei_end: {
    text: "真正變熟，是以後一起做作品的時候。\n一起熬夜、一起趕件、一起被退件。\n那條路，這份試玩還沒開放。",
    next: "yang1"
  },

  yang1: {
    bg: "campus",
    sprite: null,
    memory: false,
    chapter: "指示 02　重逢",
    name: "",
    who: "",
    text: "輔大的樹很高。風從教學樓中間穿過來。\n開學。校園裡有一個熟悉的身影。",
    next: "yang2"
  },
  yang2: {
    sprite: "yang",
    spriteClass: "bust",
    text: "身高在人群裡特別顯眼。針織毛衣，深色，乾淨。\n她愣了幾秒。",
    next: "yang3"
  },
  yang3: {
    name: "楊詩寧",
    who: "yang",
    text: "然後笑著說：\n「好久不見。」",
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
    text: "重考班。準備進輔大應美。\n那時兩人都滿十八。你壓力很大，精神並不好。",
    next: "yang_mem2"
  },
  yang_mem2: {
    text: "她剛好坐在隔壁。\n每天都在讀書。空氣很薄。",
    next: "yang_mem3"
  },
  yang_mem3: {
    name: "楊詩寧",
    who: "yang",
    text: "她當時笑著問：\n「妳還好嗎？」",
    next: "yang_mem4"
  },
  yang_mem4: {
    name: "",
    who: "",
    text: "慢慢變成每天都會聊天的人。\n一起上課，一起吃晚餐，一起討論未來。",
    next: "yang_mem5"
  },
  yang_mem5: {
    text: "她總能讓氣氛變輕鬆。\n像陽光一樣溫暖。",
    next: "yang_mem6"
  },
  yang_mem6: {
    text: "後來有一天，她小聲問過。",
    next: "yang_mem7"
  },
  yang_mem7: {
    name: "楊詩寧",
    who: "yang",
    text: "「如果偷偷交往呢？」",
    next: "yang_mem8"
  },
  yang_mem8: {
    name: "劉赫",
    who: "you",
    text: "「先專心考試吧。」",
    next: "yang_mem9"
  },
  yang_mem9: {
    name: "",
    who: "",
    text: "那一步沒有跨出去。\n考完之後，聯絡變少。你曾經以為這段關係已經結束了。",
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
    text: "「好久不見」留在身後。\n風還在。你沒有回頭。",
    next: "yang_end"
  },
  yang_end: {
    sprite: null,
    name: "",
    who: "",
    text: "她喜歡的是一起吃飯、散步、讀書、看展。\n她認為：喜歡一個人，就是想參與他的生活。\n那條陪伴的路，還沒開放。",
    next: "jiang1"
  },

  jiang1: {
    bg: "room",
    sprite: null,
    memory: false,
    chapter: "指示 03　語音",
    name: "",
    who: "",
    text: "晚上。螢幕把房間切成一塊一塊的藍。\n同一款遊戲，長期組隊的人又上線了。",
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
    next: "jiang4"
  },
  jiang4: {
    name: "",
    who: "",
    text: "她人還不在這間大學的走廊上。\n現在只是網的另一邊。語音掛著，就不關。",
    next: "jiang_choice"
  },
  jiang_choice: {
    text: "以後才會問出那句「你讀哪間學校？」\n才會發現——也是輔大。",
    choices: [
      { text: "繼續跟她排", next: "jiang_more", flag: "jiang" },
      { text: "今天先下", next: "jiang_pass" }
    ]
  },
  jiang_more: {
    text: "隊伍沒有散。罵聲還在，準星也還在。\n見面、一百四十九公分、還有那句「閉嘴」，都還在後面。",
    next: "jiang_end"
  },
  jiang_pass: {
    sprite: null,
    text: "你退出隊伍。\n耳機忽然很安靜。房間只剩下風扇。",
    next: "jiang_end"
  },
  jiang_end: {
    sprite: null,
    name: "",
    who: "",
    text: "「所以你打算什麼時候告白？」\n那句話，這份試玩還不會讓她說出口。",
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
    sprite: "li",
    name: "",
    who: "",
    text: "傍晚。回家的捷運。輔大站那一側的車門關上。\n車廂裡的燈比外面亮。",
    next: "li2"
  },
  li2: {
    text: "李侑禾難得安靜下來，在想著什麼。",
    next: "li3"
  },
  li3: {
    bg: "dusk",
    text: "下車後，捷運駛出月台。\n風把展覽留下的疲倦吹得很薄。",
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
    text: "用很模糊的描述告白了。\n月台上只剩下車軌的風。",
    next: "li_end"
  },
  li_pass: {
    name: "",
    who: "",
    text: "車走了。那句羨慕沒有出口。\n她也沒有抱上來。兩個人並肩站著，什麼都沒有發生。",
    next: "li_end"
  },
  li_end: {
    sprite: null,
    text: "交往以後她會變成什麼樣子——秒讀、確認你在哪、以及更後面的事。\n這份試玩先不停在這裡。",
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
