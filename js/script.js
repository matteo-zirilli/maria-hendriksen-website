// ===========================================================
//  SCRIPT.JS COMPLETO E CORRETTO - 07/08/2025
// ===========================================================

const BOOKING_LINKS = {
    yoga_individuale: "https://tidycal.com/guillerminadn/prenotazione-lezione-yoga-individuale",
    yoga_pacchetti: "https://tidycal.com/guillerminadn/pacchetto-lezioni-yoga"
};

const GOOGLE_FORM_LINKS = {
    it: "https://forms.gle/316vmw2ndJMNjUd96",
    en: "https://forms.gle/fM56ACC7sLGJDTbX6",
    es: "https://forms.gle/kawL6aVzq8YY26H66"
};


const CONTACT_INFO = {
    whatsapp: "+5492983567655", // Numero Argentino per WhatsApp
    phone: "+34641234679"       // Numero Spagnolo per Chiamate
};

const languages = {
    it: {
        "pageTitle": "Maria Guillermina Hendriksen - Fisioterapia e Yoga",
        "navHome": "Homepage",
        "navAbout": "Chi Sono",
        "navServices": "Servizi",
        "navPlans": "Piani",
        "navContent": "I Miei Contenuti",
        "navBooking": "Prenota/Contatti",
        "footerText": "&copy; 2025 Maria Guillermina Hendriksen. Tutti i diritti riservati.",
        "heroMotto": "Ascolta il tuo corpo.<br>Respira nel presente.<br>Muoviti verso il benessere.",
        "mainSubtitle": "Fisioterapista esperta e Istruttrice di Yoga certificata, dedicata al tuo benessere.",
        "ctaButton": "Scopri di più e Prenota",
        "signup-button": "Registrati",
        "mottoPart1": "Ascolta il tuo corpo.",
        "mottoPart2": "Respira nel presente.",
        "mottoPart3": "Muoviti verso il benessere.",
        "heroCtaButton": "Scopri i miei servizi",
        "introTitle": "Il mio approccio",
        "introText": "Combino le tecniche della fisioterapia con yoga per un percorso di recupero personalizzato. Il mio approccio integrato aiuta a ritrovare equilibrio e consapevolezza, per un benessere profondo e duraturo.",
        "approachEyebrow": "Il mio approccio",
        "approachTitle": "Un Approccio Integrato",
        "pageTitleAbout": "Chi Sono - Maria G. Hendriksen",
        "aboutHeading": "Chi Sono",
        "aboutQualifications": "Le mie qualifiche",
        "Qualification1": "Laurea in Kinesiologia e Fisiatria conseguita presso l'Universidad Católica de La Plata, Argentina, con Apostilla de La Haya che ne certifica l'autenticità internazionale.",
        "caption_degree_certificate": "Estratto del Certificato di Laurea",
        "caption_apostille": "Apostilla de La Haya",
        "Qualification2": "Certificato Istruttrice di Yoga",
        "aboutP1": "Sono Maria Guillermina Hendriksen, una fisioterapista appassionata e istruttrice di Yoga con diversi anni di esperienza, maturata fin dalla laurea, nel campo del recupero funzionale e del benessere psicofisico.",
        "aboutP2": "La mia missione è aiutare le persone a ritrovare l'equilibrio tra corpo e mente, superare il dolore e migliorare la qualità della loro vita attraverso un approccio integrato e personalizzato.",
        "aboutFormationTitle": "Formazione e Filosofia",
        "aboutP3": "Ho conseguito la laurea in Fisioterapia presso l'Università Cattolica di La Plata (UCLP) e ho approfondito le mie conoscenze con corsi di specializzazione in Terapia Manuale e Riabilitazione Funzionale. Parallelamente, ho coltivato la mia passione per lo Yoga, ottenendo la certificazione come Istruttrice Professionale di Yoga presso la Federazione Argentina di Yoga.",
        "aboutP4": "Credo fermamente nell'unione tra la scienza della fisioterapia e la pratica millenaria dello Yoga. Questo mi permette di offrire trattamenti che non si limitano a curare il sintomo, ma mirano a comprenderne la causa e a promuovere uno stile di vita più sano e consapevole.",
        "aboutValuesTitle": "Valori",
        "value1": "<strong>Ascolto Attento:</strong> Ogni persona è unica, dedico tempo a comprendere le tue esigenze specifiche.",
        "value2": "<strong>Approccio Olistico:</strong> Considero la persona nella sua interezza: corpo, mente ed emozioni.",
        "value3": "<strong>Professionalità e Aggiornamento:</strong> Mi impegno in una formazione continua per offrirti le tecniche più efficaci.",
        "value4": "<strong>Empatia e Supporto:</strong> Ti accompagno nel tuo percorso con dedizione e incoraggiamento.",
        "pageTitleServices": "Servizi - Fisioterapia e Yoga - Maria G. Hendriksen",
        "servicesHeading": "I Miei Servizi",
        "servicesIntro": "Ogni percorso, sia esso fisioterapico, yogico o una combinazione dei due, è attentamente personalizzato. Lavoro insieme a te per definire obiettivi realistici e per fornirti gli strumenti e la consapevolezza necessari non solo per raggiungere il benessere, ma anche per mantenerlo nel tempo, prevenendo future problematiche.",
        "fisioTitle": "Fisioterapia",
        "fisioDesc": "La fisioterapia è fondamentale per il recupero da infortuni, la gestione del dolore cronico e il miglioramento della mobilità. Il mio approccio include:",
        "fisioPoint1": "<strong>Valutazione Funzionale Completa:</strong> Analisi dettagliata della postura, del movimento e delle aree problematiche.",
        "fisioPoint2": "<strong>Terapia Manuale:</strong> Tecniche specifiche (mobilizzazioni, manipolazioni, massaggio terapeutico) per ridurre il dolore e ripristinare la funzione articolare e muscolare.",
        "fisioPoint3": "<strong>Esercizio Terapeutico Personalizzato:</strong> Programmi di esercizi mirati per rinforzare, allungare e stabilizzare.",
        "fisioPoint4": "<strong>Riabilitazione Post-Operatoria e Sportiva:</strong> Percorsi specifici per tornare alle attività quotidiane e sportive in sicurezza.",
        "fisioPoint5": "<strong>Educazione e Prevenzione:</strong> Consigli su postura, ergonomia e strategie per prevenire ricadute.",
        "fisioWho": "Adatto per: Dolore lombare, cervicalgia, sciatalgia, recupero post-intervento, lesioni sportive, tendiniti, artrosi, e molto altro.",
        "yogaTitle": "Yoga",
        "yogaDesc": "Lo Yoga è una disciplina straordinaria per migliorare flessibilità, forza, equilibrio e consapevolezza di sé. Offro lezioni adatte a tutti i livelli:",
        "yogaPoint1": "<strong>Lezioni Individuali (One-to-One):</strong> Percorso personalizzato sulle tue esigenze, obiettivi e condizioni fisiche. Ideale per iniziare, approfondire la pratica o per esigenze terapeutiche specifiche.",
        "yogaPoint2": "<strong>Lezioni di Gruppo (Piccoli Gruppi):</strong> Classi dinamiche e coinvolgenti per esplorare diversi stili di Yoga (es. Hatha, Vinyasa) e praticare Yoga Terapeutico.",
        "yogaPoint3": "<strong>Yoga Terapeutico:</strong> Utilizzo mirato di posizioni (asana), respirazione (pranayama) e meditazione per affrontare specifiche problematiche fisiche o emotive, in integrazione con la fisioterapia.",
        "yogaPoint4": "<strong>Yoga Prenatale/Postnatale:</strong> Supporto specifico per le donne durante la gravidanza e nel periodo successivo al parto.",
        "yogaBenefits": "Benefici: Riduzione dello stress, miglioramento della postura, aumento della flessibilità e della forza, maggiore consapevolezza corporea, miglioramento della capacità respiratoria.",
        "servicesContactPrompt": "Per maggiori dettagli sui servizi o per discutere le tue esigenze specifiche, non esitare a <a href=\"prenota.html\">contattarmi</a>.",
        "pageTitlePlans": "Piani e Tariffe - Maria G. Hendriksen",
        "plansHeading": "Piani e Tariffe",
        "plansIntro": "Scegli il piano più adatto alle tue esigenze. Per soluzioni personalizzate o pacchetti combinati Fisioterapia+Yoga, <a href=\"prenota.html\">contattami</a>.",
        "plansNote": "Nota: I pagamenti si effettuano preferibilmente al momento della seduta (contanti, Bizum). Per pacchetti o pagamenti anticipati è possibile richiedere bonifico bancario o link per pagamento online.",
        "planFisioSingleTitle": "Seduta Fisioterapia Singola",
        "planFisioSingleDesc": "Valutazione e trattamento fisioterapico individuale.",
        "planFisioSingleFeat1": "Durata: circa 60 minuti",
        "planFisioSingleFeat2": "Trattamento personalizzato",
        "planFisioSingleButton": "Prenota Ora",
        "planFisio5Title": "Ciclo 5 Sedute Fisioterapia",
        "planFisio5Desc": "Pacchetto conveniente per un percorso riabilitativo completo.",
        "planFisio5Feat1": "5 sedute individuali (60 min/cad.)",
        "planFisio5Feat2": "Monitoraggio progressi",
        "planFisio5Feat3": "Sconto rispetto alla seduta singola",
        "planFisio5Button": "Prenota Ciclo",
        "planYogaIndSingleTitle": "Lezione Yoga Individuale",
        "planYogaIndSingleDesc": "Pratica personalizzata One-to-One.",
        "planYogaIndSingleFeat1": "Durata: 60 minuti",
        "planYogaIndSingleFeat2": "Adatta a tutti i livelli",
        "planYogaIndSingleFeat3": "Focus su obiettivi specifici",
        "planYogaIndSinglePrice": "€25",
        "planYogaIndSingleButton": "Prenota Lezione",
        "planYogaInd5Title": "Pacchetto 5 Lezioni Yoga Individuali",
        "planYogaInd5Desc": "Percorso continuativo per approfondire la pratica.",
        "planYogaInd5Feat1": "5 lezioni individuali (60 min/cad.)",
        "planYogaInd5Feat2": "Sconto sul totale",
        "planYogaInd5Button": "Acquista Pacchetto",
        "planYogaGroupSingleTitle": "Lezione Yoga di Gruppo (Drop-in)",
        "planYogaGroupSingleDesc": "Partecipa a una delle nostre classi di gruppo.",
        "planYogaGroupSingleFeat1": "Verifica l'orario delle classi",
        "planYogaGroupSingleFeat2": "Adatta a diversi livelli",
        "planYogaGroupSinglePrice": "€15 a persona",
        "planYogaGroupSingleButton": "Prenota Classe",
        "planYogaGroup10Title": "Pacchetto 10 Lezioni Yoga di Gruppo",
        "planYogaGroup10Desc": "Frequenta le classi di gruppo con convenienza.",
        "planYogaGroup10Feat1": "Accesso a 10 lezioni di gruppo",
        "planYogaGroup10Feat2": "Validità: 3 mesi",
        "planYogaGroup10Feat3": "Massima convenienza",
        "planYogaGroup10Button": "Acquista Carnet",
        "planFisioSinglePriceStudio": "€50 - In Studio",
        "planFisioSinglePriceHome": "€65 - A Domicilio",
        "planFisio5CurrentPriceStudio": "€220 - In Studio",
        "planFisio5OriginalPriceStudio": "Invece di <s>€250</s>",
        "planFisio5CurrentPriceHome": "€290 - A Domicilio",
        "planFisio5OriginalPriceHome": "Invece di <s>€325</s>",
        "planYogaInd5CurrentPrice": "€110",
        "planYogaInd5OriginalPrice": "Invece di <s>€125</s>",
        "planYogaGroupFeatMin": "Minimo 4 partecipanti",
        "planYogaGroup10FeatMin2": "Minimo 4 partecipanti per classe",
        "planYogaGroup10CurrentPrice": "€320",
        "planYogaGroup10OriginalPrice": "Invece di <s>€600</s>",
        "groupBookingTitle": "Prenotazione di Gruppo",
        "participantsLabel": "Numero Partecipanti:",
        "pricePerGroupLabel": "per l'intero gruppo",
        "paymentMethodLabel": "Scegli un metodo di pagamento:",
        "locationStudio": "In Studio",
        "locationHome": "A Domicilio",
        "insteadOf": "Invece di",
        "individualBookingTitle": "Dettagli Prenotazione",
        "bookingFor": "Stai prenotando: <strong id=\"modal-individual-service-name-value\"></strong>",
        "pageTitleBooking": "Prenota / Contatti - Maria G. Hendriksen",
        "bookingTitleWidget": "Prenota Incontro Conoscitivo Online",
        "bookingInstructionsWidget": "Utilizza il calendario qui sotto per scegliere un orario disponibile per un incontro conoscitivo gratuito (30 min).",
        "bookingWidgetAltContact": "Per prenotare altri tipi di sessioni o per esigenze particolari, utilizza il modulo di contatto sottostante o gli altri recapiti.",
        "contactFormTitle": "Modulo di Contatto / Richiesta Info",
        "contactFormInstructions": "Compila questo modulo per domande, richieste di informazioni o per prenotare sessioni specifiche. Ti risponderò il prima possibile.",
        "labelName": "Nome:",
        "labelEmail": "Email:",
        "labelPhone": "Cellulare (Opzionale):",
        "labelSubject": "Oggetto:",
        "optionSelectSubject": "-- Seleziona Oggetto --",
        "optionSubjFisio": "Richiesta Appuntamento Fisioterapia",
        "optionSubjYogaInd": "Richiesta Lezione Yoga Individuale",
        "optionSubjYogaGroup": "Info Yoga di Gruppo",
        "optionSubjInfo": "Info Generali",
        "optionSubjOther": "Altro",
        "labelMessage": "Il tuo messaggio:",
        "submitButton": "Invia Messaggio",
        "directContactTitle": "Contatti Diretti",
        "directContactInfo": "Puoi contattarmi anche tramite:",
        "contactWhatsapp": "WhatsApp: <a href=\"https://wa.me/5492983567655\" target=\"_blank\">+54 9 2983 567655</a>",
        "contactInstagram": "Instagram: <a href=\"https://www.instagram.com/yoguikine?igsh=dDk4bGc3Zm81MWx2\" target=\"_blank\" rel=\"noopener noreferrer\">@yoguikine</a>",
        "contactEmail": "Email: <a href=\"mailto:guillerminadn@gmail.com\">guillerminadn@gmail.com</a>",
        "contactPhone": "Cellulare: <a href=\"tel:+34641234679\">+34 641234679</a>",
        "contactAddress": "Indirizzo Studio: Palma de Maiorca (contattami per dettagli)",
        "contactLabelWhatsapp": "WhatsApp",
        "contactLabelEmail": "Email",
        "contactLabelPhone": "Cellulare",
        "contactLabelInstagram": "Instagram",
        "pageTitleContent": "I Miei Contenuti - Maria Guillermina Hendriksen",
        "contentHeading": "I Miei Contenuti",
        "contentIntro": "Esplora risorse, video e articoli dedicati allo Yoga e alla Fisioterapia per approfondire la tua pratica e il tuo percorso di benessere.",
        "contentYogaTitle": "Contenuti Yoga",
        "contentYogaDesc": "Video di lezioni, sequenze specifiche, tecniche di respirazione e meditazione guidata per arricchire la tua pratica yoga a casa.",
        "purchasable-lessons-section1": "Video Lezioni Acquistabili",
        "ratingOptionDefault": "-- Seleziona Valutazione --",
        "ratingOption5": "★★★★★ (Eccellente)",
        "ratingOption4": "★★★★☆ (Molto Buono)",
        "ratingOption3": "★★★☆☆ (Buono)",
        "ratingOption2": "★★☆☆☆ (Sufficiente)",
        "ratingOption1": "★☆☆☆☆ (Insufficiente)",
        "dynamic_login_prompt": "Effettua il <a href=\"#\" onclick=\"openModal('login-modal'); return false;\">login</a> o <a href=\"#\" onclick=\"openModal('signup-modal'); return false;\">registrati</a> per vedere i contenuti disponibili e le opzioni di acquisto.",
        "purchasable-lessons-paragraph": "Accedi a lezioni complete e approfondimenti esclusivi acquistando l'accesso qui sotto.",
        "yogaVideo1Title": "Titolo Contenuto Yoga 1 (es. Sequenza Mattutina Energizzante)",
        "yogaVideo1Desc": "Breve descrizione del contenuto del video o dell'articolo. Invita a cliccare per vedere di più.",
        "yogaVideo2Title": "Titolo Contenuto Yoga 2 (es. Meditazione Guidata per il Rilassamento)",
        "yogaVideo2Desc": "Un'altra descrizione accattivante per questo contenuto specifico.",
        "contentFisioTitle": "Contenuti Fisioterapia",
        "contentFisioDesc": "Consigli pratici, esercizi terapeutici spiegati, approfondimenti su patologie comuni e strategie di prevenzione per la tua salute fisica.",
        "fisioContent1Title": "Titolo Contenuto Fisio 1 (es. Esercizi per il Mal di Schiena)",
        "fisioContent1Desc": "Descrizione del contenuto: esercizi semplici e sicuri da fare a casa per alleviare il dolore lombare.",
        "fisioContent2Title": "Titolo Contenuto Fisio 2 (es. Consigli Posturali per l'Ufficio)",
        "fisioContent2Desc": "Come mantenere una postura corretta lavorando alla scrivania per prevenire dolori cervicali e dorsali.",
        "reviewsHeading": "Dicono di Me / Recensioni",
        "testimonialGalleryHeading": "Alcune Testimonianze",
        "testimonialGalleryIntro": "Qui puoi vedere alcuni dei messaggi e delle esperienze condivise da chi ha seguito un percorso con me.",
        "dynamicReviewsHeading": "Le Vostre Recensioni",
        "reviewFormHeading": "Lascia la Tua Recensione",
        "reviewFormIntro": "Hai seguito delle lezioni o un percorso di fisioterapia con me? La tua opinione è preziosa! Compila il modulo qui sotto per condividere la tua esperienza.",
        "reviewLabelName": "Il tuo nome (o come vuoi apparire):",
        "reviewLabelRating": "Valutazione (da 1 a 5 stelle):",
        "reviewLabelMessage": "La tua recensione:",
        "reviewSubmitButton": "Invia Recensione",
        "reviewFormNotes": "Nota: Le recensioni inviate tramite questo modulo verranno moderate prima della pubblicazione. Grazie per la tua condivisione!",
		"bookingForText": "Stai prenotando:",
		"bizumCTAButton": "Invia Conferma via WhatsApp",
		"whatsappMessage": "Ciao Maria, ti contatto dal tuo sito. Vorrei acquistare il servizio '[SERVICE_NAME]' e pagare con Bizum. Resto in attesa di istruzioni. Grazie!",
		"bizumInfoText": "Per questo servizio, la prenotazione si finalizza con un contatto personale. Procedi su WhatsApp per definire l'appuntamento e il pagamento direttamente con Maria.",
		"bizumProceedButton": "Procedi su WhatsApp",
		"youtubeSectionTitle": "Seguimi su YouTube",
		"youtubeSectionText": "Non perderti i nuovi video e le lezioni complete. Iscriviti al canale per rimanere sempre aggiornato.",
		"youtubeSectionButton": "Iscriviti Ora",
		"noReviewsYet": "Non ci sono ancora recensioni. Sii il primo a lasciarne una!",
		"loginToPurchase": "Devi effettuare il login per poter acquistare.",
		"thankYouTitle": "Grazie! Il tuo pagamento è stato ricevuto.",
		"thankYouText": "Per completare la prenotazione, segui questi due passaggi:",
		"thankYouButtonForm": "1. Compila la tua Storia Clinica",
		"thankYouButtonWP": "2. Contatta Maria per Fissare l'Appuntamento",
		"whatsappMessageFisio": "Ciao Maria, ho appena effettuato il pagamento per una sessione di Fisioterapia e compilato il modulo clinico. Vorrei fissare l'appuntamento. Grazie!",
		"bizumTitle": "Finalizza con Bizum",
		"bizumInstructions": "Per completare, invia un Bizum al numero qui sotto. Successivamente, puoi contattare Maria su WhatsApp per fissare l'appuntamento.",
		"bizumAmount": "Importo:",
		"bizumPhoneNumber": "Numero di Telefono:",
		"bizumWhatsappButton": "Contatta su WhatsApp per Prenotare",
		"bizumFormButton": "Compila Modulo Clinico",
		// --- NUOVI TESTI PER LA SEZIONE PACCHETTI ---
        "packagesEyebrow": "Percorsi Esclusivi",
        "packagesTitle": "Approfondisci il Tuo Percorso con i Nostri Pacchetti Video",
        "packagesSubtitle": "Scegli il percorso più adatto a te. Accedi a collezioni di video on-demand per allenarti dove e quando vuoi, con la guida esperta di Maria.",
        "packageDiscoverButton": "Scopri di più",
        
        "package1Title": "Yoga & Mobilità Funzionale",
        "package1Desc": "Sblocca il tuo corpo e migliora la postura con questo percorso di 4 lezioni che fonde la consapevolezza dello Yoga con esercizi di mobilità funzionale. Ideale per chi cerca flessibilità e una nuova libertà di movimento.",
        
        "package2Title": "Le Basi dello Yoga",
        "package2Desc": "Inizia o approfondisci il tuo viaggio nello Yoga con questo pacchetto di 2 lezioni essenziali. Pensato per principianti e intermedi, ti guiderà attraverso le fondamenta della pratica, costruendo forza ed equilibrio.",

        "package3Title": "Allenamento Completo a Casa",
        "package3Desc": "Trasforma il tuo spazio in una palestra con queste 4 lezioni di allenamento completo. Sfrutta bande elastiche e il tuo peso corporeo per un training efficace, completato da esercizi di recupero.",

        "package4Title": "Immersione Totale nello Yoga",
        "package4Desc": "La collezione definitiva per l'amante dello Yoga. Questo pacchetto di 10 video-lezioni ti accompagnerà attraverso diversi stili e livelli, da pratiche energizzanti a sequenze rilassanti, per un'esperienza completa.",
        
        "modalInstructions": "Per accedere, segui questi 2 passi: completa il pagamento e poi invia la richiesta di accesso. L'accesso verrà approvato entro 24 ore dalla verifica.",
        "modalStep1": "Passo 1: Scegli un metodo di pagamento",
        "modalStep2": "Passo 2: Richiedi l'accesso",
        "modalRequestAccess": "Richiedi Accesso alla Cartella"
    },
    en: {
        "pageTitle": "Maria Guillermina Hendriksen - Physiotherapy and Yoga",
        "navHome": "Homepage",
        "navAbout": "About Me",
        "navServices": "Services",
        "navPlans": "Plans",
        "navContent": "My Content",
        "navBooking": "Booking/Contact",
        "footerText": "&copy; 2025 Maria Guillermina Hendriksen. All rights reserved.",
        "heroMotto": "Listen to your body.<br>Breathe into the present.<br>Move towards well-being.",
        "mainSubtitle": "Experienced Physiotherapist and Certified Yoga Instructor, dedicated to your well-being.",
        "ctaButton": "Learn More and Book",
        "signup-button": "Sign Up",
        "mottoPart1": "Listen to your body.",
        "mottoPart2": "Breathe into the present.",
        "mottoPart3": "Move towards well-being.",
        "heroCtaButton": "Discover my services",
        "introTitle": "My Approach",
        "introText": "I combine physiotherapy techniques with yoga for a personalized recovery path. My integrated approach helps restore balance and awareness for deep, lasting well-being.",
        "approachEyebrow": "My approach",
        "approachTitle": "An Integrated Approach",
        "pageTitleAbout": "About Me - Maria G. Hendriksen",
        "aboutHeading": "About Me",
        "aboutQualifications": "My Qualifications",
        "Qualification1": "Degree in Kinesiology and Physiatry obtained from the Universidad Católica de La Plata, Argentina, with Hague Apostille certifying its international authenticity.",
        "caption_degree_certificate": "Excerpt from Degree Certificate",
        "caption_apostille": "Haya Apostille",
        "Qualification2": "Yoga Instructor Certificate",
        "aboutP1": "I am Maria Guillermina Hendriksen, a passionate physiotherapist and Yoga instructor with several years of experience, gained since graduation, in the field of functional recovery and psychophysical well-being.",
        "aboutP2": "My mission is to help people rediscover the balance between body and mind, overcome pain, and improve their quality of life through an integrated and personalized approach.",
        "aboutFormationTitle": "Training and Philosophy",
        "aboutP3": "I graduated in Physiotherapy from the Catholic University of La Plata (UCLP) and deepened my knowledge with specialization courses in Manual Therapy and Functional Rehabilitation. In parallel, I nurtured my passion for Yoga, obtaining certification as a Professional Yoga Instructor from the Argentine Yoga Federation.",
        "aboutP4": "I firmly believe in the union between the science of physiotherapy and the ancient practice of Yoga. This allows me to offer treatments that do not just cure the symptom, but aim to understand its cause and promote a healthier and more conscious lifestyle.",
        "aboutValuesTitle": "Values",
        "value1": "<strong>Attentive Listening:</strong> Every person is unique; I dedicate time to understanding your specific needs.",
        "value2": "<strong>Holistic Approach:</strong> I consider the person in their entirety: body, mind, and emotions.",
        "value3": "<strong>Professionalism and Continuous Learning:</strong> I am committed to ongoing training to offer you the most effective techniques.",
        "value4": "<strong>Empathy and Support:</strong> I accompany you on your journey with dedication and encouragement.",
        "pageTitleServices": "Services - Physiotherapy and Yoga - Maria G. Hendriksen",
        "servicesHeading": "My Services",
        "servicesIntro": "Every path, whether it be physiotherapy, yoga, or a combination of both, is carefully personalized. I work together with you to define realistic goals and provide you with the tools and awareness necessary not only to achieve well-being but also to maintain it over time, preventing future issues.",
        "fisioTitle": "Physiotherapy",
        "fisioDesc": "Physiotherapy is essential for recovering from injuries, managing chronic pain, and improving mobility. My approach includes:",
        "fisioPoint1": "<strong>Complete Functional Assessment:</strong> Detailed analysis of posture, movement, and problem areas.",
        "fisioPoint2": "<strong>Manual Therapy:</strong> Specific techniques (mobilizations, manipulations, therapeutic massage) to reduce pain and restore joint and muscle function.",
        "fisioPoint3": "<strong>Personalized Therapeutic Exercise:</strong> Targeted exercise programs to strengthen, stretch, and stabilize.",
        "fisioPoint4": "<strong>Post-Operative and Sports Rehabilitation:</strong> Specific pathways to safely return to daily and sports activities.",
        "fisioPoint5": "<strong>Education and Prevention:</strong> Advice on posture, ergonomics, and strategies to prevent recurrence.",
        "fisioWho": "Suitable for: Low back pain, neck pain, sciatica, post-surgery recovery, sports injuries, tendinitis, osteoarthritis, and much more.",
        "yogaTitle": "Yoga",
        "yogaDesc": "Yoga is an extraordinary discipline for improving flexibility, strength, balance, and self-awareness. I offer classes suitable for all levels:",
        "yogaPoint1": "<strong>Individual Lessons (One-to-One):</strong> Personalized path based on your needs, goals, and physical conditions. Ideal for starting, deepening your practice, or for specific therapeutic needs.",
        "yogaPoint2": "<strong>Group Lessons (Small Groups):</strong> Dynamic and engaging classes to explore different Yoga styles (e.g., Hatha, Vinyasa) and practice Therapeutic Yoga.",
        "yogaPoint3": "<strong>Therapeutic Yoga:</strong> Targeted use of postures (asanas), breathing (pranayama), and meditation to address specific physical or emotional issues, integrated with physiotherapy.",
        "yogaPoint4": "<strong>Prenatal/Postnatal Yoga:</strong> Specific support for women during pregnancy and the postpartum period.",
        "yogaBenefits": "Benefits: Stress reduction, improved posture, increased flexibility and strength, greater body awareness, improved breathing capacity.",
        "servicesContactPrompt": "For more details on the services or to discuss your specific needs, please do not hesitate to <a href=\"prenota.html\">contact me</a>.",
        "pageTitlePlans": "Plans and Rates - Maria G. Hendriksen",
        "plansHeading": "Plans and Rates",
        "plansIntro": "Choose the plan that best suits your needs. For customized solutions or combined Physiotherapy+Yoga packages, <a href=\"prenota.html\">contact me</a>.",
        "plansNote": "Note: Payments are preferably made at the time of the session (cash, Bizum). For packages or advance payments, bank transfer or an online payment link can be requested.",
        "planFisioSingleTitle": "Single Physiotherapy Session",
        "planFisioSingleDesc": "Individual physiotherapy assessment and treatment.",
        "planFisioSingleFeat1": "Duration: approx. 60 minutes",
        "planFisioSingleFeat2": "Personalized treatment",
        "planFisioSingleButton": "Book Now",
        "planFisio5Title": "5 Physiotherapy Sessions Cycle",
        "planFisio5Desc": "Convenient package for a complete rehabilitation path.",
        "planFisio5Feat1": "5 individual sessions (60 min/each)",
        "planFisio5Feat2": "Progress monitoring",
        "planFisio5Feat3": "Discount compared to single session",
        "planFisio5Button": "Book Cycle",
        "planYogaIndSingleTitle": "Individual Yoga Lesson",
        "planYogaIndSingleDesc": "Personalized One-to-One practice.",
        "planYogaIndSingleFeat1": "Duration: 60 minutes",
        "planYogaIndSingleFeat2": "Suitable for all levels",
        "planYogaIndSingleFeat3": "Focus on specific goals",
        "planYogaIndSinglePrice": "€25",
        "planYogaIndSingleButton": "Book Lesson",
        "planYogaInd5Title": "Package of 5 Individual Yoga Lessons",
        "planYogaInd5Desc": "Continuous path to deepen the practice.",
        "planYogaInd5Button": "Purchase Package",
        "planYogaGroupSingleTitle": "Group Yoga Lesson (Drop-in)",
        "planYogaGroupSingleDesc": "Join one of our group classes.",
        "planYogaGroupSingleFeat1": "Check class schedule",
        "planYogaGroupSingleFeat2": "Suitable for different levels",
        "planYogaGroupSinglePrice": "€15 per person",
        "planYogaGroupSingleButton": "Book Class",
        "planYogaGroup10Title": "Package of 10 Group Yoga Lessons",
        "planYogaGroup10Desc": "Attend group classes conveniently.",
        "planYogaGroup10Feat1": "Access to 10 group lessons",
        "planYogaGroup10Feat2": "Validity: 3 months",
        "planYogaGroup10Feat3": "Maximum convenience",
        "planYogaGroup10Button": "Purchase Card",
        "planFisioSinglePriceStudio": "€50 - At the Studio",
        "planFisioSinglePriceHome": "€65 - At your Home",
        "planFisio5CurrentPriceStudio": "€220 - At the Studio",
        "planFisio5OriginalPriceStudio": "Instead of <s>€250</s>",
        "planFisio5CurrentPriceHome": "€290 - At your Home",
        "planFisio5OriginalPriceHome": "Instead of <s>€325</s>",
        "planYogaInd5CurrentPrice": "€110",
        "planYogaInd5OriginalPrice": "Instead of <s>€125</s>",
        "planYogaGroupFeatMin": "Minimum 4 participants",
        "planYogaGroup10FeatMin2": "Minimum 4 participants per class",
        "planYogaGroup10CurrentPrice": "€320",
        "planYogaGroup10OriginalPrice": "Instead of <s>€600</s>",
        "groupBookingTitle": "Group Booking",
        "participantsLabel": "Number of Participants:",
        "pricePerGroupLabel": "for the entire group",
        "paymentMethodLabel": "Choose a payment method:",
        "locationStudio": "At the Studio",
        "locationHome": "At your Home",
        "insteadOf": "Instead of",
        "individualBookingTitle": "Booking Details",
        "bookingFor": "You are booking: <strong id=\"modal-individual-service-name-value\"></strong>",
        "pageTitleBooking": "Booking / Contact - Maria G. Hendriksen",
        "bookingTitleWidget": "Book Online Discovery Call",
        "bookingInstructionsWidget": "Use the calendar below to choose an available time for a free discovery call (30 min).",
        "bookingWidgetAltContact": "To book other types of sessions or for special requirements, please use the contact form below or the other contact details.",
        "contactFormTitle": "Contact Form / Info Request",
        "contactFormInstructions": "Fill out this form for questions, information requests, or to book specific sessions. I will reply as soon as possible.",
        "labelName": "Name:",
        "labelEmail": "Email:",
        "labelPhone": "Phone (Optional):",
        "labelSubject": "Subject:",
        "optionSelectSubject": "-- Select Subject --",
        "optionSubjFisio": "Physiotherapy Appointment Request",
        "optionSubjYogaInd": "Individual Yoga Lesson Request",
        "optionSubjYogaGroup": "Group Yoga Info",
        "optionSubjInfo": "General Info",
        "optionSubjOther": "Other",
        "labelMessage": "Your message:",
        "submitButton": "Send Message",
        "directContactTitle": "Direct Contacts",
        "directContactInfo": "You can also contact me via:",
        "contactWhatsapp": "WhatsApp: <a href=\"https://wa.me/5492983567655\" target=\"_blank\">+54 9 2983 567655</a>",
        "contactInstagram": "Instagram: <a href=\"https://www.instagram.com/yoguikine?igsh=dDk4bGc3Zm81MWx2\" target=\"_blank\" rel=\"noopener noreferrer\">@yoguikine</a>",
        "contactEmail": "Email: <a href=\"mailto:guillerminadn@gmail.com\">guillerminadn@gmail.com</a>",
        "contactPhone": "Phone: <a href=\"tel:+34641234679\">+34 641234679</a>",
        "contactAddress": "Studio Address: Palma de Mallorca (contact me for details)",
        "contactLabelWhatsapp": "WhatsApp",
        "contactLabelEmail": "Email",
        "contactLabelPhone": "Phone",
        "contactLabelInstagram": "Instagram",
        "pageTitleContent": "My Content - Maria Guillermina Hendriksen",
        "contentHeading": "My Content",
        "contentIntro": "Explore resources, videos, and articles dedicated to Yoga and Physiotherapy to deepen your practice and wellness journey.",
        "contentYogaTitle": "Yoga Content",
        "ratingOptionDefault": "-- Select Rating --",
        "ratingOption5": "★★★★★ (Excellent)",
        "ratingOption4": "★★★★☆ (Very Good)",
        "ratingOption3": "★★★☆☆ (Good)",
        "ratingOption2": "★★☆☆☆ (Fair)",
        "ratingOption1": "★☆☆☆☆ (Poor)",
        "contentYogaDesc": "Lesson videos, specific sequences, breathing techniques, and guided meditations to enrich your home yoga practice.",
        "purchasable-lessons-section1": "Purchasable Video Lessons",
        "dynamic_login_prompt": "Please <a href=\"#\" onclick=\"openModal('login-modal'); return false;\">log in</a> or <a href=\"#\" onclick=\"openModal('signup-modal'); return false;\">sign up</a> to see available content and purchase options.",
        "purchasable-lessons-paragraph": "Access full lessons and exclusive insights by purchasing access below.",
        "yogaVideo1Title": "Yoga Content Title 1 (e.g., Energizing Morning Sequence)",
        "yogaVideo1Desc": "Brief description of the video or article content. Invites clicking to see more.",
        "yogaVideo2Title": "Yoga Content Title 2 (e.g., Guided Meditation for Relaxation)",
        "yogaVideo2Desc": "Another captivating description for this specific content.",
        "contentFisioTitle": "Physiotherapy Content",
        "contentFisioDesc": "Practical tips, explained therapeutic exercises, insights into common conditions, and prevention strategies for your physical health.",
        "fisioContent1Title": "Physio Content Title 1 (e.g., Exercises for Back Pain)",
        "fisioContent1Desc": "Content description: simple and safe exercises to do at home to relieve low back pain.",
        "fisioContent2Title": "Physio Content Title 2 (e.g., Postural Tips for the Office)",
        "fisioContent2Desc": "How to maintain correct posture while working at a desk to prevent neck and back pain.",
        "reviewsHeading": "Testimonials / Reviews",
        "testimonialGalleryHeading": "Some Testimonials",
        "testimonialGalleryIntro": "Here you can see some of the messages and experiences shared by those who have followed a path with me.",
        "dynamicReviewsHeading": "Your Reviews",
        "reviewFormHeading": "Leave Your Review",
        "reviewFormIntro": "Have you taken lessons or a physiotherapy path with me? Your opinion is valuable! Fill out the form below to share your experience.",
        "reviewLabelName": "Your name (or how you want to appear):",
        "reviewLabelRating": "Rating (1 to 5 stars):",
        "reviewLabelMessage": "Your review:",
        "reviewSubmitButton": "Send Review",
        "reviewFormNotes": "Note: Reviews submitted via this form will be moderated before publication. Thank you for sharing!",
		"bookingForText": "You are booking:",
		"bizumCTAButton": "Send Confirmation via WhatsApp",
		"whatsappMessage": "Hi Maria, I'm contacting you from your website. I'd like to purchase the '[SERVICE_NAME]' service and pay with Bizum. I'm awaiting instructions. Thanks!",
		"bizumInfoText": "For this service, the booking is finalized with personal contact. Proceed on WhatsApp to arrange your appointment and payment directly with Maria.",
		"bizumProceedButton": "Proceed on WhatsApp",
		"youtubeSectionTitle": "Follow me on YouTube",
		"youtubeSectionText": "Don't miss new videos and full lessons. Subscribe to the channel to stay up to date.",
		"youtubeSectionButton": "Subscribe Now",
		"noReviewsYet": "No reviews yet. Be the first to leave one!",
		"loginToPurchase": "You must log in to be able to purchase.",
		"thankYouTitle": "Thank you! Your payment has been received.",
		"thankYouText": "To complete your booking, please follow these two steps:",
		"thankYouButtonForm": "1. Fill out your Clinical History",
		"thankYouButtonWP": "2. Contact Maria to Schedule the Appointment",
		"whatsappMessageFisio": "Hi Maria, I have just paid for a Physiotherapy session and filled out the clinical form. I'd like to schedule the appointment. Thanks!",
		"bizumTitle": "Finalize with Bizum",
		"bizumInstructions": "To complete your purchase, please send a Bizum to the number below. Afterwards, you can contact Maria on WhatsApp to schedule the appointment.",
		"bizumAmount": "Amount:",
		"bizumPhoneNumber": "Phone Number:",
		"bizumWhatsappButton": "Contact on WhatsApp to Book",
		"bizumFormButton": "Fill Out Clinical Form",
		// --- NEW TEXTS FOR PACKAGES SECTION ---
        "packagesEyebrow": "Exclusive Paths",
        "packagesTitle": "Deepen Your Journey with Our Video Packages",
        "packagesSubtitle": "Choose the path that suits you best. Access on-demand video collections to train wherever and whenever you want, with Maria's expert guidance.",
        "packageDiscoverButton": "Discover more",

        "package1Title": "Yoga & Functional Mobility",
        "package1Desc": "Unlock your body and improve your posture with this 4-lesson journey that blends Yoga awareness with functional mobility exercises. Ideal for those seeking flexibility and a new freedom of movement.",

        "package2Title": "The Basics of Yoga",
        "package2Desc": "Begin or deepen your Yoga journey with this package of 2 essential lessons. Designed for beginners and intermediates, it will guide you through the foundations of the practice, building strength and balance.",

        "package3Title": "Complete Home Workout",
        "package3Desc": "Transform your space into a personal gym with these 4 complete workout lessons. Use resistance bands and your body weight for an effective training session, complete with recovery exercises.",

        "package4Title": "Total Yoga Immersion",
        "package4Desc": "The ultimate collection for the Yoga lover. This package of 10 video lessons will guide you through different styles and levels, from energizing practices to relaxing sequences, for a complete experience.",

        "modalInstructions": "To gain access, follow these 2 steps: complete the payment and then submit the access request. Access will be granted within 24 hours of verification.",
        "modalStep1": "Step 1: Choose a payment method",
        "modalStep2": "Step 2: Request access",
        "modalRequestAccess": "Request Access to Folder"
    },
    es: {
        "pageTitle": "Maria Guillermina Hendriksen - Fisioterapia y Yoga",
        "navHome": "Inicio",
        "navAbout": "Sobre Mí",
        "navServices": "Servicios",
        "navPlans": "Planes",
        "navContent": "Mis Contenidos",
        "navBooking": "Reservas/Contacto",
        "footerText": "&copy; 2025 Maria Guillermina Hendriksen. Todos los derechos reservados.",
        "heroMotto": "Escucha a tu cuerpo.<br>Respira en el presente.<br>Muévete hacia el bienestar.",
        "mainSubtitle": "Fisioterapeuta experta e Instructora de Yoga certificada, dedicada a tu bienestar.",
        "ctaButton": "Descubre Más y Reserva",
        "signup-button": "Regístrate",
        "mottoPart1": "Escucha a tu cuerpo.",
        "mottoPart2": "Respira en el presente.",
        "mottoPart3": "Muévete hacia el bienestar.",
        "heroCtaButton": "Descubre mis servicios",
        "introTitle": "Mi Enfoque",
        "introText": "Combino las técnicas de la fisioterapia con yoga para un camino de recuperación personalizado. Mi enfoque integral ayuda a recuperar el equilibrio y la conciencia para un bienestar profundo y duradero.",
        "approachEyebrow": "Mi enfoque",
        "approachTitle": "Un Enfoque Integrado",
        "pageTitleAbout": "Sobre Mí - Maria G. Hendriksen",
        "aboutHeading": "Sobre Mí",
        "aboutQualifications": "Mis Cualificaciones",
        "Qualification1": "Licenciatura en Kinesiología y Fisiatría obtenida en la Universidad Católica de La Plata, Argentina, con Apostilla de La Haya que certifica su autenticidad internacional.",
        "caption_degree_certificate": "Extracto del Certificado de Grado",
        "caption_apostille": "Apostilla de La Haya",
        "Qualification2": "Certificado de Instructora de Yoga",
        "aboutP1": "Soy Maria Guillermina Hendriksen, una fisioterapeuta apasionada e instructora de Yoga con varios años de experiencia, adquirida desde la graduación, en el campo de la recuperación funcional y el bienestar psicofísico.",
        "aboutP2": "Mi misión es ayudar a las personas a reencontrar el equilibrio entre cuerpo y mente, superar el dolor y mejorar la calidad de su vida a través de un enfoque integrado y personalizado.",
        "aboutFormationTitle": "Formación y Filosofía",
        "aboutP3": "Me licencié en Fisioterapia en la Universidad Católica de La Plata (UCLP) y profundicé mis conocimientos con cursos de especialización en Terapia Manual y Rehabilitación Funcional. Paralelamente, cultivé mi pasión por el Yoga, obteniendo la certificación como Instructora Profesional de Yoga en la Federación Argentina de Yoga.",
        "aboutP4": "Creo firmemente en la unión entre la ciencia de la fisioterapia y la práctica milenaria del Yoga. Esto me permite ofrecer tratamientos que no se limitan a curar el síntoma, sino que buscan comprender su causa y promover un estilo de vida más sano y consciente.",
        "aboutValuesTitle": "Valores",
        "value1": "<strong>Escucha Atenta:</strong> Cada persona es única, dedico tiempo a comprender tus necesidades específicas.",
        "value2": "<strong>Enfoque Holístico:</strong> Considero a la persona en su totalidad: cuerpo, mente y emociones.",
        "value3": "<strong>Profesionalidad y Actualización:</strong> Me comprometo a una formación continua para ofrecerte las técnicas más eficaces.",
        "value4": "<strong>Empatía y Apoyo:</strong> Te acompaño en tu camino con dedicación y aliento.",
        "pageTitleServices": "Servicios - Fisioterapia y Yoga - Maria G. Hendriksen",
        "servicesHeading": "Mis Servicios",
        "servicesIntro": "Cada camino, ya sea fisioterapéutico, yóguico o una combinación de ambos, es cuidadosamente personalizado. Trabajo contigo para definir objetivos realistas y proporcionarte las herramientas y la conciencia necesarias no solo para alcanzar el bienestar, sino también para mantenerlo en el tiempo, previniendo problemas futuros.",
        "fisioTitle": "Fisioterapia",
        "fisioDesc": "La fisioterapia es fundamental para la recuperación de lesiones, el manejo del dolor crónico y la mejora de la movilidad. Mi enfoque incluye:",
        "fisioPoint1": "<strong>Evaluación Funcional Completa:</strong> Análisis detallado de la postura, el movimiento y las áreas problemáticas.",
        "fisioPoint2": "<strong>Terapia Manual:</strong> Técnicas específicas (movilizaciones, manipulaciones, masaje terapéutico) para reducir el dolor y restaurar la función articular y muscular.",
        "fisioPoint3": "<strong>Ejercicio Terapéutico Personalizado:</strong> Programas de ejercicios específicos para fortalecer, estirar y estabilizar.",
        "fisioPoint4": "<strong>Rehabilitación Postoperatoria y Deportiva:</strong> Caminos específicos para volver a las actividades diarias y deportivas de forma segura.",
        "fisioPoint5": "<strong>Educación y Prevención:</strong> Consejos sobre postura, ergonomía y estrategias para prevenir recaídas.",
        "fisioWho": "Adecuado para: Dolor lumbar, cervicalgia, ciática, recuperación postoperatoria, lesiones deportivas, tendinitis, artrosis, y mucho más.",
        "yogaTitle": "Yoga",
        "yogaDesc": "El Yoga es una disciplina extraordinaria para mejorar la flexibilidad, fuerza, equilibrio y autoconciencia. Ofrezco clases adaptadas a todos los niveles:",
        "yogaPoint1": "<strong>Clases Individuales (One-to-One):</strong> Camino personalizado según tus necesidades, objetivos y condiciones físicas. Ideal para empezar, profundizar la práctica o para necesidades terapéuticas específicas.",
        "yogaPoint2": "<strong>Clases Grupales (Grupos Pequeños):</strong> Clases dinámicas y participativas para explorar diferentes estilos de Yoga (ej. Hatha, Vinyasa) y practicar Yoga Terapéutico.",
        "yogaPoint3": "<strong>Yoga Terapéutico:</strong> Uso específico de posturas (asanas), respiración (pranayama) y meditación para abordar problemas físicos o emocionales específicos, en integración con la fisioterapia.",
        "yogaPoint4": "<strong>Yoga Prenatal/Postnatal:</strong> Apoyo específico para mujeres durante el embarazo y en el período posterior al parto.",
        "yogaBenefits": "Beneficios: Reducción del estrés, mejora de la postura, aumento de la flexibilidad y la fuerza, mayor conciencia corporal, mejora de la capacidad respiratoria.",
        "servicesContactPrompt": "Para más detalles sobre los servicios o para discutir tus necesidades específicas, no dudes en <a href=\"prenota.html\">contactarme</a>.",
        "pageTitlePlans": "Planes y Tarifas - Maria G. Hendriksen",
        "plansHeading": "Planes y Tarifas",
        "plansIntro": "Elige el plan que mejor se adapte a tus necesidades. Para soluciones personalizadas o paquetes combinados Fisioterapia+Yoga, <a href=\"prenota.html\">contáctame</a>.",
        "plansNote": "Nota: Los pagos se realizan preferentemente en el momento de la sesión (efectivo, Bizum). Para paquetes o pagos anticipados, se puede solicitar transferencia bancaria o enlace para pago online.",
        "planFisioSingleTitle": "Sesión Única de Fisioterapia",
        "planFisioSingleDesc": "Evaluación y tratamiento fisioterapéutico individual.",
        "planFisioSingleFeat1": "Duración: aprox. 60 minutos",
        "planFisioSingleFeat2": "Tratamiento personalizado",
        "planFisioSingleButton": "Reserva Ahora",
        "planFisio5Title": "Ciclo 5 Sesiones de Fisioterapia",
        "planFisio5Desc": "Paquete conveniente para un camino de rehabilitación completo.",
        "planFisio5Feat1": "5 sesiones individuales (60 min/cada)",
        "planFisio5Feat2": "Seguimiento del progreso",
        "planFisio5Feat3": "Descuento respecto a la sesión única",
        "planFisio5Button": "Reserva Ciclo",
        "planYogaIndSingleTitle": "Clase Individual de Yoga",
        "planYogaIndSingleDesc": "Práctica personalizada One-to-One.",
        "planYogaIndSingleFeat1": "Duración: 60 minutos",
        "planYogaIndSingleFeat2": "Adaptada a todos los niveles",
        "planYogaIndSingleFeat3": "Enfoque en objetivos específicos",
        "planYogaIndSinglePrice": "€25",
        "planYogaIndSingleButton": "Reserva Clase",
        "planYogaInd5Title": "Paquete 5 Clases Individuales de Yoga",
        "planYogaInd5Desc": "Camino continuo para profundizar la práctica.",
        "planYogaInd5Button": "Comprar Paquete",
        "planYogaGroupSingleTitle": "Clase Grupal de Yoga (Drop-in)",
        "planYogaGroupSingleDesc": "Participa en una de nuestras clases grupales.",
        "planYogaGroupSingleFeat1": "Verifica el horario de las clases",
        "planYogaGroupSingleFeat2": "Adaptada a diferentes niveles",
        "planYogaGroupSinglePrice": "€15 por persona",
        "planYogaGroupSingleButton": "Reserva Clase",
        "planYogaGroup10Title": "Paquete 10 Clases Grupales de Yoga",
        "planYogaGroup10Desc": "Asiste a las clases grupales con conveniencia.",
        "planYogaGroup10Feat1": "Acceso a 10 clases grupales",
        "planYogaGroup10Feat2": "Validez: 3 meses",
        "planYogaGroup10Feat3": "Máxima conveniencia",
        "planYogaGroup10Button": "Comprar Bono",
        "planFisioSinglePriceStudio": "€50 - En el Estudio",
        "planFisioSinglePriceHome": "€65 - A Domicilio",
        "planFisio5CurrentPriceStudio": "€220 - En el Estudio",
        "planFisio5OriginalPriceStudio": "En lugar de <s>€250</s>",
        "planFisio5CurrentPriceHome": "€290 - A Domicilio",
        "planFisio5OriginalPriceHome": "En lugar de <s>€325</s>",
        "planYogaInd5CurrentPrice": "€110",
        "planYogaInd5OriginalPrice": "En lugar de <s>€125</s>",
        "planYogaGroupFeatMin": "Mínimo 4 participantes",
        "planYogaGroup10FeatMin2": "Mínimo 4 participantes por clase",
        "planYogaGroup10CurrentPrice": "€320",
        "planYogaGroup10OriginalPrice": "En lugar de <s>€600</s>",
        "groupBookingTitle": "Reserva de Grupo",
        "participantsLabel": "Número de Participantes:",
        "pricePerGroupLabel": "para el grupo entero",
        "paymentMethodLabel": "Elige un método de pago:",
        "locationStudio": "En el Estudio",
        "locationHome": "A Domicilio",
        "insteadOf": "En lugar de",
        "individualBookingTitle": "Detalles de la Reserva",
        "bookingFor": "Estás reservando: <strong id=\"modal-individual-service-name-value\"></strong>",
        "pageTitleBooking": "Reservas / Contacto - Maria G. Hendriksen",
        "bookingTitleWidget": "Reserva Encuentro Informativo Online",
        "bookingInstructionsWidget": "Utiliza el calendario abajo para elegir un horario disponible para un encuentro informativo gratuito (30 min).",
        "bookingWidgetAltContact": "Para reservar otros tipos de sesiones o para necesidades particulares, utiliza el formulario de contacto o los otros métodos de contacto.",
        "contactFormTitle": "Formulario de Contacto / Solicitud de Info",
        "contactFormInstructions": "Rellena este formulario para preguntas, solicitudes de información o para reservar sesiones específicas. Te responderé lo antes posible.",
        "labelName": "Nombre:",
        "labelEmail": "Email:",
        "labelPhone": "Teléfono (Opcional):",
        "labelSubject": "Asunto:",
        "optionSelectSubject": "-- Selecciona Asunto --",
        "optionSubjFisio": "Solicitud Cita Fisioterapia",
        "optionSubjYogaInd": "Solicitud Clase Individual Yoga",
        "optionSubjYogaGroup": "Info Yoga Grupal",
        "optionSubjInfo": "Info General",
        "optionSubjOther": "Otro",
        "labelMessage": "Tu mensaje:",
        "submitButton": "Enviar Mensaje",
        "directContactTitle": "Contactos Directos",
        "directContactInfo": "También puedes contactarme vía:",
        "contactWhatsapp": "WhatsApp: <a href=\"https://wa.me/5492983567655\" target=\"_blank\">+54 9 2983 567655</a>",
        "contactInstagram": "Instagram: <a href=\"https://www.instagram.com/yoguikine?igsh=dDk4bGc3Zm81MWx2\" target=\"_blank\" rel=\"noopener noreferrer\">@yoguikine</a>",
        "contactEmail": "Email: <a href=\"mailto:guillerminadn@gmail.com\">guillerminadn@gmail.com</a>",
        "contactPhone": "Teléfono: <a href=\"tel:+34641234679\">+34 641234679</a>",
        "contactAddress": "Dirección Estudio: Palma de Mallorca (contáctame para detalles)",
        "contactLabelWhatsapp": "WhatsApp",
        "contactLabelEmail": "Email",
        "contactLabelPhone": "Teléfono",
        "contactLabelInstagram": "Instagram",
        "pageTitleContent": "Mis Contenidos - Maria Guillermina Hendriksen",
        "contentHeading": "Mis Contenidos",
        "contentIntro": "Explora recursos, videos y artículos dedicados al Yoga y la Fisioterapia para profundizar tu práctica y tu camino hacia el bienestar.",
        "contentYogaTitle": "Contenidos de Yoga",
        "ratingOptionDefault": "-- Selecciona Valoración --",
        "ratingOption5": "★★★★★ (Excelente)",
        "ratingOption4": "★★★★☆ (Muy Bueno)",
        "ratingOption3": "★★★☆☆ (Bueno)",
        "ratingOption2": "★★☆☆☆ (Suficiente)",
        "ratingOption1": "★☆☆☆☆ (Insuficiente)",
        "dynamic_login_prompt": "Por favor, <a href=\"#\" onclick=\"openModal('login-modal'); return false;\">inicia sesión</a> o <a href=\"#\" onclick=\"openModal('signup-modal'); return false;\">regístrate</a> para ver el contenido disponible y las opciones de compra.",
        "contentYogaDesc": "Videos de clases, secuencias específicas, técnicas de respiración y meditación guiada para enriquecer tu práctica de yoga en casa.",
        "purchasable-lessons-section1": "Videolecciones Disponibles para Comprar",
        "purchasable-lessons-paragraph": "Accede a lecciones completas y contenidos exclusivos comprando el acceso aquí abajo.",
        "yogaVideo1Title": "Título Contenido Yoga 1 (ej. Secuencia Matutina Energizante)",
        "yogaVideo1Desc": "Breve descripción del contenido del video o artículo. Invita a hacer clic para ver más.",
        "yogaVideo2Title": "Título Contenido Yoga 2 (ej. Meditación Guiada para la Relajación)",
        "yogaVideo2Desc": "Otra descripción atractiva para este contenido específico.",
        "contentFisioTitle": "Contenidos de Fisioterapia",
        "contentFisioDesc": "Consejos prácticos, ejercicios terapéuticos explicados, información sobre patologías comunes y estrategias de prevención para tu salud física.",
        "fisioContent1Title": "Título Contenido Fisio 1 (ej. Ejercicios para el Dolor de Espalda)",
        "fisioContent1Desc": "Descripción del contenido: ejercicios simples y seguros para hacer en casa y aliviar el dolor lumbar.",
        "fisioContent2Title": "Título Contenido Fisio 2 (ej. Consejos Posturales para la Oficina)",
        "fisioContent2Desc": "Cómo mantener una postura correcta trabajando en el escritorio para prevenir dolores cervicales y dorsales.",
        "reviewsHeading": "Testimonios / Reseñas",
        "testimonialGalleryHeading": "Algunos Testimonios",
        "testimonialGalleryIntro": "Aquí puedes ver algunos de los mensajes y experiencias compartidas por quienes han seguido un camino conmigo.",
        "dynamicReviewsHeading": "Vuestras Reseñas",
        "reviewFormHeading": "Deja Tu Reseña",
        "reviewFormIntro": "¿Has seguido clases o un percorso de fisioterapia conmigo? ¡Tu opinión es valiosa! Completa el formulario a continuación para compartir tu experiencia.",
        "reviewLabelName": "Tu nombre (o como quieres aparecer):",
        "reviewLabelRating": "Valoración (de 1 a 5 estrellas):",
        "reviewLabelMessage": "Tu reseña:",
        "reviewSubmitButton": "Enviar Reseña",
        "reviewFormNotes": "Nota: Las reseñas enviadas a través de este formulario serán moderadas antes de su publicación. ¡Gracias por compartir!",
		"bookingForText": "Estás reservando:",
		"bizumCTAButton": "Enviar Confirmación por WhatsApp",
		"whatsappMessage": "Hola Maria, te contacto desde tu web. Me gustaría comprar el servicio '[NOMBRE_DEL_SERVICIO]' y pagar con Bizum. Quedo a la espera de instrucciones. ¡Gracias!",
		"bizumInfoText": "Para este servicio, la reserva se finaliza con un contacto personal. Procede en WhatsApp para definir tu cita y el pago directamente con Maria.",
		"bizumProceedButton": "Proceder en WhatsApp",
		"youtubeSectionTitle": "Sígueme en YouTube",
		"youtubeSectionText": "No te pierdas los nuevos vídeos y las clases completas. Suscríbete al canal para mantenerte siempre al día.",
		"youtubeSectionButton": "Suscríbete Ahora",
		"noReviewsYet": "Aún no hay reseñas. ¡Sé el primero en dejar una!",
		"loginToPurchase": "Debes iniciar sesión para poder comprar.",
		"thankYouTitle": "¡Gracias! Hemos recibido tu pago.",
		"thankYouText": "Para completar tu reserva, por favor sigue estos dos pasos:",
		"thankYouButtonForm": "1. Completa tu Historia Clínica",
		"thankYouButtonWP": "2. Contacta a Maria para Agendar la Cita",
		"whatsappMessageFisio": "Hola Maria, acabo de realizar el pago para una sesión de Fisioterapia y he completado el formulario clínico. Me gustaría agendar la cita. ¡Gracias!",
		"bizumTitle": "Finalizar con Bizum",
		"bizumInstructions": "Para completar tu compra, envía un Bizum al número de abajo. Después, puedes contactar a Maria por WhatsApp para agendar la cita.",
		"bizumAmount": "Importe:",
		"bizumPhoneNumber": "Número de Teléfono:",
		"bizumWhatsappButton": "Contactar por WhatsApp para Reservar",
		"bizumFormButton": "Completar Formulario Clínico",
		// --- NEW TEXTS FOR PACKAGES SECTION ---
        "packagesEyebrow": "Recorridos Exclusivos",
        "packagesTitle": "Profundiza Tu Camino con Nuestros Paquetes de Vídeo",
        "packagesSubtitle": "Elige el recorrido que mejor se adapte a ti. Accede a colecciones de vídeos bajo demanda para entrenar donde y cuando quieras, con la guía experta de María.",
        "packageDiscoverButton": "Descubre más",

        "package1Title": "Yoga y Movilidad Funcional",
        "package1Desc": "Desbloquea tu cuerpo y mejora tu postura con este recorrido de 4 clases que fusiona la conciencia del Yoga con ejercicios de movilidad funcional. Ideal para quienes buscan flexibilidad y una nueva libertad de movimiento.",

        "package2Title": "Las Bases del Yoga",
        "package2Desc": "Inicia o profundiza tu viaje en el Yoga con este paquete de 2 clases esenciales. Diseñado para principiantes e intermedios, te guiará a través de los fundamentos de la práctica, construyendo fuerza y equilibrio.",

        "package3Title": "Entrenamiento Completo en Casa",
        "package3Desc": "Transforma tu espacio en un gimnasio con estas 4 clases de entrenamiento completo. Utiliza bandas elásticas y tu peso corporal para un training efectivo, complementado con ejercicios de recuperación.",

        "package4Title": "Inmersión Total en el Yoga",
        "package4Desc": "La colección definitiva para el amante del Yoga. Este paquete de 10 video-clases te acompañará a través de diferentes estilos y niveles, desde prácticas energizantes hasta secuencias relajantes, para una experiencia completa.",

        "modalInstructions": "Para acceder, sigue estos 2 pasos: completa el pago y luego envía la solicitud de acceso. El acceso se aprobará dentro de las 24 horas posteriores a la verificación.",
        "modalStep1": "Paso 1: Elige un método de pago",
        "modalStep2": "Paso 2: Solicita el acceso",
        "modalRequestAccess": "Solicitar Acceso a la Carpeta"
		
    }
};



