import { useState } from 'react';
import {
  ChevronDown,
  HelpCircle,
  Calendar,
  Clock,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ_CATEGORIES = [
  {
    id: 'appointment',
    label: 'Appointment',
    icon: Calendar,
    questions: [
      {
        question: 'Do I need to do any preparation for the appointment?',
        answer: (
          <ul className="space-y-3">
            {[
              'Bring all your old and ongoing medical records (if any), including blood test reports, X-ray/MRI/CT films and reports.',
              'Organise your reports at home to save your and your doctor’s time during the consultation.',
              'One responsible person should accompany elderly patients. Avoid unnecessary crowding.',
              'Wear loose-fitting clothes for consultation and therapy sessions.',
              'If you cannot remember everything, write down your problems on a piece of paper and bring it along.',
              'Inform doctors well in advance if you have any allergies or drug reactions.',
              'Do not hide any past medical history from doctors. Every medical history detail is important for accurate diagnosis.',
            ].map((text, idx) => (
              <li key={idx} className="flex items-start gap-2.5 sm:gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0E5C4E]/10 text-[#0E5C4E]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
                <span className="text-slate-600">{text}</span>
              </li>
            ))}
          </ul>
        ),
      },
      {
        question: 'What is the process for taking an appointment?',
        answer: (
          <p>
            You can book an appointment directly by reaching out to our reception at{' '}
            <a
              href="tel:+919884507412"
              className="inline-flex items-center gap-1 font-semibold text-[#0E5C4E] underline underline-offset-4 transition-colors hover:text-[#FF6B45]"
            >
              +91 9884507412
            </a>
            . Our staff will help you pick an available time slot.
          </p>
        ),
      },
      {
        question: 'Is it necessary to take a prior appointment for a consultation?',
        answer: (
          <p>
            <strong className="font-semibold text-slate-800">Yes.</strong> To minimize waiting times and ensure quality attention for every patient, consultations are strictly available by prior appointment only.
          </p>
        ),
      },
    ],
  },
  {
    id: 'timing',
    label: 'Timing',
    icon: Clock,
    questions: [
      {
        question: 'What are the consultation timings?',
        answer: (
          <div className="space-y-3">
            <p className="text-slate-600">
              Prior appointment with the{' '}
              <strong className="font-semibold text-slate-800">
                front desk/reception
              </strong>{' '}
              is required before arriving.
            </p>

            <div className="grid gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-3 sm:grid-cols-2 sm:p-4">
              <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0E5C4E]">
                  Mon - Sat
                </span>
                <p className="mt-1 text-sm font-bold text-slate-800 sm:text-base">
                  11:00 AM – 1:30 PM
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#FF6B45]">
                  Evening
                </span>
                <p className="mt-1 text-sm font-bold text-slate-800 sm:text-base">
                  6:30 PM – 9:30 PM
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0E5C4E]">
                Orthopaedic and Ophthalmology Consultation
              </span>
              <p className="mt-1 text-sm font-bold text-slate-800 sm:text-base">
                Evening only — 6:30 PM – 9:30 PM
              </p>
            </div>
          </div>
        ),
      },
      {
        question: 'What if the patient cannot come on time?',
        answer: (
          <p>
            If you are running late, please inform our front desk as early as possible. We will attempt to reschedule your appointment or fit you into a later available slot on the same day depending on doctor availability.
          </p>
        ),
      },
    ],
  },
  {
    id: 'payment',
    label: 'Payment',
    icon: CreditCard,
    questions: [
      {
        question: 'What could be the approximate cost of the treatment?',
        answer: (
          <p>
            Treatment costs vary based on the specific condition, required diagnostics, and the number of therapy sessions prescribed. Every treatment plan is custom designed to individual patient needs.
          </p>
        ),
      },
      {
        question: 'What are the modes of payment?',
        answer: (
          <div className="space-y-2">
            <p>
              We currently accept <strong className="font-semibold text-slate-800">Cash</strong> and <strong className="font-semibold text-slate-800">UPI transfers (Google Pay, PhonePe, Paytm)</strong>.
            </p>
            <p className="rounded-xl border border-amber-200/60 bg-amber-50/50 px-3 py-2 text-xs font-medium text-amber-700 sm:px-4">
              Note: Card payment facilities are currently unavailable.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    id: 'insurance',
    label: 'Insurance',
    icon: ShieldCheck,
    questions: [
      {
        question: 'Do insurance companies pay for our bills?',
        answer: (
          <p>
            We support <strong className="font-semibold text-slate-800">Post-claim reimbursement</strong>. We currently do not provide cashless hospital services. Patients can pay their bills upfront and submit our official receipts and clinical documents to their insurer for reimbursement.
          </p>
        ),
      },
    ],
  },
];

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div
      className={`group overflow-hidden rounded-2xl border transition-all duration-200 ${
        isOpen
          ? 'border-[#0E5C4E]/20 bg-white shadow-md shadow-slate-100'
          : 'border-slate-200/60 bg-white hover:border-[#0E5C4E]/20 hover:shadow-sm'
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between gap-3 p-4 text-left sm:gap-4 sm:p-6"
        aria-expanded={isOpen}
      >
        <span
          className={`text-sm font-semibold transition-colors duration-200 sm:text-lg ${
            isOpen
              ? 'text-[#0E5C4E]'
              : 'text-slate-800 group-hover:text-[#0E5C4E]'
          }`}
        >
          {question}
        </span>

        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all duration-300 sm:h-9 sm:w-9 ${
            isOpen
              ? 'bg-[#0E5C4E] text-white rotate-180'
              : 'bg-slate-100 text-slate-500 group-hover:bg-[#0E5C4E]/10 group-hover:text-[#0E5C4E]'
          }`}
        >
          <ChevronDown className="h-4 w-4 stroke-[2.5]" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="border-t border-slate-100 bg-slate-50/40 px-4 pb-5 pt-3.5 text-xs leading-relaxed text-slate-600 sm:px-6 sm:pb-6 sm:pt-4 sm:text-base">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQ() {
  const [activeCategory, setActiveCategory] = useState('appointment');
  const [openQuestion, setOpenQuestion] = useState(0);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setOpenQuestion(0);
  };

  const category =
    FAQ_CATEGORIES.find((item) => item.id === activeCategory) ||
    FAQ_CATEGORIES[0];

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30 px-4 py-12 text-slate-800 sm:px-10 sm:py-20 lg:px-16"
    >
      {/* Soft Ambient Background Lighting */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[300px] w-[300px] rounded-full bg-[#0E5C4E]/5 blur-[80px] sm:h-[400px] sm:w-[400px] sm:blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[300px] w-[300px] rounded-full bg-[#FF6B45]/5 blur-[80px] sm:h-[400px] sm:w-[400px] sm:blur-[100px]" />

      <div className="relative mx-auto max-w-4xl">
        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#0E5C4E] shadow-sm sm:gap-2 sm:px-4 sm:py-1.5 sm:text-xs"
          >
            <HelpCircle className="h-3.5 w-3.5 text-[#FF6B45]" />
            Frequently Asked Questions
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-[Space_Grotesk] text-2xl font-extrabold tracking-tight text-slate-900 sm:mt-4 sm:text-4xl"
          >
            Got Questions? We Have Answers
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-2 text-xs leading-relaxed text-slate-500 sm:mt-3 sm:text-base"
          >
            Everything you need to know about visits, appointments, pricing, and insurance coverage.
          </motion.p>
        </div>

        {/* CATEGORY TABS (Scrollable on small devices) */}
        <div className="mt-8 flex justify-center sm:mt-10">
          <div className="flex w-full max-w-2xl overflow-x-auto rounded-2xl border border-slate-200/70 bg-slate-100/60 p-1.5 backdrop-blur-sm [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center">
            <div className="flex min-w-full items-center justify-start gap-1 sm:min-w-0 sm:justify-center sm:gap-1.5">
              {FAQ_CATEGORIES.map((categoryItem) => {
                const IconComponent = categoryItem.icon;
                const isActive = activeCategory === categoryItem.id;

                return (
                  <button
                    key={categoryItem.id}
                    type="button"
                    onClick={() => handleCategoryChange(categoryItem.id)}
                    className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 sm:px-4 sm:py-2.5 sm:text-sm ${
                      isActive
                        ? 'bg-white text-[#0E5C4E] shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <IconComponent
                      className={`h-4 w-4 ${
                        isActive ? 'text-[#0E5C4E]' : 'text-slate-400'
                      }`}
                    />
                    <span>{categoryItem.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* FAQ CONTENT CONTAINER */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mx-auto mt-6 rounded-2xl border border-slate-200/70 bg-white/60 p-4 shadow-sm backdrop-blur-sm sm:mt-8 sm:rounded-3xl sm:p-8"
        >
          {/* Category Banner */}
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-[#0E5C4E]/5 p-3 sm:mb-6 sm:p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0E5C4E] text-white sm:h-9 sm:w-9">
              <Sparkles className="h-4 w-4" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-800 sm:text-base">
                {category.label} Help
              </h3>

              <p className="text-[11px] text-slate-500 sm:text-xs">
                Showing top queries regarding {category.label.toLowerCase()}
              </p>
            </div>
          </div>

          {/* Accordion Questions Stack */}
          <div className="space-y-2.5 sm:space-y-3">
            {category.questions.map((item, index) => (
              <FAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                isOpen={openQuestion === index}
                onClick={() =>
                  setOpenQuestion(openQuestion === index ? null : index)
                }
              />
            ))}
          </div>
        </motion.div>

        {/* ENHANCED CALLOUT BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-lg shadow-slate-100 sm:mt-10 sm:rounded-3xl sm:p-8"
        >
          {/* Subtle Top Border Highlight Line */}
          <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#0E5C4E] via-[#FF6B45] to-[#0E5C4E]" />

          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0E5C4E]/10 text-[#0E5C4E] sm:h-12 sm:w-12 sm:rounded-2xl">
                <PhoneCall className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 sm:text-lg">
                  Still have questions?
                </h4>

                <p className="text-[11px] text-slate-500 sm:text-sm">
                  Can’t find what you’re looking for? Reach out directly to our team.
                </p>
              </div>
            </div>

            <a
              href="tel:+919884507412"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0E5C4E] px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-[#0E5C4E]/20 transition-all hover:bg-[#0B483D] hover:shadow-lg sm:w-auto sm:px-5 sm:py-3 sm:text-sm"
            >
              <span>Call +91 9884507412</span>
              <ArrowRight className="h-4 w-4 text-[#FF6B45]" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;