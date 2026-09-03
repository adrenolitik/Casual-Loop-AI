[README.md](https://github.com/user-attachments/files/31773204/README.md)
# OmniCausal AI Scientist

> **Причинно-следственные диаграммы (CLD) + симуляция + ИИ-агент для научных исследований**

Веб-приложение для построения, анализа и симуляции причинно-следственных диаграмм (Causal Loop Diagrams) с автоматическим определением рычагов воздействия (leverage points) и генерацией научных отчётов. Разработано для системной динамики в медицине, эпидемиологии, экологии и социальных науках.

🌐 **Демо:** https://casual-loop-ai.netlify.app/

---

## 🎯 Ключевые возможности

| Возможность | Описание |
|-------------|----------|
| **📊 CLD-редактор** | Интерактивное построение диаграмм: переменные (stocks, flows, auxiliary), связи с полярностью (+/−), петли обратной связи (R/B) |
| **🔄 Симуляция** | Запуск системной динамики во времени: траектории переменных, чувствительность к параметрам |
| **🎯 Рычаги воздействия** | Автоматический поиск точек вмешательства (leverage points) по методологии Meadows |
| **🤖 ИИ-агент (Pipeline)** | Автономный пайплайн: формулировка гипотезы → построение CLD → симуляция → отчёт |
| **📄 Научные отчёты** | Экспорт в Markdown/HTML/PDF с методологией, результатами, диаграммами и библиографией |
| **📚 Библиотека примеров** | Готовые модели: самоконтроль СД2 (COMPAR-EU), микоз, диабетическая ретинопатия, системный кризис здравоохранения, фармакология, макроэкономика, разработка ПО, климатическая система |

---

## 🏗 Архитектура

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React + TypeScript)          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  CLD Editor  │  │  Simulation  │  │  Report Builder  │   │
│  │  (Cytoscape/ │  │  (Vensim-like│  │  (Markdown +     │   │
│  │   Dagre)     │  │   engine)    │  │   Mermaid/Plotly)│   │
│  └──────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Backend API (FastAPI)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  CLD Parser  │  │  Simulation  │  │  LLM Agent       │   │
│  │  & Validator │  │  Engine      │  │  (OpenRouter/    │   │
│  └──────────────┘  └──────────────┘  │   Local LLM)     │   │
│                                      └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Стек:**
- **Frontend:** React 18, TypeScript, Vite, Cytoscape.js, Dagre, Plotly.js, Mermaid
- **Backend:** FastAPI, Pydantic, NumPy/SciPy (интегрирование ОДУ)
- **LLM:** OpenRouter (nemotron-3-ultra, Claude, GPT-4o) + локальные модели через Ollama
- **Деплой:** Netlify (frontend) + опционально Railway/Render (backend)

---

## 🚀 Быстрый старт

### Предварительные требования
- Node.js 20+
- Python 3.11+ (для бэкенда)
- OpenRouter API ключ (для ИИ-агента)

### Установка фронтенда
```bash
git clone https://github.com/adrenolitik/Casual-Loop-AI.git
cd Casual-Loop-AI/frontend
npm install
npm run dev          # http://localhost:5173
```

### Установка бэкенда (опционально, для симуляции и агента)
```bash
cd ../backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env       # добавь OPENROUTER_API_KEY
uvicorn main:app --reload  # http://localhost:8000
```

### Переменные окружения (`.env`)
```env
OPENROUTER_API_KEY=sk-or-v1-...
DEFAULT_MODEL=nvidia/nemotron-3-ultra-550b-a55b:free
SIMULATION_TIME_STEP=0.1
MAX_SIMULATION_STEPS=1000
```

---

## 📖 Примеры использования

### 1. Построение CLD для самоконтроля сахарного диабета 2 типа
```python
# Пример программного доступа к модели
from backend.models.cld import CLDModel, Variable, Loop

model = CLDModel(
    name="Самоконтроль и профилактика осложнений СД2",
    variables=[
        Variable(id="L8", name="Хроническая гипергликемия", type="stock", value=78),
        Variable(id="L9", name="Срыв самоконтроля", type="flow", value=58),
        Variable(id="B1", name="Самоэффективность пациента", type="stock", value=36),
        # ...
    ],
    loops=[
        Loop(id="R1", name="Спираль диабетического дистресса", polarity="+", variables=["L8", "L9", "L10"]),
        Loop(id="B1", name="Контур расширения прав пациента", polarity="-", variables=["B1", "L9"]),
    ]
)

# Запуск симуляции
results = model.simulate(steps=500, dt=0.1)
```

