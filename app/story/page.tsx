import Story from "@/components/story/Story";

export const metadata = {
  title: "CommutePilot — the 40 second version",
  description: "The commute problem, and what CommutePilot does about it.",
};

/* A bare, full-bleed page: nothing but the animation, sized 16:9, so it can
   be screen-recorded cleanly for social. */
export default function StoryPage() {
  return (
    <main className="grid min-h-dvh place-items-center bg-[#0f1115] p-4">
      <div className="w-full max-w-[1120px]">
        <Story clean />
      </div>
    </main>
  );
}
