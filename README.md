# Success Club Scholarship Portal

A free, student-facing portal that helps academically capable but low-income students in Pakistan find open scholarships, check whether they're likely to qualify, and submit a complete application — no office visit, no agent, and no fee required.

Built by the **AI Club** as part of Success Club's 2026 programme in support of **SDG 4 (Quality Education)**.

## About the programme

Every year, thousands of students across Pakistan earn the grades to get into universities like LUMS, NUST, IBA, or GIKI, but can't continue because their families can't afford it. This portal exists to close that gap: it surfaces which scholarship tracks are open, gives applicants an instant estimate of their eligibility, and routes every submission to a real reviewer — the eligibility checker and chatbot never make the final call on their own.

- **Cycle:** 1 July – Mid August 2026
- **Cities:** Karachi, Lahore, Islamabad
- **Cost to apply:** Free, always

## Features

- **Home (`index.html`)** — programme overview, how the process works, and where past scholars have gone on to study.
- **About (`about.html`)** — the story behind the programme, what each of the five Success Club sub-clubs contributes, and the promises made to applicants (privacy, human review, no fees).
- **Applications (`apply.html`)** —
  - An eligibility checker that gives an instant estimate against each track's income and marks thresholds.
  - A full application form (student details, guardian details, academics, essay, and Google Drive links for supporting documents in place of file uploads).
  - A bot-resistant honeypot field and a generated application ID/receipt on successful submission.
  - An FAQ section and a live view of open scholarships with seats-filled progress bars.
- **AI Chat (`chat.html`)** — a scoped Q&A assistant that answers questions about eligibility, documents, and deadlines using a fixed set of programme facts. It's capped at 25 messages per visit and is explicitly a helper, not a reviewer.
- **Staff Panel (`admin.html`)** — a `noindex` reviewer-only page (not linked from the public nav) for browsing, searching, filtering, and updating the status of submitted applications, plus CSV export.

## Scholarship tracks

| Track | City | Grade level | Award | Max household income | Min. last exam result | Deadline |
|---|---|---|---|---|---|---|
| Matric Continuation Grant | Karachi | Grade 9–10 | ₨40,000/yr | ₨60,000/month | 70% | 15 Aug 2026 |
| Intermediate Excellence Award | Lahore | Grade 11–12 | ₨60,000/yr | ₨60,000/month | 80% | 20 Aug 2026 |
| A-Levels Momentum Scholarship | Islamabad | A-Levels | ₨85,000/yr | ₨70,000/month | 75% | 25 Aug 2026 |
| O-Levels Bridge Grant | Karachi · Lahore · Islamabad | O-Levels | ₨55,000/yr | ₨60,000/month | 70% | 30 Aug 2026 |

Thresholds are guidelines, not hard cut-offs — every full application is read by a reviewer, and exceptions are made for circumstances explained in the essay.

## Tech stack

- Plain HTML, CSS, and vanilla JavaScript — no build step or framework.
- **Firebase Firestore** for storing applications, and **Firebase Auth** (email/password) for staff login on the admin panel.
- Google Fonts (Poppins + Inter) loaded via CDN.
- The chatbot is wired to call the Anthropic Messages API directly from the browser.

## Project structure
