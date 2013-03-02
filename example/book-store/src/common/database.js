define(
    'common/database',
    function() {
        /*jshint maxlen: 600 */
        var books = [
            {
                name: '姥爷',
                isbn: '9787535463210',
                price: 34.8,
                author: '蒋雯丽',
                pageCount: 240,
                publishDate: '2013-03-01',
                publisher: '长江文艺出版社',
                description: '蒋雯丽倾心回忆三十载难忘亲情\n滋润干涸心灵 感受现世温暖\n唤醒心底的爱与传承\n著名作家六六感动推荐！'
            },
            {
                name: '齐天传',
                isbn: '9787511330574',
                price: 29.8,
                author: '楚阳冬',
                pageCount: 328,
                publishDate: '2012-12-01',
                publisher: '中国华侨出版社',
                description: '★《齐天传》是一部《西游记》的同人小说，在相同的西游世界里，讲述齐天大圣不同的故事。\n★这也是一部揭秘小说。粉碎“取经阴谋”，改变取经人和众多仙佛妖魔的命运，揭开“西游世界”的终极秘密。\n★这还是一部神话小说。从盘古、后羿等上古神话人物，至杨戬、哪吒等中古神话人物，再到如来、弥勒等西游神话人物，《齐天传》整理出了一个完整、清晰的神话结构体系。\n★这部小说写满了权力博奕。玉帝、三清、如来、燃灯，天庭、道教、佛教、妖界，他们在下一盘很大的棋，悟空便是那破局的棋子。\n★这部《齐天传》让不看西游的人了解西游，让看过西游的人更懂西游，让隐藏着的西游世界展露全貌，让那只看似神通盖世却受尽欺侮的猴子，打破枷锁、真正自由！\n'
            },
            {
                name: '新东方·大学英语四级考试：历年真题精解（2008年6月～2012年12月）（附MP3光盘1张）',
                isbn: '9787802563988',
                price: 24.8,
                author: '新东方考试研究中心',
                pageCount: 348,
                publishDate: '2013-02-01',
                publisher: '群言出版社',
                description: '详解10套最新真题，从定位到解析，培养考生的答题技巧！\n阅读文章附全文翻译，帮助考生在理解的基础上选对答案！\n听力部分从已知选项入手，预测听力话题，做到听音有的放矢！\n完形部分附语境与词义双重解析；翻译部分梳理考点，配有精编练习题！\n附赠1套最新真题及答案、5套往年听力真题、题型分析及高分技巧、5篇新题型练习作文！\n详解最新真题：收录10套最新真题，每套试题与解析单独装订，附答案速查，方便考生自我检测；\n解析详尽，由信息词定位答题线索，教考生如何推导答案，切实提高答题技巧。\n译文、提纲完备：阅读文章附全文译文，帮助考生扫清理解障碍；阅读及完形部分概括段落大意，有助考生迅速理清文章脉络。\n题型解析各有侧重：听力采用实考录音，由卷面信息推测听力话题，把握听音重点，点拨听力难点；\n写作部分除给出高分范文及译文外，还进行了重要表达归纳、精彩句型点评；完形部分从语境和选项词义两个角度进行解析；精编翻译练习题巩固试题考点。\n超量资料随书附送：额外赠送1套2012年12月四级考试真题及答案；5套往年听力真题，助力考生攻破听力难关；复习资料详析各个题型，点拨高分技巧，另附5篇新题型练习作文。'
            },
            {
                name: '新东方·大学英语六级听力特训（附MP3光盘1张）',
                isbn: '9787560542416',
                price: 22.0,
                author: '新东方考试研究中心',
                pageCount: 259,
                publishDate: '2012-04-01',
                publisher: '西安交通大学出版社',
                description: '透析最新题型，攻破听力难关\n总结必备技能，扫除听力障碍\n全真模拟训练，再现考场情景\n归纳词汇考点，学习事半功倍'
            },
            {
                name: '蜂鸟摄影学院单反摄影宝典',
                isbn: '9787115298324',
                price: 99.0,
                author: '蜂鸟网',
                pageCount: 384,
                publishDate: '2012-12-01',
                publisher: '人民邮电出版社',
                description: '《蜂鸟摄影学院单反摄影宝典》作者为国内第一大摄影门户网站蜂鸟网，注册网民将近400万，每日同时在线人数超过1万人。本书集结了蜂鸟网12年来200余位影友的精品力作，大多为知名网友和版主的作品。\n作为蜂鸟网独家授权的官方摄影教程《蜂鸟摄影学院单反摄影宝典》全书囊括了摄影器材使用，以及光线、构图、色彩三大黄金法则在影友实拍中必需的知识，并且将风光、人像……等13类摄影题材一网打尽。'
            },
            {
                name: '知日·明治维新',
                isbn: '9787508636658',
                price: 35.0,
                author: '苏静   ',
                pageCount: 176,
                publishDate: '2013-01-01',
                publisher: '中信出版社',
                description: '·《知日·明治维新》是超人气品牌知日系列图书的第7期。\n·《知日·明治维新》最大限度地给我们展现了一个多面的、立体的，并充满新意的百年前日本——上至天皇与政府首脑，下至武士与庶人，涵盖历史、人物、饮食、绘画、摄影作品等方方面面，更有无数张珍贵的老照片，毛丹青、姚远、吴东龙、赤军等名家执笔，内容丰富而生动。\n·《知日·明治维新》的特点是真实、真实，还是真实。它还原了这个历史剧变时期最全面的日本人文风貌，能极大地满足你的好奇心。同时，重磅推出莫言出游日本、维新漫画等话题，让全书在谈这个历史话题的时候，也多了一些轻松与幽默。'
            },
            {
                name: '知日·铁道',
                isbn: '9787508634838',
                price: 35.0,
                author: '毛丹青',
                pageCount: 184,
                publishDate: '2012-10-01',
                publisher: '中信出版社',
                description: '&middot; 日本铁路在世界范围内都享有盛誉，其衍化出来的铁路文化更是为不少铁道迷所津津乐道。\n&middot; 铁道是一个极有魅力的关注点，从这一切口，既可以了解日本的铁道工业、设计，也可以体验到独一无二的铁道文化，体会独特的铁道印象及记忆。\n&middot; 《知日&middot;铁道》是知日系列品牌图书之一，本书以日本铁道为入口，通过不通角度和视野来记录有关日本铁道以及铁道文化的人和事，反映日本文化及人文面貌。'
            },
            {
                name: '知日·书之国',
                isbn: '9787550609822',
                price: 35.0,
                author: '苏静',
                pageCount: 178,
                publishDate: '2011-11-01',
                publisher: '凤凰出版社',
                description: '深入解读弹丸之地成为书之大国的奥秘。\n感动重温三十年经典TV秀超级变变变！\n万千粉丝翘首以盼，书之国特辑惊艳登场！&ldquo;知日&rdquo;系列第四本《知日&middot;书之国》火热上市！\n知日系列出版物由国内最顶尖的知日派专家和编辑团队打造。每期以特辑方式推出日本最潮流和热度的人物和事件。'
            },
            {
                name: '知日·妖怪',
                isbn: '9787508637969',
                price: 35.0,
                author: '苏静   ',
                pageCount: 172,
                publishDate: '2013-02-01',
                publisher: '中信出版社',
                description: '·《知日·妖怪》是超人气品牌知日系列图书的第8期。\n·以妖怪为特集，据说是大家最期盼的一期。“妖怪”之于日本，就如“丧尸”之于美国。\n·作为日本文化的重要成员，妖怪的文化既可以从历史上追溯，又能从地理上划分，各式各样的妖怪们与人类并行不悖地生活在这个神秘的岛国，通常互不干扰，偶有交集便生出或有趣、或可怖的故事来。\n·如果你知道《犬夜叉》， 或者《千与千寻》，又或者《名侦探柯南》里面关于天狗和雪女的探案段子，你应该就看到了最典型的日本式妖怪。想了解日本的民俗、文学、传说、古代典籍，似乎很难绕过这些“可爱的”家伙们。 所以，我们决定尽最大努力呈现去它们！所以，《知日·妖怪》特集就诞生了！\n·《知日·妖怪》特集是超人气品牌知日系列出版物的最新一本，属于系列的第8本。它纵向梳理了日本妖怪的历史，又横向铺开了全日本妖怪地图，立体展现岛国妖怪物语的同时，又囊括了与妖怪相关的各种话题：京极夏彦、水木茂、阴阳师、远野物语、百鬼夜行、河童、神隐、都市传说、试胆大会等等，可谓保罗妖怪万象，力求还原这个平行世界的精彩。\n·除此之外，村上春树所著《1Q84》的译者施小炜先生也从《知日·妖怪》特集开始为知日专栏执笔。\n'
            },
            {
                name: '知日·制服',
                isbn: '9787538291674',
                price: 35.0,
                author: '苏静',
                pageCount: 188,
                publishDate: '2011-04-01',
                publisher: '辽宁教育出版社',
                description: '知日系列出版物由国内最顶尖的知日派专家和编辑团队打造。\n每本书以特辑方式推出日本最潮流和热度的人物和事件。\n继《知日&middot;奈良美智》持续畅销之后又一&ldquo;知日&rdquo;风潮&mdash;&mdash;《知日?制服》惊艳亮相！\n众多名家用多种角度、多种风格带读者领略独特、绮丽的日本制服文化。\n全面深入日本制服生活，深度展现日本&ldquo;制服&rdquo;情结；\n重量级撰稿人，画廊级摄影师，共同打造视觉系&ldquo;制服&rdquo;阅读，另辟蹊径，大开眼界！\n最值得珍藏的图文写真专辑！'
            },
            {
                name: '生命的意义',
                isbn: '9787800734984',
                price: 26.0,
                author: '布拉德里·特轩弗·格里夫',
                pageCount: 121,
                publishDate: '2002-08-01',
                publisher: '中信出版社',
                description: '格里夫用有趣的动物照片和睿智的散文语言再一次打动了读者。他思考这样的问题：我们为什么要来到世上，我们的人生目标是什么？他的轻松风格给这个一直存有最大争议的问题提供了一种全新的思路。《生命的意义》充满智慧、发人深思，是一本送给寻找人生真正目的、希望笑对人生的所有人的理想的礼品书。\n他用他的文字和图片再一次打动了我们，在无数广为流行的生命理论中，唯一永恒的主题就是爱。爱，尽管它的存在形式非常脆弱，但它却是唯一强大而持久的力量，它给我们日常生活带来了真正的意义。当然，我不是在谈论罗曼蒂克、卿卿我我的爱，'
            },
            {
                name: '花之绘：38种花的色铅笔图绘',
                isbn: '9787517002703',
                price: 32.8,
                author: '飞乐鸟',
                pageCount: 168,
                publishDate: '2012-12-01',
                publisher: '中国水利水电出版社',
                description: '色铅笔绘画一直都是一件安静而美丽的事情，像花朵般静静的舒展娇颜。《花之绘：38种花的色铅笔图绘》详细记录了38种花朵在纸上绽放的过程，飞乐鸟细致贴心的讲解和色铅笔柔和细腻的笔触将一起带你进入这个安静美丽的花之国度。准备好了吗？一起来让美丽绽放于你我的指尖吧！'
            },
            {
                name: '猴样',
                isbn: '9787512203570',
                price: 35.0,
                author: '王欣',
                pageCount: 256,
                publishDate: '2013-04-01',
                publisher: '中国民族摄影艺术出版社',
                description: '年度最热の毒舌名博：@反裤衩阵地 王欣继《嘲骚》、《装X》后，第三本讲述时尚圈装X界那点事的衩记新书闪亮登场。\n这本充满真诚的15万字混圈野史让你瞠目结舌的同时不禁会感叹这不可亵玩焉的时尚圈背后秘密真是看得好过瘾！'
            },
            {
                name: '人脉是设计出来的3：关键篇',
                isbn: '9787538568677',
                price: 28.0,
                author: '张超',
                pageCount: 216,
                publishDate: '2012-11-01',
                publisher: '北方妇女儿童出版社',
                description: '从关键人物、关键对话、关键问题入手，解决最关键的问题。例如：\n关键一句话：这件事必须老子出马\n要请不缺名利的人帮你，用什么打动他呢？\n主持人蔡康永讲到自己接某电视节目的原因，是对方说“除了你，就没有人能做”。他立刻被奉承到，觉得那真的不是“老子亲自出马”不行。\n所以，让对方明白，你把他放在最关键的位置，他才能在关键的时刻帮你。\n看透关键点：自己有用，到处是好人\n为什么总遇到一些不懂得感恩的人？\n也许，不是因为社会冷漠，而是我们自己还不够努力！\n有时候，感恩是一种交际的手段。如果你总有价值，总对别人有用——别人就总能想起你给予的帮助，时不时来看望你，与你保持联系。\n接近关键人物：你需要有自然的理由\n关键人物自信而敏感。\n接近他们，一定需要合理的理由。例如，你在沙龙中为自己争取一个服务所有人的角色，这样服务他、接近他，就很合理。\n如果关键人物是你久未联系的老同学，你开场可以说“昨天我整理老照片，看到了你，想找你聚聚，周末有时间吗？”\n要让一切都在自然的情况下发生。'
            },
            {
                name: '人脉是设计出来的1',
                isbn: '9787538557138',
                price: 28.0,
                author: '张超',
                pageCount: 201,
                publishDate: '2011-08-01',
                publisher: '北方妇女儿童出版社',
                description: '1.实用性：不但有概念，还教实实在在的做法。\n从搞定领导、搞定客户、搞定同事，《人脉是设计出来的》教你把一切人变为贵人，并利用人性规律，让一切在设计中。\n2.《人脉是设计出来的》张超最新力作！\n用案例和故事为方法，在坚实的理论基础上充分演绎，便于读者吸收。\n3. 简单高效：出好每张牌，解决核心问题！\n每个人手上都有牌，打法不同，结局不同。做实心人脉，用80%的能量经营20%的重点关系。'
            },
            {
                name: '人脉是设计出来的2：实战篇',
                isbn: '9787538562828',
                price: 28.0,
                author: '张超',
                pageCount: 216,
                publishDate: '2012-05-01',
                publisher: '北方妇女儿童出版社',
                description: '凝聚18年实战经验，数易其稿，千万读者翘首以盼。\n工作、生活、爱情我们一样都不能丢。\n结果虽有输赢，但人生绝无胜负\n谨以此书献给所有正在奋斗拼搏的人们。'
            },
            {
                name: '再不远行，就老了',
                isbn: '9787511329134',
                price: 38.0,
                author: '王泓人',
                pageCount: 272,
                publishDate: '2012-10-01',
                publisher: '中国华侨出版社',
                description: '★23岁单身女孩，独自背包旅行世界一年漫记！1300万中外网友看后感动推荐！\n★新浪博客、豆瓣旅游、磨房网等强势旅游媒体，联合推荐！\n★跟着单身女孩去看花花世界，身不好，心不老！\n★献给所有渴望旅行，陷入迷茫、低谷，看不到人生希望，急需改变现状的人！'
            },
            {
                name: '十年徒步中国',
                isbn: '9787503171390',
                price: 39.0,
                author: '雷殿生',
                pageCount: 320,
                publishDate: '2012-11-01',
                publisher: '中国地图出版社',
                description: '在新华网和中国图书商报联合举办的“2012年度中国影响力图书”评选中，《十年徒步中国》被评为 “中国十大影响力图书”。\n《十年徒步中国》作者准备十年，徒步行走十年，完成了个人徒步中国之旅，行走81000余公里，相当于绕地球赤道两圈，打破了徒步行走世界记录。在目前国内户外探险和徒步圈中享有盛誉，各大媒体争相采访。十年风雨行，他先后走掉了19个脚趾甲，穿烂了52双鞋， 遭遇19次抢劫；他探密神农架，生吞蛇肉充饥；罗霄山路遇巨蟒，惊险逃生；夜宿西藏阿里无人区，孤身战群狼；茫茫戈壁，靠喝血和尿求生……正是他的执着和坚持铸就了一段不平凡的人生。《十年徒步中国》由著名作家陈忠实题写书名，杨利伟、斯琴高娃、倪萍、藤华涛倾力推荐，天涯同名热贴日点击量超过20万人次！本书设计独特，用地图逐步揭示作者十年徒步历程，用“小知识”一一揭开读者心中疑惑，用“小贴士”为读者提供独家野外生存技巧，同时本书故事性极强，具有很强的市场潜力。\n兑奖方式：\n2013年2月24日开奖，2013年4月1日-8月31日兑奖有效。中奖号码于2013年2月24日公布在中国邮政网站上，2月26日刊登在《人民日报》、《中国邮政报》上，兑奖时，领奖人须持中奖贺卡及有效证件领奖，号码涂损、无号、自行剪下无效。'
            },
            {
                name: '我们始终牵手旅行',
                isbn: '9787511228192',
                price: 39.8,
                author: '左手',
                pageCount: 240,
                publishDate: '2012-08-01',
                publisher: '光明日报出版社',
                description: '和他们一样，在年少时相遇；\n和他们一样，携手经历青涩时光；\n和他们一样，你负责拍照，我负责笑；\n和他们一样，简单平凡，对生命执著；\n和他们一样，把身影定格在世界的每一个角落……\n她说，我们无法改变人生的长度，但可以改变生命的厚度。\n爱情迟早褪去激情，唯有我们始终牵手旅行。'
            },
            {
                name: '韩寒：我所理解的生活',
                isbn: '9787533935498',
                price: 29.0,
                author: '韩寒',
                pageCount: 184,
                publishDate: '2013-01-01',
                publisher: '浙江文艺出版社',
                description: '《青春》畅销150万册之后，韩寒新杂文《我所理解的生活》。\n韩寒新作《我所理解的生活》，三十岁的韩寒，第一次自我剖析。\n韩寒所有作品中，删减幅度最小！收录韩三篇：谈革命，说民主，要自由。\n少说，多做，不解释。'
            },
            {
                name: '青春',
                isbn: '9787543877450',
                price: 29.0,
                author: '韩寒',
                pageCount: 224,
                publishDate: '2011-10-01',
                publisher: '湖南人民出版社',
                description: '这一代年轻人的希望在哪里？\n29岁韩寒的悲悯之心\n畅销台湾，已售出10种语言版权。\n★ 年仅29岁的韩寒，越来越被人拿来与鲁迅相提并论，看他的杂文，总是那么畅快淋漓。\n★ 每当遇到公众事件，大家总是说：&ldquo;等等，先听听韩老师怎么说。&rdquo;\n★ 在过去的几年中，对于反家乐福抵制法国货、燃油税上涨、荆州挟尸要价等重大事件，韩老师的确作出了很经典的论断，许多句子脍炙人口，在各大论坛流传。\n★ 《青春（韩寒2011年最新力作）》主打篇目《青春》讲述了一个月薪1200块、生活在魔都上海郊区的年轻人的绝望。他和那些富士康员工们的绝望构成了这个时代年轻人的缩影。这篇文章在两岸三地华人读者中引起强烈反响，让大家一致反思&ldquo;这一代年轻人的希望在哪里&rdquo;这个话题。\n★ 本书收录了他仅有两次公开演讲的演讲稿。\n★ 本书还收录了韩寒从未在任何载体上发表过的文章。\n★ 随机赠送书签2张\n'
            },
            {
                name: '光明与磊落',
                isbn: '10965690',
                price: 10.0,
                author: '韩寒',
                pageCount: 656,
                publishDate: '2012-04-01',
                publisher: '湖南文艺出版社',
                description: '★这是才子韩寒创作生涯的起始。\n★珍贵手稿第一次与世人见面。\n★修改笔迹见证《三重门》的诞生之初。\n★未发表诗作展现深情一面。\n★超低价格回馈广大读者对自己的关心和厚爱。'
            },
            {
                name: '韩寒：青春',
                isbn: '9787201078861',
                price: 29.0,
                author: '韩寒',
                pageCount: 188,
                publishDate: '2013-02-01',
                publisher: '天津人民出版社',
                description: '这一代年轻人的希望在哪里？\n29岁韩寒的悲悯之心\n畅销台湾，已售出10种语言版权。'
            },
            {
                name: '三重门（纪念版）',
                isbn: '9787506341035',
                price: 19.0,
                author: '韩寒',
                pageCount: 326,
                publishDate: '2007-10-01',
                publisher: '作家出版社',
                description: '韩寒的长篇小说《三重门》从2000年5月初版发行至今，销量居然达到了100万册，这对不太景气的小说市场来说，无疑是个天量。 一部作品不可能让所有的读者都100%的喜欢，一个人的行为准则和处世方式也没有必要让天下所有人都满意。活得本色，活出个性，那就是一个潇洒的人生！'
            },
            {
                name: '观念的水位',
                isbn: '9787308108584',
                price: 36.0,
                author: '刘瑜',
                pageCount: 280,
                publishDate: '2013-01-01',
                publisher: '浙江大学出版社',
                description: '将过于霸道的声音拧小，将被屏蔽的声音放大，将司空见惯的思维方式打上一个问号，将盒子里的光释放。\n《民主的细节》、《送你一颗子弹》作者，著名学者刘瑜2012年最新力作——《观念的水位》\n告诉你不知道自己知道的观念，擦拭被蒙蔽的理性。\n对国家之顽固，对普通人之麻木，乃至知识分子之矜骄说“不”！\n'
            },
            {
                name: '蚀心者',
                isbn: '9787539957746',
                price: 29.8,
                author: '辛夷坞',
                pageCount: 304,
                publishDate: '2013-01-01',
                publisher: '江苏文艺出版社',
                description: '暖伤青春代言人辛夷坞2012年全新力作——《蚀心者》！\n当女人爱时 男人当知畏惧\n因为这时她牺牲一切！\n酝酿五年风格大作 20万字深情演绎！\n超越《致我们终将逝去的青春》创造巅峰之作！\n京东独家赠送辛夷坞亲笔签名印制版明信片！附赠赵薇导演、韩庚、赵又廷领衔主演电影《致我们终将逝去的青春》电影场景照！\n'
            },
            {
                name: '数码单反摄影从入门到精通（套装全3册）',
                isbn: '10970860',
                price: 267.0,
                author: '神龙摄影',
                pageCount: 1085,
                publishDate: '2012-04-01',
                publisher: '人民邮电出版社',
                description: '1、全国摄影图书畅销排行榜冠军\n2、2007~2011连续5年荣获蜂鸟网友评选的最受欢迎摄影图书出版社奖\n3、大学生最喜爱图书奖\n'
            },
            {
                name: '大秦帝国（签章本）',
                isbn: '9787208105928',
                price: 598.0,
                author: '孙皓晖',
                pageCount: 4880,
                publishDate: '2012-05-01',
                publisher: '上海人民出版社',
                description: '1）近十年最畅销长篇历史小说。\n2）一部精神本位的大国兴亡录，让当代中国人为之振奋并受益的战国版《大国崛起》。第一次以&lsquo;大争精神&rsquo;和&lsquo;阳谋&rsquo;风格架构历史小说，着眼于国家文明的全面竞争，而非重复宫闱密事官场阴谋的老套路。\n3）第一次正确厘清国家文明的基本方面：将战国时代的万千气象理成一串环环相扣的兴亡故事，以一种全新的视角，再现了大秦帝国生灭兴亡的历史过程，借此回答了关于中国文明史的若干基本问题。\n4）从政必备，从商必读。《大秦》细致地整理了诸位精英们的做事方略，充满了奋发惕励的进取精神与旷达潇洒的人生态度，无论领袖或普通人都能从中获益。'
            },
            {
                name: '中国文明正源新论',
                isbn: '9787208103580',
                price: 49.0,
                author: '孙皓晖',
                pageCount: 435,
                publishDate: '2012-01-01',
                publisher: '上海人民出版社',
                description: '中国文明的灵魂何在？《大秦帝国》作者孙皓晖突破史障，拨开历史烟雾，重审五千年中国文明根基；搁置历史细节争议，寻求中国文明共识；纠正儒家独尊偏弊，再树文明正源雄风。大争之世，多事之时；凡有血气，皆有争心。\n破解中国困境，重寻未来方向。从政府高层到普通民众都无法漠视的30篇论述。\n'
            },
            {
                name: '河神：鬼水怪谈',
                isbn: '9787212060732',
                price: 22.8,
                author: '天下霸唱',
                pageCount: 276,
                publishDate: '2013-02-01',
                publisher: '安徽人民出版社',
                description: '关键词：阴阳河、鬼水、铁盒冤魂、僵尸人胎、镜子阵、人皮炸弹、灶王爷……\n《河神：鬼水怪谈》是天下霸唱以“聊斋”方式，积数年之功，打造的新志异传奇，集侦探推理、悬疑探险、历史掌故、灵异事件、民俗风情于一体。小说围绕主人公“河神”侦破“魏家坟捉妖”和“粮房胡同凶宅”两件大案展开，故事险象环生、环环相扣。\n《河神：鬼水怪谈》特色：\n1.三年寻访素材、一年整理素材构思情节，2012年宅一年之功三易其稿，终集腋成裘。《鬼吹灯》后作者最为看重之重量级作品。\n2.10幅作者构思、名家手绘情节插图，图文并茂，精彩纷呈。“河神”郭师傅、丁卯、圆通法师李大愣，最新“铁三角”强势组合！\n3. 天下霸唱首次亲笔手书寄语读者，诚挚感谢读者多年的厚爱与支持。\n4.天下霸唱奉献自己多年珍藏旧日天津卫“鬼水”阴阳河老照片，上演现实虚幻交错“年代秀”。'
            },
            {
                name: '鬼吹灯全集（套装共8册）（新版）',
                isbn: '10253902',
                price: 227.4,
                author: '天下霸唱',
                pageCount: 2470,
                publishDate: '2009-01-01',
                publisher: '安徽文艺出版社',
                description: '《鬼吹灯全集》是一部非看不可的小说·盗墓者的传奇：秘术、墓葬、异兽、诡异……；专业的考古人士都疯狂追捧！“灯学”正流行。 荣获2006年“百度搜索网络小说top10第一名”，惊险创造了奇迹，幽默杀死了寂寞，盗墓者的诡异经历，体验中国式古墓探险，洞开一扇神秘的探索之门\n远古的文明，失落的宝藏，神秘莫测的古墓，没有什么痹烩些元素更能吸引观众的眼球了，现在世界上正在兴起一股“古墓经济”，美国商业大片《盗墓迷城》《夺宝奇兵》，经典电玩游戏《古墓丽影》，无不获得巨大的商业成功，这些虚拟出来的“古墓”，使人们在舒适的电影院或者家中，跟随着电影或者游戏中的主人公展开惊心动魄，波澜壮阔的大冒险，体验前所未有的刺激。'
            },
            {
                name: '我的邻居是妖怪',
                isbn: '9787543878938',
                price: 26.0,
                author: '天下霸唱',
                pageCount: 255,
                publishDate: '2012-01-01',
                publisher: '中南出版传媒集团',
                description: '1、天下霸唱首次解读中国神秘文化，讲述自己亲身经历的诡异事件；\n2、《鬼吹灯》写作精彩元素大集合，阴阳+气场+风水+运势，诡异奇绝的情节，幽默诙谐的笔调，跌宕起伏的叙事。以说书的口吻、浓重的津味，带你进入一场游历中华民间偏门的传奇之旅。天下霸唱十年素材累积，亲身见闻故事大集合；《鬼吹灯》后大胆转型，体验天下霸唱独特的偏门之旅。'
            }
        ];

        function filter(array, propertyName, value, strict) {
            var result = [];
            for (var i = 0; i < array.length; i++) {
                var item = array[i];
                if (strict && item[propertyName] === value) {
                    result.push(item);
                }
                else if (item[propertyName].indexOf(value) >= 0) {
                    result.push(item);
                }
            }
            return result;
        }

        var database = {
            find: function(isbn) {
                for (var i = 0; i < books.length; i++) {
                    var book = books[i];
                    if (book.isbn === isbn) {
                        return book;
                    }
                }
                return null;
            },

            search: function(query) {
                var result = books;
                if (query.keywords) {
                    result = filter(result, 'name', query.keywords, false);
                }
                if (query.author) {
                    result = filter(result, 'author', query.author, true);
                }
                if (query.publisher) {
                    result = filter(result, 'publisher', query.publisher, true);
                }

                var pageIndex = query.page || 1;
                var pageSize = 10;
                var pageCount = Math.ceil(result.length / pageSize);

                result = result.slice((pageIndex - 1) * pageSize, pageSize);
                for (var i = 0; i < result.length; i++) {
                    var book = result[i];
                    var clone = {};
                    for (var key in book) {
                        clone[key] = book[key];
                    }
                    result[i] = clone;
                }

                switch (query.order) {
                    case 'price':
                        result.sort(
                            function(x, y) {
                                return x.price - y.price;
                            }
                        );
                        break;
                    case 'author':
                        rresult.sort(
                            function(x, y) {
                                return x.author.localeCompare(y.author);
                            }
                        );
                        break;
                    case 'publisher':
                        result = result.sort(
                            function(x, y) {
                                return x.publisher.localeCompare(y.publisher);
                            }
                        );
                        break;
                }

                return {
                    result: result,
                    page: pageIndex,
                    pageCount: pageCount
                };
            }
        };

        require('er/datasource').queryDatabase = function(query) {
            return function() {
                return database.search(query);
            };
        };

        return database;
    }
);