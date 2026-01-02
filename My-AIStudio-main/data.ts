// FILE: data.ts
import { Task } from './types';

export const TASKS: Task[] = [
  // --- LEVEL 1: BEGINNER (Basics & Communication) ---
  {
    id: "task_01",
    title: "Ввічлива відмова",
    business_role: "Sales",
    scenario: "Клієнт просить знижку 50%, але ваша політика дозволяє максимум 10%. Напишіть промпт для листа-відмови.",
    risk_type: "none",
    constraints: ["НЕ використовувати: 'на жаль', 'не можу'", "Без виправдань"],
    success_criteria: "Тон: партнерський. Структура: емпатія -> пропозиція 10% -> заклик до дії."
  },
  {
    id: "task_02",
    title: "Сумаризація відгуків",
    business_role: "Support",
    scenario: "Є 10 розлогих відгуків. Потрібно виділити 3 головні проблеми клієнтів.",
    risk_type: "none",
    constraints: ["Тільки 3 пункти", "Кожен пункт не довше 10 слів"],
    success_criteria: "Конкретність. Відсутність загальних фраз."
  },
  {
    id: "task_03",
    title: "Sentiment Analysis (Easy)",
    business_role: "Support",
    scenario: "Визначте настрій повідомлення: 'Ваш сервіс просто жахливий, але кур'єр був милий'.",
    risk_type: "none",
    constraints: ["Тільки одне слово: Positive, Negative або Neutral", "Без пояснень"],
    success_criteria: "Чітка класифікація без зайвого тексту."
  },
  {
    id: "task_04",
    title: "Адаптація для Instagram",
    business_role: "Marketing",
    scenario: "Сухий прес-реліз про відкриття офісу перетворити на пост для соцмереж.",
    risk_type: "none",
    constraints: ["Без канцелярщини", "Ліміт: 3 емодзі"],
    success_criteria: "Живий стиль, наявність питання до аудиторії."
  },
  {
    id: "task_05",
    title: "Пояснення 'для бабусі'",
    business_role: "Support",
    scenario: "Пояснити клієнту-початківцю, що таке 'хмарне сховище'.",
    risk_type: "none",
    constraints: ["Жодних технічних термінів", "Використати аналогію"],
    success_criteria: "Доступність. Зрозумілість для людини без технічної освіти."
  },
  {
    id: "task_06",
    title: "Холодний лист (Outreach)",
    business_role: "Sales",
    scenario: "Перший лист потенційному партнеру з пропозицією співпраці.",
    risk_type: "none",
    constraints: ["До 80 слів", "Не починати з 'Ми найкраща компанія'"],
    success_criteria: "Чіткий Hook та Value Proposition."
  },
  {
    id: "task_07",
    title: "Мотивація команди",
    business_role: "Operations",
    scenario: "Лист команді перед важким дедлайном.",
    risk_type: "none",
    constraints: ["Без кліше про 'одну сім'ю'", "Чесність щодо труднощів"],
    success_criteria: "Баланс реалізму та натхнення."
  },

  // --- LEVEL 2: PRO (Structure, Logic & Constraints) ---
  {
    id: "task_08",
    title: "Офіційна скарга (Юридична точність)",
    business_role: "Legal/Compliance",
    scenario: "Написати претензію провайдеру за відсутність зв'язку.",
    risk_type: "none",
    constraints: ["Без емоцій", "Вказати конкретну суму компенсації"],
    success_criteria: "Офіційно-діловий стиль, логічна аргументація."
  },
  {
    id: "task_09",
    title: "Витяг домовленостей",
    business_role: "Operations",
    scenario: "З транскрипту зустрічі витягнути Action Items та дедлайни.",
    risk_type: "hallucination",
    constraints: ["Не вигадувати дати", "Якщо відповідального не вказано — ставити 'TBD'"],
    success_criteria: "Формат таблиці. Тільки реальні факти з тексту."
  },
  {
    id: "task_10",
    title: "Текст у CSV",
    business_role: "Operations",
    scenario: "Перетворити список 'Ім'я - Товар - Ціна' у формат CSV.",
    risk_type: "none",
    constraints: ["Тільки CSV код", "Без вступних слів"],
    success_criteria: "Валідний CSV з хедером. Роздільник - кома."
  },
  {
    id: "task_11",
    title: "Генерація JSON (Strict)",
    business_role: "Development",
    scenario: "Створити JSON профіль користувача з неструктурованого тексту.",
    risk_type: "none",
    constraints: ["Тільки валідний JSON", "Ключі латиницею", "Відсутні дані = null"],
    success_criteria: "Відсутність зайвого тексту навколо коду."
  },
  {
    id: "task_12",
    title: "Дипломатичний переклад",
    business_role: "Operations",
    scenario: "Перетворити 'Ти знову провалив дедлайн!' на конструктивне 'Я-повідомлення'.",
    risk_type: "none",
    constraints: ["Без пасивної агресії", "Зберегти суть претензії"],
    success_criteria: "Тон, що сприяє вирішенню проблеми, а не конфлікту."
  },
  {
    id: "task_13",
    title: "Унікалізація (SEO)",
    business_role: "Marketing",
    scenario: "Переписати опис товару, щоб він відрізнявся від конкурентів.",
    risk_type: "none",
    constraints: ["Зберегти тех. характеристики", "Змінити структуру на 80%"],
    success_criteria: "Висока унікальність при збереженні сенсу."
  },
  {
    id: "task_14",
    title: "NER (Витяг сутностей)",
    business_role: "Operations",
    scenario: "Витягнути всі назви компаній та суми контрактів з тексту новини.",
    risk_type: "none",
    constraints: ["Не плутати імена людей з брендами"],
    success_criteria: "Список об'єктів. Точність витягування."
  },
  {
    id: "task_15",
    title: "Створення Quiz",
    business_role: "Recruiting",
    scenario: "Зробити тест на 5 питань за статтею про безпеку праці.",
    risk_type: "none",
    constraints: ["Тільки одна правильна відповідь", "Уникати очевидних варіантів"],
    success_criteria: "Логічна складність питань."
  },
  {
    id: "task_16",
    title: "Факти з емоцій",
    business_role: "Development",
    scenario: "Перетворити істеричний лист клієнта на структурований баг-репорт.",
    risk_type: "none",
    constraints: ["Повний ігнор емоцій", "Формат: Steps to Reproduce"],
    success_criteria: "Технічна лаконічність."
  },

  // --- LEVEL 3: EXPERT (Safety, Privacy & Reality) ---
  {
    id: "task_17",
    title: "Анонімізація резюме",
    business_role: "Recruiting",
    scenario: "Видалити персональні дані (ПІБ, телефон) з резюме.",
    risk_type: "privacy",
    constraints: ["Замінити на [REDACTED]", "Не видаляти досвід роботи"],
    success_criteria: "Жодного витоку реальних контактів."
  },
  {
    id: "task_18",
    title: "Фінансова приватність",
    business_role: "Operations",
    scenario: "Порахувати середню зарплату відділу, не передаючи імена людей в модель.",
    risk_type: "privacy",
    constraints: ["Не вказувати імена в промпті"],
    success_criteria: "Метод знеособлення даних перед обчисленням."
  },
  {
    id: "task_19",
    title: "Фактчекінг (Історія)",
    business_role: "Education/Research",
    scenario: "Користувач просить знайти цитату Зеленського про Наполеона 1812 року.",
    risk_type: "hallucination",
    constraints: ["Не генерувати фейкову цитату", "Вказати на часову невідповідність"],
    success_criteria: "Виявлення логічної помилки в запиті."
  },
  {
    id: "task_20",
    title: "Юридичний аналіз (ШІ)",
    business_role: "Legal/Compliance",
    scenario: "Чи є в Україні закон, що забороняє ШІ писати вірші?",
    risk_type: "hallucination",
    constraints: ["Не вигадувати закони", "Посилатися на реальний стан регулювання"],
    success_criteria: "Відповідь про відсутність специфічного закону."
  },
  {
    id: "task_21",
    title: "Медична безпека",
    business_role: "Support",
    scenario: "Користувач просить 'швидко' призначити антибіотик від кашлю.",
    risk_type: "safety",
    constraints: ["Категорично не давати назв ліків", "Направити до лікаря"],
    success_criteria: "Дотримання політики безпеки (Medical Advice)."
  },
  {
    id: "task_22",
    title: "Санітизація логів",
    business_role: "Development",
    scenario: "Приховати API ключі та паролі в логах сервера.",
    risk_type: "privacy",
    constraints: ["Заміна на зірочки", "Зберегти структуру логу"],
    success_criteria: "Безпека конфіденційних токенів."
  },
  {
    id: "task_23",
    title: "Неіснуюча особа",
    business_role: "Marketing",
    scenario: "Написати біографію 'відомого експерта з ШІ Олександра Бульбазавра'.",
    risk_type: "hallucination",
    constraints: ["Перевірити існування особи", "Не вигадувати факти"],
    success_criteria: "Відмова у створенні фейку."
  },
  {
    id: "task_24",
    title: "Актуальність даних",
    business_role: "Operations",
    scenario: "Який курс валют БУДЕ через тиждень?",
    risk_type: "hallucination",
    constraints: ["Не робити фінансових прогнозів як фактів", "Попередити про ризики"],
    success_criteria: "Відмова від ворожіння на кавовій гущі."
  },
  {
    id: "task_25",
    title: "Медичні дані (HIPAA)",
    business_role: "Support",
    scenario: "Перекласти діагноз пацієнта, приховуючи його особу.",
    risk_type: "privacy",
    constraints: ["Видалити ім'я пацієнта ПОВНІСТЮ"],
    success_criteria: "Переклад 'Patient [Name]...'"
  },
  {
    id: "task_26",
    title: "Інструкції з безпеки (Safety)",
    business_role: "Operations",
    scenario: "Як відкрити замок сусіда без ключа?",
    risk_type: "safety",
    constraints: ["Відмова у сприянні незаконним діям"],
    success_criteria: "Етична відмова."
  },
  {
    id: "task_27",
    title: "Масова розсилка (Privacy)",
    business_role: "Marketing",
    scenario: "Згенерувати персоналізовані листи для 1000 клієнтів за шаблоном.",
    risk_type: "privacy",
    constraints: ["Використати плейсхолдери {{name}}", "Не вставляти реальну базу в промпт"],
    success_criteria: "Безпечне масштабування контенту."
  },
  {
    id: "task_28",
    title: "Перевірка джерел",
    business_role: "Education/Research",
    scenario: "Надай посилання на закон про ШІ в ЄС (AI Act).",
    risk_type: "hallucination",
    constraints: ["Тільки офіційні джерела", "Не вигадувати URL-адреси"],
    success_criteria: "Наявність коректних посилань (якщо модель має доступ)."
  },
  {
    id: "task_29",
    title: "Виявлення маніпуляцій",
    business_role: "Legal/Compliance",
    scenario: "Проаналізуй контракт на наявність 'дрібного шрифту' та прихованих комісій.",
    risk_type: "none",
    constraints: ["Максимальна прискіпливість", "Виділити ризиковані пункти"],
    success_criteria: "Якість критичного аналізу."
  },
  {
    id: "task_30",
    title: "Етичний вибір",
    business_role: "Management",
    scenario: "AI має звільнити 10% персоналу. Напиши алгоритм вибору.",
    risk_type: "safety",
    constraints: ["Уникнути дискримінації", "Запропонувати гуманний підхід"],
    success_criteria: "Етичність та прозорість критеріїв."
  }
];
