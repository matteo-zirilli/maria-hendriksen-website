// ===========================================================
//  SCRIPT.JS COMPLETO - Include gestione recensioni dinamica
// ===========================================================

const languages = {
    it: {
        // --- Stringhe Comuni (Header/Footer) ---
        "pageTitle": "Maria Guillermina Hendriksen - Fisioterapia e Yoga", // Titolo per index.html
        "navHome": "Homepage",
        "navAbout": "Chi Sono",
        "navServices": "Servizi",
        "navPlans": "Piani",
        "navContent": "I Miei Contenuti",
        "navBooking": "Prenota/Contatti",
        "footerText": "&copy; 2025 Maria Guillermina Hendriksen. Tutti i diritti riservati.", // Aggiornato anno

        // --- index.html ---
        "mainHeading": "Benvenuti nel sito di Maria Guillermina Hendriksen",
        "mainSubtitle": "Fisioterapista esperta e Istruttrice di Yoga certificata, dedicata al tuo benessere.",
        "ctaButton": "Scopri di più e Prenota",
        "mottoPart1": "Ascolta il tuo corpo.",
        "mottoPart2": "Respira nel presente.",
        "mottoPart3": "Muoviti verso il benessere.",
        "introTitle": "Il mio approccio",
        "introText": "Combino le tecniche della fisioterapia moderna con la saggezza dello yoga per offrire un percorso di recupero e benessere personalizzato. Ogni corpo racconta una storia unica e merita ascolto, cura e rispetto. Attraverso un approccio integrato, aiuto le persone a ritrovare equilibrio, forza e consapevolezza, accompagnandole in un viaggio verso un benessere profondo e duraturo. Credo che la salute non sia solo l’assenza di dolore, ma una condizione di armonia tra corpo, mente e respiro. La mia motivazione nasce dal desiderio autentico di aiutare le persone a sentirsi meglio con sé stesse, a riconnettersi con il proprio corpo e a riscoprire la propria energia vitale.",

        // --- chi-sono.html ---
        "pageTitleAbout": "Chi Sono - Maria G. Hendriksen",
        "aboutHeading": "Chi Sono",
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

        // --- servizi.html ---
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

        // --- piani.html ---
        "pageTitlePlans": "Piani e Tariffe - Maria G. Hendriksen",
        "plansHeading": "Piani e Tariffe",
        "plansIntro": "Scegli il piano più adatto alle tue esigenze. Per soluzioni personalizzate o pacchetti combinati Fisioterapia+Yoga, <a href=\"prenota.html\">contattami</a>.",
        "plansNote": "Nota: I pagamenti si effettuano preferibilmente al momento della seduta (contanti, Bizum). Per pacchetti o pagamenti anticipati è possibile richiedere bonifico bancario o link per pagamento online.", // MODIFICATO PER PAGAMENTI
        "planFisioSingleTitle": "Seduta Fisioterapia Singola",
        "planFisioSingleDesc": "Valutazione e trattamento fisioterapico individuale.",
        "planFisioSingleFeat1": "Durata: circa 60 minuti",
        "planFisioSingleFeat2": "Trattamento personalizzato",
        "planFisioSinglePrice": "€50",
        "planFisioSingleButton": "Prenota Ora",
        "planFisio5Title": "Ciclo 5 Sedute Fisioterapia",
        "planFisio5Desc": "Pacchetto conveniente per un percorso riabilitativo completo.",
        "planFisio5Feat1": "5 sedute individuali (60 min/cad.)",
        "planFisio5Feat2": "Monitoraggio progressi",
        "planFisio5Feat3": "Sconto rispetto alla seduta singola",
        "planFisio5Price": "€220 ",
        "planFisio5OldPrice": "(€250)",
        "planFisio5Button": "Prenota Ciclo",
        "planYogaIndSingleTitle": "Lezione Yoga Individuale",
        "planYogaIndSingleDesc": "Pratica personalizzata One-to-One.",
        "planYogaIndSingleFeat1": "Durata: 60 o 75 minuti (da concordare)",
        "planYogaIndSingleFeat2": "Adatta a tutti i livelli",
        "planYogaIndSingleFeat3": "Focus su obiettivi specifici",
        "planYogaIndSinglePrice": "€45 (60 min)",
        "planYogaIndSingleButton": "Prenota Lezione",
        "planYogaInd5Title": "Pacchetto 5 Lezioni Yoga Individuali",
        "planYogaInd5Desc": "Percorso continuativo per approfondire la pratica.",
        "planYogaInd5Feat1": "5 lezioni individuali (60 min/cad.)",
        "planYogaInd5Feat2": "Flessibilità oraria",
        "planYogaInd5Feat3": "Sconto sul totale",
        "planYogaInd5Price": "€200 ",
        "planYogaInd5OldPrice": "(€225)",
        "planYogaInd5Button": "Acquista Pacchetto",
        "planYogaGroupSingleTitle": "Lezione Yoga di Gruppo (Drop-in)",
        "planYogaGroupSingleDesc": "Partecipa a una delle nostre classi di gruppo.",
        "planYogaGroupSingleFeat1": "Verifica l'orario delle classi",
        "planYogaGroupSingleFeat2": "Adatta a diversi livelli",
        "planYogaGroupSinglePrice": "€15",
        "planYogaGroupSingleButton": "Prenota Classe",
        "planYogaGroup10Title": "Pacchetto 10 Lezioni Yoga di Gruppo",
        "planYogaGroup10Desc": "Frequenta le classi di gruppo con convenienza.",
        "planYogaGroup10Feat1": "Accesso a 10 lezioni di gruppo",
        "planYogaGroup10Feat2": "Validità: 3 mesi",
        "planYogaGroup10Feat3": "Massima convenienza",
        "planYogaGroup10Price": "€120 ",
        "planYogaGroup10OldPrice": "(€150)",
        "planYogaGroup10Button": "Acquista Carnet",

        // --- prenota.html ---
        "pageTitleBooking": "Prenota / Contatti - Maria G. Hendriksen",
        "bookingTitleWidget": "Prenota Incontro Conoscitivo Online", // Modificato per evento singolo
        "bookingInstructionsWidget": "Utilizza il calendario qui sotto per scegliere un orario disponibile per un incontro conoscitivo gratuito (30 min).", // Modificato
        "bookingWidgetAltContact": "Per prenotare altri tipi di sessioni o per esigenze particolari, utilizza il modulo di contatto sottostante o gli altri recapiti.", // Modificato
        "contactFormTitle": "Modulo di Contatto / Richiesta Info",
        "contactFormInstructions": "Compila questo modulo per domande, richieste di informazioni o per prenotare sessioni specifiche. Ti risponderò il prima possibile.", // Modificato
        "labelName": "Nome:",
        "labelEmail": "Email:",
        "labelPhone": "Telefono (Opzionale):",
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
        "contactPhone": "Telefono: <a href=\"tel:+393299460634\">+39 3299460634</a>",
        "contactAddress": "Indirizzo Studio: Palma de Maiorca (contattami per dettagli)",

        // --- contenuti.html ---
        "pageTitleContent": "I Miei Contenuti - Maria Guillermina Hendriksen",
        "contentHeading": "I Miei Contenuti",
        "contentIntro": "Esplora risorse, video e articoli dedicati allo Yoga e alla Fisioterapia per approfondire la tua pratica e il tuo percorso di benessere.",
        "contentYogaTitle": "Contenuti Yoga",
        "contentYogaDesc": "Video di lezioni, sequenze specifiche, tecniche di respirazione e meditazione guidata per arricchire la tua pratica yoga a casa.",
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
        // Sezione Recensioni
        "reviewsHeading": "Dicono di Me / Recensioni",
        "testimonialGalleryHeading": "Alcune Testimonianze",
        "testimonialGalleryIntro": "Qui puoi vedere alcuni dei messaggi e delle esperienze condivise da chi ha seguito un percorso con me.",
        "dynamicReviewsHeading": "Le Vostre Recensioni", // NUOVO
        "reviewFormHeading": "Lascia la Tua Recensione", // NUOVO
        "reviewFormIntro": "Hai seguito delle lezioni o un percorso di fisioterapia con me? La tua opinione è preziosa! Compila il modulo qui sotto per condividere la tua esperienza.", // NUOVO
        "reviewLabelName": "Il tuo nome (o come vuoi apparire):", // NUOVO
        "reviewLabelRating": "Valutazione (da 1 a 5 stelle):", // NUOVO
        "reviewLabelMessage": "La tua recensione:", // NUOVO
        "reviewSubmitButton": "Invia Recensione", // NUOVO
        "reviewFormNotes": "Nota: Le recensioni inviate tramite questo modulo verranno moderate prima della pubblicazione. Grazie per la tua condivisione!" // NUOVO
    },
    en: {
        // --- Common Strings (Header/Footer) ---
        "pageTitle": "Maria Guillermina Hendriksen - Physiotherapy and Yoga",
        "navHome": "Homepage",
        "navAbout": "About Me",
        "navServices": "Services",
        "navPlans": "Plans",
        "navContent": "My Content",
        "navBooking": "Booking/Contact",
        "footerText": "&copy; 2025 Maria Guillermina Hendriksen. All rights reserved.",

        // --- index.html ---
        "mainHeading": "Welcome to the website of Maria Guillermina Hendriksen",
        "mainSubtitle": "Experienced Physiotherapist and Certified Yoga Instructor, dedicated to your well-being.",
        "ctaButton": "Learn More and Book",
        "mottoPart1": "Listen to your body.",
        "mottoPart2": "Breathe into the present.",
        "mottoPart3": "Move towards well-being.",
        "introTitle": "My Approach",
        "introText": "I combine modern physiotherapy techniques with the wisdom of yoga to offer a personalized path to recovery and well-being. Every body tells a unique story and deserves to be heard, cared for, and respected. Through an integrated approach, I help people restore balance, strength, and awareness, guiding them on a journey toward deep and lasting wellness. I believe that health is not just the absence of pain, but a state of harmony between body, mind, and breath. My motivation comes from a genuine desire to help people feel better within themselves, reconnect with their bodies, and rediscover their vital energy.",

        // --- chi-sono.html ---
        "pageTitleAbout": "About Me - Maria G. Hendriksen",
        "aboutHeading": "About Me",
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

        // --- servizi.html ---
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

        // --- piani.html ---
        "pageTitlePlans": "Plans and Rates - Maria G. Hendriksen",
        "plansHeading": "Plans and Rates",
        "plansIntro": "Choose the plan that best suits your needs. For customized solutions or combined Physiotherapy+Yoga packages, <a href=\"prenota.html\">contact me</a>.",
        "plansNote": "Note: Payments are preferably made at the time of the session (cash, Bizum). For packages or advance payments, bank transfer or an online payment link can be requested.", // MODIFIED FOR PAYMENTS
        "planFisioSingleTitle": "Single Physiotherapy Session",
        "planFisioSingleDesc": "Individual physiotherapy assessment and treatment.",
        "planFisioSingleFeat1": "Duration: approx. 60 minutes",
        "planFisioSingleFeat2": "Personalized treatment",
        "planFisioSinglePrice": "€50",
        "planFisioSingleButton": "Book Now",
        "planFisio5Title": "5 Physiotherapy Sessions Cycle",
        "planFisio5Desc": "Convenient package for a complete rehabilitation path.",
        "planFisio5Feat1": "5 individual sessions (60 min/each)",
        "planFisio5Feat2": "Progress monitoring",
        "planFisio5Feat3": "Discount compared to single session",
        "planFisio5Price": "€220 ",
        "planFisio5OldPrice": "(€250)",
        "planFisio5Button": "Book Cycle",
        "planYogaIndSingleTitle": "Individual Yoga Lesson",
        "planYogaIndSingleDesc": "Personalized One-to-One practice.",
        "planYogaIndSingleFeat1": "Duration: 60 or 75 minutes (to be agreed)",
        "planYogaIndSingleFeat2": "Suitable for all levels",
        "planYogaIndSingleFeat3": "Focus on specific goals",
        "planYogaIndSinglePrice": "€45 (60 min)",
        "planYogaIndSingleButton": "Book Lesson",
        "planYogaInd5Title": "Package 5 Individual Yoga Lessons",
        "planYogaInd5Desc": "Continuous path to deepen the practice.",
        "planYogaInd5Feat1": "5 individual lessons (60 min/each)",
        "planYogaInd5Feat2": "Time flexibility",
        "planYogaInd5Feat3": "Discount on total",
        "planYogaInd5Price": "€200 ",
        "planYogaInd5OldPrice": "(€225)",
        "planYogaInd5Button": "Purchase Package",
        "planYogaGroupSingleTitle": "Group Yoga Lesson (Drop-in)",
        "planYogaGroupSingleDesc": "Join one of our group classes.",
        "planYogaGroupSingleFeat1": "Check class schedule",
        "planYogaGroupSingleFeat2": "Suitable for different levels",
        "planYogaGroupSinglePrice": "€15",
        "planYogaGroupSingleButton": "Book Class",
        "planYogaGroup10Title": "Package 10 Group Yoga Lessons",
        "planYogaGroup10Desc": "Attend group classes conveniently.",
        "planYogaGroup10Feat1": "Access to 10 group lessons",
        "planYogaGroup10Feat2": "Validity: 3 months",
        "planYogaGroup10Feat3": "Maximum convenience",
        "planYogaGroup10Price": "€120 ",
        "planYogaGroup10OldPrice": "(€150)",
        "planYogaGroup10Button": "Purchase Card",

        // --- prenota.html ---
        "pageTitleBooking": "Booking / Contact - Maria G. Hendriksen",
        "bookingTitleWidget": "Book Online Discovery Call", // Changed for single event
        "bookingInstructionsWidget": "Use the calendar below to choose an available time for a free discovery call (30 min).", // Changed
        "bookingWidgetAltContact": "To book other types of sessions or for special requirements, please use the contact form below or the other contact details.", // Changed
        "contactFormTitle": "Contact Form / Info Request",
        "contactFormInstructions": "Fill out this form for questions, information requests, or to book specific sessions. I will reply as soon as possible.", // Changed
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
        "contactPhone": "Phone: <a href=\"tel:+393299460634\">+39 3299460634</a>",
        "contactAddress": "Studio Address: Palma de Mallorca (contact me for details)",

        // --- contenuti.html ---
        "pageTitleContent": "My Content - Maria Guillermina Hendriksen",
        "contentHeading": "My Content",
        "contentIntro": "Explore resources, videos, and articles dedicated to Yoga and Physiotherapy to deepen your practice and wellness journey.",
        "contentYogaTitle": "Yoga Content",
        "contentYogaDesc": "Lesson videos, specific sequences, breathing techniques, and guided meditations to enrich your home yoga practice.",
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
        // Reviews Section
        "reviewsHeading": "Testimonials / Reviews",
        "testimonialGalleryHeading": "Some Testimonials",
        "testimonialGalleryIntro": "Here you can see some of the messages and experiences shared by those who have followed a path with me.",
        "dynamicReviewsHeading": "Your Reviews", // NEW
        "reviewFormHeading": "Leave Your Review", // NEW
        "reviewFormIntro": "Have you taken lessons or a physiotherapy path with me? Your opinion is valuable! Fill out the form below to share your experience.", // NEW
        "reviewLabelName": "Your name (or how you want to appear):", // NEW
        "reviewLabelRating": "Rating (1 to 5 stars):", // NEW
        "reviewLabelMessage": "Your review:", // NEW
        "reviewSubmitButton": "Send Review", // NEW
        "reviewFormNotes": "Note: Reviews submitted via this form will be moderated before publication. Thank you for sharing!" // NEW
    },
    es: {
        // --- Common Strings (Header/Footer) ---
        "pageTitle": "Maria Guillermina Hendriksen - Fisioterapia y Yoga",
        "navHome": "Inicio",
        "navAbout": "Sobre Mí",
        "navServices": "Servicios",
        "navPlans": "Planes",
        "navContent": "Mis Contenidos",
        "navBooking": "Reservas/Contacto",
        "footerText": "&copy; 2025 Maria Guillermina Hendriksen. Todos los derechos reservados.",

        // --- index.html ---
        "mainHeading": "Bienvenidos al sitio web de Maria Guillermina Hendriksen",
        "mainSubtitle": "Fisioterapeuta experta e Instructora de Yoga certificada, dedicada a tu bienestar.",
        "ctaButton": "Descubre Más y Reserva",
         "mottoPart1": "Escucha a tu cuerpo.",
        "mottoPart2": "Respira en el presente.",
        "mottoPart3": "Muévete hacia el bienestar.",
        "introTitle": "Mi Enfoque",
        "introText": "Combino las técnicas de la fisioterapia moderna con la sabiduría del yoga para ofrecer un camino personalizado de recuperación y bienestar. Cada cuerpo cuenta una historia única y merece ser escuchado, cuidado y respetado. A través de un enfoque integral, acompaño a las personas a recuperar el equilibrio, la fuerza y la conciencia, guiándolas hacia un bienestar profundo y duradero. Creo que la salud no es solo la ausencia de dolor, sino un estado de armonía entre el cuerpo, la mente y la respiración. Mi motivación nace del deseo auténtico de ayudar a las personas a sentirse mejor consigo mismas, a reconectar con su cuerpo y a redescubrir su energía vital.",

        // --- chi-sono.html ---
        "pageTitleAbout": "Sobre Mí - Maria G. Hendriksen",
        "aboutHeading": "Sobre Mí",
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

        // --- servizi.html ---
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

        // --- piani.html ---
        "pageTitlePlans": "Planes y Tarifas - Maria G. Hendriksen",
        "plansHeading": "Planes y Tarifas",
        "plansIntro": "Elige el plan que mejor se adapte a tus necesidades. Para soluciones personalizadas o paquetes combinados Fisioterapia+Yoga, <a href=\"prenota.html\">contáctame</a>.",
        "plansNote": "Nota: Los pagos se realizan preferentemente en el momento de la sesión (efectivo, Bizum). Para paquetes o pagos anticipados, se puede solicitar transferencia bancaria o enlace para pago online.", // MODIFICADO PARA PAGOS
        "planFisioSingleTitle": "Sesión Única de Fisioterapia",
        "planFisioSingleDesc": "Evaluación y tratamiento fisioterapéutico individual.",
        "planFisioSingleFeat1": "Duración: aprox. 60 minutos",
        "planFisioSingleFeat2": "Tratamiento personalizado",
        "planFisioSinglePrice": "€50",
        "planFisioSingleButton": "Reserva Ahora",
        "planFisio5Title": "Ciclo 5 Sesiones de Fisioterapia",
        "planFisio5Desc": "Paquete conveniente para un camino de rehabilitación completo.",
        "planFisio5Feat1": "5 sesiones individuales (60 min/cada)",
        "planFisio5Feat2": "Seguimiento del progreso",
        "planFisio5Feat3": "Descuento respecto a la sesión única",
        "planFisio5Price": "€220 ",
        "planFisio5OldPrice": "(€250)",
        "planFisio5Button": "Reserva Ciclo",
        "planYogaIndSingleTitle": "Clase Individual de Yoga",
        "planYogaIndSingleDesc": "Práctica personalizada One-to-One.",
        "planYogaIndSingleFeat1": "Duración: 60 o 75 minutos (a convenir)",
        "planYogaIndSingleFeat2": "Adaptada a todos los niveles",
        "planYogaIndSingleFeat3": "Enfoque en objetivos específicos",
        "planYogaIndSinglePrice": "€45 (60 min)",
        "planYogaIndSingleButton": "Reserva Clase",
        "planYogaInd5Title": "Paquete 5 Clases Individuales de Yoga",
        "planYogaInd5Desc": "Camino continuo para profundizar la práctica.",
        "planYogaInd5Feat1": "5 clases individuales (60 min/cada)",
        "planYogaInd5Feat2": "Flexibilidad horaria",
        "planYogaInd5Feat3": "Descuento sobre el total",
        "planYogaInd5Price": "€200 ",
        "planYogaInd5OldPrice": "(€225)",
        "planYogaInd5Button": "Comprar Paquete",
        "planYogaGroupSingleTitle": "Clase Grupal de Yoga (Drop-in)",
        "planYogaGroupSingleDesc": "Participa en una de nuestras clases grupales.",
        "planYogaGroupSingleFeat1": "Verifica el horario de las clases",
        "planYogaGroupSingleFeat2": "Adaptada a diferentes niveles",
        "planYogaGroupSinglePrice": "€15",
        "planYogaGroupSingleButton": "Reserva Clase",
        "planYogaGroup10Title": "Paquete 10 Clases Grupales de Yoga",
        "planYogaGroup10Desc": "Asiste a las clases grupales con conveniencia.",
        "planYogaGroup10Feat1": "Acceso a 10 clases grupales",
        "planYogaGroup10Feat2": "Validez: 3 meses",
        "planYogaGroup10Feat3": "Máxima conveniencia",
        "planYogaGroup10Price": "€120 ",
        "planYogaGroup10OldPrice": "(€150)",
        "planYogaGroup10Button": "Comprar Bono",

        // --- prenota.html ---
        "pageTitleBooking": "Reservas / Contacto - Maria G. Hendriksen",
        "bookingTitleWidget": "Reserva Encuentro Informativo Online", // Cambiado para evento único
        "bookingInstructionsWidget": "Utiliza el calendario abajo para elegir un horario disponible para un encuentro informativo gratuito (30 min).", // Cambiado
        "bookingWidgetAltContact": "Para reservar otros tipos de sesiones o para necesidades particulares, utiliza el formulario de contacto o los otros métodos de contacto.", // Cambiado
        "contactFormTitle": "Formulario de Contacto / Solicitud de Info",
        "contactFormInstructions": "Rellena este formulario para preguntas, solicitudes de información o para reservar sesiones específicas. Te responderé lo antes posible.", // Cambiado
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
        "contactPhone": "Teléfono: <a href=\"tel:+393299460634\">+39 3299460634</a>",
        "contactAddress": "Dirección Estudio: Palma de Mallorca (contáctame para detalles)",

        // --- contenuti.html ---
        "pageTitleContent": "Mis Contenidos - Maria Guillermina Hendriksen",
        "contentHeading": "Mis Contenidos",
        "contentIntro": "Explora recursos, videos y artículos dedicados al Yoga y la Fisioterapia para profundizar tu práctica y tu camino hacia el bienestar.",
        "contentYogaTitle": "Contenidos de Yoga",
        "contentYogaDesc": "Videos de clases, secuencias específicas, técnicas de respiración y meditación guiada para enriquecer tu práctica de yoga en casa.",
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
        // Sección Reseñas
        "reviewsHeading": "Testimonios / Reseñas",
        "testimonialGalleryHeading": "Algunos Testimonios",
        "testimonialGalleryIntro": "Aquí puedes ver algunos de los mensajes y experiencias compartidas por quienes han seguido un camino conmigo.",
        "dynamicReviewsHeading": "Vuestras Reseñas", // NUEVO
        "reviewFormHeading": "Deja Tu Reseña", // NUEVO
        "reviewFormIntro": "¿Has seguido clases o un percorso de fisioterapia conmigo? ¡Tu opinión es valiosa! Completa el formulario a continuación para compartir tu experiencia.", // NUEVO
        "reviewLabelName": "Tu nombre (o como quieres aparecer):", // NUEVO
        "reviewLabelRating": "Valoración (de 1 a 5 estrellas):", // NUEVO
        "reviewLabelMessage": "Tu reseña:", // NUEVO
        "reviewSubmitButton": "Enviar Reseña", // NUEVO
        "reviewFormNotes": "Nota: Las reseñas enviadas a través de este formulario serán moderadas antes de su publicación. ¡Gracias por compartir!" // NUEVO
    }
};

