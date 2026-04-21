import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider } from "./contexts/LanguageContext";
import Portfolio from "./components/Portfolio";
import PortfolioPage from "./pages/Portfolio";
import TestimonialsPage from "./pages/Testimonials";
import ContactPage from "./pages/Contact";
import DonationPage from "./pages/Donation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Portfolio} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/testimonials" component={TestimonialsPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/donation" component={DonationPage} />
      <Route path="/:rest*" component={Portfolio} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
