# Art direction — the mandatory pass

**No pixel, no line of CSS before you have been through this file.**

This is the step the original skill was missing. Without it the pipeline ran
`brief → database lookup → HTML → export`, which means: the first idea, which is always the
category's average idea. The result is correct, tickable, and completely forgettable.

---

## Step 0 — Inherit before inventing

Before any search, **read the current project's context** (cwd):

```bash
ls BRAND.md BRANDING.md DESIGN.md STYLEGUIDE.md PRODUCT.md design-system/MASTER.md docs/design*.md 2>/dev/null
```

- One of these exists → **it is the source of truth.** The direction is not reinvented, it is
  adapted. Your job is to find, inside that existing system, the most fitting expression for
  this particular deliverable.
- The brand doc states a rule you dislike → apply it anyway, and flag your disagreement in one
  sentence. **The brief always wins.**
- Nothing found → you are on new ground, go to step 1.

Also check the tokens actually in place in the code (`tailwind.config`, `:root`, `theme.css`):
a project's visual truth lives in its code, not in a filename.

---

## Step 1 — Ground it in the subject

If the brief does not say what the product is, **decide yourself and state your choice**: one
concrete subject, one audience, **one** job the page has to do.

Distinctive choices come from the subject's own world — its materials, instruments, artifacts,
vernacular — never from a catalogue of styles. An accounting firm, a climbing gym and a
meditation app have no reason to share a visual grammar, even though the database files them
all under "B2C service".

---

## Step 2 — The concept (written, before any code)

Produce these four blocks explicitly. Not in your head: written down.

| Block | Requirement |
|---|---|
| **Color** | 4 to 6 **named** hex values (the name states the role and the intent, not `primary-500`). One color alone carries the accent. |
| **Type** | 2 to 3 families with distinct roles: a display face with character (used sparingly), a complementary body face, optionally a utility face for data and captions. **The same family for display and body is a failure** — it is the search engine's default reflex. |
| **Layout** | A one-sentence concept plus an ASCII wireframe. Compare at least two options before committing. |
| **Signature** | **The single element this deliverable will be remembered by.** Only one. This is where all the boldness goes. |

---

## Step 3 — The anti-default critique (gate)

Reread the concept and answer honestly:

1. **"Would I have produced exactly this for any other brief in this category?"**
   If yes, it is not a decision, it is a reflex. Redo the offending axis.
2. Does the concept fall into one of the three saturated looks?
   - cream background ~`#F4F1EA` + high-contrast serif + terracotta accent
   - near-black background + a single acid-green or vermilion accent
   - broadsheet layout: hairline rules, `border-radius: 0`, dense newspaper columns
   All three are legitimate **when the brief asks for them**. Otherwise they are defaults,
   not choices.
3. Same vigilance for the styles older versions of this skill pushed to the top:
   glassmorphism, purple-to-blue gradient, neon/cyberpunk, bento grid. Saturated. Justify or drop.
4. Structural markers (01 / 02 / 03, eyebrows, rules, badges) may only exist if they **encode
   something true**. A numbered sequence over three blocks that are not a sequence is decoration.
5. **One boldness only.** If two elements compete for attention, there is no signature left.
   Before shipping: remove one accessory.

Write one line saying what you changed after this critique, and why. If you changed nothing,
you probably did not run the critique.

---

## Step 4 — The baseline to beat (optional, but clarifying)

Here the `ui-ux-pro-max` engine serves as an **anti-reference**: it tells you what everyone
else would ship.

```bash
$PY $SKILL/ui-ux-pro-max/scripts/search.py "<product industry tone>" --design-system
```

Read the output, then ask yourself on which axis you diverge from it **and why**.
If your concept matches that output line for line, you do not have a concept yet.

What the engine remains **very good** at, and what you should take from it:

- accessibility and contrast constraints (`--domain ux`);
- the explicit anti-patterns in its output;
- per-stack implementation guidelines (`--stack <stack>`);
- chart type recommendations (`--domain chart`).

---

## Step 5 — Build, then critique for real

- Build **exactly** the committed concept. Every color and every type size derives from the
  step 2 blocks. No value that is not in them.
- Watch for CSS specificity that cancels itself out (an element selector overriding a section
  class, typically on vertical margins between sections).
- **Verification is mandatory**: one batched screenshot pass (desktop and mobile together),
  fix everything it reveals, then **at most one** second pass. No screenshot-per-tweak cycle:
  it is expensive and it does not raise the bar.
- Only then: quality control (`references/qa.md`).

---

## `--safe` mode

If the user explicitly asks for something conventional (conservative client, internal tool,
compliance constraint), steps 2 and 3 still apply, but the signature's boldness drops one
notch: distinction then comes from **precision** — spacing rhythm, type scale, quality of
states — rather than expression. A restrained design is not a default design.