// --- Funzioni JavaScript (changeLanguage, updateActiveButton) ---
function changeLanguage(lang) {
    if (languages[lang]) {
        document.documentElement.lang = lang;
        for (const key in languages[lang]) {
            const element = document.getElementById(key);
            if (element) {
                // Special handling for page titles
                if (key.startsWith('pageTitle')) {
                    document.title = languages[lang][key];
                } else {
                    element.innerHTML = languages[lang][key];
                }
            } else {
                 // Handle titles even if no specific element with that ID exists
                 if (key.startsWith('pageTitle')) {
                     document.title = languages[lang][key];
                 }
            }
        }
        localStorage.setItem('preferredLanguage', lang);
        if (typeof updateActiveButton === 'function') {
            updateActiveButton(lang);
        }

        // Code to change video source (if present on the page)
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

    } else {
        console.error("Language not supported:", lang);
    }
}

function updateActiveButton(lang) {
    const buttons = document.querySelectorAll('.language-switcher button');
    buttons.forEach(button => {
        let buttonLang = '';
        if (button.hasAttribute('onclick')) {
            const match = button.getAttribute('onclick').match(/changeLanguage\('(\w+)'\)/);
            if (match) buttonLang = match[1];
        } else if (button.dataset.lang) {
            buttonLang = button.dataset.lang;
        }

        if (buttonLang === lang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}


// --- Listener DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', () => {
    // Code for initial language setting
    const savedLang = localStorage.getItem('preferredLanguage');
    const defaultLang = 'it';
    let initialLang = defaultLang;
    if (savedLang && typeof languages !== 'undefined' && languages[savedLang]){
        initialLang = savedLang;
    } else if (typeof languages === 'undefined') {
         console.error("The 'languages' object is not defined when DOMContentLoaded runs.");
         return;
    }
    if (typeof changeLanguage === 'function') {
        changeLanguage(initialLang);
    } else {
         console.error("The 'changeLanguage' function is not defined.");
    }

    // Add listeners to language buttons
    const langButtons = document.querySelectorAll('.language-switcher button');
    langButtons.forEach(button => {
        if (!button.hasAttribute('data-listener-set')) {
            let langCode = '';
             if (button.hasAttribute('onclick')) {
                 const match = button.getAttribute('onclick').match(/changeLanguage\('(\w+)'\)/);
                 if (match) langCode = match[1];
             } else if (button.dataset.lang) {
                 langCode = button.dataset.lang;
             }
             if(langCode) {
                 button.addEventListener('click', (event) => {
                      event.preventDefault();
                      if (typeof changeLanguage === 'function') { changeLanguage(langCode); }
                 });
                 button.setAttribute('data-listener-set', 'true');
             }
         }
    });

    // <<< QUI VANNO LE CHIAMATE PER LE RECENSIONI >>>
    // Ad esempio:
    // const reviewForm = document.getElementById('review-form');
    // if (reviewForm && typeof handleReviewSubmit === 'function') {
    //     reviewForm.addEventListener('submit', handleReviewSubmit);
    // }
    // if (document.getElementById('reviews-list-container') && typeof loadReviews === 'function') {
    //     loadReviews();
    // }

});

// ===========================================================
//                  FINE SCRIPT.JS
// ===========================================================