let currentLanguage = localStorage.getItem('language') || 'es';



// Nel file script.js, sostituisci la vecchia funzione updateUITexts con questa:
function updateUITexts(lang) {
    // Seleziona TUTTI gli elementi con la chiave di traduzione, anche quelli dentro modali nascosti
    document.querySelectorAll('[data-translate-key]').forEach(element => {
        const key = element.dataset.translateKey;
        // Controlla se la lingua e la chiave esistono nel nostro oggetto
        if (languages[lang] && languages[lang][key]) {
            const translation = languages[lang][key];
            // Se l'elemento è una figcaption o la traduzione non contiene HTML, usa textContent per sicurezza
            if (element.tagName === 'FIGCAPTION' || !translation.includes('<')) {
                element.textContent = translation;
            } else {
                // Altrimenti, usa innerHTML per interpretare i tag (es. <strong>)
                element.innerHTML = translation;
            }
        }
    });
}



// --- INIZIALIZZAZIONE SUPABASE ---
const SUPABASE_URL = 'https://kmnowyskoyordmndfdae.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttbm93eXNrb3lvcmRtbmRmZGFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyNzUwMTEsImV4cCI6MjA2MTg1MTAxMX0.MdcRpTPTGC8e5wSeqp7chqhP0fsaW50VtiuN2y26eiw';

