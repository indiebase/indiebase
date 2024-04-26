/**
 * Organization and user visibility.
 */
export enum Visibility {
  /**
   * Visible to everyone.
   */
  public = 'public',
  /**
   * Visible to authenticated users only.
   */
  protected = 'protected',
  /**
   * Visible only to organization members.
   */
  private = 'private',
}
