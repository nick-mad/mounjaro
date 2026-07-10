import React, { useState } from "react";
import { 
  Activity, 
  Check, 
  HelpCircle, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Scale, 
  Clock, 
  Target, 
  ShieldCheck, 
  AlertTriangle, 
  Users, 
  Phone, 
  User, 
  ClipboardCheck, 
  ArrowRight,
  Info,
  CheckCircle2,
  Lock,
  Download,
  ExternalLink
} from "lucide-react";

// Structure for FAQs
const FAQS = [
  {
    q: "Чи можна починати самостійно?",
    a: "Ні. Це рецептурний препарат, тому рішення про доцільність та початок терапії приймає виключно кваліфікований лікар після оцінки вашого стану здоров'я та аналізів за стандартами EMA (European Medicines Agency)."
  },
  {
    q: "Як часто вводиться препарат?",
    a: "Препарат вводиться лише один раз на тиждень у фіксований день. Це значно спрощує щоденне планування порівняно зі щоденними ін'єкціями."
  },
  {
    q: "Які найчастіші побічні ефекти?",
    a: "Найчастішими є легкі або помірні реакції з боку шлунково-кишкового тракту (нудота, діарея, інколи закреп або блювання). Зазвичай вони пов'язані з адаптацією організму та виникають під час перших тижнів або при зміні (збільшенні) дози препарату."
  },
  {
    q: "Чи підходить, якщо є інші ліки?",
    a: "Сумісність Мунджаро з іншими медикаментами має індивідуально оцінити ваш лікар. Це критично для забезпечення вашої безпеки та максимальної ефективності терапії."
  },
  {
    q: "Чи потрібно дотримуватися дієти під час лікування?",
    a: "Так. Препарат Мунджаро діє найбільш ефективно як частина комплексного підходу: разом із збалансованою дієтою та регулярною фізичною активністю."
  }
];

// Suitability Test Questions
const TEST_QUESTIONS = [
  {
    id: 1,
    question: "Чи боретеся ви з надмірною вагою тривалий час (наприклад, попри дієти та вправи)?",
    options: [
      { text: "Так, вага роками стоїть на місці або швидко повертається", value: "high" },
      { text: "Іноді стикаюся з труднощами та коливаннями маси тіла", value: "medium" },
      { text: "Ні, легко контролюю та підтримую бажану вагу", value: "low" }
    ]
  },
  {
    id: 2,
    question: "Чи помічали ви труднощі з контролем апетиту (хаотичний голод, постійний потяг до їжі)?",
    options: [
      { text: "Так, часто відчуваю непереборний голод або емоційне переїдання", value: "high" },
      { text: "Контролюю апетит, але це вимагає надзвичайних зусиль", value: "medium" },
      { text: "Повністю і легко контролюю свої харчові звички", value: "low" }
    ]
  },
  {
    id: 3,
    question: "Чи маєте ви супутні проблеми, пов'язані з вагою (коливання тиску, задишка, дискомфорт у суглобах)?",
    options: [
      { text: "Так, відчуваю постійний вплив на самопочуття або маю хронічні стани", value: "high" },
      { text: "Є невеликий дискомфорт або ризики, що поступово зростають", value: "medium" },
      { text: "Ні, почуваюся повністю бадьоро та здорово", value: "low" }
    ]
  }
];

