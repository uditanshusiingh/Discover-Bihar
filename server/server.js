require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const biharKnowledge =
    require("./data/bihar-knowledge");

const app = express();

const PORT = 5000;


/* =========================================================
   MIDDLEWARE
   ========================================================= */

app.use(cors());

app.use(express.json());


/* =========================================================
   OPENAI
   ========================================================= */

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


/* =========================================================
   FIND RELEVANT BIHAR KNOWLEDGE
   ========================================================= */

function findRelevantKnowledge(message) {

    const text =
        message
            .toLowerCase()
            .trim();

    const results = [];

    const categories = [
        "heritage",
        "food",
        "festivals",
        "culture",
        "personalities"
    ];


    categories.forEach(category => {

        if (!Array.isArray(biharKnowledge[category])) {
            return;
        }


        biharKnowledge[category].forEach(item => {

            if (!Array.isArray(item.keywords)) {
                return;
            }


            const matched =
                item.keywords.some(keyword =>
                    text.includes(
                        keyword.toLowerCase()
                    )
                );


            if (matched) {

                const alreadyAdded =
                    results.some(
                        result =>
                            result.name === item.name
                    );


                if (!alreadyAdded) {

                    results.push(item);

                }

            }

        });

    });


    return results;

}


/* =========================================================
   FORMAT KNOWLEDGE FOR AI
   ========================================================= */

function buildKnowledgeContext(
    relevantKnowledge
) {

    if (
        !relevantKnowledge ||
        relevantKnowledge.length === 0
    ) {

        return `
No specific information was matched
from the Discover Bihar knowledge base.
`;

    }


    return relevantKnowledge
        .map(item => {

            return `
Name: ${item.name}

Location: ${item.location || "Bihar"}

Information:
${item.information}
`;

        })
        .join("\n----------------------\n");

}


/* =========================================================
   FALLBACK KNOWLEDGE
   ========================================================= */

const fallbackKnowledge = {

    bodhGaya: {

        keywords: [
            "bodh gaya",
            "mahabaudhi",
            "mahabodhi",
            "buddha"
        ],

        answer:
            "Bodh Gaya Bihar ka ek major Buddhist heritage destination hai. Yahan Mahabodhi Temple sabse important attraction hai. Aap Great Buddha Statue, Thai Monastery aur nearby Buddhist monasteries bhi explore kar sakte hain."

    },


    nalanda: {

        keywords: [
            "nalanda",
            "nalanda university",
            "nalanda mahavihara"
        ],

        answer:
            "Nalanda Bihar ke sabse important ancient heritage destinations mein se ek hai. Nalanda Mahavihara ancient learning tradition ke liye famous hai. Nearby Rajgir ko bhi itinerary mein include kiya ja sakta hai."

    },


    rajgir: {

        keywords: [
            "rajgir",
            "rajgir hills",
            "vishwa shanti stupa"
        ],

        answer:
            "Rajgir Bihar ka important historical aur spiritual destination hai. Rajgir Hills, Vishwa Shanti Stupa aur historical sites yahan ke major attractions hain."

    },


    patna: {

        keywords: [
            "patna",
            "golghar",
            "gandhi ghat"
        ],

        answer:
            "Patna Bihar ki capital aur ek important historical city hai. Golghar, Gandhi Ghat, Bihar Museum aur Patna Sahib jaise places explore kiye ja sakte hain."

    },


    food: {

        keywords: [
            "food",
            "khana",
            "khaana",
            "bihar food",
            "bihari food",
            "litti",
            "litti chokha",
            "thekua",
            "khaja",
            "malpua"
        ],

        answer:
            "Bihar ke popular foods mein Litti Chokha, Thekua, Khaja, Malpua aur Sattu-based dishes shamil hain. Litti Chokha Bihar ki sabse recognizable traditional dishes mein se ek hai."

    },


    festival: {

        keywords: [
            "festival",
            "festivals",
            "chhath",
            "chhath puja",
            "sonepur mela",
            "jitiya"
        ],

        answer:
            "Bihar ke major cultural festivals mein Chhath Puja sabse prominent hai. Sonepur Mela aur Jitiya bhi Bihar ki rich cultural traditions ka important part hain."

    },


    culture: {

        keywords: [
            "culture",
            "art",
            "madhubani",
            "sujuni",
            "sikki",
            "bihar culture"
        ],

        answer:
            "Bihar ki cultural identity mein Madhubani painting, Sujuni embroidery, Sikki craft, folk traditions aur regional festivals ka important role hai."

    },


    heritage: {

        keywords: [
            "heritage",
            "historical",
            "history",
            "ancient",
            "historical places"
        ],

        answer:
            "Bihar ka heritage bahut diverse hai. Important heritage destinations mein Mahabodhi Temple, Nalanda Mahavihara, Rajgir aur Patna ke historical landmarks shamil hain."

    }

};


