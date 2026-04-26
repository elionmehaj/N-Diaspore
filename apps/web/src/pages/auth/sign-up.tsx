import { useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Mail, Lock, User } from "lucide-react";

const signUpSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (data: SignUpForm) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      login(data.email, data.name);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={`${import.meta.env.BASE_URL}images/auth-bg.png`} alt="Background" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kthehu në ballinë
          </Link>

          <div className="glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-400 to-purple-500" />
            
            <div className="text-center mb-8">
              <img src="/logo.png" alt="KahKosova Logo" className="h-12 w-auto mx-auto mb-4 object-contain" />
              <h1 className="text-2xl font-display font-bold text-white">Krijo Llogari</h1>
              <p className="text-white/60 text-sm mt-2">Bashkohuni me KahKosova për të menaxhuar shërbimet tuaja</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-white/80">Emri i Plotë</Label>
                      <FormControl>
                        <div className="relative">
                          <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                          <Input 
                            placeholder="Dardan Hoxha" 
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl focus:border-primary focus:ring-primary/20" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-white/80">Emaili</Label>
                      <FormControl>
                        <div className="relative">
                          <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                          <Input 
                            placeholder="ju@shembull.com" 
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl focus:border-primary focus:ring-primary/20" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-white/80">Fjalëkalimi</Label>
                      <FormControl>
                        <div className="relative">
                          <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                          <Input 
                            type="password"
                            placeholder="••••••••" 
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl focus:border-primary focus:ring-primary/20" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 mt-4"
                >
                  {isLoading ? "Po krijohet llogaria..." : "Regjistrohu"}
                </Button>
              </form>
            </Form>

            <p className="text-center text-sm text-white/60 mt-8">
              Keni llogari?{" "}
              <Link href="/sign-in" className="text-primary hover:underline font-medium">Kyçuni</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
