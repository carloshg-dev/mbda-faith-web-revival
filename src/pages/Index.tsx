import SiteHeader from "../components/site/SiteHeader";
import HomeHero from "../components/site/HomeHero";
import WeeklyPreview from "../components/site/WeeklyPreview";
import EventGallery from "../components/site/EventGallery";
import { AboutChurch, FaithDeclaration, FullSchedule, FamilySpace } from "../components/site/ChurchSections";
import StudySection from "../components/site/StudySection";
import MediaArchive from "../components/site/MediaArchive";
import ContactSection from "../components/site/ContactSection";
import SiteFooter from "../components/site/SiteFooter";
import ReconNewsFeed from "../components/ReconNewsFeed";
import { useSEO } from "../hooks/useSEO";
import { SEO_CONFIG } from "../constants";

export default function Index() {
  useSEO(SEO_CONFIG);
  return <>
    <SiteHeader />
    <main id="conteudo"><HomeHero /><WeeklyPreview /><AboutChurch /><EventGallery /><FullSchedule /><ReconNewsFeed /><FaithDeclaration /><StudySection /><FamilySpace /><MediaArchive /><ContactSection /></main>
    <SiteFooter />
  </>;
}
