// CMPM 121 Smelly Code Activity

type ButtonAction = "inc" | "dec" | "reset";

// // Centralized constants to avoid magic strings sprinkled around.
const TEXT = {
  heading: "CMPM 121 Project",
  label: "Counter: ",
  incButton: "Click Me!",
  decButton: "Decrement",
  resetButton: "Reset",
  titlePrefix: "Clicked ",
};

const IDS = {
  counter: "counter",
  root: "app-root",
} as const;

const COLORS = {
  odd: "pink",
  even: "lightblue",
} as const;

interface AppState {
  count: number;
}

// Single source of truth for state.
const state: AppState = { count: 0 };

// helpers
function el<K extends keyof HTMLElementTagNameMap>(tag: K, options?: {
  id?: string;
  text?: string;
  attrs?: Record<string, string>;
}): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (options?.id) node.id = options.id;
  if (options?.text != null) node.textContent = options.text;
  if (options?.attrs) {
    for (const [k, v] of Object.entries(options.attrs)) {
      node.setAttribute(k, v);
    }
  }
  return node;
}

function render(): void {
  const counter = document.getElementById(IDS.counter);
  if (counter) counter.textContent = String(state.count);

  // Title mirrors original behavior: "Clicked X"
  document.title = TEXT.titlePrefix + state.count;

  // Background color: odd -> pink, even -> lightblue
  document.body.style.backgroundColor = state.count % 2
    ? COLORS.odd
    : COLORS.even;
}

// Reducers change only state; the rest of the world updates via render()
const reducers = {
  inc() {
    state.count += 1;
  },
  dec() {
    state.count -= 1;
  },
  reset() {
    state.count = 0;
  },
} satisfies Record<ButtonAction, () => void>;

function dispatch(action: ButtonAction): void {
  reducers[action]();
  render();
}

// applies an action, then re-renders
function setup(): void {
  const root = el("div", { id: IDS.root });
  const heading = el("h1", { text: TEXT.heading });

  const p = el("p");
  p.append(TEXT.label);
  p.append(el("span", { id: IDS.counter, text: "0" }));

  const btnInc = el("button", {
    text: TEXT.incButton,
    attrs: { "data-action": "inc" },
  });
  const btnDec = el("button", {
    text: TEXT.decButton,
    attrs: { "data-action": "dec" },
  });
  const btnReset = el("button", {
    text: TEXT.resetButton,
    attrs: { "data-action": "reset" },
  });

  // Event delegation to avoid three near-identical listeners.
  root.addEventListener("click", (ev) => {
    const t = ev.target as HTMLElement | null;
    const action = t?.getAttribute("data-action") as ButtonAction | null;
    if (action) dispatch(action);
  });

  root.append(heading, p, btnInc, btnDec, btnReset);
  document.body.replaceChildren(root);

  // Initial paint
  render();
}

// entry point
function start(): void {
  setup();
}
start();
