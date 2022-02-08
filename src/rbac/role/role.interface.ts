export interface RoleGuardProps {
  is?: string[];
  can?: ('create' | 'read' | 'update' | 'delete')[];
  to?: 'own' | 'all';
}
