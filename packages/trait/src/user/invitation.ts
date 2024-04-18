export enum InvitationStatus {
  pending = 'pending',
  rejected = 'rejected',
  fulfilled = 'fulfilled',
}

/**
 * Invitation source.
 *
 * Invite hacker into source.
 */
export enum InvitationSource {
  organization = 'organization',
  project = 'project',
}