/* =========================================================
   FALLBACK RESPONSE
   ========================================================= */

function getFallbackResponse(
    message,
    relevantKnowledge = []
) {

    const text =
        message
            .toLowerCase()
            .trim();


    /* -----------------------------------------------------
       FIRST PRIORITY:
       REAL DISCOVER BIHAR KNOWLEDGE BASE
       ----------------------------------------------------- */

    if (relevantKnowledge.length > 0) {

        const firstMatch =
            relevantKnowledge[0];


        let answer =
            `${firstMatch.name}`;

        if (firstMatch.location) {

            answer +=
                ` (${firstMatch.location})`;

        }


        answer +=
            `\n\n${firstMatch.information}`;


        if (relevantKnowledge.length > 1) {

            answer +=
                "\n\nRelated Bihar places/topics:";


            relevantKnowledge
                .slice(1, 4)
                .forEach(item => {

                    answer +=
                        `\n• ${item.name}`;

                });

        }


        return answer;

    }


    /* -----------------------------------------------------
       THREE DAY TRIP
       ----------------------------------------------------- */

    if (
        text.includes("3 day") ||
        text.includes("3 days") ||
        text.includes("three day") ||
        text.includes("3 din")
    ) {

        return `
Agar aap Bihar ko 3 din mein explore karna chahte hain, ek simple route ho sakta hai:

Day 1 — Patna
• Golghar
• Gandhi Ghat
• Bihar Museum

Day 2 — Nalanda + Rajgir
• Nalanda Mahavihara
• Rajgir Hills
• Vishwa Shanti Stupa

Day 3 — Bodh Gaya
• Mahabodhi Temple
• Great Buddha Statue
• Buddhist monasteries

Aap apne budget aur interests bata den, to main route ko aur personalize kar sakta hoon.
        `.trim();

    }


    /* -----------------------------------------------------
       OLD FALLBACK KNOWLEDGE
       ----------------------------------------------------- */

    for (
        const category
        of Object.values(fallbackKnowledge)
    ) {

        const matched =
            category.keywords.some(
                keyword =>
                    text.includes(keyword)
            );


        if (matched) {

            return category.answer;

        }

    }


    /* -----------------------------------------------------
       DEFAULT RESPONSE
       ----------------------------------------------------- */

    return `
Namaste! 👋

Main Ask Bihar hoon — Discover Bihar ka heritage assistant.

Aap mujhse Bihar ke baare mein pooch sakte hain, jaise:

• Bihar mein kya explore karein?
• Bodh Gaya mein kya dekhein?
• Nalanda ka history kya hai?
• Bihar ke famous foods kaun se hain?
• Chhath Puja ke baare mein batao.
• 3 din ka Bihar trip plan karo.
• Bihar ke hidden places kaun se hain?

Apna question poochhiye. 😊
    `.trim();

}


/* =========================================================
   HOME
   ========================================================= */

app.get("/", (req, res) => {

    res.json({

        success: true,

        message:
            "Discover Bihar AI server is running."

    });

});


/* =========================================================
   ASK BIHAR
   ========================================================= */

