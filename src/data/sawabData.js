/**
 * Sawab / Rewards data for each Amol (deed) tracked in the app.
 * All references are from authentic Quran and Hadith sources.
 * 
 * Structure:
 *   key: {
 *     bn: { reward, source, detail? },
 *     en: { reward, source, detail? }
 *   }
 */

export const sawabData = {

    // ─── SALAH (5 Daily Prayers) ────────────────────────────────────

    salahFard: {
        bn: {
            reward: 'প্রতিটি ফরজ নামাজ জাহান্নাম থেকে মুক্তির ঢাল',
            source: 'সহীহ মুসলিম ২৫১',
            detail: 'পাঁচ ওয়াক্ত নামাজ হলো প্রবাহিত নদীর মতো — যাতে দিনে পাঁচবার গোসল করলে কোনো ময়লা থাকে না।'
        },
        en: {
            reward: 'Each Fard prayer is a shield from Hellfire',
            source: 'Sahih Muslim 251',
            detail: 'The five daily prayers are like a flowing river at your door — bathing in it five times a day leaves no dirt.'
        }
    },

    salahJamaat: {
        bn: {
            reward: 'জামাতে নামাজে ২৭ গুণ বেশি সওয়াব',
            source: 'সহীহ বুখারী ৬৪৫',
            detail: 'একাকী নামাজের চেয়ে জামাতে নামাজ ২৭ গুণ বেশি মর্যাদাবান।'
        },
        en: {
            reward: 'Prayer in congregation = 27x more reward',
            source: 'Sahih Bukhari 645',
            detail: 'Prayer in congregation is twenty-seven times more virtuous than prayer offered individually.'
        }
    },

    salahSunnah: {
        bn: {
            reward: 'প্রতিদিন ১২ রাকাত সুন্নতে জান্নাতে একটি ঘর',
            source: 'সহীহ মুসলিম ৭২৮',
            detail: 'যে ব্যক্তি দিনে-রাতে ১২ রাকাত সুন্নত নামাজ পড়ে, আল্লাহ তাঁর জন্য জান্নাতে একটি ঘর নির্মাণ করেন।'
        },
        en: {
            reward: '12 Sunnah rakahs daily = a house in Jannah',
            source: 'Sahih Muslim 728',
            detail: 'Whoever prays 12 voluntary rakahs, day and night, Allah will build for him a house in Paradise.'
        }
    },

    fajr: {
        bn: {
            reward: 'ফজর পড়লে আল্লাহর জিম্মায় — সারাদিন আল্লাহর হেফাজতে',
            source: 'সহীহ মুসলিম ৬৫৭',
        },
        en: {
            reward: 'Fajr prayer = under Allah\'s protection all day',
            source: 'Sahih Muslim 657',
        }
    },

    isha: {
        bn: {
            reward: 'ইশা জামাতে পড়লে অর্ধেক রাত ইবাদতের সমান',
            source: 'সহীহ মুসলিম ৬৫৬',
        },
        en: {
            reward: 'Isha in congregation = half the night in worship',
            source: 'Sahih Muslim 656',
        }
    },

    // ─── FASTING (Roza) ─────────────────────────────────────────────

    roza: {
        bn: {
            reward: 'রোজাদারের জন্য জান্নাতে আর-রাইয়ান দরজা',
            source: 'সহীহ বুখারী ১৮৯৬',
            detail: 'রোজা ঢালস্বরূপ। রোজাদারের মুখের গন্ধ আল্লাহর কাছে মেশকের চেয়ে উত্তম। রোজাদারের জন্য দুটি আনন্দ — ইফতারের সময় ও আল্লাহর সাথে সাক্ষাতের সময়।'
        },
        en: {
            reward: 'Fasting opens the gate of Ar-Rayyan in Jannah',
            source: 'Sahih Bukhari 1896',
            detail: 'Fasting is a shield. The breath of a fasting person is sweeter to Allah than musk. The fasting person has two joys — at breaking fast and at meeting Allah.'
        }
    },

    rozaRamadan: {
        bn: {
            reward: 'রমজানের রোজায় বিগত সকল গুনাহ মাফ',
            source: 'সহীহ বুখারী ১৯০১',
            detail: 'যে ব্যক্তি ঈমান ও ইহতিসাবের (সওয়াবের আশায়) সাথে রমজানের রোজা রাখে, তার পূর্ববর্তী সকল গুনাহ মাফ করে দেওয়া হয়।'
        },
        en: {
            reward: 'Fasting Ramadan forgives all previous sins',
            source: 'Sahih Bukhari 1901',
            detail: 'Whoever fasts Ramadan with faith and seeking reward, all their previous sins will be forgiven.'
        }
    },

    // ─── QURAN ──────────────────────────────────────────────────────

    quranReading: {
        bn: {
            reward: 'প্রতিটি হরফে ১০ নেকি — রমজানে বহুগুণ বৃদ্ধি',
            source: 'তিরমিযী ২৯১০',
            detail: 'যে ব্যক্তি কুরআনের একটি হরফ পড়ে, তার জন্য একটি নেকি, আর একটি নেকি দশগুণে বৃদ্ধি পায়। আমি "আলিফ-লাম-মীম" কে একটি হরফ বলি না, বরং আলিফ একটি হরফ, লাম একটি হরফ, মীম একটি হরফ।'
        },
        en: {
            reward: 'Every letter of Quran = 10 rewards, multiplied in Ramadan',
            source: 'Tirmidhi 2910',
            detail: 'Whoever reads a letter from the Book of Allah receives a good deed, and each good deed is multiplied tenfold. I do not say "Alif-Lam-Meem" is one letter — rather Alif is a letter, Lam is a letter, and Meem is a letter.'
        }
    },

    quranKhatm: {
        bn: {
            reward: 'কুরআন খতমকারীর জন্য শাফায়াত — কিয়ামতে কুরআন সুপারিশ করবে',
            source: 'সহীহ মুসলিম ৮০৪',
            detail: 'কুরআন পড়ো, কারণ কিয়ামতের দিন কুরআন তার পাঠকের জন্য শাফায়াতকারী হিসেবে আসবে।'
        },
        en: {
            reward: 'Quran will intercede for its reader on Judgment Day',
            source: 'Sahih Muslim 804',
            detail: 'Read the Quran, for it will come on the Day of Judgment as an intercessor for its companion.'
        }
    },

    // ─── DHIKR ──────────────────────────────────────────────────────

    subhanallah: {
        bn: {
            reward: '৩৩ বার সুবহানাল্লাহ — মিযানের পাল্লা ভারী হবে',
            source: 'সহীহ মুসলিম ২১৩৭',
            detail: 'আল্লাহর কাছে সবচেয়ে প্রিয় কথা চারটি: সুবহানাল্লাহ, আলহামদুলিল্লাহ, লা ইলাহা ইল্লাল্লাহ, আল্লাহু আকবার — এগুলো মিযানের পাল্লা ভারী করে।'
        },
        en: {
            reward: '33× SubhanAllah — fills the scales of good deeds',
            source: 'Sahih Muslim 2137',
            detail: 'The dearest phrases to Allah are four: SubhanAllah, Alhamdulillah, La ilaha illAllah, Allahu Akbar — they weigh heavily on the scales.'
        }
    },

    alhamdulillah: {
        bn: {
            reward: 'আলহামদুলিল্লাহ মিযানের পাল্লা পূর্ণ করে দেয়',
            source: 'সহীহ মুসলিম ২২৩',
            detail: 'পবিত্রতা (তাহারাত) ঈমানের অর্ধেক। আলহামদুলিল্লাহ মিযানের পাল্লা পূর্ণ করে দেয়।'
        },
        en: {
            reward: 'Alhamdulillah fills the scales of good deeds',
            source: 'Sahih Muslim 223',
            detail: 'Purification is half of faith. And Alhamdulillah (praise be to Allah) fills the scales.'
        }
    },

    allahuakbar: {
        bn: {
            reward: 'আল্লাহু আকবার — আসমান ও জমিনের মধ্যবর্তী স্থান পূর্ণ করে',
            source: 'সহীহ মুসলিম ২২৩',
            detail: 'সুবহানাল্লাহ ও আল্লাহু আকবার আসমান ও জমিনের মধ্যবর্তী স্থান পূর্ণ করে দেয়।'
        },
        en: {
            reward: 'Allahu Akbar — fills what is between the heavens & earth',
            source: 'Sahih Muslim 223',
            detail: 'SubhanAllah and Allahu Akbar fill what is between the heavens and the earth.'
        }
    },

    istighfar: {
        bn: {
            reward: 'ইস্তেগফার — সকল সমস্যার সমাধান ও রিযিকের দরজা খোলে',
            source: 'সূরা নূহ ৭১:১০-১২',
            detail: 'তোমরা তোমাদের রবের কাছে ক্ষমা চাও। নিশ্চয় তিনি অত্যন্ত ক্ষমাশীল। তিনি তোমাদের ওপর আকাশ থেকে বৃষ্টি বর্ষণ করবেন, তোমাদের ধন-সম্পদ ও সন্তান-সন্ততি দান করবেন।'
        },
        en: {
            reward: 'Istighfar — opens doors of mercy, relief & provision',
            source: 'Surah Nuh 71:10-12',
            detail: 'Ask forgiveness of your Lord. Indeed, He is ever a Perpetual Forgiver. He will send rain from the sky upon you and give you increase in wealth and children.'
        }
    },

    // ─── TARAWIH ─────────────────────────────────────────────────────

    tarawih: {
        bn: {
            reward: 'তারাবিহ পড়লে বিগত সকল গুনাহ মাফ',
            source: 'সহীহ বুখারী ২০০৮',
            detail: 'যে ব্যক্তি রমজানে ঈমান ও ইহতিসাবের সাথে রাতে (তারাবিহ) নামাজ পড়ে, তার পূর্ববর্তী সকল গুনাহ মাফ করা হয়।'
        },
        en: {
            reward: 'Tarawih prayer forgives all previous sins',
            source: 'Sahih Bukhari 2008',
            detail: 'Whoever stands in prayer during Ramadan with faith and seeking reward, all their previous sins will be forgiven.'
        }
    },

    // ─── TAHAJJUD ────────────────────────────────────────────────────

    tahajjud: {
        bn: {
            reward: 'তাহাজ্জুদ ফরজের পর সর্বোত্তম নামাজ',
            source: 'সহীহ মুসলিম ১১৬৩',
            detail: 'ফরজ নামাজের পর সর্বোত্তম নামাজ হলো রাতের নামাজ (তাহাজ্জুদ)। আল্লাহ রাতের শেষ তৃতীয়াংশে নিকটতম আসমানে অবতরণ করেন এবং বলেন: কে আমাকে ডাকবে, আমি তার ডাকে সাড়া দেব?'
        },
        en: {
            reward: 'Tahajjud is the best prayer after the obligatory ones',
            source: 'Sahih Muslim 1163',
            detail: 'The best prayer after the obligatory ones is the night prayer. Allah descends to the nearest heaven in the last third of the night and says: Who will call upon Me so I may answer?'
        }
    },

    // ─── ISHRAQ ──────────────────────────────────────────────────────

    ishraq: {
        bn: {
            reward: 'ইশরাক পড়লে পূর্ণ হজ ও উমরার সওয়াব',
            source: 'তিরমিযী ৫৮৬',
            detail: 'যে ব্যক্তি ফজর নামাজ জামাতে পড়ে, তারপর সূর্য উঠা পর্যন্ত বসে আল্লাহর যিকির করে, এরপর দুই রাকাত নামাজ পড়ে — তাহলে তার জন্য পূর্ণ একটি হজ ও উমরার সওয়াব।'
        },
        en: {
            reward: 'Ishraq = reward of a complete Hajj & Umrah',
            source: 'Tirmidhi 586',
            detail: 'Whoever prays Fajr in congregation, then sits remembering Allah until sunrise, then prays two rakahs — they will have the reward of a complete Hajj and Umrah.'
        }
    },

    // ─── CHASHT / DUHA ──────────────────────────────────────────────

    chasht: {
        bn: {
            reward: 'চাশত/দুহা নামাজে ৩৬০ সদকার সমান সওয়াব',
            source: 'সহীহ মুসলিম ৭২০',
            detail: 'প্রতিদিন সকালে তোমাদের শরীরের প্রতিটি জোড়ার জন্য একটি সদকা আদায় করতে হয়। প্রতিটি তাসবিহ সদকা, প্রতিটি তাহমিদ সদকা... আর দুহার (চাশত) দুই রাকাত নামাজ এই সবকিছুর (৩৬০টি সদকার) জন্য যথেষ্ট।'
        },
        en: {
            reward: 'Duha/Chasht prayer = 360 acts of charity',
            source: 'Sahih Muslim 720',
            detail: 'In the morning, charity is due on every joint. Every tasbih is charity, every tahmid is charity... And two rakahs of Duha prayer suffice for all 360 joints.'
        }
    },

    // ─── DAILY LEARNING ─────────────────────────────────────────────

    dailyLearning: {
        bn: {
            reward: 'ইলম অর্জনের পথে আল্লাহ জান্নাতের পথ সহজ করেন',
            source: 'সহীহ মুসলিম ২৬৯৯',
            detail: 'যে ব্যক্তি ইলম (জ্ঞান) অর্জনের জন্য পথ চলে, আল্লাহ তার জন্য জান্নাতের পথ সহজ করে দেন। ফেরেশতারা ইলম অন্বেষণকারীর জন্য তাদের ডানা বিছিয়ে দেন।'
        },
        en: {
            reward: 'Seeking knowledge — Allah eases the path to Jannah',
            source: 'Sahih Muslim 2699',
            detail: 'Whoever takes a path seeking knowledge, Allah will ease for them a path to Paradise. The angels lower their wings for the seeker of knowledge, pleased with what they do.'
        }
    },

    // ─── REFLECTION / TAWBAH ────────────────────────────────────────

    reflection: {
        bn: {
            reward: 'আত্মসমালোচনা ও তাওবা — আল্লাহ তাওবাকারীকে ভালোবাসেন',
            source: 'সূরা বাকারা ২:২২২',
            detail: 'নিশ্চয় আল্লাহ তাওবাকারীদের ভালোবাসেন এবং পবিত্রতা অর্জনকারীদের ভালোবাসেন।'
        },
        en: {
            reward: 'Self-reflection & Tawbah — Allah loves those who repent',
            source: 'Surah Al-Baqarah 2:222',
            detail: 'Indeed, Allah loves those who are constantly repenting and loves those who purify themselves.'
        }
    },
};

/**
 * Helper: Get sawab data for a given key and language.
 * Falls back to English if Bengali is missing.
 */
export const getSawab = (key, language = 'bn') => {
    const data = sawabData[key];
    if (!data) return null;
    return data[language] || data.en;
};

/**
 * Get a random motivational sawab fact for a category.
 */
export const getRandomSawab = (keys, language = 'bn') => {
    const validKeys = keys.filter(k => sawabData[k]);
    if (validKeys.length === 0) return null;
    const randomKey = validKeys[Math.floor(Math.random() * validKeys.length)];
    return { key: randomKey, ...getSawab(randomKey, language) };
};
