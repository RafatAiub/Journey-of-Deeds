/**
 * @typedef {Object} LocalizedText
 * @property {string|string[]} bn - Bengali text or array of texts
 * @property {string|string[]} en - English text or array of texts
 */

/**
 * @typedef {Object} FeaturedAyah
 * @property {Object} bn - Bengali translation and details
 * @property {string} bn.text - Ayah translation
 * @property {string} bn.surah - Surah name in Bengali
 * @property {string} bn.ayahNum - Ayah number
 * @property {Object} en - English translation and details
 * @property {string} en.text - Ayah translation
 * @property {string} en.surah - Surah name in English
 * @property {string} en.ayahNum - Ayah number
 */

/**
 * @typedef {Object} TaraweehDay
 * @property {number|string} day - Day number (1-30)
 * @property {string} juz - Juz coverage for the day
 * @property {string} [hizbRange] - Hizb coverage (optional)
 * @property {'intensive'|'steady'|'buffer'} phase - Current phase of the plan
 * @property {LocalizedText} themes - Key themes covered in the Juz
 * @property {LocalizedText} keyWords - Key Arabic words/concepts
 * @property {FeaturedAyah} featuredAyah - Highlighted ayah of the night
 * @property {FeaturedAyah[]} [extraAyats] - Additional significant ayahs
 * @property {LocalizedText} juzSummary - Concise summary of the entire day's part
 * @property {LocalizedText} smallAmol - Small actionable deed
 * @property {LocalizedText} reflectionQ - Journaling/reflection question
 * @property {LocalizedText} uxTask - App UX task for the user
 */

/**
 * 30-Day Quran + Taraweeh Attraction System
 * * Plan: 
 * - Days 0-5: 1.5 juz/day (intensive) -> Ends at Juz 9
 * - Days 6-26: 1 juz/day (steady) -> Ends at Juz 30
 * - Days 27-29: buffer/revision/Eid prep
 * * @type {TaraweehDay[]}
 */