let supabase = null;
try {
    if (window.supabase) {
       supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
       console.log("Supabase client initialized.");
    } else {
       console.error("Supabase library not found. Make sure it's included in your HTML before script.js");
    }
} catch (error) {
    console.error("Error initializing Supabase:", error);
}

let currentUser = null;








// ===================================================================
// ============= FUNZIONE MANCANTE PER L'AUTENTICAZIONE =============
// ===================================================================
// Incolla questa funzione vicino alle altre funzioni di autenticazione

async function getSupabaseToken() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        console.error('Errore nel recuperare la sessione:', error);
        return null;
    }
    if (data.session) {
        return data.session.access_token;
    }
    return null;
}

// ===================================================================




// -----------------------------------------------------------
//               FUNZIONI DI UTILITÀ (Lingua, Stelle, Modali)
// -----------------------------------------------------------

function changeLanguage(lang) {
     if (!languages || !languages[lang]) {
        console.error("Lingua non supportata o oggetto 'languages' non definito:", lang);
        return;
     }
    document.documentElement.lang = lang;
    for (const key in languages[lang]) {
        const elementById = document.getElementById(key);
        if (elementById) {
            if (elementById.tagName === 'OPTION') {
                elementById.textContent = languages[lang][key];
            } else if (key.startsWith('pageTitle')) {
                document.title = languages[lang][key];
            } else {
                elementById.innerHTML = languages[lang][key];
            }
        }
    }

	updateUITexts(lang);


    localStorage.setItem('preferredLanguage', lang);
    if (typeof updateActiveButton === 'function') { updateActiveButton(lang); }

    const videoElement = document.getElementById('presentationVideo');
    if (videoElement) {
        let videoSrc = '';
        switch (lang) {
            case 'en': videoSrc = 'videos/presentation_en.mp4'; break;
            case 'es': videoSrc = 'videos/presentacion_es.mp4'; break;
            case 'it': default: videoSrc = 'videos/presentazione_it.mp4'; break;
        }
        if (videoElement.getAttribute('src') !== videoSrc) {
            videoElement.src = videoSrc;
            videoElement.load();
            console.log(`Video source changed to: ${videoSrc}`);
        }
    }
	
	const videoGrid = document.getElementById('video-lessons-grid');
    if (videoGrid && (!currentUser || currentUser === null)) {
        if (typeof displayLoginMessage === 'function') {
            console.log("Lingua cambiata, utente non loggato, richiamo displayLoginMessage per aggiornare il prompt.");
            displayLoginMessage();
        }
    }
	
	
	// Alla fine della funzione changeLanguage(lang)...

	// Se ci troviamo nella pagina dei contenuti, ricarica i video per aggiornare le traduzioni
	if (document.getElementById('yoga-videos-grid')) {
		loadAndDisplayVideos();
	}
	
	
	// Se ci troviamo in una pagina con le recensioni, ricaricale per aggiornare le traduzioni
	if (document.getElementById('reviews-list-container')) {
		loadReviews();
	}
}

