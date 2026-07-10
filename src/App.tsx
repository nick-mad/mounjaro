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
  Heart,
  Menu,
  X,
  Dumbbell
} from "lucide-react";

// Structure for FAQs
const FAQS = [
  {
    q: "Чи можна починати самостійно?",
    a: "Ні. Це рецептурний препарат, тому рішення про доцільність та початок терапії приймає виключно кваліфікований лікар після оцінки вашого стану здоров'я та аналізів за стандартами EMA (European Medicines Agency)."
  },
  {
    q: "Як часто вводиться препарат?",
    a: "Раз на тиждень. Одна проста щотижнева ін'єкція значно спрощує планування порівняно зі щоденними засобами."
  },
  {
    q: "Які найчастіші побічні ефекти?",
    a: "Найчастіше це нудота, діярея, інколи закреп і блювання; зазвичай вони пов’язані з ШКТ і частіше з’являються під час зміни дози препарату, поступово минаючи в процесі адаптації."
  },
  {
    q: "Чи підходить, якщо є інші ліки?",
    a: "Це має оцінити лікар, бо сумісність залежить від конкретного лікування й поточного стану пацієнта."
  },
  {
    q: "Чи потрібно дотримуватися дієти?",
    a: "Так, препарат застосовується разом із збалансованою дієтою та помірною фізичною активністю для досягнення стійкого результату."
  }
];

// Suitability Test Questions based on PDF
const TEST_QUESTIONS = [
  {
    id: 1,
    question: "Чи помічаєте ви за собою хаотичні думки про їжу або раптові зриви після дієт?",
    options: [
      { text: "Так, постійно думаю про їжу та зриваюся", value: "high" },
      { text: "Іноді важко контролювати апетит ввечері", value: "medium" },
      { text: "Ні, спокійно та легко контролюю порції", value: "low" }
    ]
  },
  {
    id: 2,
    question: "Чи поверталася до вас вага після попередніх спроб схуднення?",
    options: [
      { text: "Так, щоразу повертається ще більше кілограмів", value: "high" },
      { text: "Вага коливається в межах 5-10 кг", value: "medium" },
      { text: "Ні, стабільно утримує бажану форму", value: "low" }
    ]
  },
  {
    id: 3,
    question: "Які фізичні симптоми зайвої ваги ви відчуваєте найчастіше?",
    options: [
      { text: "Втому від мінімального навантаження, біль у суглобах або задишку", value: "high" },
      { text: "Помірну втому в кінці активного робочого дня", value: "medium" },
      { text: "Почуваюся бадьоро, фізичних обмежень немає", value: "low" }
    ]
  }
];