export const taraweehPlan = [
    // ═══════════════ PHASE 1: INTENSIVE (Days 0-5, 1.5 juz/day) ═══════════════
    {
        day: 0, juz: 'Juz 1 to mid-Juz 2', hizbRange: '1-3', phase: 'intensive',
        themes: {
            bn: ['হেদায়েতের সূচনা', 'তাকওয়ার আহ্বান', 'বনী ইসরাইলের শিক্ষা'],
            en: ['Beginning of Guidance', 'Call to Taqwa', 'Lessons from Bani Israel']
        },
        keyWords: {
            bn: ['তাকওয়া', 'হেদায়েত', 'মুত্তাকিন'],
            en: ['Taqwa', 'Guidance', 'Muttaqin']
        },
        featuredAyah: {
            bn: { text: 'আর আমার বান্দারা যখন তোমার কাছে আমার সম্পর্কে জিজ্ঞেস করে—আমি তো নিকটেই।', surah: 'সূরা বাকারা', ayahNum: '২:১৮৬' },
            en: { text: 'And when My servants ask you about Me — indeed I am near.', surah: 'Al-Baqarah', ayahNum: '2:186' }
        },
        extraAyats: [
            {
                bn: { text: 'তোমরা নামাজ কায়েম কর এবং জাকাত দাও আর যারা রুকু করে তাদের সাথে রুকু কর।', surah: 'সূরা বাকারা', ayahNum: '২:৪৩' },
                en: { text: 'Establish prayer and give zakah and bow with those who bow.', surah: 'Al-Baqarah', ayahNum: '2:43' }
            },
            {
                bn: { text: 'হে মানুষ! তোমরা তোমাদের রবের ইবাদত কর যিনি তোমাদের ও তোমাদের পূর্ববর্তীদের সৃষ্টি করেছেন।', surah: 'সূরা বাকারা', ayahNum: '২:২১' },
                en: { text: 'O mankind, worship your Lord, who created you and those before you.', surah: 'Al-Baqarah', ayahNum: '2:21' }
            }
        ],
        juzSummary: {
            bn: 'কুরআনের শুরু হয় আল-ফাতিহা দিয়ে, যেখানে আল্লাহর প্রশংসা ও হেদায়েতের প্রার্থনা করা হয়েছে। সূরা বাকারার শুরুতে মুমিন, কাফের ও মুনাফিকদের বৈশিষ্ট্য এবং আদম (আঃ) এর সৃষ্টির ঘটনা বর্ণিত হয়েছে। পরবর্তীতে বনী ইসরাঈলের প্রতি নেয়ামত ও তাদের অবাধ্যতার বিষয়গুলো তুলে ধরা হয়েছে।',
            en: 'The Quran begins with Al-Fatiha, praising Allah and asking for guidance. Al-Baqarah starts with the traits of believers, disbelievers, and hypocrites, and the creation of Adam (AS). It then recounts the favors bestowed upon Bani Israel and their repeated disobedience.'
        },
        smallAmol: { bn: 'আজ রাতে ১ জনের জন্য মনে মনে দোয়া করুন', en: 'Make dua for one person in your heart tonight' },
        reflectionQ: { bn: 'আজ রাতে কুরআনের কোন কথাটি আপনার হৃদয়ে লেগেছে?', en: 'What touched your heart from tonight\'s Quran?' },
        uxTask: { bn: '৩টি থিম + ৩টি শব্দ জানুন; তারাবীহ শেষে ১টি প্রশ্নের উত্তর দিন', en: 'Learn 3 themes + 3 words; answer 1 question after Taraweeh' }
    },
    {
        day: 1, juz: 'mid-Juz 2 to Juz 3', hizbRange: '4-6', phase: 'intensive',
        themes: {
            bn: ['কিবলা পরিবর্তন', 'সবরের নির্দেশ', 'ব্যয়ের নীতি'],
            en: ['Change of Qiblah', 'Command of Patience', 'Principles of Spending']
        },
        keyWords: {
            bn: ['সবর', 'ইনফাক', 'কিবলা'],
            en: ['Sabr', 'Infaq', 'Qiblah']
        },
        featuredAyah: {
            bn: { text: 'হে মুমিনগণ! তোমরা ধৈর্য ও সালাতের মাধ্যমে সাহায্য প্রার্থনা কর।', surah: 'সূরা বাকারা', ayahNum: '২:১৫৩' },
            en: { text: 'O believers! Seek help through patience and prayer.', surah: 'Al-Baqarah', ayahNum: '2:153' }
        },
        extraAyats: [
            {
                bn: { text: 'হে মুমিনগণ! তোমাদের ওপর রোজা ফরজ করা হয়েছে, যেমন তোমাদের পূর্ববর্তীদের ওপর করা হয়েছিল।', surah: 'সূরা বাকারা', ayahNum: '২:১৮৩' },
                en: { text: 'O you who have believed, decreed upon you is fasting as it was decreed upon those before you.', surah: 'Al-Baqarah', ayahNum: '2:183' }
            },
            {
                bn: { text: 'আল্লাহ ছাড়া কোন ইলাহ নেই, তিনি চিরঞ্জীব, সর্বসত্তার ধারক।', surah: 'সূরা বাকারা', ayahNum: '২:২৫৫' },
                en: { text: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence.', surah: 'Al-Baqarah', ayahNum: '2:255' }
            }
        ],
        juzSummary: {
            bn: 'এই অংশে কিবলা পরিবর্তন, সবর ও নামাজের মাধ্যমে আল্লাহর সাহায্য প্রার্থনা, রমজানের রোজার বিধান এবং হজ্জের আলোচনা রয়েছে। এছাড়াও আয়াতুল কুরসীর মাধ্যমে আল্লাহর মহত্ব এবং দ্বীনের ব্যাপারে জবরদস্তি না থাকার ঘোষণা দেওয়া হয়েছে।',
            en: 'This part covers the change of Qibla, seeking help through patience and prayer, the obligation of fasting in Ramadan, and Hajj rituals. It also features Ayatul Kursi which declares Allah\'s greatness and the principle of no compulsion in religion.'
        },
        smallAmol: { bn: 'আজ রাতের পড়ার ১টি আয়াতের বাংলা অর্থ পড়ুন', en: 'Read the meaning of 1 ayah from tonight\'s juz' },
        reflectionQ: { bn: 'সবর কিভাবে আপনার দৈনন্দিন জীবনে প্রয়োগ করতে পারেন?', en: 'How can you apply patience in your daily life?' },
        uxTask: { bn: 'আজ রাতের পড়ার ১টি আয়াতের বাংলা অর্থ পড়ুন', en: 'Read Bengali meaning of 1 ayah from tonight\'s juz' }
    },
    {
        day: 2, juz: 'Juz 4 to mid-Juz 5', hizbRange: '7-9', phase: 'intensive',
        themes: {
            bn: ['আলে ইমরানের পরিবার', 'উহুদের শিক্ষা', 'ঐক্যের আহ্বান'],
            en: ['Family of Imran', 'Lessons from Uhud', 'Call for Unity']
        },
        keyWords: {
            bn: ['তাওয়াক্কুল', 'সবর', 'ঐক্য'],
            en: ['Tawakkul', 'Sabr', 'Unity']
        },
        featuredAyah: {
            bn: { text: 'তোমরা সবাই মিলে আল্লাহর রজ্জুকে আঁকড়ে ধরো এবং পরস্পর বিচ্ছিন্ন হয়ো না।', surah: 'সূরা আলে ইমরান', ayahNum: '৩:১০৩' },
            en: { text: 'Hold firmly to the rope of Allah all together and do not become divided.', surah: 'Aal-Imran', ayahNum: '3:103' }
        },
        extraAyats: [
            {
                bn: { text: 'তোমরা কখনো পুণ্য লাভ করতে পারবে না যতক্ষণ না তোমরা যা ভালোবাসো তা থেকে ব্যয় করো।', surah: 'সূরা আলে ইমরান', ayahNum: '৩:৯২' },
                en: { text: 'Never will you attain the good [reward] until you spend from that which you love.', surah: 'Aal-Imran', ayahNum: '3:92' }
            },
            {
                bn: { text: 'আল্লাহর রহমতেই আপনি তাদের প্রতি কোমল হয়েছিলেন।', surah: 'সূরা আলে ইমরান', ayahNum: '৩:১৫৯' },
                en: { text: 'So by mercy from Allah, you were lenient with them.', surah: 'Aal-Imran', ayahNum: '3:159' }
            }
        ],
        juzSummary: {
            bn: 'সূরা আলে ইমরানে মরিয়ম (আঃ) ও ঈসা (আঃ) এর কাহিনী, উহুদ যুদ্ধের শিক্ষা এবং মুসলিম উম্মাহর ঐক্যের ওপর জোর দেওয়া হয়েছে। এখানে ঈমানের দৃঢ়তা এবং আল্লাহর পথে জান-মাল কুরবানি করার অনুপ্রেরণা দেওয়া হয়েছে।',
            en: 'Surah Aal-Imran discusses the stories of Maryam (AS) and Isa (AS), the lessons from the Battle of Uhud, and emphasizes the unity of the Muslim Ummah. It provides inspiration for firmness in faith and spending for Allah\'s sake.'
        },
        smallAmol: { bn: 'তারাবীহ শেষে ১ বাক্যে লিখুন "আজ কী বুঝলাম"', en: 'Write in 1 sentence: "What I understood today"' },
        reflectionQ: { bn: 'আজ রাতে শোনা কুরআন থেকে ১টি শিক্ষা কী?', en: 'What is one lesson from tonight\'s Quran?' },
        uxTask: { bn: 'তারাবীহ শেষে ১ বাক্যে "আজ কী বুঝলাম" লিখুন', en: 'After Taraweeh, write "What I understood" in 1 sentence' }
    },
    {
        day: 3, juz: 'mid-Juz 5 to Juz 6', hizbRange: '10-12', phase: 'intensive',
        themes: {
            bn: ['নারীর অধিকার', 'এতিমের সম্পদ', 'ন্যায়বিচার'],
            en: ['Women\'s Rights', 'Orphans\' Wealth', 'Justice']
        },
        keyWords: {
            bn: ['আদল', 'ইহসান', 'আমানত'],
            en: ['Adl (Justice)', 'Ihsan', 'Amanah (Trust)']
        },
        featuredAyah: {
            bn: { text: 'নিশ্চয়ই আল্লাহ তোমাদের আদেশ দিচ্ছেন আমানতসমূহ তার হকদারদের কাছে পৌঁছে দিতে।', surah: 'সূরা নিসা', ayahNum: '৪:৫৮' },
            en: { text: 'Indeed, Allah commands you to render trusts to whom they are due.', surah: 'An-Nisa', ayahNum: '4:58' }
        },
        extraAyats: [
            {
                bn: { text: 'পুরুষদের জন্য নির্ধারিত অংশ রয়েছে যা পিতামাতা ও নিকটাত্মীয়রা রেখে যায়... এবং নারীদের জন্যও।', surah: 'সূরা নিসা', ayahNum: '৪:৭' },
                en: { text: 'For men is a share of what the parents and close relatives leave... and for women.', surah: 'An-Nisa', ayahNum: '4:7' }
            },
            {
                bn: { text: 'যারা ঈমান এনেছে ও নেক কাজ করেছে, তাদের আমি প্রবেশ করাব জান্নাতে।', surah: 'সূরা নিসা', ayahNum: '৪:৫৭' },
                en: { text: 'But those who believe and do righteous deeds - We will admit them to gardens.', surah: 'An-Nisa', ayahNum: '4:57' }
            }
        ],
        juzSummary: {
            bn: 'সূরা নিসা প্রধানত পারিবারিক ও সামাজিক জীবনের বিধি-বিধান নিয়ে আলোচনা করে। এতিমদের সম্পদ রক্ষা, নারীদের উত্তরাধিকার এবং ইনসাফ প্রতিষ্ঠার নির্দেশ দেওয়া হয়েছে। মানুষের অধিকার আদায়ে সচেতন হওয়ার আহ্বান জানানো হয়েছে।',
            en: 'Surah An-Nisa focuses on social and family laws. It commands protecting the wealth of orphans, establishing inheritance for women, and upholding justice in all matters of life.'
        },
        smallAmol: { bn: '৩টি শব্দের মধ্যে ১টি বেছে "আজ ব্যবহার করবো"', en: 'Pick 1 of the 3 keywords to practice today' },
        reflectionQ: { bn: 'আমানতদারিতা কিভাবে আপনার জীবনে আরো বাড়াতে পারেন?', en: 'How can you increase trustworthiness in your life?' },
        uxTask: { bn: '৩টি শব্দের মধ্যে ১টি বেছে "আজ ব্যবহার করবো"', en: 'Choose 1 of 3 words & commit to using it today' }
    },
    {
        day: 4, juz: 'Juz 7 to mid-Juz 8', hizbRange: '13-15', phase: 'intensive',
        themes: {
            bn: ['মায়িদা—চুক্তির বিধান', 'হালাল-হারাম', 'ইবরাহিমের পরীক্ষা'],
            en: ['Maidah—Laws of Covenant', 'Halal & Haram', 'Trial of Ibrahim']
        },
        keyWords: {
            bn: ['আহদ (চুক্তি)', 'হালাল', 'শোকর'],
            en: ['Ahd (Covenant)', 'Halal', 'Shukr']
        },
        featuredAyah: {
            bn: { text: 'হে মুমিনগণ! তোমরা অঙ্গীকারসমূহ পূর্ণ কর।', surah: 'সূরা মায়িদা', ayahNum: '৫:১' },
            en: { text: 'O believers! Fulfill your obligations.', surah: 'Al-Ma\'idah', ayahNum: '5:1' }
        },
        extraAyats: [
            {
                bn: { text: 'পুণ্য ও তাকওয়ার কাজে একে অপরকে সাহায্য কর, এবং পাপ ও সীমালঙ্ঘনের কাজে সহযোগিতা করো না।', surah: 'সূরা মায়িদা', ayahNum: '৫:২' },
                en: { text: 'Cooperate in righteousness and piety, but do not cooperate in sin and aggression.', surah: 'Al-Ma\'idah', ayahNum: '5:2' }
            },
            {
                bn: { text: 'আজ তোমাদের জন্য তোমাদের দ্বীন পূর্ণ করলাম এবং তোমাদের ওপর আমার নেয়ামত সম্পূর্ণ করলাম।', surah: 'সূরা মায়িদা', ayahNum: '৫:৩' },
                en: { text: 'This day I have perfected for you your religion and completed My favor upon you.', surah: 'Al-Ma\'idah', ayahNum: '5:3' }
            }
        ],
        juzSummary: {
            bn: 'সূরা মায়িদায় হালাল-হারাম খাদ্যের বিস্তারিত তালিকা, অঙ্গীকার পূর্ণ করার নির্দেশ এবং দ্বীনের পূর্ণতা ঘোষণা করা হয়েছে। পরবর্তী অংশে ইব্রাহিম (আঃ) এর মাধ্যমে তাওহীদের দাওয়াতের গুরুত্ব তুলে ধরা হয়েছে।',
            en: 'Surah Al-Ma\'idah details the laws of Halal and Haram food, commands fulfilling covenants, and declares the completion of the religion. It also emphasizes the call to Tawhid through the example of Ibrahim (AS).'
        },
        smallAmol: { bn: '১টি দোয়া কপি/সেভ করুন যা আজ রাতে পড়বেন', en: 'Save 1 dua to recite tonight' },
        reflectionQ: { bn: 'আল্লাহর সাথে আমার চুক্তি (আহদ) কতটুকু পালন করছি?', en: 'How well am I fulfilling my covenant with Allah?' },
        uxTask: { bn: '১টি দোয়া কপি/সেভ করুন', en: 'Copy/save 1 dua' }
    },
    {
        day: 5, juz: 'mid-Juz 8 to Juz 9', hizbRange: '16-18', phase: 'intensive',
        themes: {
            bn: ['আনআম—তাওহিদের যুক্তি', 'আরাফ—আদম ও ইবলিস', 'পূর্ববর্তী উম্মতদের শিক্ষা'],
            en: ['An\'am—Arguments for Tawhid', 'A\'raf—Adam & Iblis', 'Lessons from Past Nations']
        },
        keyWords: {
            bn: ['তাওহিদ', 'ফিতনা', 'তাওবা'],
            en: ['Tawhid', 'Fitnah', 'Tawbah']
        },
        featuredAyah: {
            bn: { text: 'তোমরা প্রকাশ্যে ও গোপনে পাপকাজ পরিত্যাগ কর।', surah: 'সূরা আনআম', ayahNum: '৬:১২০' },
            en: { text: 'Leave sin, whether outward or inward.', surah: 'Al-An\'am', ayahNum: '6:120' }
        },
        extraAyats: [
            {
                bn: { text: 'নিশ্চয়ই আমার সালাত, আমার কোরবানি, আমার জীবন ও মৃত্যু জগতসমূহের রব আল্লাহর জন্য।', surah: 'সূরা আনআম', ayahNum: '৬:১৬২' },
                en: { text: 'Say: Indeed, my prayer, my rites of sacrifice, my living and my dying are for Allah, Lord of the worlds.', surah: 'Al-An\'am', ayahNum: '6:162' }
            },
            {
                bn: { text: 'যখন কুরআন পাঠ করা হয়, তখন মনোযোগ দিয়ে শোনো এবং চুপ থাকো যাতে তোমাদের ওপর রহমত বর্ষিত হয়।', surah: 'সূরা আরাফ', ayahNum: '৭:২০৪' },
                en: { text: 'And when the Quran is recited, then listen to it and be silent that you may receive mercy.', surah: 'Al-A\'raf', ayahNum: '7:204' }
            }
        ],
        juzSummary: {
            bn: 'সূরা আনআমে শিরকের অসারতা ও তাওহীদের প্রমাণ দেওয়া হয়েছে। সূরা আরাফে আদম (আঃ) ও ইবলিসের দ্বন্দ্ব এবং মূসা (আঃ) সহ অন্যান্য নবীদের মাধ্যমে পূর্ববর্তী জাতিদের উত্থান-পতনের শিক্ষণীয় কাহিনী বর্ণিত হয়েছে।',
            en: 'Surah Al-An\'am provides logical arguments for Tawhid and against Shirk. Surah Al-A\'raf recounts the conflict between Adam (AS) and Iblis, and lessons from previous nations and their prophets like Musa (AS).'
        },
        smallAmol: { bn: 'আজকের থিম থেকে ১টি ছোট আমল ঠিক করুন', en: 'Pick one small deed from today\'s theme' },
        reflectionQ: { bn: 'এই সপ্তাহে কোন গুনাহ/অভ্যাস ছাড়তে পারি?', en: 'What sin/habit can I leave this week?' },
        uxTask: { bn: 'আজকের থিম → ১টি ছোট আমল', en: 'Today\'s theme → 1 small deed' }
    },

    // ═══════════════ PHASE 2: STEADY (Days 6-26, 1 juz/day) ═══════════════
    {
        day: 6, juz: '10', phase: 'steady',
        themes: {
            bn: ['আনফাল—বদরের যুদ্ধ', 'তাওবা—মুনাফিকদের চরিত্র', 'আল্লাহর সাহায্য'],
            en: ['Anfal—Battle of Badr', 'Tawbah—Traits of Hypocrites', 'Allah\'s Help']
        },
        keyWords: { bn: ['নসর (সাহায্য)', 'তাওবা', 'ইখলাস'], en: ['Nasr (Victory)', 'Tawbah', 'Ikhlas'] },
        featuredAyah: {
            bn: { text: 'হে ঈমানদারগণ! তোমরা আল্লাহ ও তাঁর রাসূলের আহ্বানে সাড়া দাও।', surah: 'সূরা আনফাল', ayahNum: '৮:২৪' },
            en: { text: 'O believers! Respond to Allah and His Messenger when He calls you.', surah: 'Al-Anfal', ayahNum: '8:24' }
        },
        extraAyats: [
            {
                bn: { text: 'আল্লাহ্ মুমিনদের ওয়াদা দিয়েছেন জান্নাতের যার তলদেশে নহর প্রবাহিত।', surah: 'সূরা তাওবা', ayahNum: '৯:৭২' },
                en: { text: 'Allah has promised the believers gardens beneath which rivers flow.', surah: 'At-Tawbah', ayahNum: '9:72' }
            },
            {
                bn: { text: 'আর জেনে রাখো তোমাদের ধন-সম্পদ ও সন্তানসন্ততি তোমাদের জন্য এক পরীক্ষা।', surah: 'সূরা আনফাল', ayahNum: '৮:২৮' },
                en: { text: 'And know that your properties and your children are but a trial.', surah: 'Al-Anfal', ayahNum: '8:28' }
            }
        ],
        juzSummary: {
            bn: 'সূরা আনফালে বদর যুদ্ধের প্রেক্ষাপটে বিজয় ও গণিমতের বিধান আলোচিত হয়েছে। সূরা তাওবায় মুনাফিকদের শঠতা এবং যারা আল্লাহর পথে সংগ্রাম করে তাদের জন্য সুসংবাদ দেওয়া হয়েছে। এখানে সত্যিকারের তাওবা ও ইখলাসের গুরুত্ব বর্ণিত।',
            en: 'Surah Al-Anfal discusses victory and rulings of war in the context of Badr. Surah At-Tawbah highlights the traits of hypocrites and the rewards for those who struggle for Allah, emphasizing sincere repentance and sincerity.'
        },
        smallAmol: { bn: '৫ মিনিটে আজকের পড়ার ১ প্যারা সারাংশ পড়ুন', en: 'Read a 1-paragraph summary of today\'s juz in 5 min' },
        reflectionQ: { bn: 'আল্লাহর ডাকে সাড়া দেওয়ার ক্ষেত্রে আমি কোথায়?', en: 'Where am I in responding to Allah\'s call?' },
        uxTask: { bn: '৫ মিনিটে ১ প্যারা সারাংশ + ১টি হাদিস', en: '5 min: 1 paragraph summary + 1 hadith' }
    },
    {
        day: 7, juz: '11', phase: 'steady',
        themes: {
            bn: ['তাওবা—সদকার ফজিলত', 'ইউনুসের কাহিনী', 'ঈমানের পরীক্ষা'],
            en: ['Tawbah—Virtue of Charity', 'Story of Yunus', 'Tests of Faith']
        },
        keyWords: { bn: ['সদকা', 'সবর', 'ঈমান'], en: ['Sadaqah', 'Sabr', 'Iman'] },
        featuredAyah: {
            bn: { text: 'নিশ্চয়ই আল্লাহর অলিদের কোন ভয় নেই এবং তারা চিন্তিতও হবে না।', surah: 'সূরা ইউনুস', ayahNum: '১০:৬২' },
            en: { text: 'Indeed, the allies of Allah — there is no fear for them, nor will they grieve.', surah: 'Yunus', ayahNum: '10:62' }
        },
        extraAyats: [
            {
                bn: { text: 'বলুন, আল্লাহর রহমত ও অনুগ্রহে যেন তারা আনন্দ প্রকাশ করে।', surah: 'সূরা ইউনুস', ayahNum: '১০:৫৮' },
                en: { text: 'Say, "In the bounty of Allah and in His mercy - in that let them rejoice."', surah: 'Yunus', ayahNum: '10:58' }
            },
            {
                bn: { text: 'আল্লাহই তোমাদের ওপর কষ্ট লাঘব করতে চান, এবং মানুষকে দুর্বল করে সৃষ্টি করা হয়েছে।', surah: 'সূরা নিসা', ayahNum: '৪:২৮' },
                en: { text: 'And Allah wants to lighten for you [your difficulties]; and mankind was created weak.', surah: 'An-Nisa', ayahNum: '4:28' }
            }
        ],
        juzSummary: {
            bn: 'এই অংশে সূরা ইউনুসের মাধ্যমে প্রকাশ করা হয়েছে যে, মানুষের হেদায়েতের জন্য কুরআনই শ্রেষ্ঠ নিয়ামত। আল্লাহর অলী হওয়া ও তাঁর নৈকট্য লাভের উপায় আলোচনা করা হয়েছে। ধৈর্য ও ঈমানের পরীক্ষার প্রয়োজনীয়তাও এখানে আলোচিত।',
            en: 'This section emphasizes through Surah Yunus that the Quran is the greatest blessing for guidance. It discusses the path to becoming an "Ally of Allah" and the necessity of tests in faith and patience.'
        },
        smallAmol: { bn: '১টি আয়াতের বাংলা অর্থ পড়ে ১টি টেকঅ্যাওয়ে লিখুন', en: 'Read 1 ayah meaning + write 1 takeaway' },
        reflectionQ: { bn: 'আল্লাহর অলি হওয়ার জন্য আমার কী করা দরকার?', en: 'What do I need to do to be among Allah\'s allies?' },
        uxTask: { bn: '১টি আয়াত—বাংলা অর্থ + ১টি টেকঅ্যাওয়ে', en: '1 ayah meaning + 1 takeaway' }
    },
    {
        day: 8, juz: '12', phase: 'steady',
        themes: {
            bn: ['হুদের কাহিনী', 'ইউসুফের কাহিনীর সূচনা', 'ইস্তেগফারের শক্তি'],
            en: ['Story of Hud', 'Beginning of Yusuf\'s Story', 'Power of Istighfar']
        },
        keyWords: { bn: ['ইস্তেগফার', 'সবর', 'তাওয়াক্কুল'], en: ['Istighfar', 'Sabr', 'Tawakkul'] },
        featuredAyah: {
            bn: { text: 'তোমরা তোমাদের রবের কাছে ক্ষমা চাও... তিনি আকাশ থেকে তোমাদের ওপর বৃষ্টি পাঠাবেন।', surah: 'সূরা হুদ', ayahNum: '১১:৫২' },
            en: { text: 'Ask forgiveness of your Lord... He will send rain upon you in abundance.', surah: 'Hud', ayahNum: '11:52' }
        },
        extraAyats: [
            {
                bn: { text: 'নিশ্চয়ই আল্লাহ সবরের সাথে আছেন এবং পুণ্যার্থীদের কাজের বিনিময় বিনষ্ট করেন না।', surah: 'সূরা হুদ', ayahNum: '১১:১১৫' },
                en: { text: 'And be patient, for indeed, Allah does not allow to be lost the reward of those who do good.', surah: 'Hud', ayahNum: '11:115' }
            },
            {
                bn: { text: 'নিশ্চয়ই আমরাই এই উপদেশ (কুরআন) নাযিল করেছি এবং আমরাই এর রক্ষক।', surah: 'সূরা হিজর', ayahNum: '১৫:৯' },
                en: { text: 'Indeed, it is We who sent down the message [i.e., the Quran] and indeed, We will be its guardian.', surah: 'Al-Hijr', ayahNum: '15:9' }
            }
        ],
        juzSummary: {
            bn: 'সূরা হুদে পূর্ববর্তী নবীদের কাহিনী থেকে শিক্ষা নিতে বলা হয়েছে। দ্বিতীয় অংশে সূরা ইউসুফের সূচনা হয়েছে, যাকে কুরআনের "শ্রেষ্ঠ কাহিনী" বলা হয়। এখানে ইউসুফ (আঃ) এর স্বপ্ন ও তাঁর ভাইদের হিংসার ঘটনা বর্ণিত।',
            en: 'Surah Hud urges learning from the stories of earlier prophets. The second part introduces Surah Yusuf, the "Best of Stories," starting with Yusuf (AS)\'s dream and his brothers\' jealousy.'
        },
        smallAmol: { bn: 'তারাবীহতে ৩টি থিমের কোনটা বেশি অনুভব করলেন—ট্যাপ করুন', en: 'Which of 3 themes resonated most? Tap it.' },
        reflectionQ: { bn: 'ইস্তেগফার কি আমার দৈনন্দিন অভ্যাস?', en: 'Is istighfar part of my daily routine?' },
        uxTask: { bn: 'শুনে ট্যাপ: ৩টি থিমের কোনটা বেশি লাগলো?', en: 'Listen & tap: which of 3 themes resonated?' }
    },
    {
        day: 9, juz: '13', phase: 'steady',
        themes: {
            bn: ['ইউসুফের কাহিনী—ক্ষমা', 'রাদ—আল্লাহর নিদর্শন', 'অন্তরের প্রশান্তি'],
            en: ['Yusuf—Forgiveness', 'Ra\'d—Signs of Allah', 'Tranquility of Heart']
        },
        keyWords: { bn: ['সবর', 'মাগফিরাত', 'যিকির'], en: ['Sabr', 'Maghfirat', 'Dhikr'] },
        featuredAyah: {
            bn: { text: 'জেনে রেখো, আল্লাহর স্মরণেই অন্তরসমূহ প্রশান্তি লাভ করে।', surah: 'সূরা রাদ', ayahNum: '১৩:২৮' },
            en: { text: 'Verily, in the remembrance of Allah do hearts find rest.', surah: 'Ar-Ra\'d', ayahNum: '13:28' }
        },
        extraAyats: [
            {
                bn: { text: 'ইউসুফ বললেন, আজ তোমাদের বিরুদ্ধে কোনো অভিযোগ নেই। আল্লাহ তোমাদের ক্ষমা করুন।', surah: 'সূরা ইউসুফ', ayahNum: '১২:৯২' },
                en: { text: 'He said, "No blame will there be upon you today. Allah will forgive you."', surah: 'Yusuf', ayahNum: '12:92' }
            },
            {
                bn: { text: 'নিশ্চয়ই আল্লাহ কোনো জাতির অবস্থা পরিবর্তন করেন না যতক্ষণ না তারা নিজেদের পরিবর্তন করে।', surah: 'সূরা রাদ', ayahNum: '১৩:১১' },
                en: { text: 'Indeed, Allah will not change the condition of a people until they change what is in themselves.', surah: 'Ar-Ra\'d', ayahNum: '13:11' }
            }
        ],
        juzSummary: {
            bn: 'সূরা ইউসুফের সমাপ্তিতে দেখা যায় কীভাবে তিনি তাঁর ভাইদের ক্ষমা করে দেন, যা উদাত্ত হৃদয়ের প্রতীক। সূরাবাদে প্রাকৃতিক পরিবর্তনের মাধ্যমে আল্লাহর কুদরত এবং যিকিরের মাধ্যমে প্রশান্তি পাওয়ার কথা আলোচিত হয়েছে।',
            en: 'The conclusion of Surah Yusuf showcases his noble forgiveness of his brothers. Surah Ar-Ra\'d discusses Allah\'s power through natural phenomena and finding tranquility through His remembrance.'
        },
        smallAmol: { bn: 'তারাবীহের পর ২ মিনিট চুপ করে যিকির করুন', en: '2 min silent dhikr after Taraweeh' },
        reflectionQ: { bn: 'আমার অন্তর কিসে প্রশান্তি পায়?', en: 'What brings peace to my heart?' },
        uxTask: { bn: 'তারাবীহ-পর ২ মিনিট রিফ্লেকশন', en: '2 min post-Taraweeh reflection' }
    },
    {
        day: 10, juz: '14', phase: 'steady',
        themes: {
            bn: ['ইবরাহিমের দোয়া', 'হিজর—শয়তানের চক্রান্ত', 'নাহল—আল্লাহর নিয়ামত'],
            en: ['Ibrahim\'s Dua', 'Hijr—Satan\'s Plot', 'Nahl—Allah\'s Blessings']
        },
        keyWords: { bn: ['শোকর', 'নিয়ামত', 'দোয়া'], en: ['Shukr', 'Ni\'mah', 'Dua'] },
        featuredAyah: {
            bn: { text: 'যদি তোমরা আল্লাহর নিয়ামত গণনা কর, তবে তা গুনে শেষ করতে পারবে না।', surah: 'সূরা ইবরাহিম', ayahNum: '১৪:৩৪' },
            en: { text: 'If you tried to count Allah\'s blessings, you would never be able to number them.', surah: 'Ibrahim', ayahNum: '14:34' }
        },
        extraAyats: [
            {
                bn: { text: 'যদি তোমরা কৃতজ্ঞতা স্বীকার কর, তবে আমি তোমাদেরকে আরও দেব।', surah: 'সূরা ইবরাহিম', ayahNum: '১৪:৭' },
                en: { text: 'If you are grateful, I will surely increase you [in favor].', surah: 'Ibrahim', ayahNum: '14:7' }
            },
            {
                bn: { text: 'নিশ্চয় আল্লাহ ন্যায়পরায়ণতা, সদাচরণ এবং নিকটাত্মীয়দের দান করার আদেশ দেন।', surah: 'সূরা নাহল', ayahNum: '১৬:৯০' },
                en: { text: 'Indeed, Allah orders justice and good conduct and giving to relatives.', surah: 'An-Nahl', ayahNum: '16:90' }
            }
        ],
        juzSummary: {
            bn: 'সূরা ইবরাহিমে ইবরাহিম (আঃ) এর আবেগঘন দোয়া ও কৃতজ্ঞতার গুরুত্ব বর্ণিত হয়েছে। সূরা হিজরে শয়তানের চ্যালেঞ্জ ও মানুষের শ্রেষ্ঠত্বের কথা বলা হয়েছে। সূরা নাহল আল্লাহর অসংখ্য নেয়ামত—মৌমাছি, বৃষ্টি ও প্রকৃতির নিদর্শনের বর্ণনায় ভরপুর।',
            en: 'Surah Ibrahim features Ibrahim (AS)\'s emotional prayer and the importance of gratitude. Surah Al-Hijr discusses Satan\'s challenge and human excellence. Surah An-Nahl is filled with Allah\'s countless blessings in nature, honeybees, and rain.'
        },
        smallAmol: { bn: 'আজকের ৩টি শব্দের ১টি নিয়ে দোয়া করুন', en: 'Make dua using 1 of today\'s 3 keywords' },
        reflectionQ: { bn: 'আজ আল্লাহর কোন নিয়ামতের জন্য কৃতজ্ঞ?', en: 'Which blessing of Allah am I grateful for today?' },
        uxTask: { bn: 'আজকের ৩টি শব্দের ১টি নিয়ে দোয়া করুন', en: 'Make dua using 1 of 3 keywords' }
    },
    {
        day: 11, juz: '15', phase: 'steady',
        themes: {
            bn: ['বনী ইসরাইল—ইসরা ও মিরাজ', 'কাহফ—৪টি মহান কাহিনী', 'দুনিয়ার পরীক্ষা'],
            en: ['Bani Israel—Isra & Miraj', 'Kahf—4 Great Stories', 'Tests of Dunya']
        },
        keyWords: { bn: ['ফিতনা', 'ইলম', 'সবর'], en: ['Fitnah', 'Ilm', 'Sabr'] },
        featuredAyah: {
            bn: { text: 'এবং বলো: হে আমার রব! আমার জ্ঞান বৃদ্ধি করে দিন।', surah: 'সূরা ত্বহা', ayahNum: '২০:১১৪' },
            en: { text: 'And say: My Lord, increase me in knowledge.', surah: 'Taha', ayahNum: '20:114' }
        },
        extraAyats: [
            {
                bn: { text: 'তোমার প্রতিপালক আদেশ দিচ্ছেন যে, তোমরা তাকে ছাড়া অন্য কারো ইবাদত করো না এবং পিতা-মাতার সাথে সদাচরণ কর।', surah: 'সূরা বনী ইসরাইল', ayahNum: '১৭:২৩' },
                en: { text: 'And your Lord has decreed that you not worship except Him, and to parents, good treatment.', surah: 'Al-Isra', ayahNum: '17:23' }
            },
            {
                bn: { text: 'ধন-সম্পদ ও সন্তানসন্ততি দুনিয়ার জীবনের শোভা, কিন্তু নেক কাজই রবের কাছে উত্তম।', surah: 'সূরা কাহফ', ayahNum: '১৮:৪৬' },
                en: { text: 'Wealth and children are [but] adornment of the worldly life. But the enduring good deeds are better to your Lord.', surah: 'Al-Kahf', ayahNum: '18:46' }
            }
        ],
        juzSummary: {
            bn: 'সূরা বনী ইসরাঈল শুরু হয় মিরাজের অলৌকিক ভ্রমণের মাধ্যমে। এখানে পিতা-মাতার অধিকার ও সামাজিক আদব নৈতিকতার নির্দেশ দেওয়া হয়েছে। সূরা কাহফে আসহাবে কাহফের ঈমান রক্ষার কাহিনী দুনিয়ার মোহ থেকে বাঁচার শিক্ষা দেয়।',
            en: 'Surah Al-Isra begins with the miraculous journey of Miraj. It establishes parental rights and social etiquette. Surah Al-Kahf\'s story of the People of the Cave teaches how to protect faith from worldly deceptions.'
        },
        smallAmol: { bn: 'আজ কী কঠিন লাগলো—১ বাক্যে লিখুন', en: 'What felt difficult today? Write 1 sentence.' },
        reflectionQ: { bn: 'সূরা কাহফের ৪ কাহিনীর কোনটা আমার জীবনের সাথে মেলে?', en: 'Which of Kahf\'s 4 stories relates to my life?' },
        uxTask: { bn: 'আজ কী কঠিন লাগলো—১ বাক্যে লিখুন', en: 'Write what felt difficult in 1 sentence' }
    },
    {
        day: 12, juz: '16', phase: 'steady',
        themes: {
            bn: ['কাহফ—জুলকারনাইন', 'মারিয়ম—ঈসা ও ইবরাহিম', 'ত্বহা—মূসার কাহিনী'],
            en: ['Kahf—Dhul-Qarnayn', 'Maryam—Isa & Ibrahim', 'Taha—Story of Musa']
        },
        keyWords: { bn: ['ইখলাস', 'আদব', 'সবর'], en: ['Ikhlas', 'Adab', 'Sabr'] },
        featuredAyah: {
            bn: { text: 'আমি তোমাকে আমার নিজের জন্য বেছে নিয়েছি।', surah: 'সূরা ত্বহা', ayahNum: '২০:৪১' },
            en: { text: 'And I have chosen you for Myself.', surah: 'Taha', ayahNum: '20:41' }
        },
        extraAyats: [
            {
                bn: { text: 'তিনি বললেন, হে আমার প্রতিপালক! আমার বক্ষ প্রশস্ত করে দিন এবং আমার কাজ সহজ করে দিন।', surah: 'সূরা ত্বহা', ayahNum: '২০:২৫-২৬' },
                en: { text: 'He said, "My Lord, expand for me my breast [with assurance] and ease for me my task."', surah: 'Taha', ayahNum: '20:25-26' }
            },
            {
                bn: { text: 'যাতে আমি তোমাকে অধিক পবিত্রতা দান করি।', surah: 'সূরা মারইয়াম', ayahNum: '১৯:১৯' },
                en: { text: 'That I may give to you a pure boy.', surah: 'Maryam', ayahNum: '19:19' }
            }
        ],
        juzSummary: {
            bn: 'সূরা কাহফের সমাপ্তিতে জুলকারনাইন ও মুসা-খিজিরের কাহিনী বর্ণিত। সূরা মারইয়ামে মরিয়ম, জাকারিয়া ও ঈসা (আঃ) এর অপূর্ব কাহিনী বিশ্বাসের শক্তি যোগায়। সূরা ত্বহা মুসা (আঃ) এর প্রতি আল্লাহর সরাসরি সম্বোধন ও নবুয়তের ভার অর্পণ নিয়ে শুরু হয়।',
            en: 'The end of Surah Al-Kahf features Dhul-Qarnayn and Musa-Khidr. Surah Maryam strengthens faith through the stories of Maryam, Zakariya, and Isa (AS). Surah Taha highlights Allah\'s direct address to Musa (AS) and the gravity of prophecy.'
        },
        smallAmol: { bn: 'তারাবীহ শেষে ১টি শব্দের অর্থ মনে করার চেষ্টা করুন', en: 'Try to remember the meaning of 1 word after Taraweeh' },
        reflectionQ: { bn: 'মূসা (আঃ) এর দোয়ার মতো আমার আজকের আর্তি কী?', en: 'Like Musa (AS)\'s prayer, what is my plea today?' },
        uxTask: { bn: '১টি শব্দের অর্থ মনে করার চেষ্টা করুন', en: 'Try to remember meaning of 1 word' }
    },
    {
        day: 13, juz: '17', phase: 'steady',
        themes: {
            bn: ['আম্বিয়া—নবীদের কাহিনী', 'হজ—ইবাদতের বিধান', 'কুরবানির দর্শন'],
            en: ['Anbiya—Stories of Prophets', 'Hajj—Worship Rulings', 'Philosophy of Sacrifice']
        },
        keyWords: { bn: ['কুরবানি', 'ইবাদত', 'তাওয়াক্কুল'], en: ['Sacrifice', 'Worship', 'Tawakkul'] },
        featuredAyah: {
            bn: { text: 'প্রতিটি প্রাণী মৃত্যুর স্বাদ গ্রহণ করবে।', surah: 'সূরা আম্বিয়া', ayahNum: '২১:৩৫' },
            en: { text: 'Every soul shall taste death.', surah: 'Al-Anbiya', ayahNum: '21:35' }
        },
        extraAyats: [
            {
                bn: { text: 'আল্লাহর কাছে ওগুলোর (পশুর) গোশত বা রক্ত পৌঁছায় না, বরং তোমাদের তাকওয়া পৌঁছায়।', surah: 'সূরা হজ', ayahNum: '২২:৩৭' },
                en: { text: 'Their meat will not reach Allah, nor will their blood, but what reaches Him is piety from you.', surah: 'Al-Hajj', ayahNum: '22:37' }
            },
            {
                bn: { text: 'আমি দুঃখ ও অস্থিরতা কেবল আল্লাহর কাছেই নিবেদন করছি।', surah: 'সূরা ইউসুফ', ayahNum: '১২:৮৬' },
                en: { text: 'I only complain of my suffering and my grief to Allah.', surah: 'Yusuf', ayahNum: '12:86' }
            }
        ],
        juzSummary: {
            bn: 'সূরা আম্বিয়ায় বিভিন্ন নবীদের সংগ্রামের মাধ্যমে দেখানো হয়েছে যে তারা সবাই এক রবের ইবাদত করেছেন। সূরা হজ-এ হজের বিধান ও কুরবানির প্রকৃত উদ্দেশ্য—তাকওয়া অর্জনের কথা বলা হয়েছে। এটি হাশরের মাঠের ভয়াবহ চিত্র দিয়ে শুরু হয়।',
            en: 'Surah Al-Anbiya showcases through various prophets that they all worshiped one Lord. Surah Al-Hajj clarifies the rulings of Hajj and the true purpose of sacrifice: attaining Taqwa. It begins with a powerful depiction of the Day of Judgment.'
        },
        smallAmol: { bn: 'আজ রাতের পড়ার ১টি থিম পরিবারকে বলুন', en: 'Share 1 theme from tonight\'s juz with family' },
        reflectionQ: { bn: 'মৃত্যুর কথা মনে রাখলে আজকের দিনে কী পরিবর্তন আনবো?', en: 'Remembering death — what will I change today?' },
        uxTask: { bn: 'আজ রাতের পড়া—১টি থিম পরিবারকে বলুন', en: 'Share 1 theme with family' }
    },
    {
        day: 14, juz: '18', phase: 'steady',
        themes: {
            bn: ['মুমিনুন—সফল মুমিনের গুণ', 'নূর—পর্দা ও শালীনতা', 'আল্লাহর নূর'],
            en: ['Mu\'minun—Traits of Successful Believers', 'Nur—Modesty & Hijab', 'Light of Allah']
        },
        keyWords: { bn: ['ফালাহ (সফলতা)', 'হায়া', 'নূর'], en: ['Falah (Success)', 'Haya', 'Nur (Light)'] },
        featuredAyah: {
            bn: { text: 'মুমিনগণ সফলকাম হয়েছে, যারা তাদের সালাতে বিনীত।', surah: 'সূরা মুমিনুন', ayahNum: '২৩:১-২' },
            en: { text: 'Successful indeed are the believers, who are humble in their prayers.', surah: 'Al-Mu\'minun', ayahNum: '23:1-2' }
        },
        extraAyats: [
            {
                bn: { text: 'আল্লাহ আসমান ও জমিনের নূর।', surah: 'সূরা নূর', ayahNum: '২৪:৩৫' },
                en: { text: 'Allah is the Light of the heavens and the earth.', surah: 'An-Nur', ayahNum: '24:35' }
            },
            {
                bn: { text: 'মুমিনদের বলো তাদের দৃষ্টি সংযত করতে এবং তাদের লজ্জাস্থানের হেফাজত করতে।', surah: 'সূরা নূর', ayahNum: '২৪:৩০' },
                en: { text: 'Tell the believing men to reduce [some] of their vision and guard their private parts.', surah: 'An-Nur', ayahNum: '24:30' }
            }
        ],
        juzSummary: {
            bn: 'সূরা মুমিনুন সফল মুমিনদের গুণাবলী বর্ণনা করে। সূরা নূরে পারিবারিক পবিত্রতা, পর্দার বিধান এবং অপবাদের বিরুদ্ধে সতর্ক করা হয়েছে। এখানে আল্লাহর নূর বা হিদায়াতের অনন্য উপমা দেওয়া হয়েছে।',
            en: 'Surah Al-Mu\'minun lists the traits of successful believers. Surah An-Nur establishes guidelines for family purity, modesty, and warns against slandering. It contains the beautiful parable of Allah\'s Light.'
        },
        smallAmol: { bn: 'অর্ধেক পথ! আজ পর্যন্ত কত% সম্পন্ন চেক করুন', en: 'Halfway! Check your progress %' },
        reflectionQ: { bn: '১৫ দিনে আমার নামাজের মান কতটা বেড়েছে?', en: 'How much has my prayer quality improved in 15 days?' },
        uxTask: { bn: 'প্রোগ্রেস চেক: ১৫ দিনে কত%?', en: 'Progress check: what % in 15 days?' }
    },
    {
        day: 15, juz: '19', phase: 'steady',
        themes: {
            bn: ['ফুরকান—সত্য-মিথ্যার পার্থক্য', 'শুআরা—নবীদের সংগ্রাম', 'আল্লাহর বান্দাদের গুণ'],
            en: ['Furqan—Truth vs Falsehood', 'Shu\'ara—Prophets\' Struggle', 'Qualities of Allah\'s Servants']
        },
        keyWords: { bn: ['ফুরকান', 'ইবাদুর রাহমান', 'তাওয়াজু'], en: ['Furqan', 'Ibadur Rahman', 'Humility'] },
        featuredAyah: {
            bn: { text: 'রাহমানের বান্দা তারাই যারা পৃথিবীতে নম্রভাবে চলে।', surah: 'সূরা ফুরকান', ayahNum: '২৫:৬৩' },
            en: { text: 'The servants of the Most Merciful walk upon the earth humbly.', surah: 'Al-Furqan', ayahNum: '25:63' }
        },
        extraAyats: [
            {
                bn: { text: 'বলুন, আমার প্রতিপালক তোমাদের কোনো গুরুত্বই দিতেন না যদি তোমরা তাকে না ডাকতে।', surah: 'সূরা ফুরকান', ayahNum: '২৫:৭৭' },
                en: { text: 'Say, "What would my Lord care for you if not for your supplication?"', surah: 'Al-Furqan', ayahNum: '25:77' }
            },
            {
                bn: { text: 'যে দিন ধন-সম্পদ ও সন্তানসন্ততি কোনো কাজে আসবে না, কেবল সে-ই মুক্তি পাবে যে সুস্থ অন্তর নিয়ে আল্লাহর কাছে উপস্থিত হবে।', surah: 'সূরা শুআরা', ayahNum: '২৬:৮৮-৮৯' },
                en: { text: 'The Day when there will not benefit [anyone] wealth or children, but only one who comes to Allah with a sound heart.', surah: 'Ash-Shu\'ara', ayahNum: '26:88-89' }
            }
        ],
        juzSummary: {
            bn: 'সূরা ফুরকানে কুরআনকে সত্য-মিথ্যার পার্থক্যকারী হিসেবে উল্লেখ করা হয়েছে এবং "ইবাদুর রাহমান" বা পরম করুণাময়ের প্রিয় বান্দাদের গুণাবলী বর্ণিত হয়েছে। সূরা শুআরার মাধ্যমে নবীদের দাওয়াতের অভিন্নতা ও অস্বীকারকারীদের পরিণাম দেখানো হয়েছে।',
            en: 'Surah Al-Furqan labels the Quran as the criterion between truth and falsehood and describes the traits of "Ibadur Rahman." Surah Ash-Shu\'ara highlights the consistent message of all prophets and the consequences for those who rejected them.'
        },
        smallAmol: { bn: 'আজকের পড়ার ১টি আয়াত বুকমার্ক করুন', en: 'Bookmark 1 ayah from today\'s juz' },
        reflectionQ: { bn: 'ইবাদুর রাহমানের কোন গুণটি আমার মধ্যে আছে?', en: 'Which quality of Ibadur Rahman do I have?' },
        uxTask: { bn: 'আজকের পড়া—১টি আয়াত বুকমার্ক', en: 'Bookmark 1 ayah from today\'s juz' }
    },
    {
        day: 16, juz: '20', phase: 'steady',
        themes: {
            bn: ['নামল—সুলাইমান ও পিঁপড়া', 'কাসাস—মূসার শৈশব', 'আল্লাহর কুদরত'],
            en: ['Naml—Sulaiman & Ant', 'Qasas—Musa\'s Childhood', 'Allah\'s Power']
        },
        keyWords: { bn: ['শোকর', 'কুদরত', 'ইলম'], en: ['Shukr', 'Qudrah', 'Ilm'] },
        featuredAyah: {
            bn: { text: 'তোমার রব যাকে ইচ্ছা সৃষ্টি করেন এবং মনোনীত করেন।', surah: 'সূরা কাসাস', ayahNum: '২৮:৬৮' },
            en: { text: 'Your Lord creates what He wills and chooses.', surah: 'Al-Qasas', ayahNum: '28:68' }
        },
        extraAyats: [
            {
                bn: { text: 'সুলাইমান মুচকি হাসলেন এবং বললেন, হে আমার প্রতিপালক! আমাকে সামর্থ্য দিন যাতে আমি আপনার নেয়ামতের কৃতজ্ঞতা প্রকাশ করতে পারি।', surah: 'সূরা নামল', ayahNum: '২৭:১৯' },
                en: { text: 'So [Solomon] smiled, amused at her speech, and said, "My Lord, enable me to be grateful for Your favor."', surah: 'An-Naml', ayahNum: '27:19' }
            },
            {
                bn: { text: 'এবং তিনি যখন পূর্ণ যৌবনে উপনীত হলেন, আমি তাকে প্রজ্ঞা ও জ্ঞান দান করলাম।', surah: 'সূরা কাসাস', ayahNum: '২৮:১৪' },
                en: { text: 'And when he attained his full strength and was mentally mature, We bestowed upon him judgement and knowledge.', surah: 'Al-Qasas', ayahNum: '28:14' }
            }
        ],
        juzSummary: {
            bn: 'সূরা নামলে সুলাইমান (আঃ) ও পিঁপড়ার কাহিনী এবং হুদহুদ পাখির ঘটনা বর্ণিত হয়েছে। সূরা কাসাসে মুসা (আঃ) এর শৈশব, তাঁর হারিয়ে যাওয়া ও পুনরায় মায়ের কাছে ফিরে আসার অলৌকিক ঘটনা রয়েছে। এটি আল্লাহর নিখুঁত পরিকল্পনার প্রমাণ দেয়।',
            en: 'Surah An-Naml features the story of Sulaiman (AS) and the ant, as well as the Hoopoe. Surah Al-Qasas recounts Musa (AS)\'s childhood, being lost and miraculously returned to his mother, showcasing Allah\'s perfect planning.'
        },
        smallAmol: { bn: 'মাইক্রো-তাফসির (২–৩ লাইন) পড়ুন', en: 'Read a micro-tafsir (2-3 lines)' },
        reflectionQ: { bn: 'আল্লাহর কুদরতের কোন নিদর্শন আজ দেখেছি?', en: 'What sign of Allah\'s power did I see today?' },
        uxTask: { bn: 'মাইক্রো-তাফসির (২–৩ লাইন) পড়ুন', en: 'Read a 2-3 line micro-tafsir' }
    },
    {
        day: 17, juz: '21', phase: 'steady',
        themes: {
            bn: ['আনকাবুত—পরীক্ষার দর্শন', 'রুম—সভ্যতার উত্থান-পতন', 'লুকমানের উপদেশ'],
            en: ['Ankabut—Philosophy of Tests', 'Rum—Rise & Fall of Civilizations', 'Luqman\'s Advice']
        },
        keyWords: { bn: ['ফিতনা', 'হিকমা', 'শোকর'], en: ['Fitnah', 'Hikmah', 'Shukr'] },
        featuredAyah: {
            bn: { text: 'হে বৎস! নামাজ কায়েম কর, সৎকাজের আদেশ দাও এবং বিপদে ধৈর্য ধারণ কর।', surah: 'সূরা লুকমান', ayahNum: '৩১:১৭' },
            en: { text: 'O my son! Establish prayer, enjoin good, and be patient with what befalls you.', surah: 'Luqman', ayahNum: '31:17' }
        },
        extraAyats: [
            {
                bn: { text: 'মানুষ কি মনে করে যে "আমরা ঈমান এনেছি" বললেই তাদের পরীক্ষা করা হবে না?', surah: 'সূরা আনকাবুত', ayahNum: '২৯:২' },
                en: { text: 'Do the people think that they will be left to say, "We believe" and they will not be tried?', surah: 'Al-Ankabut', ayahNum: '29:2' }
            },
            {
                bn: { text: 'তাঁর নিদর্শনাবলীর মধ্যে রয়েছে যে, তিনি তোমাদের জন্য তোমাদের মধ্য থেকেই জোড়া সৃষ্টি করেছেন।', surah: 'সূরা রূম', ayahNum: '৩০:২১' },
                en: { text: 'And of His signs is that He created for you from yourselves mates.', surah: 'Ar-Rum', ayahNum: '30:21' }
            }
        ],
        juzSummary: {
            bn: 'সূরা আনকাবুত ঈমানের পরীক্ষার কথা বলে। সূরা রূমে মহাবিশ্ব ও মানবসৃষ্টির নিদর্শনাবলী আলোচিত হয়েছে। সূরা লুকমানে একজন জ্ঞানী পিতার তাঁর সন্তানকে দেওয়া কালজয়ী ১০টি উপদেশ বর্ণিত, যা জীবনের প্রতিটি ক্ষেত্রে প্রযোজ্য।',
            en: 'Surah Al-Ankabut emphasizes that faith is tested. Surah Ar-Rum discusses signs in the universe and human creation. Surah Luqman contains timeless advice from a wise father to his son, applicable to all aspects of life.'
        },
        smallAmol: { bn: 'আজকের শব্দ: ১টি শব্দ-কার্ড নিয়ে ভাবুন', en: 'Today\'s word: reflect on 1 word-card' },
        reflectionQ: { bn: 'লুকমানের কোন উপদেশটি আমার জন্য সবচেয়ে প্রাসঙ্গিক?', en: 'Which advice of Luqman is most relevant to me?' },
        uxTask: { bn: 'আজকের শব্দ: ১টি শব্দ-কার্ড', en: 'Today\'s word: 1 word-card' }
    },
    {
        day: 18, juz: '22', phase: 'steady',
        themes: {
            bn: ['সাজদা—সৃষ্টির পর্যায়', 'আহযাব—নবীর পরিবার', 'আমানত ও দায়িত্ব'],
            en: ['Sajdah—Stages of Creation', 'Ahzab—Prophet\'s Household', 'Trust & Responsibility']
        },
        keyWords: { bn: ['আমানত', 'তাকওয়া', 'রহমত'], en: ['Amanah', 'Taqwa', 'Rahmah'] },
        featuredAyah: {
            bn: { text: 'নিশ্চয়ই আল্লাহ ও তাঁর ফেরেশতাগণ নবীর ওপর দরূদ পাঠান।', surah: 'সূরা আহযাব', ayahNum: '৩৩:৫৬' },
            en: { text: 'Indeed, Allah and His angels send blessings upon the Prophet.', surah: 'Al-Ahzab', ayahNum: '33:56' }
        },
        extraAyats: [
            {
                bn: { text: 'নিশ্চয়ই তোমাদের জন্য আল্লাহর রাসুলের মধ্যে রয়েছে উত্তম আদর্শ।', surah: 'সূরা আহজাব', ayahNum: '৩৩:২১' },
                en: { text: 'There has certainly been for you in the Messenger of Allah an excellent pattern.', surah: 'Al-Ahzab', ayahNum: '33:21' }
            },
            {
                bn: { text: 'হে মানুষ! তোমরা তো আল্লাহর মুখাপেক্ষী, আর আল্লাহ তো অভাবমুক্ত, প্রশংসিত।', surah: 'সূরা ফাতির', ayahNum: '৩৫:১৫' },
                en: { text: 'O mankind, you are those in need of Allah, while Allah is the Free of need, the Praiseworthy.', surah: 'Fatir', ayahNum: '35:15' }
            }
        ],
        juzSummary: {
            bn: 'সূরা আহজাবে খন্দকের যুদ্ধের ঘটনা ও রাসুল (সাঃ) এর আদর্শ নিয়ে আলোচনা করা হয়েছে। সূরা সাজদায় সৃষ্টির পর্যায় ও আখিরাতের কথা বলা হয়েছে। এখানে আমানত ও দায়িত্ব পালনের গুরুত্ব বিশেষভাব বর্ণিত হয়েছে।',
            en: 'Surah Al-Ahzab discusses the Battle of the Trench and the exemplary character of the Prophet (SAW). Surah As-Sajdah highlights the stages of creation and the hereafter. It emphasizes the weight of trust and responsibility.'
        },
        smallAmol: { bn: 'তারাবীহতে রহমত/সবর/তাওবা — কোন থিম বেশি লাগলো?', en: 'In Taraweeh: mercy/patience/repentance — which theme resonated?' },
        reflectionQ: { bn: 'নবীজির ওপর কতবার দরূদ পড়েছি আজ?', en: 'How many times did I send salawat on the Prophet today?' },
        uxTask: { bn: 'শুনে ট্যাপ: রহমত/সবর/তাওবা থিম', en: 'Listen & tap: mercy/patience/repentance theme' }
    },
    {
        day: 19, juz: '23', phase: 'steady',
        themes: {
            bn: ['সাবা—কৃতজ্ঞতা ও অকৃতজ্ঞতা', 'ফাতির—সৃষ্টির রহস্য', 'ইয়াসিন—হৃদয়ের সূরা'],
            en: ['Saba—Gratitude & Ingratitude', 'Fatir—Mysteries of Creation', 'Yasin—Heart of Quran']
        },
        keyWords: { bn: ['শোকর', 'রিজক', 'আখিরাত'], en: ['Shukr', 'Rizq', 'Akhirah'] },
        featuredAyah: {
            bn: { text: 'ইয়াসিন। জ্ঞানপূর্ণ কুরআনের শপথ।', surah: 'সূরা ইয়াসিন', ayahNum: '৩৬:১-২' },
            en: { text: 'Ya-Sin. By the wise Quran.', surah: 'Ya-Sin', ayahNum: '36:1-2' }
        },
        extraAyats: [
            {
                bn: { text: 'দাউদের পরিবার! তোমরা কৃতজ্ঞতা সহকারে কাজ কর। আমার বান্দাদের অল্পই কৃতজ্ঞ।', surah: 'সূরা সাবা', ayahNum: '৩৪:১৩' },
                en: { text: 'Work, O family of David, in gratitude. And few of My servants are grateful.', surah: 'Saba', ayahNum: '34:13' }
            },
            {
                bn: { text: 'নিশ্চয়ই আল্লাহ কোনো জাতির অবস্থা পরিবর্তন করেন না যতক্ষণ না তারা নিজেদের পরিবর্তন করে।', surah: 'সূরা রাদ', ayahNum: '১৩:১১' },
                en: { text: 'Indeed, Allah will not change the condition of a people until they change what is in themselves.', surah: 'Ar-Ra\'d', ayahNum: '13:11' }
            }
        ],
        juzSummary: {
            bn: 'সূরা সাবায় দাউদ (আঃ) ও সুলাইমান (আঃ) এর কৃতজ্ঞতা এবং সাবা জাতির পরিণাম বর্ণিত। সূরা ফাতিরে আল্লাহর সৃষ্টিবৈচিত্র্য ও মানুষের অসহায়ত্বের কথা বলা হয়েছে। সূরা ইয়াসিনে তাওহীদ, হাশর ও রিসালাতের মর্মস্পর্শী বর্ণনা রয়েছে।',
            en: 'Surah Saba contrasts the gratitude of Dawud (AS) and Sulaiman (AS) with the people of Saba. Surah Fatir discusses Allah\'s diverse creation and human dependency. Surah Yasin provides heart-touching descriptions of Tawhid, Resurrection, and Prophethood.'
        },
        smallAmol: { bn: 'তারাবীহ শেষে: ১ জনের জন্য দোয়া লিখুন', en: 'After Taraweeh: write a dua for someone' },
        reflectionQ: { bn: 'কার জন্য দোয়া করতে চাই আজ রাতে?', en: 'Who do I want to make dua for tonight?' },
        uxTask: { bn: 'তারাবীহ শেষে: ১ জনের জন্য দোয়া লিখুন', en: 'After Taraweeh: write dua for 1 person' }
    },
    {
        day: 20, juz: '24', phase: 'steady',
        themes: {
            bn: ['সাফফাত—ফেরেশতাদের ইবাদত', 'সাদ—দাউদের তাওবা', 'জুমার—তাওহিদের সারাংশ'],
            en: ['Saffat—Angels\' Worship', 'Sad—Dawud\'s Repentance', 'Zumar—Essence of Tawhid']
        },
        keyWords: { bn: ['তাওবা', 'ইখলাস', 'তাকদির'], en: ['Tawbah', 'Ikhlas', 'Taqdir'] },
        featuredAyah: {
            bn: { text: 'বলো: হে আমার বান্দারা যারা নিজেদের ওপর অবিচার করেছ! আল্লাহর রহমত থেকে নিরাশ হয়ো না।', surah: 'সূরা জুমার', ayahNum: '৩৯:৫৩' },
            en: { text: 'Say: O My servants who have transgressed! Do not despair of Allah\'s mercy.', surah: 'Az-Zumar', ayahNum: '39:53' }
        },
        extraAyats: [
            {
                bn: { text: 'এবং ফিরফারি তোমাদের রবের দিকে এবং তাঁর কাছে আত্মসমর্পণ কর।', surah: 'সূরা জুমার', ayahNum: '৩৯:৫৪' },
                en: { text: 'And return [in repentance] to your Lord and submit to Him.', surah: 'Az-Zumar', ayahNum: '39:54' }
            },
            {
                bn: { text: 'যারা ঈমান এনেছে এবং সৎকাজ করেছে তাদের জন্য রয়েছে জান্নাতুল ফিরদাউস।', surah: 'সূরা কাহফ', ayahNum: '১৮:১০৭' },
                en: { text: 'Indeed, those who have believed and done righteous deeds - they will have the Gardens of Paradise.', surah: 'Al-Kahf', ayahNum: '18:107' }
            }
        ],
        juzSummary: {
            bn: 'সূরা জুমারে আল্লাহর রহমতের বিশালতা তুলে ধরা হয়েছে, যেখানে বলা হয়েছে কোনো পাপই বড় নয় যদি মানুষ আন্তরিকভাবে তাওবা করে। সূরা সাফফাতে ফেরেশতাদের শৃঙ্খলা ও ইবাদত এবং সূরা সাদে দাউদ ও সুলাইমান (আঃ) এর বিশেষ পরীক্ষা ও আল্লাহমুখী হওয়ার কথা বর্ণিত।',
            en: 'Surah Az-Zumar highlights the vastness of Allah\'s mercy, stating no sin is too big if one sincerely repents. Surah As-Saffat discusses the discipline of angels, and Surah Sad recounts the tests of Dawud and Sulaiman (AS) and their return to Allah.'
        },
        smallAmol: { bn: 'আজকে ১টি সদকা (যেকোনো পরিমাণ) দিন বা ট্র্যাক করুন', en: 'Give or track 1 act of sadaqah today' },
        reflectionQ: { bn: 'আল্লাহর রহমত থেকে কখনো নিরাশ হয়েছি কি?', en: 'Have I ever despaired of Allah\'s mercy?' },
        uxTask: { bn: 'আজকে ১টি সদকা ট্র্যাক', en: 'Track 1 act of sadaqah today' }
    },
    {
        day: 21, juz: '25', phase: 'steady',
        themes: {
            bn: ['গাফির—ফেরাউনের মুমিন', 'ফুসসিলাত—কুরআনের অলৌকিকতা', 'শূরা—পরামর্শের গুরুত্ব'],
            en: ['Ghafir—Pharaoh\'s Believer', 'Fussilat—Miracle of Quran', 'Shura—Importance of Consultation']
        },
        keyWords: { bn: ['শূরা', 'সবর', 'দোয়া'], en: ['Shura', 'Sabr', 'Dua'] },
        featuredAyah: {
            bn: { text: 'ভালো ও মন্দ সমান নয়। মন্দকে ভালো দিয়ে প্রতিহত কর।', surah: 'সূরা ফুসসিলাত', ayahNum: '৪১:৩৪' },
            en: { text: 'Good and evil are not equal. Repel evil with what is best.', surah: 'Fussilat', ayahNum: '41:34' }
        },
        extraAyats: [
            {
                bn: { text: 'যারা তাদের প্রতিপালকের আহ্বানে সাড়া দেয় এবং পরামর্শের মাধ্যমে কাজ করে।', surah: 'সূরা শূরা', ayahNum: '৪২:৩৮' },
                en: { text: 'And those who have responded to their lord and whose affair is [determined by] consultation among themselves.', surah: 'Ash-Shura', ayahNum: '42:38' }
            },
            {
                bn: { text: 'নিশ্চয়ই আমি এটি (কুরআন) এক বরকতময় রাতে নাযিল করেছি।', surah: 'সূরা দুখান', ayahNum: '৪৪:৩' },
                en: { text: 'Indeed, We sent it down during a blessed night.', surah: 'Ad-Dukhan', ayahNum: '44:3' }
            }
        ],
        juzSummary: {
            bn: 'সূরা গাফিরে ফেরাউনের দরবারে একজন গোপন মুমিনের সাহসিকতার কাহিনী বর্ণিত। সূরা ফুসসিলাতে কুরআনের অলৌকিকত্ব ও দ্বীনের পথে অটল থাকার নির্দেশ রয়েছে। সূরা শূরায় মুমিনদের পারস্পরিক পরামর্শের গুরুত্ব ফুটিয়ে তোলা হয়েছে।',
            en: 'Surah Ghafir tells the story of a secret believer in Pharaoh\'s court who spoke the truth. Surah Fussilat highlights the Quran\'s miraculous nature and the call to remain steadfast. Surah Ash-Shura emphasizes the importance of mutual consultation.'
        },
        smallAmol: { bn: 'লাস্ট ১০ নাইটস মোড অন — ফোকাস বাড়ান', en: 'Last 10 Nights mode ON — increase focus' },
        reflectionQ: { bn: 'লাইলাতুল কদরের জন্য আমার প্রস্তুতি কী?', en: 'What is my preparation for Laylatul Qadr?' },
        uxTask: { bn: '"লাস্ট ১০ নাইটস মোড অন" (ফোকাস টগল)', en: '"Last 10 Nights Mode ON" (focus toggle)' }
    },
    {
        day: 22, juz: '26', phase: 'steady',
        themes: {
            bn: ['আহকাফ—পিতামাতার হক', 'মুহাম্মদ—জিহাদের বিধান', 'ফাতহ—বিজয়ের প্রতিশ্রুতি'],
            en: ['Ahqaf—Rights of Parents', 'Muhammad—Rules of Jihad', 'Fath—Promise of Victory']
        },
        keyWords: { bn: ['বির (সদাচরণ)', 'ফাতহ', 'সবর'], en: ['Birr', 'Fath (Victory)', 'Sabr'] },
        featuredAyah: {
            bn: { text: 'নিশ্চয়ই আমি তোমাকে সুস্পষ্ট বিজয় দান করেছি।', surah: 'সূরা ফাতহ', ayahNum: '৪৮:১' },
            en: { text: 'Indeed, We have given you a clear conquest.', surah: 'Al-Fath', ayahNum: '48:1' }
        },
        extraAyats: [
            {
                bn: { text: 'আমি মানুষকে তার পিতা-মাতার প্রতি সদাচারণের নির্দেশ দিয়েছি।', surah: 'সূরা আহকাফ', ayahNum: '৪৬:১৫' },
                en: { text: 'And We have enjoined upon man, to his parents, good treatment.', surah: 'Al-Ahqaf', ayahNum: '46:15' }
            },
            {
                bn: { text: 'মুমিনরা তো পরস্পর ভাই ভাই, অতএব তোমাদের ভাইদের মধ্যে আপোষ-নিষ্পত্তি করে দাও।', surah: 'সূরা হুজুরাত', ayahNum: '৪৯:১০' },
                en: { text: 'The believers are but brothers, so make settlement between your brothers.', surah: 'Al-Hujurat', ayahNum: '49:10' }
            }
        ],
        juzSummary: {
            bn: 'সূরা আহকাফে পিতা-মাতার প্রতি সন্তানের দায়িত্ব অত্যন্ত গুরুত্বের সাথে আলোচিত। সূরা মুহাম্মদে সত্যের পথে অটল থাকার নির্দেশ দেওয়া হয়েছে। সূরা ফাতহে মক্কা বিজয়ের সুসংবাদ ও মুমিনদের হৃদয়ে প্রশান্তি নাযিলের কথা বর্ণিত হয়েছে।',
            en: 'Surah Al-Ahqaf stresses the duties of children toward parents. Surah Muhammad instructs remaining firm on the path of truth. Surah Al-Fath promises a clear victory and describes the tranquility Allah sends into the hearts of believers.'
        },
        smallAmol: { bn: 'আজকের পড়ার ১টি আয়াত দোয়া হিসেবে পড়ুন', en: 'Read 1 ayah from today\'s juz as a dua' },
        reflectionQ: { bn: 'পিতামাতার জন্য আজ কী করতে পারি?', en: 'What can I do for my parents today?' },
        uxTask: { bn: 'আজকের পড়া—১টি আয়াত দোয়া হিসেবে পড়ুন', en: 'Read 1 ayah as a dua' }
    },
    {
        day: 23, juz: '27', phase: 'steady',
        themes: {
            bn: ['যারিয়াত—আল্লাহর রিজক', 'তুর—নবীর সান্ত্বনা', 'নাজম ও কামার—কিয়ামতের ভয়াবহতা'],
            en: ['Dhariyat—Allah\'s Provision', 'Tur—Consoling the Prophet', 'Najm & Qamar—Day of Judgment']
        },
        keyWords: { bn: ['রিজক', 'তাওয়াক্কুল', 'আখিরাত'], en: ['Rizq', 'Tawakkul', 'Akhirah'] },
        featuredAyah: {
            bn: { text: 'আমি জিন ও মানুষকে শুধু আমার ইবাদতের জন্যই সৃষ্টি করেছি।', surah: 'সূরা যারিয়াত', ayahNum: '৫১:৫৬' },
            en: { text: 'I did not create jinn and humans except to worship Me.', surah: 'Adh-Dhariyat', ayahNum: '51:56' }
        },
        extraAyats: [
            {
                bn: { text: 'আর আকাশে রয়েছে তোমাদের রিজক এবং যার প্রতিশ্রুতি তোমাদের দেওয়া হয়েছে।', surah: 'সূরা যারিয়াত', ayahNum: '৫১:২২' },
                en: { text: 'And in the heaven is your provision and whatever you are promised.', surah: 'Adh-Dhariyat', ayahNum: '51:22' }
            },
            {
                bn: { text: 'আর তোমরা ধৈর্য ধারণ কর তোমার রবের আদেশের অপেক্ষায়, কারণ তুমি আমার চোখের সামনেই রয়েছ।', surah: 'সূরা তুর', ayahNum: '৫২:৪৮' },
                en: { text: 'And be patient, [O Muhammad], for the decision of your Lord, for indeed, you are in Our eyes.', surah: 'At-Tur', ayahNum: '52:48' }
            }
        ],
        juzSummary: {
            bn: 'সূরা যারিয়াতে মানুষের সৃষ্টির উদ্দেশ্য—আল্লাহর ইবাদত ও তাঁর পক্ষ থেকে রিজিকের নিশ্চয়তা বর্ণিত। সূরা তুরে রাসুলুল্লাহ (সাঃ)-কে আল্লাহর পরম সান্নিধ্যের আশ্বাস দেওয়া হয়েছে। সূরা নাজম ও কামারে কিয়ামতের ভয়াবহতা ও সত্য প্রত্যাখ্যানকারীদের পরিণাম আলোচিত।',
            en: 'Surah Adh-Dhariyat describes the purpose of human creation—worshiping Allah—and His guarantee of provision. Surah At-Tur provides comfort to the Prophet (SAW), assuring him of Allah\'s protection. Surah An-Najm and Al-Qamar discuss the reality of the Day of Judgment.'
        },
        smallAmol: { bn: '২ মিনিট: "আমি কিসে বদলাচ্ছি?" নিয়ে ভাবুন', en: '2 min: reflect on "How am I changing?"' },
        reflectionQ: { bn: 'রমজানে আমার জীবনে কী পরিবর্তন এসেছে?', en: 'What has changed in my life this Ramadan?' },
        uxTask: { bn: '২ মিনিট: "আমি কিসে বদলাচ্ছি?"', en: '2 min: "How am I changing?"' }
    },
    {
        day: 24, juz: '28', phase: 'steady',
        themes: {
            bn: ['রাহমান—আল্লাহর নিয়ামতের বর্ণনা', 'ওয়াকিয়া—তিন শ্রেণী', 'হাদিদ—দুনিয়ার প্রকৃতি'],
            en: ['Rahman—Blessings of Allah', 'Waqi\'ah—Three Groups', 'Hadid—Nature of Dunya']
        },
        keyWords: { bn: ['নিয়ামত', 'শোকর', 'জুহদ'], en: ['Ni\'mah', 'Shukr', 'Zuhd'] },
        featuredAyah: {
            bn: { text: 'তোমরা তোমাদের রবের কোন নিয়ামতকে অস্বীকার করবে?', surah: 'সূরা রাহমান', ayahNum: '৫৫:১৩' },
            en: { text: 'So which of the favors of your Lord would you deny?', surah: 'Ar-Rahman', ayahNum: '55:13' }
        },
        extraAyats: [
            {
                bn: { text: 'যদি তোমরা কৃতজ্ঞতা স্বীকার কর, তবে আমি তোমাদেরকে আরও দেব।', surah: 'সূরা ইবরাহিম', ayahNum: '১৪:৭' },
                en: { text: 'If you are grateful, I will surely increase you [in favor].', surah: 'Ibrahim', ayahNum: '14:7' }
            },
            {
                bn: { text: 'লোহা যা আমি নাযিল করেছি, যাতে রয়েছে প্রচণ্ড শক্তি এবং মানুষের জন্য অনেক উপকার।', surah: 'সূরা হাদিদ', ayahNum: '৫৭:২৫' },
                en: { text: 'And We sent down iron, wherein is great military might and benefits for the people.', surah: 'Al-Hadid', ayahNum: '57:25' }
            }
        ],
        juzSummary: {
            bn: 'সূরা রাহমান আল্লাহর অসংখ্য নেয়ামতের এক ছন্দময় কাব্যগাথা। সূরা ওয়াকিয়ায় বিচার দিবসে মানুষের তিনটি অবস্থা (অগ্রবর্তী, ডানহাত ও বামহাত পন্থী) বর্ণিত। সূরা হাদিদ দুনিয়ার জীবনের ক্ষণস্থায়ী প্রকৃতি ও আল্লাহর পথে ব্যয়ের গুরুত্ব আলোচনা করা হয়েছে।',
            en: 'Surah Ar-Rahman is a rhythmic masterpiece detailing Allah\'s countless blessings. Surah Al-Waqi\'ah categorizes people into three groups on Judgment Day. Surah Al-Hadid discusses the transient nature of worldly life and the virtue of spending in Allah\'s way.'
        },
        smallAmol: { bn: 'ডিসট্র্যাকশন চেক: আজ কী কমালাম?', en: 'Distraction check: what did I reduce today?' },
        reflectionQ: { bn: 'দুনিয়ার কোন জিনিস আমাকে আল্লাহ থেকে দূরে রাখছে?', en: 'What worldly thing is keeping me away from Allah?' },
        uxTask: { bn: 'ডিসট্র্যাকশন চেক: আজ কী কমালাম?', en: 'Distraction check: what did I reduce today?' }
    },
    {
        day: 25, juz: '29', phase: 'steady',
        themes: {
            bn: ['হাশর—আল্লাহর নামসমূহ', 'মুমতাহিনা—বন্ধুত্বের সীমানা', 'তালাক ও তাহরিম—পারিবারিক বিধান'],
            en: ['Hashr—Names of Allah', 'Mumtahina—Boundaries of Friendship', 'Family Laws']
        },
        keyWords: { bn: ['আসমাউল হুসনা', 'তাকওয়া', 'মাগফিরাত'], en: ['Asma ul Husna', 'Taqwa', 'Maghfirat'] },
        featuredAyah: {
            bn: { text: 'তিনিই আল্লাহ — রাজাধিরাজ, পবিত্র, শান্তিদাতা, নিরাপত্তাদানকারী।', surah: 'সূরা হাশর', ayahNum: '৫৯:২৩' },
            en: { text: 'He is Allah — the Sovereign, the Holy, the Source of Peace, the Guardian.', surah: 'Al-Hashr', ayahNum: '59:23' }
        },
        extraAyats: [
            {
                bn: { text: 'আর নিশ্চয়ই আপনি মহান চরিত্রের ওপর অধিষ্ঠিত।', surah: 'সূরা কলম', ayahNum: '৬৮:৪' },
                en: { text: 'And indeed, you are of a great moral character.', surah: 'Al-Qalam', ayahNum: '68:4' }
            },
            {
                bn: { text: 'আর তোমরা ধৈর্য ধারণ কর তোমার রবের ফয়সালার জন্য।', surah: 'সূরা কলম', ayahNum: '৬৮:৪৮' },
                en: { text: 'Then be patient for the decision of your Lord.', surah: 'Al-Qalam', ayahNum: '68:48' }
            }
        ],
        juzSummary: {
            bn: 'সূরা হাশরে আল্লাহর সুন্দর সুন্দর নাম ও গুণের বর্ণনা রয়েছে। সূরা মুমতাহিনায় মুমিনদের বন্ধুত্বের সীমানা ও ঈমানী দৃঢ়তার কথা বলা হয়েছে। সূরা তালাক ও তাহরিমে পারিবারিক জীবনের অত্যন্ত গুরুত্বপূর্ণ শৃঙ্খলা ও নৈতিকতার বিধান আলোচনা করা হয়েছে।',
            en: 'Surah Al-Hashr describes the beautiful Names and Attributes of Allah. Surah Al-Mumtahina discusses the boundaries of friendship and the firmness of faith. Surah At-Talaq and At-Tahrim provide essential guidelines for family discipline and ethics.'
        },
        smallAmol: { bn: 'আজ রাতের থিম: ক্ষমা/মমতা/বিচার নিয়ে ভাবুন', en: 'Tonight\'s theme: forgiveness/mercy/judgment' },
        reflectionQ: { bn: 'আল্লাহর কোন নামটি আজ আমার অন্তরে সবচেয়ে বেশি প্রভাব ফেলেছে?', en: 'Which Name of Allah impacted my heart most today?' },
        uxTask: { bn: 'আজ রাতের থিম: ক্ষমা/মমতা/বিচার', en: 'Tonight\'s theme: forgiveness/mercy/judgment' }
    },
    {
        day: 26, juz: '30', phase: 'steady',
        themes: {
            bn: ['মুলক—আল্লাহর রাজত্ব', 'জিন থেকে নাস পর্যন্ত—ছোট সূরাগুলোর শিক্ষা', 'কুরআন খতম!'],
            en: ['Mulk—Allah\'s Sovereignty', 'Jinn to Nas—Lessons of Short Surahs', 'Quran Khatm!']
        },
        keyWords: { bn: ['তাওয়াক্কুল', 'ইখলাস', 'খতম'], en: ['Tawakkul', 'Ikhlas', 'Khatm'] },
        featuredAyah: {
            bn: { text: 'বলো: তিনি আল্লাহ, এক-অদ্বিতীয়।', surah: 'সূরা ইখলাস', ayahNum: '১১২:১' },
            en: { text: 'Say: He is Allah, the One.', surah: 'Al-Ikhlas', ayahNum: '112:1' }
        },
        extraAyats: [
            {
                bn: { text: 'যিনি মৃত্যু ও জীবন সৃষ্টি করেছেন তোমাদের পরীক্ষা করার জন্য যে, কর্মে তোমাদের মধ্যে কে শ্রেষ্ঠ।', surah: 'সূরা মুলক', ayahNum: '৬৭:২' },
                en: { text: 'He who created death and life to test you [as to] which of you is best in deed.', surah: 'Al-Mulk', ayahNum: '67:2' }
            },
            {
                bn: { text: 'যখন আল্লাহর সাহায্য ও বিজয় আসে।', surah: 'সূরা নাসর', ayahNum: '১১০:১' },
                en: { text: 'When the victory of Allah has come and the conquest.', surah: 'An-Nasr', ayahNum: '110:1' }
            }
        ],
        juzSummary: {
            bn: 'সূরা মুলকে মহাবিশ্বের সৃষ্টি ও আল্লাহর একচ্ছত্র আধিপত্যের কথা বলা হয়েছে। আম্মা জুজের ছোট ছোট সূরাগুলোর মাধ্যমে তাওহীদের গভীর শিক্ষা দেওয়া হয়েছে। এটি মানুষের হৃদয়ে আখিরাতের ভয় ও জান্নাতের আশা জোগায়। সূরা নাসরে ইসলামের বিজয় ও রাসুলের বিদায়ের ইঙ্গিত রয়েছে।',
            en: 'Surah Al-Mulk establishes Allah\'s absolute sovereignty over the universe. The short surahs of Juz Amma focus on the core message of Tawhid, instilling fear of the Hour and hope for Paradise. Surah An-Nasr hints at the completion of mission and Islam\'s victory.'
        },
        smallAmol: { bn: '🎉 খতম টাচপয়েন্ট! শোকর আদায় করুন + রিফ্লেকশন লিখুন', en: '🎉 Khatm touchpoint! Express gratitude + write reflection' },
        reflectionQ: { bn: 'আলহামদুলিল্লাহ! কুরআন খতম — এই রমজানে কুরআন থেকে সবচেয়ে বড় শিক্ষা কী?', en: 'Alhamdulillah! Khatm — what is my biggest lesson from Quran this Ramadan?' },
        uxTask: { bn: 'খতম টাচপয়েন্ট + শোকর রিফ্লেকশন', en: 'Khatm touchpoint + gratitude reflection' }
    },

    // ═══════════════ PHASE 3: BUFFER (Days 27-29, revision/catch-up) ═══════════════
    {
        day: 27, juz: 'buffer', phase: 'buffer',
        themes: {
            bn: ['রিভিশন/ক্যাচ-আপ', 'লাইলাতুল কদর অনুসন্ধান', 'দোয়া ও কিয়ামের রাত'],
            en: ['Revision/Catch-up', 'Seeking Laylatul Qadr', 'Night of Dua & Qiyam']
        },
        keyWords: { bn: ['লাইলাতুল কদর', 'কিয়াম', 'দোয়া'], en: ['Laylatul Qadr', 'Qiyam', 'Dua'] },
        featuredAyah: {
            bn: { text: 'নিশ্চয়ই আমি এই (কুরআন) অবতীর্ণ করেছি কদরের রাতে। কদরের রাত হাজার মাস অপেক্ষা শ্রেষ্ঠ।', surah: 'সূরা কদর', ayahNum: '৯৭:১-৩' },
            en: { text: 'Indeed, We sent it down in the Night of Decree. The Night of Decree is better than a thousand months.', surah: 'Al-Qadr', ayahNum: '97:1-3' }
        },
        extraAyats: [
            {
                bn: { text: 'হে আল্লাহ! নিশ্চয়ই আপনি ক্ষমাশীল, আপনি ক্ষমা করতে ভালোবাসেন, তাই আমাকে ক্ষমা করুন।', surah: 'হাদিস (দোয়া)', ayahNum: 'তিরমিজি' },
                en: { text: 'O Allah, You are Forgiving and love to forgive, so forgive me.', surah: 'Hadith (Dua)', ayahNum: 'Tirmidhi' }
            },
            {
                bn: { text: 'শান্তি, যা ফজর উদয় হওয়া পর্যন্ত অব্যাহত থাকে।', surah: 'সূরা কদর', ayahNum: '৯৭:৫' },
                en: { text: 'Peace it is until the emergence of dawn.', surah: 'Al-Qadr', ayahNum: '97:5' }
            }
        ],
        juzSummary: {
            bn: 'রমজানের এই শেষ দিনগুলো মূলত ইবাদতের চূড়ান্ত সময়। লাইলাতুল কদর যা হাজার মাস অপেক্ষা উত্তম, তা অনুসন্ধানের জন্য এটি এক সুবর্ণ সুযোগ। কুরআনের রিভিশন ও বিশেষ দোয়ার মাধ্যমে আল্লাহর নৈকট্য লাভের শ্রেষ্ঠ সময় এটি।',
            en: 'These final days of Ramadan are the peak of worship. It\'s a golden opportunity to seek Laylatul Qadr, a night better than a thousand months. It\'s the best time to draw closer to Allah through Quran revision and special supplications.'
        },
        smallAmol: { bn: 'লাস্ট ৩ নাইটস—দোয়া/কিয়াম অগ্রাধিকার দিন', en: 'Last 3 nights — prioritize dua & qiyam' },
        reflectionQ: { bn: 'লাইলাতুল কদরে আমার সবচেয়ে গুরুত্বপূর্ণ দোয়া কী?', en: 'What is my most important dua for Laylatul Qadr?' },
        uxTask: { bn: 'লাস্ট ৩ নাইটস—দোয়া/কিয়াম অগ্রাধিকার', en: 'Last 3 nights—dua/qiyam priority' }
    },
    {
        day: 28, juz: 'review', phase: 'buffer',
        themes: {
            bn: ['প্রিয় আয়াত রিভিউ', 'রমজানের শিক্ষা সংকলন', 'হৃদয়ে গেঁথে যাওয়া আয়াত'],
            en: ['Review Favorite Ayahs', 'Compile Ramadan Lessons', 'Ayahs Etched in Heart']
        },
        keyWords: { bn: ['মুরাজাআ', 'হিফজ', 'শোকর'], en: ['Muraja\'ah', 'Hifz', 'Shukr'] },
        featuredAyah: {
            bn: { text: 'আল্লাহ কোন আত্মার ওপর তার সামর্থ্যের বাইরে বোঝা চাপান না।', surah: 'সূরা বাকারা', ayahNum: '২:২৮৬' },
            en: { text: 'Allah does not burden a soul beyond that it can bear.', surah: 'Al-Baqarah', ayahNum: '2:286' }
        },
        extraAyats: [
            {
                bn: { text: 'যারা ঈমান এনেছে তাদের অন্তর আল্লাহর জিকিরে প্রশান্ত হয়।', surah: 'সূরা রাদ', ayahNum: '১৩:২৮' },
                en: { text: 'Unquestionably, by the remembrance of Allah hearts are assured.', surah: 'Ar-Ra\'d', ayahNum: '13:28' }
            },
            {
                bn: { text: 'আমার জিকির (স্মরণ) করার জন্য নামাজ কায়েম করো।', surah: 'সূরা ত্বহা', ayahNum: '২০:১৪' },
                en: { text: 'And establish prayer for My remembrance.', surah: 'Taha', ayahNum: '20:14' }
            }
        ],
        juzSummary: {
            bn: 'রমজানের বিদায়লগ্নে আমরা পুরো মাসের প্রিয় আয়াত ও শিক্ষাগুলো আরেকবার ঝালিয়ে নেই। এটি আমাদের অন্তরে ঈমানের স্ফুরণ ঘটায় এবং রমজানের রেশ সারা বছর ধরে রাখতে সাহায্য করে। নিজের সবচেয়ে প্রিয় আয়াতগুলো চিহ্নিত করে সেগুলো জীবনে বাস্তবায়নের সংকল্প করি।',
            en: 'As Ramadan bids farewell, we review our favorite verses and lessons from the month. This rekindles the light of faith in our hearts and helps maintain the spirit of Ramadan throughout the year. We identify the verses that impacted us most and commit to living by them.'
        },
        smallAmol: { bn: '"আমি যে আয়াতগুলো রাখবো" তালিকা বানান', en: 'Create a list of "Ayahs I\'ll keep"' },
        reflectionQ: { bn: 'এই রমজানে সবচেয়ে বেশি প্রভাবিত করা ৩টি আয়াত কী কী?', en: 'What are the 3 most impactful ayahs from this Ramadan?' },
        uxTask: { bn: '"আমি যে আয়াতগুলো রাখবো" তালিকা', en: '"Ayahs I\'ll keep" list' }
    },
    {
        day: 29, juz: 'eid-prep', phase: 'buffer',
        themes: {
            bn: ['ঈদের প্রস্তুতি', 'রমজান-পরবর্তী পরিকল্পনা', 'ধারাবাহিকতার সংকল্প'],
            en: ['Eid Preparation', 'Post-Ramadan Plan', 'Commitment to Continuity']
        },
        keyWords: { bn: ['ঈদ', 'ইস্তিকামাহ', 'শোকর'], en: ['Eid', 'Istiqamah', 'Shukr'] },
        featuredAyah: {
            bn: { text: 'যারা বলে আমাদের রব আল্লাহ, অতঃপর দৃঢ় থাকে — তাদের কোন ভয় নেই।', surah: 'সূরা আহকাফ', ayahNum: '৪৬:১৩' },
            en: { text: 'Those who say "Our Lord is Allah" and then remain firm — they have no fear.', surah: 'Al-Ahqaf', ayahNum: '46:13' }
        },
        extraAyats: [
            {
                bn: { text: 'হে আমাদের পালনকর্তা! আমাদের সৎপথে পরিচালিত করার পর আমাদের অন্তরকে সত্যলিলন হতে বিচ্যুত করবেন না।', surah: 'সূরা আল ইমরান', ayahNum: '৩:৮' },
                en: { text: 'Our Lord, let not our hearts deviate after You have guided us.', surah: 'Ali \'Imran', ayahNum: '3:8' }
            },
            {
                bn: { text: 'তুমি তোমার রবের ইবাদত কর মৃত্যু আসা পর্যন্ত।', surah: 'সূরা হিজর', ayahNum: '১৫:৯৯' },
                en: { text: 'And worship your Lord until there comes to you the certainty (death).', surah: 'Al-Hijr', ayahNum: '15:99' }
            }
        ],
        juzSummary: {
            bn: 'রমজানের সমাপনী দিনে আমাদের প্রধান লক্ষ্য হলো ইস্তিকামাহ বা দ্বীনের ওপর অবিচল থাকা। ঈদের আনন্দ উদযাপনের পাশাপাশি রমজানের অর্জিত আমলগুলো বছরের বাকি ১১ মাস ধরে রাখার পরিকল্পনা করি। এটিই রমজানের সার্থকতা।',
            en: 'On the final day of Ramadan, our main focus is Istiqamah—remaining steadfast on the path. Along with the joy of Eid, we plan to sustain the good habits formed in Ramadan for the rest of the year. This is the true success of Ramadan.'
        },
        smallAmol: { bn: 'রমজানের পর ৪০ দিনের মিনিপ্ল্যান বানান', en: 'Create a 40-day mini-plan for after Ramadan' },
        reflectionQ: { bn: 'রমজানের পর কোন ৩টি অভ্যাস ধরে রাখবো?', en: 'Which 3 habits will I keep after Ramadan?' },
        uxTask: { bn: 'রমজানের পর ৪০ দিনের মিনিপ্ল্যান', en: '40-day post-Ramadan mini-plan' }
    },
];

// ═══════════════ HELPER FUNCTIONS ═══════════════

/**
 * Get today's Taraweeh plan data by Ramadan day number (1-30)
 * @param {number} dayNumber 
 * @returns {TaraweehDay | null}
 */
export const getTaraweehDay = (dayNumber) => {
    // Allow 0 for Chand Raat, up to 30 for late month days
    if (dayNumber < 0 || dayNumber > 30) return null;
    return taraweehPlan.find(d => d.day === dayNumber) || null;
};

/**
 * Get phase info for display
 * @param {'intensive'|'steady'|'buffer'} phase 
 * @param {'bn'|'en'} language 
 * @returns {{label: string, desc: string, emoji: string, color: string}}
 */
export const getPhaseInfo = (phase, language = 'bn') => {
    const phases = {
        intensive: {
            bn: { label: 'মনোযোগ সপ্তাহ', desc: 'দিন ০–৫ • ১.৫ পারা/দিন', emoji: '🔥', color: 'orange' },
            en: { label: 'Intensive Week', desc: 'Day 0–5 • 1.5 juz/day', emoji: '🔥', color: 'orange' }
        },
        steady: {
            bn: { label: 'স্থিতিশীল', desc: 'দিন ৬–২৬ • ১ পারা/দিন', emoji: '🌊', color: 'blue' },
            en: { label: 'Steady Pace', desc: 'Day 6–26 • 1 juz/day', emoji: '🌊', color: 'blue' }
        },
        buffer: {
            bn: { label: 'বাফার/রিভিশন', desc: 'দিন ২৭–২৯ • রিভিউ ও ঈদ প্রস্তুতি', emoji: '✨', color: 'purple' },
            en: { label: 'Buffer/Revision', desc: 'Day 27–29 • Review & Eid prep', emoji: '✨', color: 'purple' }
        }
    };
    return phases[phase]?.[language] || phases.steady[language];
};

/**
 * Calculate juz completion progress (how many juz completed out of 30)
 * @param {number} dayNumber 
 * @returns {{completed: number, total: number, percent: number}}
 */
export const getJuzProgress = (dayNumber) => {
    if (dayNumber <= 0) return { completed: 0, total: 30, percent: 0 };

    let completed;
    const idx = dayNumber;
    if (idx <= 5) {
        completed = Math.min(idx * 1.5, 9);
    } else if (idx <= 26) {
        completed = 9 + (idx - 6);
    } else {
        completed = 30;
    }

    return {
        completed: Math.round(completed),
        total: 30,
        percent: Math.round((completed / 30) * 100)
    };
};