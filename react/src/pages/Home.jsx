export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <img
          alt="Plate.js logo"
          className="dark:invert"
          height={38}
          src="https://platejs.org/logo.svg"
          width={180}
        />
        <ol className="list-inside list-decimal text-center font-mono text-sm sm:text-left">
          <li className="mb-2">
            Get started by visiting{' '}
            <code className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">
              /editor
            </code>
            .
          </li>
          <li>Experience the power of Plate.js rich-text editor.</li>
        </ol>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            className="flex h-10 items-center justify-center gap-2 rounded-full border border-transparent border-solid bg-foreground px-4 text-background text-sm transition-colors hover:bg-[#383838] sm:h-12 sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
            href="/editor"
          >
            Open Editor
          </a>
          <a
            className="flex h-10 items-center justify-center rounded-full border border-black/[.08] border-solid px-4 text-sm transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:min-w-44 sm:px-5 sm:text-base dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            href="https://platejs.org/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Read the docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://platejs.org"
          rel="noopener noreferrer"
          target="_blank"
        >
          Visit platejs.org →
        </a>
      </footer>
    </div>
  );
}
