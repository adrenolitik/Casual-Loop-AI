import { CausalStudy } from '../types';

export const BENCHMARK_STUDIES: CausalStudy[] = [
  {
    id: 'macroeconomics-inflation-interest',
    title: 'Макроэкономическая динамика: Инфляционная спираль, ключевая ставка и занятость',
    domain: 'Экономическая кибернетика и монетарная политика',
    problemStatement: 'Исследование механизмов передачи монетарной политики, формирования инфляционных ожиданий и спирали «заработная плата — цены» при шоках предложения.',
    researchQuestions: [
      'Каковы условия перехода системы в режим самоподдерживающейся инфляционной спирали?',
      'Какую роль играют временные лаги в монетарной политике центрального банка?',
      'Где находятся ключевые точки воздействия (leverage points) для стабилизации инфляции без рецессии?'
    ],
    hypotheses: [
      {
        id: 'h1',
        statement: 'Повышение ключевой ставки сдерживает потребительский спрос с задержкой в 2-4 квартала через удорожание кредитов.',
        confidence: 0.92,
        status: 'confirmed',
        evidence: 'Эмпирические данные монетарной трансмиссии и балансирующий контур B1.'
      },
      {
        id: 'h2',
        statement: 'Инфляционные ожидания создают доминирующий усиливающий контур R1, нивелирующий умеренное повышение ставок.',
        confidence: 0.88,
        status: 'confirmed',
        evidence: 'Анализ чувствительности контура "Цены -> Ожидания -> Требования к зарплате -> Издержки -> Цены".'
      }
    ],
    nodes: [
      {
        id: 'inflation_rate',
        name: 'Темп инфляции (ИПЦ)',
        type: 'flow',
        category: 'Цены',
        description: 'Годовой процентный прирост общего уровня потребительских цен.',
        initialValue: 65,
        unit: '%',
        min: 0,
        max: 150,
        x: 450,
        y: 120,
        leverageScore: 7
      },
      {
        id: 'inflation_expectations',
        name: 'Инфляционные ожидания населения',
        type: 'auxiliary',
        category: 'Психология рынка',
        description: 'Субъективные прогнозы будущей инфляции домохозяйствами и бизнесом.',
        initialValue: 60,
        unit: 'индекс',
        min: 0,
        max: 150,
        x: 720,
        y: 120,
        leverageScore: 8,
        isLeveragePoint: true
      },
      {
        id: 'wage_growth',
        name: 'Рост номинальных зарплат',
        type: 'flow',
        category: 'Рынок труда',
        description: 'Требования индексации трудовых доходов в ответ на рост стоимости жизни.',
        initialValue: 55,
        unit: '%',
        min: 0,
        max: 150,
        x: 750,
        y: 300,
        leverageScore: 6
      },
      {
        id: 'production_costs',
        name: 'Себестоимость продукции бизнеса',
        type: 'auxiliary',
        category: 'Производство',
        description: 'Затраты на оплату труда, сырье и логистику на единицу выпуска.',
        initialValue: 58,
        unit: 'усл. ед.',
        min: 0,
        max: 150,
        x: 580,
        y: 380,
        leverageScore: 5
      },
      {
        id: 'central_bank_rate',
        name: 'Ключевая ставка ЦБ',
        type: 'stock',
        category: 'Монетарные рычаги',
        description: 'Базовая процентная ставка регулятора для предоставления ликвидности банкам.',
        initialValue: 50,
        unit: '%',
        min: 0,
        max: 150,
        x: 180,
        y: 140,
        leverageScore: 9,
        isLeveragePoint: true
      },
      {
        id: 'credit_availability',
        name: 'Доступность и объём кредитования',
        type: 'auxiliary',
        category: 'Финансовый сектор',
        description: 'Объем выданных потребительских и корпоративных кредитов.',
        initialValue: 55,
        unit: 'млрд руб.',
        min: 0,
        max: 150,
        x: 180,
        y: 320,
        leverageScore: 6
      },
      {
        id: 'aggregate_demand',
        name: 'Совокупный потребительский спрос',
        type: 'stock',
        category: 'Макропоказатели',
        description: 'Суммарный объем платежеспособного спроса в экономике.',
        initialValue: 62,
        unit: 'индекс',
        min: 0,
        max: 150,
        x: 350,
        y: 360,
        leverageScore: 8
      }
    ],
    edges: [
      {
        id: 'e1',
        source: 'inflation_rate',
        target: 'inflation_expectations',
        polarity: '+',
        strength: 'strong',
        weight: 0.85,
        delay: false,
        rationale: 'Рост наблюдаемых цен напрямую повышает страх дальнейшего обесценения денег.'
      },
      {
        id: 'e2',
        source: 'inflation_expectations',
        target: 'wage_growth',
        polarity: '+',
        strength: 'strong',
        weight: 0.8,
        delay: true,
        delayDuration: '1-2 квартала',
        rationale: 'Работники требуют индексации зарплат для компенсации ожидаемого роста цен.'
      },
      {
        id: 'e3',
        source: 'wage_growth',
        target: 'production_costs',
        polarity: '+',
        strength: 'strong',
        weight: 0.75,
        delay: false,
        rationale: 'Фонд оплаты труда составляет существенную долю в издержках предприятий.'
      },
      {
        id: 'e4',
        source: 'production_costs',
        target: 'inflation_rate',
        polarity: '+',
        strength: 'strong',
        weight: 0.9,
        delay: false,
        rationale: 'Предприятия переносят возросшие издержки в конечные отпускные цены.'
      },
      {
        id: 'e5',
        source: 'inflation_rate',
        target: 'central_bank_rate',
        polarity: '+',
        strength: 'strong',
        weight: 0.95,
        delay: true,
        delayDuration: '1 заседание ЦБ',
        rationale: 'Центральный банк повышает ставку в ответ на отклонение инфляции от таргета.'
      },
      {
        id: 'e6',
        source: 'central_bank_rate',
        target: 'credit_availability',
        polarity: '-',
        strength: 'strong',
        weight: 0.85,
        delay: true,
        delayDuration: '2-3 месяца',
        rationale: 'Рост ставок удорожает кредиты и снижает привлекательность заимствований.'
      },
      {
        id: 'e7',
        source: 'credit_availability',
        target: 'aggregate_demand',
        polarity: '+',
        strength: 'moderate',
        weight: 0.7,
        delay: false,
        rationale: 'Доступные заемные средства финансируют крупные покупки и инвестиции.'
      },
      {
        id: 'e8',
        source: 'wage_growth',
        target: 'aggregate_demand',
        polarity: '+',
        strength: 'moderate',
        weight: 0.65,
        delay: false,
        rationale: 'Рост располагаемых доходов увеличивает текущее потребление.'
      },
      {
        id: 'e9',
        source: 'aggregate_demand',
        target: 'inflation_rate',
        polarity: '+',
        strength: 'strong',
        weight: 0.8,
        delay: true,
        delayDuration: '1-2 месяца',
        rationale: 'Избыточный спрос при ограниченном предложении толкает цены вверх (инфляция спроса).'
      }
    ],
    loops: [
      {
        id: 'R1',
        type: 'reinforcing',
        name: 'Спираль «Заработная плата — Цены»',
        nodeIds: ['inflation_rate', 'inflation_expectations', 'wage_growth', 'production_costs'],
        edgeIds: ['e1', 'e2', 'e3', 'e4'],
        description: 'Усиливающая петля обратной связи. Рост инфляции повышает ожидания, что стимулирует рост зарплат и издержек, толкая цены еще выше.',
        polarityReasoning: '0 отрицательных связей → Четное число (-) → Усиливающий цикл (R)'
      },
      {
        id: 'B1',
        type: 'balancing',
        name: 'Монетарное торможение спроса',
        nodeIds: ['inflation_rate', 'central_bank_rate', 'credit_availability', 'aggregate_demand'],
        edgeIds: ['e5', 'e6', 'e7', 'e9'],
        description: 'Балансирующая петля регулятора. Рост инфляции ведет к повышению ставки ЦБ, сокращению кредита и охлаждению совокупного спроса.',
        polarityReasoning: '1 отрицательная связь (e6: ставка → кредит) → Нечетное число (-) → Балансирующий цикл (B)'
      },
      {
        id: 'R2',
        type: 'reinforcing',
        name: 'Потребительский спрос от доходов',
        nodeIds: ['inflation_rate', 'inflation_expectations', 'wage_growth', 'aggregate_demand'],
        edgeIds: ['e1', 'e2', 'e8', 'e9'],
        description: 'Второй усиливающий контур, в котором индексация зарплат подпитывает совокупный спрос и сохраняет инфляционное давление.',
        polarityReasoning: '0 отрицательных связей → Усиливающий цикл (R)'
      }
    ],
    archetypes: [
      {
        id: 'arch-1',
        name: 'Пределы роста (Limits to Growth) и задержка отклика',
        description: 'Временной лаг между действиями ЦБ (ставки) и реальным откликом цен (3-6 месяцев) порождает риск гиперкомпенсации (over-tightening) и резкой рецессии.',
        involvedLoops: ['R1', 'B1'],
        warningSignals: [
          'Резкое падение кредитования при всё ещё высокой текущей инфляции',
          'Рост корпоративных дефолтов до стабилизации цен'
        ],
        strategicInterventions: [
          'Коммуникация регулятора (Forward Guidance) для прямого заякоривания ожиданий (R1) без экстремального роста ставок',
          'Меры со стороны предложения (снижение логистических и регуляторных издержек бизнеса)'
        ]
      }
    ],
    leveragePoints: [
      {
        id: 'lev-1',
        level: 4,
        levelName: 'Правила системы и информационные потоки',
        targetNodeId: 'inflation_expectations',
        targetNodeName: 'Инфляционные ожидания населения',
        recommendation: 'Транспарентная коммуникационная политика и доверие к таргету инфляции разрывают петлю R1 в корне.',
        expectedImpact: 'Снижение необходимого пика ключевой ставки на 2.5-4.0 п.п.',
        riskOfCounterIntuitiveBehavior: 'Если доверие к регулятору подорвано, декларативные заявления могут вызвать панику и ажиотажный спрос.'
      },
      {
        id: 'lev-2',
        level: 5,
        levelName: 'Длина задержек в контурах обратной связи',
        targetNodeId: 'central_bank_rate',
        targetNodeName: 'Ключевая ставка ЦБ',
        recommendation: 'Опережающее (pre-emptive) мягкое изменение ставок на основе прогнозов, а не запаздывающей статистики прошлых периодов.',
        expectedImpact: 'Предотвращение макроэкономических колебаний типа "бум-спад".'
      }
    ],
    interventions: [
      {
        id: 'inv-rate-shock',
        nodeId: 'central_bank_rate',
        name: 'Экстренное повышение ключевой ставки на +40%',
        deltaPercent: 40,
        startStep: 10,
        duration: 30,
        type: 'step'
      }
    ],
    agentLogs: [
      {
        id: 'log-1',
        timestamp: '00:00.120',
        stage: 'ideation',
        message: 'Агент-инициатор определил ключевые системные переменные монетарной трансмиссии.',
        type: 'info'
      },
      {
        id: 'log-2',
        timestamp: '00:01.450',
        stage: 'discovery',
        message: 'Сформировано 9 причинно-следственных ребер с вычислением знаков полярности (+/-).',
        type: 'insight'
      },
      {
        id: 'log-3',
        timestamp: '00:02.100',
        stage: 'loop_analysis',
        message: 'Обнаружено 3 замкнутых контура: 2 петли усиления (R1, R2) и 1 петля балансирования (B1).',
        type: 'success'
      },
      {
        id: 'log-4',
        timestamp: '00:03.500',
        stage: 'simulation',
        message: 'Проведено численное интегрирование системы методом Эйлера при шоке монетарной ставки.',
        type: 'info'
      }
    ],
    status: 'completed',
    progressPercent: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'software-tech-debt-burnout',
    title: 'Системная динамика разработки ПО: Технический долг, выгорание и скорость релизов',
    domain: 'Инженерия программного обеспечения и менеджмент',
    problemStatement: 'Анализ порочного круга в продуктовых командах: давление сроков приводит к накоплению техдолга, увеличению багов, переработкам и снижению продуктивности.',
    researchQuestions: [
      'Почему стремление ускорить разработку через срез углов в долгосрочной перспективе замедляет команду в 3-5 раз?',
      'Как петли выгорания усиливают отток квалифицированных кадров?',
      'Каковы точки максимального рычага для перехода в устойчивый темп (sustainable pace)?'
    ],
    hypotheses: [
      {
        id: 'h-tech-1',
        statement: 'Игнорирование рефакторинга создает усиливающую петлю замедления R1, экспоненциально увеличивающую время починки багов.',
        confidence: 0.95,
        status: 'confirmed',
        evidence: 'Высокая кодовая энтропия и рост MTTR (Mean Time To Repair).'
      }
    ],
    nodes: [
      {
        id: 'time_pressure',
        name: 'Давление дедлайнов и бизнеса',
        type: 'auxiliary',
        category: 'Менеджмент',
        description: 'Требование выпускать фичи быстрее для опережения конкурентов.',
        initialValue: 70,
        unit: 'индекс',
        min: 0,
        max: 150,
        x: 200,
        y: 120,
        leverageScore: 7
      },
      {
        id: 'code_shortcuts',
        name: 'Срезание углов (отказ от тестов и рефакторинга)',
        type: 'flow',
        category: 'Процесс',
        description: 'Быстрые костыли, отказ от архитектурной проработки.',
        initialValue: 65,
        unit: '%',
        min: 0,
        max: 150,
        x: 480,
        y: 100,
        leverageScore: 8,
        isLeveragePoint: true
      },
      {
        id: 'tech_debt',
        name: 'Накопленный технический долг',
        type: 'stock',
        category: 'Архитектура',
        description: 'Объем устаревшего, связного и нетестированного кода.',
        initialValue: 50,
        unit: 'часов',
        min: 0,
        max: 150,
        x: 750,
        y: 180,
        leverageScore: 9,
        isLeveragePoint: true
      },
      {
        id: 'bug_frequency',
        name: 'Количество багов и инцидентов',
        type: 'flow',
        category: 'Качество',
        description: 'Число критических сбоев и ошибок в проде.',
        initialValue: 40,
        unit: 'баг/спринт',
        min: 0,
        max: 150,
        x: 720,
        y: 350,
        leverageScore: 6
      },
      {
        id: 'unplanned_work',
        name: 'Незапланированная работа (тушение пожаров)',
        type: 'auxiliary',
        category: 'Загрузка',
        description: 'Время разработчиков, уходящее на хотфиксы вместо новых задач.',
        initialValue: 45,
        unit: '% времени',
        min: 0,
        max: 150,
        x: 450,
        y: 380,
        leverageScore: 7
      },
      {
        id: 'developer_burnout',
        name: 'Усталость и выгорание инженеров',
        type: 'stock',
        category: 'Команда',
        description: 'Хронический стресс, переработки и падение мотивации.',
        initialValue: 35,
        unit: 'индекс',
        min: 0,
        max: 150,
        x: 200,
        y: 340,
        leverageScore: 8,
        isLeveragePoint: true
      },
      {
        id: 'delivery_velocity',
        name: 'Реальная скорость поставки ценности',
        type: 'flow',
        category: 'Производительность',
        description: 'Объем качественных бизнес-фич, доходящих до пользователей.',
        initialValue: 60,
        unit: 'Story Points',
        min: 0,
        max: 150,
        x: 460,
        y: 240,
        leverageScore: 6
      }
    ],
    edges: [
      {
        id: 'sw1',
        source: 'time_pressure',
        target: 'code_shortcuts',
        polarity: '+',
        strength: 'strong',
        weight: 0.9,
        delay: false,
        rationale: 'При нехватке времени инженеры жертвуют качеством ради срока.'
      },
      {
        id: 'sw2',
        source: 'code_shortcuts',
        target: 'tech_debt',
        polarity: '+',
        strength: 'strong',
        weight: 0.85,
        delay: true,
        delayDuration: '2-4 недели',
        rationale: 'Каждый костыль накапливается в базе кодовой базы.'
      },
      {
        id: 'sw3',
        source: 'tech_debt',
        target: 'bug_frequency',
        polarity: '+',
        strength: 'strong',
        weight: 0.8,
        delay: true,
        delayDuration: '1-2 месяца',
        rationale: 'Хрупкая архитектура приводит к поломке смежных модулей при любых изменениях.'
      },
      {
        id: 'sw4',
        source: 'bug_frequency',
        target: 'unplanned_work',
        polarity: '+',
        strength: 'strong',
        weight: 0.9,
        delay: false,
        rationale: 'Срочные аварии отвлекают команду от плановых задач.'
      },
      {
        id: 'sw5',
        source: 'unplanned_work',
        target: 'developer_burnout',
        polarity: '+',
        strength: 'strong',
        weight: 0.75,
        delay: true,
        delayDuration: '1-3 месяца',
        rationale: 'Постоянный режим аврала и ночные дежурства истощают нервную систему.'
      },
      {
        id: 'sw6',
        source: 'developer_burnout',
        target: 'delivery_velocity',
        polarity: '-',
        strength: 'strong',
        weight: 0.8,
        delay: false,
        rationale: 'Выгоревшие инженеры совершают больше ошибок и теряют концентрацию.'
      },
      {
        id: 'sw7',
        source: 'unplanned_work',
        target: 'delivery_velocity',
        polarity: '-',
        strength: 'strong',
        weight: 0.85,
        delay: false,
        rationale: 'Время, потраченное на починку, вычитается из разработки фич.'
      },
      {
        id: 'sw8',
        source: 'delivery_velocity',
        target: 'time_pressure',
        polarity: '-',
        strength: 'strong',
        weight: 0.8,
        delay: true,
        delayDuration: '1 квартал',
        rationale: 'Падение скорости релизов вызывает тревогу бизнеса и новое усиление давления.'
      },
      {
        id: 'sw9',
        source: 'code_shortcuts',
        target: 'delivery_velocity',
        polarity: '+',
        strength: 'moderate',
        weight: 0.5,
        delay: false,
        rationale: 'В краткосрочном моменте (на пару дней) срез углов создает иллюзию быстрого релиза.'
      }
    ],
    loops: [
      {
        id: 'R1',
        type: 'reinforcing',
        name: 'Порочный круг техдолга (The Tech Debt Trap)',
        nodeIds: ['time_pressure', 'code_shortcuts', 'tech_debt', 'bug_frequency', 'unplanned_work', 'delivery_velocity'],
        edgeIds: ['sw1', 'sw2', 'sw3', 'sw4', 'sw7', 'sw8'],
        description: 'Классический усиливающий порочный круг: давление порождает долг, долг плодит баги, баги съедают время, скорость падает, давление растет.',
        polarityReasoning: 'Две отрицательные связи (скорость → давление, баги → скорость) = Четное число (-) → Усиливающий цикл (R)'
      },
      {
        id: 'B1',
        type: 'balancing',
        name: 'Иллюзия быстрого фикса (Fixes that Fail)',
        nodeIds: ['time_pressure', 'code_shortcuts', 'delivery_velocity'],
        edgeIds: ['sw1', 'sw9', 'sw8'],
        description: 'Краткосрочный балансирующий контур: кажется, что костыль спасает релиз сегодня, скрывая долгосрочный коллапс.',
        polarityReasoning: 'Одна отрицательная связь → Балансирующий цикл (B)'
      }
    ],
    archetypes: [
      {
        id: 'arch-sw',
        name: 'Смещение бремени (Shifting the Burden)',
        description: 'Команда систематически выбирает симптоматическое решение (срезать углы и работать сверхурочно) вместо фундаментального (рефакторинг и культура качества).',
        involvedLoops: ['R1', 'B1'],
        warningSignals: [
          'Более 40% спринта уходит на баги и поддержку',
          'Фраза "перепишем нормально в следующем квартале"'
        ],
        strategicInterventions: [
          'Фиксация 20% инженерной квоты на рефакторинг в каждом спринте',
          'Введение жестких стандартов автоматизированного CI/CD тестирования'
        ]
      }
    ],
    leveragePoints: [
      {
        id: 'lev-sw-1',
        level: 3,
        levelName: 'Цели системы и мотивация',
        targetNodeId: 'code_shortcuts',
        targetNodeName: 'Срезание углов',
        recommendation: 'Оценивать команды не по объему сданного сырого кода, а по стабильности и безотказности в проде (DORA метрики: MTTR, Change Failure Rate).',
        expectedImpact: 'Снижение числа критических инцидентов на 70% за 6 месяцев.'
      }
    ],
    interventions: [],
    agentLogs: [],
    status: 'completed',
    progressPercent: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'climate-albedo-permafrost',
    title: 'Климатическая система Земли: Таяние криосферы, альбедо и выбросы метана',
    domain: 'Климатология и планетарные обратные связи',
    problemStatement: 'Анализ нелинейных переломных точек (tipping points) в климатической системе: как потепление океанов и таяние ледников запускают самоусиливающиеся петли.',
    researchQuestions: [
      'При какой температурной аномалии петля альбедо становится необратимой?',
      'Каков потенциал дегазации гидратов метана из вечной мерзлоты?'
    ],
    hypotheses: [
      {
        id: 'h-cl-1',
        statement: 'Снижение площади белого льда уменьшает планетарное альбедо, вызывая поглощение солнечной энергии океаном (петля R1).',
        confidence: 0.99,
        status: 'confirmed',
        evidence: 'Спутниковые измерения NASA и климатические модели CMIP6.'
      }
    ],
    nodes: [
      {
        id: 'global_temperature',
        name: 'Среднеглобальная температура',
        type: 'stock',
        category: 'Климат',
        description: 'Отклонение температуры поверхности Земли от доиндустриального уровня.',
        initialValue: 60,
        unit: '°C anomaly',
        min: 0,
        max: 150,
        x: 450,
        y: 120,
        leverageScore: 9,
        isLeveragePoint: true
      },
      {
        id: 'ice_sheet_area',
        name: 'Площадь арктического морского льда',
        type: 'stock',
        category: 'Криосфера',
        description: 'Массив снежного и ледового покрова полярных регионов.',
        initialValue: 60,
        unit: 'млн км²',
        min: 0,
        max: 150,
        x: 750,
        y: 120,
        leverageScore: 8
      },
      {
        id: 'planetary_albedo',
        name: 'Планетарное альбедо (отражающая способность)',
        type: 'auxiliary',
        category: 'Радиационный баланс',
        description: 'Доля солнечного излучения, отражаемого Землей обратно в космос.',
        initialValue: 65,
        unit: '%',
        min: 0,
        max: 150,
        x: 750,
        y: 320,
        leverageScore: 8
      },
      {
        id: 'ocean_heat_absorption',
        name: 'Поглощение тепла мировым океаном',
        type: 'flow',
        category: 'Океанология',
        description: 'Тепловой поток, аккумулируемый верхним слоем гидросферы.',
        initialValue: 55,
        unit: 'Зеттаджоули',
        min: 0,
        max: 150,
        x: 450,
        y: 340,
        leverageScore: 7
      },
      {
        id: 'permafrost_thaw',
        name: 'Деградация вечной мерзлоты',
        type: 'flow',
        category: 'Геоэкология',
        description: 'Скорость оттаивания богатых органикой мерзлотных грунтов Сибири и Канады.',
        initialValue: 40,
        unit: 'км²/год',
        min: 0,
        max: 150,
        x: 180,
        y: 200,
        leverageScore: 7
      },
      {
        id: 'greenhouse_gases',
        name: 'Концентрация парниковых газов (CO2 и CH4)',
        type: 'stock',
        category: 'Атмосфера',
        description: 'Содержание метана и диоксида углерода в тропосфере.',
        initialValue: 65,
        unit: 'ppm / ppb',
        min: 0,
        max: 150,
        x: 180,
        y: 360,
        leverageScore: 9,
        isLeveragePoint: true
      }
    ],
    edges: [
      {
        id: 'cl1',
        source: 'global_temperature',
        target: 'ice_sheet_area',
        polarity: '-',
        strength: 'strong',
        weight: 0.9,
        delay: true,
        delayDuration: 'Сезонные циклы',
        rationale: 'Рост температур ускоряет абляцию и летнее таяние ледяных щитов.'
      },
      {
        id: 'cl2',
        source: 'ice_sheet_area',
        target: 'planetary_albedo',
        polarity: '+',
        strength: 'strong',
        weight: 0.95,
        delay: false,
        rationale: 'Белый лед отражает до 85% света, а темная вода океана поглощает 90%.'
      },
      {
        id: 'cl3',
        source: 'planetary_albedo',
        target: 'ocean_heat_absorption',
        polarity: '-',
        strength: 'strong',
        weight: 0.9,
        delay: false,
        rationale: 'Падение альбедо увеличивает поглощение радиации темной водой.'
      },
      {
        id: 'cl4',
        source: 'ocean_heat_absorption',
        target: 'global_temperature',
        polarity: '+',
        strength: 'strong',
        weight: 0.85,
        delay: true,
        delayDuration: 'Тепловая инерция',
        rationale: 'Прогретый океан отдает тепло атмосфере, повышая среднюю температуру.'
      },
      {
        id: 'cl5',
        source: 'global_temperature',
        target: 'permafrost_thaw',
        polarity: '+',
        strength: 'strong',
        weight: 0.8,
        delay: true,
        delayDuration: 'Глубинное прогревание',
        rationale: 'Потепление атмосферы вызывает протаивание деятельного слоя мерзлоты.'
      },
      {
        id: 'cl6',
        source: 'permafrost_thaw',
        target: 'greenhouse_gases',
        polarity: '+',
        strength: 'strong',
        weight: 0.85,
        delay: false,
        rationale: 'Анаэробное разложение древней органики высвобождает метан (CH4).'
      },
      {
        id: 'cl7',
        source: 'greenhouse_gases',
        target: 'global_temperature',
        polarity: '+',
        strength: 'strong',
        weight: 0.9,
        delay: true,
        delayDuration: 'Парниковый радиационный форсинг',
        rationale: 'Задержка инфракрасного излучения молекулами CH4 и CO2.'
      }
    ],
    loops: [
      {
        id: 'R1',
        type: 'reinforcing',
        name: 'Ледо-альбедная самоусиливающаяся петля (Ice-Albedo Feedback)',
        nodeIds: ['global_temperature', 'ice_sheet_area', 'planetary_albedo', 'ocean_heat_absorption'],
        edgeIds: ['cl1', 'cl2', 'cl3', 'cl4'],
        description: 'Температура растет → Лед тает (-) → Альбедо падает (+) → Океан греется (-) → Температура растет (+).',
        polarityReasoning: '2 отрицательные связи (cl1, cl3) = Четное число (-) → Усиливающий цикл (R)'
      },
      {
        id: 'R2',
        type: 'reinforcing',
        name: 'Мерзлотно-метановая бомба замедленного действия',
        nodeIds: ['global_temperature', 'permafrost_thaw', 'greenhouse_gases'],
        edgeIds: ['cl5', 'cl6', 'cl7'],
        description: 'Потепление высвобождает метан, который увеличивает парниковый эффект и вызывает еще большее потепление.',
        polarityReasoning: '0 отрицательных связей → Усиливающий цикл (R)'
      }
    ],
    archetypes: [
      {
        id: 'arch-cl',
        name: 'Эскалация и точка невозврата (Tipping Point Runaway)',
        description: 'Сложение двух параллельных усиливающих петель (R1 + R2) создает риск фазового перехода планетарного масштаба.',
        involvedLoops: ['R1', 'R2'],
        warningSignals: ['Увеличение эмиссии метана в арктических озерах', 'Рекордно низкие площади льда в сентябре'],
        strategicInterventions: ['Срочная декарбонизация энергетики до пересечения порога +1.5°C']
      }
    ],
    leveragePoints: [
      {
        id: 'lev-cl-1',
        level: 2,
        levelName: 'Парадигма и мировоззрение',
        targetNodeId: 'greenhouse_gases',
        targetNodeName: 'Концентрация парниковых газов',
        recommendation: 'Переход к циркулярной безуглеродной экономике и глобальное сохранение природных поглотителей.',
        expectedImpact: 'Предотвращение разгона метанового цикла R2.'
      }
    ],
    interventions: [],
    agentLogs: [],
    status: 'completed',
    progressPercent: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
