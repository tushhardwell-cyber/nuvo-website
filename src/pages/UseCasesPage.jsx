import { Navigate } from 'react-router-dom';

// "Use cases" now lives on /work (tab: What we automate).
export default function UseCasesPage() {
  return <Navigate to="/work" replace />;
}
