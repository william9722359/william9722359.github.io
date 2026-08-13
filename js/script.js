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
    text: "願望不會替你走完。\n我們只把路放到你面前。",
    next: "s3"
  },
  s3: {
    text: "天主教國立輔仁大學。新莊。\n應用美術學系。",
    next: "s4"
  },
  s4: {
    text: "今天從開學開始。",
    next: "card_wei"
  },

  card_wei: {
    card: true,
    bg: "black",
    sprite: null,
    chapter: "第一話　隣席",
    next: "wei1"
  },
  wei1: {
    bg: "classroom",
    sprite: null,
    name: "",
    who: "",
    text: "開學第一天。\n教室裡還有粉筆和新桌貼的味道。",
    next: "wei2"
  },
  wei2: {
    text: "座位表貼在黑板旁邊。\n名字被排成兩排，墨水還沒乾。",
    next: "wei3"
  },
  wei3: {
    text: "你的位子靠窗。\n旁邊那一格也寫了人。",
    next: "wei4"
  },
  wei4: {
    sprite: "wei",
    text: "她把椅子拉開，坐下來。\n書包靠在桌腳，吊著一隻娃娃。",
    next: "wei5"
  },
  wei5: {
    text: "蓬鬆的深藍短髮，髮尾微翹。\n眼鏡後面掛著淡淡的黑眼圈。",
    next: "wei6"
  },
  wei6: {
    text: "制服穿得很好看。\n人卻像還沒醒。",
    next: "wei7"
  },
  wei7: {
    text: "看起來很兇。\n像是沒睡飽。",
    next: "wei8"
  },
  wei8: {
    name: "劉赫",
    who: "you",
    text: "「妳好。」",
    next: "wei9"
  },
  wei9: {
    name: "魏妍姻",
    who: "wei",
    text: "「嗯。」",
    next: "wei10"
  },
  wei10: {
    name: "",
    who: "",
    text: "連你好都沒有回。\n視線已經轉回前面。",
    next: "wei11"
  },
  wei11: {
    text: "空氣沒有比較暖。\n鄰座只剩下一點布料摩擦的聲音。",
    next: "wei12"
  },
  wei12: {
    text: "老師開始點名。粉筆灰落在講桌邊緣。\n她沒有再看你。",
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
    name: "劉赫",
    who: "you",
    text: "「……我是劉赫。」",
    next: "wei_more2"
  },
  wei_more2: {
    name: "",
    who: "",
    text: "她側過一點臉。眼鏡反光。\n還是沒有把你好補回來。",
    next: "wei_more3"
  },
  wei_more3: {
    text: "偶爾聊天，偶爾借東西。\n大概都是以後的事。",
    next: "wei_end"
  },
  wei_pass: {
    name: "",
    who: "",
    text: "你把那句話嚥回去。\n一節課就這樣過去。",
    next: "wei_pass2"
  },
  wei_pass2: {
    text: "她話很少。\n你覺得她很難相處。",
    next: "wei_end"
  },
  wei_end: {
    sprite: null,
    name: "",
    who: "",
    text: "下課鐘響。走廊開始有人跑。\n她已經在收筆。",
    next: "wei_end2"
  },
  wei_end2: {
    text: "娃娃在書包側面晃了一下。\n人就進了人潮。",
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
    text: "輔大的樹很高。\n風從教學樓中間穿過來。",
    next: "yang2"
  },
  yang2: {
    text: "磚地還是早上灑過水的顏色。\n校園裡有一個熟悉的身影。",
    next: "yang3"
  },
  yang3: {
    sprite: "yang",
    spriteClass: "bust",
    text: "身高在人群裡特別顯眼。\n針織毛衣，深色，乾淨。",
    next: "yang4"
  },
  yang4: {
    text: "很有氣質。\n安靜，又像很好相處。",
    next: "yang5"
  },
  yang5: {
    text: "她愣了幾秒。",
    next: "yang6"
  },
  yang6: {
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
    text: "重考班。準備進輔大應美。\n那時兩人都滿十八。",
    next: "yang_mem2"
  },
  yang_mem2: {
    text: "第一次見面就坐隔壁。\n你壓力很大，每天讀書，精神並不好。",
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
    text: "那一步沒有跨出去。",
    next: "yang_mem10"
  },
  yang_mem10: {
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
    next: "yang_now2"
  },
  yang_now2: {
    name: "",
    who: "",
    text: "風還在。樹蔭挪了一點。\n她站在原地，沒有再補第二句。",
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
    memory: false,
    name: "",
    who: "",
    text: "操場那邊有人在喊集合。\n白天到這裡先結束。",
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
    text: "晚上。螢幕把房間切成一塊一塊的藍。",
    next: "jiang2"
  },
  jiang2: {
    text: "同一款遊戲。長期組隊的人又上線了。\n耳機裡先是一陣雜音，接著是她的聲音。",
    next: "jiang3"
  },
  jiang3: {
    name: "語音",
    who: "jiang",
    text: "又在罵隊友。\n不是在罵你。大概。",
    next: "jiang4"
  },
  jiang4: {
    name: "",
    who: "",
    text: "最初印象一直沒改：\n這女的脾氣好爆。",
    next: "jiang5"
  },
  jiang5: {
    sprite: "jiang",
    spriteClass: "small",
    text: "大頭貼很好看。\n像日系模特兒。",
    next: "jiang6"
  },
  jiang6: {
    text: "人還不在這間大學的走廊上。\n現在只是網的另一邊。",
    next: "jiang7"
  },
  jiang7: {
    text: "語音掛著，就不關。",
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
    name: "",
    who: "",
    text: "準星還亮著。\n她在耳機裡哼了一聲，沒有下線。",
    next: "jiang_more2"
  },
  jiang_more2: {
    text: "一場打完。語音沒關。\n兩個人開始亂聊。",
    next: "jiang_more3"
  },
  jiang_more3: {
    name: "語音",
    who: "jiang",
    text: "「等等，你讀哪間學校？」",
    next: "jiang_more4"
  },
  jiang_more4: {
    name: "劉赫",
    who: "you",
    text: "「輔大啊。」",
    next: "jiang_more5"
  },
  jiang_more5: {
    name: "語音",
    who: "jiang",
    text: "「我也是。」",
    next: "jiang_more6"
  },
  jiang_more6: {
    name: "劉赫",
    who: "you",
    text: "「很巧啊。」",
    next: "jiang_more7"
  },
  jiang_more7: {
    name: "",
    who: "",
    text: "耳機那頭短短靜了一下。\n然後又開始排下一場。",
    next: "jiang_end"
  },
  jiang_pass: {
    sprite: null,
    name: "",
    who: "",
    text: "你退出隊伍。\n耳機忽然很安靜。",
    next: "jiang_pass2"
  },
  jiang_pass2: {
    text: "房間只剩下風扇。",
    next: "jiang_end"
  },
  jiang_end: {
    sprite: null,
    name: "",
    who: "",
    text: "夜還很長。\n螢幕暗下去之後，房間重新變回自己的。",
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
    text: "傍晚。回家的捷運。\n輔大站那一側的車門關上。",
    next: "li2"
  },
  li2: {
    text: "車廂裡的燈比外面亮。\n廣告燈箱一下一下地往後跑。",
    next: "li3"
  },
  li3: {
    text: "李侑禾難得安靜下來，在想著什麼。",
    next: "li4"
  },
  li4: {
    text: "布展留下的疲倦還在手指上。\n她沒有滑手機。",
    next: "li5"
  },
  li5: {
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
    text: "用很模糊的描述告白了。\n月台上只剩下車軌的風。",
    next: "check_long"
  },
  li_pass: {
    name: "",
    who: "",
    sprite: null,
    text: "車走了。那句羨慕沒有出口。",
    next: "li_pass2"
  },
  li_pass2: {
    text: "她也沒有抱上來。\n兩個人並肩站著，什麼都沒有發生。",
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
    text: "共通線的開頭，你已經走完了。\n選擇已經記下。",
    next: "ending3"
  },
  ending3: {
    text: "產品版會接著走完各自的路。\n願望還是要你自己走完。",
    next: "endcard"
  },
  endcard: {
    endcard: true
  }
};
