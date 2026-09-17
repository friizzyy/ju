import s from './AboutExperience.module.css'
import AboutPathsHero from './AboutPathsHero'
import AboutStory from './AboutStory'
import AboutDetails from './AboutDetails'

export default function AboutExperience() {
  return <div className={s.page}>
    <AboutPathsHero />
    <AboutStory />
    <AboutDetails />
  </div>
}
