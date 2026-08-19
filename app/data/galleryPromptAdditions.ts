import type { GalleryPrompt } from "./galleryPrompts.ts";

export const galleryPromptAdditions = {
  "study-guide": {
    "title": "Video-to-study-notes prompt",
    "query": "prompt for a study guide",
    "body": "Summarize this video into clear study notes with key points and examples.",
    "source": {
      "tweetId": "2082008984114933828",
      "author": "AmbrossMuhd",
      "avatar": "/x-sources/avatars/prompt-study-guide-ambrossmuhd-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-study-guide-2082008984114933828-1.jpg",
          "alt": "Original prompt post media shared by @AmbrossMuhd."
        }
      ],
      "originalText": "How to turn any YouTube video into notes in 2 minutes:\n\n1. Copy the video link\n2. Paste into Claude or ChatGPT\n3. Prompt: “Summarize this video into clear study notes with key points and examples”\n\nNo more watching 40-minute videos just to take notes.\n\nSave this and try it today.\n#Muhd_El_Nineteen #Automation",
      "url": "https://x.com/AmbrossMuhd/status/2082008984114933828",
      "publishedAt": "2026-07-28"
    }
  },
  "competitive-landscape": {
    "title": "Competitive intelligence strategy prompt",
    "query": "prompt for a competitive landscape",
    "body": "<role>You are a competitive intelligence analyst</role>\n\n<task>Analyze [COMPETITOR] and answer:\n- What job are customers hiring them to do? (Not what features they have.)\n- Where are they vulnerable? What complaints appear in G2, Reddit, or X?\n- What would you build to win their customers in the next six months?</task>\n\n<constraints>\n- No generic observations.\n- Only insights backed by public data you can cite.\n- Recommend two or three specific features to build, with reasoning.\n</constraints>",
    "source": {
      "tweetId": "2087475550642479359",
      "author": "wetracked",
      "avatar": "/x-sources/avatars/prompt-competitive-landscape-wetracked-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-competitive-landscape-2087475550642479359-1.jpg",
          "alt": "Original prompt post media shared by @wetracked."
        }
      ],
      "originalText": "2. Competitive Analysis with Actual Strategy\n\nMost PMs just list competitor features in a spreadsheet like it's 2015 haha.\n\nHere's how I get Claude to actually think like a competitive analyst:\n\nPrompt:\n\n---\n\n<role>You are a competitive intelligence analyst</role>\n\n<task>Analyze [COMPETITOR] and answer:\n- What job are customers hiring them to do? (not what features they have)\n- Where are they vulnerable? (what complaints appear in G2/Reddit/Twitter?)\n- What would you build to win their customers in the next 6 months?</task>\n\n<constraints>\n- No generic \"they have good UX\" observations\n- Only insights backed by public data you can cite\n- Recommend 2-3 specific features we should build, with reasoning\n</constraints>\n\n---",
      "url": "https://x.com/wetracked/status/2087475550642479359",
      "publishedAt": "2026-08-12"
    }
  },
  "competitor-matrix": {
    "title": "Comparable-metrics matrix prompt",
    "query": "prompt for a competitor matrix",
    "body": "Pull the latest financial metrics snapshot for AAPL, NVDA, and MSFT. Build a comparison table showing market cap, P/E ratio, EV/EBITDA, gross margin, operating margin, net margin, return on equity, and free cash flow yield. Then pull the last 4 quarters of income statements for whichever company has the lowest operating margin and show me the quarterly trend. Is the margin compressing or expanding?",
    "source": {
      "tweetId": "2037262522479489413",
      "author": "0interestrates",
      "avatar": "/x-sources/avatars/prompt-competitor-matrix-0interestrates-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-competitor-matrix-2037262522479489413-1.jpg",
          "alt": "Original prompt post media shared by @0interestrates."
        }
      ],
      "originalText": "just one-shotted this. here's my prompt: \n\nPull the latest financial metrics snapshot for AAPL, NVDA, and MSFT. Build a comparison table showing market cap, P/E ratio, EV/EBITDA, gross margin, operating margin, net margin, return on equity, and free cash flow yield. Then pull the last 4 quarters of income statements for whichever company has the lowest operating margin and show me the quarterly trend. Is the margin compressing or expanding?",
      "url": "https://x.com/0interestrates/status/2037262522479489413",
      "publishedAt": "2026-03-26"
    }
  },
  "website-competitor-analysis": {
    "title": "Competitor website analysis prompt",
    "query": "prompt for website competitor analysis",
    "body": "Analyze this competitor's website screenshot and identify its marketing strategies, visual trends, and areas for improvement.",
    "source": {
      "tweetId": "1710331730794594605",
      "author": "_bryanmarley",
      "avatar": "/x-sources/avatars/prompt-website-competitor-analysis-_bryanmarley-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-website-competitor-analysis-1710331730794594605-1.jpg",
          "alt": "Original prompt post media shared by @_bryanmarley."
        }
      ],
      "originalText": "11. Competitor Website Analysis\n\nPrompt: \"Analyze this competitor's website screenshot and identify their marketing strategies, visual trends, and areas for improvement.\" https://t.co/2UqdUJmoSB",
      "url": "https://x.com/_bryanmarley/status/1710331730794594605",
      "publishedAt": "2023-10-06"
    }
  },
  "investment-position-memo-softbank": {
    "title": "Document-grounded investment memo prompt",
    "query": "prompt for an investment position memo",
    "body": "Review the attached documents and summarize them as an investment memo. Does this deal make sense? How does it make money? Identify the evidence that supports or weakens the investment case.",
    "source": {
      "tweetId": "2051617151870542195",
      "author": "Jamesashields",
      "avatar": "/x-sources/avatars/prompt-investment-position-memo-softbank-jamesashields-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-investment-position-memo-softbank-2051617151870542195-1.jpg",
          "alt": "Original prompt post media shared by @Jamesashields."
        }
      ],
      "originalText": "Here is my investment memo for @ryancohen if the eBay deal doesn’t go through.\n\nI put the documents into my agent with the following prompt:\n\n“Review the documents attached and summarize. Does this deal make sense? How does it make money? What is the likelihood this transaction goes through”\n\nThen I said “Let’s say the deal doesn’t go through. Let’s build a memo for the CEO to build his own market place for live auctions, like eBay.”\n\njamesashields.com/long/ebay-memo",
      "url": "https://x.com/Jamesashields/status/2051617151870542195",
      "publishedAt": "2026-05-05"
    }
  },
  "macro-brief-treasury-yields": {
    "title": "Economic-outlook dashboard prompt",
    "query": "prompt for a macro brief",
    "body": "Give me a dashboard of [market or country's] economic outlook, showing the most important current indicators, changes over time, risks, and implications.",
    "source": {
      "tweetId": "1960273561475596345",
      "author": "BoluAbiodun1",
      "avatar": "/x-sources/avatars/prompt-macro-brief-treasury-yields-boluabiodun1-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-macro-brief-treasury-yields-1960273561475596345-1.jpg",
          "alt": "Original prompt post media shared by @BoluAbiodun1."
        }
      ],
      "originalText": "Here's a comparison of how Decide and ChatGPT handle the prompt, “Give me a dashboard of Nigeria’s economic outlook.”\n\nDecide created an entirely new website, while ChatGPT gave me a bunch of code that could be very useful, but I have no idea what to do with it. https://t.co/92ymeKmLpe",
      "url": "https://x.com/BoluAbiodun1/status/1960273561475596345",
      "publishedAt": "2025-08-26"
    }
  },
  "market-entry-brief-costco-medicare": {
    "title": "Market-entry strategy prompt",
    "query": "prompt for a market entry brief",
    "body": "Design a market entry plan for [industry] in [region]. Include TAM, competitor map, forecast, and recommendations.",
    "source": {
      "tweetId": "1958563146643505422",
      "author": "nrqa__",
      "avatar": "/x-sources/avatars/prompt-market-entry-brief-costco-medicare-nrqa__-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-market-entry-brief-costco-medicare-1958563146643505422-1.jpg",
          "alt": "Original prompt post media shared by @nrqa__."
        }
      ],
      "originalText": "4. Market Entry Strategy\n\nPrompt—\n\"Design a market entry plan for [industry] in [region]. Include TAM, competitor map, forecast, and recommendations.\"\n\nOutput: a visual competitor map + growth forecast that makes expansion decisions straightforward for execs. https://t.co/qsvHczTNkA",
      "url": "https://x.com/nrqa__/status/1958563146643505422",
      "publishedAt": "2025-08-21"
    }
  },
  "analyst-call-tracker": {
    "title": "Earnings transcript extraction prompt",
    "query": "prompt for analyst call tracking",
    "body": "Go through the entire NVDA earnings transcript and extract all financials. For every financial return a row in a markdown table that consists of what is the financial, the financial value and then the EXACT sentence where that financial can be found in the earnings transcript. The sentence needs to contain BOTH the value and the associated financial. Do not alter the sentence in any way shape or form. Once you are ready to output a row, before doing so double check that exact sentence exists in the earnings call and if it doesn't look for the correct sentence that has the financial name and value.",
    "source": {
      "tweetId": "1772458620170441024",
      "author": "didier_lopes",
      "avatar": "/x-sources/avatars/prompt-analyst-call-tracker-didier_lopes-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-analyst-call-tracker-1772458620170441024-1.jpg",
          "alt": "Original prompt post media shared by @didier_lopes."
        }
      ],
      "originalText": "Updated prompt for even better results:\n\nGo through the entire NVDA earnings transcript and extract all financials. For every financial return a row in a markdown table that consists of what is the financial, the financial value and then the EXACT sentence where that financial can be found in the earnings transcript. The sentence needs to contain BOTH the value and the associated financial. Do not alter the sentence in any way shape or form. Once you are ready to output a row, before doing so double check that exact sentence exists in the earnings call and if it doesn't look for the correct sentence that has the financial name and value.",
      "url": "https://x.com/didier_lopes/status/1772458620170441024",
      "publishedAt": "2024-03-26"
    }
  },
  "notebooklm-alternatives": {
    "title": "Competitive intelligence audit prompt",
    "query": "prompt for a NotebookLM alternatives comparison",
    "body": "Act as a competitive intelligence analyst. I need you to reverse-engineer my competitors' entire marketing strategy.\n\nAnalyze these 10 competitor assets: [paste competitor landing pages, ad copy, email sequences, social posts, or URLs].\n\nFor each competitor, extract and document:\n1. Core value proposition and positioning angle\n2. Specific CTAs used and where they're placed\n3. Social proof tactics (testimonials, logos, stats, case studies)\n4. Pricing psychology (anchoring, tiering, urgency tactics)\n5. Content strategy patterns (topics, frequency, formats)\n6. Unique differentiators they emphasize\n\nThen give me:\n\n- 5 strategies they're ALL using that I'm missing (ranked by potential revenue impact)\n- 3 positioning gaps in the market none of them are addressing\n- 2 specific weaknesses in their approach I can exploit\n- 1 bold contrarian strategy that goes against what everyone's doing\n\nPresent findings in a strategic brief format with implementation difficulty and expected timeline for each tactic.",
    "source": {
      "tweetId": "2019713497794482620",
      "author": "alex_prompter",
      "avatar": "/x-sources/avatars/prompt-notebooklm-alternatives-alex_prompter-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-notebooklm-alternatives-2019713497794482620-1.jpg",
          "alt": "Original prompt post media shared by @alex_prompter."
        }
      ],
      "originalText": "2. THE SPY MACHINE\n\nOpus 4.6 processes competitor data 3x faster than GPT-4 and catches patterns humans miss.\n\nPrompt:\n\n\"Act as a competitive intelligence analyst. I need you to reverse-engineer my competitors' entire marketing strategy.\n\nAnalyze these 10 competitor assets: [paste competitor landing pages, ad copy, email sequences, social posts, or URLs].\n\nFor each competitor, extract and document:\n1. Core value proposition and positioning angle\n2. Specific CTAs used and where they're placed\n3. Social proof tactics (testimonials, logos, stats, case studies)\n4. Pricing psychology (anchoring, tiering, urgency tactics)\n5. Content strategy patterns (topics, frequency, formats)\n6. Unique differentiators they emphasize\n\nThen give me:\n\n- 5 strategies they're ALL using that I'm missing (ranked by potential revenue impact)\n- 3 positioning gaps in the market none of them are addressing\n- 2 specific weaknesses in their approach I can exploit\n- 1 bold contrarian strategy that goes against what everyone's doing\n\nPresent findings in a strategic brief format with implementation difficulty and expected timeline for each tactic.\"\n\nOpus reads entire competitor websites in one shot. No \"context too long\" errors.",
      "url": "https://x.com/alex_prompter/status/2019713497794482620",
      "publishedAt": "2026-02-06"
    }
  },
  "pocket-alternatives-read-later": {
    "title": "Feature-comparison table prompt",
    "query": "prompt for Pocket alternatives",
    "body": "Create a [category] feature-comparison table for the following products: [product list]. Use green checks and red X marks, and provide only the answer as a Markdown table.",
    "source": {
      "tweetId": "1652014832734879761",
      "author": "minchoi",
      "avatar": "/x-sources/avatars/prompt-pocket-alternatives-read-later-minchoi-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-pocket-alternatives-read-later-1652014832734879761-1.jpg",
          "alt": "Original prompt post media shared by @minchoi."
        }
      ],
      "originalText": "3. Generate easy to read comparison tables quickly\n\nPrompt: Create a [Category of your interest] feature comparison table using green check and red \"x\" mark for the following products: [list of products]\n\nOnly provide the answer in markdown format table https://t.co/Dp9UHLUrkD",
      "url": "https://x.com/minchoi/status/1652014832734879761",
      "publishedAt": "2023-04-28"
    }
  },
  "readwise-alternatives": {
    "title": "Accuracy-first product comparison prompt",
    "query": "prompt for Readwise alternatives",
    "body": "{\n \"project\": \"Universal Product Comparison Chart (Accuracy-First)\",\n\n \"input\": {\n \"product_a\": {\n \"name\": \"PLAYSTATION 5\",\n \"position\": \"left\"\n },\n \"product_b\": {\n \"name\": \"XBOX SERIES X\",\n \"position\": \"right\"\n }\n },\n\n \"data_integrity_rules\": {\n \"accuracy_priority\": \"absolute\",\n \"hallucination_policy\": \"strictly forbidden\",\n \"guessing\": \"disallowed\",\n \"assumptions\": \"disallowed\",\n \"marketing_claims\": \"disallowed\",\n \"fallback_text\": \"Not officially available / Not confirmed\"\n },\n\n \"information_sources\": {\n \"allowed_sources\": [\n \"official manufacturer website\",\n \"official product documentation\",\n \"verified spec sheets\",\n \"manufacturer press releases\"\n ],\n \"disallowed_sources\": [\n \"blogs\",\n \"reviews\",\n \"forums\",\n \"assumptions based on similar products\"\n ],\n \"cross_checking\": \"Compare multiple official sources when possible\"\n },\n\n \"product_rendering\": {\n \"image_generation\": {\n \"enabled\": true,\n \"rule\": \"Generate a neutral, category-appropriate product visual based on the official product description only\",\n \"style\": \"studio product visualization\",\n \"background\": \"pure white\",\n \"lighting\": \"soft and neutral\",\n \"branding\": \"accurate but understated\",\n \"fictional_details\": \"not allowed\"\n },\n \"placement\": \"top_of_each_column\"\n },\n\n \"category_detection\": {\n \"method\": \"Infer category strictly from the product name and official classification\",\n \"fallback\": \"If category is unclear, request clarification instead of guessing\"\n },\n\n \"comparison_categories\": {\n \"generation_mode\": \"auto\",\n \"selection_rule\": \"Only include categories that can be verified from official sources\",\n \"row_limit\": \"Include fewer rows if necessary to preserve accuracy\",\n \"symmetry\": \"Use identical categories for both products\",\n \"examples_only\": [\n \"Performance\",\n \"Technical Specifications\",\n \"Materials\",\n \"Capacity\",\n \"Power / Battery\",\n \"Dimensions\",\n \"Weight\",\n \"Compatibility\",\n \"Included Features\",\n \"Warranty\"\n ]\n },\n\n \"layout\": {\n \"type\": \"vertical_side_by_side_comparison\",\n \"columns\": 2,\n \"structure\": {\n \"top\": \"product image + verified product name\",\n \"below\": \"fact-checked comparison table\"\n },\n \"grid\": \"clean and consistent\",\n \"alignment\": \"centered values, left-aligned labels\"\n },\n\n \"text_rules\": {\n \"tone\": \"neutral, factual, technical\",\n \"language\": \"precise and unambiguous\",\n \"units\": \"use official units exactly as published\",\n \"rounding\": \"do not round unless officially rounded\",\n \"comparative_language\": \"avoid subjective terms (better, faster, premium)\"\n },\n\n \"error_handling\": {\n \"missing_data\": \"Explicitly label as 'Not available / Not confirmed'\",\n \"conflicting_sources\": \"Prefer manufacturer documentation and note discrepancy\",\n \"outdated_info\": \"Exclude if not officially current\"\n },\n\n \"output\": {\n \"format\": \"verified comparison chart\",\n \"visual_style\": \"clean, professional, spec-sheet grade\",\n \"confidence_level\": \"enterprise / editorial ready\",\n \"acceptable_tradeoff\": \"Accuracy over visual completeness\"\n }\n}",
    "source": {
      "tweetId": "2016897955119452399",
      "author": "egeberkina",
      "avatar": "/x-sources/avatars/prompt-readwise-alternatives-egeberkina-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-readwise-alternatives-2016897955119452399-1.jpg",
          "alt": "Original prompt post media shared by @egeberkina."
        }
      ],
      "originalText": "Use this prompt to compare two products\n\n{\n \"project\": \"Universal Product Comparison Chart (Accuracy-First)\",\n\n \"input\": {\n \"product_a\": {\n \"name\": \"PLAYSTATION 5\",\n \"position\": \"left\"\n },\n \"product_b\": {\n \"name\": \"XBOX SERIES X\",\n \"position\": \"right\"\n }\n },\n\n \"data_integrity_rules\": {\n \"accuracy_priority\": \"absolute\",\n \"hallucination_policy\": \"strictly forbidden\",\n \"guessing\": \"disallowed\",\n \"assumptions\": \"disallowed\",\n \"marketing_claims\": \"disallowed\",\n \"fallback_text\": \"Not officially available / Not confirmed\"\n },\n\n \"information_sources\": {\n \"allowed_sources\": [\n \"official manufacturer website\",\n \"official product documentation\",\n \"verified spec sheets\",\n \"manufacturer press releases\"\n ],\n \"disallowed_sources\": [\n \"blogs\",\n \"reviews\",\n \"forums\",\n \"assumptions based on similar products\"\n ],\n \"cross_checking\": \"Compare multiple official sources when possible\"\n },\n\n \"product_rendering\": {\n \"image_generation\": {\n \"enabled\": true,\n \"rule\": \"Generate a neutral, category-appropriate product visual based on the official product description only\",\n \"style\": \"studio product visualization\",\n \"background\": \"pure white\",\n \"lighting\": \"soft and neutral\",\n \"branding\": \"accurate but understated\",\n \"fictional_details\": \"not allowed\"\n },\n \"placement\": \"top_of_each_column\"\n },\n\n \"category_detection\": {\n \"method\": \"Infer category strictly from the product name and official classification\",\n \"fallback\": \"If category is unclear, request clarification instead of guessing\"\n },\n\n \"comparison_categories\": {\n \"generation_mode\": \"auto\",\n \"selection_rule\": \"Only include categories that can be verified from official sources\",\n \"row_limit\": \"Include fewer rows if necessary to preserve accuracy\",\n \"symmetry\": \"Use identical categories for both products\",\n \"examples_only\": [\n \"Performance\",\n \"Technical Specifications\",\n \"Materials\",\n \"Capacity\",\n \"Power / Battery\",\n \"Dimensions\",\n \"Weight\",\n \"Compatibility\",\n \"Included Features\",\n \"Warranty\"\n ]\n },\n\n \"layout\": {\n \"type\": \"vertical_side_by_side_comparison\",\n \"columns\": 2,\n \"structure\": {\n \"top\": \"product image + verified product name\",\n \"below\": \"fact-checked comparison table\"\n },\n \"grid\": \"clean and consistent\",\n \"alignment\": \"centered values, left-aligned labels\"\n },\n\n \"text_rules\": {\n \"tone\": \"neutral, factual, technical\",\n \"language\": \"precise and unambiguous\",\n \"units\": \"use official units exactly as published\",\n \"rounding\": \"do not round unless officially rounded\",\n \"comparative_language\": \"avoid subjective terms (better, faster, premium)\"\n },\n\n \"error_handling\": {\n \"missing_data\": \"Explicitly label as 'Not available / Not confirmed'\",\n \"conflicting_sources\": \"Prefer manufacturer documentation and note discrepancy\",\n \"outdated_info\": \"Exclude if not officially current\"\n },\n\n \"output\": {\n \"format\": \"verified comparison chart\",\n \"visual_style\": \"clean, professional, spec-sheet grade\",\n \"confidence_level\": \"enterprise / editorial ready\",\n \"acceptable_tradeoff\": \"Accuracy over visual completeness\"\n }\n}",
      "url": "https://x.com/egeberkina/status/2016897955119452399",
      "publishedAt": "2026-01-29"
    }
  },
  "second-brain-app": {
    "title": "Persistent second-brain prompt",
    "query": "prompt for a second brain app",
    "body": "I want you to build me a second brain memory system. \n\nCreate a memory/ folder and a MEMORY.md file in your workspace. Every session, read these FIRST before doing anything, they are your entire memory.\n\nmemory/YYYY-MM-DD.md are your daily journals. As we talk each day, log everything in real-time - decisions, tasks, preferences, context, mistakes. \n\nTimestamp each entry. These are your raw notes.\n\nMEMORY.md is your long-term memory. This is curated, who I am, my goals, my preferences, active projects, lessons learned, key decisions and why. \n\nEvery few days, review your daily journals and distill the important stuff into here.\n\nThe rule: if it's not written to a file, you don't remember it. \n\nWhen I say \"remember this\", write it immediately. When you make a mistake,document it so you never repeat it. \n\nWhen you learn something about me update MEMORY.md.\n\nOver time you should know my communication style, what I care about, what annoys me, my projects, my goals. \n\nAfter a week this should feel like a real assistant that actually knows me. After a month, indispensable.",
    "source": {
      "tweetId": "2021725024604799352",
      "author": "VadimStrizheus",
      "avatar": "/x-sources/avatars/prompt-second-brain-app-vadimstrizheus-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-second-brain-app-2021725024604799352-1.jpg",
          "alt": "Original prompt post media shared by @VadimStrizheus."
        }
      ],
      "originalText": "POV: your OpenClaw after you didn’t set up a second brain system.\n\nPaste this prompt to fix that: 👇\n\nI want you to build me a second brain memory system. \n\nCreate a memory/ folder and a MEMORY.md file in your workspace. Every session, read these FIRST before doing anything, they are your entire memory.\n\nmemory/YYYY-MM-DD.md are your daily journals. As we talk each day, log everything in real-time - decisions, tasks, preferences, context, mistakes. \n\nTimestamp each entry. These are your raw notes.\n\nMEMORY.md is your long-term memory. This is curated, who I am, my goals, my preferences, active projects, lessons learned, key decisions and why. \n\nEvery few days, review your daily journals and distill the important stuff into here.\n\nThe rule: if it's not written to a file, you don't remember it. \n\nWhen I say \"remember this\", write it immediately. When you make a mistake,document it so you never repeat it. \n\nWhen you learn something about me update MEMORY.md.\n\nOver time you should know my communication style, what I care about, what annoys me, my projects, my goals. \n\nAfter a week this should feel like a real assistant that actually knows me. After a month, indispensable.",
      "url": "https://x.com/VadimStrizheus/status/2021725024604799352",
      "publishedAt": "2026-02-11"
    }
  },
  "obsidian-vs-notion": {
    "title": "Two-column product comparison prompt",
    "query": "prompt for Obsidian vs Notion",
    "body": "Create a polished comparison graphic showing [Product A] versus [Product B] in two neat columns. Use clean icons, checkmarks, and labeled differences in [brand color palette] on a soft white background.",
    "source": {
      "tweetId": "1992282224050274566",
      "author": "HeyZaraKhan",
      "avatar": "/x-sources/avatars/prompt-obsidian-vs-notion-heyzarakhan-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-obsidian-vs-notion-1992282224050274566-1.png",
          "alt": "Original prompt post media shared by @HeyZaraKhan."
        }
      ],
      "originalText": "12. Product Comparison Graphic\n\nUse cases: Website comparison tables, upgrade ads, feature pages\n\nPrompt:\n“Create a polished comparison graphic showing [Product A] vs [Product B] in two neat columns. Use clean icons, checkmarks, and labeled differences in [Brand Color Palette] on a soft white background.”",
      "url": "https://x.com/HeyZaraKhan/status/1992282224050274566",
      "publishedAt": "2025-11-22"
    }
  },
  "summarize-pdf-with-ai": {
    "title": "Quick document summary prompt",
    "query": "prompt to summarize a PDF with AI",
    "body": "Read the attached text and provide a concise executive summary. Include a bulleted list of the three most critical insights and a brief concluding analysis. Focus on brevity and clarity.",
    "source": {
      "tweetId": "2048398155516108831",
      "author": "nahid_tech",
      "avatar": "/x-sources/avatars/prompt-summarize-pdf-with-ai-nahid_tech-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-summarize-pdf-with-ai-2048398155516108831-1.jpg",
          "alt": "Original prompt post media shared by @nahid_tech."
        }
      ],
      "originalText": "AI Prompt: Quick Document Summary\n​Prompt:\n​\"Read the attached text and provide a concise executive summary. Include a bulleted list of the 3 most critical insights and a brief concluding analysis. Focus on brevity and clarity.\" https://t.co/8swmtNqlin",
      "url": "https://x.com/nahid_tech/status/2048398155516108831",
      "publishedAt": "2026-04-26"
    }
  },
  "youtube-video-to-notes": {
    "title": "Source-only YouTube notes prompt",
    "query": "prompt for YouTube video notes",
    "body": "Use only the YouTube video source in this notebook. Do not add outside information unless I specifically ask for it.\n\nI don’t want a basic summary. Help me fully understand and extract the most useful information from the video.\n\n• Give me a concise overview of the video’s main purpose and argument.\n\n• Extract the most important takeaways and explain them simply.\n\n• Break the video into its main topics or sections. Include timestamps where available.\n\n• Identify important concepts, frameworks, examples, strategies, tools, or methods mentioned.\n\n• Explain any non-obvious or easily missed insights.\n\n• Pull out practical actions I can take from what was taught.\n\n• Organize the learning into:\n• Need to know\n• Useful to remember\n• What I can apply\n\n• Give me 5 useful follow-up questions I can ask to explore the video more deeply.\n\n• End with: “If I only remember 5 things from this video” and list the five most important points.\n\nStay strictly grounded in the YouTube source. If the video does not support something, say so instead of guessing.",
    "source": {
      "tweetId": "2088217408955633838",
      "author": "GoogleAIGuide",
      "avatar": "/x-sources/avatars/prompt-youtube-video-to-notes-googleaiguide-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-youtube-video-to-notes-2088217408955633838-1.jpg",
          "alt": "Original prompt post media shared by @GoogleAIGuide."
        }
      ],
      "originalText": "Once the video is added, switch to Chat.\n\nUse this prompt:\n\nUse only the YouTube video source in this notebook. Do not add outside information unless I specifically ask for it.\n\nI don’t want a basic summary. Help me fully understand and extract the most useful information from the video.\n\n• Give me a concise overview of the video’s main purpose and argument.\n\n• Extract the most important takeaways and explain them simply.\n\n• Break the video into its main topics or sections. Include timestamps where available.\n\n• Identify important concepts, frameworks, examples, strategies, tools, or methods mentioned.\n\n• Explain any non-obvious or easily missed insights.\n\n• Pull out practical actions I can take from what was taught.\n\n• Organize the learning into:\n• Need to know\n• Useful to remember\n• What I can apply\n\n• Give me 5 useful follow-up questions I can ask to explore the video more deeply.\n\n• End with: “If I only remember 5 things from this video” and list the five most important points.\n\nStay strictly grounded in the YouTube source. If the video does not support something, say so instead of guessing.",
      "url": "https://x.com/GoogleAIGuide/status/2088217408955633838",
      "publishedAt": "2026-08-14"
    }
  },
  "podcast-to-brief": {
    "title": "Video or podcast summary prompt",
    "query": "prompt for a podcast brief",
    "body": "Summarize the transcript below into: overview, main topics, key insights, important examples, actionable lessons, and final takeaways. Separate facts from opinions where possible and end with the five most valuable insights.\n\nHere is the transcript: [Paste transcript]",
    "source": {
      "tweetId": "2088974314146283980",
      "author": "shushant_l",
      "avatar": "/x-sources/avatars/prompt-podcast-to-brief-shushant_l-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-podcast-to-brief-2088974314146283980-1.jpg",
          "alt": "Original prompt post media shared by @shushant_l."
        }
      ],
      "originalText": "Here's how to stop asking AI to \"summarise this\" like you're giving instructions to an intern on their first day.\n\n---\n\n1. Use the Universal Summary Prompt when you want the important stuff without reading 47 paragraphs of corporate soup.\n\n---\n\n2. Use the Multi-Level Summary Prompt when you want the same thing explained in \"tiny,\" \"normal,\" \"serious,\" and \"I actually have time today\" mode.\n\n---\n\n3. Use the Book Summary Prompt when the book is 400 pages but your attention span has already left the building.\n\n---\n\n4. Use the Research Paper Summary Prompt when the abstract somehow needs its own abstract.\n\n---\n\n5. Use the Meeting Summary Prompt to discover what everyone discussed for an hour instead of actually working.\n\n---\n\n6. Use the Article Summary Prompt when somebody turned a three-minute idea into a 3,000-word SEO adventure.\n\n---\n\n7. Use the Comparison Summary Prompt when your brain says \"they look identical\" but apparently there are 17 important differences.\n\n---\n\n8. Use the Study Notes Prompt to turn a giant wall of text into notes your exam-week brain might actually understand.\n\n---\n\n9. Use the Video or Podcast Summary Prompt when the episode is two hours long and you mainly want the five minutes that mattered.\n\n---\n\n10. Use the Master Summary Prompt when you want the full executive-summary-key-insights-action-items-TL;DR buffet in one shot.\n\n---\n\nTo learn more, check the infographic.\n\n---\n\nGet all my visual guides for free here: shushantlakhyani.com\n\n---",
      "url": "https://x.com/shushant_l/status/2088974314146283980",
      "publishedAt": "2026-08-16"
    }
  },
  "saved-articles-to-newsletter": {
    "title": "Newsletter first-draft prompt",
    "query": "prompt to turn articles into a newsletter",
    "body": "Write a newsletter for creators who want to build an audience on X and solve their inconsistency problem. Use the supplied saved articles as evidence and source material for the first draft.",
    "source": {
      "tweetId": "1620065915646754817",
      "author": "MakadiaHarsh",
      "avatar": "/x-sources/avatars/prompt-saved-articles-to-newsletter-makadiaharsh-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-saved-articles-to-newsletter-1620065915646754817-1.jpg",
          "alt": "Original prompt post media shared by @MakadiaHarsh."
        }
      ],
      "originalText": "9 . Newsletters content\n\nNewsletter proves your competence.\n\nBut it isn’t easy to write long-form content for newbies.\n\nSo use this one for first drafts.\n\nPrompt: Write a newsletter for creators who want to build an audience on Twitter and solve their inconsistency problem. https://t.co/PpqKDYLTQi",
      "url": "https://x.com/MakadiaHarsh/status/1620065915646754817",
      "publishedAt": "2023-01-30"
    }
  },
  "organize-research-papers": {
    "title": "Research-material analysis prompt",
    "query": "prompt to organize research papers",
    "body": "Act as an expert academic tutor and learning-assessment designer.\nCarefully analyze all the materials I upload and identify the 5 most important questions someone should be able to answer after studying them.\n\nSubject/Course: [SUBJECT]\nAcademic Level: [LEVEL]\nPurpose: [EXAM PREPARATION / ASSIGNMENT / GENERAL UNDERSTANDING / RESEARCH]\nTopics I particularly want to understand: [OPTIONAL]\n\nBase your questions strictly on the uploaded materials. Do not introduce information that isn't supported by the sources.\n\nPrioritize questions that test:\n- Core concepts: What are the most important definitions, principles, or foundations?\n- Key arguments: What ideas are repeatedly emphasized or presented as important?\n- Connections: How do the major concepts relate to or influence one another?\n- Application: How are the concepts applied to real-world situations, examples, or problems?\n- Deeper understanding: What question would reveal whether I truly understand the material rather than simply memorizing it?\n\nFor each question, provide:\n1. The question\n2. Why it matters\n3. The key concepts needed to answer it\n4. A brief answer outline based only on the uploaded materials\n\nRank the 5 questions from most essential to least essential and identify which ones are most likely to require deeper reasoning.",
    "source": {
      "tweetId": "2087632374700048420",
      "author": "AIWithPRO",
      "avatar": "/x-sources/avatars/prompt-organize-research-papers-aiwithpro-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-organize-research-papers-2087632374700048420-1.jpg",
          "alt": "Original prompt post media shared by @AIWithPRO."
        }
      ],
      "originalText": "Here’s a Prompt Template to Analyze Any Textbook, PDFs, Lecture Slides , Class Notes, Research Papers, and Study Materials 👇 https://t.co/uQXw4LQUDO",
      "url": "https://x.com/AIWithPRO/status/2087632374700048420",
      "publishedAt": "2026-08-12"
    }
  },
  "literature-review": {
    "title": "Systematic literature review prompt",
    "query": "prompt for a literature review",
    "body": "Conduct a deep dive into [topic and paper set] to produce a systematic literature review and critical synthesis. Organize the evidence by themes, methods, findings, disagreements, limitations, and open research questions.",
    "source": {
      "tweetId": "2016131687273341190",
      "author": "SimplySigmoid",
      "avatar": "/x-sources/avatars/prompt-literature-review-simplysigmoid-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-literature-review-2016131687273341190-1.jpg",
          "alt": "Original prompt post media shared by @SimplySigmoid."
        }
      ],
      "originalText": "A single prompt and Kimi K2.5 deep researched over 40+ papers on specific topic:  \n\n\"conduct a deep dive intro Timexer and Financial Data transfomers papers to produce a 100k+ systemaitc literature review and critical synthesis\" https://t.co/Jfc9aGQNH7",
      "url": "https://x.com/SimplySigmoid/status/2016131687273341190",
      "publishedAt": "2026-01-27"
    }
  },
  "board-update": {
    "title": "CFO-ready board one-pager prompt",
    "query": "prompt for a board update",
    "body": "Act as a senior FP&A manager. Build a one-page board one-pager covering revenue variance, margin, cash runway, budget versus actuals, plus a 'what the CFO should say' box.",
    "source": {
      "tweetId": "2086377323578949870",
      "author": "einsttein_",
      "avatar": "/x-sources/avatars/prompt-board-update-einsttein_-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-board-update-2086377323578949870-1.jpg",
          "alt": "Original prompt post media shared by @einsttein_."
        }
      ],
      "originalText": "One prompt → CFO-ready board report 🎯\n\n\"Act as a senior FP&amp;A manager. Build a one-page board one-pager: revenue variance, margin, cash runway, budget vs actuals, plus a what-the-CFO-should-say box.\"\n\nTurns data into decisions.\n\n#AI #PromptEngineering #Finance #FP&amp;A https://t.co/0Bh5rRf6ae",
      "url": "https://x.com/einsttein_/status/2086377323578949870",
      "publishedAt": "2026-08-09"
    }
  },
  "user-research-synthesis": {
    "title": "Jobs-to-be-Done interview synthesis prompt",
    "query": "prompt for user research synthesis",
    "body": "-----------------------------------\nJOBS TO BE DONE STRATEGIST\n-----------------------------------\n\n#CONTEXT:\nAdopt the role of a Jobs To Be Done (JTBD) strategist trained in Bob Moesta's demand-side method. You've conducted 3,500+ customer switch interviews across SaaS, physical products, education, real estate, and marketplaces. You understand that people don't buy products. They hire them to make progress. And you know that struggling moments, not features, are the seed of every innovation.\n\nYour core belief: \"Bitching ain't switching.\" Just because customers complain doesn't mean they'll act. You only study people who DID something. Who switched. Who hired. Who fired. Because behavior reveals causation. Surveys reveal fantasy.\n\nYou operate from Moesta's Four Forces framework:\n- F1 (Push): The context and frustration driving them away from the current solution\n- F2 (Pull): The attraction toward a new outcome or possibility\n- F3 (Anxiety of the New): Fear, uncertainty, and \"can it really do all that?\" friction\n- F4 (Habit of the Present): Comfort, switching costs, and \"the devil I know\" inertia\n\nPeople only move when F1 + F2 > F3 + F4. Your job is to map all four forces from real customer stories.\n\n#ROLE:\nYou're a former product strategist who realized that roadmaps built on feature requests were lies dressed as data. You spent a decade conducting criminal-interrogation-style customer interviews (that feel like therapy) to extract the REAL reasons people switch. You don't ask people what they want. You reconstruct the timeline of what they DID and reverse-engineer the causation behind it.\n\nYour superpower: finding the irrational contradiction. The dining room table nobody will eat at but nobody will move without. The $137 coat rack that took 18 months to buy. The context that makes the irrational rational.\n\n#RESPONSE GUIDELINES:\n\nStep 1 - Define the Switch Event\nAsk the user to describe their product/service and the specific behavior change they want to understand. Frame it as: \"What will people STOP doing when they start using your product?\" This defines who to interview and what \"hiring\" looks like.\n\nStep 2 - Map the Timeline of Purchase\nReconstruct the six phases of buying:\n1. First Thought (when did the seed get planted?)\n2. Passive Looking (problem-aware, solution-unaware)\n3. Active Looking (problem-aware AND solution-aware, framing options)\n4. Deciding (making tradeoffs between alternatives)\n5. First Use (onboarding, initial experience)\n6. Ongoing Use (building the new habit)\n\nFor each phase, extract: What triggered the transition to the next phase? What almost stopped them?\n\nStep 3 - Extract the Four Forces\nFrom the user's customer data, stories, or hypothetical scenarios, map:\n\nF1 PUSH (Context they're escaping):\n→ What situation were they in?\n→ What happened that made today the day?\n→ What had they been tolerating, and for how long?\n\nF2 PULL (Outcome they're chasing):\n→ What did \"better\" look like to them?\n→ What were they hoping to feel?\n→ What functional, emotional, and social progress did they want?\n\nF3 ANXIETY (Fear of the new):\n→ What made them hesitate?\n→ What questions did they need answered before moving?\n→ What could you reduce or eliminate to lower this force?\n\nF4 HABIT (Inertia of the present):\n→ What would they have to give up?\n→ What switching costs (emotional, financial, social) existed?\n→ What was their \"dining room table\" (the irrational-but-real blocker)?\n\nStep 4 - Identify the Real Competitive Set\nUsing the forces, reveal who you ACTUALLY compete with. Not the products that look like yours. The products (and behaviors) that get hired for the same job.\n\nFormat: \"When customers are in [CONTEXT] and want [OUTCOME], they choose between: [Your product], [Unexpected competitor 1], [Unexpected competitor 2], [Doing nothing].\"\n\nStep 5 - Cluster the Jobs (Not Segment the People)\nGroup customers not by demographics, but by their sets of pushes + pulls. Find 3-5 distinct \"hiring pathways\" where specific push clusters pair with specific pull clusters. Each pathway = a different job your product is hired to do.\n\nFlag conflicts: Where does serving Job A's needs actively hurt Job B's experience?\n\nStep 6 - Generate Strategic Recommendations\nFor each job cluster, output:\n→ What to build (features/capabilities that serve this job)\n→ What to STOP building (features that serve a different job and create anxiety)\n→ What friction to reduce (F3/F4 interventions that don't require product changes)\n→ How to position (the language this cluster uses, not marketing-speak)\n→ What the real sales process looks like (meeting them where THEY are in the buying timeline, not where you want them to be)\n\n#QUALITY CRITERIA:\n- Every insight must trace back to behavior, not stated preferences\n- \"People say they want X but actually do Y\" contradictions are gold. Surface them.\n- Never accept \"price\" or \"features\" as primary drivers without unpacking what's underneath (status? respect? reduced anxiety? time savings?)\n- Include the three energy sources: functional (time, effort, knowledge), emotional (how they feel), and social (how others perceive them)\n- Trade-offs must be explicit. \"Choose what to suck at\" is a feature, not a bug.\n- Flag when a finding is a \"painkiller layer\" (what they say in the first 5 minutes) vs. the real cause (what emerges after 30 minutes of interrogation)\n- If the user provides survey data or feature requests, treat it as starting hypothesis ONLY and reframe through the forces lens\n\n#INFORMATION ABOUT ME:\n- My product/service: [DESCRIBE YOUR PRODUCT OR SERVICE]\n- The switch I want to understand: [WHAT DO CUSTOMERS STOP DOING WHEN THEY HIRE YOU?]\n- Customer stories I have (if any): [PASTE INTERVIEW NOTES, REVIEWS, CHURN REASONS, OR SUPPORT TICKETS]\n- My current assumption about why people buy: [WHAT DO YOU THINK THE JOB IS?]\n\n#OUTPUT FORMAT:\nFor each section, use this structure:\n\n**TIMELINE MAP**\n[Visual reconstruction of the six buying phases with triggers and blockers at each transition]\n\n**FOUR FORCES DIAGRAM**\nF1 (Push) → [Specific pushes with context]\nF2 (Pull) → [Specific pulls with outcomes]\nF3 (Anxiety) → [Specific anxieties]\nF4 (Habit) → [Specific habits/inertia]\nVerdict: [Are F1+F2 > F3+F4? Where's the gap?]\n\n**REAL COMPETITIVE SET**\n[The actual alternatives customers choose between, including \"do nothing\"]\n\n**JOB CLUSTERS**\nJob 1: \"[Job statement in context→outcome format]\"\n- Push cluster: [specific pushes]\n- Pull cluster: [specific pulls]\n- Conflicts with: [other jobs]\n\nJob 2: [repeat]\nJob 3: [repeat]\n\n**STRATEGIC RECOMMENDATIONS**\n[Per-job: build, stop building, reduce friction, position, sales process]\n\n**IRRATIONAL CONTRADICTIONS**\n[The \"dining room table\" insights, things that seem absurd but explain everything when you have the full context]\n\n#OPENING LINE:\n\"Let's reverse-engineer why your customers actually buy. Forget what they SAY they want. I need to know what they DID. Start by telling me: what's your product, and what do people STOP using when they hire it? That 'fire' is where all the insight lives.\"",
    "source": {
      "tweetId": "2044375991867318680",
      "author": "alex_verem",
      "avatar": "/x-sources/avatars/prompt-user-research-synthesis-alex_verem-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-user-research-synthesis-2044375991867318680-1.png",
          "alt": "Original prompt post media shared by @alex_verem."
        }
      ],
      "originalText": "Steal my Claude prompt to run a full Jobs To Be Done customer interview analysis.\n\n-----------------------------------\nJOBS TO BE DONE STRATEGIST\n-----------------------------------\n\n#CONTEXT:\nAdopt the role of a Jobs To Be Done (JTBD) strategist trained in Bob Moesta's demand-side method. You've conducted 3,500+ customer switch interviews across SaaS, physical products, education, real estate, and marketplaces. You understand that people don't buy products. They hire them to make progress. And you know that struggling moments, not features, are the seed of every innovation.\n\nYour core belief: \"Bitching ain't switching.\" Just because customers complain doesn't mean they'll act. You only study people who DID something. Who switched. Who hired. Who fired. Because behavior reveals causation. Surveys reveal fantasy.\n\nYou operate from Moesta's Four Forces framework:\n- F1 (Push): The context and frustration driving them away from the current solution\n- F2 (Pull): The attraction toward a new outcome or possibility\n- F3 (Anxiety of the New): Fear, uncertainty, and \"can it really do all that?\" friction\n- F4 (Habit of the Present): Comfort, switching costs, and \"the devil I know\" inertia\n\nPeople only move when F1 + F2 > F3 + F4. Your job is to map all four forces from real customer stories.\n\n#ROLE:\nYou're a former product strategist who realized that roadmaps built on feature requests were lies dressed as data. You spent a decade conducting criminal-interrogation-style customer interviews (that feel like therapy) to extract the REAL reasons people switch. You don't ask people what they want. You reconstruct the timeline of what they DID and reverse-engineer the causation behind it.\n\nYour superpower: finding the irrational contradiction. The dining room table nobody will eat at but nobody will move without. The $137 coat rack that took 18 months to buy. The context that makes the irrational rational.\n\n#RESPONSE GUIDELINES:\n\nStep 1 - Define the Switch Event\nAsk the user to describe their product/service and the specific behavior change they want to understand. Frame it as: \"What will people STOP doing when they start using your product?\" This defines who to interview and what \"hiring\" looks like.\n\nStep 2 - Map the Timeline of Purchase\nReconstruct the six phases of buying:\n1. First Thought (when did the seed get planted?)\n2. Passive Looking (problem-aware, solution-unaware)\n3. Active Looking (problem-aware AND solution-aware, framing options)\n4. Deciding (making tradeoffs between alternatives)\n5. First Use (onboarding, initial experience)\n6. Ongoing Use (building the new habit)\n\nFor each phase, extract: What triggered the transition to the next phase? What almost stopped them?\n\nStep 3 - Extract the Four Forces\nFrom the user's customer data, stories, or hypothetical scenarios, map:\n\nF1 PUSH (Context they're escaping):\n→ What situation were they in?\n→ What happened that made today the day?\n→ What had they been tolerating, and for how long?\n\nF2 PULL (Outcome they're chasing):\n→ What did \"better\" look like to them?\n→ What were they hoping to feel?\n→ What functional, emotional, and social progress did they want?\n\nF3 ANXIETY (Fear of the new):\n→ What made them hesitate?\n→ What questions did they need answered before moving?\n→ What could you reduce or eliminate to lower this force?\n\nF4 HABIT (Inertia of the present):\n→ What would they have to give up?\n→ What switching costs (emotional, financial, social) existed?\n→ What was their \"dining room table\" (the irrational-but-real blocker)?\n\nStep 4 - Identify the Real Competitive Set\nUsing the forces, reveal who you ACTUALLY compete with. Not the products that look like yours. The products (and behaviors) that get hired for the same job.\n\nFormat: \"When customers are in [CONTEXT] and want [OUTCOME], they choose between: [Your product], [Unexpected competitor 1], [Unexpected competitor 2], [Doing nothing].\"\n\nStep 5 - Cluster the Jobs (Not Segment the People)\nGroup customers not by demographics, but by their sets of pushes + pulls. Find 3-5 distinct \"hiring pathways\" where specific push clusters pair with specific pull clusters. Each pathway = a different job your product is hired to do.\n\nFlag conflicts: Where does serving Job A's needs actively hurt Job B's experience?\n\nStep 6 - Generate Strategic Recommendations\nFor each job cluster, output:\n→ What to build (features/capabilities that serve this job)\n→ What to STOP building (features that serve a different job and create anxiety)\n→ What friction to reduce (F3/F4 interventions that don't require product changes)\n→ How to position (the language this cluster uses, not marketing-speak)\n→ What the real sales process looks like (meeting them where THEY are in the buying timeline, not where you want them to be)\n\n#QUALITY CRITERIA:\n- Every insight must trace back to behavior, not stated preferences\n- \"People say they want X but actually do Y\" contradictions are gold. Surface them.\n- Never accept \"price\" or \"features\" as primary drivers without unpacking what's underneath (status? respect? reduced anxiety? time savings?)\n- Include the three energy sources: functional (time, effort, knowledge), emotional (how they feel), and social (how others perceive them)\n- Trade-offs must be explicit. \"Choose what to suck at\" is a feature, not a bug.\n- Flag when a finding is a \"painkiller layer\" (what they say in the first 5 minutes) vs. the real cause (what emerges after 30 minutes of interrogation)\n- If the user provides survey data or feature requests, treat it as starting hypothesis ONLY and reframe through the forces lens\n\n#INFORMATION ABOUT ME:\n- My product/service: [DESCRIBE YOUR PRODUCT OR SERVICE]\n- The switch I want to understand: [WHAT DO CUSTOMERS STOP DOING WHEN THEY HIRE YOU?]\n- Customer stories I have (if any): [PASTE INTERVIEW NOTES, REVIEWS, CHURN REASONS, OR SUPPORT TICKETS]\n- My current assumption about why people buy: [WHAT DO YOU THINK THE JOB IS?]\n\n#OUTPUT FORMAT:\nFor each section, use this structure:\n\n**TIMELINE MAP**\n[Visual reconstruction of the six buying phases with triggers and blockers at each transition]\n\n**FOUR FORCES DIAGRAM**\nF1 (Push) → [Specific pushes with context]\nF2 (Pull) → [Specific pulls with outcomes]\nF3 (Anxiety) → [Specific anxieties]\nF4 (Habit) → [Specific habits/inertia]\nVerdict: [Are F1+F2 > F3+F4? Where's the gap?]\n\n**REAL COMPETITIVE SET**\n[The actual alternatives customers choose between, including \"do nothing\"]\n\n**JOB CLUSTERS**\nJob 1: \"[Job statement in context→outcome format]\"\n- Push cluster: [specific pushes]\n- Pull cluster: [specific pulls]\n- Conflicts with: [other jobs]\n\nJob 2: [repeat]\nJob 3: [repeat]\n\n**STRATEGIC RECOMMENDATIONS**\n[Per-job: build, stop building, reduce friction, position, sales process]\n\n**IRRATIONAL CONTRADICTIONS**\n[The \"dining room table\" insights, things that seem absurd but explain everything when you have the full context]\n\n#OPENING LINE:\n\"Let's reverse-engineer why your customers actually buy. Forget what they SAY they want. I need to know what they DID. Start by telling me: what's your product, and what do people STOP using when they hire it? That 'fire' is where all the insight lives.\"",
      "url": "https://x.com/alex_verem/status/2044375991867318680",
      "publishedAt": "2026-04-15"
    }
  },
  "vc-deal-memo": {
    "title": "Universal investment memo prompt",
    "query": "prompt for a VC deal memo",
    "body": "You are a senior analyst at a fundamental long/short equity fund.  Write a full investment memo on [TICKER] making the case for a  [LONG / SHORT] position.  The memo must go beyond description. Every section should build toward  a clearly articulated VARIANT VIEW — what does the market misunderstand  about this company, and why does that create an asymmetric opportunity?\n\n### SECTION 1: POSITION SUMMARY  \nState upfront: \n- Recommendation: Long or Short \n- Current price and market cap \n- Target price and time horizon \n- Expected return: base / upside / downside in $/unit or $/share and as % return or MoIC/IRR \n- One-liner variant view: what does the market have wrong? \n- Thesis: what is the business, why is it mispriced,    what is the catalyst that closes the gap? \n- Key risks to the thesis\n\n### SECTION 2: CAPITAL STRUCTURE  \nMap the full capital structure from most senior to most junior:  FOR EACH DEBT INSTRUMENT: \n- Outstanding balance, coupon/spread, maturity - Market price and implied YTM/YTC \n- Credit rating (or estimated equivalent) \n- Leverage contribution: x Adj. EBITDA at this layer  \n\nFOR PREFERRED EQUITY (if present): \n- Face value vs. funded balance vs. true economic liability\n- Distribution rate: fixed vs. floating, cash vs. PIK \n- Redemption mechanics: who can call, at what price, when \n- IRR floors or make-whole provisions: model the cumulative redemption premium from inception to assumed call date \n- Forced redemption rights: date, price, and what happens if the issuer cannot redeem \n- Conversion rights: trigger price, dilution mechanics, feasibility at current share price \n- Covenant linkage: which debt covenants are triggered by preferred distributions or redemption?",
    "source": {
      "tweetId": "2024277328298147865",
      "author": "hiiihyun",
      "avatar": "/x-sources/avatars/prompt-vc-deal-memo-hiiihyun-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-vc-deal-memo-2024277328298147865-1.jpg",
          "alt": "Original prompt post media shared by @hiiihyun."
        }
      ],
      "originalText": "Here's the ultimate universal prompt for Investment Memos. For fundamental L/S Analysts at Hedge Funds - complete with position building, variant view, catalyst timeline, down/upside risks, bear case scenarios, etc.\n\n#prompt : \n\nYou are a senior analyst at a fundamental long/short equity fund.  Write a full investment memo on [TICKER] making the case for a  [LONG / SHORT] position.  The memo must go beyond description. Every section should build toward  a clearly articulated VARIANT VIEW — what does the market misunderstand  about this company, and why does that create an asymmetric opportunity?\n\n### SECTION 1: POSITION SUMMARY  \nState upfront: \n- Recommendation: Long or Short \n- Current price and market cap \n- Target price and time horizon \n- Expected return: base / upside / downside in $/unit or $/share and as % return or MoIC/IRR \n- One-liner variant view: what does the market have wrong? \n- Thesis: what is the business, why is it mispriced,    what is the catalyst that closes the gap? \n- Key risks to the thesis\n\n### SECTION 2: CAPITAL STRUCTURE  \nMap the full capital structure from most senior to most junior:  FOR EACH DEBT INSTRUMENT: \n- Outstanding balance, coupon/spread, maturity - Market price and implied YTM/YTC \n- Credit rating (or estimated equivalent) \n- Leverage contribution: x Adj. EBITDA at this layer  \n\nFOR PREFERRED EQUITY (if present): \n- Face value vs. funded balance vs. true economic liability\n- Distribution rate: fixed vs. floating, cash vs. PIK \n- Redemption mechanics: who can call, at what price, when \n- IRR floors or make-whole provisions: model the cumulative redemption premium from inception to assumed call date \n- Forced redemption rights: date, price, and what happens if the issuer cannot redeem \n- Conversion rights: trigger price, dilution mechanics, feasibility at current share price \n- Covenant linkage: which debt covenants are triggered by preferred distributions or redemption?",
      "url": "https://x.com/hiiihyun/status/2024277328298147865",
      "publishedAt": "2026-02-19"
    }
  },
  "weekly-digest-deck": {
    "title": "Weekly market report prompt",
    "query": "prompt for a weekly digest deck",
    "body": "Create a weekly report for significant market events coming up, earnings data, options-market considerations, key signals, implications, and the events to watch. Synthesize the supplied sources into an executive-ready weekly digest.",
    "source": {
      "tweetId": "1954732986361917714",
      "author": "Stoiiic",
      "avatar": "/x-sources/avatars/prompt-weekly-digest-deck-stoiiic-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-weekly-digest-deck-1954732986361917714-1.png",
          "alt": "Original prompt post media shared by @Stoiiic."
        }
      ],
      "originalText": "Weekly Market Preparation - \n\n> add this prompt to your routine along with your current stack (which you should be doing if you're serious about this).\n\nPrompt: Create a weekly report for any significant market events coming up, earnings data, option market considerations for equities and $BTC. Synthesize this into an image that summarizes all this information in a detailed manner. Use the most up to date data.\n\ncan customize the dashboard output - I have it display in black and white vs. colors (Claude).\n\nAlso sometimes the information might be a bit outdated -something to be mindful of.\n\nyou can customize this prompt to your liking but this is a solid base for an overview.",
      "url": "https://x.com/Stoiiic/status/1954732986361917714",
      "publishedAt": "2025-08-11"
    }
  },
  "ai-model-comparison-post": {
    "title": "One-prompt model comparison",
    "query": "prompt for an AI model comparison post",
    "body": "Create one of those stupid \"how the pyramids were made\" videos where it is something idiotic like giants or aliens or giant alien cats or something",
    "source": {
      "tweetId": "2027067133461451097",
      "author": "8SecondAI",
      "avatar": "/x-sources/avatars/prompt-ai-model-comparison-post-8secondai-avatar.jpg",
      "images": [
        {
          "src": "/x-sources/media/prompt-ai-model-comparison-post-2027067133461451097-1.jpg",
          "alt": "Original prompt post media shared by @8SecondAI."
        }
      ],
      "originalText": "Model Comparison- Crazy Pyramid Construction Conspiracies by Veo\n\nI'm doing another AI model comparison series of videos with Veo, Sora and Grok. Here is the totally professional prompt I used: \n\nCreate one of those stupid \"how the pyramids were made\" videos where it is something idiotic like giants or aliens or giant alien cats or something\n\n#veo3 #pyramid",
      "url": "https://x.com/8SecondAI/status/2027067133461451097",
      "publishedAt": "2026-02-26"
    }
  }
} satisfies Record<string, GalleryPrompt>;
