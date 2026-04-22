import { SectionData, TimePeriod } from './types';

export const REPORT_DATA: SectionData[] = [
  {
    id: 'positioning',
    title: '定位讨论',
    layout: 'typography',
    sideImage: '/suwen.png',
    items: [
      {
        title: '',
        content: '1、不是单纯的问诊或专家咨询平台',
      },
      {
        title: 'sub',
        content: '不是「阿福」，不是「点点专家」',
      },
      {
        title: '',
        content: '2、不是以解决单次病痛为导向的寻医问药',
      },
      {
        title: 'sub',
        content: '不是：我生病了，来素问找医生看病',
      },
      {
        title: '',
        content: '3、不是多方求证的病例会诊中心',
      },
      {
        title: 'sub',
        content: '不是：我有一份病例报告，每个医生说法都不一样，我来素问寻求答案',
      },
      {
        title: 'divider',
        content: '——',
      },
      {
        title: '',
        content: '定位：提供可落地的个人健康调理方案',
      },
      {
        title: 'sub',
        content: '而是：素问上有很多让我更加健康的方案，我来看看有什么适合我的',
      },
      {
        title: '',
        content: '目标：引导用户进行生活方式的干预与重塑',
      },
      {
        title: 'sub',
        content: '而是：我想改改我不健康的生活方式，让素问给我制定个调理方案',
      },
      {
        title: 'divider',
        content: '———',
      },
      {
        title: 'conclusion',
        content: '结论：',
      },
      {
        title: 'brand',
        content: '素问：个人健康生活养成顾问',
      },
      {
        title: 'goal',
        content: '业务范畴：涵盖中医、心理、健身、康养的深度健康管理',
      },
      {
        title: 'analogy',
        content: '更加直观的理解：素问是涵盖「身、心、灵」全维度的健康生活方式小红书',
      }
    ]
  },
  {
    id: 'insights',
    title: '之前的工作和思考',
    layout: 'typography',
    items: [
      {
        title: 'subtitle',
        content: '完成工作：',
      },
      {
        title: '',
        content: '（1）3月15日，小程序V1.1上线',
      },
      {
        title: '',
        content: '（2）4月15日，androidV1.1提测',
      },
      {
        title: '',
        content: '（3）4月1日，ios送审',
      },
      {
        title: '',
        content: '（4）4月15日，“含章素问”、“素小问”商标获得受理，启动开店申请',
      },
      {
        title: '',
        content: '（5）至今，完成了一系列内部自动化工作流',
      },
      {
        title: '',
        content: '（6）完成第一批专家，「耿院」为主的模版打样',
      },
      {
        title: 'divider',
        content: '——',
      },
      {
        title: 'subtitle-red',
        content: '核心问题：',
      },
      {
        title: 'warning',
        content: '1、资质、备案、开发者账号及云账号管理混乱，导致在主体更换中出现诸多死循环路径。目前虽仍有遗留问题但已在逐一拆解，暂不影响业务。',
      },
      {
        title: 'warning',
        content: '2、初步沟通中发现，医生群体对入驻存在多元化的担忧。我们亟需建立一套与产品逻辑高度契合、能精准打消疑虑的标准化 BD 路径与营销话术。',
      },
      {
        title: 'warning',
        content: '3、基于医生的专业身份限制，视频号等主流媒体对“数字人分身”类视频审核极为严苛，这与此前规划的专家视频号矩阵式铺量方案存在偏差。',
      },
      {
        title: 'divider',
        content: '——',
      },
      {
        title: 'subtitle',
        content: '启发与亮点：',
      },
      {
        title: 'highlight-title',
        content: '（1）“小药炉养生”视频号初期成果',
      },
      {
        title: '',
        content: '最近一条视频评论超1000条，转发数百。已找到视频号运营套路，计划开展矩阵号。',
      },
      {
        title: 'inline-gallery',
        content: '视频号运营数据及矩阵规划图',
        images: ['/xiaoyaolu.png', '/comment.png', '/data.jpg']
      },
      {
        title: 'highlight-title',
        content: '（2）MBTI测试刷屏的启示',
      },
      {
        title: '',
        content: '测试类产品依旧是优质传播形态，我们的「健康测试量表系统」将借鉴相关逻辑，平衡「专业」与「网感」。',
      },
      {
        title: 'inline-gallery',
        content: '健康测试量表系统原型及逻辑图（MBTI 启发系列）',
        images: ['/MBTI0.jpg', '/MBTI1.png', '/MBTI2.png']
      },
      {
        title: 'highlight-title',
        content: '（3）“喜纯”爆火与「卖方案」逻辑',
        type: 'highlight'
      },
      {
        title: '',
        content: '核心不是「卖品」，而是卖「方案」。如「7天恢复元气」（食疗包）、「14天恢复睡眠标准」（打卡+茶饮）。',
      },
      {
        title: 'inline-gallery',
        content: '喜纯调理方案产品包（7天/14天）示意图',
        images: ['/xichun1.jpg', '/xichun2.png', '/xichun3.png', '/xichun4.png']
      },
      {
        title: 'divider',
        content: '——',
      },
      {
        title: 'subtitle',
        content: '医生IP的作用？',
      },
      {
        title: '',
        content: '（1）当「方案/经验/内容」呈现给用户的时候，专家（或专家的观点）作为点评的形式存在，增加这个内容社区的专业感和信任感。',
      },
      {
        title: '',
        content: '（2）专家作为「健康主理人」的形象，作为一种背景氛围，长期陪伴用户，和用户交流，输出知识型内容，而不是严肃诊断结论。',
      },
      {
        title: 'divider',
        content: '——',
      },
      {
        title: 'conclusion-small',
        content: '如何让专家不要做太多事情，并降低AI问诊效果的压力，又能让他们愿意入驻，并愿意把粉丝引入，这是我们主要的思考方向。',
      }
    ]
  },
  {
    id: 'health-curator',
    title: '「健康主理人」：从医学专家到个人健康导师',
    layout: 'typography',
    items: [
      {
        title: 'subtitle',
        content: '为何要重构「健康主理人」的概念？',
      },
      {
        title: 'highlight-title',
        content: '（1）场景延伸：从单次咨询到全周期健康关怀',
      },
      {
        title: '',
        content: '主理人不仅是疾病咨询的入口，更是融入用户饮食、起居等日常场景的专业伙伴。通过场景化建议，将专业知识转化为易执行的生活方案，建立长期服务价值。',
      },
      {
        title: 'highlight-title',
        content: '（2）数字赋能：构建以 AI 为核心的健康智库与分发工具库',
      },
      {
        title: '',
        content: '通过 AI 工具箱，协助专家将医理逻辑转化为测评、食疗、计划等多种形式，高效输出至小程序及社群。降低内容生产门槛，助力专家获客并建立深度粉丝粘性。',
      },
      {
        title: 'highlight-title',
        content: '（3）角色转型：在专业性基础上确立导师式互动关系',
      },
      {
        title: '',
        content: '帮助医生在保持职业严谨性的同时，向“个人健康导师”身份平移。通过持续的内容输出与互动建立信任，沉淀品牌价值。',
      }
    ]
  },
  {
    id: 'target-audience',
    title: '目标人群：全生命周期覆盖',
    layout: 'typography',
    items: [
      {
        title: 'subtitle',
        content: '针对不同代际的健康需求精准画像：',
      },
      {
        title: '',
        content: '· 60后：追求从容养老，渴望科学系统的慢病防治与长效康养智慧。',
      },
      {
        title: '',
        content: '· 70后：正值人生下半场，寻求精准的身心平衡与机能修复方案。',
      },
      {
        title: '',
        content: '· 80后：在职场与家庭间压力博弈，急需高效平衡的身心调理支点。',
      },
      {
        title: '',
        content: '· 90后：深受加班与熬夜困扰，在亚健康漩涡中寻找简单有趣的养生自救。',
      },
      {
        title: '',
        content: '· 00后：在潮流与自律间起舞，追求更具网感、更多元的身心美育管理。',
      }
    ]
  },
  {
    id: 'mindset',
    title: '用户心智和预期行为',
    layout: 'typography',
    items: [
      {
        title: 'subtitle',
        content: '用户心智：',
      },
      {
        title: '',
        content: '素问依托中医智慧，整合心理、健身、康养等多维方案。用户不仅在此获取知识，更在此寻找适配现代生活节奏的专业调理建议。',
      },
      {
        title: 'highlight-title',
        content: '“在「素问」，我能找到适配个人身心状况的调理经验。”',
      },
      {
        title: 'divider',
        content: '——',
      },
      {
        title: 'subtitle',
        content: '预期行为：',
      },
      {
        title: 'highlight-title',
        content: '通过互动交流，定制个人健康调理方案',
      },
      {
        title: '',
        content: '用户通过与 AI 助理的交流，获取实操性建议、数字化工具以及定制化的调理周期计划。',
      },
      {
        title: 'highlight-title',
        content: '从获取方案到落实日常生活细节',
      },
      {
        title: '',
        content: '将专业方案转化为日常行动。当用户体验到身心状态的改善后，会产生基于真实效果的口碑传播与经验分享。',
      }
    ]
  },
  {
    id: 'product-exp',
    title: '核心产品体验',
    layout: 'interactive-list',
    items: [
      {
        title: 'ClipboardList',
        content: '身心状态专业评估\n基于专业逻辑的量化测评，多维度捕捉身心差异，实现准确的自我认知。',
        imageUrl: '/celiang.png',
      },
      {
        title: 'Activity',
        content: '健康习惯养成计划\n将目标拆解为每日轻量化任务，通过反馈机制辅助习惯锁定。',
        imageUrl: '/jihua.png',
      },
      {
        title: 'ChefHat',
        content: '定制化食疗方案\n根据用户需求匹配和定制餐谱，让日常饮食成为系统性的调理手段。',
        imageUrl: '/shiliao.png',
      },
      {
        title: 'FileText',
        content: '家庭健康数字档案\n一站式记录家庭健康轨迹，构建系统化的数字档案，支撑长期健康决策。',
        imageUrl: '/dangan.png',
      },
      {
        title: 'BookOpen',
        content: '大家通识：基于名家体系的调养建议\n将专家知识体系拆解为具备专业医理与可操作性的健康指南。',
        imageUrl: '/wenzhang.png',
      },
      {
        title: 'MessageSquare',
        content: 'AI 个人健康调理助手\n通过智能对话，整合测评、习惯、食疗等维度，输出具备专业支撑的调理全策。',
        type: 'highlight',
        imageUrl: '/agent.jpg',
      },
      {
        title: 'ShoppingBag',
        content: '「素问严选」配套供应\n基于调理方案的配套产品供应。在方案中一键获取严选的中药器物与优质食材。',
        imageUrl: '/haowu.jpg',
      }
    ]
  },
  {
    id: 'support-cap-content',
    title: '核心支撑能力（一）：智能内容生产管线',
    layout: 'interactive-stack',
    items: [
      {
        title: 'ClipboardList',
        content: '身心状态测评内容管线\n基于专家评估逻辑，自动生成多维度、互动式的身心状态量表。',
        imageUrl: '/survey.png',
      },
      {
        title: 'Activity',
        content: '健康习惯养成计划管线\n将健康目标智能拆解为可落地的每日打卡任务与习惯建议。',
        imageUrl: '/habit.png',
      },
      {
        title: 'ChefHat',
        content: '定制食疗方案生产管线\n结合症候与真实需求，生产具有个性化调理属性的食疗建议。',
        imageUrl: '/meal.png',
      },
      {
        title: 'BookOpen',
        content: '大家通识：专家级生活化内容管线\n高效生产由权威医理支撑、具备显著实践效果的视频与图文经验。',
        imageUrl: '/expert.png',
      }
    ]
  },
  {
    id: 'support-cap-engine',
    title: '核心支撑能力：健康逻辑引擎',
    layout: 'diagram',
    items: [
      {
        title: 'AI 交互内容转化引擎',
        content: '负责将原子化的医理知识、食疗配方、量表逻辑转化为可交互的数字化服务。',
      },
      {
        title: '供应链辅助底座',
        content: '「素问严选」的技术支撑，负责商品筛选、医理适配分析与智能上架建议。',
      },
      {
        title: '健康方案向量索引',
        content: '建立内容、方案与商品间的逻辑建模，实现从单一内容向整合调理方案的升维。',
      },
      {
        title: '生命周期动态建模',
        content: '对用户多维数据进行深度分析，构建动态、精准的健康干预画像模型。',
      },
      {
        title: '证据驱动型推荐智能体',
        content: '全案决策中心。整合向量引擎与用户画像，提供具备专业出处背书的建议。',
      },
      {
        title: '专家经验数字模型矩阵',
        content: '临床专家经验的数字化呈现，通过决策辅助引擎，将专业智慧输出给终端用户。',
      }
    ]
  },
  {
    id: 'business-loop',
    title: '业务闭环与生态流转视图',
    description: '构建全域触达、全维转化、深度运营的闭环商业系统。',
    layout: 'business-loop',
    items: [
      {
        title: '素问内容矩阵',
        content: '包含专家文章、养生视频、节气图文等深度深度内容体系，负责公域获客与用户粘性。',
      },
      {
        title: '素问小程序工具矩阵',
        content: '身心量表测评、节气食疗工具、打卡打卡计划等轻量化工具模块。',
      },
      {
        title: '素问APP',
        content: '核心品牌阵地、深度服务载体。集成智能智能体、动态档案、深度智库及严选商城。',
      },
      {
        title: '素问旗舰小店',
        content: '官方微信商城。提供核心严选商品及订阅制服务。',
      },
      {
        title: '素问联盟小店',
        content: '合作伙伴分销平台，扩大品牌影响力与市场占有率。',
      },
      {
        title: '素问私域群',
        content: '基于健康生活方式的同频社群，负责高频互动与信任转化。',
      },
      {
        title: '用户',
        content: '全生态系统的服务对象，也是价值贡献的终点与口碑传播的起点。',
      },
      {
        title: '素问天猫旗舰店',
        content: '品牌高度与价格锚定中心。负责外部公域背书及核心价位段维护。',
      },
      {
        title: '素问会员卡',
        content: '礼品系列、联名系列卡券。作为获客引流与权益绑定的重要抓手。',
      }
    ]
  },
  {
    id: 'brand-ecosystem',
    title: '品牌构成',
    layout: 'interactive-split',
    items: [
      {
        title: '主品牌',
        content: '素问\n个人健康生活养成顾问，深度整合中医智慧与现代生活方式。',
        imageUrl: '/20260420-002312.jpeg',
      },
      {
        title: '子品牌',
        content: '素问严选\n配套调理方案的产品供应平台，为您精选高品质健康好物。',
        imageUrl: '',
      },
      {
        title: '子品牌',
        content: '素问个人助手\n您的专业 AI 健康顾问，提供即时、精准的调理指导建议。',
        imageUrl: '',
      }
    ]
  },
  {
    id: 'ecommerce-visuals',
    title: '电商视觉方案概览',
    description: '横向滑动查看，点击可放大。',
    layout: 'horizontal-gallery',
    items: [
      { title: '视觉方案 1', content: '现代康养包装方案', imageUrl: '/20260420-002322.jpeg' },
      { title: '视觉方案 2', content: '节气食疗包装方案', imageUrl: '/20260420-002326.jpeg' },
      { title: '视觉方案 3', content: '严选好物视觉呈现', imageUrl: '/20260420-002331.jpeg' },
      { title: '视觉方案 4', content: '全案整合视觉设计', imageUrl: '/20260420-002335.jpeg' },
    ]
  },
  {
    id: 'actions',
    title: '下一阶段关键动作',
    layout: 'timeline',
    items: [
      {
        title: '网店开设与试刊',
        content: '· 完成「素问」品牌天猫/微信店开设\n· 完成全媒体官方账号开设\n· 完成首批5款核心商品试上架',
        period: '4月份',
        type: 'milestone'
      },
      {
        title: '正式预售与App迭代',
        content: '· 正式开启全渠道预售\n· 开展「端午安康」礼盒专题营销\n· App V1.5 全面更新上线',
        period: '5月份',
        type: 'milestone'
      },
      {
        title: '品牌盛典与大促执行',
        content: '· 启动「素问」专家年度论证会\n· 举办品牌夏季新品发布会\n· 全力执行618大促销售计划\n· 引入更多专家建立专家智库',
        period: '6月份',
        type: 'milestone'
      }
    ]
  },
  {
    id: 'goals',
    title: '数字目标',
    layout: 'timeline',
    items: [
      {
        title: '基础声量与渠道建设',
        content: '· 全媒体播放/阅读量：新增2万记录\n· 粉丝增长：新增200，总粉丝破500\n· 电商/小程序：完成天猫/微信店上架(≥5 SKU)；小程序待发\n· 核心逻辑：验证内容自然流量，为5月引流蓄势',
        period: '4月份',
        type: 'goal'
      },
      {
        title: '引流验证与初期成交',
        content: '· 全媒体曝光：月累计30万播放/阅读\n· 粉丝增长：月新增1万\n· 流量转化：进店UV ≥5000，GMV 2-4万\n· 转化指标：转化率 ≥1.5%，小程序注册 ≥500\n· 转化路径：曝光 → 进店 → 领券首单 → 成交\n· BD：完成10位专家入驻',
        period: '5月份',
        type: 'goal'
      },
      {
        title: '规模化爆发与闭环建立',
        content: '· 全媒体爆发：累计100万播放/阅读\n· 爆款打造：全平台互动超5000内容 ≥10条\n· 业务核心：GMV 15-25万，复购 ≥15%，ROI ≥1.5\n· 私域锁客：小程序注册 ≥3000，会员兑换 ≥30%\n· 闭环路径：内容 → 成交 → 锁客 → 复购\n· BD：完成30位专家入驻',
        period: '6月份',
        type: 'goal'
      }
    ]
  },
  {
    id: 'finance',
    title: '财务情况',
    layout: 'timeline',
    items: [
      {
        title: '支出管控与基础投入',
        content: '· 总支出：25W\n· 构成：工资 + 云/算力 + 其他',
        period: 'Q1',
      },
      {
        title: '运营维持性支出',
        content: '· 总支出：22W\n· 构成：工资 + 云/算力 + 其他',
        period: '4月份',
      },
      {
        title: '投入增长与初期营收',
        content: '· 总支出：28W (含货款/物料/营销)\n· 预期收入：3-5W',
        period: '5月份',
      },
      {
        title: '营收发力与规模投入',
        content: '· 总支出：30W\n· 预期收入：15-20W',
        period: '6月份',
      },
      {
        title: '规模化与盈利期望',
        content: '· 目标 GMV：100W\n· 盈利预期：30% 毛利润率',
        period: '7月份',
      }
    ]
  }
];
