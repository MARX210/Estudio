"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useToast } from "@/hooks/use-toast";
import { FadeInView } from "@/components/animations/FadeInView";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { handleContactFormSubmit } from "@/lib/actions";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres." }).max(50, { message: "Nome não pode exceder 50 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres." }).max(500, { message: "Mensagem não pode exceder 500 caracteres." }),
});

type ContactFormValues = z.infer<typeof formSchema>;

export function ContactFormSection() {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      const result = await handleContactFormSubmit(values);
      if (result.success) {
        toast({
          title: "Mensagem Enviada!",
          description: "Obrigado por entrar em contato. Responderemos em breve.",
        });
        form.reset();
      } else {
        throw new Error(result.error || "Ocorreu um erro ao enviar a mensagem.");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao Enviar",
        description: error.message || "Não foi possível enviar sua mensagem. Tente novamente.",
      });
    }
  }

  return (
    <section id="contato" className="bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title="Entre em Contato"
          subtitle="Vamos conversar sobre como podemos ajudar sua empresa a alcançar a conformidade com a NR-1 e promover um ambiente de trabalho mais saudável."
        />
        <FadeInView>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 bg-card p-6 md:p-10 rounded-xl shadow-lg border">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-primary">Informações de Contato</h3>
              <p className="text-muted-foreground">
                Estamos à disposição para esclarecer suas dúvidas e discutir suas necessidades.
              </p>
              <div className="space-y-3">
                <a href="tel:+5511999999999" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group">
                  <Phone className="w-5 h-5 text-primary group-hover:animate-pulse" />
                  <span>(11) 99999-9999 (WhatsApp disponível)</span>
                </a>
                <a href="mailto:contato@psychosocialsolutions.com.br" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group">
                  <Mail className="w-5 h-5 text-primary group-hover:animate-pulse" />
                  <span>contato@psychosocialsolutions.com.br</span>
                </a>
                <div className="flex items-center gap-3 text-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Atendimento em todo o Brasil (Online e Presencial sob consulta)</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">
                Resposta em até 24h úteis.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome" {...field} className="bg-background"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="seuemail@exemplo.com" {...field} className="bg-background"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone (Opcional)</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="(XX) XXXXX-XXXX" {...field} className="bg-background"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensagem</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Como podemos ajudar sua empresa?"
                          rows={5}
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full shadow-md hover:shadow-lg" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Enviando..." : <>Enviar Mensagem <Send className="ml-2 h-4 w-4" /></>}
                </Button>
              </form>
            </Form>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