export default function App() {
  // Mobile Menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Suitability test state
  const [testStep, setTestStep] = useState(0);
  const [testScore, setTestScore] = useState<string[]>([]);
  const [testResultVisible, setTestResultVisible] = useState(false);

  // Consultation form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [wantsConsultation, setWantsConsultation] = useState(true);
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
    const cleanPhone = phone.replace(/\D/g, "");
    if (!phone.trim() || cleanPhone.length < 9) {
      setFormError("Введіть коректний номер телефону (мінімум 9 цифр)");
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
        title: "Висока відповідність терапії",
        desc: "Ваші симптоми (боротьба з апетитом, повернення ваги, швидка втомлюваність) вказують на хронічний характер проблеми, яка складно піддається лише силовим зусиллям. Інноваційний механізм Мунджаро (GIP + GLP-1) може стати вирішальним медичним інструментом для безпечного утримання дефіциту калорій та стабілізації ваги під наглядом лікаря.",
        badgeColor: "bg-violet-100 text-violet-950 border-violet-200"
      };
    } else if (lowCount >= 2) {
      return {
        title: "Профілактична відповідність",
        desc: "Ваші харчові звички та вага відносно стабільні. Застосування серйозної медикаментозної терапії може не бути першочерговою необхідністю. Проте, індивідуальна консультація з кваліфікованим лікарем допоможе краще зрозуміти метаболічні процеси та налаштувати харчування.",
        badgeColor: "bg-teal-50 text-teal-950 border-teal-200"
      };
    } else {
      return {
        title: "Помірна відповідність",
        desc: "Ви стикаєтеся з періодичними труднощами під час схуднення. Мунджаро може розглядатися як дієва підтримка на шляху до відновлення форми. Рекомендуємо обговорити медичний супровід та сумісність з лікарем, щоб вибудувати надійний план.",
        badgeColor: "bg-slate-100 text-slate-950 border-slate-200"
      };
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-teal-200 selection:text-teal-950">
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div 
              onClick={() => scrollToSection("hero")} 
              className="flex items-center gap-3 cursor-pointer group"
              id="nav-logo"
            >
              <div className="w-10 h-10 rounded-full bg-violet-950 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform duration-300">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold text-violet-950 block tracking-tight">Мунджаро</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block -mt-0.5">Доказова Медицина</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <button onClick={() => scrollToSection("diagnostics")} className="hover:text-violet-950 transition-colors cursor-pointer">Впізнаєте себе?</button>
              <button onClick={() => scrollToSection("how-it-works")} className="hover:text-violet-950 transition-colors cursor-pointer">Як працює</button>
              <button onClick={() => scrollToSection("results")} className="hover:text-violet-950 transition-colors cursor-pointer">Результати</button>
              <button onClick={() => scrollToSection("comparison")} className="hover:text-violet-950 transition-colors cursor-pointer">Чим відрізняється</button>
              <button onClick={() => scrollToSection("faq")} className="hover:text-violet-950 transition-colors cursor-pointer">Питання</button>
              
              <button 
                onClick={() => scrollToSection("consultation")}
                className="h-11 px-6 bg-teal-400 hover:bg-teal-500 text-teal-950 font-bold rounded-xl transition-all text-xs tracking-wide uppercase flex items-center gap-1.5 shadow-sm shadow-teal-100"
              >
                <span>Консультація</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-violet-950 transition-colors"
                id="mobile-menu-btn"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-3 shadow-lg absolute w-full left-0 animate-fade-in">
            <button 
              onClick={() => scrollToSection("diagnostics")} 
              className="block w-full text-left py-2.5 px-4 rounded-xl text-slate-700 hover:bg-slate-50 font-medium"
            >
              Впізнаєте себе?
            </button>
            <button 
              onClick={() => scrollToSection("how-it-works")} 
              className="block w-full text-left py-2.5 px-4 rounded-xl text-slate-700 hover:bg-slate-50 font-medium"
            >
              Як працює
            </button>
            <button 
              onClick={() => scrollToSection("results")} 
              className="block w-full text-left py-2.5 px-4 rounded-xl text-slate-700 hover:bg-slate-50 font-medium"
            >
              Результати
            </button>
            <button 
              onClick={() => scrollToSection("comparison")} 
              className="block w-full text-left py-2.5 px-4 rounded-xl text-slate-700 hover:bg-slate-50 font-medium"
            >
              Чим відрізняється
            </button>
            <button 
              onClick={() => scrollToSection("faq")} 
              className="block w-full text-left py-2.5 px-4 rounded-xl text-slate-700 hover:bg-slate-50 font-medium"
            >
              Питання
            </button>
            
            <div className="pt-2">
              <button 
                onClick={() => scrollToSection("consultation")}
                className="w-full h-12 bg-teal-400 hover:bg-teal-500 text-teal-950 font-bold rounded-xl transition-all text-sm flex items-center justify-center gap-2"
              >
                <span>Отримати консультацію</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Split Screen layout */}
      <section id="hero" className="relative pt-20 overflow-hidden bg-medical-gradient lg:min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-8 text-left z-10">
              
              <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-950 px-3 py-1.5 rounded-full border border-violet-100 text-xs font-semibold tracking-wide">
                <Sparkles className="w-4 h-4 text-teal-500 shrink-0" />
                <span>Нова ера медичного контролю ваги</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-violet-950 tracking-tight leading-[1.1]" id="hero-title">
                Мінус 10–25 кг без виснажливих дієт та постійного відчуття голоду
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
                Контроль ваги під наглядом лікаря з використанням сучасних міжнародних протоколів лікування зайвої ваги. Почніть шлях до нового самопочуття без щохвилинної боротьби з апетитом.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button 
                  onClick={() => scrollToSection("test-section")}
                  className="h-14 px-8 bg-teal-400 hover:bg-teal-500 text-teal-950 font-bold rounded-2xl transition-all flex items-center justify-center gap-2.5 text-sm uppercase tracking-wider shadow-lg shadow-teal-200/50"
                >
                  <span>Дізнатися, чи підходить вам</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => scrollToSection("consultation")}
                  className="h-14 px-8 bg-white hover:bg-slate-50 text-violet-950 font-bold rounded-2xl transition-all border border-slate-200 flex items-center justify-center gap-2 text-sm shadow-xs"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Записатися до лікаря</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100 max-w-lg">
                <div>
                  <span className="block text-2xl font-bold text-violet-950">EMA</span>
                  <span className="block text-[11px] text-slate-500 mt-1">Сертифіковані стандарти терапії</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold text-violet-950">GIP/GLP-1</span>
                  <span className="block text-[11px] text-slate-500 mt-1">Подвійна синергія гормонів</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold text-violet-950">1 раз</span>
                  <span className="block text-[11px] text-slate-500 mt-1">на тиждень замість щоденної рутини</span>
                </div>
              </div>

            </div>

            {/* Right Image Column - Beautiful Full Split Visual */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80" 
                  alt="Healthy wellness life weight loss confidence" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Accent Layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-violet-950/40 via-transparent to-transparent"></div>
                
                {/* Floating Success Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-100/50 max-w-md hidden sm:block animate-fade-in">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center text-violet-950 shrink-0">
                      <ShieldCheck className="w-6 h-6 text-teal-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-violet-950 text-sm">Турбота та доказовість</h4>
                      <p className="text-xs text-slate-500 mt-1">Оригінальна методика контролю метаболізму без стресу для нервової системи та жорстких голодувань.</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Decorative Background Glows */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-teal-200/30 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-violet-200/20 rounded-full blur-3xl -z-10"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Diagnostics Section: "Впізнаєте себе?" */}
      <section id="diagnostics" className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Strong emotional image */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-square sm:aspect-[4/3] lg:aspect-square bg-white border border-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1000&q=80" 
                  alt="Reflecting on weight loss struggle looking in mirror" 
                  className="w-full h-full object-cover filter grayscale-20 contrast-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                
                {/* Image overlay caption */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-teal-300">Психологічний аспект</span>
                  <p className="text-base font-medium leading-snug">
                    Постійний фокус на цифрах та почуття провини виснажують ваш ресурс.
                  </p>
                </div>
              </div>
              
              {/* Background accent ring */}
              <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-violet-100/60 rounded-full -z-10"></div>
            </div>

            {/* Right Column: Structured list */}
            <div className="lg:col-span-6 space-y-8" id="recognize-self">
              <div className="space-y-4">
                <span className="text-xs uppercase font-bold tracking-wider text-violet-600 block">Пройдіть самоперевірку</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-violet-950 tracking-tight">
                  Впізнаєте себе?
                </h2>
                <p className="text-slate-600 text-base leading-relaxed">
                  Подивіться чесно на свій щоденний стан. Чи знайомі вам ці ситуації?
                </p>
              </div>

              {/* Checklist Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex gap-3.5 items-start">
                  <div className="w-6 h-6 rounded-full bg-violet-50 text-violet-950 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold font-mono">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-violet-950 text-sm">Постійні думки</h4>
                    <p className="text-xs text-slate-500 mt-1">«Постійно думаю про їжу» — мозок шукає швидкого задоволення.</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex gap-3.5 items-start">
                  <div className="w-6 h-6 rounded-full bg-violet-50 text-violet-950 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold font-mono">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-violet-950 text-sm">Замкнене коло зривів</h4>
                    <p className="text-xs text-slate-500 mt-1">«Зриваюся після чергової дієти» через виснажливе обмеження.</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex gap-3.5 items-start">
                  <div className="w-6 h-6 rounded-full bg-violet-50 text-violet-950 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold font-mono">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-violet-950 text-sm">Ефект гойдалок</h4>
                    <p className="text-xs text-slate-500 mt-1">«Вага повертається після схуднення» з надлишком.</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex gap-3.5 items-start">
                  <div className="w-6 h-6 rounded-full bg-violet-50 text-violet-950 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold font-mono">4</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-violet-950 text-sm">Втрата тонусу</h4>
                    <p className="text-xs text-slate-500 mt-1">«Втомлююся навіть від невеликого навантаження» впродовж дня.</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex gap-3.5 items-start">
                  <div className="w-6 h-6 rounded-full bg-violet-50 text-violet-950 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold font-mono">5</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-violet-950 text-sm">Невпевненість</h4>
                    <p className="text-xs text-slate-500 mt-1">«Соромлюся свого тіла» при виборі одягу чи під час спілкування.</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex gap-3.5 items-start">
                  <div className="w-6 h-6 rounded-full bg-violet-50 text-violet-950 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold font-mono">6</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-violet-950 text-sm">Зниження здоров'я</h4>
                    <p className="text-xs text-slate-500 mt-1">«Аналізи стають гіршими щороку» — холестерин, тиск чи цукор.</p>
                  </div>
                </div>

              </div>

              {/* Core Message Statement */}
              <div className="bg-violet-950 text-white p-6 rounded-2xl space-y-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-teal-400 shrink-0" />
                  <span className="text-xs uppercase font-bold tracking-wider text-teal-300">Важливе усвідомлення</span>
                </div>
                <h4 className="font-bold text-lg">Якщо ви хоча б тричі впізнали себе — ви не самотні</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  За сучасними медичними даними, ожиріння — це не слабкість характеру, не відсутність волі, а складне хронічне захворювання. Воно потребує професійного лікування так само, як гіпертонія чи цукровий діабет.
                </p>
              </div>

              <div className="flex justify-start">
                <button 
                  onClick={() => scrollToSection("test-section")}
                  className="h-12 px-6 bg-teal-400 hover:bg-teal-500 text-teal-950 font-bold rounded-xl transition-all text-xs tracking-wider uppercase flex items-center gap-2"
                >
                  <span>Пройти тест на сумісність</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Interactive Suitability Test Widget */}
      <section id="test-section" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs uppercase font-bold tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100 inline-block">
              Інтерактивний асистент
            </span>
            <h2 className="text-3xl font-extrabold text-violet-950 tracking-tight">
              Експрес-тест: Чи підходить вам терапія Мунджаро?
            </h2>
            <p className="text-slate-600 text-sm max-w-lg mx-auto">
              Дайте відповідь на 3 простих питання, щоб визначити ступінь сумісності терапії з вашим поточним життєвим ритмом та симптомами.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
            
            {/* Background geometric element */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-violet-100/40 rounded-full blur-2xl"></div>

            {!testResultVisible ? (
              <div className="space-y-6 relative z-10">
                {/* Stepper Progress Bar */}
                <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                  <span>Крок {testStep + 1} з {TEST_QUESTIONS.length}</span>
                  <span>{Math.round(((testStep + 1) / TEST_QUESTIONS.length) * 100)}% виконано</span>
                </div>
                
                {/* Outer bar */}
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-violet-950 rounded-full transition-all duration-300" 
                    style={{ width: `${((testStep + 1) / TEST_QUESTIONS.length) * 100}%` }}
                  ></div>
                </div>

                {/* Question Text */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-violet-950 leading-snug">
                    {TEST_QUESTIONS[testStep].question}
                  </h3>
                  
                  {/* Options List */}
                  <div className="space-y-3 pt-2">
                    {TEST_QUESTIONS[testStep].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTestAnswer(option.value)}
                        className="w-full text-left p-5 rounded-2xl bg-white border border-slate-200 hover:border-violet-300 hover:bg-violet-50/20 active:bg-violet-50 transition-all flex justify-between items-center group cursor-pointer"
                      >
                        <span className="text-slate-700 text-sm sm:text-base font-medium group-hover:text-violet-950 transition-colors">
                          {option.text}
                        </span>
                        <div className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center shrink-0 group-hover:border-violet-600 group-hover:bg-violet-600 text-white transition-all">
                          <Check className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8 relative z-10 text-center py-4 animate-fade-in">
                
                <div className="w-16 h-16 rounded-full bg-teal-500/10 text-teal-600 flex items-center justify-center mx-auto border border-teal-200 shadow-xs">
                  <ClipboardCheck className="w-8 h-8" />
                </div>

                <div className="space-y-3">
                  <div className={`inline-block px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${getRecommendation().badgeColor}`}>
                    {getRecommendation().title}
                  </div>
                  <h3 className="text-2xl font-extrabold text-violet-950">Аналіз вашого профілю завершено</h3>
                  <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                    {getRecommendation().desc}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 max-w-xl mx-auto text-left space-y-3 shadow-xs">
                  <h4 className="font-bold text-violet-950 text-xs uppercase tracking-wider">Наступний рекомендований крок:</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Препарат відпускається строго за рецептом. Щоб підтвердити доцільність лікування, виключити протипоказання та отримати індивідуальну схему дозування, залиште запит на консультацію з нашим фахівцем.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                  <button
                    onClick={() => scrollToSection("consultation")}
                    className="h-12 px-8 bg-teal-400 hover:bg-teal-500 text-teal-950 font-bold rounded-xl transition-all text-xs tracking-wider uppercase flex items-center justify-center gap-2"
                  >
                    <span>Записатися на консультацію</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={resetTest}
                    className="h-12 px-6 bg-white hover:bg-slate-100 text-slate-600 font-semibold rounded-xl transition-all border border-slate-200 text-xs"
                  >
                    Пройти тест спочатку
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      </section>

      {/* How Medication works Section */}
      <section id="how-it-works" className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs uppercase font-bold tracking-wider text-violet-600 block">Наукове обґрунтування</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-violet-950 tracking-tight">
              Як працює сучасна медикаментозна терапія контролю ваги
            </h2>
            <p className="text-slate-600 text-base">
              Організм людини регулює масу тіла за допомогою складних гормональних ланцюжків. Нове покоління препаратів допомагає вирівняти фізіологічні сигнали ситості та голоду.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Box: Mechanism list */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-violet-950">
                Лікування за допомогою сучасних пептидів допомагає:
              </h3>
              
              <div className="space-y-4">
                
                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-950 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-violet-950 text-sm">Швидше насичуватися</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Відчуття ситості приходить значно швидше, запобігаючи переїданню.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-950 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-violet-950 text-sm">Довше не відчувати голод</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Препарат уповільнює спорожнення шлунка, забезпечуючи тривале почуття комфорту.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-950 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-violet-950 text-sm">Зменшити потяг до їжі</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Мириться з хаотичним голодом більше не потрібно — ви повністю контролюєте думки про їжу.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-950 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-violet-950 text-sm">Контролювати розмір порцій</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Звикання до здорових обсягів їжі формується природно та без стресу.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-950 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-violet-950 text-sm">Поступово знижувати вагу</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Вага знижується стабільно та без шкоди для загального самопочуття.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Box: What is Mounjaro scientific details */}
            <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
              
              <div className="inline-block px-3 py-1 rounded-full bg-violet-50 text-violet-950 border border-violet-100 text-xs font-semibold">
                Що таке «Мунджаро»?
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                <strong>Мунджаро</strong> — це препарат у вигляді розчину для ін'єкцій у зручній шприц-ручці. Він діє через подвійний біологічний механізм <strong>GLP-1</strong> і <strong>GIP</strong>, допомагаючи зменшити апетит і надійно підтримувати контроль ваги разом із здоровою дієтою та помірною фізичною активністю.
              </p>

              <div className="border-t border-slate-100 pt-6">
                <span className="block text-xs uppercase font-bold tracking-wider text-violet-600 mb-3">Як це працює простими словами:</span>
                
                <div className="p-4 rounded-2xl bg-violet-50 border border-violet-100 text-violet-950 text-xs font-medium space-y-2">
                  <p className="italic">
                    «Менше хаотичного апетиту → простіше дотримуватись індивідуального плану → більше шансів на стабільний контроль ваги та здорове утримання результату»
                  </p>
                </div>
              </div>

              {/* Clinical image */}
              <div className="relative h-44 rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80" 
                  alt="Clinical laboratory syringe medicine" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-950/40 to-transparent"></div>
                <div className="absolute bottom-3 left-4 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-teal-300">Сертифіковано в ЄС</span>
                  <p className="text-xs font-bold">Оригінальна технологія KwikPen® для точного введення</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Results Section: 3, 6, 12 Months Cards */}
      <section id="results" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs uppercase font-bold tracking-wider text-teal-600 block">Чого очікувати</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-violet-950 tracking-tight">
              Яких результатів можна очікувати на практиці?
            </h2>
            <p className="text-slate-600 text-base">
              Програма терапії розрахована на плавне та безпечне відновлення обмінних процесів. Ми виділяємо три ключові етапи.
            </p>
          </div>

          {/* Three Modern Cards with generous padding and subtle color accents */}
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Card 1: 3 Months */}
            <div className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-xs relative overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-300">
              {/* Light accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-teal-400"></div>

              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-950 flex items-center justify-center font-bold text-lg">
                    3м
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600 bg-white px-2.5 py-1 rounded-full border border-slate-100">
                    Перший етап
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-violet-950">Через 3 місяці:</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Перший крок до перебудови звичок. Організм пристосовується до легкого споживання їжі без занепокоєння.
                  </p>
                </div>

                {/* Bullets with styled checkmarks */}
                <div className="space-y-3.5 pt-2 border-t border-slate-200/60">
                  <div className="flex gap-2.5 items-center">
                    <div className="w-5 h-5 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">перші помітні зміни на вагах</span>
                  </div>
                  
                  <div className="flex gap-2.5 items-center">
                    <div className="w-5 h-5 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">суттєво менший апетит</span>
                  </div>

                  <div className="flex gap-2.5 items-center">
                    <div className="w-5 h-5 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">легше контролювати харчування</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>Очікуване зниження ваги</span>
                <span className="text-teal-700 font-bold">-5% — -8%</span>
              </div>
            </div>

            {/* Card 2: 6 Months */}
            <div className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-xs relative overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-300">
              {/* Light accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-violet-600"></div>

              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-950 flex items-center justify-center font-bold text-lg">
                    6м
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-violet-600 bg-white px-2.5 py-1 rounded-full border border-slate-100">
                    Активна фаза
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-violet-950">Через 6 місяців:</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Стабілізація метаболічних сигналів та відчутна легкість у рухах. Енергетичні резерви організму відновлюються.
                  </p>
                </div>

                {/* Bullets */}
                <div className="space-y-3.5 pt-2 border-t border-slate-200/60">
                  <div className="flex gap-2.5 items-center">
                    <div className="w-5 h-5 rounded-full bg-violet-50 text-violet-700 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">суттєве зниження ваги</span>
                  </div>
                  
                  <div className="flex gap-2.5 items-center">
                    <div className="w-5 h-5 rounded-full bg-violet-50 text-violet-700 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">значно більше щоденної енергії</span>
                  </div>

                  <div className="flex gap-2.5 items-center">
                    <div className="w-5 h-5 rounded-full bg-violet-50 text-violet-700 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">значне покращення самопочуття</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>Очікуване зниження ваги</span>
                <span className="text-violet-700 font-bold">-10% — -15%</span>
              </div>
            </div>

            {/* Card 3: 12 Months */}
            <div className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-xs relative overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-300">
              {/* Light accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-violet-950"></div>

              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-violet-950 text-teal-400 flex items-center justify-center font-bold text-lg">
                    12м
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-violet-950 bg-white px-2.5 py-1 rounded-full border border-slate-100">
                    Закріплення
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-violet-950">Через 12 місяців:</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Новий спосіб життя стає вашою абсолютною нормою. Тіло повністю адаптувалося до оновленого здорового балансу.
                  </p>
                </div>

                {/* Bullets */}
                <div className="space-y-3.5 pt-2 border-t border-slate-200/60">
                  <div className="flex gap-2.5 items-center">
                    <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">стабільний результат та плато</span>
                  </div>
                  
                  <div className="flex gap-2.5 items-center">
                    <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">нові стійкі харчові звички</span>
                  </div>

                  <div className="flex gap-2.5 items-center">
                    <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">суттєво вища загальна якість життя</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>Очікуване зниження ваги</span>
                <span className="text-slate-900 font-bold">-15% — -25%</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Comparison Section: "Чим Мунджаро відрізняється від альтернатив" */}
      <section id="comparison" className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs uppercase font-bold tracking-wider text-violet-600 block">Медичний контекст</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-violet-950 tracking-tight">
              Чим «Мунджаро» відрізняється від альтернатив?
            </h2>
            <p className="text-slate-600 text-base">
              У категорії сучасних засобів для регуляції ваги існують різні класи речовин. Ознайомтеся з об'єктивними науковими розбіжностями на базі звітів EMA.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content column: text from PDF */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-950 text-xs font-semibold border border-teal-100">
                Порівняльний аналіз
              </div>

              <h3 className="text-2xl font-bold text-violet-950 leading-snug">
                Подвійний вплив на рецептори — головна перевага
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                У цій категорії найближчими альтернативами є <strong>Wegovy</strong> (семаглутид) і <strong>Saxenda</strong> (ліраглутид). 
              </p>

              <p className="text-slate-600 text-sm leading-relaxed">
                За даними EMA, Wegovy — це семаглутид із введенням <strong>1 раз на тиждень</strong>, а Saxenda — ліраглутид із <strong>щоденним введенням</strong>.
              </p>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/60 space-y-3">
                <h4 className="font-bold text-sm text-violet-950">Науковий факт:</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong>Мунджаро</strong> містить <strong>тирзепатид</strong> і працює одночасно через два рецептори: <strong>GLP-1 + GIP</strong>, тоді як Wegovy і Saxenda впливають виключно через один рецептор <strong>GLP-1</strong>. Це зручна та науково коректна відмінність.
                </p>
              </div>
            </div>

            {/* Right: Comparative Visual Grid */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Product 1: Mounjaro (Hero) */}
              <div className="bg-white p-6 rounded-3xl border-2 border-violet-950 shadow-md relative overflow-hidden">
                <div className="absolute right-0 top-0 bg-violet-950 text-teal-400 font-bold text-[10px] uppercase tracking-wider px-4 py-1.5 rounded-bl-xl">
                  Передова формула
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-violet-950">Мунджаро <span className="text-xs font-normal text-slate-500">(Tirzepatide)</span></h4>
                    <p className="text-xs text-slate-500 mt-1">Подвійний агоніст рецепторів GIP та GLP-1</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <span className="text-[10px] font-bold bg-violet-50 text-violet-950 px-2.5 py-1 rounded-md border border-violet-100">
                      1 раз / тиждень
                    </span>
                    <span className="text-[10px] font-bold bg-teal-50 text-teal-950 px-2.5 py-1 rounded-md border border-teal-100">
                      Подвійний ефект
                    </span>
                  </div>
                </div>
                
                {/* Detail bars */}
                <div className="grid grid-cols-3 gap-4 pt-4 mt-4 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Речовина</span>
                    <span className="font-bold text-violet-950 mt-0.5 block">Тирзепатид</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Механізм</span>
                    <span className="font-bold text-violet-950 mt-0.5 block">GLP-1 + GIP</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Ефективність</span>
                    <span className="font-bold text-teal-700 mt-0.5 block">Максимальна за EMA</span>
                  </div>
                </div>
              </div>

              {/* Product 2: Wegovy */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-slate-700">Wegovy <span className="text-xs font-normal text-slate-400">(Semaglutide)</span></h4>
                    <p className="text-xs text-slate-400 mt-0.5">Одинарний агоніст рецепторів GLP-1</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <span className="text-[10px] font-bold bg-slate-50 text-slate-500 px-2.5 py-1 rounded-md border border-slate-200">
                      1 раз / тиждень
                    </span>
                    <span className="text-[10px] font-bold bg-slate-50 text-slate-500 px-2.5 py-1 rounded-md border border-slate-200">
                      Один рецептор
                    </span>
                  </div>
                </div>
              </div>

              {/* Product 3: Saxenda */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-slate-700">Saxenda <span className="text-xs font-normal text-slate-400">(Liraglutide)</span></h4>
                    <p className="text-xs text-slate-400 mt-0.5">Одинарний агоніст рецепторів GLP-1 з щоденним введенням</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <span className="text-[10px] font-bold bg-slate-50 text-slate-500 px-2.5 py-1 rounded-md border border-slate-200">
                      Щодня
                    </span>
                    <span className="text-[10px] font-bold bg-slate-50 text-slate-500 px-2.5 py-1 rounded-md border border-slate-200">
                      Один рецептор
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Slogan Banner */}
      <section className="py-16 bg-violet-950 text-white relative overflow-hidden">
        {/* Abstract graphics */}
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute left-10 top-0 w-64 h-64 bg-violet-800/20 rounded-full blur-3xl"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
          <span className="text-xs uppercase font-bold tracking-widest text-teal-400">Шанс на зміни</span>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-light leading-relaxed max-w-4xl mx-auto text-slate-100">
            «Можливо, це ваша <strong className="font-extrabold text-white">остання невдала спроба</strong> схуднути. <br className="hidden sm:inline" />І перша — яка дійсно <span className="text-teal-300 font-bold underline decoration-teal-400">дасть стійкий результат</span>.»
          </p>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Запишіться на детальну консультацію та дізнайтеся, чи підходить вам сучасна міжнародна програма медичного контролю ваги.
          </p>
          
          <div className="pt-4">
            <button 
              onClick={() => scrollToSection("consultation")}
              className="h-14 px-8 bg-teal-400 hover:bg-teal-500 text-teal-950 font-bold rounded-2xl transition-all text-sm uppercase tracking-wider shadow-lg shadow-teal-500/20"
            >
              Залишити запит на консультацію
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase font-bold tracking-wider text-teal-600 block">Медична довідка</span>
            <h2 className="text-3xl font-extrabold text-violet-950 tracking-tight">
              Питання та відповіді
            </h2>
            <p className="text-slate-600 text-sm">
              Відповіді на поширені питання пацієнтів відповідно до рекомендацій та офіційних матеріалів регуляторів.
            </p>
          </div>

          {/* JS Interactive Accordion */}
          <div className="space-y-4" id="faq-accordion">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-slate-50 border border-slate-150 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-6 flex justify-between items-center gap-4 text-slate-800 hover:text-violet-950 transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-sm sm:text-base text-violet-950">{faq.q}</span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${isOpen ? 'bg-violet-950 text-teal-400 rotate-180' : 'bg-slate-200 text-slate-600'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/40 pt-4 bg-white animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Consultation / Feedback Form Section */}
      <section id="consultation" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-12">
              
              {/* Left Column: Form Info */}
              <div className="lg:col-span-6 bg-violet-950 text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute right-0 bottom-0 w-84 h-84 bg-teal-500/10 rounded-full blur-3xl"></div>

                <div className="space-y-6 relative z-10">
                  <span className="text-xs uppercase font-bold tracking-widest text-teal-300">Індивідуальний підхід</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    Зробіть перший крок до керованого контролю ваги
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Залиште заявку на безкоштовний дзвінок-консультацію. Наш медичний спеціаліст допоможе розібратися, чи є цей варіант терапії оптимальним у вашій життєвій ситуації, та відповість на всі організаційні запитання.
                  </p>
                </div>

                <div className="space-y-4 pt-10 relative z-10 border-t border-slate-800 mt-8">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-violet-900/50 flex items-center justify-center text-teal-300 shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Лікар або менеджер зв'яжеться</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Щоб уточнити ваші деталі, відповісти на запитання та підказати правильний наступний крок.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-violet-900/50 flex items-center justify-center text-teal-300 shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Повна конфіденційність</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Ваша медична інформація та контактні дані захищені відповідно до стандартів лікарської таємниці.</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Actual Feedback Form */}
              <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                {!formSubmitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-6" id="consultation-form">
                    
                    <div className="space-y-2">
                      <h3 className="text-2xl font-extrabold text-violet-950">Форма консультації</h3>
                      <p className="text-slate-500 text-xs sm:text-sm">
                        Зробіть перший крок до керованого контролю ваги та отримайте консультацію щодо можливості терапії.
                      </p>
                    </div>

                    {formError && (
                      <div className="p-4 rounded-xl bg-red-50 text-red-600 text-xs font-semibold border border-red-100 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Name input */}
                      <div>
                        <label htmlFor="user-name" className="block text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">
                          Ім'я
                        </label>
                        <div className="relative">
                          <input
                            id="user-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Введіть ваше ім'я"
                            className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-violet-600 focus:border-violet-600 transition-all"
                          />
                        </div>
                      </div>

                      {/* Phone input */}
                      <div>
                        <label htmlFor="user-phone" className="block text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">
                          Телефон
                        </label>
                        <div className="relative">
                          <input
                            id="user-phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+380 (__) ___-__-__"
                            className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-violet-600 focus:border-violet-600 transition-all"
                          />
                        </div>
                      </div>

                      {/* Checkbox "Хочу консультацію" required by PDF */}
                      <div className="pt-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={wantsConsultation}
                            onChange={(e) => setWantsConsultation(e.target.checked)}
                            className="w-4 h-4 text-violet-950 bg-slate-50 border-slate-200 rounded focus:ring-violet-600 shrink-0 mt-0.5"
                          />
                          <span className="text-xs text-slate-600 font-medium">
                            Я хочу отримати консультацію та ознайомитися з можливими варіантами терапії.
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full h-14 bg-teal-400 hover:bg-teal-500 text-teal-950 font-extrabold rounded-2xl transition-all shadow-lg shadow-teal-100 flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
                        id="submit-btn"
                      >
                        <span>Хочу консультацію</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                      Залиште заявку, щоб отримати консультацію, інструкцію та зрозуміти, чи може цей варіант бути доречним саме у вашій ситуації.
                    </p>

                  </form>
                ) : (
                  <div className="text-center space-y-6 py-6 animate-fade-in">
                    
                    <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-violet-950">Заявку успішно відправлено!</h3>
                      <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                        Дякуємо, <strong>{name}</strong>. Наш медичний координатор зв'яжеться з вами за номером <strong>{phone}</strong> найближчим часом, щоб розібрати доцільність терапії Мунджаро у вашому випадку.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-center">
                      <button
                        onClick={() => {
                          setFormSubmitted(false);
                          setName("");
                          setPhone("");
                        }}
                        className="text-xs font-bold text-violet-600 hover:text-violet-950"
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
                <span className="text-base font-bold text-white block leading-none">Мунджаро</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 block mt-1">Доказова медицина</span>
              </div>
            </div>
            <div className="md:col-span-8 text-slate-500 text-[11px] leading-relaxed">
              Лендінг створено за стандартами доказової практики. Ми надаємо перевірені наукові факти для обговорення з вашим сімейним лікарем або ендокринологом. Мунджаро є виключно рецептурним препаратом.
            </div>
          </div>

          <div className="space-y-4 max-w-5xl leading-relaxed text-slate-500" id="regulatory-disclaimer">
            <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Важлива медична інформація (Disclaimer):</h4>
            <p>
              Інформація на сторінці не є медичною порадою. Мунджаро є рецептурним препаратом. Застосування, дозування, сумісність з іншими ліками та доцільність терапії визначає лише лікар. Можливі побічні реакції, зокрема з боку травної системи. Перед застосуванням ознайомтесь з інструкцією та зверніться до фахівця.
            </p>
            <p>
              Призначення терапії, підбір індивідуального дозування, контроль сумісності з іншими препаратами та остаточна оцінка доцільності лікування здійснюється виключно дипломованим лікарем після проведення детального огляду, збору анамнезу та оцінки лабораторних аналізів.
            </p>
            <p>
              Застосування препарату пов'язане з можливими побічними ефектами, зокрема, з боку травної (шлунково-кишкової) системи. Будь ласка, перед початком використання обов'язково ознайомтеся з офіційною інструкцією до препарату та проконсультуйтеся із сертифікованим фахівцем.
            </p>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-600">
            <span>© 2026 Мунджаро Інфо. Всі права захищено.</span>
            <div className="flex gap-4">
              <button onClick={() => scrollToSection("diagnostics")} className="hover:text-slate-400">Про препарат</button>
              <button onClick={() => scrollToSection("comparison")} className="hover:text-slate-400">Порівняння</button>
              <button onClick={() => scrollToSection("faq")} className="hover:text-slate-400">Запитання</button>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