function updateActiveButton(lang) {
    const buttons = document.querySelectorAll('.language-switcher button');
    buttons.forEach(button => {
        let buttonLang = '';
        if (button.hasAttribute('onclick')) {
            const match = button.getAttribute('onclick').match(/changeLanguage\('(\w+)'\)/);
            if (match) buttonLang = match[1];
        } else if (button.dataset.lang) { buttonLang = button.dataset.lang; }

        if (buttonLang === lang) { button.classList.add('active'); }
        else { button.classList.remove('active'); }
    });
}

function displayStars(rating) {
    const maxStars = 5;
    let starsHTML = '';
    const ratingNum = parseInt(rating, 10);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > maxStars) {
        return 'N/A';
    }
    for (let i = 1; i <= maxStars; i++) {
        starsHTML += (i <= ratingNum) ? '★' : '☆';
    }
    return `<span class="review-stars">${starsHTML}</span>`;
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    } else {
        console.error(`Modal with id ${modalId} not found.`);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        const errorP = modal.querySelector('.error-message');
        if (errorP) errorP.textContent = '';
        const msgP = modal.querySelector('.success-message');
        if (msgP) msgP.textContent = '';
        const form = modal.querySelector('form');
        if (form) form.reset();
    } else {
        console.error(`Modal with id ${modalId} not found.`);
    }
}




// Funzione per mostrare un avviso personalizzato e non bloccante
function showAlert(message) {
    const alertModal = document.getElementById('custom-alert-modal');
    const messageP = document.getElementById('custom-alert-message');
    const okButton = document.getElementById('custom-alert-ok-button');

    if (!alertModal || !messageP || !okButton) return;

    messageP.textContent = message;

    // Definiamo cosa succede quando l'utente clicca OK
    okButton.onclick = () => {
		closeModal('custom-alert-modal');
	
		// Aggiungiamo una piccolissima pausa per dare al browser il tempo di processare la chiusura
		setTimeout(() => {
			openModal('login-modal');
		}, 100); // 100 millisecondi (impercettibile per l'utente)
	};

    openModal('custom-alert-modal');
}




// -----------------------------------------------------------
//               FUNZIONI SPECIFICHE (Recensioni, Autenticazione, Contenuti Video)
// -----------------------------------------------------------

async function loadReviews() {
    const container = document.getElementById('reviews-list-container');
    if (!container) return;
    container.innerHTML = '<p>Caricamento recensioni in corso...</p>';
    try {
        const response = await fetch('/.netlify/functions/get-reviews');
        if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);
        const reviews = await response.json();
        container.innerHTML = '';
        if (!reviews || reviews.length === 0) {
            const currentLang = localStorage.getItem('preferredLanguage') || 'it';
			const noReviewsText = languages[currentLang]?.noReviewsYet || languages['it'].noReviewsYet;
			container.innerHTML = `<p>${noReviewsText}</p>`;
            return;
        }
        reviews.forEach(review => {
             const reviewElement = document.createElement('div');
            reviewElement.className = 'review-item';
            const reviewDate = new Date(review.created_at).toLocaleDateString('it-IT', {
                year: 'numeric', month: 'long', day: 'numeric'
            });
            reviewElement.innerHTML = `
                <div class="review-header">
                    <span class="review-name">${review.name || 'Anonimo'}</span>
                    ${displayStars(review.rating)}
                    <span class="review-date">${reviewDate}</span>
                </div>
                <div class="review-comment">
                    <p>${review.comment || ''}</p>
                </div>
            `;
            container.appendChild(reviewElement);
        });
    } catch (error) {
        console.error('Errore nel caricamento delle recensioni:', error);
        container.innerHTML = '<p>Spiacenti, non è stato possibile caricare le recensioni al momento.</p>';
    }
}

