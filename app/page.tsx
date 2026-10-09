import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import SectionProblem from "@/components/SectionProblem";
import SectionConsole from "@/components/SectionConsole";
import VotePanel from "@/components/VotePanel";
import SectionFix from "@/components/SectionFix";
import SectionAlert from "@/components/SectionAlert";
import SectionCompare from "@/components/SectionCompare";
import SectionLegs from "@/components/SectionLegs";
import SectionBothWays from "@/components/SectionBothWays";
import Bento from "@/components/Bento";
import Steps from "@/components/Steps";
import UseCases from "@/components/UseCases";
import SectionStatus from "@/components/SectionStatus";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <SectionProblem />
        <VotePanel />
        <SectionFix />
        <SectionAlert />
        <SectionConsole />
        <SectionCompare />
        <SectionLegs />
        <SectionBothWays />
        <Bento />
        <Steps />
        <UseCases />
        <SectionStatus />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
