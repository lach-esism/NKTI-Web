export function getPersonalityData(code, tf) {
  const fallback = {
    name: "津南迷路新生",
    enName: "LOST-FRESHMAN",
    highlight: "请问……二主楼怎么走？我已经绕了三圈了。",
    comment: "你还在探索这个庞大的校园，一切都显得那么新鲜又陌生。别急，慢慢走，总有一天你会成为这里的传说。",
    image: "./personality_images/UNKNOWN.jpg"
  };

  const map = {
    INTJ: {
      name: "新开湖水怪",
      enName: "LAKE-MONSTER",
      highlight: "别惹我，我在水底潜伏了几十年了。",
      comment: "你就像传说中湖底的神秘生物，平时深居简出，总是冷冷地观察着岸上的人类。你拥有深邃的智慧和极强的独立性，虽然看起来有点阴郁，但其实只是喜欢独处，享受那份不被打扰的宁静。",
      image: "./personality_images/INTJ.jpg"
    },
    INTP: {
      name: "省身楼游魂",
      enName: "MATH-GHOST",
      highlight: "肉体已枯竭，灵魂在算微积分。",
      comment: "你常年游荡在数学楼的走廊里，面色苍白，眼神空洞。你脑子里装满了奇思妙想和未解之谜，对现实世界漠不关心。大家都怕碰到你，因为你一开口就是听不懂的高深理论。",
      image: "./personality_images/INTP.jpg"
    },
    ENTJ: {
      name: "老校长本苓",
      enName: "FOUNDER-NK",
      highlight: "你是南开人吗？你的中国呢？",
      comment: "你天生就是当校长的料，气场两米八。你有宏大的愿景，极强的执行力，为了集体的利益可以鞠躬尽瘁。在你面前，没人敢偷懒，因为你的眼神能看穿一切懈怠。",
      image: "./personality_images/ENTJ.jpg"
    },
    ENTP: {
      name: "二主楼辩论队",
      enName: "DEBATER-ZHU",
      highlight: "你说的不对，我有三个反驳点和五个逻辑漏洞。",
      comment: "你思维敏捷，嘴巴比脑子转得还快。你喜欢挑战权威，喜欢在逻辑的边缘疯狂试探。对你来说，吃饭睡觉都是为了抬杠，真理越辩越明。",
      image: "./personality_images/ENTP.jpg"
    },
    INFP: {
      name: "海棠花下客",
      enName: "FLOWER-DREAM",
      highlight: "春天很短，还好有你在看花。",
      comment: "你温柔、敏感，像四月的海棠花一样美好。你活在自己的小世界里，对美有着天然的感知力。虽然看起来柔弱，但你内心有着坚定的信念和对美好的执着。",
      image: "./personality_images/INFP.jpg"
    },
    ENFJ: {
      name: "总理雕像",
      enName: "ZEL-SC",
      highlight: "为中华之崛起而读书……还有，天冷了记得穿秋裤。",
      comment: "你像屹立在主楼前的雕像，永远西装笔挺，永远目光如炬。你的存在本身就是一种巨大的压力，让每一个路过想偷懒的灵魂感到瑟瑟发抖。你不是在监视谁，但每个人都觉得你在看着自己。",
      image: "./personality_images/ENFJ.jpg"
    },
    ENFP: {
      name: "津南妖风（和雷阵雨）",
      enName: "WIND-RAIN-JINNAN",
      highlight: "只要我跑得够快，发型就追不上我！",
      comment: "你就像津南校区那著名的妖风和雷阵雨，来无影去无踪，让人捉摸不透。你充满活力，脑洞大开，总是带来意想不到的惊喜。你讨厌束缚，追求绝对的自由。",
      image: "./personality_images/ENFP.jpg"
    },
    ISTJ: {
      name: "教务处铁面判官",
      enName: "ADMIN-JUDGE",
      highlight: "系统显示不行，那就是不行，我也没办法。",
      comment: "你严谨、务实，是学校运转的基石。你尊重规则，讲究流程，虽然有时候显得有点不近人情，像个没有感情的盖章机器，但你知道这是维持秩序的必要手段。靠谱是你最大的标签。",
      image: "./personality_images/ISTJ.jpg"
    },
    ISFJ: {
      name: "宿舍楼管大爷",
      enName: "DORM-UNCLE",
      highlight: "这么晚才回来？下次注意啊，快上去吧。",
      comment: "你温和、负责，总是默默地守护着大家的安全。你记得住每一个住户的习惯，虽然嘴上会唠叨几句，但心里其实很关心每一个人。你是大家最信赖的后盾。",
      image: "./personality_images/ISFJ.jpg"
    },
    ESTJ: {
      name: "理科食堂手抖阿姨",
      enName: "SHAKY-HAND",
      highlight: "肉？什么肉？我这勺子里全是土豆！",
      comment: "你雷厉风行，效率至上。在高峰期，你就是战场上的指挥官。虽然你的手偶尔会不受控制地剧烈抖动，但这并不影响你喂饱几千名学子的伟业。实用主义者的典范。",
      image: "./personality_images/ESTJ.jpg"
    },
    ESFJ: {
      name: "西南村烧烤摊主",
      enName: "BBQ-BOSS",
      highlight: "老弟/老妹儿，再来两串大腰子？",
      comment: "你热情好客，充满了市井烟火气。你记得住熟客的口味，喜欢和大家打成一片。只要有你在，场子就不会冷。你是那个能治愈深夜饥饿灵魂的温暖存在。",
      image: "./personality_images/ESFJ.jpg"
    },
    ISTP: {
      name: "实验室爆炸狂魔",
      enName: "LAB-BOMBER",
      highlight: "别问，问就是在做实验，刚才冒烟是正常的。",
      comment: "你话不多，但动手能力极强。面对复杂的仪器，你总能找到问题的症结，或者直接把它弄坏。你喜欢独来独往，享受解决问题的瞬间快感，是典型的实干派技术流。",
      image: "./personality_images/ISTP.jpg"
    },
    ISFP: {
      name: "马蹄湖野鸭（和它的鸭屎）",
      enName: "DUCK-POOP",
      highlight: "嘎嘎嘎！（翻译：莫挨老子，小心我拉你身上）",
      comment: "你优雅、随性，喜欢在湖边散步。你不在乎别人的眼光，只想按照自己的节奏生活。虽然看起来呆萌，但如果有人侵犯了你的领地，你会毫不犹豫地用生化武器攻击对方。",
      image: "./personality_images/ISFP.jpg"
    },
    ESTP: {
      name: "西门外卖骑手",
      enName: "DELIVERY-KING",
      highlight: "这单要超时了！借过借过！命给你！",
      comment: "你行动力爆表，总是在路上奔波。你懂得享受生活，也敢于冒险。你反应灵敏，擅长应对各种突发状况，是校园里最充满活力的风景线。",
      image: "./personality_images/ESTP.jpg"
    },
    ESFP: {
      name: "八里台招新狂人",
      enName: "CLUB-WAR",
      highlight: "同学！了解一下！我们有免费周边哦！填个表送气球！",
      comment: "你是人群中的焦点，热情洋溢，哪里有热闹哪里就有你。你讨厌枯燥的理论，喜欢通过实践和互动来感受世界。只要有你在，大学生活绝对不会无聊。",
      image: "./personality_images/ESFP.jpg"
    }
  };

  if (code === "INFJ") {
    if (tf <= -6) {
      return {
        name: "联大碑的倒影",
        enName: "SLM-GHOST",
        highlight: "允公允能？我只是静静地站在这里而已。",
        comment: "你像那座见证了历史的石碑倒影，深沉、厚重且充满哲学气息。你不需要说话，往那一站，周围浮躁的空气就会瞬间凝固。大家在你面前都不敢大声喧哗，生怕惊扰了历史的尘埃。你承载着南开的过去，是沉默的守护者。",
        image: "./personality_images/INFJ1.jpg"
      };
    }

    return {
      name: "木斋馆守夜人",
      enName: "LIB-WATCHER",
      highlight: "书页翻动的声音，是历史的心跳。",
      comment: "你像老图书馆里的守望者，内心丰富而深沉。你有着超越年龄的成熟和洞察力，总是默默守护着心中的理想主义。你不需要太多朋友，懂你的人自然懂。你在知识的迷宫里独行，享受着无人打扰的清冷。",
      image: "./personality_images/INFJ2.jpg"
    };
  }

  return map[code] || fallback;
}