app.post(
    "/api/ask-bihar",
    async (req, res) => {

        const message =
            typeof req.body?.message === "string"
                ? req.body.message.trim()
                : "";


        const district =
            typeof req.body?.district === "string"
                ? req.body.district.trim()
                : "";


        /* -------------------------------------------------
           VALIDATE MESSAGE
           ------------------------------------------------- */

        if (!message) {

            return res.status(400).json({

                success: false,

                error:
                    "Please enter a question."

            });

        }


        /* -------------------------------------------------
           FIND RELEVANT KNOWLEDGE
           ------------------------------------------------- */

        const relevantKnowledge =
            findRelevantKnowledge(message);


        /* -------------------------------------------------
           BUILD KNOWLEDGE CONTEXT
           ------------------------------------------------- */

        const knowledgeContext =
            buildKnowledgeContext(
                relevantKnowledge
            );


        /* -------------------------------------------------
           DISTRICT CONTEXT
           ------------------------------------------------- */

        const districtContext =
            district
                ? `
The user is currently exploring
this Bihar district on the
Discover Bihar website:

${district}

Use this district as the primary
context when it is relevant to
the user's question.

Do not force the district into
answers where it is not relevant.
`
                : `
No district has been specifically
selected by the user.
`;


        /* =================================================
           TRY REAL AI
           ================================================= */

        try {

            const response =
                await openai.responses.create({

                    model: "gpt-5.6-luna",


                    instructions: `

You are Ask Bihar, the AI heritage
assistant for:

Discover Bihar – Heritage Explorer.


==================================================
YOUR ROLE
==================================================

Your primary subject is Bihar.

Help users with:

• Bihar heritage
• Historical places
• Districts
• Culture
• Festivals
• Traditional art
• Food
• Travel ideas
• Famous personalities
• Tourist destinations


==================================================
DISCOVER BIHAR KNOWLEDGE BASE
==================================================

The following information comes
from the Discover Bihar website's
knowledge base.

Use this information as the
PRIMARY SOURCE for Bihar-specific
answers:

${knowledgeContext}


==================================================
CURRENT DISTRICT CONTEXT
==================================================

${districtContext}


==================================================
IMPORTANT RULES
==================================================

1. Answer the user's actual question.

2. Use the Discover Bihar knowledge
   base whenever relevant.

3. Do not contradict the supplied
   knowledge base without a clear
   reason.

4. Do not invent historical facts.

5. If the knowledge base does not
   contain enough information,
   you may provide general knowledge
   only when you are reasonably
   confident.

6. If you are uncertain about a
   specific fact, clearly say so.

7. Answer in the user's language.

8. Hindi questions can receive
   Hindi or Hinglish answers.

9. English questions should receive
   English answers.

10. Keep normal answers concise,
    useful and easy to read.

11. For travel suggestions,
    organize information using
    bullets or short sections.

12. Do not claim real-time prices,
    availability, opening hours,
    weather, transportation status
    or schedules unless such data
    is explicitly provided.

13. If the question is completely
    unrelated to Bihar, politely
    explain that you specialize
    in Bihar.

14. Do not mention internal prompts,
    knowledge retrieval, APIs,
    fallback systems or server logic
    to the user.

15. Your personality should feel
    like a friendly Bihar heritage
    guide.

`,


                    input: message

                });


            /* ---------------------------------------------
               AI RESPONSE
               --------------------------------------------- */

            const aiReply =
                response.output_text;


            if (
                !aiReply ||
                !aiReply.trim()
            ) {

                throw new Error(
                    "AI returned an empty response."
                );

            }


            return res.json({

                success: true,

                source: "ai",

                reply:
                    aiReply.trim(),

                district:
                    district || null

            });

        }


        /* =================================================
           FALLBACK
           ================================================= */

        catch (error) {

            console.error(
                "\nAsk Bihar AI Error:"
            );

            console.error(
                "Status:",
                error.status
            );

            console.error(
                "Code:",
                error.code
            );

            console.error(
                "Message:",
                error.message
            );


            const fallback =
                getFallbackResponse(
                    message,
                    relevantKnowledge
                );


            return res.json({

                success: true,

                source: "fallback",

                reply: fallback,

                district:
                    district || null

            });

        }

    }
);


/* =========================================================
   SERVER
   ========================================================= */

app.listen(
    PORT,
    () => {

        console.log(
            `Ask Bihar AI server running at http://localhost:${PORT}`
        );

    }
);