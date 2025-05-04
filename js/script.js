// ===========================================================
//  SCRIPT.JS COMPLETO - Include funzioni per recensioni dinamiche
// ===========================================================

const languages = {
    it: {
        // --- Stringhe Comuni (Header/Footer) ---
        "pageTitle": "Maria Guillermina Hendriksen - Fisioterapia e Yoga",
        "navHome": "Homepage",
        "navAbout": "Chi Sono",
        "navServices": "Servizi",
        "navPlans": "Piani",
        "navContent": "I Miei Contenuti",
        "navBooking": "Prenota/Contatti",
        "footerText": "&copy; 2025 Maria Guillermina Hendriksen. Tutti i diritti riservati.",

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
        "bookingTitleWidget": "Prenota Incontro Conoscitivo Online",
        "bookingInstructionsWidget": "Utilizza il calendario qui sotto per scegliere un orario disponibile per un incontro conoscitivo gratuito (30 min).",
        "bookingWidgetAltContact": "Per prenotare altri tipi di sessioni o per esigenze particolari, utilizza il modulo di contatto sottostante o gli altri recapiti.",
        "contactFormTitle": "Modulo di Contatto / Richiesta Info",
        "contactFormInstructions": "Compila questo modulo per domande, richieste di informazioni o per prenotare sessioni specifiche. Ti risponderò il prima possibile.",
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
        // Sezione Recensioni (Include anche testi form per completezza, verranno usati se attivi l'HTML corrispondente)
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
        "reviewFormNotes": "Nota: Le recensioni inviate tramite questo modulo verranno moderate prima della pubblicazione. Grazie per la tua condivisione!"
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
        "plansNote": "Note: Payments are preferably made at the time of the session (cash, Bizum). For packages or advance payments, bank transfer or an online payment link can be requested.",
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
        "dynamicReviewsHeading": "Your Reviews",
        "reviewFormHeading": "Leave Your Review",
        "reviewFormIntro": "Have you taken lessons or a physiotherapy path with me? Your opinion is valuable! Fill out the form below to share your experience.",
        "reviewLabelName": "Your name (or how you want to appear):",
        "reviewLabelRating": "Rating (1 to 5 stars):",
        "reviewLabelMessage": "Your review:",
        "reviewSubmitButton": "Send Review",
        "reviewFormNotes": "Note: Reviews submitted via this form will be moderated before publication. Thank you for sharing!"
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
        "plansNote": "Nota: Los pagos se realizan preferentemente en el momento de la sesión (efectivo, Bizum). Para paquetes o pagos anticipados, se puede solicitar transferencia bancaria o enlace para pago online.",
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
        "dynamicReviewsHeading": "Vuestras Reseñas",
        "reviewFormHeading": "Deja Tu Reseña",
        "reviewFormIntro": "¿Has seguido clases o un percorso de fisioterapia conmigo? ¡Tu opinión es valiosa! Completa el formulario a continuación para compartir tu experiencia.",
        "reviewLabelName": "Tu nombre (o como quieres aparecer):",
        "reviewLabelRating": "Valoración (de 1 a 5 estrellas):",
        "reviewLabelMessage": "Tu reseña:",
        "reviewSubmitButton": "Enviar Reseña",
        "reviewFormNotes": "Nota: Las reseñas enviadas a través de este formulario serán moderadas antes de su publicación. ¡Gracias por compartir!"
    }
};

// --- INIZIALIZZAZIONE SUPABASE ---
//    Sostituisci con le tue vere chiavi prese dal tuo progetto Supabase!
const SUPABASE_URL = 'https://kmnowyskoyordmndfdae.supabase.co';         // <<< SOSTITUISCI QUI
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttbm93eXNrb3lvcmRtbmRmZGFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyNzUwMTEsImV4cCI6MjA2MTg1MTAxMX0.MdcRpTPTGC8e5wSeqp7chqhP0fsaW50VtiuN2y26eiw'; // <<< SOSTITUISCI QUI