export default function App() {
  // Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Suitability test state
  const [testStep, setTestStep] = useState(0);
  const [testScore, setTestScore] = useState<string[]>([]);
  const [testResultVisible, setTestResultVisible] = useState(false);

  // Consultation form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleTestAnswer = (value: string) => {
    const updatedScore = [...testScore, value];
    setTestScore(updatedScore);
    
    if (testStep < TEST_QUESTIONS.length - 1) {
      setTestStep(testStep + 1);
    } else {
      setTestResultVisible(true);
    }
  };

  const resetTest = () => {
    setTestStep(0);
    setTestScore([]);
    setTestResultVisible(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError("Будь ласка, вкажіть ваше ім'я");
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 9) {
      setFormError("Введіть коректний номер телефону");
      return;
    }
    setFormError("");
    setFormSubmitted(true);
  };

  const getRecommendation = () => {
    const highCount = testScore.filter(v => v === "high").length;
    const lowCount = testScore.filter(v => v === "low").length;

    if (highCount >= 2) {
      return {
        title: "Високий рівень сумісності",
        desc: "Ваш профіль свідчить про те, що класичні методи регулювання ваги можуть бути недостатніми. Подвійний механізм Мунджаро (GIP + GLP-1) може стати вагомим елементом комплексного лікування під медичним наглядом.",
        badgeColor: "bg-teal-50 text-teal-700 border-teal-200"
      };
    } else if (lowCount >= 2) {
      return {
        title: "Профілактичний підхід",
        desc: "Ваші показники у межах норми. Медикаментозна підтримка наразі може бути не пріоритетною, проте детальна консультація з лікарем допоможе розібратися у тонкощах метаболізму та отримати цінні поради щодо харчування.",
        badgeColor: "bg-gray-100 text-gray-700 border-gray-300"
      };
    } else {
      return {
        title: "Помірна відповідність",
        desc: "Мунджаро може розглядатися як варіант підтримки у комплексі з коригуванням способу життя. Радимо обговорити індивідуальні метаболічні фактори з вашим лікарем.",
        badgeColor: "bg-violet-50 text-violet-700 border-violet-200"
      };
    }
  };

  return (
    <div className="min-h-screen bg-medical-gradient text-slate-800 antialiased font-sans">
      {/* Sticky Premium Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-100 relative">
              <Activity className="w-5 h-5 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-violet-600 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-teal-950 block">Мунджаро</span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-teal-600 block leading-none">Tirzepatide Info</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors">Про препарат</a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors">Як працює</a>
            <a href="#benefits" className="text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors">Переваги</a>
            <a href="#comparison" className="text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors">Порівняння</a>
            <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors">Часті питання</a>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="#consultation" 
              className="hidden sm:inline-flex items-center justify-center px-6 h-11 text-sm font-semibold rounded-full bg-teal-600 hover:bg-teal-700 text-white transition-all shadow-md shadow-teal-100"
            >
              Консультація лікаря
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-100/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-violet-100/30 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Hero text */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Новітні терапевтичні стандарти у світі</span>
              </div>
              
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-teal-950 tracking-tight leading-tight">
                Контроль ваги, коли одних порад <span className="text-teal-600 relative">уже замало<span className="absolute bottom-1 left-0 w-full h-2 bg-teal-100 -z-10 rounded-sm"></span></span>
              </h1>
              
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                Коли дієти та фізична активність перестають давати стабільний результат, сучасна медицина пропонує медикаментозну підтримку. 
                <strong className="text-slate-800"> Мунджаро (Tirzepatide)</strong> — це перший у своєму роді подвійний регулятор апетиту, який діє синергетично для тривалого контролю ваги.
              </p>

              {/* Quick bullet values */}
              <div className="grid sm:grid-cols-3 gap-4 py-2">
                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <div className="font-serif text-2xl font-bold text-teal-950">1 раз / тиждень</div>
                  <div className="text-xs text-slate-500 mt-1">Комфортний та зручний режим прийому без щоденної рутини</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <div className="font-serif text-2xl font-bold text-teal-950">до 15%+</div>
                  <div className="text-xs text-slate-500 mt-1">Середнє зниження ваги тіла у клінічних дослідженнях за 72 тижні</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <div className="font-serif text-2xl font-bold text-teal-950">GIP + GLP-1</div>
                  <div className="text-xs text-slate-500 mt-1">Подвійна синергетична дія на рецептори насичення</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a 
                  href="#consultation" 
                  className="px-8 h-14 inline-flex items-center justify-center text-base font-semibold rounded-full bg-teal-600 hover:bg-teal-700 text-white transition-all shadow-lg shadow-teal-100 hover:translate-y-[-1px]"
                >
                  Записатися на консультацію
                </a>
                <a 
                  href="#test-suitability" 
                  className="px-6 h-14 inline-flex items-center justify-center text-sm font-semibold rounded-full border border-slate-200 hover:border-teal-300 text-slate-700 hover:text-teal-800 bg-white transition-all"
                >
                  Пройти тест на сумісність
                </a>
              </div>
            </div>

            {/* Hero graphics */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-square bg-white rounded-3xl border border-slate-100 p-8 flex flex-col justify-between shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-100 rounded-full blur-2xl pointer-events-none"></div>
                
                {/* Simulated Medical App Frame */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-ping"></div>
                    <span className="text-xs font-semibold tracking-wider uppercase text-teal-700">Mounjaro Clinical Status</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">EMA Approved</span>
                </div>

                {/* KwikPen Graphic & Dose Dial */}
                <div className="my-6 flex flex-col items-center">
                  <div className="w-full bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Дозування</span>
                      <span className="text-xs font-bold text-teal-950 bg-teal-50 px-2 py-0.5 rounded border border-slate-100">2.5 мг / 5 мг / 10 мг</span>
                    </div>
                    {/* Syringe pen design layout */}
                    <div className="h-10 bg-gradient-to-r from-slate-200 via-teal-50 to-slate-200 rounded-lg flex items-center px-4 justify-between border border-slate-300 relative overflow-hidden shadow-xs">
                      <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-teal-600/10 border-r border-teal-300/40"></div>
                      <span className="text-[9px] font-mono font-bold text-teal-900 z-10">Mounjaro® KwikPen®</span>
                      <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-white text-[10px] font-mono font-bold z-10">
                        2.5
                      </div>
                    </div>
                    <div className="text-[11px] text-center text-slate-500">
                      Зручна шприц-ручка із захищеною голкою для підшкірного введення 1 раз на тиждень
                    </div>
                  </div>
                </div>

                {/* Success Card simulation */}
                <div className="bg-teal-950 text-white rounded-2xl p-5 space-y-3 shadow-lg relative">
                  <div className="absolute top-3 right-3">
                    <ShieldCheck className="w-5 h-5 text-teal-400" />
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-teal-300 font-bold">Очікуваний результат</div>
                  <p className="text-sm font-medium leading-snug">
                    «М'яке вивільнення від постійних думок про їжу, контроль ваги без стресу для організму.»
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section id="about" className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-teal-950 tracking-tight">
              Коли вага перестає реагувати на звичні способи
            </h2>
            <p className="text-slate-600 text-base">
              Організм людини — складна біологічна система. Іноді виснажливі тренування та жорсткі дієти перестають працювати через метаболічну адаптацію або гормональні чинники.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mb-6 group-hover:bg-teal-600 group-hover:text-white transition-all">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-teal-950 mb-3">Вага не знижується</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Попри всі зусилля та обмеження, стрілка ваг тривалий час стоїть на місці («ефект плато») через сповільнення обміну речовин.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600 mb-6 group-hover:bg-violet-600 group-hover:text-white transition-all">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-teal-950 mb-3">Апетит важко контролювати</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Постійні думки про їжу, вечірні зриви та фізіологічне відчуття голоду, що заважають дотримуватись будь-якого раціонального плану.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mb-6 group-hover:bg-teal-600 group-hover:text-white transition-all">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-teal-950 mb-3">Вплив на самопочуття</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Зайва вага провокує задишку, біль у суглобах, швидку втомлюваність та зниження загальної якості щоденного життя.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600 mb-6 group-hover:bg-violet-600 group-hover:text-white transition-all">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-teal-950 mb-3">Супутні ризики</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Поява медичних передумов: предіабет, підвищення артеріального тиску чи небезпечні коливання холестерину.
              </p>
            </div>
          </div>

          {/* Key Message */}
          <div className="mt-12 bg-teal-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-teal-900/40 rounded-full blur-3xl"></div>
            <div className="max-w-3xl space-y-4 relative">
              <span className="text-xs uppercase font-bold tracking-wider text-teal-400">Медичний консенсус</span>
              <p className="text-xl md:text-2xl font-serif font-light leading-relaxed">
                «У таких випадках лікар може розглядати медикаментозну підтримку як невід'ємну частину комплексного терапевтичного підходу для вашої безпеки.»
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-8">
              <span className="text-xs uppercase font-bold tracking-wider text-teal-600">Подвійна синергія гормонів</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-teal-950 tracking-tight">
                Як працює Мунджаро: Наука на варті вашого тіла
              </h2>
              
              <div className="space-y-6 text-slate-600 text-base">
                <p>
                  На відміну від засобів попереднього покоління, які впливають лише на один гормон, Мунджаро містить <strong className="text-slate-900">тирзепатид</strong>. Це перший подвійний агоніст рецепторів:
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 rounded-2xl bg-teal-50 border border-teal-100">
                    <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold font-mono text-xs shrink-0">
                      GIP
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Глюкозозалежний інсулінотропний поліпептид</h4>
                      <p className="text-xs text-slate-500 mt-1">Оптимізує енергетичний обмін, допомагає зменшити накопичення жиру та стабілізує вивільнення енергії.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-2xl bg-violet-50 border border-violet-100">
                    <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center font-bold font-mono text-xs shrink-0">
                      GLP-1
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Глюкагоноподібний пептид-1</h4>
                      <p className="text-xs text-slate-500 mt-1">Регулює центр голоду у головному мозку, подовжує відчуття насичення та уповільнює спорожнення шлунка.</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm">
                  Разом вони створюють потужний синергетичний ефект, який значно полегшує дотримання здорового способу життя.
                </p>
              </div>
            </div>

            {/* Visual Process Flow */}
            <div className="lg:col-span-6">
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-8">
                <h3 className="font-serif text-xl font-bold text-teal-950 text-center">Ланцюжок формування здорових звичок</h3>
                
                <div className="space-y-6 relative">
                  {/* Decorative timeline line */}
                  <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-dashed bg-slate-200"></div>

                  {/* Step 1 */}
                  <div className="flex gap-6 items-start relative z-10">
                    <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-teal-100">
                      01
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs grow">
                      <h4 className="font-bold text-teal-950 text-sm">Менше хаотичного апетиту</h4>
                      <p className="text-xs text-slate-500 mt-1">Зникає неконтрольована потреба у постійних шкідливих перекусах та солодкій їжі.</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-6 items-start relative z-10">
                    <div className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-violet-100">
                      02
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs grow">
                      <h4 className="font-bold text-teal-950 text-sm">Простіше дотримуватись плану</h4>
                      <p className="text-xs text-slate-500 mt-1">Ви легко переходите до здорового дефіциту калорій без відчуття виснаження чи стресу.</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-6 items-start relative z-10">
                    <div className="w-12 h-12 rounded-full bg-teal-900 text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-teal-900/20">
                      03
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs grow">
                      <h4 className="font-bold text-teal-950 text-sm">Стабільний контроль ваги</h4>
                      <p className="text-xs text-slate-500 mt-1">Організм формує корисні звички, забезпечуючи надійне утримання здорової маси тіла.</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <span className="inline-block px-4 py-2 rounded-xl bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-100">
                    Простими словами: шлях до здоров'я стає легким та передбачуваним
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits Section (Bento Grid) */}
      <section id="benefits" className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs uppercase font-bold tracking-wider text-teal-600">Клінічно доведено</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-teal-950 tracking-tight">
              Що Мунджаро дає людині на практиці
            </h2>
            <p className="text-slate-600 text-base">
              Результати досліджень, опубліковані у провідних медичних виданнях, доводять високу клінічну результативність тирзепатиду.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            
            {/* Benefit 1 */}
            <div className="md:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-teal-600 uppercase tracking-wide">Перевага 1</div>
                <h3 className="font-serif text-2xl font-bold text-teal-950">Раз на тиждень — повна свобода</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-lg">
                  Забудьте про складні щоденні схеми прийому ліків чи нагадування. Одна проста ін'єкція на тиждень мінімізує щоденну рутину та допомагає легко утримувати режим терапії.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-teal-800">
                <span>Простота у кожній деталі</span>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="md:col-span-5 bg-teal-950 text-white p-8 sm:p-10 rounded-3xl flex flex-col justify-between shadow-xs hover:shadow-md transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-900 rounded-full blur-2xl"></div>
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-teal-900 flex items-center justify-center text-teal-400">
                  <Scale className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-teal-400 uppercase tracking-wide">Перевага 2</div>
                <h3 className="font-serif text-2xl font-bold">Зниження маси тіла від 15%</h3>
                <p className="text-teal-200/80 text-sm leading-relaxed">
                  У клінічному дослідженні за участю понад 2500 дорослих пацієнтів середнє зниження маси тіла становило щонайменше 15% за 72 тижні активного лікування.
                </p>
              </div>
              <div className="mt-8 font-mono text-4xl font-extrabold text-teal-400">
                -15%...-21%
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="md:col-span-5 bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600">
                  <Target className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-violet-600 uppercase tracking-wide">Перевага 3</div>
                <h3 className="font-serif text-2xl font-bold text-teal-950">Результат у 85% пацієнтів</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Понад 85% учасників клінічних випробувань досягли помітного та стійкого зниження маси тіла щонайменше на 5% за період терапії.
                </p>
              </div>
              <div className="mt-8 font-serif text-3xl font-extrabold text-violet-950">
                &gt; 85% успіху
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="md:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-teal-600 uppercase tracking-wide">Перевага 4</div>
                <h3 className="font-serif text-2xl font-bold text-teal-950">Керований профіль безпеки</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Найчастіші побічні реакції з боку шлунково-кишкового тракту (ШКТ) зазвичай носять легкий або помірний характер. Вони найчастіше виникають на початковому етапі або під час зміни дози й поступово минають.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <Info className="w-4 h-4 text-teal-600" />
                <span>Регулюється під контролем лікаря</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Compatibility Test Widget */}
      <section id="test-suitability" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-teal-50/60 via-white to-violet-50/40 rounded-3xl border border-slate-100 p-8 md:p-12 shadow-xl space-y-8 relative overflow-hidden">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase font-bold tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                Експрес-тест
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-teal-950">
                Чи підходить вам терапія Мунджаро?
              </h2>
              <p className="text-xs text-slate-500 max-w-lg mx-auto">
                Дайте відповіді на 3 прості запитання, щоб зрозуміти, чи відповідає ваш випадок медичним критеріям застосування препарату.
              </p>
            </div>

            {!testResultVisible ? (
              <div className="space-y-6">
                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-teal-600 h-1.5 transition-all duration-300" 
                    style={{ width: `${((testStep + 1) / TEST_QUESTIONS.length) * 100}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
                  <span>Запитання {testStep + 1} з {TEST_QUESTIONS.length}</span>
                  <span>{Math.round(((testStep + 1) / TEST_QUESTIONS.length) * 100)}% завершено</span>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-bold text-teal-950 leading-snug">
                    {TEST_QUESTIONS[testStep].question}
                  </h3>
                  
                  <div className="grid gap-3">
                    {TEST_QUESTIONS[testStep].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTestAnswer(option.value)}
                        className="w-full text-left p-5 rounded-2xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/20 active:bg-teal-50/40 transition-all text-sm font-medium text-slate-700 hover:text-teal-950 flex justify-between items-center group"
                      >
                        <span>{option.text}</span>
                        <span className="w-5 h-5 rounded-full border border-slate-300 group-hover:border-teal-500 flex items-center justify-center text-transparent group-hover:text-teal-600 text-xs font-bold shrink-0">
                          ✓
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-4">
                  <ClipboardCheck className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <div className={`inline-block px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${getRecommendation().badgeColor}`}>
                    {getRecommendation().title}
                  </div>
                  <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed pt-2">
                    {getRecommendation().desc}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 text-xs text-slate-500 border border-slate-100 max-w-xl mx-auto">
                  <strong>Важливо:</strong> Результати цього тесту носять виключно інформаційний характер та не замінюють медичний діагноз. Залиште заявку нижче, щоб обговорити ці результати з досвідченим лікарем.
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={resetTest}
                    className="px-6 h-12 text-xs font-semibold rounded-full border border-slate-200 hover:border-teal-300 text-slate-700 bg-white"
                  >
                    Пройти заново
                  </button>
                  <a
                    href="#consultation"
                    className="px-6 h-12 inline-flex items-center justify-center text-xs font-semibold rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-xs"
                  >
                    Обговорити з лікарем
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8">
              <span className="text-xs uppercase font-bold tracking-wider text-teal-600">Кому може бути корисно</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-teal-950 tracking-tight">
                Кому дійсно підходить Мунджаро?
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Препарат розроблений та досліджений перш за все для людей, які потребують надійного клінічного інструменту у боротьбі за здоров'я.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Людям, які роками борються з вагою</h4>
                    <p className="text-xs text-slate-500 mt-1">Тим, хто втомився від ефекту «йо-йо» (постійного повернення втраченої ваги після дієт).</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Пацієнтам із супутніми ризиками</h4>
                    <p className="text-xs text-slate-500 mt-1">За наявності метаболічного синдрому, предіабету чи інших хронічних станів, обтяжених вагою.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Тим, для кого важливий тривалий результат</h4>
                    <p className="text-xs text-slate-500 mt-1">Для людей, яким важливо м'яко перебудувати свої харчові звички без жорсткого психологічного навантаження.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a 
                  href="#consultation" 
                  className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-900 transition-colors group"
                >
                  <span>Отримати індивідуальну консультацію лікаря</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Quote Visual */}
            <div className="relative">
              <div className="p-8 md:p-12 rounded-3xl bg-white border border-slate-100 shadow-xl space-y-6">
                <div className="flex gap-1 text-teal-500 text-xs font-bold uppercase tracking-wide">
                  <span>Доказова медицина</span>
                </div>
                <p className="font-serif text-lg text-slate-700 italic">
                  «Наша мета — не просто тимчасово знизити цифру на вагах. Ми прагнемо допомогти пацієнту стабілізувати метаболізм, покращити якість життя та зберегти досягнутий успіх на довгі роки.»
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold font-serif text-sm">
                    ДМ
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">Рекомендації EMA</span>
                    <span className="text-[10px] text-slate-400 block">Європейське агентство з лікарських засобів</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Comparison Matrix Section */}
      <section id="comparison" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs uppercase font-bold tracking-wider text-violet-600">Порівняльний аналіз</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-teal-950 tracking-tight">
              Чим Мунджаро відрізняється від альтернатив?
            </h2>
            <p className="text-slate-600 text-sm">
              У сучасному медичному арсеналі найближчими сертифікованими альтернативами є препарати Wegovy та Saxenda. Нижче наведено об'єктивне порівняння їхніх характеристик.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-100 shadow-sm">
            <table className="w-full text-left border-collapse bg-white min-w-[700px]">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-900 font-serif text-sm">
                  <th className="p-6 font-bold">Характеристика</th>
                  <th className="p-6 font-bold text-teal-900 bg-teal-50/40 relative">
                    Мунджаро (Tirzepatide)
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-600 text-[9px] uppercase tracking-wider text-white px-2 py-0.5 rounded-full font-sans font-extrabold shadow-sm leading-none">
                      Нове покоління
                    </span>
                  </th>
                  <th className="p-6 font-bold text-slate-700">Wegovy (Semaglutide)</th>
                  <th className="p-6 font-bold text-slate-700">Saxenda (Liraglutide)</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm text-slate-600 divide-y divide-slate-100">
                <tr>
                  <td className="p-6 font-bold text-slate-900">Діюча речовина</td>
                  <td className="p-6 bg-teal-50/10 font-medium text-teal-950">Тирзепатид (Tirzepatide)</td>
                  <td className="p-6">Семаглутид (Semaglutide)</td>
                  <td className="p-6">Ліраглутид (Liraglutide)</td>
                </tr>
                <tr>
                  <td className="p-6 font-bold text-slate-900">Рецепторна дія</td>
                  <td className="p-6 bg-teal-50/10 font-medium text-teal-950 text-xs">
                    <span className="inline-flex items-center gap-1.5 text-teal-700 font-bold bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
                      Подвійна дія (GIP + GLP-1)
                    </span>
                  </td>
                  <td className="p-6">Одинарна дія (тільки GLP-1)</td>
                  <td className="p-6">Одинарна дія (тільки GLP-1)</td>
                </tr>
                <tr>
                  <td className="p-6 font-bold text-slate-900">Частота введення</td>
                  <td className="p-6 bg-teal-50/10 font-medium text-teal-950">
                    <span className="font-bold">1 раз на тиждень</span>
                  </td>
                  <td className="p-6">1 раз на тиждень</td>
                  <td className="p-6">Щодня (1 раз на добу)</td>
                </tr>
                <tr>
                  <td className="p-6 font-bold text-slate-900">Середня втрата ваги</td>
                  <td className="p-6 bg-teal-50/10 font-medium text-teal-950">
                    <strong className="text-teal-700 text-base">До 15% - 21%</strong> <span className="text-[10px] text-slate-400 block">(за 72 тижні клінічних досліджень)</span>
                  </td>
                  <td className="p-6">
                    <strong>До 12% - 15%</strong> <span className="text-[10px] text-slate-400 block">(за 68 тижнів)</span>
                  </td>
                  <td className="p-6">
                    <strong>До 8%</strong> <span className="text-[10px] text-slate-400 block">(за 56 тижнів)</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-6 font-bold text-slate-900">Режим адаптації</td>
                  <td className="p-6 bg-teal-50/10 font-medium text-teal-950 text-xs">М'який, завдяки синергії GIP, що нівелює нудоту</td>
                  <td className="p-6 text-xs">Потребує поступового збільшення дози</td>
                  <td className="p-6 text-xs">Потребує щоденного моніторингу симптомів</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-500 max-w-4xl mx-auto flex gap-3">
            <Info className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Об'єктивна довідка:</strong> Ми не порівнюємо препарати за принципом «кращий» чи «гірший». Дані наведені виключно для демонстрації відмінностей у механізмах та режимах застосування, щоб полегшити предметне обговорення відповідного варіанту безпосередньо з вашим лікарем.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section id="faq" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs uppercase font-bold tracking-wider text-teal-600">Професійна довідка</span>
            <h2 className="font-serif text-3xl font-bold text-teal-950 tracking-tight">
              Часті питання та відповіді
            </h2>
            <p className="text-slate-600 text-sm">
              Короткі та ємні відповіді на ключові питання щодо застосування препарату Мунджаро.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-6 flex justify-between items-center gap-4 text-slate-800 hover:text-teal-950 transition-colors"
                  >
                    <span className="font-serif font-bold text-sm sm:text-base">{faq.q}</span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-teal-50 text-teal-600 rotate-180' : 'bg-slate-50 text-slate-500'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-60 border-t border-slate-100/50' : 'max-h-0'}`}
                  >
                    <div className="p-6 text-sm text-slate-500 leading-relaxed bg-slate-50/30">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section id="consultation" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-800/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-800/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid lg:grid-cols-12 gap-12 p-8 md:p-16 relative z-10 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs uppercase font-bold tracking-wider text-teal-400">Індивідуальний підхід</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  Зробіть перший крок до керованого контролю ваги
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Залиште заявку на детальну консультацію. Лікар або спеціаліст-координатор зв'яжеться з вами найближчим часом, щоб уточнити деталі, розповісти про режим терапії та підказати ваші наступні медичні кроки.
                </p>
                
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-400 space-y-2">
                  <p><strong>Що ви отримаєте після відправлення форми?</strong></p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Детальне роз'яснення медичних вимог та протипоказань.</li>
                    <li>Інструкцію щодо проходження аналізів та вибору лікаря.</li>
                    <li>Допомогу в оцінці вашої сумісності за рекомендаціями EMA.</li>
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-6">
                {!formSubmitted ? (
                  <form onSubmit={handleFormSubmit} className="bg-white text-slate-800 p-8 rounded-3xl space-y-6 shadow-xl border border-slate-100">
                    <h3 className="font-serif text-xl font-bold text-teal-950">Запит на консультацію</h3>
                    
                    {formError && (
                      <div className="p-4 rounded-xl bg-red-50 text-red-600 text-xs font-semibold border border-red-100 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-2" htmlFor="name">
                          Ваше ім'я
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Олена Ковальчук"
                            className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm outline-none font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-2" htmlFor="phone">
                          Номер телефону
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+380"
                            className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm outline-none font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-xs text-slate-400 leading-snug">
                      <Lock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>Ваші персональні дані захищені та використовуються виключно для медичного консультування.</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all shadow-md shadow-teal-100 flex items-center justify-center gap-2"
                    >
                      <span>Хочу консультацію</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <div className="bg-white text-slate-800 p-8 sm:p-10 rounded-3xl text-center space-y-6 shadow-xl border border-slate-100 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-bold text-teal-950">Заявку успішно відправлено!</h3>
                      <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                        Дякуємо, <strong>{name}</strong>. Наш медичний координатор зв'яжеться з вами за номером <strong>{phone}</strong> найближчим часом.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-center">
                      <button
                        onClick={() => {
                          setFormSubmitted(false);
                          setName("");
                          setPhone("");
                        }}
                        className="text-xs font-bold text-teal-700 hover:text-teal-900"
                      >
                        Відправити ще одну заявку
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Disclaimers & Regulatory Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid md:grid-cols-12 gap-8 items-center border-b border-slate-800 pb-8">
            <div className="md:col-span-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-800 flex items-center justify-center text-teal-300">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <span className="font-serif text-base font-bold text-white block leading-none">Мунджаро</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 block mt-1">Доказова медицина</span>
              </div>
            </div>
            <div className="md:col-span-8 text-slate-500 text-[11px] leading-relaxed">
              Лендінг створено за стандартами доказової практики. Ми надаємо перевірені наукові факти для обговорення з вашим сімейним лікарем або ендокринологом. Мунджаро є виключно рецептурним препаратом.
            </div>
          </div>

          <div className="space-y-4 max-w-5xl leading-relaxed text-slate-500">
            <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Важлива медична інформація (Disclaimer):</h4>
            <p>
              Інформація, опублікована на цій сторінці, має суто інформаційний та просвітницький характер і за жодних умов не може використовуватися як медична порада, засіб самодіагностики чи керівництво до лікування.
            </p>
            <p>
              Мунджаро (Tirzepatide) є рецептурним препаратом. Призначення терапії, підбір індивідуального дозування, контроль сумісності з іншими препаратами та остаточна оцінка доцільності лікування здійснюється виключно дипломованим лікарем після проведення детального огляду, збору анамнезу та оцінки лабораторних аналізів.
            </p>
            <p>
              Застосування препарату пов'язане з можливими побічними ефектами, зокрема, з боку травної (шлунково-кишкової) системи. Будь ласка, перед початком використання обов'язково ознайомтеся з офіційною інструкцією до препарату та проконсультуйтеся із сертифікованим фахівцем.
            </p>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-600">
            <span>© 2026 Мунджаро Інфо. Всі права захищено.</span>
            <div className="flex gap-4">
              <a href="#about" className="hover:text-slate-400">Про препарат</a>
              <a href="#comparison" className="hover:text-slate-400">Порівняння</a>
              <a href="#faq" className="hover:text-slate-400">Запитання</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