### 2. Запуск ИИ-агента для нового исследования
```bash
# Через CLI (после установки бэкенда)
python -m agent.run --topic "Влияние телемедицины на адхеренс к лечению ГБ" \
  --output-format markdown --save-diagram
```

### 3. Экспорт отчёта для публикации
```markdown
# Автогенерируемый отчёт включает:
- Методологию (системная динамика, CLD)
- Диаграмму в Mermaid/SVG
- Результаты симуляции (графики Plotly)
- Анализ рычагов воздействия (таблица)
- Библиографию (авто-поиск в PubMed/Crossref)
```

---

## 📁 Структура репозитория

```
Casual-Loop-AI/
├── frontend/                 # React + TypeScript приложение
│   ├── src/
│   │   ├── components/       # UI компоненты (Editor, Simulation, Report)
│   │   ├── hooks/            # React hooks (useCLD, useSimulation)
│   │   ├── services/         # API клиенты, WebSocket
│   │   ├── store/            # Zustand/Redux состояние
│   │   └── utils/            # Парсеры, валидаторы, экспорт
│   ├── public/               # Статические ассеты
│   └── package.json
├── backend/                  # FastAPI сервис
│   ├── app/
│   │   ├── api/              # Роутеры (cld, simulation, agent, export)
│   │   ├── models/           # Pydantic модели (Variable, Loop, SimulationResult)
│   │   ├── services/         # Бизнес-логика (parser, simulator, agent)
│   │   └── core/             # Конфиг, логирование, исключения
│   ├── tests/
│   └── requirements.txt
├── shared/                   # Общие типы и утилиты (TypeScript + Python)
├── docs/                     # Документация (методология, API)
├── examples/                 # Готовые CLD модели (JSON)
│   ├── t2d-self-management.json
│   ├── healthcare-crisis.json
│   ├── climate-system.json
│   └── ...
├── .github/workflows/        # CI/CD
├── docker-compose.yml        # Локальный стек (frontend + backend + ollama)
└── README.md
```

---

## 🧪 Тестирование

```bash
# Фронтенд
cd frontend && npm run test        # Vitest + React Testing Library
npm run test:e2e                   # Playwright

# Бэкенд
cd backend && pytest -v            # Unit + integration
pytest --cov=app --cov-report=html
```

---

## 📊 Методологическая база

- **Системная динамика:** Forrester (1961), Sterman (2000) *Business Dynamics*
- **Causal Loop Diagrams:** Richardson (1986), Kim (1992)
- **Leverage Points:** Meadows (1999) *Places to Intervene in a System*
- **Валидация моделей:** Barlas (1996), Qudrat-Ullah (2010)
- **Медицинские онтологии:** COMPAR-EU taxonomy, ICD-11, SNOMED CT

---

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку: `git checkout -b feature/amazing-feature`
3. Внесите изменения с тестами
4. Запустите линтеры: `npm run lint && cd ../backend && ruff check .`
5. Откройте Pull Request

См. [CONTRIBUTING.md](CONTRIBUTING.md) для деталей.

---

## 📄 Лицензия

MIT License — см. [LICENSE](LICENSE).

---

## 👥 Команда

**AIMedica** — стартап Гомельского гос. мед. университета (ГомГМУ)

- **adrenolitik** — архитектура, ML/симуляция, бэкенд
- Контакты: GitHub Issues / Telegram @adrenolitik

---

## 🔗 Полезные ссылки

- 🌐 **Продакшн:** https://casual-loop-ai.netlify.app/
- 📚 **Документация API:** https://casual-loop-ai.netlify.app/api/docs (Swagger)
- 🐛 **Баги и фичи:** [Issues](https://github.com/adrenolitik/Casual-Loop-AI/issues)
- 💬 **Обсуждения:** [Discussions](https://github.com/adrenolitik/Casual-Loop-AI/discussions)
- 📦 **Релизы:** [Releases](https://github.com/adrenolitik/Casual-Loop-AI/releases)

---

> *Построено для исследователей, которые думают в петлях, а не в линейных регрессиях.*