async function handleReviewSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const messageDiv = document.getElementById('review-form-message');
    const name = document.getElementById('reviewName').value.trim();
    const ratingSelect = document.getElementById('reviewRating');
    const rating = ratingSelect ? parseInt(ratingSelect.value, 10) : null;
    const comment = document.getElementById('reviewComment').value.trim();

    if (!name || !rating || !comment || isNaN(rating) || rating < 1 || rating > 5) {
        messageDiv.textContent = 'Per favore, compila tutti i campi obbligatori con valori validi.';
        messageDiv.className = 'form-message error';
        messageDiv.style.display = 'block';
        return;
    }

    messageDiv.textContent = 'Invio recensione in corso...';
    messageDiv.className = 'form-message submitting';
    messageDiv.style.display = 'block';
    submitButton.disabled = true;

    try {
		// Prendi la sessione dell'utente per ottenere il token
		const { data: { session } } = await supabase.auth.getSession();
		if (!session) {
			// Se l'utente non è loggato, mostra un errore o apri il modale di login
			throw new Error("Devi effettuare il login per lasciare una recensione.");
		}
	
		const response = await fetch('/.netlify/functions/submit-review', {
			method: 'POST',
			headers: { 
				'Content-Type': 'application/json',
				// Ecco dove "mostriamo il pass" di sicurezza
				'Authorization': `Bearer ${session.access_token}`
			},
			body: JSON.stringify({ name, rating, comment }),
		});
	
		if (!response.ok) {
			let errorMsg = `Errore HTTP: ${response.status}`;
			try {
				const errorData = await response.json();
				errorMsg = errorData.error || errorData.message || errorMsg;
			} catch(e) { /* Ignora */ }
			throw new Error(errorMsg);
		}
		messageDiv.textContent = 'Recensione inviata con successo! Sarà visibile dopo l\'approvazione.';
		messageDiv.className = 'form-message success';
		form.reset();
	
	} catch (error) {
		console.error('Errore invio recensione:', error);
		messageDiv.textContent = `Errore nell'invio della recensione: ${error.message}. Riprova più tardi.`;
		messageDiv.className = 'form-message error';
	} finally {
		submitButton.disabled = false;
	}
}

function updateAuthStateUI(user) {
    const guestInfo = document.getElementById('guest-info');
    const userInfo = document.getElementById('user-info');
    const userEmailSpan = document.getElementById('user-email');
    const signupButtonHeader = document.getElementById('signup-button');

    if (!guestInfo || !userInfo || !userEmailSpan) {
        console.warn("Elementi UI per stato autenticazione non trovati (guest-info, user-info, user-email).");
        return;
    }

    if (user) {
        guestInfo.style.display = 'none';
        if(signupButtonHeader) signupButtonHeader.style.display = 'none';
        userInfo.style.display = 'inline';
        userEmailSpan.textContent = user.email;
    } else {
        guestInfo.style.display = 'inline';
        if(signupButtonHeader) signupButtonHeader.style.display = 'inline-block';
        userInfo.style.display = 'none';
        userEmailSpan.textContent = '';
    }
}

async function checkInitialAuthState() {
    if (!supabase) {
        console.warn("Supabase non inizializzato, impossibile controllare stato auth iniziale.");
        updateAuthStateUI(null);
        initializePageBasedOnAuthState(null);
        return;
    }
    try {
        console.log("Checking initial auth state...");
        const { data: { session }, error } = await supabase.auth.getSession();
         if (error) {
            console.warn("Error getting initial session:", error.message);
            currentUser = null;
         } else {
            currentUser = session?.user ?? null;
         }
        console.log("Initial user state:", currentUser ? currentUser.email : 'Not logged in');
        updateAuthStateUI(currentUser);
        initializePageBasedOnAuthState(currentUser);
    } catch (err) {
         console.error("Unexpected error during initial auth check:", err);
         updateAuthStateUI(null);
         initializePageBasedOnAuthState(null);
    }
}

function initializePageBasedOnAuthState(user) {
     const videoGrid = document.getElementById('video-lessons-grid');
     const loginPromptContainer = document.getElementById('login-prompt-container');

     if (videoGrid) {
         if (user) {
            if (loginPromptContainer) loginPromptContainer.style.display = 'none';
             if (typeof loadVideoLessons === 'function') {
                 loadVideoLessons();
             } else { console.warn('Function loadVideoLessons not defined yet.'); }
         } else {
             if (typeof displayLoginMessage === 'function') {
                 displayLoginMessage();
             } else {
                videoGrid.innerHTML = '';
                if (loginPromptContainer) {
                    const currentLang = localStorage.getItem('preferredLanguage') || 'it';
                    loginPromptContainer.innerHTML = languages[currentLang]?.dynamic_login_prompt || languages['it']?.dynamic_login_prompt || '<p>Please log in.</p>';
                    loginPromptContainer.style.display = 'block';
                }
                console.warn('Function displayLoginMessage not defined yet, fallback UI used.');
             }
         }
     }
}

function displayLoginMessage() {
    const grid = document.getElementById('video-lessons-grid');
    const loginPromptContainer = document.getElementById('login-prompt-container');

    if (grid) {
        grid.innerHTML = '';
        grid.style.display = 'none';
    }

    if (loginPromptContainer) {
        const currentLang = localStorage.getItem('preferredLanguage') || 'it';
        let messageHtml = languages[currentLang]?.dynamic_login_prompt || languages['it']?.dynamic_login_prompt || '<p>Please log in to view content.</p>';
        loginPromptContainer.innerHTML = messageHtml;
        loginPromptContainer.style.display = 'block';
    } else {
        if(grid) grid.innerHTML = '<p>Effettua il login per vedere i contenuti e le opzioni di acquisto.</p>';
    }
}

async function fetchVideoLessons() {
    if (!supabase) {
        console.error("Supabase client non disponibile per fetchVideoLessons");
        return [];
    }
    try {
        const { data, error } = await supabase
            .from('video_lessons')
            .select('*')
            .order('created_at', { ascending: true });
        if (error) {
            console.error('Errore nel recupero delle video lezioni:', error);
            throw error;
        }
        console.log("Lezioni recuperate da Supabase:", data);
        return data || [];
    } catch (err) {
        console.error("Eccezione durante fetchVideoLessons:", err);
        return [];
    }
}

async function fetchUserPurchases(userId) {
    if (!supabase || !userId) {
         console.error("Supabase client o User ID non disponibili per fetchUserPurchases");
         return [];
    }
    try {
        const { data, error } = await supabase
            .from('purchases')
            .select('lesson_id')
            .eq('user_id', userId)
            .eq('status', 'completed');
        if (error) {
            console.error('Errore nel recupero degli acquisti utente:', error);
            throw error;
        }
        console.log("Acquisti utente recuperati:", data);
        return data.map(purchase => purchase.lesson_id);
    } catch (err) {
         console.error("Eccezione durante fetchUserPurchases:", err);
         return [];
    }
}

function displayVideoLessons(lessons, purchasedLessonIds) {
    const grid = document.getElementById('video-lessons-grid');
    if (!grid) {
        console.error("Elemento #video-lessons-grid non trovato nel DOM.");
        return;
    }
    grid.innerHTML = '';
    grid.style.display = 'grid';

    if (lessons.length === 0) {
        grid.innerHTML = '<p>Nessuna video lezione disponibile al momento.</p>';
        return;
    }

    lessons.forEach(lesson => {
        const isPurchased = purchasedLessonIds.includes(lesson.id);
        const item = document.createElement('div');
        item.className = 'content-item';
        let priceFormatted = 'N/D';
        if (lesson.price_eur !== null && lesson.price_eur !== undefined) {
            try {
                 priceFormatted = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(lesson.price_eur);
            } catch(e) { console.error("Errore formattazione prezzo:", e); }
        }
        item.innerHTML = `
            <div class="content-thumbnail">
                <img src="${lesson.thumbnail_url || 'images/placeholder-video.png'}" alt="Anteprima ${lesson.name || 'Lezione'}">
            </div>
            <div class="content-text">
                <h3 class="content-title">${lesson.name || 'Titolo Lezione'}</h3>
                <p class="content-description">${lesson.description || 'Nessuna descrizione.'}</p>
                ${isPurchased ?
                    `<p style="margin-top:10px; font-weight:bold; color:green;">Acquistato</p>
                     <button class="cta-button watch-button" data-lesson-id="${lesson.id}">Guarda Ora</button>`
                    :
                    `<p class="price" style="font-weight: bold; margin-top:10px;">${priceFormatted}</p>
                     <div class="purchase-buttons" style="margin-top: 10px; display: flex; flex-direction: column; gap: 8px;">
                         <button class="cta-button paypal-buy-button" data-lesson-id="${lesson.id}" data-price="${lesson.price_eur}">
                             Acquista con PayPal
                         </button>
                         <button class="cta-button mercadopago-buy-button" data-lesson-id="${lesson.id}" data-price="${lesson.price_eur}">
                             Acquista con MercadoPago
                         </button>
                         <div id="paypal-button-container-${lesson.id}" style="min-height: 40px; margin-top: 5px;"></div>
                     </div>`
                }
            </div>
        `;
        grid.appendChild(item);
    });
    addPurchaseButtonListeners();
    addWatchButtonListeners();
}

async function loadVideoLessons() {
    const grid = document.getElementById('video-lessons-grid');
    const loginPromptContainer = document.getElementById('login-prompt-container');

    if (!grid) return;

    if (loginPromptContainer) {
        loginPromptContainer.innerHTML = '';
        loginPromptContainer.style.display = 'none';
    }
    grid.style.display = 'grid';

    if (!currentUser) {
        displayLoginMessage();
        return;
    }

    console.log("Utente loggato, caricamento lezioni...");
    grid.innerHTML = '<p>Caricamento lezioni disponibili...</p>';

    try {
        const [lessons, purchasedIds] = await Promise.all([
            fetchVideoLessons(),
            fetchUserPurchases(currentUser.id)
        ]);
        displayVideoLessons(lessons, purchasedIds);
    } catch (error) {
        console.error("Errore durante il caricamento delle lezioni o degli acquisti:", error);
        grid.innerHTML = `<p style="color:red;">Errore nel caricamento dei contenuti (${error.message}). Riprova più tardi.</p>`;
    }
}

function addPurchaseButtonListeners() {
    document.querySelectorAll('.paypal-buy-button').forEach(button => {
        button.replaceWith(button.cloneNode(true));
    });
     document.querySelectorAll('.paypal-buy-button').forEach(button => {
         button.addEventListener('click', handlePayPalBuyClick);
     });

    document.querySelectorAll('.mercadopago-buy-button').forEach(button => {
         button.replaceWith(button.cloneNode(true));
     });
      document.querySelectorAll('.mercadopago-buy-button').forEach(button => {
         button.addEventListener('click', handleMercadoPagoBuyClick);
     });
}

function addWatchButtonListeners() {
    document.querySelectorAll('.watch-button').forEach(button => {
         button.replaceWith(button.cloneNode(true));
     });
     document.querySelectorAll('.watch-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const lessonId = event.target.dataset.lessonId;
            console.log(`Click su "Guarda Ora" per lezione: ${lessonId}`);
            alert(`Funzionalità "Guarda Ora" per la lezione ${lessonId} non ancora implementata.`);
        });
    });
}

async function handlePayPalBuyClick(event) {
    const button = event.target;
    const lessonId = button.dataset.lessonId;
    const price = button.dataset.price;
    const purchaseButtonsDiv = button.closest('.purchase-buttons');
    const payPalContainerId = `paypal-button-container-${lessonId}`;
    const payPalContainer = document.getElementById(payPalContainerId);
    const mpButton = purchaseButtonsDiv ? purchaseButtonsDiv.querySelector('.mercadopago-buy-button') : null;

    if (!currentUser) {
        alert("Devi effettuare il login per acquistare.");
        openModal('login-modal');
        return;
    }

     if (!supabase || !supabase.auth || typeof supabase.auth.getSession !== 'function') {
         console.error("Supabase client o auth non inizializzato correttamente.");
         alert("Errore: impossibile verificare l'autenticazione. Riprova più tardi.");
         return;
     }
     const { data: { session }, error: sessionError } = await supabase.auth.getSession();
     if (sessionError || !session) {
         console.error("Errore nel recupero della sessione Supabase:", sessionError);
         alert("Errore: impossibile ottenere la sessione utente. Prova a fare logout e login.");
         return;
     }
     const accessToken = session.access_token;

    console.log(`Avvio procedura acquisto PayPal: Lezione ID ${lessonId}, Prezzo ${price}`);
    button.disabled = true;
    button.textContent = 'Creazione ordine...';
    if (mpButton) mpButton.style.display = 'none';
    if (payPalContainer) {
        payPalContainer.innerHTML = '<p><em>Inizializzazione pagamento...</em></p>';
        payPalContainer.style.display = 'block';
    } else {
        console.error(`Container PayPal ${payPalContainerId} non trovato!`);
        alert(`Errore: Impossibile trovare l'area per il bottone di pagamento.`);
        button.disabled = false;
        button.textContent = 'Acquista con PayPal';
        if (mpButton) mpButton.style.display = 'block';
        return;
    }

    try {
        const response = await fetch('/.netlify/functions/create-paypal-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ lessonId: lessonId })
        });
        if (!response.ok) {
            let errorData = { error: `Errore server (${response.status})` };
            try { errorData = await response.json(); } catch(e) { /* ignora */ }
            throw new Error(errorData.error || `Errore ${response.status} nella creazione ordine.`);
        }
        const orderData = await response.json();
        const orderID = orderData.orderId;
        if (!orderID) {
            throw new Error("ID Ordine PayPal non ricevuto dalla funzione backend.");
        }
        console.log("Ordine PayPal creato con ID:", orderID);
        button.style.display = 'none';
        renderPayPalButton(orderID, payPalContainerId, lessonId);
    } catch (error) {
        console.error("Errore durante la chiamata alla funzione Netlify o creazione ordine:", error);
        if (payPalContainer) {
             payPalContainer.innerHTML = `<p style="color:red;">Errore: ${error.message}</p>`;
        } else {
             alert(`Errore: ${error.message}`);
        }
        button.disabled = false;
        button.textContent = 'Acquista con PayPal';
        button.style.display = 'block';
        if (mpButton) mpButton.style.display = 'block';
        if (payPalContainer) setTimeout(() => { payPalContainer.style.display = 'none'; payPalContainer.innerHTML=''; }, 4000);
    }
}

async function handleMercadoPagoBuyClick(event) {
     if (!currentUser) {
        alert("Devi effettuare il login per acquistare.");
         openModal('login-modal');
        return;
    }
    const button = event.target;
    const lessonId = button.dataset.lessonId;
    const price = button.dataset.price;
    console.log(`Click Acquista MercadoPago: Lezione ID ${lessonId}, Prezzo ${price}`);
    alert(`Procedura acquisto MercadoPago per Lezione ${lessonId} (Prezzo €${price}) non ancora implementata.`);
}

function renderPayPalButton(orderID, containerId, lessonId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container ${containerId} non trovato per il bottone PayPal`);
        return;
    }
    container.innerHTML = '';
    const originalBuyButton = document.querySelector(`.paypal-buy-button[data-lesson-id="${lessonId}"]`);
    const originalMpButton = document.querySelector(`.mercadopago-buy-button[data-lesson-id="${lessonId}"]`);

    function restoreOriginalButtons() {
        if(originalBuyButton) {
            originalBuyButton.style.display = 'block';
            originalBuyButton.disabled = false;
            originalBuyButton.textContent = 'Acquista con PayPal';
        }
        if(originalMpButton) {
             originalMpButton.style.display = 'block';
        }
         if(container) setTimeout(() => { container.style.display = 'none'; container.innerHTML = '';}, 3000);
    }

    try {
        if (typeof paypal === 'undefined' || !paypal.Buttons) {
            throw new Error("SDK PayPal non caricato correttamente.");
        }
        paypal.Buttons({
            createOrder: function(data, actions) {
                return orderID;
            },
            onApprove: function(data, actions) {
                console.log('PayPal SDK: onApprove - Dati:', data);
                container.innerHTML = '<p style="color:green; font-weight:bold;">Pagamento approvato! ✅<br>Accesso al contenuto in corso...</p>';
                setTimeout(() => {
                    console.log("Tentativo di ricaricare le lezioni dopo approvazione...");
                     if (typeof loadVideoLessons === 'function') {
                        loadVideoLessons();
                    }
                }, 4000);
            },
            onError: function(err) {
                console.error('PayPal SDK: onError - Errore:', err);
                container.innerHTML = `<p style="color:red;">Errore durante il pagamento PayPal. Riprova o contatta l'assistenza.</p>`;
                restoreOriginalButtons();
            },
            onCancel: function (data) {
                console.log('PayPal SDK: onCancel - Pagamento annullato dall\'utente:', data);
                container.innerHTML = `<p>Pagamento annullato.</p>`;
                restoreOriginalButtons();
            }
        }).render(`#${containerId}`);
        console.log(`PayPal Buttons rendering initialized for container #${containerId}`);
    } catch (sdkError) {
        console.error("Errore durante l'inizializzazione o rendering dei bottoni PayPal SDK:", sdkError);
        container.innerHTML = `<p style="color:red;">Errore nell'inizializzazione del pagamento PayPal.</p>`;
        restoreOriginalButtons();
    }
}







