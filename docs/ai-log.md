# AI Collaboration Log



## Prompt Used for ChatGPT, Gemini, and Google AI Studio



> Act as a senior teaching assistant. Propose a minimal Next.js App Router + TypeScript + Tailwind starter for a neighborhood property platform. Give a file plan, terminal commands, accessibility requirements, and a verification checklist. Never invent command results or credentials. Use Next.js, TypeScript, Tailwind CSS, accessible HTML, and no secrets. Provide commands and a file plan, not a giant code dump.



## AI Comparison



| Step / Tool | Prompt Summary | Model Output Used | Model Output Rejected & Rationale | Verification Method | Associated Git Commit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Initial project setup / ChatGPT | Requested a minimal Next.js App Router, TypeScript, and Tailwind starter with a file plan, commands, accessibility requirements, and verification checklist. | Project workflow and verification requirements. | No specific rejected output recorded; do not invent one. | Reviewed project files and ran available lint/build checks. | See Git history for the relevant setup commit. |
| Initial project setup / Gemini | Requested a project file plan and accessibility guidance. | File plan and accessibility requirements. | Adapted the nested project creation command because the repository already existed. | Reviewed the repository structure and ran available lint/build checks. | See Git history for the relevant setup commit. |
| Initial project setup / Google AI Studio | Used the “App Shell Architect” prompt for a neighborhood listing application. | File plan, accessibility requirements, and verification checklist. | Did not use the alternative project creation command because the existing repository was being used. | Reviewed project files and ran available lint/build checks. | See Git history for the relevant setup commit. |

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

## Final Verification

- `npm run lint` passed successfully.
- `npm run build` passed successfully.
- The application was tested locally at `http://localhost:3000`.
- The deployed application was verified on Vercel.
- Git working directory is clean.
- `.env`, `node_modules`, `.next`, `out`, and `build` files are not tracked by Git.

## Deployment

Vercel deployment URL:

https://neighborhood-listing-platform-rust.vercel.app/

