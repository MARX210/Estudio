"use client";

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { BotMessageSquare, User, Send, CornerDownLeft, X, Loader2 } from 'lucide-react';
import { getChatbotResponse } from '@/lib/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const initialMessage: Message = {
    id: 'initial-ai-message',
    text: 'Olá! Sou seu assistente virtual para NR-1. Como posso ajudar com suas dúvidas sobre conformidade ou avaliação inicial de riscos psicossociais?',
    sender: 'ai',
    timestamp: new Date(),
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([initialMessage]);
    }
  }, [isOpen]);


  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth'});
    }
  }, [messages]);

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString() + '-user',
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await getChatbotResponse(userMessage.text);
      if (response.answer) {
        const aiMessage: Message = {
          id: Date.now().toString() + '-ai',
          text: response.answer,
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else if (response.error) {
        const errorMessage: Message = {
          id: Date.now().toString() + '-error',
          text: response.error,
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString() + '-error-catch',
        text: 'Ocorreu um erro inesperado. Tente novamente.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSheetOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Optionally reset messages or keep history
      // setMessages([]); 
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
        <SheetTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg hover:scale-110 transition-transform duration-200 z-50 bg-primary hover:bg-primary/90"
            aria-label="Abrir chat de assistência"
          >
            <BotMessageSquare className="h-7 w-7 text-primary-foreground" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full max-w-md p-0 flex flex-col" onPointerDownOutside={(e) => e.preventDefault()}>
          <SheetHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-semibold text-primary flex items-center">
                <BotMessageSquare className="mr-2 h-6 w-6" />
                Assistente NR-1
              </SheetTitle>
              <SheetClose asChild>
                 <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Fechar chat</span>
                 </Button>
              </SheetClose>
            </div>
          </SheetHeader>
          
          <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex items-end gap-2 max-w-[85%]",
                    msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  )}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={msg.sender === 'ai' ? '/logo.svg' : undefined} alt={msg.sender} data-ai-hint="abstract brainwave" />
                    <AvatarFallback className={cn(msg.sender === 'user' ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground')}>
                      {msg.sender === 'user' ? <User size={18}/> : <BotMessageSquare size={18} />}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "p-3 rounded-lg shadow-sm break-words",
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-muted text-muted-foreground rounded-bl-none'
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    <p className={cn(
                        "text-xs mt-1",
                        msg.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground/70 text-left'
                      )}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-end gap-2 mr-auto max-w-[85%]">
                   <Avatar className="w-8 h-8">
                    <AvatarImage src="/logo.svg" alt="AI" data-ai-hint="abstract brainwave" />
                    <AvatarFallback className='bg-primary text-primary-foreground'>
                      <BotMessageSquare size={18} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="p-3 rounded-lg shadow-sm bg-muted text-muted-foreground rounded-bl-none">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <SheetFooter className="p-4 border-t bg-background">
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Digite sua pergunta..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()} aria-label="Enviar mensagem">
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </form>
             <p className="text-xs text-muted-foreground text-center mt-2">
              Pressione Shift+Enter para nova linha. <CornerDownLeft className="inline h-3 w-3" />
            </p>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
