import Timer from "./timer";

export default function Main() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-prose text-center">
        <div className="flex justify-center items-center mb-4">
          <Icon position="left" />
          <h1 className="text-3xl font-bold">stay-hydrated.vip</h1>
          <Icon position="right" />
        </div>
        <p className="text-lg mb-8">A simple hydration reminder timer.</p>
        <Timer />
        <footer className="mt-8 text-muted">
          By Tim Martin.{" "}
          <a href="https://github.com/t-mart/drink">GitHub</a>.
        </footer>
      </div>
    </div>
  );
}

function Icon({ position }: { position?: "left" | "right" }) {
  return (
    <img
      src="/favicon.svg"
      className={`inline-block select-none ${
        position === "left" ? "mr-2" : "ml-2"
      }`}
      alt="droplet"
    />
  );
}
