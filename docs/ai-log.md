# AI Collaboration Log



## Prompt Used for ChatGPT, Gemini, and Google AI Studio



> Act as a senior teaching assistant. Propose a minimal Next.js App Router + TypeScript + Tailwind starter for a neighborhood property platform. Give a file plan, terminal commands, accessibility requirements, and a verification checklist. Never invent command results or credentials. Use Next.js, TypeScript, Tailwind CSS, accessible HTML, and no secrets. Provide commands and a file plan, not a giant code dump.



## AI Comparison



| Tool | Prompt | Output Used | Output Rejected | Verification | Commit |

|---|---|---|---|---|---|

| ChatGPT | App shell prompt | Project workflow and verification requirements | TBD | Lint and build passed | Pending |

| Gemini | App shell prompt | File plan and accessibility requirements | Nested project creation command | Lint and build passed | Pending |

| Google AI Studio | App Shell Architect prompt | File plan, accessibility requirements, and verification checklist | Project creation command using a different project name | Lint and build passed | Pending |



## Two Differences Between ChatGPT and Gemini



### Difference 1 — Project creation



ChatGPT recommended working within the existing cloned repository. Gemini provided a create-next-app command that would create a new neighborhood-listing-platform directory. Since the repository has already been cloned, the Gemini command will be adapted to the existing repository.



### Difference 2 — Accessibility



Gemini provided more detailed accessibility guidance, including semantic HTML landmarks, heading hierarchy, color contrast, keyboard focus, and the document language attribute. ChatGPT focused more on the overall project workflow and verification process.



## Google AI Studio Findings



Google AI Studio proposed a more detailed architecture for the neighborhood property platform. Its plan included property listing pages, property detail pages, reusable components, mock data, TypeScript types, loading states, error handling, and a 404 page.



It also emphasized accessibility requirements such as semantic landmarks, keyboard navigation, skip links, labels for form controls, descriptive image alt text, color contrast, and responsive testing.



The proposed project creation command was not used because the assignment repository already exists as `neighborhood-listing-platform`. The project will instead be created inside the existing repository.



## Verification



The AI suggestions will be verified by:



\- Running the application locally.

\- Checking the browser console.

\- Checking the terminal for errors.

\- Running `npm run lint`.

\- Running `npm run build`.

\- Checking Git status and tracked files.

\- Checking keyboard navigation.

\- Reviewing the deployed application.

\- Confirming no keys or `.env` files are committed.

