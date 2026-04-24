import { createContext, useContext, useState, ReactNode } from "react";

type Language = "AL" | "DE";

export type TranslationDict = {
  // Navbar
  home: string;
  services: string;
  land: string;
  news: string;
  about: string;
  contact: string;
  login: string;
  register: string;
  dashboard: string;
  logout: string;
  gjurmet: string;
  bizneset: string;
  kufiri: string;
  gjuha: string;
  // Toka page
  mapTitle: string;
  searchPlaceholder: string;
  filters: string;
  hectares: string;
  monthlyPrice: string;
  interactiveMap: string;
  propertyFound: string;
  invest: string;
  price: string;
  area: string;
  location: string;
  viewDetails: string;
  closeSheet: string;
  propertyTitle: string;
  // Home page
  heroTagline: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroBtn1: string;
  heroBtn2: string;
  statFamilies: string;
  statKomuens: string;
  statSatisfaction: string;
  featuresTitle: string;
  featuresSubtitle: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  seeMore: string;
  trustTitle: string;
  trustSubtitle: string;
  trustCurrency: string;
  trustInstant: string;
  // Auth pages
  signInTitle: string;
  signInSubtitle: string;
  emailLabel: string;
  passwordLabel: string;
  signInBtn: string;
  noAccount: string;
  signUpTitle: string;
  signUpSubtitle: string;
  nameLabel: string;
  confirmPasswordLabel: string;
  signUpBtn: string;
  haveAccount: string;
  // Services page
  servicesTitle: string;
  servicesSubtitle: string;
  // Gjurmet page
  gjurmetTitle: string;
  gjurmetSubtitle: string;
  gjurmetSearchTitle: string;
  gjurmetSurnameLabel: string;
  gjurmetVillageLabel: string;
  gjurmetSearchBtn: string;
  gjurmetTimelineTitle: string;
  gjurmetMilestone1Title: string;
  gjurmetMilestone1Desc: string;
  gjurmetMilestone2Title: string;
  gjurmetMilestone2Desc: string;
  gjurmetMilestone3Title: string;
  gjurmetMilestone3Desc: string;
  gjurmetMilestone4Title: string;
  gjurmetMilestone4Desc: string;
  gjurmetMilestone5Title: string;
  gjurmetMilestone5Desc: string;
  gjurmetArchiveTitle: string;
  gjurmetArchiveSubtitle: string;
  gjurmetRegionLabel: string;
  gjurmetPeriodLabel: string;
  gjurmetSearchArchiveBtn: string;
  // Bizneset page
  biznesetTitle: string;
  biznesetSubtitle: string;
  biznesetAll: string;
  biznesetGastronomy: string;
  biznesetTech: string;
  biznesetCraft: string;
  biznesetVerified: string;
  biznesetVisitBtn: string;
  biznesetReviews: string;
  // Shendeti page
  shendetiTitle: string;
  shendetiSubtitle: string;
  shendetiFilter: string;
  shendetiCity: string;
  shendetiClinicType: string;
  shendetiBookBtn: string;
  shendetiBookTitle: string;
  shendetiRelativeName: string;
  shendetiPhone: string;
  shendetiDate: string;
  shendetiConfirmBtn: string;
  shendetiBookedTitle: string;
  shendetiBookedDesc: string;
  // Investime page
  investimeTitle: string;
  investimeSubtitle: string;
  investimeActiveTitle: string;
  investimeAllTitle: string;
  investimeProjectCol: string;
  investimeCatCol: string;
  investimeRoiCol: string;
  investimeMinCol: string;
  investimeStatusCol: string;
  investimeActive: string;
  investimeCollected: string;
  investimeRoi: string;
  investimeMin: string;
  investimeNowBtn: string;
  investimeRegistered: string;
  investimeRegisteredDesc: string;
  // News page
  newsTitle: string;
  newsSubtitle: string;
  newsReadMore: string;
  // About page
  aboutTitle: string;
  aboutSubtitle: string;
  // Dashboard
  dashboardWelcome: string;
  dashboardOverview: string;
};