////////////////////////////////funzione bizum///////////////////////////



///////////////funzione di Bizum che integra il reindirizzamento alla pagina per il form///////////////////////////

// Funzione per Bizum che registra e mostra le opzioni (WhatsApp e Form)
async function handleBizumPurchase(options) {
    if (!currentUser) {
        closeModal('individual-booking-modal');
        closeModal('group-booking-modal');
        const currentLang = localStorage.getItem('preferredLanguage') || 'es';
        const alertMessage = languages[currentLang]?.loginToPurchase || languages['es'].loginToPurchase;
        showAlert(alertMessage);
        return;
    }

    const modal = document.querySelector('.auth-modal[style*="display: flex"]');
    const paymentContainer = modal.querySelector('.payment-options-container');
    if (!paymentContainer) return;

    const priceText = modal.querySelector('.current-price').textContent.replace('€', '').replace(',', '.');
    const finalPrice = parseFloat(priceText);
    const serviceName = modal.querySelector('#modal-booking-info strong')?.textContent || options.productCode;

    const currentLang = localStorage.getItem('preferredLanguage') || 'es';
    const t = languages[currentLang] || languages['es'];

    // --- 1. REGISTRAZIONE IMMEDIATA IN BACKGROUND ---
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            fetch('/.netlify/functions/record-manual-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}` },
                body: JSON.stringify({
                    productCode: options.productCode,
                    amount: finalPrice,
                    currency: 'EUR',
                    paymentProvider: 'bizum'
                })
            });
        }
    } catch (error) {
        console.error("Errore durante la registrazione Bizum in background:", error);
    }

    // --- 2. AGGIORNA L'INTERFACCIA DEL MODALE ---
    const whatsappMessage = t.whatsappMessageFisio || "Ciao Maria, vorrei prenotare una sessione di Fisioterapia.";
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

    // Determina se mostrare il pulsante del form
    const isFisio = options.productCode.startsWith('FISIO');
    const formLink = GOOGLE_FORM_LINKS[currentLang] || GOOGLE_FORM_LINKS.es;
    const formButtonHTML = isFisio ? 
        `<a href="${formLink}" target="_blank" class="cta-button" style="width:100%; text-align:center; display:block;">${t.bizumFormButton}</a>` : '';

    paymentContainer.innerHTML = `
		<span class="close-button" onclick="closeModal('individual-booking-modal'); closeModal('group-booking-modal');">&times;</span>
        <h4 style="text-align:center; margin-top:0;">${t.bizumTitle}</h4>
        <p style="font-size: 0.9em; text-align:center;">${t.bizumInstructions}</p>
        <div style="background-color: #f2eee9; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <div style="display:flex; justify-content: space-between; font-size: 1.1em;">
                <span>${t.bizumAmount}</span>
                <strong>€${finalPrice.toFixed(2)}</strong>
            </div>
            <hr style="border:none; border-top: 1px solid #eae3da; margin: 10px 0;">
            <div style="display:flex; justify-content: space-between; font-size: 1.1em;">
                <span>${t.bizumPhoneNumber}</span>
                <strong>${CONTACT_INFO.phone}</strong>
            </div>
        </div>
        <div class="steps" style="display:flex; flex-direction:column; gap:15px; margin-top:20px;">
            <a href="${whatsappUrl}" target="_blank" class="cta-button" style="width:100%; text-align:center; display:block;">${t.bizumWhatsappButton}</a>
            ${formButtonHTML}
        </div>
    `;
}



////////////////fine funzione Bizum per Form/////////////////////////////////////////


// NUOVA FUNZIONE PER GESTIRE BIZUM CON CONFERMA WHATSAPP
// Funzione per Bizum che reindirizza a WhatsApp per finalizzare
//function handleBizumPurchase(options) {
//    // Blocco di controllo utente non loggato - VERSIONE DEFINITIVA
//	if (!currentUser) {
//		// 1. Chiudiamo i modali di pagamento aperti
//		closeModal('individual-booking-modal');
//		closeModal('group-booking-modal');
//	
//		// 2. Prendiamo il messaggio tradotto
//		const currentLang = localStorage.getItem('preferredLanguage') || 'es';
//		const alertMessage = languages[currentLang]?.loginToPurchase || languages['es'].loginToPurchase;
//	
//		// 3. Mostriamo il nostro avviso personalizzato INVECE di alert()
//		showAlert(alertMessage);
//	
//		return; // Interrompe la funzione di pagamento
//	}
//
//    const modal = document.querySelector('.auth-modal[style*="display: flex"]');
//    const paymentContainer = modal.querySelector('.payment-options-container');
//    if (!paymentContainer) return;
//
//    // --- 1. Raccogli i dati necessari ---
//    const priceText = modal.querySelector('.current-price').textContent.replace('€', '').replace(',', '.');
//    const finalPrice = parseFloat(priceText);
//    
//	let serviceName;
//	if (modal.id === 'individual-booking-modal') {
//		// Per il modale individuale, leggiamo il nome già presente
//		serviceName = modal.querySelector('#modal-booking-info strong')?.textContent;
//	} else {
//		// Per il modale di gruppo, troviamo la "card" originale sulla pagina usando il productCode
//		const planCard = document.querySelector(`.plan[data-product-code="${options.productCode}"]`);
//		if (planCard) {
//			serviceName = planCard.querySelector('h3')?.textContent;
//		}
//	}
//	// Se per qualche motivo il nome non viene trovato, usa il productCode come ultima risorsa
//	serviceName = serviceName || options.productCode;
//	
//	
//
//    const currentLang = localStorage.getItem('preferredLanguage') || 'it';
//    const t = languages[currentLang] || languages['it'];
//
//    // --- 2. Prepara il messaggio e il link WhatsApp ---
//    let whatsappText = t.whatsappMessage || "Ciao Maria, ho prenotato il servizio [SERVICE_NAME]";
//    const placeholder = currentLang === 'es' ? '[NOMBRE_DEL_SERVICIO]' : '[SERVICE_NAME]';
//    whatsappText = whatsappText.replace(placeholder, serviceName);
//    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(whatsappText)}`;
//
//    // --- 3. Aggiorna l'interfaccia del modale con il nuovo testo e pulsante ---
//    paymentContainer.innerHTML = `
//        <p style="font-size: 0.95em; text-align:center; padding: 10px 0;">${t.bizumInfoText}</p>
//        <a href="${whatsappUrl}" target="_blank" id="whatsapp-confirm-button" class="cta-button" style="width:100%; margin-top:15px; text-align:center; display:block;">
//            ${t.bizumProceedButton}
//        </a>
//    `;
//
//    // --- 4. Aggiungi l'azione di salvataggio al click ---
//    document.getElementById('whatsapp-confirm-button').addEventListener('click', async () => {
//        try {
//            const { data: { session } } = await supabase.auth.getSession();
//            if (!session) return; // Non bloccare l'utente se la sessione non è pronta
//
//            // Chiama la funzione backend per registrare il pagamento come "pending"
//            fetch('/.netlify/functions/record-manual-payment', {
//                method: 'POST',
//                headers: {
//                    'Content-Type': 'application/json',
//                    'Authorization': `Bearer ${session.access_token}`
//                },
//                body: JSON.stringify({
//                    productCode: options.productCode,
//                    amount: finalPrice,
//                    currency: 'EUR',
//                    paymentProvider: 'bizum'
//                })
//            });
//
//            // Chiudi il modale dopo un breve ritardo per dare tempo a WhatsApp di aprirsi
//            setTimeout(() => {
//                closeModal('individual-booking-modal');
//                closeModal('group-booking-modal');
//            }, 1000);
//
//        } catch (error) {
//            console.error("Errore durante la registrazione del pagamento Bizum:", error);
//            // Non mostriamo un alert all'utente per non interrompere il reindirizzamento a WhatsApp
//        }
//    });
//}
//
///////////////////////////////fine funzione Bizum///////////////////////////






////////////////////////////////funzione MercadoPago///////////////////////////

// Funzione per avviare il pagamento con Mercado Pago
async function handleMercadoPagoPurchase(options) {
    // Blocco di controllo utente non loggato - VERSIONE DEFINITIVA
	if (!currentUser) {
		// 1. Chiudiamo i modali di pagamento aperti
		closeModal('individual-booking-modal');
		closeModal('group-booking-modal');
	
		// 2. Prendiamo il messaggio tradotto
		const currentLang = localStorage.getItem('preferredLanguage') || 'es';
		const alertMessage = languages[currentLang]?.loginToPurchase || languages['es'].loginToPurchase;
	
		// 3. Mostriamo il nostro avviso personalizzato INVECE di alert()
		showAlert(alertMessage);
	
		return; // Interrompe la funzione di pagamento
	}

    const modal = document.querySelector('.auth-modal[style*="display: flex"]');
    const button = modal.querySelector('.payment-button.mercadopago');
    button.disabled = true;
    button.innerHTML += ' <span>(Inizializzazione...)</span>';
	const currentLang = localStorage.getItem('preferredLanguage') || 'it';
	options.lang = currentLang;

    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error("Sessione utente non trovata.");

        const response = await fetch('/.netlify/functions/create-mercadopago-preference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`
            },
            body: JSON.stringify(options)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Errore nella creazione della preferenza di pagamento.');
        }

        const data = await response.json();
        // Reindirizza l'utente alla pagina di checkout di Mercado Pago
        window.location.href = data.init_point;

    } catch (error) {
        alert(`Si è verificato un errore: ${error.message}`);
        button.disabled = false;
        button.querySelector('span').textContent = 'Mercado Pago';
    }
}


///////////////////////////////fine funzione MercadoPago////////////////////////



//////////////////////////////VIDEO CONTENTS///////////////////////////////////



// ===================================================================
// --- NUOVE FUNZIONI PER LA PAGINA CONTENUTI (VIDEO DINAMICI) ---
// ===================================================================

