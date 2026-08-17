## August AI Coding Tools Experience Summary (The Freeloader Edition)

The reason I'm writing this is simple: after half a year of being bombarded by "AI coding神器" marketing, it's time to talk honestly about what daily use actually feels like. This isn't a review — it's a personal record of gaming the free tiers. If I can avoid paying, I avoid paying.

### I. Tool Categories

- **CLI**: opencode, Claude Code, Codex CLI, etc.;
- **Editors**: almost all are VSCode forks — China's "big three" are ByteDance's Trae, Tencent's CodeBuddy, and Alibaba's Qoder;
- **Workbenches**: Codex, Claude, WorkBuddy;
- **"Lobster"** (essentially a pile of Markdown files — represented by OpenClaw, Hermes);
- **Workflows**: Coze, Combi.

Quite a few bloggers have ranked mainstream AI Coding tools "from awesome to awful," but whether a tool is actually good still comes down to trying it yourself. Below is my own hands-on experience.

![A blogger's tier list of mainstream AI Coding tools](/images/articles/ai-coding-august-experience/tier-list.png)

### II. The Editors and Tools I Use Most: Trae, CodeBuddy, OpenCode

**Trae**: Free from January to June. Aside from the queues getting longer, I didn't spend a dime. In June it started rate-limiting, and in August it switched to a credits model with 500 free credits.
- **Experience**: For small web tools and small tasks it was okay at first, but on harder problems it would burn through many rounds of dialogue without ever pinpointing the issue — I'd end up reading the code myself. Its built-in AI seems to have strict limits on both input and output, so when it hits a wall it tends to "invent a reason and claim it's fixed," wrapping up without ever verifying.

**CodeBuddy**: 500 credits per month, with a 2,000-credit promo bonus in the first few months.
- **Experience**: This is my daily driver now. The big plus is it rarely stops early — a single question can run for half an hour or an hour. It doesn't guarantee a solution, but the success rate is clearly higher than Trae's.

**OpenCode**: Daily rate-limited. The free quota used to be fairly generous, but this month it runs out almost as soon as you touch it.
- **Experience**: The Harness engineering on this CLI is solid — it clearly borrows from Claude Code. On conventional programming (web dev, etc.) it's a bit stronger than Trae and CodeBuddy. But without a GUI, you still need an editor to see what it actually changed. Managing models, skills, and MCP is also fiddly, so I don't use it much — I still prefer editors.

### III. My General Coding Workflow

1. Before building a sizable new feature, I hand-write a requirements brief, making the frontend interaction logic or algorithmic logic as clear as possible;
2. Let the AI produce a feature PRD first to nail down the logic; once I confirm, have it produce a design doc; after I tweak some decision points, development begins;
3. After implementation, have the AI write test cases and run them itself, then output a test report; if there are issues, let it fix them first;
4. Finally I test it myself, optionally following the AI's test cases — which often don't match reality, so it's a process of editing while testing;
5. Fixing bugs is the most time-consuming part. AI-built features are fine if the logic is simple, but anything slightly complex tends to埋 a pile of pitfalls. You have to test every case yourself, then feed the AI the full context to fix them. Either you understand the feature and the program design inside-out from the start so you can spot where it goes off track — or you don't let it run solo all the way to the end, otherwise the bugs become unmanageable.

### IV. Skills

The AI rarely proactively invokes Skills during coding — probably because coding needs are too personalized to match well. I feel like Skills are more useful in fixed workflows (e.g., "generate + edit video" type chains with a set routine).

### V. MCP

The two I use most are Chrome DevTools MCP and MySQL MCP — mainly to let the AI debug the web itself and query the database on its own. For bugs that can't be solved in a few rounds, having the AI call these two tools to investigate itself usually cracks them. But Chrome DevTools MCP burns through context tokens at an alarming rate once called repeatedly.

Also, many AI tools are now pushing a "plugin" mechanism — packaging Skills, system prompts, rules, MCP, hooks into ready-to-use bundles. Something like a "spreadsheet assistant" needs all of these working together. I haven't used it much; I tried configuring a system prompt once with mediocre results, so I let it go.

### VI. Memory

For memory I use CodeBuddy's built-in system:
- A main MEMORY.md file, capped at 85 lines — when exceeded, the AI automatically prunes unimportant entries or distills them;
- A daily "dev diary" — what issue came up, why, how it was solved, what the pitfall was — the editor records this automatically;
- The Memory mechanism works reasonably well. When I forget what I did before, flipping back through it jogs my memory. The AI also glances at it while working, which nudges its accuracy up a bit.

### VII. Context

How each editor and AI tool stitches together and manages context is the core of whether an Agent is good and whether it saves tokens.
- The so-called "million-token context" doesn't seem to make the Agent smarter — it just means less frequent context compression. What it can't remember, it still can't remember (your mileage may vary);
- **Context cache hits**: Keep similar problems or scenarios in the same session to improve cache hit rate. But too many rounds in one session also degrades quality — after about 20 rounds it's worth starting a new session;
- **API token consumption on subscriptions**: Under long conversations the context keeps growing, and tokens burn faster and faster. The last round of dialogue often consumes several times the tokens of earlier rounds.

### VIII. Harness × Model Coordination

How to read files, how to invoke the terminal, how to run tests — this engineering system orbiting the model is collectively called the Harness. Many AI tools essentially stitch these into context and feed it to the base model. But some models have their own proprietary interface rules for tool calls, context management, and thought playback, so sometimes the AI tool's bundled model is more compatible than wiring up your own API.

### IX. Base Models

Right now DeepSeek V4 Flash 0731 is generally the most cost-effective and performs decently. But I've hit a few "circular answer" loops with it — possibly because the host tool's Harness isn't fully adapted. I've also seen a few "deceptive answers" — it gets clever and takes shortcuts to fabricate the illusion that the problem is solved, dodging the substance of the issue.

![Some of the base models I currently use](/images/articles/ai-coding-august-experience/base-models.png)

**Other base models**:
- **GLM series**: Used quite a bit in the previous few months. GLM-5.2 is genuinely okay for heavy workloads, with a slightly lower error rate;
- **MiniMax 3**: Used it for a while — fairly lively thinking, occasionally a touch creative;
- **Kimi**: I only tried 2.7. Coding-wise it's middle-of-the-road, but the web version is quite good for research, writing, or artsy stuff;
- **GPT**: Only used the web version. Its style of one-sentence-per-paragraph fits how people read.

### X. Subscription Prices for Some APIs / Tools I'm Currently Paying For

Mainstream subscriptions run from a few dozen to a few hundred yuan per month — what matters is how much and how smoothly you actually use them.

![Some of my monthly API / tool subscriptions (part 1)](/images/articles/ai-coding-august-experience/subscription-prices-1.png)

![Some of my monthly API / tool subscriptions (part 2)](/images/articles/ai-coding-august-experience/subscription-prices-2.png)

Freeloaders should pick the combo with the largest free tiers (Trae + CodeBuddy + OpenCode's free quotas basically sustain light usage); heavy users are better off subscribing directly to mainstream model APIs, saving themselves the back-and-forth between rate limits and credit systems.

### Closing Thoughts

After these past couple of months, my biggest takeaway: there's no silver bullet in AI Coding. The ceiling of free tools is "a workable first version you can iterate on" — taking it to production still requires your own hands. Treat it like an intern who slacks off, makes excuses, and occasionally has a flash of brilliance, and you'll get much further than treating it as a "fully automatic coder."
