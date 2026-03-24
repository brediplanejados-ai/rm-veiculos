/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  Zap, 
  Snowflake, 
  Key, 
  Speaker, 
  Eye, 
  CheckCircle2, 
  Settings,
  Shield,
  Smartphone, 
  Clock, 
  MapPin, 
  Menu,
  X,
  Share2,
  Mail,
  MessageCircle,
  Pin,
  ChevronRight
} from 'lucide-react';


import { cn } from './lib/utils';
import logo from './assets/logo.svg';
import logoWhite from './assets/logo-white.svg';
import mapItapeva from './assets/map-itapeva.png';
import { ChatWidget } from './components/ChatWidget';

import serviceChaveiro from './assets/service-chaveiro.png';
import serviceAr from './assets/service-ar.png';
import serviceInjecao from './assets/service-injecao.png';
import serviceVidros from './assets/service-vidros.png';
import serviceAcessorios from './assets/service-acessorios.png';
import serviceParaBrisa from './assets/service-para-brisa.png';
import fachada from './assets/fachada.png';





export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      title: 'Chaveiro Automotivo',
      description: 'Cópias de chaves codificadas, canivetes, reparo de cilindros e controle de alarmes com precisão.',
      image: serviceChaveiro,
      icon: <Key className="w-10 h-10 text-primary" />
    },
    {
      title: 'Ar Condicionado',
      description: 'Carga de gás R134a, higienização completa e manutenção corretiva para o seu conforto térmico.',
      image: serviceAr,
      icon: <Snowflake className="w-10 h-10 text-primary" />
    },
    {
      title: 'Injeção Eletrônica',
      description: 'Diagnóstico avançado com scanner Rasther III, reparo de módulos ECU e teste de sensores.',
      image: serviceInjecao,
      icon: <Zap className="w-10 h-10 text-primary" />
    },
    {
      title: 'Vidros e Travas',
      description: 'Instalação de kits elétricos, reparo de máquinas de vidro e manutenção de travas e retrovisores.',
      image: serviceVidros,
      icon: <Settings className="w-10 h-10 text-primary" />
    },
    {
      title: 'Acessórios e Iluminação',
      description: 'Alarmes, câmeras de ré, sensores e revisão de sistema de ignição (velas e cabos).',
      image: serviceAcessorios,
      icon: <Shield className="w-10 h-10 text-primary" />
    },
    {
      title: 'Para-Brisa',
      description: 'Substituição e reparo de vidros automotivos e para-brisas com garantia de vedação.',
      image: serviceParaBrisa,
      icon: <CheckCircle2 className="w-10 h-10 text-primary" />
    }
  ];







  return (
    <div className="min-h-screen selection:bg-primary selection:text-white">
      {/* Header */}
      <header className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        scrolled 
          ? "bg-white/90 backdrop-blur-md py-3 border-zinc-200 shadow-sm" 
          : "bg-transparent py-5 border-transparent"
      )}>
        <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <img 
              src={scrolled ? logo : logoWhite} 
              alt="RM Auto Center" 
              className="h-10 md:h-12 w-auto transition-all duration-300"
            />
          </div>


          <div className="hidden md:flex items-center gap-8">
            {['Serviços', 'Sobre Nós', 'Contato'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={cn(
                  "text-sm font-bold uppercase tracking-widest transition-colors hover:text-primary",
                  scrolled ? "text-zinc-600" : "text-zinc-300"
                )}
              >
                {item}
              </a>
            ))}
            <a 
              href="https://wa.me/5515991675075?text=Olá,%20gostaria%20de%20agendar%20um%20serviço%20na%20RM%20Auto%20Center.%20Meu%20nome%20é...%20e%20meu%20veículo%20é%20um..." 
              target="_blank" 
              rel="noopener noreferrer"
              className="precision-gradient text-white px-6 py-2 font-headline font-bold uppercase text-xs tracking-widest rounded-sm active:scale-95 transition-transform inline-block"
            >
              AGENDAR
            </a>

          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="text-zinc-900" /> : <Menu className={scrolled ? "text-zinc-900" : "text-white"} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {['Serviços', 'Sobre Nós', 'Contato'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-headline font-black uppercase tracking-tighter text-zinc-900"
                >
                  {item}
                </a>
              ))}
              <button className="precision-gradient text-white w-full py-4 font-headline font-bold uppercase tracking-widest rounded-sm">
                AGENDAR AGORA
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden bg-zinc-950">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBARRMEi6oQ-JCn0OQ49EBv_65zwp53qYmF4NsUSYTyxH0pLFr9Dg3tfnNzc8Ubxj3__mYaeKxatwzcXGd_du_aUDf0op7gUD39VekFEWm726WpiodspD7KEqyZC9xBvRoOsgw013sp124OgGBm-VQ-BXK3KCB09glBrRUK065racSkB_st2K5LnouGhJFYma9UTGstmDuOA--PSsWyRFkVr7nWuCziGRZxDb3VpXBfmtWbsGRQZ9f0TAqZFjMnYjQsY5dH9PsfHc1l" 
              alt="Workshop"
              className="w-full h-full object-cover opacity-40 grayscale"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl space-y-8"
            >
              <div className="inline-flex items-center gap-2">
                <span className="bg-primary px-3 py-1 text-white font-headline font-bold tracking-widest uppercase text-xs rounded-sm shadow-lg shadow-primary/20">
                  Tecnologia de Ponta
                </span>
              </div>
              <h1 className="text-white font-headline text-5xl md:text-7xl font-black leading-tight tracking-tighter text-shadow-md">
                SOLUÇÕES COMPLETAS COM <span className="text-primary-container">PRECISÃO</span> E CONFIANÇA.
              </h1>
              <p className="text-zinc-300 text-lg md:text-xl font-medium leading-relaxed text-shadow-sm">
                Especialistas em auto elétrica, injeção eletrônica, ar-condicionado e acessórios. Tecnologia de última geração para cuidar da performance do seu veículo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="https://wa.me/5515991675075?text=Olá,%20gostaria%20de%20agendar%20um%20serviço%20na%20RM%20Auto%20Center.%20Meu%20nome%20é...%20e%20meu%20veículo%20é%20um..." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="precision-gradient text-white px-8 py-5 font-headline font-bold text-lg rounded-sm active:scale-95 transition-all shadow-xl shadow-primary/20 uppercase tracking-tight inline-block text-center"
                >
                  Agendar Avaliação Agora
                </a>

                <button className="bg-zinc-800/50 backdrop-blur-sm text-white px-8 py-5 font-headline font-bold text-lg rounded-sm active:scale-95 transition-all hover:bg-zinc-700/50 uppercase tracking-tight">
                  Ver Serviços
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="serviços" className="py-24 bg-surface-bright">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="space-y-4">
                <h2 className="text-primary font-headline font-bold tracking-widest uppercase text-sm">Nossa Expertise</h2>
                <h3 className="text-4xl md:text-5xl font-headline font-black tracking-tighter text-on-surface">SERVIÇOS TÉCNICOS</h3>
              </div>
              <p className="text-secondary max-w-md font-body leading-relaxed border-l border-zinc-300 pl-6">
                Combinamos precisão industrial com atendimento personalizado para garantir que cada diagnóstico seja cirúrgico.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              {services.map((service, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedService(service)}
                  className="group relative overflow-hidden h-[400px] transition-all duration-500 bg-surface-container-high border-r border-b border-white/5 cursor-pointer"
                >
                  {service.image && (
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="relative p-10 h-full flex flex-col z-10 justify-end">
                    <div className="mb-6">{service.icon}</div>
                    <h4 className="text-2xl md:text-3xl font-headline font-bold mb-4 text-on-surface">
                      {service.title}
                    </h4>
                    <p className="max-w-sm text-secondary">
                      {service.description}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver Detalhes <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal de Serviço */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white w-full max-w-4xl overflow-hidden rounded-sm shadow-2xl flex flex-col md:flex-row h-auto max-h-[90vh]"
              >
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors md:bg-transparent md:text-zinc-400 md:hover:text-zinc-900"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                  <img 
                    src={selectedService.image} 
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-zinc-100 rounded-sm">
                      {selectedService.icon}
                    </div>
                    <span className="text-primary font-headline font-bold uppercase tracking-widest text-sm">Especialidade RM</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-headline font-black tracking-tighter text-on-surface mb-6 uppercase">
                    {selectedService.title}
                  </h3>
                  
                  <p className="text-lg text-secondary leading-relaxed font-body mb-10">
                    {selectedService.description}
                  </p>

                  <div className="space-y-4">
                    <a 
                      href={`https://wa.me/5515991675075?text=Olá,%20tenho%20interesse%20no%20serviço%20de%20${encodeURIComponent(selectedService.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="precision-gradient text-white w-full py-5 font-headline font-bold text-center block rounded-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest"
                    >
                      Agendar este serviço
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>


        {/* Why Choose Us */}
        <section id="sobre-nós" className="py-24 bg-white border-y border-zinc-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div className="relative h-[600px] group">
                <img 
                  src={fachada} 
                  alt="Fachada RM Auto Center"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 shadow-2xl"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute -bottom-6 -right-6 bg-primary p-12 hidden md:block shadow-2xl">
                  <p className="text-white font-headline font-black text-6xl leading-none">20+</p>
                  <p className="text-white font-label text-sm uppercase tracking-widest mt-2">Anos de Tradição</p>
                </div>
              </div>

              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="text-primary font-headline font-bold tracking-widest uppercase text-sm">Por que nos escolher?</h2>
                  <h3 className="text-4xl md:text-6xl font-headline font-black tracking-tighter text-on-surface leading-[0.9]">PRECISÃO QUE MOVE VOCÊ.</h3>
                </div>

                <div className="grid gap-10">
                  {[
                    {
                      title: "Diagnóstico High-Tech",
                      desc: "Utilizamos scanners de última geração compatíveis com os lançamentos mais recentes do mercado global.",
                      icon: <Zap className="w-6 h-6 text-primary" />
                    },
                    {
                      title: "Agilidade Industrial",
                      desc: "Processos otimizados para garantir o menor tempo de permanência do seu veículo sem comprometer a qualidade.",
                      icon: <Clock className="w-6 h-6 text-primary" />
                    },
                    {
                      title: "Equipe Especializada",
                      desc: "Profissionais em constante treinamento para lidar com as novas arquiteturas de veículos híbridos e elétricos.",
                      icon: <CheckCircle2 className="w-6 h-6 text-primary" />
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-6">
                      <div className="w-12 h-12 flex-shrink-0 bg-surface-container-high flex items-center justify-center rounded-sm">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-headline font-bold uppercase tracking-tight mb-2">{item.title}</h4>
                        <p className="text-secondary leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>




        {/* Contact Section */}
        <section id="contato" className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-10">
                <div className="space-y-4">
                  <h2 className="text-primary font-headline font-bold tracking-widest uppercase text-sm">Fale Conosco</h2>
                  <h3 className="text-4xl md:text-5xl font-headline font-black tracking-tighter text-on-surface">PRONTO PARA O SERVICE?</h3>
                </div>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <Smartphone className="text-primary w-6 h-6" />
                    <div>
                      <p className="font-headline font-bold uppercase text-xs tracking-widest text-secondary mb-1">WhatsApp</p>
                      <p className="text-2xl font-headline font-bold text-on-surface">(15) 99167-5075</p>

                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="text-primary w-6 h-6" />
                    <div>
                      <p className="font-headline font-bold uppercase text-xs tracking-widest text-secondary mb-1">Horário de Funcionamento</p>
                      <p className="text-xl font-headline font-medium text-on-surface">Segunda a Sexta: 08:30 às 18:00</p>
                      <p className="text-zinc-500">Sábados: 08:30 às 12:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="text-primary w-6 h-6" />
                    <div>
                      <p className="text-lg font-headline font-medium text-on-surface leading-snug">R. Sinhô de Camargo, 425 - Centro<br/>Itapeva, SP - 18400-550</p>

                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[450px] bg-surface-container-high relative group">
                <div className="absolute inset-0 grayscale contrast-125 opacity-70 group-hover:grayscale-0 transition-all duration-1000">
                  <img 
                    src={mapItapeva} 
                    alt="Mapa Itapeva"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-6 shadow-2xl relative">
                    <Pin className="text-primary w-8 h-8 absolute -top-10 left-1/2 -translate-x-1/2 fill-primary" />
                    <p className="font-headline font-black text-on-surface tracking-tighter">RM AUTO CENTER</p>
                    <a href="https://www.google.com/maps/search/?api=1&query=R.+Sinhô+de+Camargo,+425+-+Centro,+Itapeva+-+SP,+18400-550" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary uppercase tracking-widest mt-2 block hover:underline">Ver no Google Maps</a>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full pt-16 pb-8 bg-zinc-100">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <img src={logo} alt="RM Auto Center" className="h-12 w-auto" />
            </div>

            <p className="text-zinc-500 max-w-sm text-sm">
              Elevando o padrão de manutenção automotiva com precisão industrial e transparência total.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-headline font-bold text-zinc-900 uppercase text-xs tracking-widest">Navegação</h4>
            <ul className="space-y-2">
              {['Serviços', 'Sobre Nós', 'Localização'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-zinc-500 hover:text-primary transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-headline font-bold text-zinc-900 uppercase text-xs tracking-widest">Legal</h4>
            <ul className="space-y-2">
              {['Privacidade', 'Termos de Uso'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-zinc-500 hover:text-primary transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-600">© 2024 RM Auto Center. High-Performance Maintenance.</p>
          <div className="flex gap-6">
            <a href="#" className="text-zinc-400 hover:text-primary transition-colors"><Share2 className="w-5 h-5" /></a>
            <a href="#" className="text-zinc-400 hover:text-primary transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>

  );
}
