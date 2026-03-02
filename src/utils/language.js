// Language translations
import { ramadanContent } from '../data/ramadanContent';

export const translations = {
    bn: {
        // App Title
        appTitle: 'রমজান প্ল্যানার',

        // Onboarding
        welcome: 'স্বাগতম',
        welcomeMessage: 'এই প্ল্যানারটা আপনার ব্যক্তিগত—আপনার ডেটা ডিফল্টভাবে এই ডিভাইসেই থাকে।',
        privacyMessage: 'আপনার তথ্য সম্পূর্ণ নিরাপদ এবং শুধুমাত্র আপনার ব্রাউজারে সংরক্ষিত থাকে।',
        startMessage: 'আজ থেকে ধীরে ধীরে। ছোট আমলও আল্লাহর কাছে মূল্যবান।',
        ramadanStartDate: 'রমজানের শুরুর তারিখ',
        quranGoal: 'কুরআন খতমের লক্ষ্য',
        days30: '৩০ দিনে',
        days20: '২০ দিনে',
        days15: '১৫ দিনে',
        letsStart: 'শুরু করুন',

        // Dashboard
        today: 'আজ',
        ramadanDay: 'রমজানের',
        day: 'দিন',
        progress: 'অগ্রগতি',

        // Salah
        salah: 'সালাত',
        fajr: 'ফজর',
        dhuhr: 'যোহর',
        asr: 'আসর',
        maghrib: 'মাগরিব',
        isha: 'ইশা',

        // Other Prayers
        roza: 'রোজা',
        tarawih: 'তারাবিহ',
        tahajjud: 'তাহাজ্জুদ',
        ishraq: 'ইশরাক',
        chasht: 'চাশত',

        // Quran
        quranPlanner: 'কুরআন পরিকল্পনা',
        todayTarget: 'আজকের লক্ষ্য',
        pages: 'পৃষ্ঠা',
        pagesRead: 'পড়া হয়েছে',
        totalProgress: 'মোট অগ্রগতি',
        remainingPages: 'বাকি পৃষ্ঠা',
        logPages: 'লগ করুন',

        // Dhikr
        dhikr: 'যিকির',
        subhanallah: 'সুবহানাল্লাহ',
        alhamdulillah: 'আলহামদুলিল্লাহ',
        allahuakbar: 'আল্লাহু আকবর',
        istighfar: 'ইস্তেগফার',
        customDhikr: 'কাস্টম যিকির',
        count: 'গণনা',
        reset: 'রিসেট',
        resetAll: 'সব রিসেট',

        // Reflection
        reflection: 'রিফ্লেকশন',
        todaysReflection: 'আজকের রিফ্লেকশন',
        whatDidYouLearn: 'আজ কী শিখলেন?',
        specialAchievement: 'আজকের বিশেষ অর্জন',
        achievementPlaceholder: 'আজ এমন একটা বিশেষ কাজের কথা লিখুন, যা করতে পেরে আপনি পরিতৃপ্ত',
        gratitude: 'শুকরিয়া আদায়',
        gratitudeTitle: 'আজকের যে তিনটি নিআমতের জন্য আমি কৃতজ্ঞ',
        gratitudePlaceholder: 'নিআমতের কথা লিখুন...',

        // Gamification
        dailyChallenge: 'আজকের চ্যালেঞ্জ',
        completeDay: 'দিন সম্পূর্ণ করুন',
        dayLocked: 'লক করা',
        dayUnlocked: 'আনলক করা',
        rewardClaimed: 'পুরস্কার সংগ্রহ করা হয়েছে!',
        levelUp: 'অভিনন্দন! আপনি লেভেল আপ করেছেন!',
        totalXp: 'ইস্তিকামাত পয়েন্ট',
        currentLevel: 'বর্তমান লেভেল',
        badges: 'অর্জিত ব্যাজসমূহ',
        tapToCount: 'ট্যাপ করুন',
        savedIndicator: 'সংরক্ষিত',
        welcomeBack: 'আলহামদুলিল্লাহ, আপনি ফিরে এসেছেন!',
        confirmReset: 'হ্যাঁ, রিসেট করুন',
        cancelReset: 'বাতিল',
        levelLabel: 'লেভেল',
        notEnoughProgress: 'আরেকটু বাকি!',

        // Detailed Ibadah
        fard: 'ফরজ',
        sunnah: 'সুন্নাত',
        nawafil: 'নফল',
        jamaat: 'জামাত',
        qaza: 'কাজা',
        dailyLearning: 'দৈনিক শিক্ষা',
        others: 'অন্যান্য',
        dailyAyah: 'একটি আয়াত',
        dailyHadith: 'একটি হাদীস',
        dailyDua: 'একটি দু\'আ',
        dailySunnah: 'একটি সুন্নাত',
        dailyMasala: 'একটি মাসআলা',
        dailyIman: 'ঈমানের শাখা',

        // Extra Prayers Detail
        rakats: 'রাকাত',
        tahajjudMotivation: 'যে ব্যক্তি ঈমান ও সওয়াবের আশায় রমজানের রাতে কিয়াম (তারাবিহ/তাহাজ্জুদ) করে, তার পূর্ববর্তী সব গুনাহ মাফ করে দেওয়া হয়। (বুখারী ও মুসলিম)',
        ishraqMotivation: 'ফজর পড়ে সূর্য ওঠা পর্যন্ত যিকির করে ২ রাকাত ইশরাক পড়লে পূর্ণ একটি হজ ও উমরার সওয়াব পাওয়া যায়। (তিরমিযী)',
        chashtMotivation: 'চাশতের দুই রাকাত নামাজ শরীরের ৩৬০টি জোড়ার সদকা হিসেবে যথেষ্ট। (মুসলিম)',

        quranTracker: 'কুরআন ট্র্যাকার',
        para: 'পারা',
        ayah: 'আয়াত',

        // Deed of the Day
        deedOfDay: 'আজকের ছোট কাজ',

        // Taraweeh Guide
        taraweehGuide: 'তারাবীহ গাইড',
        tonightsJuz: 'আজ রাতের জুজ',
        tonightsPreview: 'আজ রাতের প্রিভিউ',
        themes: 'থিম',
        keyWordsLabel: 'মূল শব্দ',
        featuredAyah: 'নির্বাচিত আয়াত',
        smallAmol: 'ছোট আমল',
        reflectTitle: 'রিফ্লেকশন',
        reflectionQuestion: 'রিফ্লেকশন প্রশ্ন',
        tomorrowNiyyah: 'কালকের নিয়ত',
        niyyahPlaceholder: 'কালকের জন্য ১টি ছোট নিয়ত লিখুন...',
        reflectionNotePlaceholder: 'আপনার ভাবনা লিখুন...',
        juzProgress: 'জুজ অগ্রগতি',
        amolDone: 'আমল করেছি',
        previewSeen: 'প্রিভিউ দেখেছি',
        juzSummaryLabel: 'আজকের সারসংক্ষেপ',
        extraAyatsLabel: 'গভীরভাবে জানুন',
        themeFocusLabel: 'আজকের ইবাদতের ফোকাস বেছে নিন',
        themeSelectionReflection: 'আপনার আজকের ফোকাস:',
        pdfSummaryLabel: 'শায়খ আহমাদুল্লাহর সারসংক্ষেপ',
        openPdfSummary: 'পিডিএফ সারসংক্ষেপ পড়ুন',
        viewChapterPdf: 'আজকের বার্তার বিস্তারিত',
        pdfPageLabel: 'পৃষ্ঠা নম্বর:',
        pdfInstruction: 'ব্রাউজারে সরাসরি না খুললে ম্যানুয়ালি এই পৃষ্ঠায় যান',

        // Daily Self-Assessment
        dailySelfAssessment: 'দৈনিক আত্ম-মূল্যায়ন',
        selfAssessmentComplete: 'সম্পন্ন হয়েছে',

        // Behavior & Character
        behaviorAndCharacter: 'আচরণ ও চরিত্র',
        avoidBadBehavior: 'আজ কি আমি কারো সাথে খারাপ ব্যবহার করা থেকে বিরত ছিলাম?',
        avoidBackbiting: 'আজ কি আমি গীবত (পেছনে সমালোচনা) করা থেকে নিজেকে বিরত রেখেছি?',
        controlAnger: 'আজ কি আমি অহংকার বা রাগ নিয়ন্ত্রণ করার চেষ্টা করেছি?',
        wasForgiving: 'আজ কি আমি কারো প্রতি ক্ষমাশীল ছিলাম?',

        // Worldly Control
        worldlyControl: 'দুনিয়াবি নিয়ন্ত্রণ',
        avoidUnnecessaryMobile: 'আজ কি আমি অপ্রয়োজনীয় মোবাইল ব্যবহার থেকে নিজেকে বিরত রেখেছি?',
        avoidSocialMedia: 'আজ কি আমি সোশ্যাল মিডিয়ায় সময় অপচয় করিনি?',
        protectedFromBad: 'আজ কি আমি কোনো খারাপ বা অনুচিত কিছু দেখা থেকে নিজেকে হেফাজত করেছি?',

        // Charity & Compassion
        charityAndCompassion: 'দান ও সহমর্মিতা',
        gaveCharity: 'আজ কি আমি কোনো দান করেছি (টাকা, খাবার, সাহায্য)?',
        helpedSomeone: 'আজ কি আমি কারো উপকার করেছি?',

        // Intention & Self-Improvement
        intentionAndImprovement: 'নিয়ত ও আত্ম-সংশোধন',
        repentedToAllah: 'আজ কি আমি কোনো ভুলের জন্য আল্লাহর কাছে তওবা করেছি?',
        triedGoodHabit: 'আজ কি আমি অন্তত একটি ভালো অভ্যাস গড়ে তোলার চেষ্টা করেছি?',
        expressedGratitudeToday: 'আজ কি আমি আজকের দিনের জন্য কৃতজ্ঞতা প্রকাশ করেছি?',
        reflectedOnDeeds: 'আজ কি আমি নিজের আমল নিয়ে আন্তরিকভাবে ভাবনা করেছি?',

        // Progress Messages
        excellentProgress: 'আলহামদুলিল্লাহ! চমৎকার অগ্রগতি!',
        goodProgress: 'মাশাআল্লাহ! ভালো এগিয়ে যাচ্ছেন!',
        keepGoing: 'চালিয়ে যান! ছোট অগ্রগতিও অগ্রগতি।',
        startToday: 'আজ থেকে শুরু করুন!',

        // Encouragement
        encouragement1: 'আলহামদুলিল্লাহ—আজ যা হয়েছে, সেটাই অগ্রগতি।',
        encouragement2: 'আজ কম হলে সমস্যা নেই। কাল আবার নতুন নিয়ত।',
        encouragement3: 'নিজেকে তুলনা করবেন না—আপনি আপনার গতকালের চেয়ে একটু ভালো হলেই যথেষ্ট।',
        encouragement4: 'ছোট কিন্তু নিয়মিত—এটাই সবচেয়ে প্রিয় আমল।',

        // Navigation
        home: 'হোম',
        calendar: 'ক্যালেন্ডার',
        routine: 'রুটিন',
        settings: 'সেটিংস',

        // Routine Builder
        routineBuilder: 'রুটিন বিল্ডার',
        planner24h: '২৪-ঘণ্টা প্ল্যানার',
        designPerfectDay: 'আপনার দিনের সেরা পরিকল্পনা করুন',
        ibadahTime: 'ইবাদতের সময়',
        unplanned: 'অপরিকল্পিত',
        focusedDayAchieved: 'ফোকাসড ডে অর্জিত',
        focusedDayMsg: 'মাশাআল্লাহ! সুন্দর নিয়ত করেছেন।',
        addMoreIbadah: 'আজকের জন্য আরও কিছু ইবাদতের সময় যোগ করুন।',
        quickStartTemplates: 'কুইক স্টার্ট টেমপ্লেট',
        unplannedTime: 'অপরিকল্পিত সময়',
        addTimeBlock: 'সময় যোগ করুন',
        editBlock: 'সময় পরিবর্তন করুন',
        activityTitle: 'কাজের নাম',
        titlePlaceholder: 'যেমন: সেহরি',
        categoryLbl: 'ধরণ',
        startTime: 'শুরুর সময়',
        endTime: 'শেষের সময়',
        intentionOpt: 'নিয়ত (ঐচ্ছিক)',
        intentionPlaceholder: 'আপনার নিয়ত...',
        saveBlock: 'সেভ করুন',
        delete: 'মুছুন',
        fillAllFields: 'সব প্রয়োজনীয় ঘর পূরণ করুন',
        overlapError: 'এই সময়ে অন্য একটি কাজ আছে।',
        catIbadah: 'ইবাদত',
        catWork: 'কাজ',
        catSleep: 'ঘুম',
        catFamily: 'পরিবার',
        catPersonal: 'ব্যক্তিগত সময়',
        catStudy: 'পড়ালেখা',
        catOther: 'অন্যান্য',
        studentTemplate: 'শিক্ষার্থী',
        officeWorkerTemplate: 'কর্মজীবী',
        freelancerTemplate: 'ফ্রিল্যান্সার',
        homemakerTemplate: 'গৃহিণী',
        focusLevelLbl: 'ফোকাস লেভেল',
        focusHigh: 'উচ্চ',
        focusMedium: 'মাঝারি',
        focusLow: 'কম',
        flexibleLbl: 'নমনীয় সময়',
        notesLbl: 'নোট (ঐচ্ছিক)',
        notesPlaceholder: 'অতিরিক্ত তথ্য...',
        completionPct: 'সম্পন্ন',
        categoryBreakdown: 'বিভাগ অনুযায়ী সময়',
        markDone: 'সম্পন্ন',
        markUndone: 'বাতিল',
        resetRoutine: 'রুটিন রিসেট',
        resetConfirm: 'আপনি কি নিশ্চিত?',
        yes: 'হ্যাঁ',
        no: 'না',

        // Settings
        exportData: 'ডেটা এক্সপোর্ট',
        importData: 'ডেটা ইমপোর্ট',
        resetData: 'ডেটা রিসেট',
        changeLanguage: 'ভাষা পরিবর্তন',
        about: 'সম্পর্কে',

        // Buttons
        save: 'সেভ',
        cancel: 'বাতিল',
        confirm: 'নিশ্চিত',
        close: 'বন্ধ',

        // Deeds of the Day (30 deeds)
        deeds: [
            'আজ ফজরের নামাজ জামাতে পড়ার চেষ্টা করুন',
            'কুরআন তেলাওয়াতের সময় অর্থ বোঝার চেষ্টা করুন',
            'পরিবারের সাথে ইফতার করুন এবং একসাথে দোয়া করুন',
            'আজ কাউকে ক্ষমা করে দিন',
            'মসজিদে নামাজ পড়ার চেষ্টা করুন',
            'আজ ১০০ বার ইস্তেগফার পড়ুন',
            'কোনো গরিব মানুষকে সাহায্য করুন',
            'আজ তারাবিহ নামাজ পড়ুন',
            'তাহাজ্জুদ নামাজের জন্য উঠার চেষ্টা করুন',
            'আজ সূরা আল-কাহফ পড়ুন',
            'পিতা-মাতার সাথে ভালো ব্যবহার করুন',
            'আজ দান-সদকা করুন',
            'কুরআনের একটি আয়াত মুখস্থ করুন',
            'আজ কাউকে হাসান',
            'নিজের ভুলের জন্য তওবা করুন',
            'আজ দুর্বলদের সাহায্য করুন',
            'সূরা ইয়াসিন পড়ুন',
            'আজ ১০০ বার দরুদ শরীফ পড়ুন',
            'প্রতিবেশীর খোঁজখবর নিন',
            'আজ কোনো ভালো কাজের নিয়ত করুন',
            'লাইলাতুল কদরের জন্য বিশেষ দোয়া করুন',
            'আজ সূরা আর-রহমান পড়ুন',
            'পরিবারকে নিয়ে দোয়া করুন',
            'আজ কোরআন তাফসীর পড়ুন',
            'মসজিদে ইতিকাফ করার চেষ্টা করুন',
            'আজ বেশি বেশি দোয়া করুন',
            'সূরা আল-মুলক পড়ুন',
            'আজ কাউকে ইসলাম সম্পর্কে বলুন',
            'ঈদের প্রস্তুতি শুরু করুন',
            'রমজানের শেষ দিন—সব গুনাহের জন্য ক্ষমা চান'
        ],

        // Expanded Content loaded from external file
        dailyContent: ramadanContent.bn
    },
    en: {
        // App Title
        appTitle: 'Ramadan Planner',

        // Onboarding
        welcome: 'Welcome',
        welcomeMessage: 'This planner is personal—your data stays on this device by default.',
        privacyMessage: 'Your information is completely secure and stored only in your browser.',
        startMessage: 'Start small today. Even small deeds are valuable to Allah.',
        ramadanStartDate: 'Ramadan Start Date',
        quranGoal: 'Quran Completion Goal',
        days30: 'In 30 days',
        days20: 'In 20 days',
        days15: 'In 15 days',
        letsStart: "Let's Start",

        // Dashboard
        today: 'Today',
        ramadanDay: 'Ramadan',
        day: 'Day',
        progress: 'Progress',

        // Salah
        salah: 'Salah',
        fajr: 'Fajr',
        dhuhr: 'Dhuhr',
        asr: 'Asr',
        maghrib: 'Maghrib',
        isha: 'Isha',

        // Other Prayers
        roza: 'Fasting',
        tarawih: 'Tarawih',
        tahajjud: 'Tahajjud',
        ishraq: 'Ishraq',
        chasht: 'Chasht',

        // Quran
        quranPlanner: 'Quran Planner',
        todayTarget: "Today's Target",
        pages: 'Pages',
        pagesRead: 'Pages Read',
        totalProgress: 'Total Progress',
        remainingPages: 'Remaining Pages',
        logPages: 'Log Pages',

        // Dhikr
        dhikr: 'Dhikr',
        subhanallah: 'Subhanallah',
        alhamdulillah: 'Alhamdulillah',
        allahuakbar: 'Allahu Akbar',
        istighfar: 'Istighfar',
        customDhikr: 'Custom Dhikr',
        count: 'Count',
        reset: 'Reset',
        resetAll: 'Reset All',

        // Reflection
        reflection: 'Reflection',
        todaysReflection: "Today's Reflection",
        specialAchievement: "Today's Achievement",
        achievementPlaceholder: "Write about one special deed that made you feel fulfilled today",
        gratitude: 'Gratitude',
        gratitudeTitle: 'Three things I am grateful for today',
        gratitudePlaceholder: 'Write a blessing...',

        // Gamification
        dailyChallenge: "Today's Challenge",
        completeDay: 'Complete Day',
        dayLocked: 'Locked',
        dayUnlocked: 'Unlocked',
        rewardClaimed: 'Reward Claimed!',
        levelUp: 'Congratulations! Level Up!',
        totalXp: 'Consistency Points',
        currentLevel: 'Current Level',
        badges: 'Earned Badges',
        tapToCount: 'Tap to count',
        savedIndicator: 'Saved',
        welcomeBack: 'Alhamdulillah, you\'re back!',
        confirmReset: 'Yes, Reset',
        cancelReset: 'Cancel',
        levelLabel: 'Level',
        notEnoughProgress: 'Almost there!',

        // Detailed Ibadah
        fard: 'Fard',
        sunnah: 'Sunnah',
        nawafil: 'Nawafil',
        jamaat: 'Jama\'at',
        qaza: 'Qaza',
        dailyLearning: 'Daily Learning',
        others: 'Others',
        dailyAyah: 'One Ayah',
        dailyHadith: 'One Hadith',
        dailyDua: 'One Dua',
        dailySunnah: 'One Sunnah',
        dailyMasala: 'One Rule (Masala)',
        dailyIman: 'Branch of Iman',

        // Extra Prayers Detail
        rakats: 'Rakats',
        tahajjudMotivation: 'Whoever stands (in prayer) during Ramadan out of faith and expectation of reward, his previous sins will be forgiven. (Bukhari & Muslim)',
        ishraqMotivation: 'Whoever prays Fajr, remembers Allah until sunrise, then prays 2 rakahs of Ishraq, gets the reward of a complete Hajj and Umrah. (Tirmidhi)',
        chashtMotivation: 'Two rakahs of Duha (Chasht) prayer suffice as charity for all 360 joints of the body. (Muslim)',

        quranTracker: 'Quran Tracker',
        para: 'Juz (Para)',
        ayah: 'Ayah',

        // Deed of the Day
        deedOfDay: 'Deed of the Day',

        // Taraweeh Guide
        taraweehGuide: 'Taraweeh Guide',
        tonightsJuz: 'Tonight\'s Juz',
        tonightsPreview: 'Tonight\'s Preview',
        themes: 'Themes',
        keyWordsLabel: 'Key Words',
        featuredAyah: 'Featured Ayah',
        smallAmol: 'Small Deed',
        reflectTitle: 'Reflection',
        reflectionQuestion: 'Reflection Question',
        tomorrowNiyyah: 'Tomorrow\'s Intention',
        niyyahPlaceholder: 'Write a small intention for tomorrow...',
        reflectionNotePlaceholder: 'Write your thoughts...',
        juzProgress: 'Juz Progress',
        amolDone: 'Deed Done',
        previewSeen: 'Preview Seen',
        juzSummaryLabel: 'Juz Overview',
        extraAyatsLabel: 'Deep Dive Wisdom',
        themeFocusLabel: 'Pick your focus for tonight',
        themeSelectionReflection: 'Your focus today:',
        pdfSummaryLabel: 'Shaykh Ahmadullah\'s Summary',
        openPdfSummary: 'Read PDF Summary',
        viewChapterPdf: 'Chapter Details',
        pdfPageLabel: 'Page Number:',
        pdfInstruction: 'If it doesn\'t auto-jump, go to this page manually',

        // Daily Self-Assessment
        dailySelfAssessment: 'Daily Self-Assessment',
        selfAssessmentComplete: 'Completed',

        // Behavior & Character
        behaviorAndCharacter: 'Behavior & Character',
        avoidBadBehavior: 'Did I avoid bad behavior with anyone today?',
        avoidBackbiting: 'Did I avoid backbiting (criticism behind someone\'s back) today?',
        controlAnger: 'Did I try to control my pride or anger today?',
        wasForgiving: 'Was I forgiving towards someone today?',

        // Worldly Control
        worldlyControl: 'Worldly Control',
        avoidUnnecessaryMobile: 'Did I avoid unnecessary mobile usage today?',
        avoidSocialMedia: 'Did I avoid wasting time on social media today?',
        protectedFromBad: 'Did I protect myself from seeing anything bad or inappropriate today?',

        // Charity & Compassion
        charityAndCompassion: 'Charity & Compassion',
        gaveCharity: 'Did I give any charity today (money, food, help)?',
        helpedSomeone: 'Did I help someone today?',

        // Intention & Self-Improvement
        intentionAndImprovement: 'Intention & Self-Improvement',
        repentedToAllah: 'Did I repent to Allah for any mistake today?',
        triedGoodHabit: 'Did I try to build at least one good habit today?',
        expressedGratitudeToday: 'Did I express gratitude for today?',
        reflectedOnDeeds: 'Did I sincerely reflect on my deeds today?',

        // Progress Messages
        excellentProgress: 'Alhamdulillah! Excellent progress!',
        goodProgress: 'MashaAllah! Good progress!',
        keepGoing: 'Keep going! Small progress is still progress.',
        startToday: 'Start today!',

        // Encouragement
        encouragement1: 'Alhamdulillah—whatever you did today is progress.',
        encouragement2: "If today was less, it's okay. Tomorrow is a new intention.",
        encouragement3: "Don't compare yourself—being slightly better than yesterday is enough.",
        encouragement4: 'Small but consistent—this is the most beloved deed.',

        // Navigation
        home: 'Home',
        calendar: 'Calendar',
        routine: 'Routine',
        settings: 'Settings',

        // Routine Builder
        routineBuilder: 'Routine Builder',
        planner24h: '24h Planner',
        designPerfectDay: 'Design your perfect day',
        ibadahTime: 'Ibadah Time',
        unplanned: 'Unplanned',
        focusedDayAchieved: 'Focused Day Achieved',
        focusedDayMsg: 'MashaAllah! Great intention set.',
        addMoreIbadah: 'Add a bit more Ibadah time to increase your spiritual focus today.',
        quickStartTemplates: 'Quick Start Templates',
        unplannedTime: 'Unplanned Time',
        addTimeBlock: 'Add Time Block',
        editBlock: 'Edit Block',
        activityTitle: 'Activity Title',
        titlePlaceholder: 'e.g. Suhoor',
        categoryLbl: 'Category',
        startTime: 'Start Time',
        endTime: 'End Time',
        intentionOpt: 'Intention (Optional)',
        intentionPlaceholder: 'Your niyyah...',
        saveBlock: 'Save Block',
        delete: 'Delete',
        fillAllFields: 'Please fill all required fields',
        overlapError: 'Time block overlaps with an existing block.',
        catIbadah: 'Ibadah',
        catWork: 'Work',
        catSleep: 'Sleep',
        catFamily: 'Family',
        catPersonal: 'Personal Time',
        catStudy: 'Study',
        catOther: 'Other',
        studentTemplate: 'Student',
        officeWorkerTemplate: 'Office Worker',
        freelancerTemplate: 'Freelancer',
        homemakerTemplate: 'Homemaker',
        focusLevelLbl: 'Focus Level',
        focusHigh: 'High',
        focusMedium: 'Medium',
        focusLow: 'Low',
        flexibleLbl: 'Flexible Time',
        notesLbl: 'Notes (Optional)',
        notesPlaceholder: 'Additional info...',
        completionPct: 'Completed',
        categoryBreakdown: 'Time by Category',
        markDone: 'Done',
        markUndone: 'Undo',
        resetRoutine: 'Reset Routine',
        resetConfirm: 'Are you sure?',
        yes: 'Yes',
        no: 'No',

        // Settings
        exportData: 'Export Data',
        importData: 'Import Data',
        resetData: 'Reset Data',
        changeLanguage: 'Change Language',
        about: 'About',

        // Buttons
        save: 'Save',
        cancel: 'Cancel',
        confirm: 'Confirm',
        close: 'Close',

        // Deeds of the Day (30 deeds)
        deeds: [
            'Try to pray Fajr in congregation today',
            'Try to understand the meaning while reciting Quran',
            'Break fast with family and make dua together',
            'Forgive someone today',
            'Try to pray in the mosque',
            'Recite Istighfar 100 times today',
            'Help a poor person',
            'Pray Tarawih today',
            'Try to wake up for Tahajjud',
            'Read Surah Al-Kahf today',
            'Be kind to your parents',
            'Give charity today',
            'Memorize one verse of Quran',
            'Make someone smile today',
            'Repent for your mistakes',
            'Help the weak today',
            'Read Surah Yasin',
            'Recite Durood 100 times today',
            'Check on your neighbors',
            'Make intention for a good deed today',
            'Make special dua for Laylatul Qadr',
            'Read Surah Ar-Rahman today',
            'Make dua for your family',
            'Read Quran Tafsir today',
            'Try to do Itikaf in the mosque',
            'Make lots of dua today',
            'Read Surah Al-Mulk',
            'Tell someone about Islam today',
            'Start preparing for Eid',
            'Last day of Ramadan—seek forgiveness for all sins'
        ],

        // Expanded Content loaded from external file
        dailyContent: ramadanContent.en
    }
};

// Detect browser language
export const detectLanguage = () => {
    const browserLang = navigator.language || navigator.userLanguage;

    // Check if Bengali
    if (browserLang.startsWith('bn')) {
        return 'bn';
    }

    // Default to English
    return 'en';
};

// Get translation
export const t = (key, lang) => {
    const keys = key.split('.');
    let value = translations[lang];

    for (const k of keys) {
        if (value && typeof value === 'object') {
            value = value[k];
        } else {
            return key; // Return key if translation not found
        }
    }

    return value || key;
};

// Language context hook
export const useLanguage = () => {
    // eslint-disable-next-line no-undef
    const [language, setLanguage] = React.useState(() => {
        const saved = localStorage.getItem('language');
        return saved || detectLanguage();
    });

    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    const translate = (key) => t(key, language);

    return { language, changeLanguage, t: translate };
};
