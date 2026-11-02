# AI Collaboration Log



## Prompt Used for ChatGPT, Gemini, and Google AI Studio



> Act as a senior teaching assistant. Propose a minimal Next.js App Router + TypeScript + Tailwind starter for a neighborhood property platform. Give a file plan, terminal commands, accessibility requirements, and a verification checklist. Never invent command results or credentials. Use Next.js, TypeScript, Tailwind CSS, accessible HTML, and no secrets. Provide commands and a file plan, not a giant code dump.






## AI Comparison

| Step / Tool | Prompt Summary | Model Output Used | Model Output Rejected & Rationale | Verification Method | Associated Git Commit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Initial project setup / ChatGPT | Requested a minimal Next.js App Router, TypeScript, and Tailwind starter with accessibility requirements and verification steps. | Used the proposed project workflow, file organization, and verification checklist. | No specific ChatGPT recommendation was rejected. | Reviewed the existing repository structure and checked the application locally. | 0719fd6 |
| Initial project setup / Gemini | Requested a project file plan and accessibility guidance. | Used the suggested file organization and accessibility recommendations. | Rejected creating a new project directory because the neighborhood-listing-platform repository had already been cloned. Creating another directory would duplicate the project. | Confirmed the existing repository path and inspected its files. | 0719fd6 |
| Application architecture / Google AI Studio | Used the App Shell Architect prompt to propose a neighborhood listing application. | Used the proposed application structure and reviewed reusable components, property listings, and accessibility suggestions. | Did not use the alternative project creation approach because development was continuing inside the existing repository. | Reviewed the implemented application and its component files. | 22e0095 |
| Accessible component implementation / AI assistance | Reviewed recommendations for semantic HTML, keyboard navigation, and reusable property components. | Used accessible property card and search filter implementation ideas. | Rejected unnecessary replacement of existing project files when the existing components could be extended. | Inspected component code and reviewed keyboard accessibility requirements. | 46e02e7 |
| Database and sponsor implementation / AI assistance | Reviewed database organization and sponsor-related feature requirements. | Used database and sponsor implementation guidance as a starting point. | Rejected changes that would duplicate existing database structures or introduce unnecessary files. | Reviewed migration files and database implementation. | 3f22667 |

## Two Differences Between ChatGPT and Gemini



### Difference 1 — Project creation



ChatGPT recommended working within the existing cloned repository. Gemini provided a create-next-app command that would create a new neighborhood-listing-platform directory. Since the repository has already been cloned, the Gemini command will be adapted to the existing repository.



### Difference 2 — Accessibility



Gemini provided more detailed accessibility guidance, including semantic HTML landmarks, heading hierarchy, color contrast, keyboard focus, and the document language attribute. ChatGPT focused more on the overall project workflow and verification process.



## Google AI Studio Findings



Google AI Studio proposed a more detailed architecture for the neighborhood property platform. Its plan included property listing pages, property detail pages, reusable components, mock data, TypeScript types, loading states, error handling, and a 404 page.



It also emphasized accessibility requirements such as semantic landmarks, keyboard navigation, skip links, labels for form controls, descriptive image alt text, color contrast, and responsive testing.



The proposed project creation command was not used because the assignment repository already exists as `neighborhood-listing-platform`. The project will instead be created inside the existing repository.



## Verification Plan



The following checks are used to verify the AI-assisted work:



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

- Lint and build results should be confirmed using the current exam branch before final submission.
- Local application testing should be confirmed at `http://localhost:3000`.
- Deployment should be checked using the Vercel URL listed below.
- Git status and tracked files should be reviewed before final submission.
- Confirm that `.env`, `node_modules`, `.next`, `out`, and `build` files are not tracked by Git.
- Record actual test results and any remaining issues before submission.

## Deployment

Vercel deployment URL:

https://neighborhood-listing-platform-rust.vercel.app/