// Funzione per creare e aprire il modale del video
// Sostituisci la vecchia funzione openVideoModal con questa
function openVideoModal(videoUrl) {
    // Rimuovi eventuali modali rimasti aperti per errore
    const existingModal = document.getElementById('video-modal');
    if (existingModal) existingModal.remove();

    let videoId = null;
    try {
        const url = new URL(videoUrl);
        videoId = url.hostname.includes('youtube.com') ? url.searchParams.get('v') : url.pathname.slice(1);
    } catch (e) {
        console.error("URL del video non valido:", videoUrl);
        return;
    }

    if (!videoId) {
        alert("Impossibile trovare l'ID del video di YouTube.");
        return;
    }

    const modalHTML = `
        <div id="video-modal" class="auth-modal" style="display:flex; align-items:center; justify-content:center;">
            <div class="modal-content" style="max-width: 900px; width: 90%; padding: 0; background-color: black; border-radius: 8px; overflow: hidden;">
                <span id="close-video-button" class="close-button" style="color: white; top: 0px; right: 15px; font-size: 40px; z-index: 10;">&times;</span>
                <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                    <iframe 
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                    </iframe>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Aggiungi un listener per la chiusura più robusto
    document.getElementById('close-video-button').addEventListener('click', () => {
        const modal = document.getElementById('video-modal');
        if (modal) modal.remove();
    });

    // Bonus: chiudi anche cliccando sullo sfondo scuro
    document.getElementById('video-modal').addEventListener('click', (event) => {
        if (event.target.id === 'video-modal') {
             const modal = document.getElementById('video-modal');
             if (modal) modal.remove();
        }
    });
}


// Funzione principale per caricare e mostrare i video
async function loadAndDisplayVideos() {
    const yogaGrid = document.getElementById('yoga-videos-grid');
    const fisioGrid = document.getElementById('fisio-videos-grid');
    if (!yogaGrid || !fisioGrid) return;

    try {
        const response = await fetch('/.netlify/functions/get-video-content');
        if (!response.ok) throw new Error('Errore di rete nel recupero dei video.');
        
        const videos = await response.json();

        // Pulisci i contenitori
        yogaGrid.innerHTML = '';
        fisioGrid.innerHTML = '';
        
        const currentLang = localStorage.getItem('preferredLanguage') || 'it';

        videos.forEach(video => {
            // Seleziona titolo e descrizione in base alla lingua
            let title = video.name;
            let description = video.description;
            if (currentLang === 'en' && video.name_en) title = video.name_en;
            if (currentLang === 'es' && video.name_es) title = video.name_es;
            if (currentLang === 'en' && video.description_en) description = video.description_en;
            if (currentLang === 'es' && video.description_es) description = video.description_es;

            // Crea l'HTML per la card del video
            const videoCardHTML = `
                <div class="content-item" data-video-url="${video.video_url}" style="cursor: pointer;">
                    <div class="content-thumbnail">
                        <img src="https://img.youtube.com/vi/${new URL(video.video_url).searchParams.get('v')}/maxresdefault.jpg" alt="Anteprima per ${title}">
                    </div>
                    <div class="content-text">
                        <h3 class="content-title">${title}</h3>
                        <p class="content-description">${description || ''}</p>
                    </div>
                </div>
            `;

            // Aggiungi la card alla griglia corretta
            if (video.category === 'yoga') {
                yogaGrid.innerHTML += videoCardHTML;
            } else if (video.category === 'fisioterapia') {
                fisioGrid.innerHTML += videoCardHTML;
            }
        });

        // Aggiungi gli event listener a tutte le card create
        document.querySelectorAll('.content-item[data-video-url]').forEach(card => {
            card.addEventListener('click', () => {
                openVideoModal(card.dataset.videoUrl);
            });
        });

    } catch (error) {
        console.error("Errore nel caricamento dei video:", error);
        yogaGrid.innerHTML = `<p>Impossibile caricare i contenuti. Riprova più tardi.</p>`;
        fisioGrid.innerHTML = '';
    }
}





///////////////////////////FINE VIDEO CONTENTS////////////////////////////////




// -----------------------------------------------------------
//               LISTENER PRINCIPALE E INIZIALIZZAZIONE
// -----------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
	
	console.log("DEBUG: DOM Caricato. Esecuzione script avviata.");

    document.querySelectorAll('.location-selector').forEach(selector => {
        const planCard = selector.closest('.plan');
        if (!planCard) return;

        const priceEl = planCard.querySelector('.current-price');
        const originalPriceEl = planCard.querySelector('.original-price');
        const radios = selector.querySelectorAll('input[type="radio"]');

        function updatePrice() {
            const selectedRadio = selector.querySelector('input[type="radio"]:checked');
            if (!selectedRadio) return;

            const selectedValue = selectedRadio.value;
            const capitalizedValue = selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1);

            const price = selector.dataset[`price${capitalizedValue}`];
            const originalPrice = selector.dataset[`originalPrice${capitalizedValue}`];
            
            const lang = localStorage.getItem('preferredLanguage') || 'it';
            const translations = languages[lang] || languages['it'];

            if (price) {
                priceEl.textContent = `€${price}`;
            } else {
                priceEl.textContent = 'N/D';
            }
            
            if (originalPriceEl) {
                if (originalPrice) {
                    const insteadOfText = translations.insteadOf || "Invece di";
                    originalPriceEl.innerHTML = `${insteadOfText} <s>€${originalPrice}</s>`;
                    originalPriceEl.style.display = 'block';
                } else {
                    originalPriceEl.style.display = 'none';
                }
            }
        }

        radios.forEach(radio => {
            radio.addEventListener('change', updatePrice);
        });

        updatePrice();
    });

    const savedLang = localStorage.getItem('preferredLanguage');
    const defaultLang = 'es';
    let initialLang = defaultLang;
    if (typeof languages !== 'undefined') {
        if (savedLang && languages[savedLang]){
            initialLang = savedLang;
        }
    } else {
         console.error("L'oggetto 'languages' non è definito.");
    }
    if (typeof changeLanguage === 'function') {
        changeLanguage(initialLang);
    } else {
         console.error("La funzione 'changeLanguage' non è definita.");
    }
    const langButtons = document.querySelectorAll('.language-switcher button');
    langButtons.forEach(button => {
        if (!button.hasAttribute('data-listener-set')) {
            let langCode = '';
            if (button.hasAttribute('onclick')) {
                const match = button.getAttribute('onclick').match(/changeLanguage\('(\w+)'\)/);
                if (match) langCode = match[1];
                 button.removeAttribute('onclick');
            } else if (button.dataset.lang) {
                langCode = button.dataset.lang;
            }
            if(langCode) {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    if (typeof changeLanguage === 'function') {
                        changeLanguage(langCode);
                    } else {
                         console.error("La funzione 'changeLanguage' non è definita.");
                    }
                });
                button.setAttribute('data-listener-set', 'true');
            } else {
                 console.warn("Bottone lingua senza codice lingua identificabile:", button);
            }
        }
    });
	
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    const logoutButton = document.getElementById('logout-button');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginErrorP = document.getElementById('login-error');
    const signupErrorP = document.getElementById('signup-error');
    const signupMessageP = document.getElementById('signup-message');

    loginButton?.addEventListener('click', () => openModal('login-modal'));
    signupButton?.addEventListener('click', () => openModal('signup-modal'));
    logoutButton?.addEventListener('click', async () => {
        if (!supabase) return;
        logoutButton.disabled = true;
        logoutButton.textContent = 'Uscendo...';
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error logging out:", error);
            alert(`Errore durante il logout: ${error.message}`);
            logoutButton.disabled = false;
            logoutButton.textContent = 'Logout';
        } else {
            console.log("User logged out successfully.");
        }
    });

    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!supabase) return;
        if(loginErrorP) loginErrorP.textContent = '';
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const submitButton = loginForm.querySelector('button[type="submit"]');
        if(submitButton) submitButton.disabled = true;
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            console.error("Login error:", error);
            if(loginErrorP) loginErrorP.textContent = `Credenziali non valide. Riprova.`;
            if(submitButton) submitButton.disabled = false;
        } else {
            console.log("Login successful:", data.user.email);
            closeModal('login-modal');
        }
    });

    signupForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!supabase) return;
        if(signupErrorP) signupErrorP.textContent = '';
        if(signupMessageP) signupMessageP.textContent = '';
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const submitButton = signupForm.querySelector('button[type="submit"]');
         if(submitButton) submitButton.disabled = true;
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            console.error("Signup error:", error);
             if(signupErrorP) signupErrorP.textContent = `Errore Registrazione: ${error.message}`;
             if(submitButton) submitButton.disabled = false;
        } else {
            console.log("Signup request successful:", data);
             if(submitButton) submitButton.disabled = false;
             if (data.user && !data.session) {
                 if(signupMessageP) signupMessageP.textContent = 'Registrazione avvenuta! Controlla la tua email per confermare l\'account.';
             } else if (data.user && data.session){
                 if(signupMessageP) signupMessageP.textContent = 'Registrazione e login avvenuti con successo!';
                  setTimeout(() => closeModal('signup-modal'), 2000);
             } else {
                 if(signupMessageP) signupMessageP.textContent = 'Richiesta di registrazione inviata.';
             }
        }
    });

    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        if (typeof handleReviewSubmit === 'function') {
            reviewForm.addEventListener('submit', handleReviewSubmit);
        } else {
            console.error("Funzione handleReviewSubmit non definita.");
        }
    }

    if (typeof checkInitialAuthState === 'function') {
        checkInitialAuthState();
    } else {
        console.error("Funzione checkInitialAuthState non definita.");
        if(typeof updateAuthStateUI === 'function') {
            updateAuthStateUI(null);
        }
        if(typeof initializePageBasedOnAuthState === 'function') {
            initializePageBasedOnAuthState(null);
        }
    }

    if (document.getElementById('reviews-list-container')) {
        if (typeof loadReviews === 'function') {
            loadReviews();
        } else {
             console.error("Funzione loadReviews non definita.");
        }
    }
	
	
	
	///////////////////////////////////google form///////////////////////////
	
	
	// Logica per la pagina di ringraziamento della Fisioterapia
	const googleFormLink = document.getElementById('google-form-link');
	if (googleFormLink) { // Esegui questo codice solo se siamo nella pagina grazie-fisio.html
		const currentLang = localStorage.getItem('preferredLanguage') || 'es';
	
		// Imposta il link corretto per il Google Form in base alla lingua
		googleFormLink.href = GOOGLE_FORM_LINKS[currentLang] || GOOGLE_FORM_LINKS.es;
	
		// Imposta il link corretto per WhatsApp con il messaggio pre-compilato
		const whatsappLink = document.getElementById('whatsapp-link');
		if (whatsappLink) {
			const whatsappMessage = languages[currentLang]?.whatsappMessageFisio || "Ciao Maria, ho pagato per una sessione di Fisioterapia e compilato il modulo. Vorrei fissare l'appuntamento.";
			whatsappLink.href = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
		}
	}
	
	
	////////////////////////////////fine google form/////////////////////////////////
	
	
	/////////////////////////////PER I VIDEO CONTENTS////////////////////////////////
	
	// Avvia il caricamento dei video solo se siamo nella pagina dei contenuti
	if (document.getElementById('yoga-videos-grid')) {
		loadAndDisplayVideos();
	}
	//////////////////////////FINE VIDEO CONTENTS/////////////////////////////
	
	
	
	// ===================================================================
// ============= LOGICA PER CARICARE I PACCHETTI VIDEO =============
// ===================================================================

// Controlla se siamo sulla pagina dei contenuti per eseguire questa logica
if (document.getElementById('packages-container')) {

    // --- VARIABILI E COSTANTI INIZIALI ---
    const productCodes = ['PK_YOGA_01', 'PK_YOGA_02', 'PK_YOGA_03', 'PK_YOGA_04'];
    const packagesContainer = document.getElementById('packages-container');
    const modal = document.getElementById('package-modal');
    const closeModalButton = document.getElementById('close-package-modal');
    const WHATSAPP_NUMBER = '5492983567655';
    let packagesData = [];

    // --- DETTAGLI STATICI DEI PACCHETTI ---
    const packageDetails = {
        'PK_YOGA_01': { titleKey: 'package1Title', descKey: 'package1Desc', image: 'images/package-yoga-mobility.jpg', driveLink: 'https://drive.google.com/drive/folders/1T9h6fXci7UMMmKqdrQw7o7PnOQmwQKdc?usp=sharing' },
        'PK_YOGA_02': { titleKey: 'package2Title', descKey: 'package2Desc', image: 'images/package-yoga-basics.jpg', driveLink: 'https://drive.google.com/drive/folders/1mrVU_D5dvCO1x_lJNG8bwr-WbvfllYnj?usp=sharing' },
        'PK_YOGA_03': { titleKey: 'package3Title', descKey: 'package3Desc', image: 'images/package-home-workout.jpg', driveLink: 'https://drive.google.com/drive/folders/10TBwm11l3XN3C28reEkS95Wlro65HW3i?usp=sharing' },
        'PK_YOGA_04': { titleKey: 'package4Title', descKey: 'package4Desc', image: 'images/package-yoga-immersion.jpg', driveLink: 'https://drive.google.com/drive/folders/1_NcYRNsSk6Sj0IW6YyxAecRa8qp6ude0?usp=sharing' }
    };

    // --- FUNZIONE ROBUSTA PER PAYPAL (CON AUTENTICAZIONE E ATTESA SDK) ---
    const setupPayPalButton = (containerId, productCode) => {
        const maxTries = 15; let currentTry = 0;
        const interval = setInterval(async () => {
            if (typeof paypal !== 'undefined' && typeof getSupabaseToken === 'function') {
                clearInterval(interval);
                try {
                    const token = await getSupabaseToken();
                    if (!token) return;

                    paypal.Buttons({
                        createOrder: async () => {
                            if (!productCode) throw new Error("productCode PayPal mancante.");
                            const response = await fetch('/.netlify/functions/create-paypal-order', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                                body: JSON.stringify({ product_code: productCode })
                            });
                            const data = await response.json();
                            if (!response.ok) throw new Error(data.error || 'Errore server PayPal');
                            return data.orderId;
                        },
                        onApprove: async (data) => {
                            const captureToken = await getSupabaseToken();
                            const response = await fetch('/.netlify/functions/capture-paypal-order', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${captureToken}` },
                                body: JSON.stringify({ orderId: data.orderID, product_code: productCode })
                            });
                            const details = await response.json();
                            if (!response.ok) throw new Error(details.error || 'Errore cattura pagamento');
                            
                            alert('Pagamento completato con successo! Riceverai accesso a breve.');
                            closePackageModal();
                        },
                        onError: (err) => {
                             console.error("Errore SDK PayPal:", err);
                             document.getElementById(containerId).innerHTML = `<p class="error-message">Errore durante il pagamento con PayPal.</p>`;
                        }
                    }).render('#' + containerId);
                } catch (error) {
                    console.error("Errore durante il setup di PayPal:", error);
                    document.getElementById(containerId).innerHTML = `<p class="error-message">${error.message}</p>`;
                }
            } else if (currentTry++ >= maxTries) {
                clearInterval(interval);
                console.error("L'SDK di PayPal o getSupabaseToken non sono stati caricati in tempo.");
            }
        }, 200);
    };

    // --- FUNZIONE ROBUSTA PER MERCADOPAGO (CON AUTENTICAZIONE E ATTESA SDK) ---
    const setupMercadoPagoButton = (containerId, productCode, title) => {
        const maxTries = 15; let currentTry = 0;
        const interval = setInterval(async () => {
            if (typeof MercadoPago !== 'undefined' && typeof getSupabaseToken === 'function') {
                clearInterval(interval);
                try {
                    const token = await getSupabaseToken();
                    if (!token) return;
                    
                    if (!productCode) throw new Error("productCode MercadoPago mancante.");
                    const response = await fetch('/.netlify/functions/create-mercadopago-preference', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                        body: JSON.stringify({ product_code: productCode, title: title })
                    });
                    const preference = await response.json();
                    if (!response.ok) throw new Error(preference.error || `Errore dal server: ${response.statusText}`);
                    
                    const mp = new MercadoPago(preference.publicKey);
                    mp.bricks().create("wallet", containerId, {
                        initialization: { preferenceId: preference.preferenceId },
                        customization: { texts: { valueProp: 'smart_option' } }
                    });
                } catch (error) {
                    console.error("Errore nella creazione della preferenza MercadoPago:", error);
                    document.getElementById(containerId).innerHTML = `<p class="error-message">${error.message}</p>`;
                }
            } else if (currentTry++ >= maxTries) {
                clearInterval(interval);
                console.error("L'SDK di MercadoPago o getSupabaseToken non sono stati caricati in tempo.");
            }
        }, 200);
    };

    // --- FUNZIONE PER POPOLARE LE CARD (invariata) ---
    const populatePackageCards = (packages) => {
        if (!packagesContainer) return;
        packagesContainer.innerHTML = '';
        const sortedPackages = productCodes.map(code => packages.find(p => p.product_code === code));
        sortedPackages.forEach(pkg => {
            if (!pkg) return;
            const details = packageDetails[pkg.product_code];
            const card = document.createElement('div');
            card.className = 'package-card';
            card.innerHTML = `
                <img src="${details.image}" alt="Immagine Pacchetto" class="package-image" style="object-fit: cover;">
                <div class="package-content">
                    <h3 class="package-title" data-translate-key="${details.titleKey}">[Caricamento...]</h3>
                    <p class="package-description" data-translate-key="${details.descKey}">[Caricamento...]</p>
                    <div class="package-price">
                        <span class="price-eur">€${pkg.price_eur}</span>
                    </div>
                    <button class="cta-button package-button" data-product-code="${pkg.product_code}">
                        <span data-translate-key="packageDiscoverButton">Scopri di più</span>
                    </button>
                </div>
            `;
            packagesContainer.appendChild(card);
        });
        setTimeout(() => {
            updateUITexts(currentLanguage);
        }, 0);
    };

    // --- FUNZIONI PER GESTIRE IL MODAL (corretta e pulita) ---
    const openPackageModal = (productCode) => {
        const selectedPackage = packagesData.find(p => p.product_code === productCode);
        if (!selectedPackage || !productCode) {
            console.error("Dati del pacchetto o productCode non validi.");
            return;
        }

        const details = packageDetails[productCode];
        const paymentButtonsContainer = document.getElementById('modal-payment-buttons');
        paymentButtonsContainer.innerHTML = '';

        const packageTitleText = languages[currentLanguage][details.titleKey] || details.titleKey;
        
        document.getElementById('modal-title').setAttribute('data-translate-key', details.titleKey);
        document.getElementById('modal-description').setAttribute('data-translate-key', details.descKey);
        document.getElementById('modal-drive-link').href = details.driveLink;
        
        if (currentUser) {
            const payPalContainer = document.createElement('div');
            payPalContainer.id = `paypal-button-container-${productCode}`;
            paymentButtonsContainer.appendChild(payPalContainer);

            const mpPriceLabel = document.createElement('p');
            mpPriceLabel.style.textAlign = 'center';
            mpPriceLabel.innerHTML = `o paga in Pesos Argentini (<strong style="color: #009ee3;">ARS $${selectedPackage.price_ars}</strong>) con`;
            const mercadoPagoContainer = document.createElement('div');
            mercadoPagoContainer.id = `mercadopago-container-${productCode}`;
            paymentButtonsContainer.appendChild(mpPriceLabel);
            paymentButtonsContainer.appendChild(mercadoPagoContainer);

            const bizumDescription = document.createElement('p');
            bizumDescription.style.textAlign = 'center';
            const bizumMessage = encodeURIComponent(`Ciao Maria, vorrei acquistare il pacchetto "${packageTitleText}" tramite Bizum.`);
            bizumDescription.innerHTML = `o <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${bizumMessage}" target="_blank">paga con Bizum via WhatsApp</a>`;
            paymentButtonsContainer.appendChild(bizumDescription);

            setupPayPalButton(payPalContainer.id, productCode);
            setupMercadoPagoButton(mercadoPagoContainer.id, productCode, packageTitleText);
        } else {
            paymentButtonsContainer.innerHTML = `<p class="error-message" data-translate-key="loginToBuy">Per procedere con l'acquisto, effettua il login o registrati.</p>`;
        }
        
        modal.style.display = 'flex';
        updateUITexts(currentLanguage);
    };

    const closePackageModal = () => {
        modal.style.display = 'none';
    };

    const fetchPackages = async () => {
        try {
            const { data, error } = await supabase.from('services').select('*').in('product_code', productCodes);
            if (error) throw error;
            packagesData = data;
            populatePackageCards(data);
        } catch (err) {
            console.error('Errore imprevisto durante il fetch dei pacchetti:', err);
        }
    };

    packagesContainer.addEventListener('click', (event) => {
        const button = event.target.closest('.package-button');
        if (button) {
            openPackageModal(button.dataset.productCode);
        }
    });
    closeModalButton.addEventListener('click', closePackageModal);

    fetchPackages();
}

// ===================================================================
// ============= FINE LOGICA CARICAMENTO PACCHETTI =============
// ===================================================================

	
	
	
	
	
    const hamburgerButton = document.getElementById('hamburger-menu');
    const mainNav = document.getElementById('main-nav');

    if (hamburgerButton && mainNav) {
        mainNav.classList.remove('menu-aperto');
        hamburgerButton.classList.remove('attivo');
        hamburgerButton.setAttribute('aria-expanded', 'false');
        hamburgerButton.setAttribute('aria-label', 'Apri menu');

        hamburgerButton.addEventListener('click', () => {
            mainNav.classList.toggle('menu-aperto');
            hamburgerButton.classList.toggle('attivo');
            const isExpanded = mainNav.classList.contains('menu-aperto');
            hamburgerButton.setAttribute('aria-expanded', isExpanded.toString());
            hamburgerButton.setAttribute('aria-label', isExpanded ? 'Chiudi menu' : 'Apri menu');
        });

        function closeMobileMenu() {
            if (mainNav.classList.contains('menu-aperto')) {
                mainNav.classList.remove('menu-aperto');
                hamburgerButton.classList.remove('attivo');
                hamburgerButton.setAttribute('aria-expanded', 'false');
                hamburgerButton.setAttribute('aria-label', 'Apri menu');
            }
        }

        const navLinks = mainNav.querySelectorAll('ul > li > a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        const langButtonsInMobileMenu = mainNav.querySelectorAll('.language-switcher button');
        langButtonsInMobileMenu.forEach(button => {
            button.addEventListener('click', closeMobileMenu);
        });
        
        const authButtonsInMobileMenu = mainNav.querySelectorAll('#auth-container button');
        authButtonsInMobileMenu.forEach(button => {
            button.addEventListener('click', closeMobileMenu);
        });
    }

    const allGroupBookingButtons = document.querySelectorAll('.open-group-booking-modal');
    const groupBookingModal = document.getElementById('group-booking-modal');

    if (allGroupBookingButtons.length > 0 && groupBookingModal) {
        
        const participantsInput = groupBookingModal.querySelector('#modal-participants-input');
        const calculatedPriceEl = groupBookingModal.querySelector('#modal-calculated-price');
        const errorMessageEl = groupBookingModal.querySelector('#modal-participant-error');
        const paymentOptionsContainer = groupBookingModal.querySelector('#modal-payment-options');

        let currentCardData = {};

        const updateGroupPrice = () => {
            const numParticipants = parseInt(participantsInput.value, 10);
            const currentLang = localStorage.getItem('preferredLanguage') || 'it';
            const errorMessages = {
                it: `Il numero minimo è ${currentCardData.minParticipants} partecipanti.`,
                en: `The minimum is ${currentCardData.minParticipants} participants.`,
                es: `El número mínimo es de ${currentCardData.minParticipants} participantes.`
            };

            if (isNaN(numParticipants) || numParticipants < currentCardData.minParticipants) {
                errorMessageEl.textContent = errorMessages[currentLang] || errorMessages['it'];
                errorMessageEl.style.display = 'block';
                calculatedPriceEl.textContent = '-';
                paymentOptionsContainer.style.visibility = 'hidden';
            } else {
                errorMessageEl.style.display = 'none';
                const totalPrice = numParticipants * currentCardData.pricePerPerson;
                const formattedPrice = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(totalPrice);
                calculatedPriceEl.textContent = formattedPrice;
                paymentOptionsContainer.style.visibility = 'visible';
            }
        };

        allGroupBookingButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const planCard = event.target.closest('.plan');
                currentCardData = {
                    productCode: planCard.dataset.productCode,
                    pricePerPerson: parseFloat(planCard.dataset.pricePerPerson),
                    minParticipants: parseInt(planCard.dataset.minParticipants, 10)
                };

                participantsInput.value = currentCardData.minParticipants;
                participantsInput.min = currentCardData.minParticipants;
                
                if (typeof populatePaymentButtons === 'function') {
                    populatePaymentButtons(currentCardData.productCode, 'modal-payment-options');
                }
                
                updateGroupPrice();
                openModal('group-booking-modal');
            });
        });
        participantsInput.addEventListener('input', updateGroupPrice);
    }

    // --- LOGICA PER PRENOTAZIONE INDIVIDUALE ---
    const allIndividualBookingButtons = document.querySelectorAll('.open-individual-booking-modal');
    const individualBookingModal = document.getElementById('individual-booking-modal');

    if (allIndividualBookingButtons.length > 0 && individualBookingModal) {
        allIndividualBookingButtons.forEach(button => {
            button.addEventListener('click', (event) => {
				const planCard = event.target.closest('.plan');
				if (!planCard) return;
			
				// --- INIZIO DELLA CORREZIONE ---
				// 1. Definiamo le traduzioni QUI, all'inizio della funzione.
				const currentLang = localStorage.getItem('preferredLanguage') || 'it';
				const translations = languages[currentLang] || languages['it'];
			
				// 2. ORA possiamo usare 'translations' per ottenere il nome del servizio.
				const serviceName = planCard.querySelector('h3').textContent;
				// --- FINE DELLA CORREZIONE ---
			
				const productCode = planCard.querySelector('.location-selector')?.dataset.productCode || event.target.dataset.productCode;
				let servicePriceText = '';
			
				const locationSelector = planCard.querySelector('.location-selector');
				if (locationSelector) {
					const selectedLocationRadio = locationSelector.querySelector('input[type="radio"]:checked');
					if(selectedLocationRadio) {
						const locationValue = selectedLocationRadio.value;
						const priceKey = `price${locationValue.charAt(0).toUpperCase() + locationValue.slice(1)}`;
						const price = locationSelector.dataset[priceKey];
						servicePriceText = `€${price}`;
					} else {
						servicePriceText = 'Prezzo non definito';
					}
				} else {
					const priceElement = planCard.querySelector('.current-price');
					servicePriceText = priceElement ? priceElement.textContent : 'N/D';
				}
			
				document.getElementById('modal-individual-service-price').textContent = servicePriceText;
			
				// Popola il titolo del modale (la variabile 'translations' esiste già)
				document.getElementById('modal-individual-title').textContent = translations.individualBookingTitle || "Dettagli Prenotazione";
			
				// Popola il paragrafo con il nome del servizio
				const bookingInfoParagraph = document.getElementById('modal-booking-info');
				if (bookingInfoParagraph) {
					const bookingForText = translations.bookingForText || "Stai prenotando:";
					bookingInfoParagraph.innerHTML = `${bookingForText} <strong>${serviceName}</strong>`;
				}
			
				const paymentContainer = document.getElementById('modal-individual-payment-options');
				if (typeof populatePaymentButtons === 'function' && productCode) {
					paymentContainer.innerHTML = ''; 
					populatePaymentButtons(productCode, 'modal-individual-payment-options');
				} else {
					paymentContainer.innerHTML = '<p>Opzioni di pagamento non disponibili.</p>';
				}
			
				openModal('individual-booking-modal');
			});
        });
    }