const translations: Record<Language, TranslationDict> = {
  AL: {
    home: "Vatra",
    services: "Dora e Ndihmës",
    land: "Guri i Shpisë",
    news: "Lajme",
    about: "Kush Jemi Na?",
    contact: "Mshaj Telit",
    login: "Kyçu",
    register: "Regjistrohu",
    dashboard: "Pulti",
    logout: "Çkyçu",
    gjurmet: "Rranjët",
    bizneset: "Bizneset",
    kufiri: "Kufiri Live",
    gjuha: "Gjuha Jonë",
    // Toka
    mapTitle: "Harta e Pronave",
    searchPlaceholder: "Kërko sipas komunës...",
    filters: "Filtrat",
    hectares: "Hektarë",
    monthlyPrice: "Çmimi Mujor",
    interactiveMap: "Harta Interaktive",
    propertyFound: "prona të gjetura",
    invest: "Investo",
    price: "Çmimi",
    area: "Sipërfaqja",
    location: "Lokacioni",
    viewDetails: "Shiko Detajet",
    closeSheet: "Mbyll",
    propertyTitle: "Prona",
    // Home
    heroTagline: "Duke shërbyer diasporën globale",
    heroTitle1: "Ura juaj digjitale",
    heroTitle2: "me Kosovën.",
    heroSubtitle: "Menaxhoni tokën, trajtoni burokracinë dhe mbështesni familjen nga çdo cep i botës.",
    heroBtn1: "Shiko Shërbimet",
    heroBtn2: "Regjistrohu Falas",
    statFamilies: "Familje",
    statKomuens: "Komuna",
    statSatisfaction: "Kënaqshmëri",
    featuresTitle: "Shërbimet Kryesore",
    featuresSubtitle: "Gjithçka që ju nevojitet për të ruajtur lidhjet dhe pasuritë tuaja në Kosovë.",
    feature1Title: "Guri i Shpisë / Patundshmëri",
    feature1Desc: "Menaxhoni tokën dhe pronat tuaja. Gjeni mundësi për qira apo blerje.",
    feature2Title: "Për t'Miletin / Dhurata & Dërgesa",
    feature2Desc: "Dërgoni ushqime dhe dhurata te më të dashurit tuaj me lehtësi.",
    feature3Title: "Letrat / Administrata",
    feature3Desc: "Gjeneroni dokumente ligjore dhe formulare dygjuhëshe për institucionet e Kosovës.",
    seeMore: "Shiko më shumë",
    trustTitle: "Pagesa sipas përdorimit, pa tarifa të fshehura",
    trustSubtitle: "Besojmë në transparencë të plotë. Shërbimet tona kanë çmime të qarta qysh në fillim.",
    trustCurrency: "Valuta të ndryshme",
    trustInstant: "Dërgesë e menjëhershme",
    // Auth
    signInTitle: "Mirë se vini",
    signInSubtitle: "Kyçuni në llogarinë tuaj KahKosova",
    emailLabel: "Email",
    passwordLabel: "Fjalëkalimi",
    signInBtn: "Kyçu",
    noAccount: "Nuk keni llogari?",
    signUpTitle: "Krijoni llogari",
    signUpSubtitle: "Bashkohuni me diasporën kosovare",
    nameLabel: "Emri i plotë",
    confirmPasswordLabel: "Konfirmo fjalëkalimin",
    signUpBtn: "Regjistrohu Falas",
    haveAccount: "Keni tashmë llogari?",
    // Services
    servicesTitle: "Dora e Ndihmës",
    servicesSubtitle: "Platforma jonë ju ofron gjithçka që keni nevojë.",
    // Gjurmet
    gjurmetTitle: "Rranjët — Historia e Familjes",
    gjurmetSubtitle: "Zbuloni historinë e familjes suaj. Gjurmoni rekorde, rrënjë dhe trashëgimi nga trojet e Kosovës.",
    gjurmetSearchTitle: "Kërko Arkivën",
    gjurmetSurnameLabel: "Mbiemri i familjes",
    gjurmetVillageLabel: "Fshati / Komuna e origjinës",
    gjurmetSearchBtn: "Kërko Arkivën",
    gjurmetTimelineTitle: "Ngjarjet Historike të Rajonit",
    gjurmetMilestone1Title: "Perandoria Osmane — Regjistrimi i Familjeve",
    gjurmetMilestone1Desc: "Regjistrat osmanë dokumentojnë familjet dhe pronat në Kosovë, duke krijuar bazën e parë të të dhënave demografike.",
    gjurmetMilestone2Title: "Lëvizja Kombëtare Shqiptare",
    gjurmetMilestone2Desc: "Periudha e Rilindjes Kombëtare — familjet kosovare luajnë rol kyç në organizimin kulturor dhe kombëtar.",
    gjurmetMilestone3Title: "Lufta e Dytë Botërore",
    gjurmetMilestone3Desc: "Konflikti ndikon thellë strukturën familjare. Shumë familje shpërngulen brenda dhe jashtë kufijve.",
    gjurmetMilestone4Title: "Emigracioni i Madh (1990–1999)",
    gjurmetMilestone4Desc: "Valë e madhe emigrimi drejt Gjermanisë, Zvicrës dhe Austrisë — diaspora kosovare formohet.",
    gjurmetMilestone5Title: "Pavarësia e Kosovës — 2008",
    gjurmetMilestone5Desc: "Pavarësia hap rrugë të reja: diaspora fillon rikthimin dhe investimin në vendin e origjinës.",
    gjurmetArchiveTitle: "Arkiva Digjitale",
    gjurmetArchiveSubtitle: "Kërko sipas rajonit dhe periudhës historike.",
    gjurmetRegionLabel: "Rajoni",
    gjurmetPeriodLabel: "Periudha",
    gjurmetSearchArchiveBtn: "Shiko Arkivën",
    // Bizneset
    biznesetTitle: "Bizneset e Diasporës",
    biznesetSubtitle: "Zbuloni bizneset kosovare të verifikuara — nga gastronomi te teknologji dhe zanat.",
    biznesetAll: "Të gjitha",
    biznesetGastronomy: "Gastronomi",
    biznesetTech: "Teknologji",
    biznesetCraft: "Zanat",
    biznesetVerified: "I Verifikuar",
    biznesetVisitBtn: "Vizito faqen",
    biznesetReviews: "vlerësime",
    // Shendeti
    shendetiTitle: "Shneta për Familjen",
    shendetiSubtitle: "Rezervoni kontrollime mjekësore ose boni farmaci për të afërmit tuaj në Kosovë.",
    shendetiFilter: "Filtro",
    shendetiCity: "Qyteti",
    shendetiClinicType: "Lloji i Klinikës",
    shendetiBookBtn: "Rezervo Termin",
    shendetiBookTitle: "Rezervo Termin",
    shendetiRelativeName: "Emri i të afërmit",
    shendetiPhone: "Numri i telefonit në Kosovë",
    shendetiDate: "Data e preferuar",
    shendetiConfirmBtn: "Konfirmo Rezervimin",
    shendetiBookedTitle: "Rezervimi u dërgua",
    shendetiBookedDesc: "Do t'ju kontaktojmë së shpejti për konfirmim.",
    // Investime
    investimeTitle: "Bereqeti (Investimet)",
    investimeSubtitle: "Mbështesni ekonominë lokale dhe përfitoni kthim të qëndrueshëm. Zbuloni projekte të verifikuara nga sipërmarrës dhe biznese kosovare.",
    investimeActiveTitle: "Projekte Aktive",
    investimeAllTitle: "Të Gjitha Projektet",
    investimeProjectCol: "Projekti",
    investimeCatCol: "Kategoria",
    investimeRoiCol: "ROI i Parashikuar",
    investimeMinCol: "Investimi Minimal",
    investimeStatusCol: "Statusi",
    investimeActive: "Aktiv",
    investimeCollected: "Mbledhur",
    investimeRoi: "ROI i Parashikuar",
    investimeMin: "Investimi Min.",
    investimeNowBtn: "Investo Tani",
    investimeRegistered: "Interesim i regjistruar",
    investimeRegisteredDesc: "Ekipi ynë do t'ju kontaktojë për detajet e investimit.",
    // News
    newsTitle: "Lajmet e Diasporës",
    newsSubtitle: "Qëndroni të informuar me ngjarjet më të fundit nga Kosova dhe diaspora.",
    newsReadMore: "Lexo më shumë",
    // About
    aboutTitle: "Rreth KahKosova",
    aboutSubtitle: "Platforma digjitale e diasporës kosovare.",
    // Dashboard
    dashboardWelcome: "Mirë se vini",
    dashboardOverview: "Pasqyra e llogarisë suaj",
  },

  DE: {
    home: "Heimat",
    services: "Hilfsangebote",
    land: "Grund & Boden",
    news: "Nachrichten",
    about: "Wer wir sind",
    contact: "Kontakt",
    login: "Anmelden",
    register: "Registrieren",
    dashboard: "Dashboard",
    logout: "Abmelden",
    gjurmet: "Die Wurzeln",
    bizneset: "Unternehmen",
    kufiri: "Grenzen Live",
    gjuha: "Unsere Sprache",
    // Toka
    mapTitle: "Immobilienkarte",
    searchPlaceholder: "Nach Gemeinde suchen...",
    filters: "Filter",
    hectares: "Hektar",
    monthlyPrice: "Monatspreis",
    interactiveMap: "Interaktive Karte",
    propertyFound: "Immobilien gefunden",
    invest: "Investieren",
    price: "Preis",
    area: "Fläche",
    location: "Standort",
    viewDetails: "Details anzeigen",
    closeSheet: "Schließen",
    propertyTitle: "Immobilie",
    // Home
    heroTagline: "Die globale Diaspora verbinden",
    heroTitle1: "Ihre digitale Brücke",
    heroTitle2: "nach Kosovo.",
    heroSubtitle: "Verwalten Sie Grundstücke, erledigen Sie Bürokratie und unterstützen Sie Ihre Familie von überall auf der Welt.",
    heroBtn1: "Dienstleistungen ansehen",
    heroBtn2: "Kostenlos registrieren",
    statFamilies: "Familien",
    statKomuens: "Gemeinden",
    statSatisfaction: "Zufriedenheit",
    featuresTitle: "Hauptleistungen",
    featuresSubtitle: "Alles was Sie brauchen, um Ihre Verbindungen und Vermögenswerte in Kosovo zu verwalten.",
    feature1Title: "Grund & Boden / Immobilien",
    feature1Desc: "Verwalten Sie Ihre Grundstücke und Immobilien. Finden Sie Miet- oder Kaufmöglichkeiten.",
    feature2Title: "Für die Liebsten / Geschenke",
    feature2Desc: "Senden Sie Lebensmittel und Geschenke einfach an Ihre Liebsten.",
    feature3Title: "Dokumente / Verwaltung",
    feature3Desc: "Erstellen Sie Rechtsdokumente und zweisprachige Formulare für kosovarische Behörden.",
    seeMore: "Mehr anzeigen",
    trustTitle: "Nutzungsbasierte Zahlung, keine versteckten Gebühren",
    trustSubtitle: "Wir glauben an vollständige Transparenz. Unsere Dienstleistungen haben von Anfang an klare Preise.",
    trustCurrency: "Verschiedene Währungen",
    trustInstant: "Sofortige Lieferung",
    // Auth
    signInTitle: "Willkommen zurück",
    signInSubtitle: "Melden Sie sich bei Ihrem KahKosova-Konto an",
    emailLabel: "E-Mail",
    passwordLabel: "Passwort",
    signInBtn: "Anmelden",
    noAccount: "Kein Konto?",
    signUpTitle: "Konto erstellen",
    signUpSubtitle: "Treten Sie der kosovarischen Diaspora bei",
    nameLabel: "Vollständiger Name",
    confirmPasswordLabel: "Passwort bestätigen",
    signUpBtn: "Kostenlos registrieren",
    haveAccount: "Haben Sie bereits ein Konto?",
    // Services
    servicesTitle: "Hilfsangebote",
    servicesSubtitle: "Unsere Plattform bietet Ihnen alles, was Sie brauchen.",
    // Gjurmet
    gjurmetTitle: "Die Wurzeln — Genealogie",
    gjurmetSubtitle: "Entdecken Sie die Geschichte Ihrer Familie. Verfolgen Sie Aufzeichnungen, Wurzeln und Erbe aus den Gebieten Kosovos.",
    gjurmetSearchTitle: "Archiv durchsuchen",
    gjurmetSurnameLabel: "Familienname",
    gjurmetVillageLabel: "Dorf / Gemeinde der Herkunft",
    gjurmetSearchBtn: "Archiv durchsuchen",
    gjurmetTimelineTitle: "Historische Meilensteine der Region",
    gjurmetMilestone1Title: "Osmanisches Reich — Familienregistrierung",
    gjurmetMilestone1Desc: "Osmanische Register dokumentieren Familien und Grundstücke in Kosovo und bilden die erste demografische Datenbasis.",
    gjurmetMilestone2Title: "Albanische Nationalbewegung",
    gjurmetMilestone2Desc: "Zeit der nationalen Wiedergeburt — kosovarische Familien spielen eine Schlüsselrolle in der kulturellen und nationalen Organisation.",
    gjurmetMilestone3Title: "Zweiter Weltkrieg",
    gjurmetMilestone3Desc: "Der Konflikt beeinflusst tief die Familienstruktur. Viele Familien werden innerhalb und außerhalb der Grenzen vertrieben.",
    gjurmetMilestone4Title: "Große Emigration (1990–1999)",
    gjurmetMilestone4Desc: "Große Emigrationswelle nach Deutschland, Schweiz und Österreich — die kosovarische Diaspora entsteht.",
    gjurmetMilestone5Title: "Unabhängigkeit Kosovos — 2008",
    gjurmetMilestone5Desc: "Die Unabhängigkeit eröffnet neue Wege: Die Diaspora beginnt mit der Rückkehr und Investitionen im Herkunftsland.",
    gjurmetArchiveTitle: "Digitales Archiv",
    gjurmetArchiveSubtitle: "Suche nach Region und historischem Zeitraum.",
    gjurmetRegionLabel: "Region",
    gjurmetPeriodLabel: "Zeitraum",
    gjurmetSearchArchiveBtn: "Archiv anzeigen",
    // Bizneset
    biznesetTitle: "Diaspora-Unternehmen",
    biznesetSubtitle: "Entdecken Sie verifizierte kosovarische Unternehmen — von Gastronomie bis Technologie und Handwerk.",
    biznesetAll: "Alle",
    biznesetGastronomy: "Gastronomie",
    biznesetTech: "Technologie",
    biznesetCraft: "Handwerk",
    biznesetVerified: "Verifiziert",
    biznesetVisitBtn: "Website besuchen",
    biznesetReviews: "Bewertungen",
    // Shendeti
    shendetiTitle: "Gesundheit für die Familie",
    shendetiSubtitle: "Buchen Sie medizinische Untersuchungen oder bestellen Sie Medikamente für Ihre Angehörigen in Kosovo.",
    shendetiFilter: "Filtern",
    shendetiCity: "Stadt",
    shendetiClinicType: "Kliniktyp",
    shendetiBookBtn: "Termin buchen",
    shendetiBookTitle: "Termin buchen",
    shendetiRelativeName: "Name des Angehörigen",
    shendetiPhone: "Telefonnummer in Kosovo",
    shendetiDate: "Bevorzugtes Datum",
    shendetiConfirmBtn: "Buchung bestätigen",
    shendetiBookedTitle: "Buchung gesendet",
    shendetiBookedDesc: "Wir werden Sie in Kürze zur Bestätigung kontaktieren.",
    // Investime
    investimeTitle: "Wohlstand (Investitionen)",
    investimeSubtitle: "Unterstützen Sie die lokale Wirtschaft und erzielen Sie nachhaltige Renditen. Entdecken Sie verifizierte Projekte von kosovarischen Unternehmern.",
    investimeActiveTitle: "Aktive Projekte",
    investimeAllTitle: "Alle Projekte",
    investimeProjectCol: "Projekt",
    investimeCatCol: "Kategorie",
    investimeRoiCol: "Erwartete Rendite",
    investimeMinCol: "Mindestinvestition",
    investimeStatusCol: "Status",
    investimeActive: "Aktiv",
    investimeCollected: "Gesammelt",
    investimeRoi: "Erwartete Rendite",
    investimeMin: "Mindestinv.",
    investimeNowBtn: "Jetzt investieren",
    investimeRegistered: "Interesse registriert",
    investimeRegisteredDesc: "Unser Team wird Sie bezüglich der Investitionsdetails kontaktieren.",
    // News
    newsTitle: "Diaspora-Nachrichten",
    newsSubtitle: "Bleiben Sie über die neuesten Ereignisse aus Kosovo und der Diaspora informiert.",
    newsReadMore: "Mehr lesen",
    // About
    aboutTitle: "Über KahKosova",
    aboutSubtitle: "Die digitale Plattform der kosovarischen Diaspora.",
    // Dashboard
    dashboardWelcome: "Willkommen",
    dashboardOverview: "Übersicht Ihres Kontos",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDict;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem("kk-lang");
    return (stored === "AL" || stored === "DE") ? stored : "AL";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("kk-lang", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
