import Seo from '../components/layout/Seo';
import Button from '../components/ui/Button';
import OMark from '../components/ui/OMark';

export default function NotFound() {
  return (
    <section className="notfound">
      <Seo title="Page not found" path="/404" noindex />
      <div className="container rel notfound-inner">
        <OMark size={88} />
        <h1 className="display h2">
          This page went <em>off the grid.</em>
        </h1>
        <p className="lead">Unlike your leads will, once we've automated them.</p>
        <Button to="/" variant="primary">
          Back to home
        </Button>
      </div>
    </section>
  );
}
