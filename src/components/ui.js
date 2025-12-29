export const inputClass = `
  w-full px-3 py-2 rounded-lg
  bg-transparent
  border
  text-[color:var(--text-primary)]
  placeholder:text-[color:var(--text-muted)]
  focus:outline-none focus:ring-2
`;

export const primaryButton = `
  px-4 py-2 rounded-lg
  text-white font-medium
  transition
  bg-[color:var(--accent-primary)]
  hover:bg-[color:var(--accent-soft)]
`;

export const secondaryButton = `
  px-3 py-1 rounded-lg
  transition
  bg-transparent
  border
  text-[color:var(--text-secondary)]
`;

export const dangerButton = `
  px-3 py-1 rounded-lg
  bg-red-500/80 hover:bg-red-500
  text-white
  transition
`;
