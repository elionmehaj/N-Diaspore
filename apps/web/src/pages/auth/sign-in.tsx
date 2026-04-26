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
import { ArrowLeft, Mail, Lock } from "lucide-react";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function SignIn() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: SignInForm) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      login(data.email, data.email.split('@')[0]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background Image / Pattern */}
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
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-400 to-purple-500" />
            
            <div className="text-center mb-8">
              <img src="/logo.png" alt="KahKosova Logo" className="h-12 w-auto mx-auto mb-4 object-contain" />
              <h1 className="text-2xl font-display font-bold text-white">Mirë se vini!</h1>
              <p className="text-white/60 text-sm mt-2">Kyçuni për të menaxhuar llogarinë tuaj</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                      <div className="flex items-center justify-between">
                        <Label className="text-white/80">Fjalëkalimi</Label>
                        <a href="#" className="text-xs text-primary hover:underline">Harruat fjalëkalimin?</a>
                      </div>
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
                  className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 mt-2"
                >
                  {isLoading ? "Duke u kyçur..." : "Kyçu"}
                </Button>
              </form>
            </Form>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-white/40 uppercase tracking-wider">OSE VAZHDO ME</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button type="button" variant="outline" className="h-11 bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl">
                Google
              </Button>
              <Button type="button" variant="outline" className="h-11 bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl">
                Apple
              </Button>
            </div>

            <p className="text-center text-sm text-white/60 mt-8">
              Nuk keni llogari?{" "}
              <Link href="/sign-up" className="text-primary hover:underline font-medium">Regjistrohuni</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
