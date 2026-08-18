import Link from "next/link";
import { Logo } from "./Logo";
import { useCases } from "../data/useCases";
import { appUrl } from "../site";

/**
 * The nav doubles as the site's internal-linking backbone: every page links to
 * all six audience hubs, so a crawler that lands on any output page can reach
 * the whole directory in two hops.
 */
export function SiteHeader({ active }: { active?: string } = {}) {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Ancher home">
        <Logo className="brand-logo" />
        <span>Ancher</span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        <Link className={active === "templates" ? "active" : undefined} href="/">
          Templates
        </Link>
        <Link className={active === "prompts" ? "active" : undefined} href="/prompts">
          Prompts
        </Link>
        {useCases.map((useCase) => (
          <Link
            key={useCase.slug}
            href={`/for/${useCase.slug}`}
            className={active === useCase.slug ? "active" : undefined}
          >
            {useCase.name}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <a className="header-cta" href={appUrl}>
          Open Ancher
        </a>
      </div>
    </header>
  );
}