let supabase = null;
try {
    // Usa supabaseJs globalmente se la libreria è inclusa via <script>
    if (window.supabase) {
       supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
       console.log("Supabase client initialized.");
    } else {
       console.error("Supabase library not found. Make sure it's included in your HTML before script.js");
    }
} catch (error) {
    console.error("Error initializing Supabase:", error);
}

let currentUser = null; // Variabile globale per tenere traccia dell'utente loggato

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
        const element = document.getElementById(key);
        if (element) {
            if (key.startsWith('pageTitle')) { document.title = languages[lang][key]; }
            else { element.innerHTML = languages[lang][key]; }
        } else {
             if (key.startsWith('pageTitle')) { document.title = languages[lang][key]; }
        }
    }
    localStorage.setItem('preferredLanguage', lang);
    if (typeof updateActiveButton === 'function') { updateActiveButton(lang); }

    // Aggiornamento video (se esiste l'elemento) - Mantenuto dal tuo codice originale
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
    // Ri-applica i testi ai bottoni/label dei form di autenticazione se necessario
    // (Al momento non ci sono testi specifici della lingua nei modal auth)
}

function updateActiveButton(lang) {
    const buttons = document.querySelectorAll('.language-switcher button');
    buttons.forEach(button => {
        let buttonLang = '';
        // Determina la lingua del bottone (dal tuo codice originale)
        if (button.hasAttribute('onclick')) {
            const match = button.getAttribute('onclick').match(/changeLanguage\('(\w+)'\)/);
            if (match) buttonLang = match[1];
        } else if (button.dataset.lang) { buttonLang = button.dataset.lang; }

        if (buttonLang === lang) { button.classList.add('active'); }
        else { button.classList.remove('active'); }
    });
}

