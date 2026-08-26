import { CausalStudy } from '../types';

export const BENCHMARK_STUDIES: CausalStudy[] = [
  {
    id: 'diabetes-diabetic-retinopathy-cybernetics',
    title: '👁️ Сахарный диабет и диабетическая ретинопатия: Микроангиопатия, неоваскуляризация и потеря зрения',
    domain: 'Эндокринология, офтальмология, патофизиология микроциркуляции и клиническая кибернетика',
    problemStatement: 'Системное исследование каузальной спирали диабетической ретинопатии: как хроническая глюкозотоксичность и накопление AGEs разрушают перициты капилляров сетчатки, запускают каскад «ишемия → гиперэкспрессия VEGF → неоангиогенез и отек макулы», приводя к слепоте и вторичному психоповеденческому срыву гликемического контроля.',
    researchQuestions: [
      'Каковы триггеры перехода непролиферативной ретинопатии (NPDR) в пролиферативную (PDR) через ишемическую петлю R1?',
      'Какова роль системного психоповеденческого контура R2 («слепота → депрессия → декомпенсация диабета») в ускорении инвалидизации?',
      'Где находятся точки наивысшего системного воздействия (Meadows Leverage Points) между ИИ-скринингом сетчатки, анти-VEGF терапией и непрерывным мониторингом глюкозы (CGM)?'
    ],
    hypotheses: [
      {
        id: 'h-dr-1',
        statement: 'Капиллярная неперфузия сетчатки формирует доминирующий усиливающий контур R1 (Ишемия -> VEGF -> Аномальные хрупкие сосуды -> Геморрагии/Отек -> Усугубление ишемии), делающий прогрессирование ретинопатии лавинообразным при отсутствии анти-VEGF блокады.',
        confidence: 0.96,
        status: 'confirmed',
        evidence: 'Клинические данные протоколов DRCR.net (Protocol T/S), ангио-ОКТ и флуоресцентной ангиографии (ФАГ).'
      },
      {
        id: 'h-dr-2',
        statement: 'Падение центрального зрения и сужение полей зрения замыкает надсистемную петлю R2: депрессия и зрительная депривация нарушают способность пациента контролировать диету и дозировать инсулин, повышая HbA1c на 1.5-2.8%.',
        confidence: 0.92,
        status: 'confirmed',
        evidence: 'Психометрический анализ по шкале PAID (Problem Areas in Diabetes) и данные непрерывного мониторинга гликемии (CGM).'
      },
      {
        id: 'h-dr-3',
        statement: 'Внедрение популяционного ИИ-скрининга глазного дна (AI Fundus Screening) на базе поликлинического звена активирует балансирующий контур B1, снижая частоту слепоты от диабета на 68% за счет доклинического выявления ДМО.',
        confidence: 0.94,
        status: 'confirmed',
        evidence: 'Результаты популяционных когортных исследований с применением автономных deep learning систем ранней диагностики (IDx-DR, EyeArt).'
      }
    ],
    nodes: [
      {
        id: 'chronic_hyperglycemia_hba1c',
        name: 'Хроническая гипергликемия и гликированный HbA1c',
        type: 'stock',
        category: 'Метаболизм',
        description: 'Уровень глюкозы крови, гликированного гемоглобина (>7.5%) и накопление конечных продуктов гликирования (AGEs).',
        initialValue: 80,
        unit: '% / ммоль/л',
        min: 0,
        max: 150,
        x: 160,
        y: 100,
        leverageScore: 8,
        isLeveragePoint: true
      },
      {
        id: 'retinal_pericyte_loss',
        name: 'Гибель перицитов и повреждение эндотелия',
        type: 'stock',
        category: 'Микроангиопатия',
        description: 'Селективный апоптоз перицитов капилляров сетчатки, микроаневризмы и истончение сосудистой стенки.',
        initialValue: 70,
        unit: '% деструкции',
        min: 0,
        max: 100,
        x: 440,
        y: 80,
        leverageScore: 7
      },
      {
        id: 'retinal_ischemia_hypoxia',
        name: 'Капиллярная неперфузия и ишемия сетчатки',
        type: 'stock',
        category: 'Гемодинамика глаза',
        description: 'Зоны аваскулярности, капиллярной окклюзии и локальной гипоксии нейросенсорной сетчатки (ватные очаги).',
        initialValue: 65,
        unit: '% площади ишемии',
        min: 0,
        max: 100,
        x: 740,
        y: 110,
        leverageScore: 8
      },
      {
        id: 'vegf_overexpression',
        name: 'Гиперэкспрессия VEGF и HIF-1α',
        type: 'flow',
        category: 'Молекулярные медиаторы',
        description: 'Секреция фактора роста эндотелия сосудов в ответ на гипоксию, резко повышающая проницаемость капилляров.',
        initialValue: 75,
        unit: 'пг/мл в стекловидном теле',
        min: 0,
        max: 150,
        x: 820,
        y: 260,
        leverageScore: 9,
        isLeveragePoint: true
      },
      {
        id: 'macular_edema_neovascularization',
        name: 'Диабетический макулярный отек (ДМО) и неоваскуляризация',
        type: 'stock',
        category: 'Офтальмопатология',
        description: 'Пропотевание жидкой части крови в макулу (утолщение сетчатки >300 мкм), интраретинальные кровоизлияния и рост ломких сосудов.',
        initialValue: 60,
        unit: 'мкм отека / стадия PDR',
        min: 0,
        max: 100,
        x: 640,
        y: 390,
        leverageScore: 8
      },
      {
        id: 'visual_acuity_impairment',
        name: 'Снижение остроты зрения и поля зрения',
        type: 'flow',
        category: 'Функциональный дефицит',
        description: 'Утрата центрального предметного зрения, метаморфопсии, выпадение полей зрения (ETDRS score, logMAR).',
        initialValue: 55,
        unit: '% потери зрения',
        min: 0,
        max: 100,
        x: 380,
        y: 410,
        leverageScore: 7
      },
      {
        id: 'self_care_breakdown_depression',
        name: 'Депрессия, гиподинамия и срыв самоконтроля диабета',
        type: 'stock',
        category: 'Психосоматика и поведение',
        description: 'Психоэмоциональный дистресс, невозможность читать показания глюкометра, пропуск инъекций инсулина и диетические срывы.',
        initialValue: 65,
        unit: 'баллы PAID / депрессии',
        min: 0,
        max: 100,
        x: 140,
        y: 340,
        leverageScore: 8,
        isLeveragePoint: true
      },
      {
        id: 'ai_tele_fundus_screening',
        name: 'ИИ-скрининг глазного дна и телеофтальмология (AI Screening & OCT)',
        type: 'auxiliary',
        category: 'Диагностика',
        description: 'Охват диабетиков автоматизированным скринингом фундус-камерами с нейросетевым анализом микроаневризм и отека на бессимптомной стадии.',
        initialValue: 30,
        unit: '% охвата популяции',
        min: 0,
        max: 100,
        x: 500,
        y: 230,
        leverageScore: 9,
        isLeveragePoint: true
      },
      {
        id: 'anti_vegf_intravitreal_therapy',
        name: 'Интравитреальная анти-VEGF терапия и лазеркоагуляция',
        type: 'flow',
        category: 'Таргетная терапия',
        description: 'Интравитреальные инъекции ингибиторов ангиогенеза (афлиберцепт, ранибизумаб, фарицимаб) и панретинальная лазеркоагуляция (PRP).',
        initialValue: 35,
        unit: '% обеспеченности',
        min: 0,
        max: 100,
        x: 710,
        y: 230,
        leverageScore: 9,
        isLeveragePoint: true
      },
      {
        id: 'continuous_glucose_monitoring',
        name: 'Непрерывный мониторинг глюкозы (CGM) и терапия GLP-1/SGLT2i',
        type: 'auxiliary',
        category: 'Терапия СД',
        description: 'Удержание времени в целевом диапазоне (Time in Range, TIR > 70%) и прием органопротективных сахароснижающих препаратов.',
        initialValue: 40,
        unit: '% TIR (Time in Range)',
        min: 0,
        max: 100,
        x: 290,
        y: 220,
        leverageScore: 9,
        isLeveragePoint: true
      }
    ],
    edges: [
      {
        id: 'dr-e1',
        source: 'chronic_hyperglycemia_hba1c',
        target: 'retinal_pericyte_loss',
        polarity: '+',
        strength: 'strong',
        weight: 0.95,
        delay: true,
        delayDuration: '6-24 месяцев',
        rationale: 'Глюкозотоксичность, окислительный стресс и полиоловый путь метаболизма глюкозы избирательно уничтожают перициты капилляров сетчатки.'
      },
      {
        id: 'dr-e2',
        source: 'retinal_pericyte_loss',
        target: 'retinal_ischemia_hypoxia',
        polarity: '+',
        strength: 'strong',
        weight: 0.9,
        delay: true,
        delayDuration: '3-12 месяцев',
        rationale: 'Потеря перицитов ведет к микроаневризмам, тромбозам и капиллярной неперфузии (зонной атрофии микроциркуляторного русла).'
      },
      {
        id: 'dr-e3',
        source: 'retinal_ischemia_hypoxia',
        target: 'vegf_overexpression',
        polarity: '+',
        strength: 'strong',
        weight: 0.94,
        delay: false,
        rationale: 'Тканевая гипоксия активирует фактор HIF-1α, индуцирующий взрывной синтез проангиогенного медиатора VEGF клетками Мюллера и пигментным эпителием.'
      },
      {
        id: 'dr-e4',
        source: 'vegf_overexpression',
        target: 'macular_edema_neovascularization',
        polarity: '+',
        strength: 'strong',
        weight: 0.92,
        delay: true,
        delayDuration: '2-6 недель',
        rationale: 'VEGF повышает проницаемость капилляров в 50 000 раз, вызывая пропотевание плазмы (диабетический макулярный отек) и рост неполноценных сосудов.'
      },
      {
        id: 'dr-e5',
        source: 'macular_edema_neovascularization',
        target: 'retinal_ischemia_hypoxia',
        polarity: '+',
        strength: 'moderate',
        weight: 0.78,
        delay: true,
        delayDuration: '1-3 месяца',
        rationale: 'Массивный отек и фиброваскулярные тяжи сдавливают микрососуды сетчатки, усугубляя локальную ишемию (внутренний порочный круг глаза).'
      },
      {
        id: 'dr-e6',
        source: 'macular_edema_neovascularization',
        target: 'visual_acuity_impairment',
        polarity: '+',
        strength: 'strong',
        weight: 0.96,
        delay: false,
        rationale: 'Отек фовеальной зоны и преретинальные кровоизлияния (гемофтальм) приводят к резкому падению остроты зрения и искажению линий.'
      },
      {
        id: 'dr-e7',
        source: 'visual_acuity_impairment',
        target: 'self_care_breakdown_depression',
        polarity: '+',
        strength: 'strong',
        weight: 0.88,
        delay: true,
        delayDuration: '1-3 месяца',
        rationale: 'Угроза слепоты провоцирует тяжелый депрессивный синдром, лишает мобильности и делает невозможным самостоятельный контроль гликемии.'
      },
      {
        id: 'dr-e8',
        source: 'self_care_breakdown_depression',
        target: 'chronic_hyperglycemia_hba1c',
        polarity: '+',
        strength: 'strong',
        weight: 0.9,
        delay: false,
        rationale: 'Ошибки в дозировках инсулина, гиподинамия, стрессовая гиперкортизолемия и диетические срывы вызывают декомпенсацию диабета.'
      },
      {
        id: 'dr-e9',
        source: 'ai_tele_fundus_screening',
        target: 'anti_vegf_intravitreal_therapy',
        polarity: '+',
        strength: 'strong',
        weight: 0.88,
        delay: false,
        rationale: 'Нейросетевое обнаружение микроаневризм и утолщения сетчатки направляет пациента на таргетные интравитреальные инъекции до потери зрения.'
      },
      {
        id: 'dr-e10',
        source: 'anti_vegf_intravitreal_therapy',
        target: 'vegf_overexpression',
        polarity: '-',
        strength: 'strong',
        weight: 0.95,
        delay: false,
        rationale: 'Молекулы афлиберцепта и фарицимаба нейтрализуют свободный VEGF-A/B и Ang-2, блокируя рецепторы эндотелиоцитов.'
      },
      {
        id: 'dr-e11',
        source: 'anti_vegf_intravitreal_therapy',
        target: 'macular_edema_neovascularization',
        polarity: '-',
        strength: 'strong',
        weight: 0.9,
        delay: true,
        delayDuration: '2-4 недели',
        rationale: 'Восстановление гематоретинального барьера приводит к резорбции жидкости в макуле и запустеванию патологических сосудов.'
      },
      {
        id: 'dr-e12',
        source: 'continuous_glucose_monitoring',
        target: 'chronic_hyperglycemia_hba1c',
        polarity: '-',
        strength: 'strong',
        weight: 0.92,
        delay: false,
        rationale: 'Отображение гликемических трендов в реальном времени позволяет удерживать сахар крови в безопасном коридоре (TIR > 70%).'
      }
    ],
    loops: [
      {
        id: 'R1',
        type: 'reinforcing',
        name: 'Офтальмологическая спираль неоангиогенеза (The Ischemic-VEGF Escalation Trap)',
        nodeIds: ['retinal_ischemia_hypoxia', 'vegf_overexpression', 'macular_edema_neovascularization'],
        edgeIds: ['dr-e3', 'dr-e4', 'dr-e5'],
        description: 'Усиливающий внутриорганный порочный круг: гипоксия сетчатки -> гиперсекреция VEGF -> ломкие аномальные сосуды и отек макулы -> сдавление микроциркуляции -> еще большая ишемия.',
        polarityReasoning: '0 отрицательных связей → Усиливающий цикл (R)'
      },
      {
        id: 'R2',
        type: 'reinforcing',
        name: 'Надсистемный психоповеденческий контур слепоты и декомпенсации диабета (Visual Loss - Self-Care Breakdown Loop)',
        nodeIds: ['chronic_hyperglycemia_hba1c', 'retinal_pericyte_loss', 'retinal_ischemia_hypoxia', 'vegf_overexpression', 'macular_edema_neovascularization', 'visual_acuity_impairment', 'self_care_breakdown_depression'],
        edgeIds: ['dr-e1', 'dr-e2', 'dr-e3', 'dr-e4', 'dr-e6', 'dr-e7', 'dr-e8'],
        description: 'Глобальный системный коллапс: гипергликемия поражает микрососуды глаза -> падение зрения -> депрессия и неспособность управлять диабетом -> катастрофический рост сахара крови -> ускоренная слепота.',
        polarityReasoning: '0 отрицательных связей → Усиливающий цикл (R)'
      },
      {
        id: 'B1',
        type: 'balancing',
        name: 'Контур раннего скрининга и анти-VEGF супрессии (AI Screening & Anti-VEGF Stewardship)',
        nodeIds: ['ai_tele_fundus_screening', 'anti_vegf_intravitreal_therapy', 'vegf_overexpression', 'macular_edema_neovascularization'],
        edgeIds: ['dr-e9', 'dr-e10', 'dr-e4'],
        description: 'Балансирующая терапевтическая петля: популяционный скрининг выявляет ранние маркеры -> своевременный курс анти-VEGF нейтрализует фактор роста -> регресс отека сетчатки.',
        polarityReasoning: '1 отрицательная связь (dr-e10) → Балансирующий цикл (B)'
      },
      {
        id: 'B2',
        type: 'balancing',
        name: 'Контур гликемической биокибернетической регуляции (Closed-Loop Glucose Control)',
        nodeIds: ['continuous_glucose_monitoring', 'chronic_hyperglycemia_hba1c'],
        edgeIds: ['dr-e12'],
        description: 'Балансирующая петля метаболического контроля: непрерывный мониторинг глюкозы и современная терапия устраняют первопричину поражения микрососудов.',
        polarityReasoning: '1 отрицательная связь (dr-e12) → Балансирующий цикл (B)'
      }
    ],
    archetypes: [
      {
        id: 'arch-dr-1',
        name: 'Смещение бремени на позднюю паллиативную хирургию (Shifting the Burden / Heroic Surgery Trap)',
        description: 'Система здравоохранения расходует до 80% специализированного бюджета на высокозатратные поздние хирургические операции (витрэктомия при гемофтальме и тракционной отслойке сетчатки), вместо инвестиций в превентивный ИИ-скрининг глазного дна и датчики непрерывного мониторинга глюкозы (CGM), предотвращающие инвалидизацию.',
        involvedLoops: ['R1', 'R2'],
        warningSignals: [
          'Более 60% пациентов впервые попадают к ретинологу уже на стадии пролиферативной ретинопатии (PDR) или выраженного ДМО',
          'Менее 25% пациентов с СД 2 типа проходят ежегодный осмотр глазного дна с расширением зрачка',
          'Высокая частота повторных витрэктомий и инвалидности по зрению у лиц трудоспособного возраста'
        ],
        strategicInterventions: [
          'Оснащение эндокринологических кабинетов автономными немидриатическими фундус-камерами с алгоритмами машинного обучения',
          'Включение анти-VEGF препаратов первой линии (афлиберцепт, ранибизумаб, фарицимаб) в программы государственного льготного обеспечения на ранних стадиях ДМО',
          'Интеграция непрерывного мониторинга глюкозы (CGM) в протоколы ведения пациентов с высокими рисками микроангиопатий'
        ]
      }
    ],
    leveragePoints: [
      {
        id: 'lev-dr-1',
        level: 6,
        levelName: 'Информационные потоки: Автономный популяционный ИИ-скрининг',
        targetNodeId: 'ai_tele_fundus_screening',
        targetNodeName: 'ИИ-скрининг глазного дна и телеофтальмология',
        recommendation: 'Обязательный скрининг фундус-камерой с ИИ-верификацией непосредственно во время визита к терапевту или эндокринологу (без необходимости отдельного визита к офтальмологу).',
        expectedImpact: 'Рост выявления ранних стадий ретинопатии с 30% до 88%, сокращение времени до начала терапии с 14 месяцев до 2 недель.',
        riskOfCounterIntuitiveBehavior: 'Возможная перегрузка офтальмологических стационаров ложноположительными направлениями при низкой специфичности алгоритмов.'
      },
      {
        id: 'lev-dr-2',
        level: 4,
        levelName: 'Правила системы: Протокол предиктивной анти-VEGF терапии',
        targetNodeId: 'anti_vegf_intravitreal_therapy',
        targetNodeName: 'Интравитреальная анти-VEGF терапия',
        recommendation: 'Старт анти-VEGF терапии по протоколам Treat-and-Extend при первых биомаркерах ДМО на ОКТ (субретинальная жидкость >250 мкм) до снижения остроты зрения.',
        expectedImpact: 'Сохранение 100% зрительных функций у 85% пациентов на протяжении 5 лет наблюдения.'
      },
      {
        id: 'lev-dr-3',
        level: 3,
        levelName: 'Цели системы: Переход к целевому показателю Time in Range (TIR > 70%)',
        targetNodeId: 'continuous_glucose_monitoring',
        targetNodeName: 'Непрерывный мониторинг глюкозы (CGM)',
        recommendation: 'Замена изолированного контроля HbA1c на непрерывный контроль вариабельности гликемии (TIR), нивелирующий сосудистые пики глюкозотоксичности.',
        expectedImpact: 'Снижение риска прогрессирования микроангиопатий на 42% согласно данным DCCT/EDIC.'
      }
    ],
    interventions: [
      {
        id: 'inv-dr-ai-screening',
        nodeId: 'ai_tele_fundus_screening',
        name: 'Популяционный ИИ-скрининг глазного дна (+60% охват)',
        deltaPercent: 60,
        startStep: 8,
        duration: 45,
        type: 'step'
      },
      {
        id: 'inv-dr-anti-vegf',
        nodeId: 'anti_vegf_intravitreal_therapy',
        name: 'Льготный доступ к анти-VEGF терапии (+50%)',
        deltaPercent: 50,
        startStep: 12,
        duration: 40,
        type: 'step'
      },
      {
        id: 'inv-dr-cgm',
        nodeId: 'continuous_glucose_monitoring',
        name: 'Обеспечение датчиками CGM и нормализация гликемии (+55% TIR)',
        deltaPercent: 55,
        startStep: 15,
        duration: 35,
        type: 'step'
      }
    ],
    scientificPaper: {
      title: 'Системно-динамическая кибернетика диабетической ретинопатии: математическое моделирование каскада микроангиопатии, неоангиогенеза и психоповеденческого контура декомпенсации',
      abstract: 'Диабетическая ретинопатия (ДР) остается ведущей причиной предотвратимой слепоты у трудоспособного населения во всем мире. В настоящем исследовании разработана системно-динамическая модель причинно-следственных связей (Causal Loop Diagram, CLD) патогенеза ДР, объединяющая молекулярные каскады (окислительный стресс, гибель перицитов, гиперэкспрессия VEGF-A/B и Ang-2), сосудистые изменения (ишемия, ДМО, неоваскуляризация) и надсистемные психоповеденческие петли обратной связи (депрессия, депривация самоконтроля). Выявлено существование двух критических усиливающих контуров (R1 — офтальмологическая ишемическая спираль; R2 — системный поведенческий контур срыва гликемического контроля). Доказано, что изолированная хирургическая помощь на поздних стадиях реализует системный архетип «смещения бремени», тогда как ранний ИИ-скрининг и анти-VEGF терапия выступают точками максимального системного рычага по Донелле Медоуз.',
      introduction: 'Сахарный диабет 1 и 2 типов ассоциирован с прогрессирующим поражением микроциркуляторного русла. Диабетическая ретинопатия развивается у более чем 35% пациентов с диабетом и в 10% случаев приводит к тяжелой инвалидизирующей потере зрения. Традиционные клинические модели рассматривают патогенез ДР линейно («сахар -> сосуды -> слепота»), игнорируя циклические нелинейные связи и влияние психологического дистресса потери зрения на биохимический контроль основного заболевания.',
      systemBoundaries: 'Границы модели охватывают метаболические маркеры (HbA1c, AGEs, вариабельность гликемии TIR), состояние микроциркуляторного русла сетчатки (плотность перицитов, капиллярная перфузия, зоны ишемии), концентрацию ангиогенных факторов во внутриглазной жидкости (VEGF, HIF-1α), морфометрические параметры (толщина центральной зоны сетчатки по ОКТ, стадия ретинопатии по классификации ETDRS), функциональные зрительные исходы, а также уровень комплаентности и психоэмоционального статуса пациента (шкалы PAID, PHQ-9).',
      causalStructureAnalysis: 'Построен граф причинно-следственных связей, включающий 10 узловых переменных и 12 каузальных ребер с учетом физиологических временных задержек (задержка манифестации потери перицитов при хронической гипергликемии — от 6 до 24 месяцев; развитие неоваскуляризации в ответ на гипоксию — от 2 до 6 недель).',
      feedbackLoopDynamics: 'В структуре идентифицированы: 1) Внутриглазной усиливающий контур R1 (Ишемия -> VEGF -> Аномальный ангиогенез и пропотевание плазмы -> Компрессия капилляров -> Рост ишемии); 2) Надсистемный усиливающий контур R2 (Потеря зрения -> Утрата мобильности и депрессия -> Нарушение диеты и режима инсулинотерапии -> Гипергликемия -> Ускорение поражения сосудов); 3) Балансирующий контур B1 превентивной анти-VEGF фармакотерапии; 4) Балансирующий контур B2 непрерывного контроля гликемии (CGM).',
      simulationResults: 'Численное моделирование траекторий методом Эйлера показало, что без внешнего вмешательства система за 36 расчетных шагов переходит в состояние терминальной пролиферативной ретинопатии и глубокой декомпенсации диабета. Комплексная интервенция «ИИ-скрининг (+60%) + ранняя анти-VEGF терапия (+50%) + CGM (+55%)» подавляет петлю R1 на 78%, предотвращает макулярный отек и стабилизирует остроту зрения в 92% симулированных когорт.',
      policyRecommendations: 'Рекомендуется: 1. Институционализировать повсеместное внедрение немидриатических фундус-камер с автоматизированным ИИ-анализом снимков в первичном звене здравоохранения; 2. Пересмотреть клинические рекомендации с целью назначения анти-VEGF препаратов на стадии раннего вовлечения центра макулы до необратимого снижения остроты зрения; 3. Обеспечить пациентов с диабетической ретинопатией системами непрерывного мониторинга глюкозы (CGM) для разрыва петли R2.',
      conclusion: 'Системно-кибернетический анализ диабетической ретинопатии доказывает, что борьба со слепотой требует синергии метаболического контроля и ранней превентивной офтальмологической диагностики. Внедрение ИИ-скрининга разрывает порочный круг инвалидизации и снижает суммарные социально-экономические затраты здравоохранения на 54%.',
      references: [
        { title: 'Early Treatment Diabetic Retinopathy Study (ETDRS) design and baseline characteristics', authors: 'ETDRS Research Group (Ophthalmology)', year: '1991', relevance: 'Классификация стадий диабетической ретинопатии и стандарты оценки остроты зрения.' },
        { title: 'Aflibercept, Bevacizumab, or Ranibizumab for Diabetic Macular Edema (Protocol T)', authors: 'Diabetic Retinopathy Clinical Research Network (NEJM)', year: '2015', relevance: 'Рандомизированное сравнительное исследование эффективности анти-VEGF терапии при ДМО.' },
        { title: 'The Effect of Intensive Treatment of Diabetes on the Development and Progression of Long-Term Complications (DCCT/EDIC)', authors: 'The Diabetes Control and Complications Trial Research Group (NEJM)', year: '1993', relevance: 'Доказательная база роли жесткого гликемического контроля в замедлении микроангиопатий.' },
        { title: 'Pivotal trial of an autonomous AI-based diagnostic system for detection of diabetic retinopathy in primary care', authors: 'Abràmoff M.D., Lavin P.T., Birch M. et al. (NPJ Digital Medicine)', year: '2018', relevance: 'Клиническая валидация ИИ-систем автономного скрининга глазного дна.' },
        { title: 'Thinking in Systems: A Primer', authors: 'Donella H. Meadows', year: '2008', relevance: 'Методология точек системного рычага и анализа циклов обратной связи.' }
      ]
    },
    agentLogs: [
      {
        id: 'dr-log-1',
        timestamp: '00:00.120',
        stage: 'ideation',
        message: 'Агент формализовал системную модель диабетической ретинопатии: метаболический блок, микроциркуляторный блок, молекулярный блок VEGF, функциональные исходы и психоповеденческий контур.',
        type: 'info'
      },
      {
        id: 'dr-log-2',
        timestamp: '00:01.250',
        stage: 'discovery',
        message: 'Сформировано 12 направленных каузальных связей. Выявлен скрытый физиологический лаг между глюкозотоксичностью и гибелью перицитов (6-24 мес.), а также быстрый ангиогенный ответ на гипоксию (2-6 недель).',
        type: 'insight'
      },
      {
        id: 'dr-log-3',
        timestamp: '00:02.400',
        stage: 'loop_analysis',
        message: 'Обнаружено 2 усиливающих порочных круга: локальный офтальмологический контур R1 (Ишемия-VEGF) и надсистемный психоповеденческий контур R2 (Срыв самоконтроля диабета).',
        type: 'success'
      },
      {
        id: 'dr-log-4',
        timestamp: '00:03.650',
        stage: 'writeup',
        message: 'Сформирован академический отчет с доказательной базой протоколов ETDRS, DCCT, DRCR.net и точками рычага по Донелле Медоуз.',
        type: 'success'
      }
    ],
    status: 'completed',
    progressPercent: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'healthcare-er-crowding-burnout',
    title: '🏥 Здравоохранение: Системный кризис очередей, дефицит врачей и повторные госпитализации',
    domain: 'Медицинский менеджмент, клиническая кибернетика и общественное здоровье',
    problemStatement: 'Исследование порочных кругов в первичном звене и стационарах: дефицит времени на прием ведет к диагностическим ошибкам, хронизации патологий, лавинообразным повторным госпитализациям, выгоранию врачей и массовым увольнениям.',
    researchQuestions: [
      'Каковы механизмы перехода больничной системы в режим хронической перегрузки (ED Crowding)?',
      'Почему сокращение норматива времени на прием пациента в поликлинике увеличивает совокупные затраты системы ОМС на 40-60%?',
      'Где находятся точки наивысшего рычага (Meadows Leverage Points) для разрыва спирали выгорания медицинских кадров?'
    ],
    hypotheses: [
      {
        id: 'h-med-1',
        statement: 'Сокращение времени первичного контакта врача с пациентом усиливает петлю R1 повторных обращений через рост ятрогений и неполноценную диагностику.',
        confidence: 0.94,
        status: 'confirmed',
        evidence: 'Ретроспективный анализ 30-дневных регоспитализаций и времени сбора анамнеза.'
      },
      {
        id: 'h-med-2',
        statement: 'Хронический овертайм врачей формирует петлю истощения кадров R2, снижая общую пропускную способность клиники быстрее, чем растут затраты на сверхурочные.',
        confidence: 0.91,
        status: 'confirmed',
        evidence: 'Корреляция между показателями Maslach Burnout Inventory и коэффициентом текучести медперсонала.'
      }
    ],
    nodes: [
      {
        id: 'patient_intake_queue',
        name: 'Очередь и входящий поток пациентов',
        type: 'stock',
        category: 'Пациентопоток',
        description: 'Количество пациентов, ожидающих планового и экстренного приема в амбулатории и стационаре.',
        initialValue: 75,
        unit: 'чел/день',
        min: 0,
        max: 200,
        x: 180,
        y: 120,
        leverageScore: 7
      },
      {
        id: 'physician_time_per_patient',
        name: 'Клиническое время на 1 пациента',
        type: 'auxiliary',
        category: 'Качество помощи',
        description: 'Чистое время, уделяемое сбору анамнеза, осмотру и разъяснению схемы лечения (без бюрократии).',
        initialValue: 35,
        unit: 'минут',
        min: 5,
        max: 60,
        x: 460,
        y: 100,
        leverageScore: 9,
        isLeveragePoint: true
      },
      {
        id: 'diagnostic_treatment_errors',
        name: 'Частота диагностических ошибок и недолечивания',
        type: 'flow',
        category: 'Клинические исходы',
        description: 'Процент нераспознанных осложнений, неверно подобранной фармакотерапии и ранней выписки.',
        initialValue: 60,
        unit: '% случаев',
        min: 0,
        max: 100,
        x: 740,
        y: 140,
        leverageScore: 8
      },
      {
        id: 'chronic_complications_pool',
        name: 'Пул декомпенсированных хронических больных',
        type: 'stock',
        category: 'Бремя болезней',
        description: 'Пациенты с обострениями (ХОБЛ, ХСН, СД 2 типа), требующие неотложной специализированной помощи.',
        initialValue: 65,
        unit: 'тыс. чел.',
        min: 0,
        max: 150,
        x: 760,
        y: 320,
        leverageScore: 8
      },
      {
        id: 'readmission_rate',
        name: 'Частота повторных госпитализаций (30-day Readmission)',
        type: 'flow',
        category: 'Эффективность',
        description: 'Доля пациентов, возвращающихся в стационар в течение 30 дней после выписки.',
        initialValue: 55,
        unit: '%',
        min: 0,
        max: 100,
        x: 480,
        y: 350,
        leverageScore: 7
      },
      {
        id: 'physician_burnout',
        name: 'Выгорание и деперсонализация врачей',
        type: 'stock',
        category: 'Кадровый потенциал',
        description: 'Уровень психоэмоционального истощения врачей и среднего медперсонала (MBI scale).',
        initialValue: 70,
        unit: 'баллы MBI',
        min: 0,
        max: 100,
        x: 180,
        y: 320,
        leverageScore: 9,
        isLeveragePoint: true
      },
      {
        id: 'staff_turnover_deficit',
        name: 'Дефицит кадров и увольнения врачей',
        type: 'flow',
        category: 'Кадры',
        description: 'Темп оттока специалистов из государственного здравоохранения в частный сектор или уход из профессии.',
        initialValue: 50,
        unit: '% вакансий',
        min: 0,
        max: 100,
        x: 180,
        y: 220,
        leverageScore: 8
      },
      {
        id: 'administrative_burden',
        name: 'Бюрократическая нагрузка (бумажная отчетность)',
        type: 'auxiliary',
        category: 'Регуляторика',
        description: 'Доля рабочего времени, расходуемая на заполнение МИС, журналов и справок вместо контакта с больным.',
        initialValue: 65,
        unit: '% времени',
        min: 0,
        max: 100,
        x: 460,
        y: 220,
        leverageScore: 9,
        isLeveragePoint: true
      }
    ],
    edges: [
      {
        id: 'med-e1',
        source: 'patient_intake_queue',
        target: 'physician_time_per_patient',
        polarity: '-',
        strength: 'strong',
        weight: 0.9,
        delay: false,
        rationale: 'При росте очереди врачи вынуждены форсировать темп приема для соблюдения расписания.'
      },
      {
        id: 'med-e2',
        source: 'administrative_burden',
        target: 'physician_time_per_patient',
        polarity: '-',
        strength: 'strong',
        weight: 0.85,
        delay: false,
        rationale: 'Бюрократическое протоколирование отнимает драгоценные минуты клинического осмотра.'
      },
      {
        id: 'med-e3',
        source: 'physician_time_per_patient',
        target: 'diagnostic_treatment_errors',
        polarity: '-',
        strength: 'strong',
        weight: 0.92,
        delay: false,
        rationale: 'Спешка снижает глубину сбора анамнеза и ведет к пропуску ранних признаков патологии.'
      },
      {
        id: 'med-e4',
        source: 'diagnostic_treatment_errors',
        target: 'chronic_complications_pool',
        polarity: '+',
        strength: 'strong',
        weight: 0.88,
        delay: true,
        delayDuration: '2-8 недель',
        rationale: 'Недолеченные заболевания и полипрагмазия переходят в тяжелую декомпенсацию.'
      },
      {
        id: 'med-e5',
        source: 'chronic_complications_pool',
        target: 'readmission_rate',
        polarity: '+',
        strength: 'strong',
        weight: 0.9,
        delay: false,
        rationale: 'Обострения хронических болезней требуют срочной повторной госпитализации скорой помощью.'
      },
      {
        id: 'med-e6',
        source: 'readmission_rate',
        target: 'patient_intake_queue',
        polarity: '+',
        strength: 'strong',
        weight: 0.85,
        delay: true,
        delayDuration: '1-3 недели',
        rationale: 'Повторно поступающие больные повторно перегружают приемные покои и участковых врачей.'
      },
      {
        id: 'med-e7',
        source: 'patient_intake_queue',
        target: 'physician_burnout',
        polarity: '+',
        strength: 'strong',
        weight: 0.8,
        delay: true,
        delayDuration: '1-3 месяца',
        rationale: 'Непрерывный поток тяжелых пациентов и шумные коридоры вызывают хронический дистресс.'
      },
      {
        id: 'med-e8',
        source: 'physician_burnout',
        target: 'staff_turnover_deficit',
        polarity: '+',
        strength: 'strong',
        weight: 0.85,
        delay: true,
        delayDuration: '3-6 месяцев',
        rationale: 'Эмоционально истощенные врачи увольняются или переходят на ненапряженную работу.'
      },
      {
        id: 'med-e9',
        source: 'staff_turnover_deficit',
        target: 'physician_time_per_patient',
        polarity: '-',
        strength: 'strong',
        weight: 0.9,
        delay: false,
        rationale: 'При нехватке ставок нагрузка перераспределяется на оставшихся врачей, еще сильнее сокращая время на 1 больного.'
      },
      {
        id: 'med-e10',
        source: 'physician_burnout',
        target: 'diagnostic_treatment_errors',
        polarity: '+',
        strength: 'moderate',
        weight: 0.75,
        delay: false,
        rationale: 'Когнитивное истощение и потеря эмпатии ведут к невнимательности и ошибкам в дозировках.'
      }
    ],
    loops: [
      {
        id: 'R1',
        type: 'reinforcing',
        name: 'Спираль ятрогении и повторных госпитализаций (The Readmission Trap)',
        nodeIds: ['patient_intake_queue', 'physician_time_per_patient', 'diagnostic_treatment_errors', 'chronic_complications_pool', 'readmission_rate'],
        edgeIds: ['med-e1', 'med-e3', 'med-e4', 'med-e5', 'med-e6'],
        description: 'Усиливающий порочный круг: наплыв больных снижает время приема -> растут ошибки и недолечивание -> копятся осложнения -> растет регоспитализация -> очередь растет.',
        polarityReasoning: '2 отрицательные связи (e1, e3) = Четное число (-) → Усиливающий цикл (R)'
      },
      {
        id: 'R2',
        type: 'reinforcing',
        name: 'Спираль кадрового истощения и оттока (Physician Burnout-Deficit Loop)',
        nodeIds: ['patient_intake_queue', 'physician_burnout', 'staff_turnover_deficit', 'physician_time_per_patient', 'diagnostic_treatment_errors', 'chronic_complications_pool', 'readmission_rate'],
        edgeIds: ['med-e7', 'med-e8', 'med-e9', 'med-e3', 'med-e4', 'med-e5', 'med-e6'],
        description: 'Перегрузка вызывает выгорание -> врачи увольняются -> дефицит кадров сжимает время приема еще сильнее -> система входит в штопор.',
        polarityReasoning: '2 отрицательные связи (e9, e3) = Четное число (-) → Усиливающий цикл (R)'
      },
      {
        id: 'R3',
        type: 'reinforcing',
        name: 'Контур когнитивной ошибки истощения (Burnout-Error Feedback)',
        nodeIds: ['patient_intake_queue', 'physician_burnout', 'diagnostic_treatment_errors', 'chronic_complications_pool', 'readmission_rate'],
        edgeIds: ['med-e7', 'med-e10', 'med-e4', 'med-e5', 'med-e6'],
        description: 'Прямое влияние утомления врача на клинические ошибки без учета распределения ставок.',
        polarityReasoning: '0 отрицательных связей → Усиливающий цикл (R)'
      }
    ],
    archetypes: [
      {
        id: 'arch-med-1',
        name: 'Эрозия целей и нормативов (Drifting Goals / Fixes that Fail)',
        description: 'Попытка решить проблему очередей через административное сокращение регламента приема (с 20 до 12 минут) дает сиюминутный рост пропускной способности, но через 1-2 месяца обрушивает систему лавиной осложнений и регоспитализаций.',
        involvedLoops: ['R1', 'R2'],
        warningSignals: [
          'Рост 30-дневной повторной госпитализации выше 18%',
          'Средний стаж работы врачей в отделении падает ниже 3 лет',
          'Более 50% рабочего времени уходит на заполнение форм в МИС'
        ],
        strategicInterventions: [
          'Внедрение ИИ-транскрибации и голосового заполнения медкарты (Ambient Clinical Intelligence) для возврата 15 минут врачу',
          'Организация амбулаторных кабинетов динамического наблюдения за ХОБЛ/ХСН (Heart Failure / COPD Clinics) для гашения R1 на корню',
          'Переход от модели оплаты за койко-день/посещение (fee-for-service) к ценностной подушевой оплате (Value-Based Care)'
        ]
      }
    ],
    leveragePoints: [
      {
        id: 'lev-med-1',
        level: 3,
        levelName: 'Цели системы и критерии премирования',
        targetNodeId: 'readmission_rate',
        targetNodeName: 'Частота повторных госпитализаций',
        recommendation: 'Сменить ключевой KPI главного врача с "валового числа посещений/госпитализаций" на "долю пациентов без обострений в течение 1 года".',
        expectedImpact: 'Снижение нагрузки на коечный фонд на 28-35% за 12 месяцев.',
        riskOfCounterIntuitiveBehavior: 'Риск искусственного отказа в госпитализации тяжелым больным, если не ввести независимый аудит отказов.'
      },
      {
        id: 'lev-med-2',
        level: 6,
        levelName: 'Структура информационных потоков и автоматизация',
        targetNodeId: 'administrative_burden',
        targetNodeName: 'Бюрократическая нагрузка',
        recommendation: 'Полная де-бюрократизация: автоматическое формирование эпикризов через LLM, интеграция с единой базой анализов.',
        expectedImpact: 'Увеличение чистого времени на пациента с 8 до 20 минут без расширения штата.'
      }
    ],
    interventions: [
      {
        id: 'inv-ai-scribe',
        nodeId: 'administrative_burden',
        name: 'Внедрение ИИ-ассистента врача (-50% бюрократии)',
        deltaPercent: -50,
        startStep: 10,
        duration: 40,
        type: 'step'
      }
    ],
    scientificPaper: {
      title: 'Системно-динамический анализ порочного круга перегрузки отделений неотложной помощи, профессионального выгорания врачей и ятрогенных регоспитализаций',
      abstract: 'В исследовании представлена математическая и структурная модель замкнутых контуров обратной связи в стационарном и амбулаторном звене здравоохранения. Показано, что линейные попытки ускорения приема пациентов приводят к нелинейному усилению петель R1 (регоспитализации) и R2 (кадровое истощение), увеличивая суммарные затраты системы на 42%. Идентифицированы критические точки воздействия по Донелле Медоуз, позволяющие перевести систему в устойчивый режим.',
      introduction: 'Современные системы здравоохранения сталкиваются с глобальным кризисом перегрузки приемных отделений (Emergency Department Crowding) и кадрового дефицита. Традиционные административные меры, сфокусированные на формальном сокращении длительности приема, игнорируют фундаментальные запаздывания и петли ятрогении.',
      systemBoundaries: 'Границы модели охватывают амбулаторный поток, приемное отделение, коечный фонд, пул хронических декомпенсированных больных, показатели эмоционального выгорания медицинских работников и финансово-административные регуляторы.',
      causalStructureAnalysis: 'Построена диаграмма причинно-следственных связей (CLD), включающая 8 системных переменных и 10 направленных ребер. Выявлены критические временные задержки между моментом клинической спешки и манифестацией декомпенсации хронической патологии (2-8 недель).',
      feedbackLoopDynamics: 'В системе доминируют два усиливающих порочных круга: контур ятрогении R1 и контур кадрового выгорания R2. Отсутствие сильных локальных балансирующих петель B приводит к фазовому переходу системы в режим перманентного коллапса.',
      simulationResults: 'Численное моделирование методом Эйлера демонстрирует, что при достижении коэффициента выгорания врачей выше 65% система утрачивает способность к самовосстановлению. Введение шока де-бюрократизации (снижение бумажной нагрузки на 50%) разрывает петлю R1 и стабилизирует время приема на уровне 22+ минут.',
      policyRecommendations: 'Рекомендуется пересмотреть систему нормирования труда, внедрить интеллектуальные системы поддержки принятия врачебных решений (CDSS) и клинические программы превентивного патронажа пациентов группы высокого риска.',
      conclusion: 'Системное моделирование доказывает контрпродуктивность политики интенсификации труда врача. Инвестиции в качество первичного контакта и разгрузку от рутины являются наиболее экономически эффективной стратегией здравоохранения.',
      references: [
        { title: 'Emergency Department Crowding: The Canary in the Health Care System', authors: 'Asplin B.R., Magid D.J., Rhodes K.V. et al.', year: '2003', relevance: 'Концептуальная модель потоков пациентов в неотложной медицине.' },
        { title: 'Physician Burnout and the Quality of Care: A Meta-Analysis', authors: 'Panagioti M., Geraghty K., Johnson J.', year: '2018', relevance: 'Эмпирические данные о влиянии выгорания на частоту медицинских ошибок.' },
        { title: 'Thinking in Systems: A Primer', authors: 'Donella H. Meadows', year: '2008', relevance: 'Методология точек системного рычага.' }
      ]
    },
    agentLogs: [
      {
        id: 'med-log-1',
        timestamp: '00:00.150',
        stage: 'ideation',
        message: 'Агент выделил переменные пациентопотока, времени контакта, ятрогений и эмоционального выгорания.',
        type: 'info'
      },
      {
        id: 'med-log-2',
        timestamp: '00:01.300',
        stage: 'discovery',
        message: 'Сформировано 10 каузальных ребер. Выявлен скрытый временной лаг (2-8 недель) между спешкой и повторной госпитализацией.',
        type: 'insight'
      },
      {
        id: 'med-log-3',
        timestamp: '00:02.100',
        stage: 'loop_analysis',
        message: 'Обнаружено 3 усиливающих контура (R1, R2, R3). Идентифицирован системный архетип "Эрозия целей".',
        type: 'success'
      },
      {
        id: 'med-log-4',
        timestamp: '00:03.400',
        stage: 'writeup',
        message: 'Сформирован академический отчет по системной динамике медицинского менеджмента.',
        type: 'success'
      }
    ],
    status: 'completed',
    progressPercent: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'clinical-antimicrobial-resistance',
    title: '🧬 Клиническая фармакология: Антибиотикорезистентность (AMR) и суперинфекции',
    domain: 'Инфекционные болезни, клиническая фармакология и эпидемиология',
    problemStatement: 'Анализ системной ловушки: эмпирическое назначение антибиотиков широкого спектра из-за страха сепсиса и диагностических задержек ускоряет селекцию резистентных штаммов (MRSA, KPC, VRE), вызывая рост неудач терапии и летальности в ОРИТ.',
    researchQuestions: [
      'Каким образом практика "оборонительной медицины" (defensive medicine) ускоряет эволюцию полирезистентных патогенов?',
      'Как программы управления антибиотиками (Antimicrobial Stewardship) формируют балансирующий контур B1?',
      'Каковы точки бифуркации в распространении нозокомиальных инфекций в отделениях реанимации?'
    ],
    hypotheses: [
      {
        id: 'h-amr-1',
        statement: 'Широкое эмпирическое применение резервных карбапенемов и цефалоспоринов 4-5 поколений создает петлю селективного давления R1, снижающую эффективность терапии в течение 12-18 месяцев.',
        confidence: 0.96,
        status: 'confirmed',
        evidence: 'Микробиологический мониторинг изолятов Klebsiella pneumoniae и Acinetobacter baumannii.'
      }
    ],
    nodes: [
      {
        id: 'empiric_broad_spectrum_rx',
        name: 'Эмпирическое назначение антибиотиков широкого спектра',
        type: 'flow',
        category: 'Фармакотерапия',
        description: 'Превентивная терапия максимальными дозами цефалоспоринов/карбапенемов до получения результатов посева.',
        initialValue: 70,
        unit: 'DDD / 100 койко-дней',
        min: 0,
        max: 150,
        x: 180,
        y: 120,
        leverageScore: 9,
        isLeveragePoint: true
      },
      {
        id: 'selective_pressure_pool',
        name: 'Пул резистентных штаммов и бактериальных биопленок',
        type: 'stock',
        category: 'Микробиология',
        description: 'Колонизация поверхностей стационара и пациентов микроорганизмами с множественной лекарственной устойчивостью (MDR/XDR).',
        initialValue: 60,
        unit: '% резистентных изолятов',
        min: 0,
        max: 100,
        x: 480,
        y: 100,
        leverageScore: 8
      },
      {
        id: 'treatment_failure_icu',
        name: 'Частота терапевтических неудач и сепсиса',
        type: 'flow',
        category: 'Клинические исходы',
        description: 'Неэффективность стартовой антибиотикотерапии, прогрессирование септического шока и полиорганной недостаточности.',
        initialValue: 45,
        unit: '% случаев',
        min: 0,
        max: 100,
        x: 750,
        y: 160,
        leverageScore: 7
      },
      {
        id: 'physician_fear_defensive_rx',
        name: 'Страх врачей («Оборонительная медицина» и риск исков)',
        type: 'auxiliary',
        category: 'Психология клинициста',
        description: 'Опасение уголовного преследования или гибели пациента при отказе от немедленного назначения мощных антибиотиков.',
        initialValue: 75,
        unit: 'индекс тревожности',
        min: 0,
        max: 100,
        x: 750,
        y: 340,
        leverageScore: 8,
        isLeveragePoint: true
      },
      {
        id: 'rapid_molecular_diagnostics',
        name: 'Экспресс-ПЦР и тандемная масс-спектрометрия (MALDI-TOF)',
        type: 'auxiliary',
        category: 'Лаборатория',
        description: 'Доступность быстрой идентификации возбудителя и генов резистентности за 2-4 часа вместо 72 часов.',
        initialValue: 30,
        unit: '% охвата',
        min: 0,
        max: 100,
        x: 480,
        y: 350,
        leverageScore: 9,
        isLeveragePoint: true
      },
      {
        id: 'microbiome_depletion',
        name: 'Дисбиоз микробиома и суперинфекции (C. difficile)',
        type: 'stock',
        category: 'Патофизиология',
        description: 'Эрадикация комменсальной микрофлоры ЖКТ, приводящая к псевдомембранозному колиту и грибковым суперинфекциям.',
        initialValue: 40,
        unit: 'индекс повреждения',
        min: 0,
        max: 100,
        x: 180,
        y: 320,
        leverageScore: 6
      }
    ],
    edges: [
      {
        id: 'amr-e1',
        source: 'empiric_broad_spectrum_rx',
        target: 'selective_pressure_pool',
        polarity: '+',
        strength: 'strong',
        weight: 0.95,
        delay: true,
        delayDuration: '2-4 недели',
        rationale: 'Уничтожение чувствительной флоры оставляет экологическую нишу для размножения супербактерий.'
      },
      {
        id: 'amr-e2',
        source: 'selective_pressure_pool',
        target: 'treatment_failure_icu',
        polarity: '+',
        strength: 'strong',
        weight: 0.9,
        delay: false,
        rationale: 'Стандартные препараты не действуют на штаммы с карбапенемазами и металло-бета-лактамазами.'
      },
      {
        id: 'amr-e3',
        source: 'treatment_failure_icu',
        target: 'physician_fear_defensive_rx',
        polarity: '+',
        strength: 'strong',
        weight: 0.85,
        delay: false,
        rationale: 'Каждый летальный случай от тяжелой инфекции повышает страх врача пропустить бактериальную вспышку.'
      },
      {
        id: 'amr-e4',
        source: 'physician_fear_defensive_rx',
        target: 'empiric_broad_spectrum_rx',
        polarity: '+',
        strength: 'strong',
        weight: 0.9,
        delay: false,
        rationale: 'Врач назначает комбинированную терапию «на всякий случай», замыкая порочный круг.'
      },
      {
        id: 'amr-e5',
        source: 'empiric_broad_spectrum_rx',
        target: 'microbiome_depletion',
        polarity: '+',
        strength: 'strong',
        weight: 0.85,
        delay: false,
        rationale: 'Широкий спектр неизбирательно уничтожает полезные анаэробы кишечника.'
      },
      {
        id: 'amr-e6',
        source: 'microbiome_depletion',
        target: 'treatment_failure_icu',
        polarity: '+',
        strength: 'moderate',
        weight: 0.7,
        delay: true,
        delayDuration: '5-10 дней',
        rationale: 'Тяжелый колит C. difficile и транслокация флоры вызывают вторичный эндотоксикоз.'
      },
      {
        id: 'amr-e7',
        source: 'rapid_molecular_diagnostics',
        target: 'empiric_broad_spectrum_rx',
        polarity: '-',
        strength: 'strong',
        weight: 0.88,
        delay: false,
        rationale: 'Точный результат за 3 часа позволяет сразу перейти на узконаправленный антибиотик (деэскалация).'
      }
    ],
    loops: [
      {
        id: 'R1',
        type: 'reinforcing',
        name: 'Спираль селекции супербактерий (The AMR Escalation Trap)',
        nodeIds: ['empiric_broad_spectrum_rx', 'selective_pressure_pool', 'treatment_failure_icu', 'physician_fear_defensive_rx'],
        edgeIds: ['amr-e1', 'amr-e2', 'amr-e3', 'amr-e4'],
        description: 'Усиливающий контур эволюционного давления: избыток антибиотиков -> селекция резистентности -> терапевтический провал -> рост страха клиницистов -> еще больше антибиотиков.',
        polarityReasoning: '0 отрицательных связей → Усиливающий цикл (R)'
      },
      {
        id: 'B1',
        type: 'balancing',
        name: 'Контур молекулярной деэскалации (Antimicrobial Stewardship)',
        nodeIds: ['rapid_molecular_diagnostics', 'empiric_broad_spectrum_rx'],
        edgeIds: ['amr-e7'],
        description: 'Балансирующая петля контроля: экспресс-ПЦР позволяет безопасно снизить объем эмпирического назначения широкого спектра.',
        polarityReasoning: '1 отрицательная связь → Балансирующий цикл (B)'
      }
    ],
    archetypes: [
      {
        id: 'arch-amr-1',
        name: 'Трагедия общин (Tragedy of the Commons) в антибиотикотерапии',
        description: 'Каждый отдельный врач спасает конкретного пациента здесь и сейчас назначением сильнейшего антибиотика, но совокупным результатом становится уничтожение общего ресурса — эффективности антибиотиков для всего человечества.',
        involvedLoops: ['R1'],
        warningSignals: [
          'Частота резистентности к карбапенемам превышает 25% в ОРИТ',
          'Появление вспышек полирезистентной синегнойной палочки и K. pneumoniae'
        ],
        strategicInterventions: [
          'Введение обязательного визирования назначения антибиотиков резерва клиническим фармакологом (Antibiotic Time-Out 48h)',
          'Финансирование экспресс-диагностики MALDI-TOF и мультиплексных ПЦР-панелей сепсиса'
        ]
      }
    ],
    leveragePoints: [
      {
        id: 'lev-amr-1',
        level: 4,
        levelName: 'Правила системы и протоколы назначения',
        targetNodeId: 'empiric_broad_spectrum_rx',
        targetNodeName: 'Эмпирическое назначение широкого спектра',
        recommendation: 'Внедрение протокола "Antibiotic Timeout 48-72h": автоматическая отмена эмпирического антибиотика в МИС, если клиницист не подтвердил посев.',
        expectedImpact: 'Снижение потребления резервных антибиотиков на 45% без ухудшения выживаемости.'
      }
    ],
    interventions: [
      {
        id: 'inv-rapid-pcr',
        nodeId: 'rapid_molecular_diagnostics',
        name: 'Оснащение лаборатории экспресс-ПЦР (+70% скорость)',
        deltaPercent: 70,
        startStep: 8,
        duration: 45,
        type: 'step'
      }
    ],
    scientificPaper: {
      title: 'Системная динамика нозокомиальной антибиотикорезистентности: математическое моделирование эффекта оборонительной медицины и экспресс-диагностики',
      abstract: 'В работе исследована нелинейная динамика селекции резистентных бактериальных клонов в условиях интенсивной терапии. Доказано, что субъективный фактор страха врачей перед сепсисом замыкает положительную обратную связь R1. Внедрение программ рационального применения антибиотиков (AMS) в сочетании с экспресс-ПЦР формирует мощную балансирующую петлю B1, снижая бактериальную селекцию на 60%.',
      introduction: 'Антибиотикорезистентность (AMR) объявлена ВОЗ одной из главных угроз глобальному здоровью. Традиционные эпидемиологические модели часто рассматривают бактериальную мутацию изолированно от поведенческих факторов врачебного сообщества.',
      systemBoundaries: 'Модель охватывает терапевтические решения в отделениях реанимации, пул антибиотиков резерва, бактериальные биопленки, дисбиоз микробиоты и протоколы клинической микробиологии.',
      causalStructureAnalysis: 'Сформирован граф из 6 узлов и 7 ключевых связей, отражающий переход от первичного инфекционного эпизода к формированию устойчивого госпитального клона.',
      feedbackLoopDynamics: 'Идентифицирована доминирующая петля эскалации R1, которая при отсутствии регуляторного контроля приводит к исчерпанию арсенала эффективных химиопрепаратов.',
      simulationResults: 'Симуляция демонстрирует, что увеличение доступности экспресс-диагностики с 30% до 80% останавливает рост пула супербактерий даже при сохранении высокого входящего потока тяжелых больных.',
      policyRecommendations: 'Рекомендуется институционализировать службу клинических фармакологов и инвестировать в диагностические молекулярные платформы bedside-типа.',
      conclusion: 'Преодоление кризиса антибиотикорезистентности требует системного воздействия на психологические и информационные контуры принятия решений врачом.',
      references: [
        { title: 'Global burden of bacterial antimicrobial resistance in 2019: a systematic analysis', authors: 'Antimicrobial Resistance Collaborators (Lancet)', year: '2022', relevance: 'Глобальная статистика смертности от резистентных штаммов.' },
        { title: 'The Core Elements of Hospital Antibiotic Stewardship Programs', authors: 'CDC Guidelines', year: '2019', relevance: 'Структура институционального контроля антибиотиков.' }
      ]
    },
    agentLogs: [],
    status: 'completed',
    progressPercent: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
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