// --- Logica per il video di presentazione in homepage ---
// --- Logica per il video di presentazione in homepage (Versione Finale) ---
// Controlla se siamo sulla homepage
const presentationContainer = document.getElementById('presentation-video-container');
if (presentationContainer) {
    
    const videoPresentazioneURL = "https://www.youtube.com/watch?v=7orJ-qrnXnY";

    const getYoutubeId = (url) => {
        if (!url) return null;
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const videoId = getYoutubeId(videoPresentazioneURL);

    if (videoId) {
        // 1. Inserisce il video in modo permanente nella pagina (con autoplay e mute)
        presentationContainer.innerHTML = `
            <div class="video-embed-container" style="margin-top: 20px;">
                <iframe 
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                </iframe>
            </div>
        `;

        // 2. Controlla se è la prima visita per mostrare il pop-up
        const hasSeenPresentation = localStorage.getItem('hasSeenPresentationVideo');
        if (!hasSeenPresentation) {
            setTimeout(() => {
                openVideoModal(videoPresentazioneURL); 
                localStorage.setItem('hasSeenPresentationVideo', 'true');
            }, 2000);
        }
    }
}


}); // --- Chiusura di DOMContentLoaded ---

// --- Aggiungi qui le funzioni di pagamento (populatePaymentButtons, handlePayPalPurchase, renderPayPalButtons) ---
// ===================================================================
// --- FUNZIONI DI PAGAMENTO (FASE 2) ---
// ===================================================================

function populatePaymentButtons(productCode, containerId = 'modal-payment-options') {
    const paymentContainer = document.getElementById(containerId);
    if (!paymentContainer) return;

    const buttons = {
        paypal: { text: "PayPal", icon: `<svg viewBox="0 0 96 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.56 26.5h8.84L21.32 3.8H12.5L9.9 20.38c-.12 1.08-.2 1.8-.24 2.14H9.6c.32-1.2.6-2.4.84-3.64L12.56 0H3.32L0 26.5h7.56Z" fill="#253B80"/><path d="M43.32 26.5h7.56L47.56 3.8h-7.56l3.32 22.7Z" fill="#253B80"/><path d="M51.12 3.8h-6.76c-2.44 0-4.6.48-6.48 1.44-1.88.96-3.32 2.36-4.32 4.2-.92 1.76-1.4 3.8-1.4 6.12 0 2.92.56 5.36 1.68 7.32 1.12 2 2.76 3.48 4.92 4.44 2.16.96 4.72 1.44 7.68 1.44h2.52c.4 0 .68-.04.84-.12.16-.08.28-.2.36-.36l.2-.44.88-6.12h-5.4c-1.48 0-2.6-.28-3.36-.84-.8-.56-1.16-1.4-1.08-2.52.08-1.4.92-2.12 2.52-2.12h8.24l2.04-14.08Zm-5.32 16.56c-.48 1.32-1.2 1.96-2.16 1.96-1.2 0-2.12-.52-2.76-1.56-.64-1.04-.92-2.32-.84-3.84.08-1.8.6-3.2 1.56-4.2s2.24-1.56 3.84-1.56h4.48l-.84 5.92-3.28 3.08Z" fill="#179BD7"/><path d="M69.84 8.76c-1.4-1.12-3.16-1.68-5.28-1.68-1.4 0-2.6.28-3.6.84-.96.56-1.68 1.36-2.16 2.4-.48 1.04-.72 2.2-.72 3.48 0 1.8.64 3.2 1.92 4.2 1.28 1 2.96 1.48 5.04 1.48 1.4 0 2.8-.2 4.2-.64l.92.16c-1.36 2-3.24 3-5.64 3-2.12 0-3.92-.6-5.4-1.8-1.48-1.2-2.44-2.8-2.88-4.84-.44-2.12-.44-4.36 0-6.72.44-2.28 1.4-4.2 2.88-5.76 1.48-1.56 3.32-2.56 5.52-3s4.4-.64 6.6-.64c4.6 0 8.16 1.2 10.68 3.6Zm-1.84 6.8c.12-.92.04-1.8-.24-2.6-.28-.8-.72-1.48-1.32-2.04-.6-.56-1.32-.96-2.16-1.2-.84-.24-1.72-.36-2.64-.36-2.48 0-4.24.8-5.28 2.4s-1.56 3.56-1.56 5.88c0 .64.04 1.24.12 1.8.08.56.2 1.1.4 1.56.2.48.44.88.76 1.2.32.32.68.56 1.08.72.4.16.8.24 1.2.24 1.88 0 3.44-.64 4.68-1.92.4-.4.72-.88 1-1.44.24-.56.4-1.16.48-1.8Z" fill="#253B80"/><path d="M89.36 8.76c-1.4-1.12-3.16-1.68-5.28-1.68-1.4 0-2.6.28-3.6.84-.96.56-1.68 1.36-2.16 2.4-.48 1.04-.72 2.2-.72 3.48 0 1.8.64 3.2 1.92 4.2 1.28 1 2.96 1.48 5.04 1.48 1.4 0 2.8-.2 4.2-.64l.92.16c-1.36 2-3.24 3-5.64 3-2.12 0-3.92-.6-5.4-1.8-1.48-1.2-2.44-2.8-2.88-4.84-.44-2.12-.44-4.36 0-6.72.44-2.28 1.4-4.2 2.88-5.76C79.8 1.64 81.64.64 83.84.2S88.08 0 90.28 0c4.6 0 8.16 1.2 10.68 3.6Zm-1.84 6.8c.12-.92.04-1.8-.24-2.6-.28-.8-.72-1.48-1.32-2.04-.6-.56-1.32-.96-2.16-1.2-.84-.24-1.72-.36-2.64-.36-2.48 0-4.24.8-5.28 2.4s-1.56 3.56-1.56 5.88c0 .64.04 1.24.12 1.8.08.56.2 1.1.4 1.56.2.48.44.88.76 1.2.32.32.68.56 1.08.72.4.16.8.24 1.2.24 1.88 0 3.44-.64 4.68-1.92.4-.4.72-.88 1-1.44.24-.56.4-1.16.48-1.8Z" fill="#179BD7"/></svg>` },
        mercadopago: { text: "Mercado Pago", icon: `<svg viewBox="0 0 41 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M38.6 8.56a2.64 2.64 0 0 0-2.1-2.24L22.99 2.1a.44.44 0 0 0-.4 0L9.08 6.32a2.64 2.64 0 0 0-2.1 2.24L5.1 14.8a2.64 2.64 0 0 0 2.52 3.02h25.4a2.64 2.64 0 0 0 2.52-3.02l-1.92-6.24Z" fill="#00AEEF"/></svg>` },
        bizum: { text: "Bizum", icon: `<svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#FF7B00" d="M128 24a104 104 0 1 0 0 208 104 104 0 0 0 0-208Z"/><path fill="#fff" d="m161.4 153.2-25-25V89.4h16.8v34.4l22 22-13.8 13.8ZM94.6 102.8l25-25v38.8H102.8V82.2l-22 22 13.8 13.8Z"/></svg>` }
    };

    let buttonsHTML = '';
    for (const key in buttons) {
        buttonsHTML += `<button class="payment-button ${key}" data-method="${key}">${buttons[key].icon} <span>${buttons[key].text}</span></button>`;
    }
    const currentLang = localStorage.getItem('preferredLanguage') || 'it';
    const labelText = languages[currentLang]?.paymentMethodLabel || languages['it'].paymentMethodLabel;
    paymentContainer.innerHTML = `<p data-translate-key="paymentMethodLabel">${labelText}</p>` + buttonsHTML;

    paymentContainer.querySelectorAll('.payment-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const method = event.currentTarget.dataset.method;
            const modal = event.currentTarget.closest('.auth-modal');
            let options = { productCode };

            if (modal.id === 'group-booking-modal') {
                options.participants = parseInt(modal.querySelector('#modal-participants-input').value, 10);
            } else if (modal.id === 'individual-booking-modal') {
                const planCard = document.querySelector(`.open-individual-booking-modal[data-product-code="${productCode}"]`)?.closest('.plan') 
                            || document.querySelector(`.location-selector[data-product-code="${productCode}"]`)?.closest('.plan');
                if (planCard && planCard.querySelector('.location-selector')) {
                    const radio = planCard.querySelector('input[type="radio"]:checked');
                    if (radio) {
                        options.location = radio.value;
                    }
                }
            }
            
            if (method === 'paypal') {
				if (typeof handlePayPalPurchase === 'function') handlePayPalPurchase(options);
			} else if (method === 'bizum') {
				if (typeof handleBizumPurchase === 'function') handleBizumPurchase(options);
			} else if (method === 'mercadopago') { // <-- AGGIUNGI QUESTO BLOCCO
				if (typeof handleMercadoPagoPurchase === 'function') handleMercadoPagoPurchase(options);
			} else {
				alert(`Il pagamento con ${buttons[method].text} non è ancora disponibile.`);
			}
        });
    });
}

async function handlePayPalPurchase(options) {
    // Blocco di controllo utente non loggato - VERSIONE DEFINITIVA
	if (!currentUser) {
		// 1. Chiudiamo i modali di pagamento aperti
		closeModal('individual-booking-modal');
		closeModal('group-booking-modal');
	
		// 2. Prendiamo il messaggio tradotto
		const currentLang = localStorage.getItem('preferredLanguage') || 'es';
		const alertMessage = languages[currentLang]?.loginToPurchase || languages['es'].loginToPurchase;
	
		// 3. Mostriamo il nostro avviso personalizzato INVECE di alert()
		showAlert(alertMessage);
	
		return; // Interrompe la funzione di pagamento
	}

    console.log("Avvio acquisto PayPal con opzioni:", options);

    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error("Sessione utente non trovata. Prova a fare di nuovo il login.");

        const response = await fetch('/.netlify/functions/create-paypal-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`
            },
            body: JSON.stringify(options)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Errore dal server: ${response.status}`);
        }

        const orderData = await response.json();
        if (!orderData.orderId) throw new Error("ID Ordine PayPal non ricevuto dal backend.");

        console.log("Ordine PayPal creato con ID:", orderData.orderId);
        if (typeof renderPayPalButtons === 'function') {
            renderPayPalButtons(orderData.orderId, options.productCode);
        }

    } catch (error) {
        console.error("Errore in handlePayPalPurchase:", error);
        alert(`Si è verificato un errore: ${error.message}`);
    }
}

function renderPayPalButtons(orderId, productCode) {
    const paymentOptions = document.querySelector('.auth-modal[style*="display: flex"] .payment-options-container');
    if(paymentOptions) {
        paymentOptions.innerHTML = '<div id="paypal-button-container" style="min-height: 120px;"></div><p style="text-align:center; margin-top:10px;">Completa il pagamento qui sopra.</p>';
    }

    if (typeof paypal === 'undefined') {
        console.error("PayPal SDK non è caricato.");
        return;
    }

    paypal.Buttons({
        createOrder: (data, actions) => orderId,

        onApprove: async (data, actions) => {
			console.log("Pagamento approvato dal cliente:", data);
			if(paymentOptions) {
				paymentOptions.innerHTML = `<p style="font-weight:bold; text-align:center;">Elaborazione pagamento in corso...</p>`;
			}
		
			try {
				const { data: { session } } = await supabase.auth.getSession();
				if (!session) throw new Error("Sessione utente non trovata.");
		
				// Chiama la nostra nuova funzione backend per catturare e salvare
				const response = await fetch('/.netlify/functions/capture-paypal-order', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${session.access_token}`
					},
					body: JSON.stringify({
						orderID: data.orderID,
						productCode: productCode
					})
				});
		
				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.error || 'Errore nella registrazione del pagamento.');
				}
		
				// Se tutto è andato a buon fine, mostra il messaggio di successo e reindirizza
				if(paymentOptions) {
					paymentOptions.innerHTML = `<p style="color:green; font-weight:bold; text-align:center;">Pagamento completato! ✅<br>Verrai reindirizzato tra pochi secondi...</p>`;
				}
		
				setTimeout(() => {
					let redirectUrl = '';
					if (productCode.startsWith('FISIO')) { redirectUrl = 'grazie-fisio.html'; }
					else if (productCode === 'YOGA1') {
						redirectUrl = BOOKING_LINKS.yoga_individuale;
					} else if (productCode === 'YOGA5' || productCode.includes('G')) {
						redirectUrl = BOOKING_LINKS.yoga_pacchetti;
					}
		
					if (redirectUrl) {
						window.location.href = redirectUrl;
					} else {
						closeModal('individual-booking-modal');
						closeModal('group-booking-modal');
					}
				}, 4000);
		
			} catch (error) {
				console.error("Errore in onApprove:", error);
				if(paymentOptions) {
					paymentOptions.innerHTML = `<p style="color:red; text-align:center;">Si è verificato un errore dopo l'approvazione: ${error.message}. Contatta l'assistenza.</p>`;
				}
			}
		},

        onError: (err) => {
            console.error("Errore PayPal SDK:", err);
            if(paymentOptions) {
                paymentOptions.innerHTML = `<p style="color:red; text-align:center;">Si è verificato un errore durante il pagamento. Riprova.</p>`;
            }
        },

        onCancel: (data) => {
            console.log("Pagamento annullato:", data);
            closeModal('individual-booking-modal');
            closeModal('group-booking-modal');
        }
    }).render('#paypal-button-container');
}

// -----------------------------------------------------------
//               LISTENER GLOBALI (es. Auth State Change)
// -----------------------------------------------------------

if (supabase) {
    supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth Event:', event, session);
        currentUser = session?.user ?? null;

        if (typeof updateAuthStateUI === 'function') {
            updateAuthStateUI(currentUser);
        } else {
             console.error("Funzione updateAuthStateUI non definita.");
        }

        if (typeof initializePageBasedOnAuthState === 'function') {
             initializePageBasedOnAuthState(currentUser);
        } else {
            console.error("Funzione initializePageBasedOnAuthState non definita.");
        }
    });
} else {
    console.warn("Supabase client non disponibile, onAuthStateChange non verrà monitorato.");
}