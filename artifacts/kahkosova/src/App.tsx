import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/home";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
import Dashboard from "@/pages/dashboard/index";
import Services from "@/pages/services/index";
import GiftGateway from "@/pages/services/gift-gateway";
import ReturnChecklist from "@/pages/services/checklist";
import FormBuilder from "@/pages/services/form-builder";
import LandLeasing from "@/pages/land-leasing/index";
import News from "@/pages/news/index";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Shendeti from "@/pages/shendeti";
import Ndertimi from "@/pages/ndertimi";
import Investime from "@/pages/investime";
import Transporti from "@/pages/transporti";
import Gjurmet from "@/pages/gjurmet";
import Bizneset from "@/pages/bizneset";
import Kufiri from "@/pages/kufiri";
import GjuhaJone from "@/pages/gjuha-jone";
import Agjenti from "@/pages/agjenti";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/services" component={Services} />
      <Route path="/services/gift-gateway" component={GiftGateway} />
      <Route path="/services/checklist" component={ReturnChecklist} />
      <Route path="/services/form-builder" component={FormBuilder} />
      <Route path="/land-leasing" component={LandLeasing} />
      <Route path="/kufiri" component={Kufiri} />
      <Route path="/gjuha-jone" component={GjuhaJone} />
      <Route path="/news" component={News} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/shendeti" component={Shendeti} />
      <Route path="/ndertimi" component={Ndertimi} />
      <Route path="/investime" component={Investime} />
      <Route path="/transporti" component={Transporti} />
      <Route path="/gjurmet" component={Gjurmet} />
      <Route path="/bizneset" component={Bizneset} />
      <Route path="/agjenti" component={Agjenti} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <LanguageProvider>
            <AuthProvider>
              <Router />
              <Toaster />
            </AuthProvider>
          </LanguageProvider>
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
