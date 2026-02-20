import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, ChevronRight, User, Bot, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  options?: string[];
}

const DiagnosticChat = ({ isOpen: externalIsOpen, onOpenChange }: { isOpen?: boolean, onOpenChange?: (open: boolean) => void }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      id: 'greeting',
      text: "Olá! Sou o assistente virtual da Botoxflix. ✨ Vamos fazer um pré-diagnóstico rápido para entender como podemos ajudar você?",
      options: ["Sim, vamos!", "Quero saber mais"]
    },
    {
      id: 'name',
      text: "Excelente! Para começarmos, qual é o seu nome?",
      type: 'input'
    },
    {
      id: 'age',
      text: "E quantos anos você tem?",
      type: 'input'
    },
    {
      id: 'area',
      text: "Prazer! Qual área do rosto mais te incomoda ou você gostaria de prevenir marcas?",
      options: ["Testa (linhas de expressão)", "Glabela (entre as sobrancelhas)", "Pés de galinha (olhos)", "Geral/Prevenção"]
    },
    {
      id: 'experience',
      text: "Você já realizou procedimentos com toxina botulínica antes?",
      options: ["Sim, já faço regularmente", "Fiz uma ou duas vezes", "Nunca fiz, sou iniciante"]
    },
    {
      id: 'goal',
      text: "Qual é o seu principal objetivo com o Botoxflix?",
      options: ["Resultado natural/Suave", "Pele bem lisinha", "Prevenção a longo prazo"]
    },
    {
      id: 'schedule',
      text: "Qual seria o melhor horário para agendarmos sua avaliação?",
      options: ["Manhã (08h-12h)", "Tarde (12h-18h)", "Noite (18h-21h)"]
    },
    {
      id: 'final',
      text: "Perfeito! Já tenho as informações para seu pré-diagnóstico. Vamos finalizar o agendamento pelo WhatsApp?",
      options: ["Sim, me redirecione"]
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(steps[0]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addBotMessage = (step: any) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: step.text,
      sender: 'bot',
      options: step.options
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleUserInput = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    const newAnswers = { ...answers, [steps[currentStep].id]: text };
    setAnswers(newAnswers);

    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setTimeout(() => {
        addBotMessage(steps[nextStep]);
      }, 600);
    } else {
      handleFinalRedirect(newAnswers);
    }
  };

  const handleOptionClick = (option: string) => {
    handleUserInput(option);
  };

  const handleFinalRedirect = (finalAnswers: Record<string, string>) => {
    const message = `Olá! Gostaria de saber mais sobre o botox por assinatura e agendar minha avaliação. 
 
 Meus dados: 
 
 - Nome: ${finalAnswers.name || 'Não informado'}
 - Idade: ${finalAnswers.age ? `${finalAnswers.age} anos` : 'Não informada'}
 - Melhor horário: ${finalAnswers.schedule || 'Não especificado'}
 - Perfil: ${finalAnswers.experience || 'Não informado'}
 - Objetivo: ${finalAnswers.area || ''}${finalAnswers.area && finalAnswers.goal ? ' e ' : ''}${finalAnswers.goal || ''}
 
 Aguardo o retorno!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5524999226925?text=${encodedMessage}`;
    
    // Tenta abrir em nova aba
    const newWindow = window.open(whatsappUrl, '_blank');
    
    // Fallback para mobile ou bloqueadores de popup
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = whatsappUrl;
    }
  };

  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleUserInput(inputValue.trim());
      setInputValue('');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setMessages([]);
      setCurrentStep(0);
      setAnswers({});
      setInputValue('');
    }, 300); // Aguarda a animação de fechar terminar
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Chat Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 netflix-glow group"
        >
          <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-2 -right-2 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-white text-[#E50914] text-[10px] font-bold items-center justify-center">1</span>
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 sm:absolute sm:inset-auto sm:bottom-0 sm:right-0 w-full h-full sm:w-[400px] sm:h-[550px] bg-[#121212] border-0 sm:border sm:border-white/10 rounded-none sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeInUp">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#6B1A2A] to-[#E50914] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Botoxflix Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-white/70 uppercase tracking-widest">Online agora</span>
                </div>
              </div>
            </div>
            <button onClick={handleClose} className="text-white/70 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === 'user' ? 'bg-white/10' : 'bg-[#E50914]'}`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`p-3 rounded-2xl text-base leading-relaxed ${msg.sender === 'user' ? 'bg-white text-black rounded-tr-none' : 'bg-white/5 border border-white/10 text-white rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Options */}
            {messages[messages.length - 1]?.sender === 'bot' && messages[messages.length - 1]?.options && (
              <div className="flex flex-col gap-2 ml-10">
                {messages[messages.length - 1].options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    className={`text-left p-4 rounded-xl transition-all duration-300 text-sm flex items-center justify-between group ${
                      option === "Sim, me redirecione" 
                        ? "bg-[#25D366] text-white hover:bg-[#1aa855] border-none shadow-lg shadow-green-500/20" 
                        : "bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black"
                    }`}
                  >
                    {option}
                    <ChevronRight className={`w-5 h-5 transition-opacity ${option === "Sim, me redirecione" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Info */}
          <div className="p-4 border-t border-white/5 bg-black/50 space-y-3">
            {/* Input for text steps */}
            {messages[messages.length - 1]?.sender === 'bot' && steps[currentStep]?.type === 'input' && (
              <form onSubmit={handleSubmit} className="flex gap-2 items-center bg-white/5 border border-white/10 rounded-xl px-2 py-1 focus-within:border-[#E50914] transition-colors">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Digite aqui..."
                  className="flex-1 bg-transparent border-none rounded-none px-2 py-2 text-white text-base focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="p-2 bg-[#E50914] text-white rounded-lg hover:scale-105 active:scale-95 transition-all flex-shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
            <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest">
              🔒 Seu diagnóstico é privado e seguro
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosticChat;
