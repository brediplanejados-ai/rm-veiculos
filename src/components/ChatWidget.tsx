import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, User, Car, Calendar, Clock, CheckCircle2, Wrench } from 'lucide-react';

import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';


type Step = 'START' | 'NAME' | 'PLATE' | 'SERVICE' | 'DATE' | 'TIME' | 'CONFIRMING' | 'CONFIRMED';


interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface AppointmentData {
  name: string;
  plate: string;
  service: string;
  date: string;
  time: string;
}


export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('START');
  const [input, setInput] = useState('');
  const [data, setData] = useState<AppointmentData>({ name: '', plate: '', service: '', date: '', time: '' });
  const [messages, setMessages] = useState<Message[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (text: string, sender: 'bot' | 'user') => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addMessage("Olá! Bem-vindo ao atendimento da RM Auto Center. Sou seu assistente virtual. Para agendar seu serviço, por favor, me informe seu nome completo:", 'bot');
        setStep('NAME');
      }, 500);
    }
  }, [isOpen]);

  const validatePlate = (plate: string) => {
    if (plate.length < 7) return false;
    const oldPlate = /^[A-Z]{3}-?\d{4}$/i;
    const mercosulPlate = /^[A-Z]{3}\d[A-Z]\d{2}$/i;
    return oldPlate.test(plate) || mercosulPlate.test(plate);
  };


  const validateDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return { valid: false, msg: "Infelizmente não posso agendar para o passado. Por favor, escolha uma data de hoje em diante." };
    if (date.getDay() === 0) return { valid: false, msg: "Não funcionamos aos Domingos. Por favor, escolha um dia entre Segunda e Sábado." };
    
    return { valid: true };
  };

  const validateTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    
    // 08:00 to 18:00
    const start = 8 * 60;
    const end = 18 * 60;
    const lunchStart = 12 * 60;
    const lunchEnd = 13.5 * 60; // 13:30

    if (totalMinutes < start || totalMinutes > end) return { valid: false, msg: "Nosso horário de atendimento é das 08h às 18h (Sábados até 12h)." };
    if (totalMinutes >= lunchStart && totalMinutes < lunchEnd) return { valid: false, msg: "Estamos em horário de almoço das 12h às 13:30h. Poderia escolher outro horário?" };
    
    return { valid: true };
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userText = input.trim();
    addMessage(userText, 'user');
    setInput('');

    setTimeout(() => {
      switch (step) {
        case 'NAME':
          setData(prev => ({ ...prev, name: userText }));
          addMessage(`Prazer, ${userText}! Agora, por favor, me informe a placa do seu veículo (ex: ABC-1234 ou ABC1D23):`, 'bot');
          setStep('PLATE');
          break;
        
        case 'PLATE':
          if (validatePlate(userText)) {
            setData(prev => ({ ...prev, plate: userText.toUpperCase() }));
            addMessage("Entendido. O que gostaria de realizar no seu veículo? (Ex: Problema na partida, revisão de ar-condicionado, luz da injeção acesa, etc.)", 'bot');
            setStep('SERVICE');
          } else {
            addMessage("A placa informada parece inválida. Por favor, digite no formato ABC-1234 ou ABC1D23 (mínimo 7 caracteres).", 'bot');
          }
          break;

        case 'SERVICE':
          const serviceDesc = userText.toLowerCase().includes('barulho') 
            ? "Entendido. Vamos realizar uma avaliação técnica detalhada para identificar a origem exata desse barulho."
            : `Perfeito, vamos cuidar da sua solicitação sobre "${userText}".`;
          
          setData(prev => ({ ...prev, service: userText }));
          addMessage(`${serviceDesc} Para qual dia você deseja agendar? (Segunda a Sábado)`, 'bot');
          setStep('DATE');
          break;
        
        case 'DATE':

          const dateValidation = validateDate(userText);
          if (dateValidation.valid) {
            setData(prev => ({ ...prev, date: userText }));
            addMessage("Perfeito. E qual seria o melhor horário? (Atendemos das 08h às 18h, exceto das 12h às 13:30h)", 'bot');
            setStep('TIME');
          } else {
            addMessage(dateValidation.msg || "Data inválida.", 'bot');
          }
          break;
        
        case 'TIME':
          const timeValidation = validateTime(userText);
          if (timeValidation.valid) {
            // Simulated conflict checking
            if (userText === '10:00' || userText === '14:00') {
              addMessage(`Infelizmente o horário das ${userText} já está reservado. Tenho disponível às 09:00 ou 11:00. Qual fica melhor?`, 'bot');
            } else {
              setData(prev => ({ ...prev, time: userText }));
              const confirmedData = { ...data, time: userText };
              
              const summary = `✅ AGENDAMENTO RM AUTO CENTER CONFIRMADO!
━━━━━━━━━━━━━━━━━━━━━━
👤 Cliente: ${confirmedData.name}
🚗 Placa: ${confirmedData.plate}
🛠️ Serviço: ${confirmedData.service}
📅 Data: ${confirmedData.date}
⏰ Horário: ${userText}
━━━━━━━━━━━━━━━━━━━━━━
*📍 Local: R. Sinhô de Camargo, 425 - Centro, Itapeva, SP*
*🔔 Dica: Chegue com 10 minutos de antecedência.*

Posso confirmar?`;

              addMessage(summary, 'bot');
              setStep('CONFIRMING');
            }

          } else {
            addMessage(timeValidation.msg || "Horário inválido.", 'bot');
          }
          break;
        
        case 'CONFIRMING':
          if (userText.toLowerCase().includes('sim') || userText.toLowerCase().includes('ok') || userText.toLowerCase().includes('confirm')) {
            // Persistir no Supabase
            const saveToSupabase = async () => {
              try {
                const { error } = await supabase
                  .from('appointments')
                  .insert([
                    {
                      name: data.name,
                      plate: data.plate,
                      service: data.service,
                      appointment_date: data.date,
                      appointment_time: data.time
                    }
                  ]);
                
                if (error) console.error('Erro ao salvar no Supabase:', error);
              } catch (err) {
                console.error('Falha na conexão com Supabase:', err);
              }
            };

            saveToSupabase();

            addMessage("Confirmado! Estou enviando seu agendamento para nossa equipe técnica. Por favor, chegue com 10 minutos de antecedência. Estamos te esperando!", 'bot');
            setStep('CONFIRMED');
            
            const whatsappMsg = `✅ AGENDAMENTO RM AUTO CENTER CONFIRMADO!\n━━━━━━━━━━━━━━━━━━━━━━\n👤 Cliente: ${data.name}\n🚗 Placa: ${data.plate}\n🛠️ Serviço: ${data.service}\n📅 Data: ${data.date}\n⏰ Horário: ${data.time}\n━━━━━━━━━━━━━━━━━━━━━━\n📍 Local: R. Sinhô de Camargo, 425 - Centro, Itapeva, SP`;
            window.open(`https://wa.me/5515991675075?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
          } else {


            addMessage("Sem problemas. O que você gostaria de alterar? (Nome, Placa, Data ou Horário?)", 'bot');
          }
          break;
      }
    }, 1000);
  };

  return (
    <>
      {/* Botão Flutuante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100] w-16 h-16 flex items-center justify-center rounded-full precision-gradient text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        <AnimatePresence mode='wait'>
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-8 h-8" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-8 h-8" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Widget de Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-[100] w-[380px] h-[550px] bg-white rounded-sm shadow-3xl overflow-hidden flex flex-col border border-zinc-100"
          >
            {/* Header */}
            <div className="precision-gradient p-6 text-white shrink-0">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-sm bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <CheckCircle2 className="w-6 h-6" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-primary" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg leading-tight">RM Auto Center</h3>
                  <p className="text-white/70 text-xs uppercase tracking-widest font-bold">Assistente Virtual</p>
                </div>
              </div>
            </div>

            {/* Mensagens */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-zinc-50/50"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.sender === 'bot' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    msg.sender === 'bot' ? "items-start" : "items-end ml-auto"
                  )}
                >
                  <div className={cn(
                    "p-4 rounded-sm text-sm font-body leading-relaxed",
                    msg.sender === 'bot' 
                      ? "bg-white border border-zinc-100 text-on-surface shadow-sm" 
                      : "precision-gradient text-white"
                  )}>
                    {msg.text.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-1 uppercase font-bold tracking-wider">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-zinc-100">
              {step === 'DATE' ? (
                <input 
                  type="date"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-sm focus:outline-none focus:border-primary transition-colors text-sm font-body"
                />
              ) : step === 'TIME' ? (
                <input 
                  type="time"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-sm focus:outline-none focus:border-primary transition-colors text-sm font-body"
                />
              ) : (
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    placeholder="Digite sua resposta..."
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    disabled={step === 'CONFIRMED'}
                    className="w-full p-4 pr-12 bg-zinc-50 border border-zinc-200 rounded-sm focus:outline-none focus:border-primary transition-colors text-sm font-body placeholder:text-zinc-400"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || step === 'CONFIRMED'}
                    className="absolute right-2 top-2 w-10 h-10 flex items-center justify-center text-primary hover:bg-zinc-100 rounded-full transition-colors disabled:opacity-30"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              )}
              
              <div className="flex justify-between items-center mt-3">
                <div className="flex gap-2">
                  <div className={cn("w-1.5 h-1.5 rounded-full transition-colors", step === 'NAME' ? "bg-primary" : "bg-zinc-200")} />
                  <div className={cn("w-1.5 h-1.5 rounded-full transition-colors", step === 'PLATE' ? "bg-primary" : "bg-zinc-200")} />
                  <div className={cn("w-1.5 h-1.5 rounded-full transition-colors", step === 'SERVICE' ? "bg-primary" : "bg-zinc-200")} />
                  <div className={cn("w-1.5 h-1.5 rounded-full transition-colors", step === 'DATE' ? "bg-primary" : "bg-zinc-200")} />
                  <div className={cn("w-1.5 h-1.5 rounded-full transition-colors", step === 'TIME' ? "bg-primary" : "bg-zinc-200")} />

                </div>
                <span className="text-[10px] text-zinc-400 uppercase font-black italic tracking-widest">Powered by RM AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