function displayStars(rating) {
    // ... (Tua funzione displayStars esistente) ...
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

// Funzioni Helper per i Modali di Autenticazione
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
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

// -----------------------------------------------------------
//               FUNZIONI SPECIFICHE (Recensioni, Autenticazione)
// -----------------------------------------------------------

// --- Funzioni Recensioni (Dal tuo codice originale) ---
async function loadReviews() {
    // ... (Tua funzione loadReviews esistente) ...
    const container = document.getElementById('reviews-list-container');
    if (!container) return;
    container.innerHTML = '<p>Caricamento recensioni in corso...</p>';
    try {
        const response = await fetch('/.netlify/functions/get-reviews');
        if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);
        const reviews = await response.json();
        container.innerHTML = '';
        if (!reviews || reviews.length === 0) {
            container.innerHTML = '<p>Non ci sono ancora recensioni. Sii il primo a lasciarne una!</p>';
            return;
        }
        reviews.forEach(review => { /* ... crea HTML recensione ... */
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
    // ... (Tua funzione handleReviewSubmit esistente) ...
    console.log(">>> SUBMIT CLICCATO - ESEGUO handleReviewSubmit? <<<") // Tua riga di debug
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
        const response = await fetch('/.netlify/functions/submit-review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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

// --- Funzioni Autenticazione ---
function updateAuthStateUI(user) {
    // Recupera gli elementi dell'header (più sicuro farlo qui dentro)
    const guestInfo = document.getElementById('guest-info');
    const userInfo = document.getElementById('user-info');
    const userEmailSpan = document.getElementById('user-email');

    if (!guestInfo || !userInfo || !userEmailSpan) return; // Elementi non presenti in pagina?

    if (user) { // Logged In
        guestInfo.style.display = 'none';
        userInfo.style.display = 'inline'; // O 'block'
        userEmailSpan.textContent = user.email;
    } else { // Logged Out
        guestInfo.style.display = 'inline'; // O 'block'
        userInfo.style.display = 'none';
        userEmailSpan.textContent = '';
    }
}

// Funzione asincrona per controllare lo stato iniziale dell'utente all'avvio
async function checkInitialAuthState() {
    if (!supabase) {
        console.warn("Supabase non inizializzato, impossibile controllare stato auth iniziale.");
        updateAuthStateUI(null); // Mostra UI da sloggato
        return;
    }
    try {
        console.log("Checking initial auth state...");
        // Usiamo getSession per non forzare un refresh se il token è valido
        const { data: { session }, error } = await supabase.auth.getSession();
         if (error) {
            // Un errore qui non è necessariamente grave (es. token scaduto)
            console.warn("Error getting initial session:", error.message);
            currentUser = null;
         } else {
            currentUser = session?.user ?? null;
         }
        console.log("Initial user state:", currentUser ? currentUser.email : 'Not logged in');
        updateAuthStateUI(currentUser); // Aggiorna l'UI

        // Esegui azioni specifiche della pagina (come caricare contenuti video)
        initializePageBasedOnAuthState(currentUser);

    } catch (err) {
         console.error("Unexpected error during initial auth check:", err);
         updateAuthStateUI(null); // Fallback a stato sloggato
    }
}

// Funzione per eseguire azioni specifiche della pagina basate sullo stato auth
function initializePageBasedOnAuthState(user) {
     const videoGrid = document.getElementById('video-lessons-grid');
     if (videoGrid) { // Se siamo sulla pagina contenuti
         if (user) {
             if (typeof loadVideoLessons === 'function') {
                 loadVideoLessons(); // Sarà definita più avanti
             } else { console.warn('Function loadVideoLessons not defined yet.'); }
         } else {
             if (typeof displayLoginMessage === 'function') {
                 displayLoginMessage(); // Sarà definita più avanti
             } else {
                videoGrid.innerHTML = '<p>Effettua il login per vedere i contenuti e le opzioni di acquisto.</p>';
                console.warn('Function displayLoginMessage not defined yet.');
             }
         }
     }
     // Qui potresti aggiungere logica per altre pagine se necessario
}



// ===========================================================
//         AGGIUNTE ALLA SEZIONE "FUNZIONI SPECIFICHE"
// ===========================================================

// --- Funzioni per Caricare Contenuti Video dalla Pagina contenuti.html ---

// Funzione per mostrare messaggio di login
function displayLoginMessage() {
    const grid = document.getElementById('video-lessons-grid');
    if (grid) {
        grid.innerHTML = '<p>Effettua il <a href="#" onclick="openModal(\'login-modal\'); return false;">login</a> o <a href="#" onclick="openModal(\'signup-modal\'); return false;">registrati</a> per vedere i contenuti disponibili e le opzioni di acquisto.</p>';
    }
}

// Funzione per recuperare le lezioni video da Supabase
async function fetchVideoLessons() {
    if (!supabase) {
        console.error("Supabase client non disponibile per fetchVideoLessons");
        return []; // Ritorna array vuoto in caso di errore
    }
    try {
        const { data, error } = await supabase
            .from('video_lessons') // Nome tabella lezioni
            .select('*') // Prendi tutte le colonne
            .order('created_at', { ascending: true }); // Ordina come preferisci

        if (error) {
            console.error('Errore nel recupero delle video lezioni:', error);
            throw error; // Rilancia l'errore per gestirlo nel chiamante
        }
        console.log("Lezioni recuperate da Supabase:", data);
        return data || []; // Ritorna i dati o un array vuoto
    } catch (err) {
        console.error("Eccezione durante fetchVideoLessons:", err);
        return []; // Fallback array vuoto
    }
}

// Funzione per recuperare gli ID delle lezioni acquistate dall'utente corrente
async function fetchUserPurchases(userId) {
    if (!supabase || !userId) {
         console.error("Supabase client o User ID non disponibili per fetchUserPurchases");
         return [];
    }
    try {
        const { data, error } = await supabase
            .from('purchases') // Nome tabella acquisti
            .select('lesson_id') // Ci serve solo l'ID della lezione
            .eq('user_id', userId)
            .eq('status', 'completed'); // Solo acquisti completati con successo

        if (error) {
            console.error('Errore nel recupero degli acquisti utente:', error);
            throw error;
        }
        console.log("Acquisti utente recuperati:", data);
        // Estrai e ritorna solo l'array degli ID delle lezioni acquistate
        return data.map(purchase => purchase.lesson_id);
    } catch (err) {
         console.error("Eccezione durante fetchUserPurchases:", err);
         return [];
    }
}

// Funzione per mostrare le lezioni nell'HTML
function displayVideoLessons(lessons, purchasedLessonIds) {
    const grid = document.getElementById('video-lessons-grid');
    if (!grid) {
        console.error("Elemento #video-lessons-grid non trovato nel DOM.");
        return; // Esce se il contenitore non esiste
    }

    grid.innerHTML = ''; // Pulisce il messaggio "Caricamento..." o contenuti precedenti

    if (lessons.length === 0) {
        grid.innerHTML = '<p>Nessuna video lezione disponibile al momento.</p>';
        return; // Esce se non ci sono lezioni
    }

    lessons.forEach(lesson => {
        // Controlla se l'ID di questa lezione è nell'array degli acquisti dell'utente
        const isPurchased = purchasedLessonIds.includes(lesson.id);

        // Crea l'elemento contenitore per la singola lezione
        const item = document.createElement('div');
        item.className = 'content-item'; // Usa la stessa classe CSS che avevi per lo stile

        // Formatta il prezzo (adattalo se usi altre valute)
        let priceFormatted = 'N/D';
        if (lesson.price_eur !== null && lesson.price_eur !== undefined) {
            try {
                 priceFormatted = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(lesson.price_eur);
                 // Cambia 'es-ES' con 'it-IT' se preferisci formato italiano
            } catch(e) { console.error("Errore formattazione prezzo:", e); }
        }


        // Costruisce l'HTML interno dell'elemento lezione
        item.innerHTML = `
            <div class="content-thumbnail">
                <img src="${lesson.thumbnail_url || 'images/placeholder-video.png'}" alt="Anteprima ${lesson.name || 'Lezione'}">
            </div>
            <div class="content-text">
                <h3 class="content-title">${lesson.name || 'Titolo Lezione'}</h3>
                <p class="content-description">${lesson.description || 'Nessuna descrizione.'}</p>
                ${isPurchased ?
                    // Se Acquistato: mostra bottone "Guarda Ora"
                    `<p style="margin-top:10px; font-weight:bold; color:green;">Acquistato</p>
                     <button class="cta-button watch-button" data-lesson-id="${lesson.id}">Guarda Ora</button>`
                    :
                    // Se NON Acquistato: mostra prezzo e bottoni "Acquista"
                    `<p class="price" style="font-weight: bold; margin-top:10px;">${priceFormatted}</p>
                     <div class="purchase-buttons" style="margin-top: 10px; display: flex; flex-direction: column; gap: 8px;">
                         <button class="cta-button paypal-buy-button" data-lesson-id="${lesson.id}" data-price="${lesson.price_eur}">
                             Acquista con PayPal
                         </button>
                         <button class="cta-button mercadopago-buy-button" data-lesson-id="${lesson.id}" data-price="${lesson.price_eur}">
                             Acquista con MercadoPago
                         </button>
                         <div id="paypal-button-container-${lesson.id}" style="min-height: 40px;"></div>
                     </div>`
                }
            </div>
        `;

        // Aggiunge l'elemento creato alla griglia nel DOM
        grid.appendChild(item);
    });

    // DOPO aver aggiunto tutti gli elementi al DOM, aggiungi i listener ai nuovi bottoni
    addPurchaseButtonListeners();
    addWatchButtonListeners();
}


// Funzione PRINCIPALE per caricare le lezioni (questa verrà chiamata da initializePageBasedOnAuthState)
async function loadVideoLessons() {
    const grid = document.getElementById('video-lessons-grid');
    if (!grid) return; // Non fare nulla se non siamo sulla pagina giusta

    if (!currentUser) {
        console.log("Utente non loggato, mostro messaggio di login.");
        displayLoginMessage(); // Mostra il messaggio "Effettua il login..."
        return;
    }

    console.log("Utente loggato, caricamento lezioni...");
    grid.innerHTML = '<p>Caricamento lezioni disponibili...</p>'; // Messaggio di attesa

    try {
        // Recupera le lezioni e gli acquisti IN PARALLELO per velocizzare
        const [lessons, purchasedIds] = await Promise.all([
            fetchVideoLessons(),
            fetchUserPurchases(currentUser.id)
        ]);

        // Mostra le lezioni recuperate
        displayVideoLessons(lessons, purchasedIds);

    } catch (error) {
        console.error("Errore durante il caricamento delle lezioni o degli acquisti:", error);
        grid.innerHTML = `<p style="color:red;">Errore nel caricamento dei contenuti (${error.message}). Riprova più tardi.</p>`;
    }
}

// --- Funzioni Listener per i Bottoni Acquista/Guarda ---
// (Queste verranno implementate meglio dopo, per ora metti dei placeholder)

function addPurchaseButtonListeners() {
    document.querySelectorAll('.paypal-buy-button').forEach(button => {
        // Rimuovi listener esistenti per sicurezza (se questa funzione viene chiamata più volte)
        button.replaceWith(button.cloneNode(true));
    });
     document.querySelectorAll('.paypal-buy-button').forEach(button => {
         button.addEventListener('click', handlePayPalBuyClick); // Chiama la funzione che gestirà il click
     });

    document.querySelectorAll('.mercadopago-buy-button').forEach(button => {
         button.replaceWith(button.cloneNode(true));
     });
      document.querySelectorAll('.mercadopago-buy-button').forEach(button => {
         button.addEventListener('click', handleMercadoPagoBuyClick); // Chiama la funzione che gestirà il click
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
            // Qui in futuro reindirizzerai a un player o mostrerai il video
            // Esempio: window.location.href = `/watch?lesson=${lessonId}`;
        });
    });
}

// Funzioni Handler per il Click sui Bottoni Acquista (Placeholder per ora)
async function handlePayPalBuyClick(event) {
    if (!currentUser) {
        alert("Devi effettuare il login per acquistare.");
        openModal('login-modal'); // Apri il modale di login
        return;
    }
    const button = event.target;
    const lessonId = button.dataset.lessonId;
    const price = button.dataset.price;
    console.log(`Click Acquista PayPal: Lezione ID ${lessonId}, Prezzo ${price}`);
    alert(`Procedura acquisto PayPal per Lezione ${lessonId} (Prezzo €${price}) non ancora implementata.\nProssimo passo: chiamare la Netlify Function per creare l'ordine.`);

    // --- Codice futuro (Fase successiva) ---
    // 1. Mostra caricamento
    // 2. Chiama Netlify Function 'create-paypal-order' passando lessonId
    // 3. Ottieni orderID dalla funzione
    // 4. Chiama renderPayPalButton(orderID, `paypal-button-container-${lessonId}`, lessonId)
    // -----------------------------------------
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
    alert(`Procedura acquisto MercadoPago per Lezione ${lessonId} (Prezzo €${price}) non ancora implementata.\nProssimo passo: chiamare la Netlify Function per creare la preferenza di pagamento.`);

     // --- Codice futuro (Fase successiva) ---
     // 1. Mostra caricamento
     // 2. Chiama Netlify Function 'create-mercadopago-preference' passando lessonId
     // 3. Ottieni init_point (URL checkout) dalla funzione
     // 4. Reindirizza l'utente: window.location.href = initPoint;
     // -----------------------------------------
}

// Funzione per renderizzare il bottone PayPal SDK (Placeholder)
// Verrà implementata nella prossima fase
function renderPayPalButton(orderID, containerId, lessonId) {
     console.log(`Placeholder: Dovrei renderizzare il bottone PayPal SDK qui nel container ${containerId} per l'ordine ${orderID}`);
     const container = document.getElementById(containerId);
     if(container) {
         container.innerHTML = `<p><i>Bottone PayPal (ordine ${orderID}) apparirebbe qui...</i></p>`;
         // Qui andrà il codice paypal.Buttons({...}).render('#'+containerId);
     }
}


// ===========================================================
// ASSICURATI CHE initializePageBasedOnAuthState SIA CHIAMATO
// SIA DA onAuthStateChange SIA DA checkInitialAuthState
// Verifica nel tuo codice DOMContentLoaded e nel listener onAuthStateChange
// che questa funzione venga chiamata dopo aver aggiornato currentUser.
// (Dovrebbe essere già così dal codice precedente che ti ho fornito)
// ===========================================================


// -----------------------------------------------------------
//               LISTENER PRINCIPALE E INIZIALIZZAZIONE
// -----------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente caricato e analizzato.");

    // --- Inizializzazione Lingua (dal tuo codice) ---
    const savedLang = localStorage.getItem('preferredLanguage');
    const defaultLang = 'it'; // Lingua predefinita
    let initialLang = defaultLang;
     // Verifica che 'languages' sia definito prima di usarlo
    if (typeof languages !== 'undefined') {
        if (savedLang && languages[savedLang]){
            initialLang = savedLang;
        }
    } else {
         console.error("L'oggetto 'languages' non è definito.");
    }
    // Verifica che 'changeLanguage' sia definito
    if (typeof changeLanguage === 'function') {
        changeLanguage(initialLang);
    } else {
         console.error("La funzione 'changeLanguage' non è definita.");
    }
    // Aggiunta listener ai bottoni lingua (dal tuo codice, leggermente adattato)
    const langButtons = document.querySelectorAll('.language-switcher button');
    langButtons.forEach(button => {
        if (!button.hasAttribute('data-listener-set')) {
            let langCode = '';
            if (button.hasAttribute('onclick')) { // Supporta vecchio metodo onclick
                const match = button.getAttribute('onclick').match(/changeLanguage\('(\w+)'\)/);
                if (match) langCode = match[1];
                 // Rimuove onclick per preferire addEventListener
                 button.removeAttribute('onclick');
            } else if (button.dataset.lang) { // Supporta data-lang="..."
                langCode = button.dataset.lang;
            }

            if(langCode) {
                button.addEventListener('click', (event) => {
                    event.preventDefault(); // Previene comportamenti predefiniti se il bottone è in un form
                    if (typeof changeLanguage === 'function') {
                        changeLanguage(langCode);
                    } else {
                         console.error("La funzione 'changeLanguage' non è definita.");
                    }
                });
                button.setAttribute('data-listener-set', 'true'); // Evita di aggiungere più volte
            } else {
                 console.warn("Bottone lingua senza codice lingua identificabile:", button);
            }
        }
    });
    // --- Fine Inizializzazione Lingua ---


    // --- Setup Listener per Autenticazione ---
    // Recupera elementi UI Auth
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    const logoutButton = document.getElementById('logout-button');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginErrorP = document.getElementById('login-error'); // Assicurati esista nel modal
    const signupErrorP = document.getElementById('signup-error'); // Assicurati esista nel modal
    const signupMessageP = document.getElementById('signup-message'); // Assicurati esista nel modal

    // Listener per Bottoni Header
    loginButton?.addEventListener('click', () => openModal('login-modal'));
    signupButton?.addEventListener('click', () => openModal('signup-modal'));
    logoutButton?.addEventListener('click', async () => {
        if (!supabase) return;
        logoutButton.disabled = true;
        logoutButton.textContent = 'Uscendo...'; // Feedback visivo
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error logging out:", error);
            alert(`Errore durante il logout: ${error.message}`);
            // Riabilita il bottone solo in caso di errore, altrimenti onAuthStateChange aggiorna UI
            logoutButton.disabled = false;
            logoutButton.textContent = 'Logout';
        } else {
            console.log("User logged out successfully.");
            // Non serve riabilitare qui, onAuthStateChange nasconderà il bottone
        }
    });

    // Listener per Form Login
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
            if(loginErrorP) loginErrorP.textContent = `Credenziali non valide. Riprova.`; // Messaggio generico
            if(submitButton) submitButton.disabled = false;
        } else {
            console.log("Login successful:", data.user.email);
            closeModal('login-modal');
            // onAuthStateChange farà il resto
        }
    });

    // Listener per Form Signup
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
             if (data.user && !data.session) { // Conferma email richiesta
                 if(signupMessageP) signupMessageP.textContent = 'Registrazione avvenuta! Controlla la tua email per confermare l\'account.';
                 // Non chiudere il modale
             } else if (data.user && data.session){ // Login immediato (conferma disabilitata)
                 if(signupMessageP) signupMessageP.textContent = 'Registrazione e login avvenuti con successo!';
                  setTimeout(() => closeModal('signup-modal'), 2000);
             } else { // Caso imprevisto o utente già esistente senza sessione attiva
                 if(signupMessageP) signupMessageP.textContent = 'Richiesta di registrazione inviata.';
             }
        }
    });
    // --- Fine Setup Listener Autenticazione ---


    // --- Setup Listener Recensioni (dal tuo codice) ---
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        if (typeof handleReviewSubmit === 'function') {
            reviewForm.addEventListener('submit', handleReviewSubmit);
            console.log("Listener per invio recensione aggiunto.");
        } else {
            console.error("Funzione handleReviewSubmit non definita.");
        }
    }
    // --- Fine Setup Listener Recensioni ---


    // --- Check Iniziale Stato Autenticazione ---
    // Esegui il check DOPO che tutti i listener sono stati impostati
    if (typeof checkInitialAuthState === 'function') {
        checkInitialAuthState();
    } else {
        console.error("Funzione checkInitialAuthState non definita.");
        // Prova comunque ad aggiornare l'UI come fallback
        if(typeof updateAuthStateUI === 'function') {
            updateAuthStateUI(null);
        }
    }
    // --- Fine Check Iniziale ---


    // --- Caricamento Iniziale Recensioni (dal tuo codice) ---
    if (document.getElementById('reviews-list-container')) {
        if (typeof loadReviews === 'function') {
            loadReviews();
            console.log("Caricamento iniziale recensioni avviato.");
        } else {
             console.error("Funzione loadReviews non definita.");
        }
    }
     // --- Fine Caricamento Iniziale Recensioni ---

}); // --- Chiusura di DOMContentLoaded ---


// -----------------------------------------------------------
//               LISTENER GLOBALI (es. Auth State Change)
// -----------------------------------------------------------

// Listener Supabase Auth State Change (viene messo fuori da DOMContentLoaded)
if (supabase) {
    supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth Event:', event, session);
        currentUser = session?.user ?? null;

        // Aggiorna sempre l'UI generale (header)
        if (typeof updateAuthStateUI === 'function') {
            updateAuthStateUI(currentUser);
        } else {
             console.error("Funzione updateAuthStateUI non definita.");
        }

        // Esegui azioni specifiche della pagina
        if (typeof initializePageBasedOnAuthState === 'function') {
             initializePageBasedOnAuthState(currentUser);
        } else {
            console.error("Funzione initializePageBasedOnAuthState non definita.");
        }
    });
} else {
    console.warn("Supabase client non disponibile, onAuthStateChange non verrà monitorato.");
}