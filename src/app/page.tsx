"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Users,
  BarChart3,
  Ticket,
  Check,
  Star,
  ArrowRight,
  Menu,
  X,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  ChevronDown,
  Play,
} from "lucide-react";

const InvoiFixLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <FileText className="w-8 h-8 text-blue-500" />,
      title: "Cobra más rápido, sin esfuerzo",
      description:
        "Crea y envía facturas profesionales en segundos. Con plantillas personalizables, seguimiento de estados (pagada, vencida) y generación de PDF al instante.",
      image: "🧾",
    },
    {
      icon: <Ticket className="w-8 h-8 text-blue-500" />,
      title: "Tus clientes, siempre atendidos",
      description:
        "Gestiona todas las solicitudes de tus clientes en nuestro tablero Kanban visual. Arrastra y suelta tickets para ver el progreso y nunca dejes una consulta sin responder.",
      image: "📋",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Conoce a tus clientes a fondo",
      description:
        "Ten una ficha completa de cada cliente con su historial de facturación, pagos y tickets de soporte. Todo en un mismo lugar.",
      image: "👥",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
      title: "Decisiones más inteligentes con IA",
      description:
        "Nuestra IA analiza el historial de tus clientes para darte resúmenes automáticos y detectar oportunidades de venta o riesgos de impago. Convierte datos en ingresos.",
      image: "🤖",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Registra a tu cliente",
      description: "Añade sus datos una sola vez",
    },
    {
      number: "02",
      title: "Crea y Envía",
      description: "Genera una factura o registra un ticket en segundos",
    },
    {
      number: "03",
      title: "Gestiona y Analiza",
      description: "Sigue el estado de todo desde tu dashboard central",
    },
  ];

  const pricing = [
    {
      name: "Freelancer",
      price: "Gratis",
      originalPrice: null,
      description: "Ideal para empezar",
      features: [
        "1 usuario",
        "Hasta 5 clientes",
        "10 facturas/mes",
        "Soporte básico",
        "Dashboard básico",
      ],
      popular: false,
      cta: "Empezar Gratis",
    },
    {
      name: "Agencia Pro",
      price: selectedPlan === "monthly" ? "$29" : "$24",
      originalPrice: selectedPlan === "monthly" ? null : "$29",
      description: "El más popular",
      features: [
        "Hasta 5 usuarios",
        "Clientes ilimitados",
        "Facturas ilimitadas",
        "Análisis con IA",
        "Gestión de equipo",
        "Soporte prioritario",
      ],
      popular: true,
      cta: "Prueba 14 días gratis",
    },
    {
      name: "Business",
      price: selectedPlan === "monthly" ? "$79" : "$65",
      originalPrice: selectedPlan === "monthly" ? null : "$79",
      description: "Para empresas grandes",
      features: [
        "Usuarios ilimitados",
        "Todo lo anterior",
        "Roles personalizados",
        "API acceso",
        "Soporte 24/7",
        "Onboarding dedicado",
      ],
      popular: false,
      cta: "Contactar Ventas",
    },
  ];

  const faqs = [
    {
      question: "¿Es segura mi información?",
      answer:
        "Absolutamente. Utilizamos Firebase de Google con encriptación de extremo a extremo y cumplimos con todos los estándares de seguridad internacionales.",
    },
    {
      question: "¿Puedo cancelar en cualquier momento?",
      answer:
        "Sí, puedes cancelar tu suscripción cuando quieras. No hay permanencia ni penalizaciones.",
    },
    {
      question: "¿Qué integraciones de pago soportan?",
      answer:
        "Próximamente: Stripe, PayPal, transferencias bancarias y más. Actualmente trabajamos en integrar los métodos de pago más populares.",
    },
    {
      question: "¿Funciona para mi país?",
      answer:
        "InvoiFix funciona globalmente. Soportamos múltiples monedas y formatos de facturación según las normativas locales.",
    },
  ];

  const testimonials = [
    {
      name: "María González",
      company: "Diseño Creativo",
      avatar: "👩‍💼",
      quote:
        "InvoiFix me ahorra 5 horas a la semana en administración. Ahora me dedico a crecer mi negocio, no a perseguir facturas.",
    },
    {
      name: "Carlos Ruiz",
      company: "Agencia Digital",
      avatar: "👨‍💻",
      quote:
        "La función de IA nos ayudó a identificar clientes en riesgo de impago. Increíble herramienta.",
    },
    {
      name: "Ana Martín",
      company: "Consultoría Legal",
      avatar: "👩‍⚖️",
      quote:
        "El sistema de tickets transformó cómo atendemos a nuestros clientes. Todo más organizado.",
    },
  ];

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center relative">
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-600 rounded transform rotate-45"></div>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-800">INVOIFIX</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                Características
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                Precios
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                Testimonios
              </a>
              <a
                href="#faq"
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                FAQ
              </a>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Empieza Gratis
              </button>
              <Link
                href="/login"
                className="text-gray-600 hover:text-blue-500 transition-colors px-4 py-2"
              >
                Ingresar
              </Link>
            </div>
            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#features" className="block px-3 py-2 text-gray-600">
                  Características
                </a>
                <a href="#pricing" className="block px-3 py-2 text-gray-600">
                  Precios
                </a>
                <a
                  href="#testimonials"
                  className="block px-3 py-2 text-gray-600"
                >
                  Testimonios
                </a>
                <a href="#faq" className="block px-3 py-2 text-gray-600">
                  FAQ
                </a>
                <button className="w-full mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Empieza Gratis
                </button>
                <Link
                  href="/login"
                  className="block px-3 py-2 text-gray-600 text-center"
                >
                  Ingresar
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Deja de saltar entre apps.
                  <span className="text-blue-500 block">
                    Gestiona tu negocio en un solo lugar.
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  InvoiFix es la plataforma todo-en-uno para freelancers y
                  agencias que combina facturación profesional, gestión de
                  clientes y un sistema de tickets para que nunca pierdas el
                  control.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg">
                  Crea tu primera factura ahora
                </button>
                <button className="border border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-500 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Ver Demo
                </button>
              </div>

              {/* Social Proof */}
              <div className="pt-8">
                <p className="text-sm text-gray-500 mb-4">
                  Con la confianza de freelancers y agencias en todo el mundo
                </p>
                <div className="flex items-center space-x-8 opacity-60">
                  <div className="text-2xl font-bold text-gray-400">
                    TechStart
                  </div>
                  <div className="text-2xl font-bold text-gray-400">
                    CreativeFlow
                  </div>
                  <div className="text-2xl font-bold text-gray-400">
                    AgencyPro
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                    <span className="font-semibold text-gray-800">
                      Dashboard
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        €2,450
                      </div>
                      <div className="text-sm text-gray-600">Este mes</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">8</div>
                      <div className="text-sm text-gray-600">Facturas</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        3
                      </div>
                      <div className="text-sm text-gray-600">Tickets</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Análisis IA
                      </span>
                      <Zap className="w-4 h-4 text-yellow-500" />
                    </div>
                    <p className="text-xs text-gray-600">
                      Cliente "TechCorp" tiene 15% probabilidad de retraso en
                      pago. Recomendamos seguimiento.
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas para hacer crecer tu negocio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Desde facturación hasta análisis con IA, InvoiFix tiene todas las
              herramientas que necesitas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 p-6 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-4xl">
                    {feature.image}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cómo funciona InvoiFix
            </h2>
            <p className="text-xl text-gray-600">
              Simple, rápido y eficiente en solo 3 pasos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-8">
                    <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Precios transparentes para cada etapa
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Empieza gratis y crece con nosotros
            </p>

            {/* Pricing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span
                className={`font-medium ${
                  selectedPlan === "monthly" ? "text-gray-900" : "text-gray-500"
                }`}
              >
                Mensual
              </span>
              <button
                aria-label="Toggle pricing plan"
                onClick={() =>
                  setSelectedPlan(
                    selectedPlan === "monthly" ? "annual" : "monthly"
                  )
                }
                className="relative w-12 h-6 bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none"
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                    selectedPlan === "annual" ? "translate-x-6 bg-blue-500" : ""
                  }`}
                ></div>
              </button>
              <span
                className={`font-medium ${
                  selectedPlan === "annual" ? "text-gray-900" : "text-gray-500"
                }`}
              >
                Anual
                <span className="text-green-600 text-sm ml-1">
                  (Ahorra 20%)
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl border-2 p-8 ${
                  plan.popular
                    ? "border-blue-500 shadow-xl scale-105"
                    : "border-gray-200 hover:border-blue-300"
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Más Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.price !== "Gratis" && (
                      <span className="text-gray-600">/mes</span>
                    )}
                  </div>
                  {plan.originalPrice && (
                    <div className="text-gray-500 line-through text-lg">
                      {plan.originalPrice}/mes
                    </div>
                  )}
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center space-x-3"
                    >
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-xl text-gray-600">
              Miles de profesionales ya confían en InvoiFix
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-gray-600">
              Todo lo que necesitas saber sobre InvoiFix
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para simplificar tu negocio?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Únete a miles de profesionales que ya usan InvoiFix
          </p>
          <button className="bg-white hover:bg-gray-100 text-blue-600 px-10 py-4 rounded-lg font-bold text-xl transition-all duration-300 hover:scale-105 shadow-lg">
            Empezar Gratis Ahora
          </button>
          <p className="text-blue-200 text-sm mt-4">
            Sin tarjeta de crédito • Configuración en 2 minutos
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-600 rounded transform rotate-45"></div>
                  </div>
                </div>
                <span className="text-xl font-bold">INVOIFIX</span>
              </div>
              <p className="text-gray-400">
                La plataforma todo-en-uno para gestionar tu negocio de
                servicios.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Producto</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Características
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Precios
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Testimonios
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Sobre nosotros
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contacto
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Términos de Servicio
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Política de Privacidad
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 InvoiFix. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InvoiFixLanding;
