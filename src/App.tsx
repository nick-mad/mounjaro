import React, {useState} from "react";
import {AnimatePresence, motion} from "motion/react";
import {
    AlertCircle,
    ArrowRight,
    Check,
    ChevronDown,
    ChevronUp,
    Clock,
    FileText,
    Phone,
    Scale,
    Stethoscope,
    User
} from "lucide-react";

export default function App() {
    // State for FAQ accordion
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // State for form fields
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [wantConsultation, setWantConsultation] = useState(true);

    // State for form submission
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Smooth scroll handler
    const scrollToForm = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        const target = document.getElementById("consultation-form-section");
        if (target) {
            target.scrollIntoView({behavior: "smooth", block: "start"});
        }
    };

    // Toggle FAQ handler
    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Form submission handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !phone.trim()) {
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1200);
    };

    // FAQ Data from Slide 9
    const faqData = [
        {
            question: "Чи можна починати самостійно?",
            answer: "Ні. Це рецептурний препарат, тому рішення приймає лікар. (European Medicines Agency (EMA))"
        },
        {
            question: "Як часто вводиться препарат?",
            answer: "Раз на тиждень."
        },
        {
            question: "Які найчастіші побічні ефекти?",
            answer: "Найчастіше це нудота, діарея, інколи закреп і блювання; зазвичай вони пов’язані з ШКТ і частіше з’являються під час зміни дози."
        },
        {
            question: "Чи підходить, якщо є інші ліки?",
            answer: "Це має оцінити лікар, бо сумісність залежить від конкретного лікування й стану пацієнта."
        },
        {
            question: "Чи потрібно дотримуватися дієти?",
            answer: "Так, препарат застосовується разом із дієтою та фізичною активністю."
        }
    ];

    return (
        <div
            className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">

            {/* Sticky Header */}
            <header
                className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
            <span className="font-display text-2xl font-bold tracking-widest text-[#0b483a] flex items-center gap-1">
              МУНДЖАРО
            </span>
                        <span className="hidden sm:inline-block h-5 w-px bg-slate-200"></span>
                        <span
                            className="hidden sm:inline-block text-xs font-medium text-slate-500 uppercase tracking-widest">
              Програма контролю ваги
            </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                        <a href="#about-section" className="hover:text-[#0b483a] transition-colors">Про Мунджаро</a>
                        <a href="#how-it-works" className="hover:text-[#0b483a] transition-colors">Як це працює</a>
                        <a href="#comparison" className="hover:text-[#0b483a] transition-colors">Порівняння</a>
                        <a href="#faq" className="hover:text-[#0b483a] transition-colors">FAQ</a>
                    </nav>

                    <div>
                        <button
                            onClick={scrollToForm}
                            className="inline-flex items-center justify-center px-5 h-11 text-xs font-semibold uppercase tracking-wider text-white bg-[#0b483a] hover:bg-[#073026] rounded-full transition-all duration-300 shadow-sm"
                            id="header-cta-btn"
                        >
                            Дізнатися, чи підходить вам
                        </button>
                    </div>
                </div>
            </header>

            {/* Slide 1: Hero (Перший екран) */}
            <section className="relative overflow-hidden bg-medical-gradient py-12 lg:py-24 border-b border-slate-50"
                     id="hero-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                        {/* Left Side: Copy */}
                        <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
                            <div
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100/50 w-fit">
                                <Stethoscope className="w-4 h-4 text-[#0b483a]"/>
                                <span className="text-xs font-semibold text-[#0b483a] tracking-wider uppercase">
                  Контроль ваги під наглядом лікаря
                </span>
                            </div>

                            <div className="space-y-4">
                                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                  <span
                      className="block text-red-600 font-mono text-3xl sm:text-4xl tracking-widest uppercase font-black mb-2 animate-pulse">
                    HELP!
                  </span>
                                    Мінус 10–25 кг без виснажливих дієт та постійного відчуття голоду
                                </h1>

                                <p className="text-lg sm:text-xl text-slate-600 font-light leading-relaxed max-w-2xl">
                                    Контроль ваги під наглядом лікаря з використанням сучасних міжнародних протоколів
                                    лікування зайвої ваги
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                                <button
                                    onClick={scrollToForm}
                                    className="inline-flex items-center justify-center px-8 h-14 text-sm font-semibold uppercase tracking-wider text-white bg-[#0b483a] hover:bg-[#073026] rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
                                    id="hero-cta-btn"
                                >
                                    Дізнатися, чи підходить вам
                                </button>
                                <div
                                    className="flex items-center gap-2.5 px-4 py-2 justify-center text-slate-500 text-xs">
                                    <Clock className="w-4 h-4 text-emerald-600"/>
                                    <span>Швидкий запис на консультацію</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Emotional Image */}
                        <div className="lg:col-span-5 relative">
                            <div
                                className="absolute inset-0 bg-emerald-100 rounded-3xl rotate-2 opacity-50 blur-lg"></div>
                            <div
                                className="relative rounded-3xl overflow-hidden border border-slate-100 shadow-2xl bg-slate-50">
                                <img
                                    src="https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&q=80&w=1200"
                                    alt="Контроль ваги та підлогові ваги"
                                    referrerPolicy="no-referrer"
                                    className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                                />
                                <div
                                    className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 text-white">
                                    <div className="flex items-center gap-3">
                                        <Scale className="w-5 h-5 text-emerald-400"/>
                                        <p className="text-sm font-medium tracking-wide">
                                            Контроль ваги та сучасне лікування зайвої ваги
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Slide 2: Блок "Впізнаєте себе?" */}
            <section className="py-20 bg-slate-50 border-b border-slate-100" id="recognize-yourself">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Left Column: Bullets & Explanations */}
                        <div className="lg:col-span-7 space-y-8">
                            <div className="space-y-4">
                                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                                    Впізнаєте себе?
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    "Постійно думаю про їжу",
                                    "Зриваюся після чергової дієти",
                                    "Вага повертається після схуднення",
                                    "Втомлююся навіть від невеликого навантаження",
                                    "Соромлюся свого тіла",
                                    "Аналізи стають гіршими щороку"
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-emerald-100 transition-colors"
                                    >
                    <span
                        className="flex-shrink-0 w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm">
                      !
                    </span>
                                        <span className="text-sm sm:text-base text-slate-700 font-medium">
                      {item}
                    </span>
                                    </div>
                                ))}
                            </div>

                            {/* Callout box */}
                            <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-2">
                                <p className="text-base sm:text-lg font-semibold text-amber-900">
                                    Якщо ви хоча б тричі впізнали себе — ви не самотні
                                </p>
                            </div>

                            {/* Conclusion statement */}
                            <div className="space-y-4 border-l-4 border-[#0b483a] pl-5 py-2">
                                <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-light">
                                    За сучасними даними ожиріння — це не слабкість характеру, а хронічне захворювання,
                                    яке потребує лікування так само, як гіпертонія чи цукровий діабет.
                                </p>
                            </div>

                            <div>
                                <button
                                    onClick={scrollToForm}
                                    className="inline-flex items-center justify-center px-8 h-12 text-xs font-bold uppercase tracking-wider text-white bg-[#0b483a] hover:bg-[#073026] rounded-full transition-all duration-300 shadow-md"
                                    id="recognize-cta-btn"
                                >
                                    Дізнатися, чи підходить вам
                                </button>
                            </div>
                        </div>

                        {/* Right Column: Waist Measuring Tape Image */}
                        <div className="lg:col-span-5 relative">
                            <div
                                className="absolute inset-0 bg-emerald-200/40 rounded-3xl -rotate-2 opacity-50 blur-lg"></div>
                            <div
                                className="relative rounded-3xl overflow-hidden border border-slate-100 shadow-xl bg-slate-100">
                                <img
                                    src="/assets/image.png"
                                    alt="Вимірювання талії сантиметровою стрічкою"
                                    referrerPolicy="no-referrer"
                                    className="w-full h-[500px] object-cover"
                                    data-i="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Slide 3: Як працює сучасна медикаментозна терапія контролю ваги */}
            <section className="py-20 bg-white border-b border-slate-50" id="how-it-works">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
                        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                            Як працює сучасна медикаментозна терапія контролю ваги
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                        {/* Left: Treatment help benefits */}
                        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
                            <div
                                className="p-6 sm:p-8 rounded-3xl bg-emerald-50/50 border border-emerald-100/50 space-y-6">
                                <h3 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="p-1 rounded-md bg-[#0b483a] text-white">
                    <Check className="w-4 h-4"/>
                  </span>
                                    Лікування допомагає:
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        "швидше насичуватися;",
                                        "довше не відчувати голод;",
                                        "зменшити потяг до їжі;",
                                        "контролювати розмір порцій;",
                                        "поступово знижувати вагу."
                                    ].map((benefit, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span
                                                className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2.5 flex-shrink-0"></span>
                                            <span className="text-slate-700 text-base font-medium">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right: Expectation results by milestone */}
                        <div className="lg:col-span-7 space-y-8">
                            <h3 className="font-display text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                                Яких результатів можна очікувати:
                            </h3>

                            <div className="space-y-6">

                                {/* 3 Months */}
                                <div
                                    className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all">
                                    <div
                                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                        <h4 className="font-display text-lg font-bold text-[#0b483a]">
                                            Через 3 місяці:
                                        </h4>
                                    </div>
                                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {[
                                            "перші помітні зміни",
                                            "менший апетит",
                                            "легше контролювати харчування"
                                        ].map((res, i) => (
                                            <li key={i}
                                                className="flex items-center gap-2 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                                                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0"/>
                                                <span
                                                    className="text-xs sm:text-sm text-slate-700 font-medium">{res}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* 6 Months */}
                                <div
                                    className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all">
                                    <div
                                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                        <h4 className="font-display text-lg font-bold text-[#0b483a]">
                                            Через 6 місяців:
                                        </h4>
                                    </div>
                                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {[
                                            "суттєве зниження ваги",
                                            "більше енергії",
                                            "покращення самопочуття"
                                        ].map((res, i) => (
                                            <li key={i}
                                                className="flex items-center gap-2 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                                                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0"/>
                                                <span
                                                    className="text-xs sm:text-sm text-slate-700 font-medium">{res}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* 12 Months */}
                                <div
                                    className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all">
                                    <div
                                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                        <h4 className="font-display text-lg font-bold text-[#0b483a]">
                                            Через 12 місяців:
                                        </h4>
                                    </div>
                                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {[
                                            "стабільний результат",
                                            "нові харчові звички",
                                            "вища якість життя"
                                        ].map((res, i) => (
                                            <li key={i}
                                                className="flex items-center gap-2 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                                                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0"/>
                                                <span
                                                    className="text-xs sm:text-sm text-slate-700 font-medium">{res}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Slide 4 & 5: Що таке «Мунджаро»? Як він працює? Кому підходить? */}
            <section className="py-20 bg-slate-50 border-b border-slate-100" id="about-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Slide 4 Intro Card */}
                    <div
                        className="bg-[#0b483a] rounded-3xl p-8 sm:p-12 text-white text-center space-y-4 mb-16 shadow-xl">
                        <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight max-w-3xl mx-auto leading-snug">
                            Що таке «Мунджаро»? Як він працює? Кому підходить?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Left Side: Medical syringe pen / container */}
                        <div className="lg:col-span-5 relative order-last lg:order-first">
                            <div className="absolute inset-0 rounded-3xl rotate-1 "></div>
                            <div className="relative rounded-3xl overflow-hidden  p-2 flex flex-col items-center">
                                <img
                                    src="/assets/medical-syringe-pen.png"
                                    data-src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800"
                                    alt="Медичний шприц-ручка або препарат Мунджаро у коробці"
                                    referrerPolicy="no-referrer"
                                    className="w-full h-[500px] object-cover rounded-2xl"
                                />
                                <div className="pt-4">
                                    <button
                                        onClick={scrollToForm}
                                        className="inline-flex items-center justify-center px-8 h-12 text-xs font-bold uppercase tracking-wider text-white bg-[#0b483a] hover:bg-[#073026] rounded-full transition-all duration-300 shadow-md"
                                        id="about-cta-btn"
                                    >
                                        Дізнатися, чи підходить вам
                                    </button>
                                </div>
                            </div>

                        </div>

                        {/* Right Side: Descriptions & Flow */}
                        <div className="lg:col-span-7 space-y-8">

                            <div className="space-y-4">
                                <h3 className="font-display text-2xl font-bold text-[#0b483a]">
                                    Що таке “Мунджаро”:
                                </h3>
                                <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-light">
                                    Мунджаро — це препарат у вигляді розчину для ін'єкцій у шприц-ручці. Він діє через
                                    механізм GLP-1 і GIP, допомагаючи зменшити апетит і підтримувати контроль ваги разом
                                    із дієтою та фізичною активністю.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-display text-xl font-bold text-slate-900">
                                    Як він працює:
                                </h3>
                                <p className="text-slate-700 text-base leading-relaxed font-light bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                                    <span className="font-semibold text-slate-900 block mb-1">Простими словами:</span>
                                    допомагає зменшити апетит і підтримувати контроль ваги разом із дієтою та фізичною
                                    активністю.
                                </p>
                            </div>

                            {/* Step flow / Timeline representing "Тобто" */}
                            <div className="space-y-4">
                                <h3 className="font-display text-xl font-bold text-slate-900">
                                    Тобто:
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">

                                    {/* Step 1 */}
                                    <div
                                        className="bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-5 flex flex-col justify-between">
                                        <span
                                            className="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-2">Крок 1</span>
                                        <p className="text-sm font-semibold text-slate-800">
                                            «Менше хаотичного апетиту»
                                        </p>
                                        <div className="flex justify-end mt-4 text-[#0b483a]">
                                            <ArrowRight className="w-5 h-5 hidden md:block"/>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div
                                        className="bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-5 flex flex-col justify-between">
                                        <span
                                            className="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-2">Крок 2</span>
                                        <p className="text-sm font-semibold text-slate-800">
                                            «простіше дотримуватись плану»
                                        </p>
                                        <div className="flex justify-end mt-4 text-[#0b483a]">
                                            <ArrowRight className="w-5 h-5 hidden md:block"/>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div
                                        className="bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-5 flex flex-col justify-between">
                                        <span
                                            className="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-2">Крок 3</span>
                                        <p className="text-sm font-semibold text-slate-800">
                                            «більше шансів на стабільний контроль ваги»
                                        </p>
                                        <div className="flex justify-end mt-4 text-[#0b483a]">
                                            <ArrowRight className="w-5 h-5 hidden md:block"/>
                                        </div>
                                    </div>
                                    { /*
                  <div className="bg-[#0b483a] rounded-2xl p-5 flex flex-col justify-between text-white shadow-md">
                    <span className="text-xs font-bold text-emerald-200 uppercase tracking-widest block mb-2">Крок 3</span>
                    <p className="text-sm font-bold">
                      «більше шансів на стабільний контроль ваги»
                    </p>
                  </div>
                */}
                                </div>
                            </div>
                            {/*
              <div className="pt-4">
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center justify-center px-8 h-12 text-xs font-bold uppercase tracking-wider text-white bg-[#0b483a] hover:bg-[#073026] rounded-full transition-all duration-300 shadow-md"
                  id="about-cta-btn"
                >
                  Дізнатися, чи підходить вам
                </button>
              </div>
*/}
                        </div>

                    </div>
                </div>
            </section>

            {/* Slide 6 & 7: Чим «Мунджаро» відрізняється від альтернатив */}
            <section className="py-20 bg-white border-b border-slate-50" id="comparison">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
                        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                            Чим «Мунджаро» відрізняється від альтернатив
                        </h2>
                    </div>

                    <div className="space-y-12">

                        {/* Visual Comparison Matrix Card */}
                        {/*
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-1/4">Характеристика</th>
                    <th className="pb-4 text-sm font-bold text-[#0b483a] w-1/4">Мунджаро (Mounjaro)</th>
                    <th className="pb-4 text-sm font-semibold text-slate-700 w-1/4">Wegovy (семаглутид)</th>
                    <th className="pb-4 text-sm font-semibold text-slate-700 w-1/4">Saxenda (ліраглутид)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-4 text-sm font-semibold text-slate-900">Діюча речовина</td>
                    <td className="py-4 text-sm font-bold text-[#0b483a] bg-emerald-50/40 px-3 rounded-lg">тирзепатид</td>
                    <td className="py-4 text-sm text-slate-600">семаглутид</td>
                    <td className="py-4 text-sm text-slate-600">ліраглутид</td>
                  </tr>
                  <tr>
                    <td className="py-4 text-sm font-semibold text-slate-900">Рецептори дії</td>
                    <td className="py-4 text-sm font-bold text-[#0b483a] bg-emerald-50/40 px-3 rounded-lg">GLP-1 + GIP (подвійна дія)</td>
                    <td className="py-4 text-sm text-slate-600">GLP-1</td>
                    <td className="py-4 text-sm text-slate-600">GLP-1</td>
                  </tr>
                  <tr>
                    <td className="py-4 text-sm font-semibold text-slate-900">Частота введення</td>
                    <td className="py-4 text-sm font-bold text-[#0b483a] bg-emerald-50/40 px-3 rounded-lg">1 раз на тиждень</td>
                    <td className="py-4 text-sm text-slate-600">1 раз на тиждень</td>
                    <td className="py-4 text-sm text-slate-600">щоденне введення</td>
                  </tr>
                </tbody>
              </table>
            </div>
            */}
                        {/* Explanation Narrative Paragraph from Slide 7 */}
                        <div
                            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-emerald-50/20 border border-emerald-100/50 p-8 rounded-3xl">

                            <div className="lg:col-span-6 space-y-4">
                                <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-light">
                                    У цій категорії найближчими альтернативами є Wegovy (семаглутид) і Saxenda
                                    (ліраглутид). За даними
                                    EMA, Wegovy — це семаглутид із введенням 1 раз на тиждень, а Saxenda — ліраглутид із
                                    щоденним
                                    введенням. Мунджаро містить тирзепатид і працює через GLP-1 + GIP, тоді як Wegovy і
                                    Saxenda — через
                                    GLP-1. Це зручна й коректна відмінність для лендінгу без дискредитації конкурентів.
                                </p>
                            </div>

                            <div
                                className="lg:col-span-6 bg-white p-0 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center space-y-2">
                                <div
                                    className="relative rounded-3xl overflow-hidden border border-slate-100 shadow-xl bg-slate-100">
                                    <img alt="Вимірювання талії сантиметровою стрічкою" referrerPolicy="no-referrer"
                                         className="w-full h-[320px] object-cover"
                                         src="/assets/box.png"/></div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Slide 8: Strong Call to Action */}
            <section className="py-24 bg-[#0b483a] text-white relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent)] pointer-events-none"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">

                    <div className="space-y-4">
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                            Можливо, це ваша остання невдала спроба схуднути.
                        </h2>
                        <h3 className="font-display text-2xl sm:text-3xl font-light text-emerald-200">
                            І перша — яка дасть результат.
                        </h3>
                    </div>

                    <p className="text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto font-light leading-relaxed">
                        Запишіться на консультацію та дізнайтеся, чи підходить вам сучасна програма контролю ваги.
                    </p>

                    <div className="pt-4">
                        <button
                            onClick={scrollToForm}
                            className="inline-flex items-center justify-center px-10 h-14 text-sm font-bold uppercase tracking-wider text-[#0b483a] bg-white hover:bg-slate-50 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                            id="cta-middle-btn"
                        >
                            Дізнатися, чи підходить вам
                        </button>
                    </div>

                </div>
            </section>

            {/* Slide 9: Питання та відповіді (FAQ Accordion) */}
            <section className="py-20 bg-slate-50 border-b border-slate-100" id="faq">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center space-y-4 mb-16">
                        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                            Питання та відповіді:
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqData.map((faq, index) => {
                            const isOpen = openFaq === index;
                            return (
                                <div
                                    key={index}
                                    className="bg-white border border-slate-150 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:border-emerald-200"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                        aria-expanded={isOpen}
                                    >
                    <span className="text-base sm:text-lg font-bold text-slate-900 pr-4">
                      {faq.question}
                    </span>
                                        <span className="p-1 rounded-full bg-slate-50 text-slate-500">
                      {isOpen ? <ChevronUp className="w-5 h-5"/> : <ChevronDown className="w-5 h-5"/>}
                    </span>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{height: 0, opacity: 0}}
                                                animate={{height: "auto", opacity: 1}}
                                                exit={{height: 0, opacity: 0}}
                                                transition={{duration: 0.25, ease: "easeInOut"}}
                                            >
                                                <div
                                                    className="px-6 pb-6 pt-2 text-sm sm:text-base text-slate-600 border-t border-slate-50 leading-relaxed font-light">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* Slide 10: Форма консультації */}
            <section className="py-20 bg-white" id="consultation-form-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                        {/* Left Box: Descriptive Info copy blocks */}
                        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
                            <div className="space-y-4">
                                <span className="text-xs font-bold text-[#0b483a] uppercase tracking-widest">Зворотний зв'язок</span>
                                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                                    Форма консультації
                                </h2>
                                <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-light">
                                    Зробіть перший крок до керованого контролю ваги та отримайте консультацію щодо
                                    можливості терапії
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4 shadow-sm">
                                <div className="flex gap-4 items-start">
                  <span className="p-2 rounded-xl bg-emerald-50 text-[#0b483a] flex-shrink-0">
                    <Phone className="w-5 h-5"/>
                  </span>
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-900">Швидкий дзвінок</h4>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Лікар або менеджер зв’яжеться, щоб уточнити деталі та підказати наступний
                                            крок
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start border-t border-slate-200/50 pt-4">
                  <span className="p-2 rounded-xl bg-emerald-50 text-[#0b483a] flex-shrink-0">
                    <FileText className="w-5 h-5"/>
                  </span>
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-900">Отримання інформації</h4>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Залиште заявку, щоб отримати консультацію, інструкцію та зрозуміти, чи може
                                            цей варіант бути доречним саме у вашій ситуації.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Box: Lead Capture Form */}
                        <div
                            className="lg:col-span-7 bg-white rounded-3xl border border-slate-150 p-8 sm:p-10 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0b483a]"></div>

                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <motion.form
                                        key="consultation-form"
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                    >

                                        {/* Name input */}
                                        <div className="space-y-2">
                                            <label htmlFor="user-name"
                                                   className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                                                Ім’я
                                            </label>
                                            <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                          <User className="w-5 h-5"/>
                        </span>
                                                <input
                                                    id="user-name"
                                                    type="text"
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="Введіть ваше ім’я"
                                                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-250 bg-slate-50/50 focus:bg-white focus:border-[#0b483a] focus:ring-1 focus:ring-[#0b483a] transition-all text-sm font-medium outline-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Phone input */}
                                        <div className="space-y-2">
                                            <label htmlFor="user-phone"
                                                   className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                                                Телефон
                                            </label>
                                            <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                          <Phone className="w-5 h-5"/>
                        </span>
                                                <input
                                                    id="user-phone"
                                                    type="tel"
                                                    required
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    placeholder="+380 (XX) XXX-XX-XX"
                                                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-250 bg-slate-50/50 focus:bg-white focus:border-[#0b483a] focus:ring-1 focus:ring-[#0b483a] transition-all text-sm font-medium outline-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Checkbox item for "Хочу консультацію" */}
                                        <div
                                            className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100/30 space-y-3">
                                            <div className="flex items-start gap-3">
                                                <input
                                                    id="want-consultation-checkbox"
                                                    type="checkbox"
                                                    checked={wantConsultation}
                                                    onChange={(e) => setWantConsultation(e.target.checked)}
                                                    className="w-5 h-5 rounded border-slate-300 text-[#0b483a] focus:ring-[#0b483a] mt-0.5 accent-[#0b483a] cursor-pointer"
                                                />
                                                <label
                                                    htmlFor="want-consultation-checkbox"
                                                    className="text-sm font-semibold text-slate-800 cursor-pointer select-none"
                                                >
                                                    Хочу консультацію
                                                </label>
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full inline-flex items-center justify-center px-8 h-14 text-sm font-bold uppercase tracking-wider text-white bg-[#0b483a] hover:bg-[#073026] rounded-full transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                                id="form-submit-btn"
                                            >
                                                {isSubmitting ? "Надсилання..." : "Дізнатися, чи підходить вам"}
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-2 text-slate-500 text-xs justify-center">
                                            <Clock className="w-4 h-4 text-emerald-600"/>
                                            <span>Лікар або менеджер зв’яжеться найближчим часом</span>
                                        </div>

                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success-message"
                                        className="py-12 text-center space-y-6"
                                        initial={{scale: 0.95, opacity: 0}}
                                        animate={{scale: 1, opacity: 1}}
                                        transition={{type: "spring", stiffness: 100}}
                                    >
                                        <div
                                            className="w-16 h-16 rounded-full bg-emerald-100 text-[#0b483a] flex items-center justify-center mx-auto shadow-sm">
                                            <Check className="w-8 h-8"/>
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="font-display text-2xl font-bold text-slate-900">
                                                Дякуємо! Ваша заявка успішно надіслана.
                                            </h3>
                                            <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                                                Лікар або менеджер зв’яжеться з вами найближчим часом, щоб уточнити
                                                деталі та підказати наступний крок.
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => {
                                                setIsSubmitted(false);
                                                setName("");
                                                setPhone("");
                                            }}
                                            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#0b483a] hover:underline"
                                        >
                                            Надіслати ще одну заявку
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>

                    </div>
                </div>
            </section>

            {/* Footer & Strict Disclaimer */}
            <footer className="bg-slate-50 border-t border-slate-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    <div
                        className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-200/60 pb-8">
                        <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold tracking-widest text-[#0b483a]">
                МУНДЖАРО
              </span>
                            <span className="h-4 w-px bg-slate-300"></span>
                            <span className="text-xs text-slate-500 uppercase tracking-widest">
                Медична Програма
              </span>
                        </div>
                        <p className="text-xs text-slate-400">
                            © {new Date().getFullYear()} Мунджаро. Усі права захищено.
                        </p>
                    </div>

                    {/* Slide 10 footer disclaimer footnote exactly matches the PDF */}
                    <div className="p-6 bg-amber-50/40 rounded-2xl border border-amber-100/40">
                        <div className="flex gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5"/>
                            <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-light">
                <span className="font-bold text-slate-900 block mb-1 uppercase tracking-wider">
                  Важливе медичне застереження:
                </span>
                                Інформація на сторінці не є медичною порадою. Мунджаро є рецептурним препаратом.
                                Застосування, дозування, сумісність з іншими ліками та доцільність терапії визначає лише
                                лікар. Можливі побічні реакції, зокрема з боку травної системи. Перед застосуванням
                                ознайомтесь з інструкцією та зверніться до фахівця.
                            </p>
                        </div>
                    </div>

                </div>
            </footer>

        </div>
    );
}
